"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { SearchIcon, SlidersHorizontal, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EmptyState } from "@/components/layout/empty-state";
import { WhatsAppButton } from "@/components/brand";
import { categoryLabel, type Category, type ProductCardData } from "@/lib/catalog/types";
import { normalizeArabic, searchVariants } from "@/lib/search";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./product-grid";

type Option = { slug: string; label: string };
type Props = { products: ProductCardData[]; concerns: Option[]; brands: Option[] };

const FILTER_KEYS = ["cat", "concern", "brand", "available"] as const;

export function CatalogBrowser({ products, concerns, brands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const cat = params.get("cat") as Category | null;
  const concern = params.get("concern");
  const brand = params.get("brand");
  const availableOnly = params.get("available") === "1";

  const [query, setQuery] = useState(params.get("q") ?? "");
  const deferredQuery = useDeferredValue(query);

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  // Keep ?q= in the URL so a search can be shared, without a history entry per keystroke.
  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get("q") ?? "") !== query) setParam("q", query.trim() || null);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const concernTitle = useMemo(() => new Map(concerns.map((c) => [c.slug, c.label])), [concerns]);

  const fuse = useMemo(() => {
    const docs = products.map((p) => ({
      slug: p.slug,
      nameAr: normalizeArabic(p.nameAr),
      nameLatin: normalizeArabic(p.nameLatin),
      brand: normalizeArabic(p.brand),
      ingredients: (p.keyIngredients ?? []).map(normalizeArabic),
      tags: [
        p.category ? categoryLabel[p.category] : "",
        ...(p.concerns ?? []).map((c) => concernTitle.get(c) ?? ""),
      ].map(normalizeArabic),
    }));
    return new Fuse(docs, {
      keys: [
        { name: "nameAr", weight: 3 },
        { name: "nameLatin", weight: 3 },
        { name: "brand", weight: 2 },
        { name: "ingredients", weight: 1 },
        { name: "tags", weight: 1 },
      ],
      threshold: 0.34,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [products, concernTitle]);

  const results = useMemo(() => {
    let list = products;
    const variants = searchVariants(deferredQuery);
    if (variants.length > 0) {
      // Every word must match somewhere (name, brand, category, concern…); a product's
      // score is its best variant's average word score.
      const rank = new Map<string, number>();
      for (const v of variants) {
        const words = v.split(" ").filter((w) => w.length > 1);
        if (words.length === 0) continue;
        const scoreOf = (w: string) => new Map(fuse.search(w).map((r) => [r.item.slug, r.score ?? 1]));
        const hits = scoreOf(words[0]);
        for (const w of words.slice(1)) {
          const found = scoreOf(w);
          for (const [slug, sc] of hits) {
            const f = found.get(slug);
            if (f === undefined) hits.delete(slug);
            else hits.set(slug, sc + f);
          }
        }
        for (const [slug, total] of hits) {
          const score = total / words.length;
          const prev = rank.get(slug);
          if (prev === undefined || score < prev) rank.set(slug, score);
        }
      }
      list = products.filter((p) => rank.has(p.slug)).sort((a, b) => rank.get(a.slug)! - rank.get(b.slug)!);
    }
    return list.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!concern || p.concerns?.includes(concern)) &&
        (!brand || p.brandSlug === brand) &&
        (!availableOnly || p.status === "available"),
    );
  }, [products, fuse, deferredQuery, cat, concern, brand, availableOnly]);

  const categories = (Object.keys(categoryLabel) as Category[]).filter((c) => products.some((p) => p.category === c));
  const active = [
    concern && { key: "concern", label: concernTitle.get(concern) ?? concern },
    brand && { key: "brand", label: brands.find((b) => b.slug === brand)?.label ?? brand },
    availableOnly && { key: "available", label: "المتوفر فقط" },
  ].filter(Boolean) as { key: string; label: string }[];

  function clearAll() {
    setQuery("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <label className="relative flex-1">
            <span className="sr-only">ابحثي بالاسم أو المكوّن</span>
            <SearchIcon aria-hidden strokeWidth={1.5} className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-stone" />
            <Input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحثي: واقي شمس، Q10، شامبو…"
              enterKeyHint="search"
              autoComplete="off"
              className="h-12 rounded-full border-hairline bg-paper ps-12 text-base"
            />
          </label>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 gap-2 px-5">
                <SlidersHorizontal strokeWidth={1.5} />
                فلاتر
                {active.length > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-rose text-xs text-paper tabular-nums">{active.length}</span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto overscroll-contain rounded-t-3xl bg-paper">
              <SheetHeader>
                <SheetTitle className="font-heading text-lg">فلترة المنتجات</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 px-4">
                <FilterGroup
                  title="حسب المشكلة"
                  options={concerns}
                  value={concern}
                  onChange={(v) => setParam("concern", v)}
                />
                <FilterGroup
                  title="البراند"
                  options={brands}
                  value={brand}
                  onChange={(v) => setParam("brand", v)}
                  latin
                />
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-ink">التوفر</legend>
                  <Chip pressed={availableOnly} onClick={() => setParam("available", availableOnly ? null : "1")}>
                    المتوفر فقط
                  </Chip>
                </fieldset>
              </div>
              <SheetFooter className="flex-row gap-2 border-t border-hairline">
                <SheetClose asChild>
                  <Button className="flex-1">شوفي {results.length} منتج</Button>
                </SheetClose>
                {active.length > 0 && (
                  <Button variant="ghost" onClick={() => FILTER_KEYS.forEach((k) => k !== "cat" && setParam(k, null))}>
                    امسحي
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
          <div role="group" aria-label="القسم" className="flex w-max gap-2">
            <Chip pressed={!cat} onClick={() => setParam("cat", null)}>
              الكل
            </Chip>
            {categories.map((c) => (
              <Chip key={c} pressed={cat === c} onClick={() => setParam("cat", cat === c ? null : c)}>
                {categoryLabel[c]}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <p aria-live="polite" className="text-stone tabular-nums">
            {results.length} منتج
          </p>
          {active.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setParam(f.key, null)}
              className="inline-flex h-8 items-center gap-1 rounded-full bg-blush pe-2 ps-3 text-ink hover:bg-petal"
            >
              {f.label}
              <XIcon aria-label="إزالة" strokeWidth={1.5} className="size-3.5" />
            </button>
          ))}
        </div>
      </div>

      <h2 className="sr-only">النتائج</h2>
      {results.length > 0 ? (
        <ProductGrid products={results} priorityCount={2} />
      ) : (
        <EmptyState title="ما لگينا منتج بهالمواصفات">
          <p>جربي كلمة ثانية، أو امسحي الفلاتر. وإذا تدورين على شي معين اسألينا، يمكن نجيبه.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={clearAll}>
              امسحي البحث والفلاتر
            </Button>
            <WhatsAppButton message={`هلا باليا، أدور على: ${query}`}>اسألينا</WhatsAppButton>
          </div>
        </EmptyState>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
  latin,
}: {
  title: string;
  options: Option[];
  value: string | null;
  onChange: (v: string | null) => void;
  latin?: boolean;
}) {
  if (options.length === 0) return null;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip key={o.slug} pressed={value === o.slug} onClick={() => onChange(value === o.slug ? null : o.slug)}>
            <span dir={latin ? "ltr" : undefined} className={cn(latin && "font-label")}>
              {o.label}
            </span>
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors",
        pressed ? "border-ink bg-ink text-paper" : "border-hairline bg-paper text-ink hover:border-petal hover:bg-blush",
      )}
    >
      {children}
    </button>
  );
}
