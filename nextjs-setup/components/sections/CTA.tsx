'use client';

import Link from 'next/link';
import { trackButtonClick } from '@/lib/analytics';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function CTA() {
  const t = useLandingTheme();

  return (
    <section className={`${t.sectionDark} cta-section`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`${t.isPrototype ? t.headingOnDark : t.heading} mb-4`}>
          Stop Overpaying for Restaurant Management Software
        </h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${t.subtextOnDark}`}>
          Join hundreds of restaurant owners who&apos;ve switched to TasteIQ and are saving time,
          money, and stress every day.
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <div
            className={`${t.isPrototype ? 'bg-white text-[#0e1116] border border-[rgba(14,17,22,0.08)] shadow-lg' : t.card} p-6 md:p-8`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`text-5xl ${t.isPrototype ? 'font-display font-normal' : 'font-bold'} ${t.accentText}`}>
                15%
              </div>
              <div className="text-left">
                <h5
                  className={`text-xl mb-2 ${t.isPrototype ? 'font-display font-normal text-[#0e1116]' : 'font-bold text-gray-900'}`}
                >
                  GUARANTEED SAVINGS
                </h5>
                <p className={t.subtext}>
                  Less than what you&apos;re currently paying, with more features included
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:+916207466460"
            className={t.primaryBtnOnDark}
            onClick={() => trackButtonClick('call_now', 'cta_section')}
          >
            Call Now: +91 6207466460
          </a>
          <Link
            href="#contact"
            className={t.secondaryBtnOnDark}
            onClick={() => trackButtonClick('book_demo_cta', 'cta_section')}
          >
            Book Your Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
