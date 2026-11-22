"use client";

import { CheckIcon, PlusIcon } from "lucide-react";
import { useBasket } from "@/lib/basket/store";
import type { BasketProduct } from "@/lib/basket/message";
import { cn } from "@/lib/utils";
import { useAddToBasket } from "./use-add-to-basket";

// Sits above the card's full-cover link (z-10), on the image corner.
export function QuickAdd({ item: product, className }: { item: BasketProduct; className?: string }) {
  const inBasket = useBasket((s) => s.hydrated && s.items.some((i) => i.slug === product.slug));
  const setOpen = useBasket((s) => s.setOpen);
  const addToBasket = useAddToBasket();
  return (
    <button
      type="button"
      onClick={() => (inBasket ? setOpen(true) : addToBasket(product))}
      aria-label={inBasket ? `${product.nameAr} بطلبج، افتحي الطلب` : `أضيفي ${product.nameAr} للطلب`}
      className={cn(
        "relative z-10 grid size-11 place-items-center rounded-full shadow-sm transition-[color,background-color,scale] active:scale-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        inBasket ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-rose hover:text-paper",
        className,
      )}
    >
      {inBasket ? <CheckIcon key="in" strokeWidth={1.5} className="size-5 animate-pop" /> : <PlusIcon key="add" strokeWidth={1.5} className="size-5" />}
    </button>
  );
}
