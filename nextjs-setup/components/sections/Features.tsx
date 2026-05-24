'use client';

import Link from 'next/link';
import { trackButtonClick } from '@/lib/analytics';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function Features() {
  const t = useLandingTheme();
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Multi-Outlet Dashboard',
      items: [
        'Manage all outlets from a single intelligent dashboard',
        'Add new outlets in minutes as you scale',
        'Access outlet-level reports and insights for smarter decisions',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning-Fast Billing & KOT',
      items: [
        '3-click bill generation and Kitchen Order Ticket (KOT)',
        'Auto-generation of GST/TAX-compliant invoices',
        'Streamlined workflow between front-of-house and kitchen',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Your Own Branded B2C Website/App',
      items: [
        'Custom-branded dine-in, takeaway, and delivery website and app',
        'Reduce aggregator dependency and commission costs',
        'Build direct relationships with your customers',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Setup & Smart Tools',
      items: [
        'Upload menu image, go live in under 30 minutes',
        'AI detects pricing, categories, and dish details',
        'Auto inventory stacking via receipt uploads',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Conversational Ordering Channels',
      items: [
        'WhatsApp ordering - order directly via chat',
        'AI chatbot for 24/7 automated ordering',
        'AI phone calls - automated voice ordering system',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Inventory & Menu Management',
      items: [
        'Auto inventory deduction after orders',
        'Low stock & expiry alerts via email and dashboard',
        'Centralized menu updates across all outlets',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Counter Cash Management',
      items: [
        'Track all cash payments and expenses',
        'Ensure accountability for every rupee',
        'Prevent revenue leakages and cash mishandling',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: 'Zomato/Swiggy Integration',
      items: [
        'Seamlessly integrate with top food aggregators',
        'Unified order management across all platforms',
        'Real-time sync of orders and inventory',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'API-Based Architecture',
      items: [
        'RESTful API for seamless third-party integrations',
        'Connect with your favorite software and tools',
        'Custom integrations tailored to your workflow',
      ],
    },
  ];

  return (
    <section id="features" className={t.sectionMuted}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-4`}>
          All-In-One Restaurant Management System
        </h2>
        <p className={`text-center text-lg mb-12 ${t.subtext}`}>
          Everything you need to streamline operations and boost revenue. Built for the post-AI world.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${t.card} p-6 hover:shadow-md transition-all`}
            >
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${t.iconBox}`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className={`text-xl mb-4 text-center ${t.isPrototype ? 'font-medium tracking-tight' : 'font-semibold'}`}>
                {feature.title}
              </h3>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <span className={`${t.isPrototype ? 'text-[#c24a2a]' : 'text-brand-primary'} mt-1 flex-shrink-0`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className={t.subtext}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className={`${t.primaryBtn} inline-block`}
            onClick={() => trackButtonClick('schedule_demo', 'features_section')}
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
