'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { trackButtonClick } from '@/lib/analytics';
import {
  getSiteNavConfig,
  GLOBAL_NAV_LINKS,
  isNavLinkActive,
  type SiteNavCta,
  type SiteNavLink,
} from '@/lib/site-nav';
import { useStartFreeNavOptional } from '@/components/layout/StartFreeNavContext';

function TasteIQMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="13.5" r="8" fill="#FBFAF7" />
      <circle cx="17" cy="8" r="3" fill="#B5482B" />
    </svg>
  );
}

function NavPipe({ className = '' }: { className?: string }) {
  return (
    <span className={`site-nav-pipe${className ? ` ${className}` : ''}`} aria-hidden="true">
      |
    </span>
  );
}

function NavAnchor({
  link,
  pathname,
  onNavigate,
  className = '',
}: {
  link: SiteNavLink;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = isNavLinkActive(pathname, link);
  const isHash = link.href.includes('#');
  const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

  const handleClick = () => {
    trackButtonClick(`nav_${link.label.toLowerCase().replace(/\s+/g, '_')}`, 'navigation');
    onNavigate?.();
  };

  if (isHash || link.href.startsWith('#') || isExternal) {
    return (
      <a
        href={link.href}
        className={`${className}${active ? ' on' : ''}`}
        onClick={handleClick}
        {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={`${className}${active ? ' on' : ''}`}
      onClick={handleClick}
    >
      {link.label}
    </Link>
  );
}

function CtaControl({
  cta,
  onNavigate,
  className = '',
}: {
  cta: SiteNavCta;
  onNavigate?: () => void;
  className?: string;
}) {
  const startFree = useStartFreeNavOptional();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      trackButtonClick(`nav_cta_${cta.label.toLowerCase().replace(/\s+/g, '_')}`, 'navigation');
      onNavigate?.();

      if (cta.action === 'start-free') {
        e.preventDefault();
        startFree?.triggerStartFree();
        return;
      }

      if (cta.action === 'focus-pin') {
        e.preventDefault();
        const id = cta.href.split('#')[1] || 'pin-input';
        const el = document.getElementById(id);
        el?.focus();
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [cta, onNavigate, startFree]
  );

  if (cta.action === 'start-free' || cta.action === 'focus-pin') {
    return (
      <button type="button" className={`site-nav-cta ${className}`.trim()} onClick={handleClick}>
        {cta.label}
      </button>
    );
  }

  return (
    <Link href={cta.href} className={`site-nav-cta ${className}`.trim()} onClick={handleClick}>
      {cta.label}
    </Link>
  );
}

function NavLinkGroup({
  links,
  pathname,
  onNavigate,
  className,
  ariaLabel,
}: {
  links: SiteNavLink[];
  pathname: string;
  onNavigate?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  if (links.length === 0) return null;

  return (
    <nav className={className} aria-label={ariaLabel}>
      {links.map((link) => (
        <NavAnchor
          key={link.href}
          link={link}
          pathname={pathname}
          className="site-nav-link"
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

export default function SiteNav() {
  const pathname = usePathname() ?? '/';
  const config = useMemo(() => getSiteNavConfig(pathname), [pathname]);
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);

  const sectionLinks = config.sectionLinks;
  const moreLinks = config.moreLinks ?? [];
  const pageSectionLinks = sectionLinks.length > 0 ? sectionLinks : moreLinks;
  const onPageLabel = sectionLinks.length > 0 ? 'On this page' : moreLinks.length > 0 ? 'Sections' : '';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={`site-nav-root${open ? ' site-nav-root--open' : ''}`}>
      <header className="site-nav">
        <Link
          href={config.brandHref}
          className="site-nav-brand"
          onClick={() => {
            trackButtonClick('nav_logo', 'navigation');
            closeMenu();
          }}
        >
          <TasteIQMark />
          <span className="site-nav-brand-word">tasteiq</span>
          {config.suffix && <span className="site-nav-suffix">{config.suffix}</span>}
        </Link>

        <NavPipe className="site-nav-hide" />

        <NavLinkGroup
          links={GLOBAL_NAV_LINKS}
          pathname={pathname}
          onNavigate={closeMenu}
          className="site-nav-group site-nav-main site-nav-hide"
          ariaLabel="Main pages"
        />

        {pageSectionLinks.length > 0 && (
          <>
            <NavPipe className="site-nav-hide" />
            <NavLinkGroup
              links={pageSectionLinks}
              pathname={pathname}
              onNavigate={closeMenu}
              className="site-nav-group site-nav-sections site-nav-hide"
              ariaLabel="Page sections"
            />
          </>
        )}

        <div className="site-nav-end">
          <CtaControl cta={config.cta} onNavigate={closeMenu} className="site-nav-cta-bar" />
          <button
            type="button"
            className="site-nav-menu-btn"
            aria-expanded={open}
            aria-controls="site-nav-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <>
          <button
            type="button"
            className="site-nav-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav id="site-nav-drawer" className="site-nav-panel" aria-label="Site menu">
            <div className="site-nav-panel-label">Main pages</div>
            <NavLinkGroup
              links={GLOBAL_NAV_LINKS}
              pathname={pathname}
              onNavigate={closeMenu}
              className="site-nav-panel-group"
            />

            {pageSectionLinks.length > 0 && (
              <>
                <div className="site-nav-panel-divider" aria-hidden="true">
                  |
                </div>
                <div className="site-nav-panel-label">{onPageLabel}</div>
                <NavLinkGroup
                  links={pageSectionLinks}
                  pathname={pathname}
                  onNavigate={closeMenu}
                  className="site-nav-panel-group"
                />
              </>
            )}

            <div className="site-nav-panel-cta">
              <CtaControl cta={config.cta} onNavigate={closeMenu} />
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
