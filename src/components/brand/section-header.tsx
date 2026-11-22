import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "شوفي الكل",
  className,
  as: Heading = "h2",
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 border-b border-hairline pb-4", className)}>
      <div className="space-y-1.5">
        <Heading className="text-title font-semibold leading-tight text-ink">{title}</Heading>
        {description && <p className="max-w-[60ch] text-stone">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 rounded-md text-sm font-medium text-rose underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
