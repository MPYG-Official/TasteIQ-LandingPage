import ProductPage from '@/components/prototype/ProductPage';
import {
  productFaqJsonLd,
  productSoftwareJsonLd,
  productWebPageJsonLd,
  PRODUCT_KEYWORDS,
  PRODUCT_META_DESCRIPTION,
  PRODUCT_PAGE_TITLE,
} from '@/lib/product-seo';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: PRODUCT_PAGE_TITLE,
  socialTitle: 'F&B POS, KOT, tables & GST — one screen',
  description: PRODUCT_META_DESCRIPTION,
  keywords: PRODUCT_KEYWORDS,
  url: '/fnb',
});

export default function FnbRoutePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productWebPageJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSoftwareJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productFaqJsonLd()) }}
      />
      <ProductPage />
    </>
  );
}
