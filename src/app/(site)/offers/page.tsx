import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/brand";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { getOffers } from "@/lib/catalog/data";
import { formatIQD } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/offers" }, title: "العروض", description: "بكجات وعروض باليا على منتجات العناية الألمانية الأصلية." };

export default async function OffersPage() {
  const offers = await getOffers();
  return (
    <>
      <PageHeader title="العروض" description="بكجات كاملة بسعر أوفر من شراء كل منتج لحاله." />
      <Container className="space-y-16 py-10">
        {offers.length === 0 && (
          <EmptyState title="ماكو عروض هسه">
            <p>العروض تنزل أول بأول على الإنستغرام.</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-medium text-rose underline-offset-4 hover:underline">
              تابعينا حتى لا تفوتج
            </a>
          </EmptyState>
        )}
        {offers.map((o) => {
          const items = o.products.map((p) => `• ${p.nameAr} — ${p.nameLatin}`).join("\n");
          return (
            <section key={o.slug} id={o.slug} className="scroll-mt-24 space-y-6 rounded-[2rem] border border-hairline p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-title font-semibold text-ink">{o.title}</h2>
                  {o.description && <p className="max-w-[60ch] text-stone">{o.description}</p>}
                </div>
                <div className="space-y-2 text-end">
                  {o.price !== null && <p className="text-xl font-semibold text-ink tabular-nums">{formatIQD(o.price)}</p>}
                  <WhatsAppButton message={`هلا باليا، أريد عرض: ${o.title}\n${items}`}>اطلبي العرض</WhatsAppButton>
                </div>
              </div>
              <ProductGrid products={o.products} />
            </section>
          );
        })}
      </Container>
    </>
  );
}
