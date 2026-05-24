'use client';

import Link from 'next/link';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

const LEGACY_ITEMS = [
  'Rigid, menu-based interfaces',
  'Limited ordering channels',
  'No conversational AI',
  'Built for the pre-AI era',
  '4–6 apps stitched together',
];

const TASTEIQ_ITEMS = [
  { label: 'Conversational interfaces', detail: 'Natural language ordering' },
  { label: 'Multi-channel by default', detail: 'WhatsApp, chatbot, phone, agents' },
  { label: 'One intelligent system', detail: 'POS, kitchen, inventory, payments' },
  { label: 'Agent-ready menus', detail: 'Machine-readable for ChatGPT & co.' },
  { label: '15-minute go-live', detail: 'Upload a menu photo and bill' },
];

const STATS = [
  { value: '8+', label: 'ordering channels' },
  { value: '1', label: 'unified stack' },
  { value: '15m', label: 'typical setup' },
];

const CHANNELS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    blurb: 'Order in chat — fast, familiar, app-free.',
    icon: 'wa',
    featured: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    blurb: 'DM orders where followers already engage.',
    icon: 'ig',
    featured: false,
  },
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    blurb: '24/7 conversational ordering on your site.',
    icon: 'chat',
    featured: false,
  },
  {
    id: 'agentic',
    name: 'Agentic ordering',
    blurb: 'ChatGPT, Gemini, Claude — transactable menus.',
    icon: 'spark',
    featured: true,
  },
  {
    id: 'phone',
    name: 'Phone',
    blurb: 'Traditional calls logged in one queue.',
    icon: 'phone',
    featured: false,
  },
  {
    id: 'voice',
    name: 'AI phone calls',
    blurb: 'Voice agents that never miss an order.',
    icon: 'mic',
    featured: false,
  },
  {
    id: 'aggregators',
    name: 'Swiggy / Zomato',
    blurb: 'Aggregator orders synced to one kitchen.',
    icon: 'bag',
    featured: false,
  },
  {
    id: 'qr',
    name: 'Table QR',
    blurb: 'Scan, browse, pay — no app download.',
    icon: 'qr',
    featured: false,
  },
];

function ChannelIcon({ type }: { type: string }) {
  const p = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'wa':
      return (
        <svg {...p}>
          <path d="M4 20l2-6a8 8 0 1 1 6 6l-6 2z" />
          <path d="M9.5 11.5h.01M12 11.5h.01M14.5 11.5h.01" />
        </svg>
      );
    case 'ig':
      return (
        <svg {...p}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...p}>
          <path d="M5 9a7 7 0 0 1 14 0v5a7 7 0 0 1-14 0z" />
          <path d="M9 19l-2 2v-4" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...p}>
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...p}>
          <path d="M6 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case 'mic':
      return (
        <svg {...p}>
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
          <path d="M6 11a6 6 0 0 0 12 0M12 17v3" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...p}>
          <path d="M7 8h10l1 12H6z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h6" />
        </svg>
      );
  }
}

export default function PostAI() {
  const t = useLandingTheme();

  return (
    <section className={t.sectionPostAI} id="post-ai">
      <div className="postai-wrap">
        <header className="postai-head">
          <p className="postai-eyebrow">
            <span className="postai-eyebrow-dot" aria-hidden />
            Post-AI technology
          </p>
          <h2 className={`postai-title ${t.isPrototype ? 'font-display' : ''}`}>
            Beyond Legacy POS. <em>Redefining</em> the Entire Stack.
          </h2>
          <p className="postai-lead">
            Legacy systems were built for taps and tickets. TasteIQ is built for how customers
            actually order today — and how agents will order tomorrow.
          </p>
        </header>

        <div className="postai-stats" aria-label="Key metrics">
          {STATS.map((s) => (
            <div key={s.label} className="postai-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="postai-compare">
          <article className="postai-col postai-col--legacy">
            <div className="postai-col-label">Legacy stack</div>
            <h3 className="postai-col-h">What you&apos;re replacing</h3>
            <ul className="postai-list postai-list--legacy">
              {LEGACY_ITEMS.map((item) => (
                <li key={item}>
                  <span className="postai-x" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="postai-divider" aria-hidden>
            <span>→</span>
          </div>

          <article className="postai-col postai-col--tasteiq">
            <div className="postai-col-label postai-col-label--accent">TasteIQ</div>
            <h3 className="postai-col-h">One screen. Every channel.</h3>
            <ul className="postai-list postai-list--tasteiq">
              {TASTEIQ_ITEMS.map((item) => (
                <li key={item.label}>
                  <span className="postai-check" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="postai-channels">
          <div className="postai-channels-head">
            <h3 className={`postai-channels-h ${t.isPrototype ? 'font-display' : ''}`}>
              Order any way your customers want
            </h3>
            <p className="postai-channels-sub">
              Every channel feeds one queue, one kitchen, one ledger.
            </p>
          </div>

          <div className="postai-channel-grid">
            {CHANNELS.map((ch) => (
              <div
                key={ch.id}
                className={`postai-channel${ch.featured ? ' postai-channel--featured' : ''}`}
              >
                {ch.featured && <span className="postai-channel-tag">New</span>}
                <div className="postai-channel-icn">
                  <ChannelIcon type={ch.icon} />
                </div>
                <h4>{ch.name}</h4>
                <p>{ch.blurb}</p>
              </div>
            ))}
          </div>

          <p className="postai-foot">
            <strong>All channels unified.</strong> Complete visibility from first message to final
            bill — no more tab-switching between six apps.
          </p>

          <div className="postai-cta-row">
            <Link href="#contact" className={t.primaryBtn}>
              See it on your floor
            </Link>
            <Link
              href="/fnb"
              className={t.isPrototype ? t.secondaryBtnOnLight : t.secondaryBtn}
            >
              Explore the product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
