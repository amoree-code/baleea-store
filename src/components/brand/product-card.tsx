import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { QuickAdd } from "@/components/basket/quick-add";
import { toBasketItem } from "@/lib/basket/message";
import { cn } from "@/lib/utils";
import type { ProductCardData } from "@/lib/catalog/types";
import { PriceTag } from "./price-tag";
import { StatusPill } from "./status-pill";
import { FreeFromChips } from "./free-from-chips";

export function ProductCard({ product, className, priority }: { product: ProductCardData; className?: string; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  return (
    <article className={cn("group relative flex flex-col gap-3", className)}>
      {/* Same name as the product page's first photo: the image morphs between them. */}
      <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-blush transition-transform duration-200 ease-out group-active:scale-[0.98]">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 grid place-items-center p-6 text-center">
            <span dir="ltr" className="font-label text-lg font-medium leading-tight text-rose">
              {product.brand}
            </span>
          </div>
        )}
        {product.isNew && (
          <span className="absolute start-3 top-3 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-rose">
            جديد
          </span>
        )}
      </div>
      </ViewTransition>

      <div className="flex flex-1 flex-col gap-1.5 px-0.5">
        <div className="flex items-center justify-between gap-2">
          <span dir="ltr" className="font-label text-xs font-medium tracking-wide text-stone">
            {product.brand}
          </span>
          <StatusPill status={product.status} />
        </div>
        <h3 className="leading-snug">
          <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none">
            <span className="block font-medium text-ink">{product.nameAr}</span>
            <span dir="ltr" className="mt-0.5 line-clamp-2 block text-end font-label text-sm text-stone">
              {product.nameLatin}
              {product.size && <span className="tabular-nums"> {product.size}</span>}
            </span>
          </Link>
        </h3>
        {product.freeFrom && product.freeFrom.length > 0 && <FreeFromChips items={product.freeFrom} max={2} className="mt-0.5" />}
        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} className="mt-auto pt-1" />
      </div>

      {/* Outside the image box on purpose: its press-scale makes a stacking context that would
          sink the button under the card link's overlay mid-click. This layer mirrors the image's box. */}
      {product.status !== "soldout" && (
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5]">
          <QuickAdd item={toBasketItem(product)} className="pointer-events-auto absolute! end-3 bottom-3" />
        </div>
      )}
    </article>
  );
}
