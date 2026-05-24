import Link from 'next/link';
import { FOODS_SITE_URL } from '@/lib/site-urls';

export default function PrototypeFooter() {
  return (
    <footer className="proto-ftr wrap">
      <div className="proto-ftr-l">
        <svg className="proto-ftr-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="13.5" r="8" fill="#0E1116" />
          <circle cx="17" cy="8" r="3" fill="#C24A2A" />
        </svg>
        <span>tasteiq © 2026 — Bengaluru. Going global.</span>
      </div>
      <div className="proto-ftr-r">
        <Link href="/vision">Vision</Link>
        <a href={FOODS_SITE_URL} rel="noopener noreferrer">
          Foods
        </a>
        <Link href="/privacy-policy">Privacy</Link>
      </div>
    </footer>
  );
}
