import { PRODUCT_FAQS } from '@/lib/product-data';
import {
  generateFAQStructuredData,
  generateProductStructuredData,
  getSiteBaseUrl,
} from '@/lib/seo';

export const PRODUCT_PAGE_TITLE = 'Restaurant F&B Software | POS, Kitchen & Inventory — TasteIQ';

export const PRODUCT_META_DESCRIPTION =
  'Restaurant F&B software for India — POS billing, kitchen display (KOT), table management, inventory, Zomato/Swiggy sync and GST e-invoice. One screen for QSR, dine-in and cloud kitchens.';

export const PRODUCT_KEYWORDS = [
  'restaurant F&B software',
  'restaurant POS India',
  'restaurant management software',
  'kitchen display system',
  'KOT software',
  'GST billing restaurant',
  'restaurant inventory software',
  'cloud kitchen POS',
  'table management POS',
  'Zomato Swiggy integration',
];

export function productSoftwareJsonLd() {
  const base = getSiteBaseUrl();
  return generateProductStructuredData({
    name: 'TasteIQ F&B — Restaurant OS',
    description: PRODUCT_META_DESCRIPTION,
    image: `${base}/fnb/opengraph-image`,
  });
}

export function productFaqJsonLd() {
  return generateFAQStructuredData(PRODUCT_FAQS);
}

export function productWebPageJsonLd() {
  const base = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PRODUCT_PAGE_TITLE,
    description: PRODUCT_META_DESCRIPTION,
    url: `${base}/fnb`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TasteIQ',
      url: base,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'TasteIQ F&B',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    },
  };
}
