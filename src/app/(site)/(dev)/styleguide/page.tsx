import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  ConcernTile,
  FreeFromChips,
  PriceTag,
  ProductCard,
  RouteSeal,
  SectionHeader,
  StatusPill,
  TrustStrip,
  WhatsAppButton,
  Wordmark,
} from "@/components/brand";
import { sampleConcerns, sampleProducts } from "@/lib/catalog/samples";
import { productInquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "دليل التصميم",
  robots: { index: false, follow: false },
};

const swatches = [
  ["paper", "bg-paper", "#FFFFFF"],
  ["blush", "bg-blush", "#FBEFF1"],
  ["petal", "bg-petal", "#F2C9D1"],
  ["rose", "bg-rose", "#9B2F4C"],
  ["rose-deep", "bg-rose-deep", "#7D2440"],
  ["ink", "bg-ink", "#261C21"],
  ["stone", "bg-stone", "#6B5D63"],
  ["hairline", "bg-hairline", "#EDE3E6"],
  ["gold", "bg-gold", "#8F6B2C"],
  ["leaf", "bg-leaf", "#3F7254"],
] as const;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <SectionHeader title={title} as="h2" />
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <Wordmark />
          <h1 className="text-display font-semibold leading-tight">دليل التصميم</h1>
          <p className="max-w-[60ch] text-stone">الألوان والخطوط والمكونات المعتمدة للموقع. صفحة داخلية، ما تظهر بمحركات البحث.</p>
        </div>
        <RouteSeal animated />
      </header>

      <Block title="الألوان">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {swatches.map(([name, cls, hex]) => (
            <li key={name} className="space-y-2">
              <div className={`h-16 rounded-xl border border-hairline ${cls}`} />
              <p dir="ltr" className="text-end font-label text-sm">
                {name} <span className="text-stone">{hex}</span>
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="الخطوط">
        <div className="space-y-4">
          <p className="font-heading text-display font-semibold leading-tight">عناية ألمانية أصلية</p>
          <p className="font-heading text-title font-medium">من ألمانيا للعراق، بدون وسيط</p>
          <p className="max-w-[70ch]">
            غسول لطيف للبشرة الحساسة جداً، بدون عطور أو بارابين أو أصباغ. يهدّي البشرة ويحافظ على توازنها، ومناسب للاستخدام اليومي.
          </p>
          <p dir="ltr" className="text-end font-label text-xl">Balea Ultra Sensitive Waschgel <span className="tabular-nums text-stone">150 ml</span></p>
        </div>
      </Block>

      <Block title="الأزرار">
        <div className="flex flex-wrap items-center gap-3">
          <Button>أضيفي للطلب</Button>
          <Button variant="outline">شوفي التفاصيل</Button>
          <Button variant="secondary">خبريني من يتوفر</Button>
          <Button variant="ghost">إلغاء</Button>
          <WhatsAppButton message={productInquiryMessage(sampleProducts[1])} />
          <Button size="sm">صغير</Button>
          <Button size="lg">كبير</Button>
        </div>
      </Block>

      <Block title="الأسعار والحالة">
        <div className="flex flex-wrap items-center gap-8">
          <PriceTag price={15000} />
          <PriceTag price={18000} compareAtPrice={22000} />
          <PriceTag price={null} />
          <StatusPill status="available" />
          <StatusPill status="preorder" />
          <StatusPill status="soldout" />
        </div>
        <FreeFromChips items={["parabens", "sulfates", "silicones", "fragrance", "microplastics"]} />
      </Block>

      <Block title="شريط الثقة">
        <TrustStrip />
      </Block>

      <Block title="تسوقي حسب المشكلة">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sampleConcerns.map((c) => (
            <ConcernTile key={c.slug} concern={c} />
          ))}
        </div>
      </Block>

      <Block title="بطاقات المنتجات">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {sampleProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Block>
    </main>
  );
}
