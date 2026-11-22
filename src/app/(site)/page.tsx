import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConcernTile, RouteSeal, SectionHeader, TrustStrip, WhatsAppButton } from "@/components/brand";
import { FaqList } from "@/components/catalog/faq-list";
import { HowToOrder } from "@/components/catalog/how-to-order";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getBrands, getConcernTiles, getFaqs, getProductCards } from "@/lib/catalog/data";
import { guide } from "@/lib/content/guide";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [products, concerns, brands, faqs] = await Promise.all([
    getProductCards(),
    getConcernTiles(),
    getBrands(),
    getFaqs(),
  ]);
  const fresh = [...products].sort((a, b) => Number(b.isNew) - Number(a.isNew)).slice(0, 8);

  return (
    <>
      <Container className="grid items-center gap-10 pb-12 pt-10 md:grid-cols-[1fr_auto] md:pb-20 md:pt-20">
        <div className="space-y-6">
          <p className="animate-settle text-sm font-medium text-rose">{site.tagline}</p>
          <h1 className="animate-settle text-display font-bold text-ink">
            عناية ألمانية أصلية،
            <br />
            <span className="text-rose">توصلج لباب البيت.</span>
          </h1>
          <p className="max-w-[52ch] animate-settle text-lg text-stone">{site.description}</p>
          <div className="flex animate-rise flex-wrap gap-3 [animation-delay:120ms]">
            <Link href="/products" className={buttonVariants({ size: "lg" })}>
              تصفحي المنتجات
            </Link>
            <WhatsAppButton size="lg" variant="outline" message="هلا باليا، أريد أسأل عن منتج">
              اسألينا على الواتساب
            </WhatsAppButton>
          </div>
        </div>
        <RouteSeal size={200} animated className="animate-rise justify-self-center [animation-delay:200ms]" />
      </Container>

      <Container className="space-y-20">
        <TrustStrip className="animate-rise [animation-delay:260ms]" />

        {concerns.length > 0 && (
          <section aria-labelledby="concerns" className="reveal space-y-6">
            <SectionHeader
              title="شنو تحتاجين؟"
              description="اختاري المشكلة، ونطلعلج المنتجات اللي تناسبها."
              href="/concerns"
            />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {concerns.map((c) => (
                <li key={c.slug}>
                  <ConcernTile concern={c} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {fresh.length > 0 && (
          <section className="space-y-6">
            <SectionHeader className="reveal" title="وصلنا حديثاً" href="/products" linkLabel={`كل المنتجات (${products.length})`} />
            <ProductGrid products={fresh} priorityCount={2} />
          </section>
        )}

        <section className="reveal space-y-6">
          <SectionHeader title="شلون تطلبين؟" description="بدون حساب وبدون دفع أونلاين." />
          <HowToOrder />
        </section>

        {brands.length > 0 && (
          <section className="reveal space-y-6">
            <SectionHeader title="البراندات" />
            <ul className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-5 transition-colors hover:border-petal hover:bg-blush"
                  >
                    <span dir="ltr" className="font-label font-medium text-ink">{b.name}</span>
                    <span className="text-xs text-stone tabular-nums">{b.productCount}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="reveal space-y-6">
          <SectionHeader title="دليل المكونات" description="شنو يسوي كل مكوّن، وشلون تستخدمينه صح." href="/guide" linkLabel="اقري الدليل" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guide.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guide#${g.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-3xl bg-blush p-5 transition-colors hover:bg-petal/60"
                >
                  <span dir="ltr" className="text-end font-label text-xs font-medium tracking-wide text-rose">{g.latin}</span>
                  <span className="font-heading text-lg font-medium text-ink">{g.title}</span>
                  <span className="line-clamp-3 text-sm text-stone">{g.body}</span>
                  <ArrowLeft aria-hidden strokeWidth={1.5} className="mt-auto size-5 text-rose transition-transform group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {faqs.length > 0 && (
          <section className="reveal grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeader title="أسئلة تتكرر" description="إذا سؤالج مو موجود، اسألينا مباشرة." href="/faq" className="self-start" />
            <FaqList faqs={faqs.slice(0, 4)} />
          </section>
        )}

        <section className="reveal flex flex-col items-center gap-5 rounded-[2rem] bg-blush px-6 py-14 text-center">
          <h2 className="text-title font-semibold text-ink">محتارة شنو يناسب بشرتج؟</h2>
          <p className="max-w-[46ch] text-stone">دزيلنا نوع بشرتج والمشكلة، ونقترحلج روتين من المنتجات المتوفرة.</p>
          <WhatsAppButton size="lg" message="هلا باليا، أريد مساعدة أختار منتجات تناسب بشرتي">
            اسألينا على الواتساب
          </WhatsAppButton>
        </section>
      </Container>
    </>
  );
}
