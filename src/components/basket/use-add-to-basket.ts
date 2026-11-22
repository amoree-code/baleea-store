"use client";

import { toast } from "sonner";
import type { BasketProduct } from "@/lib/basket/message";
import { useBasket } from "@/lib/basket/store";
import { track } from "@/lib/analytics";

export function useAddToBasket() {
  const add = useBasket((s) => s.add);
  const setOpen = useBasket((s) => s.setOpen);
  return (item: BasketProduct) => {
    add(item);
    track("add_to_basket", { slug: item.slug, status: item.status });
    toast.success("انضاف لطلبج", {
      description: item.nameAr,
      action: { label: "شوفي الطلب", onClick: () => setOpen(true) },
    });
  };
}
