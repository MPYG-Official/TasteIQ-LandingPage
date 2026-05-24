# tasteiq.in — DNS & GitHub Pages

## Why the site looked broken

1. **No CSS** on `https://mpyg-official.github.io/TasteIQ-LandingPage/` — that URL is a *project* path, but the app was built for the **custom domain at root** (`/_next/...` vs `/TasteIQ-LandingPage/_next/...`). Use **https://tasteiq.in** after the steps below.
2. **tasteiq.in 404** — DNS reaches GitHub, but the domain must be attached to this repo under **Settings → Pages**.
3. **www** — `www.tasteiq.in` must not point to a personal `*.github.io` host.

## 1. GitHub (one-time)

1. Open [TasteIQ-LandingPage → Settings → Pages](https://github.com/MPYG-Official/TasteIQ-LandingPage/settings/pages).
2. **Build and deployment → Source:** GitHub Actions.
3. **Custom domain:** `tasteiq.in` → Save → wait until DNS check is green → enable **Enforce HTTPS**.
4. If the domain was used elsewhere before, remove it from the old repo first, then add it here.

Each deploy writes `CNAME` containing `tasteiq.in` in the published artifact.

## 2. DNS (registrar)

### Apex `tasteiq.in` (required)

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### `www.tasteiq.in` (recommended)

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `mpyg-official.github.io` |

Do **not** point `www` to `runtime-theif.github.io` or another user Pages host.

Optional: redirect `www` → apex in your DNS/registrar.

## 3. Verify

```bash
dig tasteiq.in +short
curl -sI https://tasteiq.in/ | head -5
curl -sI https://tasteiq.in/_next/static/css/ | head -3
```

Homepage should return `200` and CSS under `/_next/static/...` should return `200`.

## Preview on github.io subpath

Production builds use **empty** `basePath` for `tasteiq.in`. To test with CSS on the subpath URL only:

```bash
cd nextjs-setup
GITHUB_PAGES_PREVIEW=1 NEXT_PUBLIC_SITE_URL=https://mpyg-official.github.io/TasteIQ-LandingPage npm run build:static
```

Do not deploy that artifact to `tasteiq.in`.
