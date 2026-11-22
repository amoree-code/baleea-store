"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { MAX_QTY } from "@/lib/basket/message";
import { cn } from "@/lib/utils";

export function QtyStepper({
  qty,
  onChange,
  label,
  size = "default",
  className,
}: {
  qty: number;
  onChange: (qty: number) => void;
  label: string;
  size?: "default" | "sm";
  className?: string;
}) {
  const btn = cn("grid place-items-center rounded-full text-ink transition-colors hover:bg-blush disabled:opacity-40", size === "sm" ? "size-9" : "size-11");
  return (
    <div role="group" aria-label={`عدد ${label}`} className={cn("inline-flex items-center rounded-full border border-hairline", className)}>
      <button type="button" className={btn} onClick={() => onChange(qty + 1)} disabled={qty >= MAX_QTY} aria-label="زيدي وحدة">
        <PlusIcon strokeWidth={1.5} className="size-4" />
      </button>
      <span aria-live="polite" className="min-w-7 text-center font-label font-medium tabular-nums">
        {qty}
      </span>
      <button type="button" className={btn} onClick={() => onChange(qty - 1)} disabled={qty <= 1} aria-label="نقصي وحدة">
        <MinusIcon strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  );
}
