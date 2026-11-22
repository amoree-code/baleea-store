# baleea.iq — design system

Living spec: `/styleguide` (dev route, noindexed). Tokens live in `src/app/globals.css`.

## Brief
- **Subject:** a Baghdad reseller of German drugstore skincare/haircare. Trust ("original, imported from Germany") is the product; warmth is the voice.
- **Audience:** Iraqi women 18–40, arriving from Instagram on a phone, thinking in problems ("عندي حب شباب"), ordering on WhatsApp.
- **Primary job:** find the right product for a concern and send the order in three taps.

## Direction — "the German label, in Arabic"
German drugstore packaging is clean white, sans-serif, information-dense and honest (sizes, "ohne Parabene", claims). The site borrows that: white paper, precise labels, small specs — and translates every label into friendly Iraqi Arabic. The pink circle of the existing logo becomes the one recurring shape.

Rejected defaults (and why):
- Cream background + serif display — the generic "AI-made beauty site" look.
- Hot pink + lavender + Playfair — what every beauty template ships (ui-ux-pro-max's own suggestion).
- Uniform rounded-card grid with soft grey shadows, ALL-CAPS eyebrows, middle-dot meta lines, arrows appended to buttons.

**Boldness is spent in one place:** the circular "Germany → Iraq" seal. Everything else stays quiet.

## Color
| Token | Hex | Role |
|---|---|---|
| `paper` | #FFFFFF | page and cards |
| `blush` | #FBEFF1 | section panels, image backdrops |
| `petal` | #F2C9D1 | the logo circle, decorative fills only |
| `rose` | #9B2F4C | primary action, links, focus ring |
| `rose-deep` | #7D2440 | hover/pressed |
| `ink` | #261C21 | text |
| `stone` | #6B5D63 | secondary text |
| `hairline` | #EDE3E6 | borders, dividers |
| `gold` | #8F6B2C | the seal and "original" marks |
| `leaf` | #3F7254 | "available" status |

Contrast (WCAG, measured): ink ≥ 11:1 everywhere · rose on paper 7.2, on blush 6.4 · white on rose 7.2 · stone on paper 6.2, on blush 5.6.
**Rules:** no `stone` text on `petal` (4.2) · `gold` text only on `paper` (4.9) — on blush/petal it is decoration, never text · `leaf` text only on paper/blush. Light theme only (dark mode is backlog).

## Type
One family: **IBM Plex Sans Arabic**, which carries IBM Plex Sans as its Latin glyphs, so Arabic copy and German product names share one voice and one set of font files (owner's choice, 2026-11-22: "professional"). Roles differ by weight and size, not family: display 700 · headings 600 · UI 500 · body 400. `font-heading` and `font-label` remain as role names and point at the same family. Never letter-space Arabic; light tracking is allowed on short Latin labels only.

Base 16px, Arabic body line-height 1.75, line length ≤ 70ch. Display sizes are fluid (`--text-display`, `--text-title`). Prices and phone numbers in Western digits with `tabular-nums`. No all-caps; Latin product names stay in their original case.

## Shape & depth
Radius follows hierarchy, not one value: images 24px · cards 16px · inputs 12px · buttons and chips full pill. Depth comes from `hairline` borders and `blush` panels; a single soft shadow is reserved for floating layers (basket sheet, dialogs).

## Layout
Mobile first (375 → 768 → 1280). Content aligned to the start edge (right in RTL), never centered paragraphs. Product grid: 2 columns on phones, 3 on tablet, 4 on desktop. Logical properties only (`ms/me/ps/pe/start/end`) — never `left/right`.

## Motion
Motion is CSS and the browser's View Transitions; no animation library, so phones download nothing extra.
- **Page change:** content fades and rises 16px (260/420ms); the header never moves. Defined once in `(site)/template.tsx`.
- **Card → product:** the card image morphs into the product page's first photo (`ViewTransition name="product-<slug>"`).
- **Load:** hero text settles 10px with no fade (`animate-settle`; it is the LCP, so it must paint on the first frame); buttons, seal and trust strip then rise in at 120/200/260ms; the seal's text ring turns slowly. Never start above-the-fold text at opacity 0.
- **Scroll:** `.reveal` sections and cards rise 28px as they enter (CSS scroll-driven; unsupported browsers just show them).
- **Touch:** buttons scale to 0.97, cards to 0.98, quick-add to 0.9; the basket count pops when it changes.
Ease `--ease-out-soft`. Everything is off under `prefers-reduced-motion`.

## Components
Primitives (shadcn radix-nova, RTL): button, badge, sheet, dialog, accordion, input, label, textarea, select, toggle-group, tabs, skeleton, separator, sonner, direction.

Composites (`src/components/brand`): Wordmark · RouteSeal · ProductCard · PriceTag · StatusPill · FreeFromChips · ConcernTile · SectionHeader · TrustStrip · WhatsAppButton.

## Copy
Iraqi, warm and short in actions ("أضيفي للطلب", "دزّي الطلب على الواتساب"); clear and plain in product information. A button says exactly what happens. Empty and sold-out states always offer the next step on WhatsApp. No emoji as icons — Lucide at 1.5 stroke.
