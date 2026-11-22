import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PlayCircle } from "lucide-react";
import { AddToBasket } from "@/components/basket/add-to-basket";
import { FreeFromChips, PriceTag, SectionHeader, StatusPill, WhatsAppButton } from "@/components/brand";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { toBasketItem } from "@/lib/basket/message";
import { breadcrumbLd, JsonLd, productLd } from "@/lib/seo/json-ld";
import { site } from "@/lib/site";
import { getProduct, getProductSlugs } from "@/lib/catalog/data";
import { categoryLabel } from "@/lib/catalog/types";
import { ctaLabel, productStatusMessage } from "@/lib/whatsapp";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "المنتج غير موجود" };
  return {
    title: `${p.nameAr} — ${p.nameLatin}`,
    description: p.summary ?? `${p.nameAr} من ${p.brand}، منتج ألماني أصلي متوفر عند باليا مع توصيل لكل العراق.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "ar_IQ",
      title: `${p.nameAr} — ${p.nameLatin}`,
      // Image comes from ./opengraph-image.tsx (file convention wins over this object).
    },
  };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductView params={params} />
    </Suspense>
  );
}

async function ProductView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const message = productStatusMessage(p);
  const item = toBasketItem(p);
  const orderable = p.status !== "soldout";
  const crumbs = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
    ...(p.category ? [{ href: `/products?cat=${p.category}`, label: categoryLabel[p.category] }] : []),
  ];
  const gallery = p.images.length > 0 ? p.images : p.image ? [p.image] : [];

  return (
    <div className="pb-24 md:pb-0">
      <Container className="pt-5">
        <Breadcrumbs items={crumbs} />
        <JsonLd data={[productLd(p), breadcrumbLd([...crumbs, { href: `/products/${p.slug}`, label: p.nameAr }])]} />
      </Container>

      <Container className="grid gap-8 pt-6 md:grid-cols-2 md:gap-12 lg:gap-16">
        <ProductGallery images={gallery} brand={p.brand} slug={p.slug} />

        <div className="space-y-6 md:pt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              {p.brandSlug ? (
                <Link href={`/brands/${p.brandSlug}`} dir="ltr" className="font-label text-sm font-medium tracking-wide text-stone hover:text-ink">
                  {p.brand}
                </Link>
              ) : (
                <span dir="ltr" className="font-label text-sm font-medium text-stone">{p.brand}</span>
              )}
              <StatusPill status={p.status} />
            </div>
            <h1 className="text-title font-semibold leading-tight text-ink">{p.nameAr}</h1>
            <p dir="ltr" className="text-end font-label text-lg text-stone">
              {p.nameLatin}
              {p.size && <span className="tabular-nums"> · {p.size}</span>}
            </p>
          </div>

          <PriceTag price={p.price} compareAtPrice={p.compareAtPrice} className="text-xl" />

          {p.summary && <p className="text-lg leading-relaxed text-ink/90">{p.summary}</p>}

          <div className="hidden md:block">
            {orderable ? (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <AddToBasket item={item} />
                  <WhatsAppButton size="lg" variant="outline" message={message} data-wa-source="product-quick">
                    {p.status === "preorder" ? "احجزي هسه" : "اطلبي هسه"}
                  </WhatsAppButton>
                </div>
                <p className="mt-2 text-sm text-stone">جمّعي كل اللي تريدينه بطلب واحد، أو اطلبي هذا وحده على الواتساب.</p>
              </>
            ) : (
              <>
                <WhatsAppButton size="lg" message={message} data-wa-source="product-notify">{ctaLabel[p.status]}</WhatsAppButton>
                <p className="mt-2 text-sm text-stone">نخبرج أول ما يوصل.</p>
              </>
            )}
          </div>

          {p.concernList.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-ink">يناسب</h2>
              <ul className="flex flex-wrap gap-2">
                {p.concernList.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/concerns/${c.slug}`} className="inline-flex h-9 items-center rounded-full bg-blush px-4 text-sm text-ink hover:bg-petal">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.freeFrom && p.freeFrom.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-ink">خالي من</h2>
              <FreeFromChips items={p.freeFrom} />
            </div>
          )}

          {(p.benefits.length > 0 || p.howToUse || (p.keyIngredients?.length ?? 0) > 0) && (
          <div className="divide-y divide-hairline border-y border-hairline">
            {p.benefits.length > 0 && (
              <Detail title="الفوائد">
                <ul className="list-disc space-y-1.5 ps-5 marker:text-petal">
                  {p.benefits.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </Detail>
            )}
            {p.howToUse && (
              <Detail title="طريقة الاستخدام">
                <p className="whitespace-pre-line">{p.howToUse}</p>
              </Detail>
            )}
            {p.keyIngredients && p.keyIngredients.length > 0 && (
              <Detail title="المكونات الأساسية">
                <ul className="flex flex-wrap gap-2">
                  {p.keyIngredients.map((k) => (
                    <li key={k} dir="auto" className="rounded-full border border-hairline px-3 py-1 text-sm">{k}</li>
                  ))}
                </ul>
                <Link href="/guide" className="mt-3 inline-block text-sm text-rose underline-offset-4 hover:underline">
                  شنو تسوي هالمكونات؟
                </Link>
              </Detail>
            )}
          </div>
          )}

          {p.reelUrl && (
            <a
              href={p.reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-hairline p-4 hover:border-petal hover:bg-blush"
            >
              <PlayCircle aria-hidden strokeWidth={1.5} className="size-8 shrink-0 text-rose" />
              <span>
                <span className="block font-medium text-ink">شوفي الشرح بالفيديو</span>
                <span className="block text-sm text-stone">على إنستغرام</span>
              </span>
            </a>
          )}
        </div>
      </Container>

      {p.related.length > 0 && (
        <Container className="mt-20 space-y-6">
          <SectionHeader title="ممكن يعجبج هم" href="/products" />
          <ProductGrid products={p.related} />
        </Container>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{p.nameAr}</p>
            <PriceTag price={p.price} compareAtPrice={p.compareAtPrice} className="text-sm" />
          </div>
          {orderable ? (
            <>
              <WhatsAppButton message={message} variant="outline" data-wa-source="product-bar" aria-label={p.status === "preorder" ? "احجزيه هسه على الواتساب" : "اطلبيه هسه على الواتساب"} className="w-11 px-0">
                {""}
              </WhatsAppButton>
              <AddToBasket item={item} compact />
            </>
          ) : (
            <WhatsAppButton message={message}>{ctaLabel[p.status]}</WhatsAppButton>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 py-5 text-stone">
      <h2 className="font-heading text-base font-medium text-ink">{title}</h2>
      {children}
    </section>
  );
}

function ProductSkeleton() {
  return (
    <Container className="grid gap-8 pt-11 md:grid-cols-2 md:gap-12">
      <Skeleton className="aspect-[4/5] rounded-[2rem] bg-blush" />
      <div className="space-y-4 md:pt-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
    </Container>
  );
}
