import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';
import CareersPageContent from '@/components/content/CareersPageContent';

export const metadata: Metadata = genMeta({
  title: 'Join TasteIQ | Careers & Opportunities',
  description:
    'Join TasteIQ as an On-Ground Business Development Associate and lead the next generation of POS in the post-AI world. Exciting entrepreneurial opportunity.',
  keywords: [
    'TasteIQ careers',
    'restaurant POS jobs',
    'business development jobs',
    'sales jobs',
    'entrepreneur opportunities',
    'restaurant technology careers',
  ],
  url: '/careers',
});

export default function CareersPage() {
  return (
    <MarketingPageShell>
      <CareersPageContent />
      <MarketingFooter />
    </MarketingPageShell>
  );
}
