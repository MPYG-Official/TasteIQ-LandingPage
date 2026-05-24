import Link from 'next/link';
import { FOODS_SITE_URL } from '@/lib/site-urls';

export default function MarketingFooter() {
  return (
    <footer className="proto-ftr wrap">
      <div className="proto-ftr-l">
        <svg className="proto-ftr-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="13.5" r="8" fill="#0E1116" />
          <circle cx="17" cy="8" r="3" fill="#B5482B" />
        </svg>
        <span>tasteiq © {new Date().getFullYear()} — Bengaluru. Going global.</span>
      </div>
      <div className="proto-ftr-r">
        <Link href="/">Home</Link>
        <Link href="/vision">Vision</Link>
        <Link href="/fnb">F&amp;B</Link>
        <a href={FOODS_SITE_URL} rel="noopener noreferrer">
          Foods
        </a>
        <Link href="/hotels">Hotels</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms-and-condition">Terms</Link>
      </div>
    </footer>
  );
}
