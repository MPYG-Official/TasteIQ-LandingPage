import { Metadata } from 'next';
import type { OgPageKey } from '@/lib/og-pages';
import { PAGE_SHARE_COPY } from '@/lib/og-pages';

export function getSiteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.in';
}

export interface SEOConfig {
  title: string;
  description: string;
  /** Shorter, benefit-led title for Open Graph / Twitter (defaults to title) */
  socialTitle?: string;
  keywords?: string[];
  /** Absolute or path URL; omit when using co-located opengraph-image.tsx */
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/** Metadata from centralized share copy + route-level OG image files */
export function metadataForPage(page: OgPageKey): Metadata {
  const copy = PAGE_SHARE_COPY[page];
  return generateMetadata({
    title: copy.title,
    socialTitle: copy.socialTitle,
    description: copy.description,
    keywords: copy.keywords,
    url: copy.url,
  });
}

export const generateMetadata = (config: SEOConfig): Metadata => {
  const {
    title,
    description,
    socialTitle,
    keywords = [],
    image,
    url = '/',
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = config;

  const baseUrl = getSiteBaseUrl();
  const fullTitle = title.includes('TasteIQ') ? title : `${title} | TasteIQ`;
  const cardTitle = socialTitle || fullTitle;
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`
    : undefined;

  const ogImages = imageUrl
    ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: cardTitle,
        },
      ]
    : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      url: fullUrl,
      title: cardTitle,
      description,
      siteName: 'TasteIQ',
      locale: 'en_IN',
      ...(ogImages ? { images: ogImages } : {}),
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: cardTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

// Generate structured data (JSON-LD)
export const generateStructuredData = (config: {
  type: 'Organization' | 'WebSite' | 'Article' | 'FAQPage' | 'Product';
  data: Record<string, any>;
}) => {
  const { type, data } = config;

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return baseStructuredData;
};

const siteBase = () => getSiteBaseUrl();

// Organization structured data
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TasteIQ',
  get url() {
    return siteBase();
  },
  get logo() {
    return `${siteBase()}/images/logo.png`;
  },
  description: 'The Intelligent Restaurant OS. Switch today and save!',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-6207466460',
    contactType: 'Customer Service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  sameAs: [
    // Add social media links here
  ],
};

// Website structured data
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TasteIQ',
  get url() {
    return siteBase();
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      get urlTemplate() {
        return `${siteBase()}/search?q={search_term_string}`;
      },
    },
    'query-input': 'required name=search_term_string',
  },
};

// FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Article structured data for blog posts
export const generateArticleStructuredData = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo,
      },
    },
  };
};

// Product structured data
export const generateProductStructuredData = (product: {
  name: string;
  description: string;
  image: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    image: product.image,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: product.price
      ? {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.priceCurrency || 'INR',
          availability: product.availability || 'https://schema.org/InStock',
        }
      : undefined,
  };
};

