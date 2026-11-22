import { site } from "@/lib/site";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productInquiryMessage(product: {
  nameLatin: string;
  nameAr: string;
  size?: string;
}): string {
  const size = product.size ? ` (${product.size})` : "";
  return `هلا باليا، أريد أطلب:\n${product.nameAr} — ${product.nameLatin}${size}`;
}

type InquiryProduct = { nameLatin: string; nameAr: string; size?: string; status: "available" | "preorder" | "soldout" };

const opener: Record<InquiryProduct["status"], string> = {
  available: "هلا باليا، أريد أطلب:",
  preorder: "هلا باليا، أريد أحجز طلب مسبق:",
  soldout: "هلا باليا، خبروني من يتوفر:",
};

export const ctaLabel: Record<InquiryProduct["status"], string> = {
  available: "اطلبيه على الواتساب",
  preorder: "احجزيه على الواتساب",
  soldout: "خبريني من يتوفر",
};

/** Message matched to the product's availability, so a sold-out item is never a dead end. */
export function productStatusMessage(product: InquiryProduct): string {
  const size = product.size ? ` (${product.size})` : "";
  return `${opener[product.status]}\n${product.nameAr} — ${product.nameLatin}${size}`;
}
