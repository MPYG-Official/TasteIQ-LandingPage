/**
 * GitHub Pages project sites are served at https://<org>.github.io/<repo>/ unless a
 * custom domain is configured. Custom domain (tasteiq.in) must use root paths.
 */
export const GITHUB_PAGES_REPO = 'TasteIQ-LandingPage';

export function githubPagesBasePath(): string {
  if (process.env.NEXT_PUBLIC_BASE_PATH) {
    return process.env.NEXT_PUBLIC_BASE_PATH.replace(/\/$/, '');
  }
  // Preview builds for github.io subpath only (not used for tasteiq.in production)
  if (process.env.GITHUB_PAGES_PREVIEW === '1') {
    return `/${GITHUB_PAGES_REPO}`;
  }
  return '';
}

export function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.in';
}
