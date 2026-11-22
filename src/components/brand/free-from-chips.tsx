import { cn } from "@/lib/utils";
import type { FreeFrom } from "@/lib/catalog/types";

export const freeFromLabel: Record<FreeFrom, string> = {
  parabens: "بدون بارابين",
  sulfates: "بدون سلفات",
  silicones: "بدون سيليكون",
  fragrance: "بدون عطور",
  alcohol: "بدون كحول",
  aluminium: "بدون ألمنيوم",
  dyes: "بدون أصباغ",
  microplastics: "بدون مايكروبلاستك",
  paraffin: "بدون بارافين",
};

export function FreeFromChips({
  items,
  max,
  className,
}: {
  items: FreeFrom[];
  max?: number;
  className?: string;
}) {
  if (items.length === 0) return null;
  const shown = max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="خالي من">
      {shown.map((f) => (
        <li key={f} className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-stone">
          {freeFromLabel[f]}
        </li>
      ))}
      {rest > 0 && <li dir="ltr" className="px-1 py-0.5 text-xs text-stone tabular-nums">+{rest}</li>}
    </ul>
  );
}
