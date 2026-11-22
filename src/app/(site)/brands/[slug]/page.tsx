import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getBrand, getBrands } from "@/lib/catalog/data";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBrand(slug);
  if (!b) return { title: "الصفحة غير موجودة" };
  return { alternates: { canonical: `/brands/${b.slug}` }, title: `منتجات ${b.name}`, description: b.about ?? `منتجات ${b.name} الأصلية من ألمانيا، متوفرة عند باليا مع توصيل لكل العراق.` };
}

export default function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  return (
    <Suspense fallback={<Container className="py-14"><Skeleton className="h-12 w-1/2" /></Container>}>
      <BrandView params={params} />
    </Suspense>
  );
}

async function BrandView({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBrand(slug);
  if (!b) notFound();
  return (
    <>
      <PageHeader eyebrow="براند ألماني" title={b.name} description={b.about}>
        <Breadcrumbs items={[{ href: "/", label: "الرئيسية" }, { href: "/brands", label: "البراندات" }]} />
      </PageHeader>
      <Container className="py-10">
        {b.products.length > 0 ? (
          <>
            <h2 className="sr-only">منتجات {b.name}</h2>
            <ProductGrid products={b.products} priorityCount={2} />
          </>
        ) : (
          <EmptyState title="ماكو منتجات من هالبراند هسه" />
        )}
      </Container>
    </>
  );
}
