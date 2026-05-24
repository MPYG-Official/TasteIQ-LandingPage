'use client';

import Link from 'next/link';
import { trackButtonClick } from '@/lib/analytics';
import VisionHeroArt from '@/components/theme/VisionHeroArt';
import { useLandingTheme } from '@/components/theme/useLandingTheme';
import HeroOfferCountdown from '@/components/sections/HeroOfferCountdown';

export default function Hero() {
  const t = useLandingTheme();

  if (t.isPrototype) {
    return (
      <section id="hero" className={t.hero}>
        <VisionHeroArt />
        <div className="home-hero-inner">
          <div className={`inline-block px-4 py-1 rounded-full text-sm mb-4 ${t.badge}`}>
            Beyond Legacy POS — Built for the AI Era
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 lp-accent">
            POS Built for the <em>Post-AI</em> World
          </h1>

          <p className={`text-lg md:text-xl mb-6 max-w-2xl mx-auto ${t.subtext}`}>
            Redefining restaurant technology with conversational interfaces. Customers order via
            WhatsApp, AI chatbot, phone calls, and more—all seamlessly integrated.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <HeroOfferCountdown
              isPrototype
              wrapperClassName={`rounded-xl p-4 inline-block lp-countdown ${t.card}`}
              subtextClassName={t.subtext}
              unitClassName="lp-countdown-unit px-4 py-2 rounded-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className={t.primaryBtn + ' flex items-center justify-center gap-2'}
              onClick={() => trackButtonClick('book_demo_hero', 'hero_section')}
            >
              Book 15-Min Demo
            </Link>
            <Link
              href="#pricing"
              className={t.secondaryBtnOnLight}
              onClick={() => trackButtonClick('see_guarantee', 'hero_section')}
            >
              See Our Guarantee
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 bg-pink-500 text-white">
          🚀 Beyond Legacy POS - Built for the AI Era
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-bold">
          POS Built for the Post-AI World
        </h1>

        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Redefining restaurant technology with conversational interfaces. Customers order via
          WhatsApp, AI chatbot, phone calls, and more—all seamlessly integrated. The future of
          dining, today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <HeroOfferCountdown
            isPrototype={false}
            wrapperClassName="rounded-lg p-4 inline-block bg-black/80"
            subtextClassName="text-white/90"
            unitClassName="bg-brand-primary text-white px-4 py-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="bg-brand-primary hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
            onClick={() => trackButtonClick('book_demo_hero', 'hero_section')}
          >
            Book 15-Min Demo
          </Link>
          <Link
            href="#pricing"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-white/30"
            onClick={() => trackButtonClick('see_guarantee', 'hero_section')}
          >
            See Our Guarantee
          </Link>
        </div>
      </div>
    </section>
  );
}
