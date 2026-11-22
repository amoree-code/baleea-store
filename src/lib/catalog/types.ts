// View types used by components. Sanity data is parsed into these in src/lib/catalog/data.ts.

export type ProductStatus = "available" | "preorder" | "soldout";
export type Category = "skin" | "hair" | "body" | "makeup";

export type FreeFrom =
  | "parabens"
  | "sulfates"
  | "silicones"
  | "fragrance"
  | "alcohol"
  | "aluminium"
  | "dyes"
  | "microplastics"
  | "paraffin";

export type ProductImage = { src: string; alt: string; width?: number; height?: number; blurDataURL?: string };

export type ProductCardData = {
  slug: string;
  brand: string;
  brandSlug?: string;
  category?: Category;
  concerns?: string[];
  nameLatin: string;
  nameAr: string;
  size?: string;
  price: number | null;
  compareAtPrice?: number | null;
  status: ProductStatus;
  freeFrom?: FreeFrom[];
  keyIngredients?: string[];
  image?: ProductImage | null;
  isNew?: boolean;
};

export type ProductDetail = ProductCardData & {
  summary?: string;
  benefits: string[];
  howToUse?: string;
  reelUrl?: string;
  images: ProductImage[];
  concernList: { slug: string; title: string }[];
  related: ProductCardData[];
};

export type ConcernTileData = { slug: string; title: string; hint: string; productCount: number };
export type ConcernPage = { slug: string; title: string; hint: string; intro?: string; products: ProductCardData[] };
export type BrandSummary = { slug: string; name: string; productCount: number };
export type BrandPage = { slug: string; name: string; about?: string; products: ProductCardData[] };
export type Faq = { question: string; answer: string };
export type Offer = { slug: string; title: string; price: number | null; description?: string; products: ProductCardData[] };
export type Review = { id: string; quote?: string; image: ProductImage; product?: { slug: string; nameAr: string } };

export const categoryLabel: Record<Category, string> = {
  skin: "البشرة",
  hair: "الشعر",
  body: "الجسم",
  makeup: "المكياج",
};
