'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy URL — client redirect for static GitHub Pages export */
export default function ProductRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/fnb');
  }, [router]);

  return (
    <p style={{ padding: '2rem', textAlign: 'center' }}>
      Redirecting to <a href="/fnb">F&amp;B</a>…
    </p>
  );
}
