import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { getReviews } from "@/lib/catalog/data";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/reviews" }, title: "آراء الزبائن", description: "صور وتجارب زبائن باليا مع المنتجات الألمانية." };

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <>
      <PageHeader title="آراء الزبائن" description="صور وتجارب حقيقية، ننشرها بموافقة صاحبتها." />
      <Container className="py-10">
        {reviews.length === 0 ? (
          <EmptyState title="الصور راح تنضاف قريباً">
            <p>لحد ذاك الوقت، تقدرين تشوفين تصوير الزبائن على الإنستغرام.</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-medium text-rose underline-offset-4 hover:underline">
              افتحي الإنستغرام
            </a>
          </EmptyState>
        ) : (
          <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {reviews.map((r) => (
              <li key={r.id} className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-hairline bg-paper">
                <Image
                  src={r.image.src}
                  alt={r.image.alt}
                  width={r.image.width ?? 900}
                  height={r.image.height ?? 1200}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  placeholder={r.image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={r.image.blurDataURL}
                  className="h-auto w-full"
                />
                {(r.quote || r.product) && (
                  <div className="space-y-1 p-4 text-sm">
                    {r.quote && <p className="text-ink">«{r.quote}»</p>}
                    {r.product && (
                      <Link href={`/products/${r.product.slug}`} className="text-rose hover:underline">
                        {r.product.nameAr}
                      </Link>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
