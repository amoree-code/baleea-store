import { z } from "zod";

// The boundary: everything from Sanity is parsed here before a component sees it.
// null from GROQ becomes undefined / [] so components deal with one shape.

const optStr = z.string().nullish().transform((v) => v ?? undefined);
const strList = z.array(z.string()).nullish().transform((v) => (v ?? []).filter(Boolean));

const freeFrom = z.enum([
  "parabens", "sulfates", "silicones", "fragrance", "alcohol", "aluminium", "dyes", "microplastics", "paraffin",
]);

export const sanityImageSchema = z.object({
  asset: z.object({
    _id: z.string(),
    url: z.string().url(),
    metadata: z
      .object({ dimensions: z.object({ width: z.number(), height: z.number() }), lqip: z.string().nullish() })
      .nullish(),
  }),
  alt: z.string().nullish(),
  hotspot: z.unknown().optional(),
  crop: z.unknown().optional(),
});

export const productCardSchema = z.object({
  slug: z.string(),
  brand: z.string().nullish().transform((v) => v ?? ""),
  brandSlug: optStr,
  category: z.enum(["skin", "hair", "body", "makeup"]).nullish().transform((v) => v ?? undefined),
  concerns: strList,
  nameLatin: z.string(),
  nameAr: z.string(),
  size: optStr,
  price: z.number().nullish().transform((v) => v ?? null),
  compareAtPrice: z.number().nullish().transform((v) => v ?? null),
  status: z.enum(["available", "preorder", "soldout"]).catch("available"),
  freeFrom: z
    .array(z.string())
    .nullish()
    .transform((v) => (v ?? []).filter((f): f is z.infer<typeof freeFrom> => freeFrom.safeParse(f).success)),
  keyIngredients: strList,
  isNew: z.boolean().nullish().transform((v) => v ?? false),
  image: sanityImageSchema.nullish(),
});

export const productDetailSchema = productCardSchema.extend({
  summary: optStr,
  benefits: strList,
  howToUse: optStr,
  reelUrl: optStr,
  images: z.array(sanityImageSchema).nullish().transform((v) => v ?? []),
  concernList: z
    .array(z.object({ slug: z.string(), title: z.string() }))
    .nullish()
    .transform((v) => v ?? []),
});

export const concernTileSchema = z.object({
  slug: z.string(),
  title: z.string(),
  hint: z.string().nullish().transform((v) => v ?? ""),
  productCount: z.number(),
});

export const concernPageSchema = concernTileSchema.omit({ productCount: true }).extend({
  intro: optStr,
  products: z.array(z.unknown()).nullish().transform((v) => v ?? []),
});

export const brandSummarySchema = z.object({ slug: z.string(), name: z.string(), productCount: z.number() });

export const brandPageSchema = z.object({
  slug: z.string(),
  name: z.string(),
  about: optStr,
  products: z.array(z.unknown()).nullish().transform((v) => v ?? []),
});

export const faqSchema = z.object({ question: z.string(), answer: z.string() });

export const offerSchema = z.object({
  slug: z.string(),
  title: z.string(),
  price: z.number().nullish().transform((v) => v ?? null),
  description: optStr,
  products: z.array(z.unknown()).nullish().transform((v) => v ?? []),
});

export const reviewSchema = z.object({
  id: z.string(),
  quote: optStr,
  image: sanityImageSchema,
  product: z.object({ slug: z.string(), nameAr: z.string() }).nullish().transform((v) => v ?? undefined),
});

export type SanityImage = z.infer<typeof sanityImageSchema>;
