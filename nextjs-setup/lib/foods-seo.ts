import { generateFAQStructuredData, getSiteBaseUrl } from '@/lib/seo';
import { FOODS_SITE_URL } from '@/lib/site-urls';

export const FOODS_FAQS = [
  {
    question: 'Does TasteIQ Foods cover breakfast, lunch and dinner?',
    answer:
      'Yes. One subscription lets you order from partner kitchens for morning, afternoon and evening meals. Pick a daypart, swap dishes any time, or pause when you travel.',
  },
  {
    question: 'How does a TasteIQ Foods meal subscription work?',
    answer:
      'Enter your PIN code to see kitchens near your building or campus. Subscribe to a kitchen (or order one-off), choose your meals for breakfast, lunch or dinner, and we pack and deliver in a single run to your floor or lobby.',
  },
  {
    question: 'Who is TasteIQ Foods for?',
    answer:
      'Office teams, college campuses, PGs and hostels, and apartment communities where many people eat at the same place every day — anywhere you want reliable breakfast, lunch and dinner without juggling multiple apps.',
  },
  {
    question: 'Which cities is TasteIQ Foods available in?',
    answer:
      'We are live in Bengaluru and onboarding Hyderabad, Pune and Mumbai. If we do not deliver to your PIN yet, join the waitlist — we expand when an area hits critical demand.',
  },
  {
    question: 'How is TasteIQ Foods different from Swiggy or Zomato?',
    answer:
      'We aggregate demand inside closed communities and run one orchestrated delivery per window — so meals arrive together, hot and labelled by floor. Subscriptions, tiffin-style plans and corporate billing are built in.',
  },
];

export function foodsFaqJsonLd() {
  return generateFAQStructuredData(FOODS_FAQS);
}

export function foodsWebPageJsonLd() {
  const base = getSiteBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TasteIQ Foods — Meals sorted, morning to night',
    description:
      'Subscribe to breakfast, lunch and dinner from the best kitchens near your office, campus, PG or apartment. Bengaluru live; more cities onboarding.',
    url: FOODS_SITE_URL,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TasteIQ',
      url: base,
    },
    about: {
      '@type': 'FoodService',
      name: 'TasteIQ Foods',
      servesCuisine: ['Indian', 'Continental', 'Asian', 'Healthy'],
      areaServed: {
        '@type': 'City',
        name: 'Bengaluru',
      },
    },
  };
}
