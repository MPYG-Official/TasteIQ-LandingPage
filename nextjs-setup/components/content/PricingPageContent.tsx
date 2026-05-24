'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackButtonClick, trackPricingView } from '@/lib/analytics';
import ContentPageHeader from './ContentPageHeader';

const PLANS = [
  {
    name: 'TasteIQ Lite',
    priceINR: '₹6,000',
    priceUSD: '$72',
    period: '/year',
    features: [
      'Basic restaurant analytics',
      'Menu management tools',
      'Up to 1000 orders/month',
    ],
    popular: false,
  },
  {
    name: 'TasteIQ Pro',
    priceINR: '₹12,000',
    priceUSD: '$144',
    period: '/year',
    features: [
      'Advanced analytics dashboard',
      'Inventory management',
      'Up to 5000 orders/month',
    ],
    popular: true,
  },
  {
    name: 'TasteIQ Elite',
    priceINR: '₹24,000',
    priceUSD: '$288',
    period: '/year',
    features: [
      'Enterprise-grade analytics',
      'Dedicated account manager',
      'Unlimited orders',
    ],
    popular: false,
  },
];

export default function PricingPageContent() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  useEffect(() => {
    trackPricingView();
  }, []);

  return (
    <main className="mkt-page">
      <section className="mkt-sec wrap">
        <ContentPageHeader
          eye="Pricing"
          title={
            <>
              simple plans. <em>zero surprise fees.</em>
            </>
          }
          subtitle="Choose the tier that fits your outlet. Billed annually — secure payments via PhonePe."
        />

        <div className="pricing-toggle" role="group" aria-label="Currency">
          <span className={currency === 'INR' ? 'on' : ''}>INR</span>
          <button
            type="button"
            className="pricing-toggle-btn"
            aria-pressed={currency === 'USD'}
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
          >
            <span className={`pricing-toggle-knob${currency === 'USD' ? ' usd' : ''}`} />
          </button>
          <span className={currency === 'USD' ? 'on' : ''}>USD</span>
        </div>

        <div className="pricing-grid pricing-grid-spaced">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card${plan.popular ? ' pricing-card--popular' : ''}`}
            >
              {plan.popular ? <span className="pricing-badge">Popular</span> : null}
              <h2>{plan.name}</h2>
              <div className="pricing-price">
                <strong>{currency === 'INR' ? plan.priceINR : plan.priceUSD}</strong>
                <span>{plan.period}</span>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="btn btn-primary"
                onClick={() =>
                  trackButtonClick(`contact_${plan.name.toLowerCase().replace(/\s+/g, '_')}`, 'pricing_page')
                }
              >
                Contact now
              </Link>
            </div>
          ))}
        </div>

        <p className="mkt-note">
          All prices are billed annually. Secure payments processed through PhonePe Payment Gateway.
        </p>
      </section>
    </main>
  );
}
