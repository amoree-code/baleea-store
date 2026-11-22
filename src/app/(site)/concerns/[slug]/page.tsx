import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WhatsAppButton } from "@/components/brand";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getConcern, getConcernTiles } from "@/lib/catalog/data";

export async function generateStaticParams() {
  const concerns = await getConcernTiles();
  return concerns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concerns/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await getConcern(slug);
  if (!c) return { title: "الصفحة غير موجودة" };
  return { alternates: { canonical: `/concerns/${c.slug}` }, title: `منتجات ${c.title}`, description: c.intro ?? `${c.hint}. منتجات ألمانية أصلية تناسب ${c.title}.` };
}

export default function ConcernPage({ params }: PageProps<"/concerns/[slug]">) {
  return (
    <Suspense fallback={<Container className="py-14"><Skeleton className="h-12 w-1/2" /></Container>}>
      <ConcernView params={params} />
    </Suspense>
  );
}

async function ConcernView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getConcern(slug);
  if (!c) notFound();
  return (
    <>
      <PageHeader eyebrow={c.hint} title={c.title} description={c.intro}>
        <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { href: "/concerns", label: "حسب المشكلة" }]} />
      </PageHeader>
      <Container className="space-y-10 py-10">
        {c.products.length > 0 ? (
          <>
            <h2 className="sr-only">منتجات {c.title}</h2>
            <ProductGrid products={c.products} priorityCount={2} />
          </>
        ) : (
          <EmptyState title="ماكو منتجات لهالمشكلة هسه">اسألينا على الواتساب، نقترحلج شي يناسبج.</EmptyState>
        )}
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-blush p-8 text-center">
          <p className="font-heading text-lg font-medium text-ink">ما تعرفين شنو تختارين؟</p>
          <WhatsAppButton message={`هلا باليا، عندي مشكلة ${c.title} وأريد تنصحوني بمنتج`}>اسألينا عن {c.title}</WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
