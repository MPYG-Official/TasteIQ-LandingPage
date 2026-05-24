import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Instrument_Serif, Inter_Tight, Poppins } from 'next/font/google';
import './globals.css';
import './landing-prototype.css';
import './site-nav.css';
import GlobalChrome from '@/components/layout/GlobalChrome';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import ConversionTracking from '@/components/analytics/ConversionTracking';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { organizationStructuredData, websiteStructuredData } from '@/lib/seo';
import { getSiteTheme } from '@/lib/theme';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tasteiq.in';

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const interTight = Inter_Tight({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TasteIQ | 15-Min Setup, Zero Risk Switch',
    template: '%s | TasteIQ',
  },
  description: 'TasteIQ - The Intelligent Restaurant OS. Switch today and save!',
  keywords: [
    'restaurant POS',
    'restaurant management software',
    'restaurant inventory management',
    'restaurant ordering system',
    'cloud kitchen software',
    'restaurant billing software',
  ],
  authors: [{ name: 'TasteIQ' }],
  creator: 'TasteIQ',
  publisher: 'TasteIQ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'TasteIQ',
    title: 'Switch in 15 min — zero-risk POS for restaurants',
    description:
      'AI receptionist, WhatsApp ordering, GST billing & inventory in one OS. Book a free demo — limited launch pricing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Switch in 15 min — zero-risk POS for restaurants',
    description:
      'AI receptionist, WhatsApp ordering, GST billing & inventory in one OS. Book a free demo — limited launch pricing.',
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
  verification: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getSiteTheme();

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${theme === 'prototype' ? 'theme-prototype' : 'theme-classic'} ${poppins.variable} ${interTight.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
          </Suspense>
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <ConversionTracking
          googleAdsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
          facebookPixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
          linkedInId={process.env.NEXT_PUBLIC_LINKEDIN_ID}
          microsoftUetId={process.env.NEXT_PUBLIC_MICROSOFT_UET_ID}
        />
        <ThemeProvider initialTheme={theme}>
          <GlobalChrome>{children}</GlobalChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
