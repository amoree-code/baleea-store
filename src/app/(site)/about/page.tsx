import type { Metadata } from "next";
import { RouteSeal, TrustStrip, WhatsAppButton } from "@/components/brand";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/about" },
  title: "عن باليا",
  description: "باليا متجر من بغداد يستورد منتجات عناية أصلية من ألمانيا للعراق.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="من ألمانيا للعراق" title="عن باليا" />
      <Container className="grid gap-12 py-12 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-5 text-lg leading-relaxed text-ink/90">
          <p>
            باليا بدت من بغداد بفكرة بسيطة: نفس منتجات العناية اللي تلگينها بصيدليات ألمانيا، توصل لإيدج بالعراق، أصلية
            ومضمونة.
          </p>
          <p>
            نستورد المنتجات من ألمانيا مباشرة، ونختار اللي يناسب بشرة وجو العراق: واقيات الشمس، علاجات حب الشباب
            والتصبغات، ومنتجات الشعر.
          </p>
          <p>
            ما عدنا سلة ولا دفع أونلاين. تختارين المنتج، تدزين الطلب على الواتساب، ونوصله لباب بيتج بأي محافظة.
          </p>
          <p className="text-base text-stone">
            ملاحظة: باليا بائع مستقل، ومو تابعة لشركة Balea أو dm. الأسماء التجارية ملك أصحابها.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <WhatsAppButton message="هلا باليا">راسلينا</WhatsAppButton>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-hairline px-5 font-medium hover:bg-blush">
              تابعينا على إنستغرام
            </a>
          </div>
        </div>
        <RouteSeal size={240} className="justify-self-center" />
      </Container>
      <Container>
        <TrustStrip />
      </Container>
    </>
  );
}
