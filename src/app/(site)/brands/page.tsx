import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getBrands } from "@/lib/catalog/data";

export const metadata: Metadata = { alternates: { canonical: "/brands" }, title: "البراندات", description: "Balea وISANA وAlverde وغيرها، كلها أصلية من ألمانيا." };

export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <>
      <PageHeader title="البراندات" description="كلها براندات ألمانية نستوردها مباشرة." />
      <Container className="py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <li key={b.slug}>
              <Link href={`/brands/${b.slug}`} className="flex items-center justify-between rounded-2xl border border-hairline p-5 hover:border-petal hover:bg-blush">
                <span dir="ltr" className="font-label text-lg font-medium text-ink">{b.name}</span>
                <span className="text-sm text-stone tabular-nums">{b.productCount} منتج</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
