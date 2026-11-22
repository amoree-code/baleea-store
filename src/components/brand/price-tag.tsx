import { cn } from "@/lib/utils";
import { formatIQD } from "@/lib/format";

export function PriceTag({
  price,
  compareAtPrice,
  className,
}: {
  price: number | null;
  compareAtPrice?: number | null;
  className?: string;
}) {
  if (price === null) {
    return <span className={cn("text-sm font-medium text-stone", className)}>اسألي عن السعر</span>;
  }
  const onSale = compareAtPrice != null && compareAtPrice > price;
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 tabular-nums", className)}>
      <span className="font-semibold text-ink">{formatIQD(price)}</span>
      {onSale && (
        <s className="text-sm text-stone">
          <span className="sr-only">بدل </span>
          {formatIQD(compareAtPrice)}
        </s>
      )}
    </span>
  );
}
