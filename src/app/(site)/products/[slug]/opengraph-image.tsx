import { ImageResponse } from "next/og";
import { logoDataUri, logoRatio } from "@/lib/brand/logo";
import { getProduct, getProductSlugs } from "@/lib/catalog/data";

// Link preview for a single product (WhatsApp/Instagram/Telegram). The OG renderer does not
// shape Arabic letters: Arabic appears only inside the outlined logo. Photo appears once the owner uploads one.
export const alt = "baleea.iq — German skincare, 100% original";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#261c21";
const gold = "#8f6b2c";
const stone = "#6b5d63";
const hairline = "#ede3e6";

/** Satori can't decode WebP/AVIF; ask the Sanity CDN for a JPEG at render size. */
function jpeg(src: string): string {
  const u = new URL(src);
  u.searchParams.set("fm", "jpg");
  u.searchParams.set("w", "800");
  return u.toString();
}

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export default async function ProductOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProduct(slug);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px" }}>
          <img src={logoDataUri()} alt="" width={Math.round(96 * logoRatio.full)} height={96} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 30, letterSpacing: 4, color: gold, textTransform: "uppercase" }}>{p?.brand ?? "German skincare"}</div>
            <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: ink, letterSpacing: -2 }}>{p?.nameLatin ?? "baleea.iq"}</div>
            {p?.size && <div style={{ fontSize: 32, color: stone }}>{p.size}</div>}
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 24, color: ink }}>
            {["Made in Germany", "Delivered across Iraq"].map((t) => (
              <div key={t} style={{ display: "flex", flexShrink: 0, whiteSpace: "nowrap", border: `2px solid ${hairline}`, borderRadius: 999, padding: "10px 24px" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 440, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f1f3" }}>
          {p?.image ? (
            <img src={jpeg(p.image.src)} alt="" width={360} height={450} style={{ objectFit: "contain" }} />
          ) : (
            <div style={{ width: 240, height: 240, borderRadius: 999, border: `4px solid ${gold}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: gold }}>
              <div style={{ fontSize: 26, letterSpacing: 2 }}>DE → IQ</div>
              <div style={{ fontSize: 56, fontWeight: 700, color: ink }}>100%</div>
              <div style={{ fontSize: 22, letterSpacing: 4 }}>ORIGINAL</div>
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
