import { HOTELS_FAQS } from '@/lib/hotels-data';
import {
  generateFAQStructuredData,
  generateProductStructuredData,
  getSiteBaseUrl,
} from '@/lib/seo';

export const HOTELS_PAGE_TITLE =
  'Hotel Management Software | PMS, Channel Manager & Hotel F&B — TasteIQ';

export const HOTELS_META_DESCRIPTION =
  'All-in-one hotel management software for India — PMS, hotel channel manager with Booking.com, Agoda & OTA integration, in-hotel F&B POS, booking engine and KYC. Book a demo.';

export const HOTELS_KEYWORDS = [
  'hotel management software',
  'property management system',
  'hotel channel manager',
  'channel manager India',
  'OTA integration',
  'hotel restaurant POS',
  'hotel F&B software',
  'in-room dining software',
  'booking engine',
  'prevent overbooking',
  'resort management software',
  'MakeMyTrip hotel integration',
  'Goibibo channel manager',
  'Agoda OTA sync',
  'Booking.com channel manager',
];

export function hotelsSoftwareJsonLd() {
  const base = getSiteBaseUrl();
  return generateProductStructuredData({
    name: 'TasteIQ Hotels — Hospitality OS',
    description: HOTELS_META_DESCRIPTION,
    image: `${base}/hotels/opengraph-image`,
  });
}

export function hotelsFaqJsonLd() {
  return generateFAQStructuredData(HOTELS_FAQS);
}

export function hotelsWebPageJsonLd() {
  const base = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: HOTELS_PAGE_TITLE,
    description: HOTELS_META_DESCRIPTION,
    url: `${base}/hotels`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TasteIQ',
      url: base,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'TasteIQ Hotels',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    },
  };
}
