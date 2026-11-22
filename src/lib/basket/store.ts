"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MAX_QTY, type BasketItem, type Customer } from "./message";

type BasketState = {
  items: BasketItem[];
  customer: Customer;
  open: boolean;
  hydrated: boolean;
  add: (item: Omit<BasketItem, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  setCustomer: (patch: Partial<Customer>) => void;
  setOpen: (open: boolean) => void;
};

const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.round(n)));

export const useBasket = create<BasketState>()(
  persist(
    (set) => ({
      items: [],
      customer: { name: "", area: "", notes: "" },
      open: false,
      hydrated: false,
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === item.slug);
          if (existing) {
            return { items: s.items.map((i) => (i.slug === item.slug ? { ...i, ...item, qty: clamp(i.qty + qty) } : i)) };
          }
          return { items: [...s.items, { ...item, qty: clamp(qty) }] };
        }),
      setQty: (slug, qty) => set((s) => ({ items: s.items.map((i) => (i.slug === slug ? { ...i, qty: clamp(qty) } : i)) })),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      clear: () => set({ items: [] }),
      setCustomer: (patch) => set((s) => ({ customer: { ...s.customer, ...patch } })),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "baleea-basket",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Only the order and her details survive a reload; UI state does not.
      partialize: (s) => ({ items: s.items, customer: s.customer }),
      // Rehydrated from BasketRoot after mount, so server and first client render match.
      skipHydration: true,
      onRehydrateStorage: () => () => useBasket.setState({ hydrated: true }),
    },
  ),
);
