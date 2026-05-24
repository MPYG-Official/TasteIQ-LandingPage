'use client';

import Link from 'next/link';
import { trackButtonClick } from '@/lib/analytics';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

const testimonials = [
  {
    quote:
      "We were hesitant to switch systems after using our old POS for 5 years. TasteIQ's 15-minute setup and zero-risk trial convinced us. Now we're saving ₹12,000 monthly and managing operations much more efficiently.",
    author: 'Priya Patel',
    location: 'Mumbai, India',
  },
  {
    quote:
      "The best thing about TasteIQ is having everything in one place. Before, we were juggling 3 different systems. Now it's all integrated, our staff learned it in one hour, and we're seeing 18% more direct orders through our branded website.",
    author: 'Vikram Singh',
    location: 'Delhi, India',
  },
  {
    quote:
      "As a small café owner, I couldn't afford multiple expensive systems. TasteIQ's all-in-one solution at an affordable price was perfect. Setup was ridiculously fast—we uploaded our menu photo and were billing customers within 20 minutes!",
    author: 'Aisha Khan',
    location: 'Bangalore, India',
  },
  {
    quote:
      "TasteIQ's AI receptionist handles our phone queue during the dinner rush. We cut front-desk labor costs by nearly 30%, run smoothly with a leaner team, and still capture every order—guests get the same service with far less staffing stress.",
    author: 'James Mitchell',
    location: 'Toronto, Canada',
  },
  {
    quote:
      "The AI receptionist answers calls, takes orders, and escalates edge cases while we're short on floor staff. Lunch and dinner stay efficient with minimal counter coverage—we've lowered labor spend without sacrificing speed or accuracy.",
    author: 'Sarah Chen',
    location: 'Austin, USA',
  },
  {
    quote:
      "Across our Manchester sites, TasteIQ unified web, takeaway, and kitchen tickets in one place. Reporting is clearer, hand-offs are faster, and managers finally have one view of the day—not five different apps.",
    author: 'David Okonkwo',
    location: 'Manchester, UK',
  },
  {
    quote:
      "Direct orders, aggregator sync, and kitchen visibility in one system transformed our Dubai outlet. Peak-hour operations are calmer, and the team spends less time reconciling channels and more time serving guests.",
    author: 'Fatima Al-Rashid',
    location: 'Dubai, UAE',
  },
];

export default function Testimonials() {
  const t = useLandingTheme();

  return (
    <section id="testimonials" className={t.sectionMuted}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-4`}>
          Restaurant Owners Who Made The Switch
        </h2>
        <p className={`text-center text-lg mb-12 max-w-2xl mx-auto ${t.subtext}`}>
          From India to North America, the UK, and the UAE—operators running lean teams and
          multi-channel service.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={`${testimonial.author}-${testimonial.location}`}
              className={`${t.card} p-6 relative border-l-4 ${t.isPrototype ? 'border-[#c24a2a]' : 'border-brand-primary'}`}
            >
              <div className={`absolute top-4 left-4 text-6xl font-serif ${t.quoteMark}`}>
                &ldquo;
              </div>
              <p className={`${t.bodyText} mb-4 relative z-10 mt-4 text-sm leading-relaxed`}>
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-2">
                <div>
                  <h5 className={`font-semibold ${t.bodyTitle}`}>{testimonial.author}</h5>
                  <p className={`text-sm ${t.bodyMuted}`}>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${t.ctaBox} p-8 max-w-5xl mx-auto`}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                className={`text-2xl mb-2 ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}
              >
                Join 500+ Restaurant Owners Who Switched to TasteIQ
              </h3>
              <p className={t.isPrototype ? 'text-[rgba(250,248,244,0.85)]' : undefined}>
                Experience the difference risk-free. Use TasteIQ alongside your current system at
                zero cost until your subscription ends.
              </p>
            </div>
            <div className="text-center md:text-right">
              <Link
                href="#contact"
                className={`${t.isPrototype ? 'bg-[#faf8f4] text-[#0e1116] hover:bg-white' : 'bg-white text-brand-primary hover:bg-gray-100'} px-8 py-3 rounded-lg font-semibold transition-all inline-block`}
                onClick={() => trackButtonClick('get_started_cta', 'testimonials_section')}
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
