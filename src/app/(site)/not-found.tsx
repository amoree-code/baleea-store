import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-5 py-24 text-center">
      <p className="font-label text-6xl font-medium text-petal">404</p>
      <h1 className="text-title font-semibold text-ink">هالصفحة مو موجودة</h1>
      <p className="max-w-[44ch] text-stone">يمكن المنتج انشال أو الرابط بيه غلط. جربي تدورين عليه بالمنتجات.</p>
      <Link href="/products" className={buttonVariants({ size: "lg" })}>
        روحي للمنتجات
      </Link>
    </Container>
  );
}
