import { cn } from "@/lib/utils";

const steps = [
  { title: "اختاري منتجج", body: "تصفحي حسب مشكلة بشرتج أو شعرج، أو دوري بالاسم." },
  { title: "دزّي الطلب على الواتساب", body: "زر واحد يفتح الواتساب برسالة جاهزة بيها اسم المنتج." },
  { title: "يوصلج لباب البيت", body: "نأكد وياج السعر والعنوان، ونوصل طلبج لأي محافظة." },
];

export function HowToOrder({ className }: { className?: string }) {
  return (
    <ol className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-3xl border border-hairline bg-paper p-6">
          <span className="font-label text-3xl font-medium text-petal tabular-nums">{i + 1}</span>
          <p className="mt-3 font-heading text-lg font-medium text-ink">{s.title}</p>
          <p className="mt-1 text-stone">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
