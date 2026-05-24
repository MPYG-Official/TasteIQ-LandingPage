import Link from 'next/link';

export default function FoodsFooter() {
  return (
    <footer className="ftr">
      <div className="ftr-l">
        <svg className="ftr-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="13.5" r="8" fill="#0E1116" />
          <circle cx="17" cy="8" r="3" fill="#C24A2A" />
        </svg>
        <span>tasteiq Foods · breakfast, lunch &amp; dinner subscriptions · Bengaluru</span>
      </div>
      <div className="ftr-r">
        <Link href="/">Home</Link>
        <Link href="/fnb">F&amp;B</Link>
        <Link href="/vision">Manifesto</Link>
      </div>
    </footer>
  );
}
