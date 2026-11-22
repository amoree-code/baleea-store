import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "./container";
import { mainNav } from "./nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-blush/40">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-[40ch] text-sm leading-relaxed text-stone">{site.tagline}</p>
        </div>
        <nav aria-label="روابط الموقع">
          <h2 className="mb-3 text-sm font-semibold text-ink">الأقسام</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-stone">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-ink">تواصلي ويانا</h2>
          <ul className="space-y-2 text-sm text-stone">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                واتساب
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-ink">
                اتصال: <span dir="ltr" className="font-label tabular-nums">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                إنستغرام
              </a>
            </li>
            <li>
              <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                تيك توك
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-hairline py-5 text-xs text-stone">
        <p>
          <span dir="ltr" className="font-label">{site.name}</span> — بائع مستقل يستورد منتجات أصلية من ألمانيا. الأسماء التجارية
          ملك أصحابها.
        </p>
      </Container>
    </footer>
  );
}
