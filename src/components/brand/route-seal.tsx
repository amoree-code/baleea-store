import { cn } from "@/lib/utils";

// The one bold element: a stamp-like seal. The text ring turns slowly when `animated`.
export function RouteSeal({
  size = 152,
  animated = false,
  className,
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  const ring = "Made in Germany — 100% Original — Germany to Iraq — ";
  return (
    <div
      role="img"
      aria-label="منتجات أصلية 100% من ألمانيا إلى العراق"
      className={cn("relative inline-grid shrink-0 place-items-center text-gold", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className={cn("absolute inset-0 size-full", animated && "motion-safe:animate-[spin_40s_linear_infinite]")} aria-hidden>
        <defs>
          <path id="seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <text direction="ltr" className="fill-current font-label text-[12.5px] font-medium tracking-[0.12em]">
          <textPath href="#seal-ring" textLength="489" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <div className="relative flex flex-col items-center gap-0.5 text-center leading-none" aria-hidden>
        <span dir="ltr" className="font-label text-[0.6875rem] font-medium tracking-wide">DE → IQ</span>
        <span className="font-heading text-lg font-semibold text-ink">أصلي</span>
        <span className="font-label text-[0.6875rem] font-semibold tabular-nums">100%</span>
      </div>
    </div>
  );
}
