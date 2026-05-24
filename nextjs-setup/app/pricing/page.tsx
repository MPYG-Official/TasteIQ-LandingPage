import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';
import PricingPageContent from '@/components/content/PricingPageContent';

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <PricingPageContent />
      <MarketingFooter />
    </MarketingPageShell>
  );
}
