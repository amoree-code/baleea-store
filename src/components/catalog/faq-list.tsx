import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/lib/catalog/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-3xl border border-hairline bg-paper px-5">
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`q${i}`} className="border-hairline">
          <AccordionTrigger className="py-4 text-base text-ink hover:no-underline">{f.question}</AccordionTrigger>
          <AccordionContent className="whitespace-pre-line pb-4 text-stone">{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
