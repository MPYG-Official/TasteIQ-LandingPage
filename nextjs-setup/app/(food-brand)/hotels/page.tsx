import HotelsPage from '@/components/hotels/HotelsPage';
import {
  hotelsFaqJsonLd,
  hotelsSoftwareJsonLd,
  hotelsWebPageJsonLd,
  HOTELS_KEYWORDS,
  HOTELS_META_DESCRIPTION,
  HOTELS_PAGE_TITLE,
} from '@/lib/hotels-seo';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: HOTELS_PAGE_TITLE,
  socialTitle: 'PMS, channel manager & banquet events — one platform',
  description: HOTELS_META_DESCRIPTION,
  keywords: HOTELS_KEYWORDS,
  url: '/hotels',
});

export default function HotelsRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelsWebPageJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelsSoftwareJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelsFaqJsonLd()) }}
      />
      <HotelsPage />
    </>
  );
}
