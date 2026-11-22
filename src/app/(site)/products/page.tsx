import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getBrands, getConcernTiles, getProductCards } from "@/lib/catalog/data";

export const metadata: Metadata = { alternates: { canonical: "/products" },
  title: "كل المنتجات",
  description: "منتجات عناية ألمانية أصلية للبشرة والشعر والجسم: Balea وISANA وAlverde، مع توصيل لكل العراق.",
};

export default async function ProductsPage() {
  const [products, concerns, brands] = await Promise.all([getProductCards(), getConcernTiles(), getBrands()]);
  return (
    <>
      <PageHeader title="كل المنتجات" description="دوري بالاسم أو المكوّن، أو فلتري حسب المشكلة والبراند." />
      <Container className="py-8">
        {/* The full grid is the static shell; filters hydrate on top of it. */}
        <Suspense fallback={<ProductGrid products={products} priorityCount={2} className="mt-[9.5rem]" />}>
          <CatalogBrowser
            products={products}
            concerns={concerns.map((c) => ({ slug: c.slug, label: c.title }))}
            brands={brands.filter((b) => b.productCount > 0).map((b) => ({ slug: b.slug, label: b.name }))}
          />
        </Suspense>
      </Container>
    </>
  );
}
