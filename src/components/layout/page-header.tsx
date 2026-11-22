import type { ReactNode } from "react";
import { Container } from "./container";

export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-hairline bg-blush/40">
      <Container className="space-y-3 py-10 sm:py-14">
        {eyebrow && <p className="text-sm font-medium text-rose">{eyebrow}</p>}
        <h1 className="text-display font-semibold leading-[1.15] text-ink">{title}</h1>
        {description && <div className="max-w-[60ch] text-lg text-stone">{description}</div>}
        {children}
      </Container>
    </div>
  );
}
