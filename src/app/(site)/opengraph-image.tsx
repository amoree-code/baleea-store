import { ImageResponse } from "next/og";
import { logoDataUri, logoRatio } from "@/lib/brand/logo";

// Shared preview for links pasted into WhatsApp, Instagram and Telegram.
// The OG renderer does not shape Arabic letters: Arabic appears only inside the outlined logo.
export const alt = "baleea.iq — German skincare, 100% original, delivered across Iraq";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const gold = "#8f6b2c";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#ffffff", padding: "0 96px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 28 }}>
          <img src={logoDataUri()} alt="" width={Math.round(220 * logoRatio.full)} height={220} />
          <div style={{ fontSize: 40, color: "#6b5d63" }}>German skincare · delivered across Iraq</div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            {["Balea", "ISANA", "Alverde"].map((b) => (
              <div key={b} style={{ display: "flex", fontSize: 28, color: "#261c21", border: "2px solid #ede3e6", borderRadius: 999, padding: "10px 28px" }}>
                {b}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 300, height: 300, borderRadius: 999, border: `4px solid ${gold}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 230, height: 230, borderRadius: 999, border: `2px solid ${gold}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: gold }}>
            <div style={{ fontSize: 30, letterSpacing: 2 }}>DE → IQ</div>
            <div style={{ fontSize: 64, fontWeight: 700, color: "#261c21" }}>100%</div>
            <div style={{ fontSize: 26, letterSpacing: 4 }}>ORIGINAL</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
