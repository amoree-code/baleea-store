import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { BasketRoot } from "@/components/basket/basket-root";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DirectionProvider } from "@/components/ui/direction";
import { site } from "@/lib/site";
import { JsonLd, storeLd } from "@/lib/seo/json-ld";
import "../globals.css";

// One family for both scripts: Plex Sans Arabic ships IBM Plex Sans as its Latin glyphs,
// so Arabic copy and German product names share one voice and one set of font files.
const plex = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.nameAr} | ${site.name} — منتجات عناية ألمانية أصلية`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "ar_IQ",
    title: `${site.nameAr} | ${site.name}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      dir="rtl"
      className={`${plex.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DirectionProvider dir="rtl">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            تخطّي للمحتوى
          </a>
          <JsonLd data={storeLd()} />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BasketRoot />
          <Analytics />
        </DirectionProvider>
      </body>
    </html>
  );
}
