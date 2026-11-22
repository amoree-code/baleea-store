import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { guide } from "@/lib/content/guide";

export const metadata: Metadata = { alternates: { canonical: "/guide" },
  title: "دليل المكونات",
  description: "حمض الساليسيليك، واقي الشمس، فيتامين سي، والريتينول: شنو يسوي كل مكوّن وشلون تستخدمينه.",
};

export default function GuidePage() {
  return (
    <>
      <PageHeader title="دليل المكونات" description="قبل ما تشترين، اعرفي شنو يسوي المكوّن وشلون تستخدمينه صح." />
      <Container className="max-w-3xl py-10">
        <nav aria-label="المكونات" className="mb-10 flex flex-wrap gap-2">
          {guide.map((g) => (
            <a key={g.slug} href={`#${g.slug}`} className="inline-flex h-10 items-center rounded-full border border-hairline px-4 text-sm hover:bg-blush">
              {g.title}
            </a>
          ))}
        </nav>
        <div className="space-y-6">
          {guide.map((g) => (
            <article key={g.slug} id={g.slug} className="scroll-mt-24 space-y-4 rounded-3xl border border-hairline p-6 sm:p-8">
              <header className="space-y-1">
                <p dir="ltr" className="text-end font-label text-sm font-medium tracking-wide text-rose">{g.latin}</p>
                <h2 className="text-title font-semibold text-ink">{g.title}</h2>
              </header>
              <p className="text-lg leading-relaxed text-ink/90">{g.body}</p>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-ink">يفيد لـ</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.goodFor.map((x) => (
                    <li key={x} className="rounded-full bg-blush px-3 py-1 text-sm text-ink">{x}</li>
                  ))}
                </ul>
              </div>
              {g.caution && (
                <p className="rounded-2xl border-s-2 border-gold bg-paper ps-4 text-stone">
                  <span className="font-medium text-ink">انتبهي: </span>
                  {g.caution}
                </p>
              )}
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <Link href={`/products?q=${encodeURIComponent(g.query)}`} className="text-rose underline-offset-4 hover:underline">
                  منتجات بيها {g.title}
                </Link>
                {g.concern && (
                  <Link href={`/concerns/${g.concern}`} className="text-rose underline-offset-4 hover:underline">
                    المشكلة اللي يعالجها
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-stone">
          هالمعلومات عامة وللتوعية. إذا عندج حساسية أو حالة جلدية، راجعي طبيبة جلدية قبل الاستخدام.
        </p>
      </Container>
    </>
  );
}
