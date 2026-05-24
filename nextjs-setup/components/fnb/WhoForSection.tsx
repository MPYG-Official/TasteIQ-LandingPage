import Link from 'next/link';
import type { ReactNode } from 'react';

export type WhoCard = {
  id: string;
  tag: string;
  title: string;
  bullets: string[];
  foot: string;
  icon: ReactNode;
  cta?: boolean;
};

function IconQsr() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconDineIn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconCloudKitchen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 14h14l-2 6H7l-2-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 14V9a4 4 0 0 1 8 0v5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHotelFnb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V8l8-4 8 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCafe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h11v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 10h2a2 2 0 0 1 0 4h-2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 4c0 2 1.5 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const FNB_WHO_CARDS: WhoCard[] = [
  {
    id: 'qsr',
    tag: 'QSR · CHATS · SNACKS',
    title: 'counter-service at 500+ orders a day.',
    bullets: ['Two-tap billing', 'Deep menus & modifiers', 'Peak-hour speed'],
    foot: 'TastyChats · Bengaluru',
    icon: <IconQsr />,
  },
  {
    id: 'dine-in',
    tag: 'MULTI-CUISINE RESTAURANTS',
    title: 'tables, captains and kitchen sections.',
    bullets: ['Floor map & table state', 'Multi-kitchen KOT', 'Zomato + Swiggy sync'],
    foot: 'North Fork · Bengaluru & Goa',
    icon: <IconDineIn />,
  },
  {
    id: 'cloud',
    tag: 'CLOUD KITCHENS',
    title: '3–8 brands under one roof.',
    bullets: ['Brand-aware tickets', 'Aggregator + direct mix', 'One menu, many storefronts'],
    foot: 'Courtyard Kitchen · Mumbai',
    icon: <IconCloudKitchen />,
  },
  {
    id: 'hotel',
    tag: 'HOTELS WITH F&B',
    title: 'restaurant, room service, one folio.',
    bullets: ['Room-charge routing', 'In-room dining KOT', 'Check-out settlement'],
    foot: 'OKKO Hotels · 4 properties',
    icon: <IconHotelFnb />,
  },
  {
    id: 'cafe',
    tag: 'CAFÉS · BARS · BAKERIES',
    title: 'high-SKU counters and hybrid dine-in.',
    bullets: ['Fast billing', 'Recipe costing', 'Vendor GRN & sync'],
    foot: 'Third Wave · multi-city',
    icon: <IconCafe />,
  },
  {
    id: 'more',
    tag: "DON'T SEE YOURS?",
    title: 'if you run food service, we likely fit.',
    bullets: ['Tea shops & dhabas', 'Tiffin & food courts', 'Agent-shaped UI'],
    foot: "Send a 60-sec floor video — we'll mock a fit.",
    icon: <IconMore />,
    cta: true,
  },
];

export default function WhoForSection() {
  return (
    <section className="who-sec" id="who">
      <div className="wrap">
        <div className="sec-head who-sec-head">
          <span className="sec-eye who-sec-eye">
            <span className="sec-eye-dot" />
            Who it&apos;s for
          </span>
          <h2 className="sec-h who-sec-h">
            one f&amp;b stack. <em>every shape of outlet.</em>
          </h2>
          <p className="sec-sub who-sec-sub">
            QSR, dine-in, cloud kitchens and hotel outlets — turn on the modules you need. Banquets
            and events live on{' '}
            <Link href="/hotels" className="who-sec-link">
              TasteIQ Hotels
            </Link>
            .
          </p>
        </div>

        <div className="who-grid">
          {FNB_WHO_CARDS.map((card) => (
            <article key={card.id} className={`who-card${card.cta ? ' who-card--cta' : ''}`}>
              <div className="who-card-top">
                <span className="who-icon-chip" aria-hidden="true">
                  {card.icon}
                </span>
                <span className="who-tag">{card.tag}</span>
              </div>
              <h3 className="who-h">{card.title}</h3>
              <ul className="who-bullets" aria-label={`${card.tag} highlights`}>
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <footer className="who-foot">
                <span className="who-dot" aria-hidden="true" />
                {card.foot}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
