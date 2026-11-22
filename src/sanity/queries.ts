import { defineQuery } from "next-sanity";

const image = `{ "asset": asset->{ _id, url, metadata { dimensions { width, height }, lqip } }, alt, hotspot, crop }`;

const card = `{
  "slug": slug.current,
  "brand": brand->name,
  "brandSlug": brand->slug.current,
  category,
  "concerns": concerns[]->slug.current,
  nameLatin,
  nameAr,
  size,
  price,
  compareAtPrice,
  status,
  freeFrom,
  isNew,
  keyIngredients,
  "image": images[0]${image}
}`;

const published = `_type == "product" && defined(slug.current)`;

export const PRODUCT_CARDS_QUERY = defineQuery(`*[${published}] | order(_createdAt desc) ${card}`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`*[${published}].slug.current`);

export const PRODUCT_QUERY = defineQuery(`*[${published} && slug.current == $slug][0]{
  ...${card},
  summary,
  benefits,
  howToUse,
  reelUrl,
  "images": images[]${image},
  "concernList": concerns[]->{ "slug": slug.current, title }
}`);

export const CONCERNS_QUERY = defineQuery(`*[_type == "concern" && defined(slug.current)] | order(order asc) {
  "slug": slug.current,
  title,
  hint,
  "productCount": count(*[${published} && references(^._id)])
}`);

export const CONCERN_QUERY = defineQuery(`*[_type == "concern" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  hint,
  intro,
  "products": *[${published} && references(^._id)] | order(_createdAt desc) ${card}
}`);

export const BRANDS_QUERY = defineQuery(`*[_type == "brand" && defined(slug.current)] | order(name asc) {
  "slug": slug.current,
  name,
  "productCount": count(*[${published} && references(^._id)])
}`);

export const BRAND_QUERY = defineQuery(`*[_type == "brand" && slug.current == $slug][0]{
  "slug": slug.current,
  name,
  about,
  "products": *[${published} && references(^._id)] | order(_createdAt desc) ${card}
}`);

export const FAQS_QUERY = defineQuery(`*[_type == "faq"] | order(order asc) { question, answer }`);

export const OFFERS_QUERY = defineQuery(`*[_type == "offer" && active == true && defined(slug.current)] | order(_createdAt desc) {
  "slug": slug.current,
  title,
  price,
  description,
  "products": products[]->${card}
}`);

export const REVIEWS_QUERY = defineQuery(`*[_type == "review" && consent == true && defined(image.asset)] | order(_createdAt desc) {
  "id": _id,
  quote,
  "image": image${image},
  "product": product->{ "slug": slug.current, nameAr }
}`);
