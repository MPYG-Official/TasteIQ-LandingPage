import { FOODS_SITE_URL } from '@/lib/site-urls';

export type SiteNavPage = 'home' | 'vision' | 'fnb' | 'hotels' | 'blog';

export type SiteNavLink = {
  href: string;
  label: string;
  /** Match pathname exactly, or prefix when ends with / */
  match?: 'exact' | 'path';
};

export type SiteNavCta = {
  label: string;
  href: string;
  /** If set, prevent navigation and run this action key instead */
  action?: 'start-free' | 'focus-pin';
};

export type SiteNavConfig = {
  page: SiteNavPage;
  brandHref: string;
  suffix?: string;
  /** In-page / section links shown on desktop (page-specific) */
  sectionLinks: SiteNavLink[];
  cta: SiteNavCta;
  /** Extra links for mobile drawer (home marketing anchors, etc.) */
  moreLinks?: SiteNavLink[];
};

export const GLOBAL_NAV_LINKS: SiteNavLink[] = [
  { href: '/', label: 'Home', match: 'exact' },
  { href: '/vision', label: 'Vision', match: 'path' },
  { href: '/fnb', label: 'F&B', match: 'path' },
  { href: '/hotels', label: 'Hotels', match: 'path' },
  { href: FOODS_SITE_URL, label: 'Foods' },
  { href: '/blog', label: 'Blog', match: 'path' },
];

export const HOME_MORE_LINKS: SiteNavLink[] = [
  { href: '/#quickstart', label: '15-Min Setup' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#features', label: 'Features' },
  { href: '/#testimonials', label: 'Success Stories' },
  { href: '/#contact', label: 'Contact' },
  { href: '/careers', label: 'Hiring' },
];

const HOTELS_SECTION_LINKS: SiteNavLink[] = [
  { href: '/hotels#channel-manager', label: 'Channel manager' },
  { href: '/hotels#solutions', label: 'Solutions' },
  { href: '/hotels#how-it-works', label: 'How it works' },
  { href: '/hotels#faq', label: 'FAQ' },
  { href: '/hotels#demo', label: 'Book demo' },
];

export function getSiteNavConfig(pathname: string): SiteNavConfig {
  if (pathname === '/hotels' || pathname.startsWith('/hotels/')) {
    return {
      page: 'hotels',
      brandHref: '/hotels',
      suffix: 'Hotels',
      sectionLinks: HOTELS_SECTION_LINKS,
      cta: { label: 'Book demo', href: '/hotels#demo' },
    };
  }

  if (pathname === '/fnb' || pathname.startsWith('/fnb/') || pathname === '/product' || pathname.startsWith('/product/')) {
    return {
      page: 'fnb',
      brandHref: '/fnb',
      suffix: 'F&B',
      sectionLinks: [
        { href: '/fnb#modules', label: 'Modules' },
        { href: '/fnb#who', label: "Who it's for" },
        { href: '/fnb#faq', label: 'FAQ' },
      ],
      cta: { label: 'Start free', href: '/vision', action: 'start-free' },
    };
  }

  if (pathname === '/vision' || pathname.startsWith('/vision/')) {
    return {
      page: 'vision',
      brandHref: '/vision',
      sectionLinks: [{ href: '/vision#manifesto', label: 'Manifesto' }],
      cta: { label: 'Start free', href: '/vision', action: 'start-free' },
    };
  }

  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    return {
      page: 'blog',
      brandHref: '/blog',
      suffix: 'Blog',
      sectionLinks: [],
      cta: { label: 'Book demo', href: '/#contact' },
    };
  }

  return {
    page: 'home',
    brandHref: '/',
    sectionLinks: [],
    moreLinks: HOME_MORE_LINKS,
    cta: { label: 'Book demo', href: '/#contact' },
  };
}

export function isNavLinkActive(pathname: string, link: SiteNavLink): boolean {
  const [path, hash] = link.href.split('#');
  const basePath = path || '/';

  if (link.match === 'exact' || (basePath === '/' && !hash)) {
    return pathname === '/' || pathname === '';
  }

  if (link.match === 'path') {
    if (basePath === '/vision') return pathname === '/vision' || pathname.startsWith('/vision/');
    if (basePath === '/fnb') return pathname === '/fnb' || pathname.startsWith('/fnb/');
    if (basePath === '/product') return pathname === '/fnb' || pathname.startsWith('/fnb/');
    if (basePath === '/hotels') return pathname === '/hotels' || pathname.startsWith('/hotels/');
    if (basePath === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  }

  return pathname === basePath;
}
