"use client";

import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/lib/basket/store";

export function BasketButton() {
  const count = useBasket((s) => (s.hydrated ? s.items.reduce((n, i) => n + i.qty, 0) : 0));
  const setOpen = useBasket((s) => s.setOpen);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(true)}
      aria-label={count > 0 ? `طلبج: ${count} قطعة` : "طلبج فاضي"}
      className="relative"
    >
      <ShoppingBagIcon strokeWidth={1.5} />
      {count > 0 && (
        <span key={count} aria-hidden className="absolute end-1 top-1 animate-pop grid min-w-5 place-items-center rounded-full bg-rose px-1 font-label text-[0.6875rem] font-medium leading-5 text-paper tabular-nums">
          {count}
        </span>
      )}
    </Button>
  );
}
