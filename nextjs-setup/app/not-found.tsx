import Link from 'next/link';
import MarketingPageShell from '@/components/content/MarketingPageShell';

export default function NotFound() {
  return (
    <MarketingPageShell>
      <main className="mkt-page">
        <section className="mkt-sec wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 className="mkt-h1">Page not found</h1>
          <p className="mkt-lead" style={{ marginTop: 16 }}>
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className="mkt-back-link" style={{ display: 'inline-block', marginTop: 24 }}>
            ← Back to home
          </Link>
        </section>
      </main>
    </MarketingPageShell>
  );
}
