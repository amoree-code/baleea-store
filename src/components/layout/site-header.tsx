import Link from "next/link";
import { MenuIcon, SearchIcon } from "lucide-react";
import { BasketButton } from "@/components/basket/basket-button";
import { WhatsAppIcon, Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Container } from "./container";
import { mainNav } from "./nav";

const desktopNav = mainNav.slice(0, 5);

export function SiteHeader() {
  return (
    <header style={{ viewTransitionName: "site-header" }} className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <Container className="flex h-16 items-center gap-6">
        <Wordmark />
        <nav aria-label="الأقسام" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-stone">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-md transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="ابحثي عن منتج">
            <Link href="/products#search">
              <SearchIcon strokeWidth={1.5} />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="راسلينا على الواتساب">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-wa-source="header">
              <WhatsAppIcon />
            </a>
          </Button>
          <BasketButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="القائمة" className="lg:hidden">
                <MenuIcon strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm bg-paper">
              <SheetHeader>
                <SheetTitle className="sr-only">القائمة</SheetTitle>
                <Wordmark />
              </SheetHeader>
              <nav aria-label="القائمة" className="px-4">
                <ul className="divide-y divide-hairline">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link href={item.href} className="block py-3.5 text-lg font-medium text-ink">
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto space-y-3 p-4">
                <a href={`tel:${site.phoneTel}`} dir="ltr" className="block text-end font-label text-stone tabular-nums">
                  {site.phoneDisplay}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
