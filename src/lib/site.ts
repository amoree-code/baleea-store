// Store-wide facts. Phase 2 moves the editable ones into Sanity `siteSettings`.

// Canonical origin for SEO. NEXT_PUBLIC_SITE_URL wins (set it once the domain is live);
// on Vercel the production URL is the fallback; locally, localhost.
const origin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  name: "baleea.iq",
  nameAr: "باليا",
  tagline: "منتجات عناية ألمانية أصلية، من ألمانيا للعراق",
  description:
    "نوفر لكِ منتجات عناية للبشرة والشعر مستوردة من ألمانيا للعراق، أصلية 100%، مع توصيل لكل مناطق بغداد والمحافظات.",
  phoneDisplay: "0781 267 9998",
  phoneTel: "+9647812679998",
  whatsappNumber: "9647812679998",
  instagram: "https://www.instagram.com/baleea__",
  tiktok: "https://www.tiktok.com/@bela__skincare",
  locale: "ar-IQ",
  /** Public origin, set at deploy (NEXT_PUBLIC_SITE_URL). Without it, order messages carry no links. */
  url: process.env.NEXT_PUBLIC_SITE_URL,
  origin: origin.replace(/\/$/, ""),
} as const;
