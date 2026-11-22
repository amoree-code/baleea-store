import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// "Add to home screen" name and icon. Icons come from brand/web/.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nameAr} — ${site.name}`,
    short_name: site.nameAr,
    description: site.tagline,
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9b2f4c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
