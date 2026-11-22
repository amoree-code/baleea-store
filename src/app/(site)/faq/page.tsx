import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/brand";
import { FaqList } from "@/components/catalog/faq-list";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { getFaqs } from "@/lib/catalog/data";

export const metadata: Metadata = { alternates: { canonical: "/faq" },
  title: "أسئلة مهمة",
  description: "التوصيل، أصالة المنتجات، وطريقة الطلب من باليا.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <PageHeader title="أسئلة مهمة" description="كل شي تحتاجين تعرفينه قبل ما تطلبين." />
      <Container className="max-w-3xl space-y-10 py-10">
        {faqs.length > 0 ? <FaqList faqs={faqs} /> : <EmptyState title="الأسئلة راح تنضاف قريباً" />}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-stone">سؤالج مو موجود؟</p>
          <WhatsAppButton message="هلا باليا، عندي سؤال">اسألينا مباشرة</WhatsAppButton>
        </div>
      </Container>
    </>
  );
}
