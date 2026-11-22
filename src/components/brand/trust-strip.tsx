import { BadgeCheck, MessageCircleHeart, Plane, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: BadgeCheck, title: "أصلي 100%", body: "مستورد من ألمانيا مباشرة" },
  { icon: Plane, title: "من ألمانيا للعراق", body: "نفس المنتج اللي ينباع هناك" },
  { icon: Truck, title: "توصيل لكل العراق", body: "بغداد وكل المحافظات" },
  { icon: MessageCircleHeart, title: "نساعدج تختارين", body: "اسألينا على الواتساب" },
] as const;

export function TrustStrip({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl bg-blush p-5 sm:p-6 lg:grid-cols-4", className)}>
      {items.map(({ icon: Icon, title, body }) => (
        <li key={title} className="flex items-start gap-3">
          <Icon aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-rose" />
          <div>
            <p className="font-medium leading-snug text-ink">{title}</p>
            <p className="text-sm leading-snug text-stone">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
