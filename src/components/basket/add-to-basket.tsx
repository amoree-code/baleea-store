"use client";

import { CheckIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBasket } from "@/lib/basket/store";
import type { BasketProduct } from "@/lib/basket/message";
import { cn } from "@/lib/utils";
import { QtyStepper } from "./qty-stepper";
import { useAddToBasket } from "./use-add-to-basket";

/** Product-page control: add, then adjust quantity in place. Sold-out items never reach here. */
export function AddToBasket({ item: product, compact, className }: { item: BasketProduct; compact?: boolean; className?: string }) {
  const hydrated = useBasket((s) => s.hydrated);
  const line = useBasket((s) => s.items.find((i) => i.slug === product.slug));
  const setQty = useBasket((s) => s.setQty);
  const setOpen = useBasket((s) => s.setOpen);
  const addToBasket = useAddToBasket();

  if (hydrated && line && compact) {
    // Sticky mobile bar: no room for a stepper; the next step is the order itself.
    return (
      <Button onClick={() => setOpen(true)} className={cn("gap-1.5", className)}>
        <CheckIcon strokeWidth={1.5} />
        شوفي طلبج
      </Button>
    );
  }

  if (hydrated && line) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <QtyStepper qty={line.qty} onChange={(q) => setQty(product.slug, q)} label={product.nameAr} />
        <Button variant="outline" size="lg" onClick={() => setOpen(true)} className="gap-1.5">
          <CheckIcon strokeWidth={1.5} className="text-leaf" />
          بطلبج — شوفيه
        </Button>
      </div>
    );
  }

  return (
    <Button size={compact ? "default" : "lg"} onClick={() => addToBasket(product)} className={cn("gap-2", className)}>
      <ShoppingBagIcon strokeWidth={1.5} />
      {product.status === "preorder" ? "أضيفي للطلب (طلب مسبق)" : "أضيفي للطلب"}
    </Button>
  );
}
