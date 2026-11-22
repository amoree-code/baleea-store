import Link from "next/link";
import { cn } from "@/lib/utils";
import { logo } from "@/lib/brand/logo";
import { site } from "@/lib/site";

/** باليا + petal. Text takes `currentColor` (ink by default); size it with a height class. */
export function Wordmark({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <svg
      viewBox={logo.viewBoxWordmark}
      className={cn("h-10 w-auto text-ink", className)}
      {...(asLink ? { "aria-hidden": true } : { role: "img", "aria-label": site.nameAr })}
    >
      <path d={logo.ar} fill="currentColor" />
      <path d={logo.petal} className="fill-rose" />
    </svg>
  );
  if (!asLink) return mark;
  return (
    <Link href="/" aria-label={`${site.nameAr} — الصفحة الرئيسية`} className="inline-flex shrink-0 rounded-md outline-offset-4">
      {mark}
    </Link>
  );
}
