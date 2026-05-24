# Static export (GitHub Pages)

The marketing site in `nextjs-setup/` builds as a **fully static** site (`output: 'export'`).

## Included routes

- `/` — home
- `/vision`, `/fnb`, `/hotels`
- `/blog` (+ posts when `DATABASE_URL` is set at build time)
- `/pricing`, `/careers`, `/privacy-policy`, `/terms-and-condition`

## Redirects (in `next.config.js`)

- `/product` → `/fnb`
- `/foods` → https://foods.tasteiq.in
- `/affiliate` → https://foods.tasteiq.in (affiliate app lives on Foods)

## Excluded

- Affiliate pages and `/api/*` (not compatible with static hosting)
- Hotels demo uses WhatsApp (no `/api/hotels/demo`)

## Local build

```bash
cd nextjs-setup
NEXT_PUBLIC_SITE_URL=https://tasteiq.in npm run build:static
# Output: nextjs-setup/out/
```

## Publish to repo root (legacy GitHub Pages “branch / root”)

```bash
NEXT_PUBLIC_SITE_URL=https://tasteiq.in npm run export:root
```

This copies `out/` into the repository root and adds `.nojekyll`.

## GitHub Actions (recommended)

`.github/workflows/deploy-github-pages.yml` builds `nextjs-setup/out` and deploys via **GitHub Pages → GitHub Actions**.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Optional: add `DATABASE_URL` repo secret so blog posts are pre-rendered at build time

## Custom domain

Set `NEXT_PUBLIC_SITE_URL` to your live URL (e.g. `https://tasteiq.in`). For project pages (`username.github.io/repo`), also set `basePath` and `assetPrefix` in `next.config.js`.
