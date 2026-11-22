// Thin event layer over GA4 (gtag) and Meta Pixel (fbq). Each is optional: with no ID
// configured its script never loads and these calls are no-ops.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Events = {
  /** The conversion: any link that opens WhatsApp. */
  whatsapp_click: { source: string; items?: number; path: string };
  add_to_basket: { slug: string; status: string };
};

const metaStandard: Partial<Record<keyof Events, string>> = {
  whatsapp_click: "Contact",
  add_to_basket: "AddToCart",
};

export function track<E extends keyof Events>(event: E, params: Events[E]) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  const meta = metaStandard[event];
  if (meta) window.fbq?.("track", meta, params);
}
