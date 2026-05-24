'use client';

import { FormEvent, useState } from 'react';
import BrushBadge from '@/components/food-brand/BrushBadge';
import IconChip from '@/components/food-brand/IconChip';
import PrimaryButton from '@/components/food-brand/PrimaryButton';
import SectionDivider from '@/components/food-brand/SectionDivider';
import { CurvedArrow } from '@/components/food-brand/icons';
import {
  HOW_IT_WORKS,
  HOTELS_FAQS,
  HOTELS_SOLUTION_GROUPS,
  HOTELS_STATS,
  PROPERTY_TYPES,
  WHO_ITS_FOR,
} from '@/lib/hotels-data';
import FAQItem from './FAQItem';
import HotelsTrustRow from './HotelsTrustRow';
import OtaLogoWall from './OtaLogoWall';
import SolutionCard from './SolutionCard';
import TasteIQHotelsLogo from './TasteIQHotelsLogo';
import { solutionIcon } from './solution-icons';
import './hotels.css';

export default function HotelsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onDemoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setFormStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const propertyName = String(data.get('propertyName') ?? '').trim();
    const contact = String(data.get('contact') ?? '').trim();
    const propertyType = String(data.get('propertyType') ?? '');

    if (!name || name.length < 2) {
      setFormError('Please enter your name.');
      setFormStatus('idle');
      return;
    }
    if (!propertyName) {
      setFormError('Please enter your property name.');
      setFormStatus('idle');
      return;
    }
    if (!contact || contact.length < 8) {
      setFormError('Please enter a valid phone number or email.');
      setFormStatus('idle');
      return;
    }

    const message = String(data.get('message') ?? '').trim();
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentTime = new Date().toLocaleTimeString('en-IN');

    let whatsappBody = `*HOTELS DEMO REQUEST*\n\n`;
    whatsappBody += `Date: ${currentDate}\n`;
    whatsappBody += `Time: ${currentTime}\n\n`;
    whatsappBody += `*Contact:*\n`;
    whatsappBody += `Name: ${name}\n`;
    whatsappBody += `Property: ${propertyName}\n`;
    whatsappBody += `Contact: ${contact}\n`;
    whatsappBody += `Type: ${propertyType || 'hotel'}\n`;
    if (message) {
      whatsappBody += `Message: ${message}\n`;
    }
    whatsappBody += `\nHi TasteIQ team! I'd like to book a hotels demo. Please reach out at a convenient time.`;

    const whatsappURL = `https://wa.me/916207466460?text=${encodeURIComponent(whatsappBody)}`;
    window.open(whatsappURL, '_blank');
    setFormStatus('success');
    form.reset();
  };

  return (
    <div className="food-brand-site hotels-site">
      <header className="fb-wrap" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <TasteIQHotelsLogo />
      </header>

      <section className="fb-hero" aria-labelledby="hotels-hero-heading">
        <div className="fb-wrap fb-hero-grid">
          <div>
            <BrushBadge>ALL-IN-ONE HOSPITALITY OS</BrushBadge>
            <h1 id="hotels-hero-heading" className="fb-headline" style={{ marginTop: 20 }}>
              every booking. every outlet.
              <br />
              one platform<span className="ht-headline-period" />
            </h1>
            <p className="ht-lead">
              TasteIQ Hotels is <strong>hotel management software</strong> for hotels, resorts and beach
              properties — <strong>property management system (PMS)</strong>,{' '}
              <strong>hotel channel manager</strong> with <strong>OTA integration</strong>, in-hotel{' '}
              <strong>F&amp;B</strong>, KYC, billing and reports in one system.
            </p>
            <div className="ht-cta-row">
              <a href="#demo" className="fb-btn-primary" onClick={scrollTo('demo')}>
                <span>BOOK A DEMO</span>
                <span aria-hidden="true" style={{ fontSize: '1.1em' }}>
                  ›
                </span>
              </a>
              <a href="#solutions" className="ht-link-solutions" onClick={scrollTo('solutions')}>
                SEE SOLUTIONS ›
              </a>
            </div>
            <p className="ht-reassure">
              No lock-in. <span className="fb-accent-text" style={{ color: 'var(--fb-accent)' }}>Cancel anytime.</span>
            </p>
          </div>
          <div className="fb-hero-visual">
            <CurvedArrow className="fb-curved-arrow fb-curved-arrow--tl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hotels/hotels-hero.svg"
              alt="Illustration of a hotel property with connected booking channels on TasteIQ Hotels platform"
              className="ht-hero-img"
              width={480}
              height={360}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <div className="fb-wrap ht-who-strip" aria-label="Property types">
        {WHO_ITS_FOR.map((label, i) => (
          <span key={label} style={{ display: 'contents' }}>
            {i > 0 && <span className="ht-who-sep" aria-hidden="true">
              ·
            </span>}
            <span className="ht-who-chip">{label}</span>
          </span>
        ))}
      </div>

      <section
        id="channel-manager"
        className="ht-section ht-section--channel"
        aria-labelledby="channel-heading"
      >
        <div className="fb-wrap">
          <p className="fb-label">Distribution</p>
          <h2 id="channel-heading" className="fb-headline" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
            hotel channel manager — sell on every top OTA, never overbook.
          </h2>
          <p className="ht-lead">
            Real-time two-way sync: update rates and availability once in your{' '}
            <strong>property management system</strong> and every OTA reflects it in seconds. Rate
            parity enforcement, <strong>prevent overbooking</strong>, a single dashboard and an
            integrated <strong>booking engine</strong> for direct sales.
          </p>
          <ul className="ht-feature-list">
            <li>Hotel channel manager with OTA integration across global and India OTAs</li>
            <li>Channel manager India — MakeMyTrip, Goibibo, Agoda and 100+ more</li>
            <li>GDS reach: Amadeus, Sabre, Galileo</li>
            <li>Metasearch: Google Hotel Ads, Trivago, TripAdvisor</li>
          </ul>
          <div className="ht-payments-note">
            <strong>India-first direct bookings:</strong> UPI, Razorpay, PayU, Paytm, cards and net
            banking on your own site — commission-free when guests book direct.
          </div>
          <OtaLogoWall />
        </div>
      </section>

      <section id="solutions" className="ht-section" aria-labelledby="solutions-heading">
        <div className="fb-wrap">
          <p className="fb-label">Solutions</p>
          <h2 id="solutions-heading" className="fb-headline" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
            along the property &amp; event lifecycle.
          </h2>
          <p className="ht-lead">
            Rooms, channel distribution and in-hotel <strong>F&amp;B</strong> —{' '}
            <strong>resort management software</strong> modules that share one guest folio and one
            operations dashboard.
          </p>

          {HOTELS_SOLUTION_GROUPS.map((group) => (
            <div key={group.id} className="ht-solution-group">
              <h3 className="fb-label" style={{ color: 'var(--fb-ink)', fontSize: 12 }}>
                {group.label}
              </h3>
              <div className="ht-solutions-grid">
                {group.items.map((item) => (
                  <SolutionCard key={item.id} item={item} icon={solutionIcon(item.iconKey)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="ht-section" aria-labelledby="how-heading">
        <div className="fb-wrap">
          <p className="fb-label">How it works</p>
          <h2 id="how-heading" className="fb-headline" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)' }}>
            inquiry to invoice in four steps.
          </h2>
          <div className="fb-steps">
            {HOW_IT_WORKS.map((step, index) => (
              <div key={step.step} style={{ display: 'contents' }}>
                {index > 0 && <SectionDivider />}
                <article className="fb-step">
                  <IconChip label={`Step ${step.step}`}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{step.step}</span>
                  </IconChip>
                  <div>
                    <p className="fb-label" style={{ color: 'var(--fb-ink)', marginBottom: 4 }}>
                      {step.title}
                    </p>
                    <p>{step.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fb-dark-panel ht-stats-band" aria-labelledby="stats-heading">
        <div className="fb-wrap">
          <h2 id="stats-heading" className="sr-only">
            Platform metrics
          </h2>
          <div className="ht-stats-grid">
            {HOTELS_STATS.map((stat) => (
              <div key={stat.id} className="ht-stat-block">
                <div className="ht-stat-value">{stat.value}</div>
                <div className="ht-stat-label">{stat.label}</div>
                {stat.placeholder && (
                  <span className="ht-stat-placeholder">placeholder metric</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="ht-section" aria-labelledby="faq-heading">
        <div className="fb-wrap">
          <p className="fb-label">FAQ</p>
          <h2 id="faq-heading" className="fb-headline" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)' }}>
            hospitality software, answered.
          </h2>
          <div className="ht-faq-list">
            {HOTELS_FAQS.map((faq, i) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="fb-dark-panel" aria-labelledby="demo-heading">
        <div className="fb-wrap">
          <HotelsTrustRow />
          <div className="ht-demo-grid">
            <div>
              <h2 id="demo-heading" className="ht-serif-cta">
                Run every booking like it&apos;s your only one.
              </h2>
              <p style={{ color: 'rgba(244,238,228,0.72)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                Book a walkthrough of PMS, channel manager, banquet BEOs and billing — tailored to
                your property type.
              </p>
              <div className="ht-cta-row" style={{ marginTop: 20 }}>
                <a href="#demo-form" className="fb-btn-primary" onClick={scrollTo('demo-form')}>
                  <span>BOOK A DEMO</span>
                  <span aria-hidden="true" style={{ fontSize: '1.1em' }}>
                    ›
                  </span>
                </a>
              </div>
            </div>

            <div id="demo-form">
              {formStatus === 'success' ? (
                <div className="ht-form-success" role="status">
                  Thanks — we&apos;ll reach out shortly to schedule your demo.
                </div>
              ) : (
                <form className="ht-demo-form" onSubmit={onDemoSubmit} noValidate>
                  {formError && (
                    <p className="fb-form-error" role="alert">
                      {formError}
                    </p>
                  )}
                  <div className="fb-field">
                    <label htmlFor="demo-name">Your name</label>
                    <input id="demo-name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="fb-field">
                    <label htmlFor="demo-property">Property name</label>
                    <input id="demo-property" name="propertyName" type="text" required />
                  </div>
                  <div className="fb-field">
                    <label htmlFor="demo-contact">Phone or email</label>
                    <input
                      id="demo-contact"
                      name="contact"
                      type="text"
                      autoComplete="tel email"
                      required
                    />
                  </div>
                  <div className="fb-field">
                    <label htmlFor="demo-type">Property type</label>
                    <select id="demo-type" name="propertyType" defaultValue="hotel" required>
                      {PROPERTY_TYPES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="fb-field">
                    <label htmlFor="demo-message">Message (optional)</label>
                    <textarea id="demo-message" name="message" rows={3} />
                  </div>
                  <PrimaryButton type="submit" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'SENDING…' : 'REQUEST DEMO ›'}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
          <p className="fb-footnote">
            © {new Date().getFullYear()} TasteIQ · Hotel management software · PMS · channel manager ·
            events
          </p>
        </div>
      </section>
    </div>
  );
}
