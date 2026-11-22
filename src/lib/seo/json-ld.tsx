import type { ProductDetail } from "@/lib/catalog/types";
import { site } from "@/lib/site";

type Thing = Record<string, unknown>;

/** Structured data for search engines. `<` is escaped so CMS text can't close the script tag. */
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const abs = (path: string) => `${site.origin}${path}`;

export function storeLd(): Thing[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "@id": abs("/#store"),
      name: site.name,
      alternateName: site.nameAr,
      description: site.description,
      url: abs("/"),
      telephone: site.phoneTel,
      currenciesAccepted: "IQD",
      address: { "@type": "PostalAddress", addressLocality: "Baghdad", addressCountry: "IQ" },
      areaServed: { "@type": "Country", name: "Iraq" },
      sameAs: [site.instagram, site.tiktok],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: abs("/"),
      inLanguage: "ar-IQ",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: abs("/products?q={search_term_string}") },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

const availability = {
  available: "https://schema.org/InStock",
  preorder: "https://schema.org/PreOrder",
  soldout: "https://schema.org/OutOfStock",
} as const;

export function productLd(p: ProductDetail): Thing {
  const images = (p.images.length > 0 ? p.images : p.image ? [p.image] : []).map((i) => i.src);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.nameAr} — ${p.nameLatin}`,
    alternateName: p.nameLatin,
    ...(p.summary && { description: p.summary }),
    ...(images.length > 0 && { image: images }),
    brand: { "@type": "Brand", name: p.brand },
    ...(p.size && { size: p.size }),
    countryOfOrigin: { "@type": "Country", name: "Germany" },
    url: abs(`/products/${p.slug}`),
    // Google needs a price to show an offer; price-on-request items still list availability.
    offers: {
      "@type": "Offer",
      url: abs(`/products/${p.slug}`),
      priceCurrency: "IQD",
      ...(p.price !== null && { price: p.price }),
      availability: availability[p.status],
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": abs("/#store") },
    },
  };
}

export function breadcrumbLd(items: { href: string; label: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: abs(it.href) })),
  };
}
