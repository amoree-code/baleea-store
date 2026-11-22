import Image from "next/image";
import { ViewTransition } from "react";
import type { ProductImage } from "@/lib/catalog/types";

// Scroll-snap gallery: swipe on mobile, no client JS.
export function ProductGallery({ images, brand, slug }: { images: ProductImage[]; brand: string; slug: string }) {
  if (images.length === 0) {
    return (
      <ViewTransition name={`product-${slug}`} share="morph" default="none">
        <div aria-hidden className="grid aspect-[4/5] place-items-center rounded-[2rem] bg-blush">
          <span dir="ltr" className="font-label text-2xl font-medium text-rose">{brand}</span>
        </div>
      </ViewTransition>
    );
  }
  return (
    <div className="space-y-3">
      <ul
        aria-label="صور المنتج"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-[2rem] [scrollbar-width:none]"
      >
        {images.map((img, i) => {
          const photo = (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder={img.blurDataURL ? "blur" : "empty"}
              blurDataURL={img.blurDataURL}
              className="object-cover"
            />
          );
          return (
            <li key={img.src} id={`photo-${i + 1}`} className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden rounded-[2rem] bg-blush">
              {i === 0 ? (
                <ViewTransition name={`product-${slug}`} share="morph" default="none">
                  <div className="absolute inset-0">{photo}</div>
                </ViewTransition>
              ) : (
                photo
              )}
            </li>
          );
        })}
      </ul>
      {images.length > 1 && (
        <p className="text-center text-xs text-stone tabular-nums">{images.length} صور — اسحبي للجنب</p>
      )}
    </div>
  );
}
