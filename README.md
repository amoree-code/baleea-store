# baleea.iq

Arabic (RTL) catalog for Baleea — original German skincare and haircare in Iraq. Orders go out as one pre-filled WhatsApp message; the owner edits products from her phone in Sanity Studio at `/studio`.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind v4 · Sanity · Zustand · Fuse.js · Node 24 · pnpm.

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in what you need; everything is optional locally
pnpm dev                     # http://localhost:3000
```

| Command      | What it does                     |
| ------------ | -------------------------------- |
| `pnpm dev`   | dev server                       |
| `pnpm build` | production build (type-checks)   |
| `pnpm start` | serve the production build       |
| `pnpm lint`  | ESLint                           |

## Environment variables

Names and purpose are in [.env.example](.env.example). Never commit values.

| Name                            | Required | Notes                                                              |
| ------------------------------- | -------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`          | prod     | `https://baleea.iq` — canonical URLs, sitemap, OG images         |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | no       | defaults to the current project                                    |
| `NEXT_PUBLIC_SANITY_DATASET`    | no       | defaults to `production`                                           |
| `SANITY_REVALIDATE_SECRET`      | prod     | shared with the Sanity webhook; set **only** in Vercel           |
| `NEXT_PUBLIC_GA_ID`             | no       | Google Analytics 4 — loads only when set                           |
| `NEXT_PUBLIC_META_PIXEL_ID`     | no       | Meta Pixel — loads only when set                                   |

## Deploy (Vercel)

`vercel.json` pins the region to `fra1` (Frankfurt — the closest to Iraq) and pnpm install/build. `package.json` pins Node 24.

1. **Import** the GitHub repo in Vercel → *Add New → Project*. Framework is detected as Next.js; leave the build settings as they are.
2. **Environment variables** (*Settings → Environment Variables*, Production): add the table above. Generate the secret with `openssl rand -hex 32`.
3. **Deploy.** Preview deployments are automatically `noindex` (see `src/app/robots.ts`).
4. **Domain:** *Settings → Domains* → add `baleea.iq` and `www.baleea.iq` (redirect www → apex). Point DNS as Vercel shows (A record for the apex, CNAME for www). Then set `NEXT_PUBLIC_SITE_URL=https://baleea.iq` and redeploy.
5. **Sanity CORS:** [sanity.io/manage](https://www.sanity.io/manage) → project → *API → CORS origins* → add `https://baleea.iq` **with credentials allowed** (needed for `/studio`). Add the `*.vercel.app` URL too if you use Studio on previews.
6. **Sanity webhook** (instant updates when she publishes): *API → Webhooks → Create*
   - URL: `https://baleea.iq/api/revalidate`
   - Dataset: `production` · Trigger on: create, update, delete
   - Projection: `{_type}`
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
7. **Check:** open `/`, a product page, `/sitemap.xml`, `/robots.txt`; add two products to the basket and confirm the WhatsApp message.

## Project layout

```text
src/app/(site)/     pages (home, products, concerns, brands, offers, guide, reviews, about, faq)
src/app/studio/     embedded Sanity Studio
src/app/api/revalidate/  Sanity webhook → revalidateTag
src/components/     brand, catalog, basket, ui (shadcn)
src/lib/            site config, basket store + WhatsApp message, Arabic search
src/sanity/         schemas, queries, client
brand/              logo kit and social images (see brand/README.md)
docs/               content source and design system
```
