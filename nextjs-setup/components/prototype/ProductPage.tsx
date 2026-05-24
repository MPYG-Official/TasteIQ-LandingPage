'use client';

import Link from 'next/link';
import { FOODS_SITE_URL } from '@/lib/site-urls';
import { PRODUCT_FAQS } from '@/lib/product-data';
import TasteIQFnbLogo from '@/components/fnb/TasteIQFnbLogo';
import ModulesSection from '@/components/fnb/ModulesSection';
import WhoForSection from '@/components/fnb/WhoForSection';
import ScreenExplorer from './ScreenExplorer';
import '@/components/fnb/fnb.css';
import './product-prototype.css';

const INDIA_CARDS = [
  ['Any currency', '₹ ‧ $ ‧ £ ‧ € ‧ د.إ ‧ S$ ‧ — formatted in the right notation. Lakhs, crores, millions, billions — local conventions, not Excel defaults.'],
  ['Local tax + e-invoice', 'GST in India. VAT in the EU and UK. Sales tax in US states. Tax engines, e-invoice formats and audit trails native to each market.'],
  ['12 languages', 'English, हिन्दी, தமிழ், Español, العربية, Français, Português, Bahasa, 中文, 日本語, Deutsch, Türkçe — staff choose their own.'],
  ['Works offline', 'Patchy wifi at the counter? Keep billing. Orders, payments and tickets queue locally and sync the moment the network\'s back.'],
  ['Every payment rail', 'UPI, cards, Apple Pay, Google Pay, Tabby, Mada, SEPA, ACH, cash, room-charge — all settled in one ledger.'],
  ['Channels worldwide', 'Zomato, Swiggy, Uber Eats, DoorDash, Deliveroo, Talabat, Wolt, Google Maps, ONDC — sync menus once; fan out everywhere.'],
];

export default function ProductPage() {
  return (
    <div className="food-brand-site fnb-site">
      <header className="fb-wrap fnb-logo-header">
        <TasteIQFnbLogo />
      </header>
      <div className="product-site">
      <section className="phero">
        <div className="wrap">
          <span className="phero-eye">
            <span className="phero-eye-dot" />
            <span>F&amp;B</span>
            <span className="phero-rule" />
            <span>Restaurant F&amp;B software · live in 142 outlets across 5 countries</span>
          </span>
          <h1 className="phero-h1">
            Everything your kitchen and counter run on, in <em>one screen</em>.
          </h1>
          <p className="phero-sub">
            Restaurant <b>F&amp;B software</b> for billing, kitchen (KOT), tables, inventory, customers,
            payments and GST — the stack most operators stitch from 4–6 apps today.{' '}
            <b>One POS. One UI per outlet.</b> Built for the way each kitchen actually works.
          </p>
          <div className="phero-meta">
            <div>
              <b>12+</b>F&amp;B modules
            </div>
            <div>
              <b>4</b>outlet types
            </div>
            <div>
              <b>12</b>languages
            </div>
            <div>
              <b>5</b>markets, going wider
            </div>
          </div>
        </div>
      </section>

      <section className="screens" aria-label="Live product screens">
        <div className="wrap">
          <ScreenExplorer />
        </div>
      </section>

      <ModulesSection />

      <section className="sec" id="global">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              Global by design
            </span>
            <h2 className="sec-h">
              Speaks every kitchen&apos;s language. <em>Literally.</em>
            </h2>
            <p className="sec-sub">
              Currency, tax, language, payment rail, channel — every module reshapes for the market
              it&apos;s in. Launched in India. Already running in the UAE, UK and Singapore.
            </p>
          </div>
          <div className="india-grid">
            {INDIA_CARDS.map(([h, d]) => (
              <div key={h} className="india-card">
                <div className="india-card-h">{h}</div>
                <div className="india-card-d">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhoForSection />

      <section className="sec" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              FAQ
            </span>
            <h2 className="sec-h">
              Restaurant F&amp;B software, <em>answered.</em>
            </h2>
          </div>
          <div className="product-faq-list">
            {PRODUCT_FAQS.map((faq) => (
              <details key={faq.question} className="product-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="start">
        <h2>
          The software is <em>free</em>. The relationship isn&apos;t.
        </h2>
        <p className="cta-sub">
          We earn when you earn. Start the onboarding today, or talk to a partner in your city first.
        </p>
        <div className="cta-row">
          <Link href="/vision#start" className="btn btn-primary">
            Start onboarding
          </Link>
          <Link href="/vision" className="btn btn-ghost">
            Find a partner near you →
          </Link>
        </div>
      </section>

      <footer className="ftr">
        <div className="ftr-l">
          <svg className="ftr-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="13.5" r="8" fill="#0E1116" />
            <circle cx="17" cy="8" r="3" fill="#C24A2A" />
          </svg>
          <span>tasteiq © 2026 — Bengaluru. Going global.</span>
        </div>
        <div className="ftr-r">
          <Link href="/">Home</Link>
          <Link href="/vision">Manifesto</Link>
          <Link href="/fnb">F&amp;B</Link>
          <a href={FOODS_SITE_URL} rel="noopener noreferrer">
            Foods
          </a>
          <Link href="/hotels">Hotels</Link>
        </div>
      </footer>
    </div>
    </div>
  );
}
