# TasteIQ Next.js Landing Page

Modern, SEO-optimized landing page built with Next.js 14, featuring comprehensive analytics, A/B testing, and blog management.

## Features

- ✅ **SEO Optimized**: Server-side rendering, metadata management, structured data
- ✅ **Analytics**: GA4, Google Tag Manager, conversion tracking
- ✅ **A/B Testing**: Built-in A/B testing infrastructure
- ✅ **Blog System**: MDX-based blog with automatic RSS feed
- ✅ **Performance**: Optimized images, code splitting, Core Web Vitals
- ✅ **Digital Ads**: Google Ads, Facebook Pixel, LinkedIn, Microsoft UET

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Add your tracking IDs to `.env.local`:
   - Google Analytics 4 Measurement ID
   - Google Tag Manager ID
   - Google Ads ID (optional)
   - Facebook Pixel ID (optional)
   - LinkedIn Insight Tag ID (optional)
   - Microsoft UET ID (optional)

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Marketing pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── layout.tsx         # Root layout
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── analytics/         # Analytics components
│   ├── ab-test/           # A/B testing components
│   └── ui/                # UI components
├── lib/                   # Utility functions
│   ├── analytics.ts       # Analytics helpers
│   ├── ab-test.ts         # A/B testing logic
│   └── seo.ts             # SEO utilities
├── content/               # Content files (MDX blog posts)
└── public/                # Static assets
```

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property in Google Analytics
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Add it to `.env.local` as `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

### Google Tag Manager

1. Create a GTM container
2. Get your Container ID (format: GTM-XXXXXXX)
3. Add it to `.env.local` as `NEXT_PUBLIC_GTM_ID`

### Conversion Tracking

The app includes conversion tracking for:
- Google Ads
- Facebook Pixel
- LinkedIn Insight Tag
- Microsoft UET

Add the respective IDs to `.env.local` to enable them.

## A/B Testing

A/B testing is configured in `lib/ab-test.ts`. You can:

1. Define tests with variants and weights
2. Get variants server-side or client-side
3. Track test assignments and conversions

Example:
```typescript
import { getVariant } from '@/lib/ab-test';

const variant = getVariant('hero-headline');
// Returns: 'control', 'variant-a', or 'variant-b'
```

## Blog System

Blog posts are written in MDX format and stored in `content/blog/`.

Example blog post structure:
```markdown
---
title: "Blog Post Title"
description: "Post description"
date: "2024-01-01"
author: "Author Name"
tags: ["tag1", "tag2"]
---

# Blog Post Content
```

## SEO Features

- Automatic sitemap generation
- robots.txt configuration
- Structured data (JSON-LD)
- Open Graph tags
- Twitter Card support
- Meta tags per page

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted (Node.js server)

## Performance Optimization

- Image optimization with Next.js Image component
- Automatic code splitting
- Font optimization
- CSS optimization
- Core Web Vitals monitoring

## Support

For questions or issues, contact: founders@tasteiq.com

## License

Copyright © 2025 TasteIQ. All rights reserved.

