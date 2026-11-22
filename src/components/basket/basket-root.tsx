"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useBasket } from "@/lib/basket/store";
import { BasketSheet } from "./basket-sheet";

/** Mounted once in the layout: restores the saved order, hosts the sheet and toasts. */
export function BasketRoot() {
  useEffect(() => {
    void useBasket.persist.rehydrate();
    // Another tab changed the order: pick it up.
    const onStorage = (e: StorageEvent) => {
      if (e.key === useBasket.persist.getOptions().name) void useBasket.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return (
    <>
      <BasketSheet />
      <Toaster position="top-center" />
    </>
  );
}
