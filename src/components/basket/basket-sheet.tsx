"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ShoppingBagIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { PriceTag, WhatsAppIcon } from "@/components/brand";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useMediaQuery } from "@/hooks/use-media-query";
import { basketTotals, composeOrderMessage } from "@/lib/basket/message";
import { useBasket } from "@/lib/basket/store";
import { formatIQD } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { QtyStepper } from "./qty-stepper";

export function BasketSheet() {
  const open = useBasket((s) => s.open);
  const setOpen = useBasket((s) => s.setOpen);
  const desktop = useMediaQuery("(min-width: 640px)");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={desktop ? "left" : "bottom"}
        className={cn("gap-0 bg-paper p-0", desktop ? "w-full sm:max-w-md" : "max-h-[92dvh] rounded-t-3xl")}
      >
        <BasketBody />
      </SheetContent>
    </Sheet>
  );
}

function BasketBody() {
  const items = useBasket((s) => s.items);
  const customer = useBasket((s) => s.customer);
  const { setQty, remove, clear, setCustomer, setOpen, add } = useBasket.getState();
  const ids = { name: useId(), area: useId(), notes: useId() };
  const { total, unpriced, count } = basketTotals(items);

  function removeWithUndo(slug: string) {
    const item = items.find((i) => i.slug === slug);
    remove(slug);
    if (item) toast("انشال من الطلب", { description: item.nameAr, action: { label: "رجّعيه", onClick: () => add(item, item.qty) } });
  }

  function clearWithUndo() {
    const snapshot = items;
    clear();
    toast("انمسح الطلب", { action: { label: "رجّعيه", onClick: () => useBasket.setState({ items: snapshot }) } });
  }

  if (items.length === 0) {
    return (
      <>
        <SheetHeader className="border-b border-hairline">
          <SheetTitle className="font-heading text-lg">طلبج</SheetTitle>
          <SheetDescription className="sr-only">سلة الطلب</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <ShoppingBagIcon aria-hidden strokeWidth={1.25} className="size-12 text-petal" />
          <p className="font-heading text-lg font-medium text-ink">طلبج فاضي</p>
          <p className="max-w-[32ch] text-stone">ضيفي المنتجات اللي تريدينها، وبالأخير ندزها كلها برسالة وحدة على الواتساب.</p>
          <Link href="/products" onClick={() => setOpen(false)} className={buttonVariants()}>
            تصفحي المنتجات
          </Link>
        </div>
      </>
    );
  }

  const message = composeOrderMessage(items, customer, site.url);

  return (
    <>
      <SheetHeader className="border-b border-hairline">
        <SheetTitle className="font-heading text-lg">
          طلبج <span className="font-sans text-base font-normal text-stone tabular-nums">({count} قطعة)</span>
        </SheetTitle>
        <SheetDescription>راجعيه، وبعدين دزيه برسالة وحدة على الواتساب.</SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <ul className="divide-y divide-hairline px-4">
          {items.map((item) => (
            <li key={item.slug} className="flex gap-3 py-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-blush">
                {item.image && <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Link href={`/products/${item.slug}`} onClick={() => setOpen(false)} className="font-medium leading-snug text-ink hover:underline">
                  {item.nameAr}
                </Link>
                <p dir="ltr" className="truncate text-end font-label text-xs text-stone">
                  {item.nameLatin}
                  {item.size && ` · ${item.size}`}
                </p>
                {item.status === "preorder" && <p className="text-xs font-medium text-gold">طلب مسبق</p>}
                <div className="mt-1 flex items-center justify-between gap-2">
                  <QtyStepper qty={item.qty} onChange={(q) => setQty(item.slug, q)} label={item.nameAr} size="sm" />
                  <PriceTag price={item.price === null ? null : item.price * item.qty} className="text-sm" />
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={() => removeWithUndo(item.slug)} aria-label={`شيلي ${item.nameAr}`} className="text-stone">
                <Trash2Icon strokeWidth={1.5} />
              </Button>
            </li>
          ))}
        </ul>

        <fieldset className="space-y-3 border-t border-hairline px-4 py-5">
          <legend className="sr-only">معلوماتج</legend>
          <p className="text-sm font-semibold text-ink">
            معلوماتج <span className="font-normal text-stone">(اختياري، تسرّع الطلب)</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor={ids.name}>الاسم</Label>
              <Input id={ids.name} name="name" value={customer.name} onChange={(e) => setCustomer({ name: e.target.value })} autoComplete="given-name" maxLength={60} className="h-11 bg-paper" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={ids.area}>المنطقة / المحافظة</Label>
              <Input id={ids.area} name="area" value={customer.area} onChange={(e) => setCustomer({ area: e.target.value })} autoComplete="address-level2" maxLength={80} placeholder="مثلاً: الكرادة" className="h-11 bg-paper" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={ids.notes}>ملاحظات</Label>
            <Textarea id={ids.notes} name="notes" value={customer.notes} onChange={(e) => setCustomer({ notes: e.target.value })} maxLength={300} placeholder="نوع بشرتج، وقت التوصيل المناسب…" className="bg-paper" />
          </div>
        </fieldset>
      </div>

      <SheetFooter className="gap-3 border-t border-hairline pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-stone">المجموع {total > 0 && "(بدون التوصيل)"}</span>
          <span className="text-end font-semibold text-ink tabular-nums">
            {total > 0 ? formatIQD(total) : "نأكده وياج"}
            {total > 0 && unpriced > 0 && <span className="block text-xs font-normal text-stone">+ {unpriced} منتج سعره ينأكد</span>}
          </span>
        </div>
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          data-wa-source="basket"
          data-wa-items={count}
          onClick={() => toast.success("انفتح الواتساب", { description: "دزي الرسالة، ونرد عليج بأقرب وقت." })}
          className={cn(buttonVariants({ size: "lg" }), "w-full")}
        >
          <WhatsAppIcon />
          دزّي الطلب على الواتساب
        </a>
        <Button variant="ghost" size="sm" onClick={clearWithUndo} className="self-center text-stone">
          امسحي الطلب
        </Button>
      </SheetFooter>
    </>
  );
}
