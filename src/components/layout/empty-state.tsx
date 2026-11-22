import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-dashed border-petal bg-paper px-6 py-12 text-center", className)}>
      <p className="font-heading text-lg font-medium text-ink">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-[48ch] text-stone">{children}</div>}
    </div>
  );
}
