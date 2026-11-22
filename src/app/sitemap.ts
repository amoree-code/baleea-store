import type { MetadataRoute } from "next";
import { getBrands, getConcernTiles, getProductSlugs } from "@/lib/catalog/data";
import { site } from "@/lib/site";

const pages = ["", "/products", "/concerns", "/brands", "/offers", "/guide", "/reviews", "/about", "/faq"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, concerns, brands] = await Promise.all([getProductSlugs(), getConcernTiles(), getBrands()]);
  const url = (path: string) => `${site.origin}${path}`;
  return [
    ...pages.map((p) => ({ url: url(p || "/"), priority: p === "" ? 1 : 0.7 })),
    ...slugs.map((s) => ({ url: url(`/products/${s}`), priority: 0.8 })),
    ...concerns.map((c) => ({ url: url(`/concerns/${c.slug}`), priority: 0.7 })),
    ...brands.map((b) => ({ url: url(`/brands/${b.slug}`), priority: 0.6 })),
  ];
}
