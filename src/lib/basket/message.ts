import { formatIQD } from "@/lib/format";
import type { ProductStatus } from "@/lib/catalog/types";

export type BasketItem = {
  slug: string;
  nameAr: string;
  nameLatin: string;
  size?: string;
  price: number | null;
  status: ProductStatus;
  image?: string | null;
  qty: number;
};

export type Customer = { name: string; area: string; notes: string };

export const MAX_QTY = 20;

export function basketTotals(items: BasketItem[]) {
  let total = 0;
  let unpriced = 0;
  let count = 0;
  for (const i of items) {
    count += i.qty;
    if (i.price === null) unpriced += 1;
    else total += i.price * i.qty;
  }
  return { total, unpriced, count };
}

/**
 * The one WhatsApp message the order becomes. Plain text, one item per line,
 * so the owner can read it at a glance and reply with the final price.
 */
export function composeOrderMessage(items: BasketItem[], customer?: Partial<Customer>, baseUrl?: string): string {
  const lines: string[] = ["هلا باليا، أريد أطلب:", ""];

  items.forEach((item, i) => {
    const size = item.size ? ` (${item.size})` : "";
    const price = item.price === null ? "السعر؟" : formatIQD(item.price * item.qty);
    const preorder = item.status === "preorder" ? " — طلب مسبق" : "";
    lines.push(`${i + 1}. ${item.nameAr} — ${item.nameLatin}${size}`);
    lines.push(`   العدد: ${item.qty} · ${price}${preorder}`);
    if (baseUrl) lines.push(`   ${baseUrl.replace(/\/$/, "")}/products/${item.slug}`);
  });

  const { total, unpriced, count } = basketTotals(items);
  lines.push("");
  lines.push(`عدد القطع: ${count}`);
  if (total > 0) {
    lines.push(`المجموع: ${formatIQD(total)}${unpriced > 0 ? " + منتجات سعرها ينأكد" : ""} (بدون التوصيل)`);
  } else if (unpriced > 0) {
    lines.push("الأسعار: أريد أعرفها");
  }

  const name = customer?.name?.trim();
  const area = customer?.area?.trim();
  const notes = customer?.notes?.trim();
  if (name || area || notes) lines.push("");
  if (name) lines.push(`الاسم: ${name}`);
  if (area) lines.push(`المنطقة: ${area}`);
  if (notes) lines.push(`ملاحظات: ${notes}`);

  return lines.join("\n");
}

export type BasketProduct = Omit<BasketItem, "qty">;

/** Slim, serializable copy of a product for client components and storage. */
export function toBasketItem(p: {
  slug: string; nameAr: string; nameLatin: string; size?: string; price: number | null; status: ProductStatus; image?: { src: string } | null;
}): BasketProduct {
  return { slug: p.slug, nameAr: p.nameAr, nameLatin: p.nameLatin, size: p.size, price: p.price, status: p.status, image: p.image?.src ?? null };
}
