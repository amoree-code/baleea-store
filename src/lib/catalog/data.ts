import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { client } from "@/sanity/client";
import { imageUrl } from "@/sanity/image";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  CONCERN_QUERY,
  CONCERNS_QUERY,
  FAQS_QUERY,
  OFFERS_QUERY,
  PRODUCT_CARDS_QUERY,
  PRODUCT_QUERY,
  PRODUCT_SLUGS_QUERY,
  REVIEWS_QUERY,
} from "@/sanity/queries";
import {
  brandPageSchema,
  brandSummarySchema,
  concernPageSchema,
  concernTileSchema,
  faqSchema,
  offerSchema,
  productCardSchema,
  productDetailSchema,
  reviewSchema,
  type SanityImage,
} from "./schema";
import type {
  BrandPage,
  BrandSummary,
  ConcernPage,
  ConcernTileData,
  Faq,
  Offer,
  ProductCardData,
  ProductDetail,
  ProductImage,
  Review,
} from "./types";

// Every read is cached until the Sanity webhook calls revalidateTag(<document _type>).
// Invalid documents are dropped and logged instead of breaking a whole page.

function parseList<T extends z.ZodType>(schema: T, data: unknown, label: string): z.output<T>[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((item, i) => {
    const r = schema.safeParse(item);
    if (r.success) return [r.data];
    console.error(`[catalog] invalid ${label} #${i}:`, z.prettifyError(r.error));
    return [];
  });
}

function parseOne<T extends z.ZodType>(schema: T, data: unknown, label: string): z.output<T> | null {
  if (data == null) return null;
  const r = schema.safeParse(data);
  if (r.success) return r.data;
  console.error(`[catalog] invalid ${label}:`, z.prettifyError(r.error));
  return null;
}

function toImage(img: SanityImage, fallbackAlt: string, width: number): ProductImage {
  const dims = img.asset.metadata?.dimensions;
  return {
    src: imageUrl(img).width(width).url(),
    alt: img.alt ?? fallbackAlt,
    width: dims?.width,
    height: dims?.height,
    blurDataURL: img.asset.metadata?.lqip ?? undefined,
  };
}

function toCards(raw: unknown): ProductCardData[] {
  return parseList(productCardSchema, raw, "product").map(({ image, ...p }) => ({
    ...p,
    image: image ? toImage(image, `${p.nameAr} ${p.nameLatin}`, 800) : null,
  }));
}

export async function getProductCards(): Promise<ProductCardData[]> {
  "use cache";
  cacheLife("max");
  cacheTag("product", "brand", "concern");
  return toCards(await client.fetch(PRODUCT_CARDS_QUERY));
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("max");
  cacheTag("product");
  const raw = await client.fetch(PRODUCT_SLUGS_QUERY);
  return z.array(z.string()).catch([]).parse(raw);
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  "use cache";
  cacheLife("max");
  cacheTag("product", "brand", "concern");
  const p = parseOne(productDetailSchema, await client.fetch(PRODUCT_QUERY, { slug }), `product ${slug}`);
  if (!p) return null;
  const alt = `${p.nameAr} ${p.nameLatin}`;
  return {
    ...p,
    image: p.image ? toImage(p.image, alt, 800) : null,
    images: p.images.map((img) => toImage(img, alt, 1200)),
    related: pickRelated(p, await getProductCards()),
  };
}

// Shared concerns rank first, then same category; never the product itself.
function pickRelated(p: { slug: string; concerns: string[]; category?: string }, all: ProductCardData[], limit = 4) {
  const score = (c: ProductCardData) =>
    (c.concerns ?? []).filter((x) => p.concerns.includes(x)).length * 2 + (c.category && c.category === p.category ? 1 : 0);
  return all
    .filter((c) => c.slug !== p.slug)
    .map((c) => ({ c, s: score(c) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ c }) => c);
}

export async function getConcernTiles(): Promise<ConcernTileData[]> {
  "use cache";
  cacheLife("max");
  cacheTag("concern", "product");
  return parseList(concernTileSchema, await client.fetch(CONCERNS_QUERY), "concern");
}

export async function getConcern(slug: string): Promise<ConcernPage | null> {
  "use cache";
  cacheLife("max");
  cacheTag("concern", "product", "brand");
  const c = parseOne(concernPageSchema, await client.fetch(CONCERN_QUERY, { slug }), `concern ${slug}`);
  return c ? { ...c, products: toCards(c.products) } : null;
}

export async function getBrands(): Promise<BrandSummary[]> {
  "use cache";
  cacheLife("max");
  cacheTag("brand", "product");
  return parseList(brandSummarySchema, await client.fetch(BRANDS_QUERY), "brand");
}

export async function getBrand(slug: string): Promise<BrandPage | null> {
  "use cache";
  cacheLife("max");
  cacheTag("brand", "product", "concern");
  const b = parseOne(brandPageSchema, await client.fetch(BRAND_QUERY, { slug }), `brand ${slug}`);
  return b ? { ...b, products: toCards(b.products) } : null;
}

export async function getFaqs(): Promise<Faq[]> {
  "use cache";
  cacheLife("max");
  cacheTag("faq");
  return parseList(faqSchema, await client.fetch(FAQS_QUERY), "faq");
}

export async function getOffers(): Promise<Offer[]> {
  "use cache";
  cacheLife("max");
  cacheTag("offer", "product", "brand");
  return parseList(offerSchema, await client.fetch(OFFERS_QUERY), "offer").map((o) => ({ ...o, products: toCards(o.products) }));
}

export async function getReviews(): Promise<Review[]> {
  "use cache";
  cacheLife("max");
  cacheTag("review", "product");
  return parseList(reviewSchema, await client.fetch(REVIEWS_QUERY), "review").map((r) => ({
    ...r,
    image: toImage(r.image, r.product ? `صورة من زبونة عن ${r.product.nameAr}` : "صورة من زبونة", 900),
  }));
}
