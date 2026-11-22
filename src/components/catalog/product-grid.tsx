import { ProductCard } from "@/components/brand";
import type { ProductCardData } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: ProductCardData[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4", className)}>
      {products.map((p, i) => (
        <li key={p.slug} className="reveal flex">
          <ProductCard product={p} priority={i < priorityCount} className="w-full" />
        </li>
      ))}
    </ul>
  );
}
