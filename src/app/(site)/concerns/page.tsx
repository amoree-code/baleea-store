import type { Metadata } from "next";
import { ConcernTile } from "@/components/brand";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getConcernTiles } from "@/lib/catalog/data";

export const metadata: Metadata = { alternates: { canonical: "/concerns" },
  title: "تسوقي حسب المشكلة",
  description: "حب الشباب، التصبغات، التجاعيد، تساقط الشعر… اختاري المشكلة وشوفي المنتجات الألمانية اللي تناسبها.",
};

export default async function ConcernsPage() {
  const concerns = await getConcernTiles();
  return (
    <>
      <PageHeader title="شنو تحتاجين؟" description="اختاري المشكلة اللي تضايقج، ونطلعلج المنتجات المناسبة إلها." />
      <Container className="py-10">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {concerns.map((c) => (
            <li key={c.slug}>
              <ConcernTile concern={c} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
