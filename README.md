# TasteIQ Landing Page

Marketing site for [tasteiq.in](https://tasteiq.in), built with Next.js 14 (static export).

## Repository layout

| Path | Purpose |
|------|---------|
| `nextjs-setup/` | Next.js source — edit pages and components here |
| `.github/workflows/deploy-github-pages.yml` | Builds and deploys to GitHub Pages on push to `main` |

Generated static files are **not** committed. GitHub Actions builds `nextjs-setup/out` and publishes it.

## Local development

```bash
cd nextjs-setup
cp .env.example .env   # optional
npm install
npm run dev
```

## Manual static build

```bash
cd nextjs-setup
NEXT_PUBLIC_SITE_URL=https://tasteiq.in npm run build:static
# Output: nextjs-setup/out/
```

See [nextjs-setup/STATIC_EXPORT.md](nextjs-setup/STATIC_EXPORT.md) for redirects, excluded routes, and blog build options.

## GitHub Pages

1. Push to `main` — the workflow runs automatically.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Custom domain `tasteiq.in` is set via `nextjs-setup/public/CNAME` (included in each deploy).

Affiliate and Foods apps are hosted separately at [foods.tasteiq.in](https://foods.tasteiq.in).
