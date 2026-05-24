export type SiteTheme = 'classic' | 'prototype';

const VALID_THEMES: SiteTheme[] = ['classic', 'prototype'];

export function parseSiteTheme(value: string | undefined): SiteTheme {
  if (value && VALID_THEMES.includes(value as SiteTheme)) {
    return value as SiteTheme;
  }
  return 'classic';
}

/** Server-side theme from env (default for marketing pages). */
export function getSiteTheme(): SiteTheme {
  return parseSiteTheme(process.env.NEXT_PUBLIC_SITE_THEME);
}

export const WHATSAPP_NUMBER = '916207466460';

export function whatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
