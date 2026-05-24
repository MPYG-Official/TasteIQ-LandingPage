/** Keys for route-level opengraph-image / twitter-image generation */
import { FOODS_SITE_URL } from '@/lib/site-urls';

export type OgPageKey = 'home' | 'vision' | 'fnb' | 'foods' | 'hotels';

export interface OgPageVisual {
  headline: string;
  subheadline: string;
  cta: string;
  badge?: string;
  accent: string;
  alt: string;
}

/** Copy shown on the 1200×630 share card — optimized for click-through */
export const OG_PAGE_VISUALS: Record<OgPageKey, OgPageVisual> = {
  home: {
    headline: 'POS for the Post-AI World',
    subheadline: '15-min setup · AI receptionist · WhatsApp orders · GST billing',
    cta: 'Book a free demo →',
    badge: 'Limited launch offer',
    accent: '#c45c3e',
    alt: 'TasteIQ — restaurant POS built for the post-AI era',
  },
  vision: {
    headline: 'Free software.\nOne UI per restaurant.',
    subheadline: 'Shaped by an agent. Transactable where your customers already are.',
    cta: 'Read the vision →',
    badge: 'Manifesto',
    accent: '#c45c3e',
    alt: 'TasteIQ Vision — the operating system restaurants deserve',
  },
  fnb: {
    headline: 'F&B software.\nOne screen.',
    subheadline: 'Restaurant POS, kitchen, tables, inventory — INR-native & GST-ready',
    cta: 'Explore F&B →',
    badge: 'F&B OS',
    accent: '#c45c3e',
    alt: 'TasteIQ F&B — restaurant and hospitality food software',
  },
  foods: {
    headline: 'Meals sorted.\nBreakfast, lunch & dinner.',
    subheadline:
      'Morning, afternoon & evening — subscribe to the best kitchens near your building or campus',
    cta: 'Join the waitlist →',
    badge: 'TasteIQ Foods',
    accent: '#2d6a4f',
    alt: 'TasteIQ Foods — breakfast, lunch and dinner from nearby kitchens',
  },
  hotels: {
    headline: 'Every booking.\nEvery outlet.\nOne platform.',
    subheadline: 'PMS · channel manager · 100+ OTAs · hotel F&B & room service',
    cta: 'Book a demo →',
    badge: 'Hospitality OS',
    accent: '#b5482b',
    alt: 'TasteIQ Hotels — hotel management software with channel manager & events',
  },
};

export interface PageShareCopy {
  /** Browser tab / SEO title */
  title: string;
  /** Meta description + OG/Twitter text (keep under ~160 chars) */
  description: string;
  /** Optional shorter title for social cards */
  socialTitle?: string;
  keywords?: string[];
  url: string;
  ogPage: OgPageKey;
}

export const PAGE_SHARE_COPY: Record<OgPageKey, PageShareCopy> = {
  home: {
    title: 'TasteIQ | POS Built for the Post-AI World',
    socialTitle: 'Switch in 15 min — zero-risk POS for restaurants',
    description:
      'AI receptionist, WhatsApp ordering, GST billing & inventory in one OS. Book a free demo — limited launch pricing.',
    url: '/',
    ogPage: 'home',
    keywords: [
      'post-AI POS',
      'restaurant POS India',
      'WhatsApp restaurant ordering',
      'GST billing software',
    ],
  },
  vision: {
    title: 'TasteIQ Vision — The OS restaurants deserve',
    socialTitle: 'Free restaurant software, built for the agent era',
    description:
      'One UI per restaurant, shaped by an agent. Transactable on WhatsApp & assistants. Starting in India — building for the world.',
    url: '/vision',
    ogPage: 'vision',
    keywords: ['restaurant operating system', 'free restaurant software', 'agentic commerce'],
  },
  fnb: {
    title: 'Restaurant F&B Software | POS, Kitchen & Inventory — TasteIQ',
    socialTitle: 'F&B POS, KOT, tables & GST billing — one screen',
    description:
      'Restaurant F&B software for India — billing, kitchen display, table management, inventory and Zomato/Swiggy sync. GST-ready POS. Book a free demo.',
    url: '/fnb',
    ogPage: 'fnb',
    keywords: [
      'restaurant F&B software',
      'restaurant POS India',
      'kitchen display system',
      'GST billing software',
      'restaurant inventory management',
    ],
  },
  foods: {
    title: 'TasteIQ Foods — Meals sorted, morning to night',
    socialTitle: 'Breakfast, lunch & dinner — sorted and delivered',
    description:
      'One subscription for every meal — top kitchens near your campus or building. Pick breakfast, lunch or dinner daily; skip when you want.',
    url: FOODS_SITE_URL,
    ogPage: 'foods',
    keywords: [
      'meal subscription',
      'breakfast lunch dinner delivery',
      'corporate tiffin',
      'campus food subscription',
    ],
  },
  hotels: {
    title: 'Hotel Management Software | PMS, Channel Manager & Hotel F&B — TasteIQ',
    socialTitle: 'PMS, channel manager & in-hotel F&B — one platform',
    description:
      'Hotel management software with OTA integration (Booking.com, Agoda, MakeMyTrip), in-hotel F&B POS, booking engine & KYC. Channel manager India. Book a demo.',
    url: '/hotels',
    ogPage: 'hotels',
    keywords: [
      'hotel management software',
      'hotel channel manager',
      'channel manager India',
      'banquet event management software',
      'property management system',
    ],
  },
};
