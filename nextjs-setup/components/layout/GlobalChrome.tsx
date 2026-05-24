'use client';

import { usePathname } from 'next/navigation';
import SiteNav from '@/components/layout/SiteNav';
import { StartFreeNavProvider } from '@/components/layout/StartFreeNavContext';

export default function GlobalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  return (
    <StartFreeNavProvider>
      <div className="has-site-nav">
        <SiteNav />
        {children}
      </div>
    </StartFreeNavProvider>
  );
}
