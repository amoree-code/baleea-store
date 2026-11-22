import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel preview deployments must never be indexed — only production is.
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/", "/styleguide"] },
    sitemap: `${site.origin}/sitemap.xml`,
    host: site.origin,
  };
}
