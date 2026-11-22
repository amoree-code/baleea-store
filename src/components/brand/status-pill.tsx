import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/catalog/types";

const statusStyle: Record<ProductStatus, { label: string; className: string; dot: string }> = {
  available: { label: "متوفر", className: "text-leaf", dot: "bg-leaf" },
  preorder: { label: "طلب مسبق", className: "text-gold", dot: "bg-gold" },
  soldout: { label: "خلص حالياً", className: "text-stone", dot: "bg-stone/60" },
};

// Sits on paper only: gold and leaf text pass AA there, not on blush/petal.
export function StatusPill({ status, className }: { status: ProductStatus; className?: string }) {
  const s = statusStyle[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", s.className, className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
