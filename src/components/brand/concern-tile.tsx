import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConcernTileData } from "@/lib/catalog/types";

export function ConcernTile({ concern, className }: { concern: ConcernTileData; className?: string }) {
  return (
    <Link
      href={`/concerns/${concern.slug}`}
      className={cn(
        "group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-paper p-4 transition-[background-color,border-color,scale] duration-200 hover:border-petal active:scale-[0.98] hover:bg-blush",
        className,
      )}
    >
      <div className="space-y-0.5">
        <p className="font-heading text-lg font-medium text-ink">{concern.title}</p>
        <p className="text-sm text-stone">{concern.hint}</p>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-xs text-stone tabular-nums">
        {concern.productCount} منتج
        <ChevronLeft aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </span>
    </Link>
  );
}
