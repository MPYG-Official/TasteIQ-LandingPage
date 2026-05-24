'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { lookupPin, PIN_CHIPS } from '@/lib/foods-data';
import { FOODS_FAQS } from '@/lib/foods-seo';
import { captureReferralFromUrl } from '@/lib/referral-attribution';
import FoodsFooter from './FoodsFooter';
import KitchensOverlay from './KitchensOverlay';
import './foods-prototype.css';

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3 9 L9 3 M9 3 H4.5 M9 3 V7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FoodsPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) captureReferralFromUrl(searchParams);
  }, [searchParams]);

  const [pin, setPin] = useState('');
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState('');
  const [kitOpen, setKitOpen] = useState(false);
  const [kitPin, setKitPin] = useState('');
  const [kitArea, setKitArea] = useState('');

  const [bannerPin, setBannerPin] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const [requestPin, setRequestPin] = useState('');
  const [prefillPin, setPrefillPin] = useState(false);
  const [requestDone, setRequestDone] = useState(false);

  const cityInputRef = useRef<HTMLInputElement>(null);
  const requestPinInputRef = useRef<HTMLInputElement>(null);

  const openKitchens = useCallback((p: string, area: string) => {
    setKitPin(p);
    setKitArea(area);
    setKitOpen(true);
  }, []);

  const showUnavailable = useCallback((p: string) => {
    setBannerPin(p);
    setShowBanner(true);
    setRequestPin(p);
    setPrefillPin(true);

    const sec = document.getElementById('request');
    sec?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => cityInputRef.current?.focus(), 700);
    setTimeout(() => setPrefillPin(false), 2400);
  }, []);

  const checkPin = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const trimmed = pin.trim();
      setPinError('');

      if (!/^\d{6}$/.test(trimmed)) {
        setPinError(trimmed ? 'PIN code must be 6 digits' : 'Enter your 6-digit PIN code');
        document.getElementById('pin-input')?.focus();
        return;
      }

      setPinLoading(true);
      const res = await lookupPin(trimmed);
      setPinLoading(false);

      if (res.available) {
        openKitchens(res.pin, res.area);
      } else {
        showUnavailable(res.pin);
      }
    },
    [pin, openKitchens, showUnavailable]
  );

  const onPinInput = (value: string) => {
    setPin(value.replace(/\D/g, '').slice(0, 6));
    setPinError('');
  };

  const tryChip = async (chipPin: string) => {
    setPin(chipPin);
    setPinError('');
    if (!/^\d{6}$/.test(chipPin)) return;
    setPinLoading(true);
    const res = await lookupPin(chipPin);
    setPinLoading(false);
    if (res.available) {
      openKitchens(res.pin, res.area);
    } else {
      showUnavailable(res.pin);
    }
  };

  const focusPinFromCta = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('pin-input');
    el?.focus();
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const onRequestSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRequestDone(true);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/prototype/foods-hero-bg.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
          />
        </div>

        <div className="wrap hero-inner">
          <span className="hero-eye">
            <span className="hero-eye-dot" />
            <b>TasteIQ Foods</b>
            <span className="hero-eye-sep">·</span>
            <span>Breakfast, lunch &amp; dinner · Bengaluru</span>
          </span>
          <h1 className="hero-h1">
            Meals sorted. <em>Morning to night.</em>
          </h1>
          <p className="hero-sub">
            TasteIQ Foods brings the best kitchens around your office, college, PG or apartment into one
            subscription. <b>Pick breakfast, lunch or dinner</b> — swap dishes any day, skip when you
            travel. We pack and run a single delivery to your floor, desk or lobby.
          </p>

          <div className="pin-block">
            <form className="pin-form" id="pin-form" onSubmit={checkPin} noValidate>
              <span className="pin-form-label">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22 C7 16 4 12 4 9 A8 8 0 0 1 20 9 C20 12 17 16 12 22 Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                PIN code
              </span>
              <input
                id="pin-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="560103"
                autoComplete="postal-code"
                aria-label="Enter your 6-digit PIN code"
                value={pin}
                onChange={(e) => onPinInput(e.target.value)}
              />
              <button
                className="pin-form-btn"
                id="pin-submit"
                type="submit"
                data-loading={pinLoading ? '1' : undefined}
              >
                <span className="pin-btn-text">{pinLoading ? 'Checking…' : 'Check availability'}</span>
                <span className="pin-spin" aria-hidden="true" />
                <svg className="pin-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M3 9 L9 3 M9 3 H4.5 M9 3 V7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <div className={`pin-err${pinError ? ' show' : ''}`} id="pin-err">
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6 3.5 V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="6" cy="8.6" r="0.7" fill="currentColor" />
              </svg>
              <span id="pin-err-msg">{pinError || 'Enter your 6-digit PIN code'}</span>
            </div>
            <div className="pin-aux">
              <span className="pin-aux-try">Try:</span>
              {PIN_CHIPS.map((c) => (
                <button
                  key={c.pin}
                  type="button"
                  className="pin-aux-chip"
                  data-pin={c.pin}
                  onClick={() => tryChip(c.pin)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-l">Partner kitchens</div>
              <div className="hero-stat-n">53</div>
            </div>
            <div>
              <div className="hero-stat-l">Communities served</div>
              <div className="hero-stat-n">28</div>
            </div>
            <div>
              <div className="hero-stat-l">Meals delivered last week</div>
              <div className="hero-stat-n">6,420</div>
            </div>
            <div>
              <div className="hero-stat-l">On-time, hot</div>
              <div className="hero-stat-n">97%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="who" id="who">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              Who it&apos;s for
            </span>
            <h2 className="sec-h">
              <em>Five communities.</em> One platform.
            </h2>
            <p className="sec-sub">
              Offices, campuses, PGs and apartments — one platform for breakfast, lunch and dinner, without
              anyone building a food court.
            </p>
          </div>

          <div className="who-grid">
            {WHO_CARDS.map((card) => (
              <article key={card.tag} className="who-card" style={card.style}>
                <div className="who-icn" aria-hidden="true" style={card.iconStyle}>
                  {card.icon}
                </div>
                <span className="who-tag">{card.tag}</span>
                <h3 className="who-h">{card.title}</h3>
                <p className="who-d">{card.body}</p>
                <div className="who-meta" dangerouslySetInnerHTML={{ __html: card.meta }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              How it works
            </span>
            <h2 className="sec-h">
              Aggregated demand. <em>Single delivery.</em>
            </h2>
            <p className="sec-sub">
              Residents choose morning, afternoon or evening meals. Kitchens cook in parallel — we orchestrate one
              sealed delivery per window to your community.
            </p>
          </div>

          <div className="how-grid">
            {HOW_STEPS.map((step) => (
              <div key={step.n} className="how-step">
                <div className="how-step-icn" aria-hidden="true">
                  {step.icon}
                </div>
                <span className="how-step-n">{step.n}</span>
                <h3 className="how-step-h">{step.title}</h3>
                <p className="how-step-d">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comm" id="communities">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              For communities
            </span>
            <h2 className="sec-h">
              Bring TasteIQ Foods to <em>your place.</em>
            </h2>
            <p className="sec-sub">
              We onboard apartments, PGs, hostels, offices and college campuses. No setup fee. We handle the QR,
              the menu rotation and the residents&apos; WhatsApp group.
            </p>
          </div>

          <div className="comm-grid">
            {COMM_CARDS.map((card) => (
              <article key={card.label} className="comm-card">
                <div className="comm-card-h">
                  <div className="comm-icn" aria-hidden="true">
                    {card.icon}
                  </div>
                  <span className="comm-card-l">{card.label}</span>
                </div>
                <p className="comm-card-d">{card.body}</p>
                <div className="comm-foot" dangerouslySetInnerHTML={{ __html: card.foot }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="request" id="request">
        <div className="wrap">
          <div className={`request-banner${showBanner ? ' show' : ''}`} id="request-banner">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7 V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            </svg>
            <div>
              We&apos;re not delivering to <b id="banner-pin">{bannerPin}</b> yet — but we want to. Fill this out
              and we&apos;ll bring TasteIQ to your area the moment we hit critical mass.
            </div>
          </div>

          <div className="request-card">
            <div className="request-l">
              <span className="sec-eye">
                <span className="sec-eye-dot" />
                Not in your city yet?
              </span>
              <h2 className="request-h">
                Tell us where <em>to come next.</em>
              </h2>
              <p className="request-d">
                We pick our next city by demand. Drop your pincode and a few details about your building or office
                — the moment we hit a critical mass in your area, we onboard kitchens and turn it on.
              </p>
              <ul className="request-meta">
                <li>
                  <span className="request-meta-k">Live in</span>
                  <span className="request-meta-v">Bengaluru</span>
                </li>
                <li>
                  <span className="request-meta-k">Onboarding</span>
                  <span className="request-meta-v">Hyderabad · Pune · Mumbai</span>
                </li>
                <li>
                  <span className="request-meta-k">Waitlist open</span>
                  <span className="request-meta-v">28 more cities</span>
                </li>
              </ul>
            </div>

            <form className="request-r" onSubmit={onRequestSubmit}>
              {!requestDone ? (
                <div className="request-fields">
                  <label className="request-field">
                    <span>Your city</span>
                    <input ref={cityInputRef} type="text" required placeholder="e.g. Hyderabad" />
                  </label>
                  <label
                    className={`request-field${prefillPin ? ' is-prefill' : ''}`}
                    id="request-pin-field"
                  >
                    <span>Pincode / area</span>
                    <input
                      ref={requestPinInputRef}
                      id="request-pin-input"
                      type="text"
                      required
                      placeholder="500032 · Gachibowli"
                      value={requestPin}
                      onChange={(e) => setRequestPin(e.target.value)}
                    />
                  </label>
                  <label className="request-field">
                    <span>Where would we deliver?</span>
                    <select required defaultValue="">
                      <option value="">Pick one</option>
                      <option>Apartment / society</option>
                      <option>Office / corporate</option>
                      <option>PG / hostel</option>
                      <option>College campus</option>
                      <option>Coworking</option>
                      <option>Something else</option>
                    </select>
                  </label>
                  <label className="request-field">
                    <span>Email or phone</span>
                    <input type="text" required placeholder="hello@you.com / +91 ..." />
                  </label>
                  <button className="btn btn-accent btn-arrow request-submit" type="submit">
                    Request TasteIQ here
                    <ArrowIcon />
                  </button>
                  <span className="request-fine">We&apos;ll write back within 24 hours with the count for your area.</span>
                </div>
              ) : (
                <div className="request-done">
                  <div className="request-done-icn" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12 L10 17 L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="request-done-h">You&apos;re on the list.</h3>
                  <p className="request-done-d">
                    We&apos;ll write to you the moment your area crosses the threshold. Forward this to a
                    neighbour — it speeds things up.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap faq-wrap">
          <div>
            <span className="sec-eye">
              <span className="sec-eye-dot" />
              FAQ
            </span>
            <h2 className="sec-h">
              Breakfast, lunch &amp; dinner — <em>how it works.</em>
            </h2>
            <p className="sec-sub">
              Common questions about meal subscriptions, delivery windows and cities we serve.
            </p>
          </div>
          <div className="faq-list">
            {FOODS_FAQS.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>
                  {item.question}
                  <span className="faq-toggle" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2 V12 M2 7 H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="faq-a">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing" id="start">
        <span className="closing-eye">
          <span className="closing-eye-dot" />
          Start eating
        </span>
        <h2 className="closing-h">
          Your first meal is on us. <em>The next 39 are yours.</em>
        </h2>
        <p className="closing-sub">
          Drop your PIN code below — if we deliver to you, we&apos;ll show every kitchen for breakfast, lunch and
          dinner near your address. Your first meal is on us this week.
        </p>
        <div className="closing-cta">
          <a className="btn btn-accent btn-arrow" href="#pin-input" onClick={focusPinFromCta}>
            Check my PIN code
            <ArrowIcon />
          </a>
          <a className="btn btn-ghost btn-arrow" href="#communities">
            Bring it to my community
            <ArrowIcon />
          </a>
        </div>
      </section>

      <FoodsFooter />

      <KitchensOverlay
        open={kitOpen}
        pin={kitPin}
        area={kitArea}
        onClose={() => setKitOpen(false)}
      />
    </>
  );
}

const WHO_CARDS = [
  {
    tag: 'A · Office workers',
    title: 'Breakfast, lunch & dinner at work.',
    body: 'Morning meetings, desk lunch, late sprints — pick the kitchen and daypart. One delivery run per window to your floor.',
    meta: '<b>All dayparts</b> · swap or pause anytime',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 6 V4 H16 V6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 13 H21" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    tag: 'B · College students',
    title: 'Skip the mess. Eat better.',
    body: 'Affordable breakfast, lunch and dinner that actually arrive hot. Variety beyond the canteen. Subscribe with your hostel block.',
    meta: '<b>Hostel block</b> · all meals',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 9 L12 4 L21 9 L12 14 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 11 V17 Q12 20 17 17 V11" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    tag: 'C · PG residents',
    title: 'Tiffin-wala, reimagined.',
    body: 'Predictable morning, afternoon and evening timings. Ten times the variety. One subscription replaces your monthly tiffin contract.',
    meta: '<b>Breakfast–dinner</b> · one plan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 20 V11 L12 5 L20 11 V20 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 20 V14 H15 V20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    tag: 'D · Corporate cafeterias',
    title: 'Twenty kitchens, one contract.',
    body: 'Trade your single vendor for a curated marketplace across breakfast, lunch and dinner. We own quality, hygiene SLAs and the menu calendar.',
    meta: '<b>All meals</b> · single invoice',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12 H21" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 8 V5 H16 V8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="16" r="1.2" fill="currentColor" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    tag: 'E · Corporate events',
    title: 'Fifty to five hundred plates.',
    body: 'Breakfast spreads, working lunches, AGM dinners, evening snacks. Multiple kitchens, one PO, one invoice, one timeline.',
    meta: 'Custom · 48h lead time',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 10 H20" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 5 V3 M16 5 V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: 'F · Something else?',
    title: 'If forty people eat there, we can come.',
    body: 'Coworking spaces, shoots, factories, gated communities, training programs. Send a note — we\'ll come walk the space.',
    meta: 'Reply within 24 hours',
    style: { background: 'var(--bg-2)', borderStyle: 'dashed' } as React.CSSProperties,
    iconStyle: { background: 'var(--paper)' } as React.CSSProperties,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 12 H18 M12 6 V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const HOW_STEPS = [
  {
    n: 'STEP 01',
    title: 'Your community goes live.',
    body: 'Apartment, PG, hostel, office or campus signs up. We put a QR up at the gate and the building joins our route.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 20 V11 L12 5 L20 11 V20 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 20 V14 H14 V20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: 'STEP 02',
    title: 'Residents scan & subscribe.',
    body: 'Pick breakfast, lunch or dinner plans — or order one-off. Choose outlets, swap dishes, set delivery windows. Pause for travel any time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
        <rect x="4" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="13" width="2.5" height="2.5" fill="currentColor" />
        <rect x="17.5" y="13" width="2.5" height="2.5" fill="currentColor" />
        <rect x="13" y="17.5" width="2.5" height="2.5" fill="currentColor" />
        <rect x="17.5" y="17.5" width="2.5" height="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    n: 'STEP 03',
    title: 'Kitchens cook. We orchestrate.',
    body: 'Multiple outlets prep in parallel. We pack each plate to spec, label by floor and flat, no mix-ups.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11 H20 L18 19 Q17.5 21 16 21 H8 Q6.5 21 6 19 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M3 11 H21" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M9 8 Q8 5 9 3 M12 8 Q11 5 12 3 M15 8 Q14 5 15 3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    n: 'STEP 04',
    title: 'One delivery, your floor.',
    body: 'Insulated, sealed, on time. One driver run for the whole community — not a fleet of single-order bikes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 18 L13 8 L17 18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <rect x="10" y="5" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
];

const COMM_CARDS = [
  {
    label: 'Apartment communities',
    body: "A QR at the gate. Morning, lunch and dinner delivery windows. A residents' WhatsApp group we run. Zero fee to the society.",
    foot: 'Min. <b>40 residents</b> · onboarded in 5 days',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 20 V10 L12 4 L20 10 V20 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="9" y="13" width="6" height="7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'PGs & hostels',
    body: 'Replace your one tiffin contract with a curated marketplace for every meal. Better food, predictable schedules, stable monthly price for residents.',
    foot: 'Buyout from <b>existing vendor</b> supported',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10 H10 M14 10 H16 M8 14 H10 M14 14 H16 M8 18 H10 M14 18 H16" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: 'Offices & cafeterias',
    body: 'Breakfast, lunch and dinner allowances for staff. Multi-kitchen variety. Single invoice. Event catering on the same contract.',
    foot: 'From <b>50 employees</b> · billed monthly',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 6 V3 H15 V6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12 H21" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];
