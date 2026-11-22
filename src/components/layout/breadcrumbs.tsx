import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="مسار الصفحة" className="text-sm text-stone">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <ChevronLeft aria-hidden strokeWidth={1.5} className="size-4" />}
            <Link href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
