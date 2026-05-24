'use client';

import Link from 'next/link';
import { trackButtonClick, trackPricingView } from '@/lib/analytics';
import { useEffect } from 'react';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function Pricing() {
  const t = useLandingTheme();

  useEffect(() => {
    trackPricingView();
  }, []);

  const guaranteeFeatures = [
    'Use 100% FREE alongside your current system',
    'Full access to ALL features',
    '24×7 setup & support assistance',
    'After trial, pay 15% LESS than current provider',
    'Cancel anytime with no questions asked',
    'No long-term contract required',
  ];

  return (
    <section id="pricing" className={t.section}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-2`}>
          Switch with ZERO Risk, ZERO Upfront Cost
        </h2>
        <p className={`text-center text-lg mb-12 ${t.subtext}`}>
          Our unique pricing model makes switching completely risk-free
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Guarantee Plan Card */}
          <div className={`relative ${t.card} p-8 border-2 ${t.isPrototype ? 'border-[#c24a2a]' : 'border-brand-primary'}`}>
            <div className={`absolute top-6 right-6 px-6 py-1 text-sm font-semibold transform rotate-12 ${t.isPrototype ? 'bg-[#c24a2a] text-white' : 'bg-pink-500 text-white'}`}>
              BEST VALUE
            </div>
            <h3 className={`text-2xl mb-4 ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}>
              TasteIQ Guarantee Plan
            </h3>
            <div className="mb-4">
              <span className={`text-4xl font-bold ${t.accentText}`}>₹0</span>
              <p className={`${t.subtext} text-sm`}>Until your current subscription ends</p>
            </div>
            <hr className="my-6" />
            <ul className="space-y-3 mb-6">
              {guaranteeFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className={`${t.check} mt-1`}>✓</span>
                  <span className={t.isPrototype ? 'text-[#20242c]' : 'text-gray-700'}>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              className={`block w-full text-center py-3 font-semibold transition-all ${t.primaryBtn}`}
              onClick={() => trackButtonClick('switch_risk_free', 'pricing_section')}
            >
              Switch Risk-Free Today
            </Link>
            <p className="text-xs text-gray-500 mt-2 text-center">
              * Just show us your current provider's invoice
            </p>
          </div>

          {/* Testimonial Box */}
          <div className={`${t.isPrototype ? 'bg-[#f3f0e8] border border-[rgba(14,17,22,0.08)]' : 'bg-gray-50'} rounded-lg p-6`}>
            <h3 className={`text-xl mb-4 ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}>
              What Our Customers Say About Pricing:
            </h3>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-gray-700 italic mb-4">
                "I was paying separately for POS, inventory, and an ordering website. TasteIQ gives
                me all these for LESS than what I paid just for POS before."
              </p>
              <div className="flex items-center gap-2">
                <strong className="text-gray-900">Rahul Sharma</strong>
                <span className="text-gray-500">Owner, Spice Garden</span>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">TasteIQ Transparent Pricing:</p>
              <p className="text-gray-600 mb-2">After your current subscription ends, choose from:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 mb-4">
                <li>Basic: 15% less than your current provider</li>
                <li>Premium: At par with your current provider</li>
                <li>Enterprise: Custom pricing for 5+ outlets</li>
              </ul>
              <p className={`${t.accentText} font-semibold`}>
                No setup fees. No hidden charges. No long-term contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

