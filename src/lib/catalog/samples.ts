import type { ConcernTileData, ProductCardData } from "./types";

// Sample entries from docs/baleea-content.md for the styleguide only.
// Prices are illustrative; real prices come from Sanity in Phase 2.
export const sampleProducts: ProductCardData[] = [
  {
    slug: "balea-vitamin-c-dunkle-flecken-aufheller",
    brand: "Balea",
    nameLatin: "Vitamin C Dunkle Flecken Aufheller",
    nameAr: "مفتّح البقع الداكنة بفيتامين سي",
    size: "30 ml",
    price: null,
    status: "available",
    isNew: true,
  },
  {
    slug: "balea-ultra-sensitive-waschgel",
    brand: "Balea",
    nameLatin: "Ultra Sensitive Waschgel",
    nameAr: "غسول البشرة الحساسة جداً",
    size: "150 ml",
    price: 15000,
    status: "available",
    freeFrom: ["fragrance", "parabens", "dyes"],
  },
  {
    slug: "isana-haartonikum-coffein",
    brand: "ISANA",
    nameLatin: "Haartonikum Coffein",
    nameAr: "تونك الكافيين لتساقط الشعر",
    size: "150 ml",
    price: 18000,
    compareAtPrice: 22000,
    status: "preorder",
  },
  {
    slug: "balea-deo-creme-natron",
    brand: "Balea",
    nameLatin: "Deo Creme Natron 48h",
    nameAr: "كريم مزيل عرق ببيكربونات الصوديوم",
    size: "50 ml",
    price: null,
    status: "soldout",
    freeFrom: ["alcohol", "aluminium", "parabens", "paraffin"],
  },
];

export const sampleConcerns: ConcernTileData[] = [
  { slug: "acne", title: "حب الشباب", hint: "غسولات وتقشير بالساليسيليك", productCount: 6 },
  { slug: "pigmentation", title: "التصبغات والبقع", hint: "فيتامين سي ونياسيناميد", productCount: 4 },
  { slug: "anti-aging", title: "التجاعيد", hint: "Q10 وريتينول", productCount: 7 },
  { slug: "hair-loss", title: "تساقط الشعر", hint: "كافيين وتقوية الجذور", productCount: 3 },
];
