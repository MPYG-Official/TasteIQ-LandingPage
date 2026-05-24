'use client';

import { useState } from 'react';
import { generateFAQStructuredData } from '@/lib/seo';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

const faqs = [
  {
    question: 'How exactly does the "free until my current subscription ends" offer work?',
    answer:
      "Simply show us your current subscription invoice, and we'll let you use TasteIQ completely free until that subscription period ends. You can use both systems in parallel, ensuring a risk-free transition. When your current subscription ends, switch fully to TasteIQ and enjoy a 15% lower price than what you were paying.",
  },
  {
    question: 'Is the 15-minute setup really possible? What\'s involved?',
    answer:
      "Yes! Our AI-powered system does the heavy lifting. Just upload photos of your existing menu, and our system automatically extracts all items, prices, and categories. Add basic restaurant information, and you're ready to start billing. We've designed the entire process to be completed in 15 minutes or less. For complex menus, our team can assist with any final adjustments.",
  },
  {
    question: 'Do I need to buy any special hardware to use TasteIQ?',
    answer:
      'No special hardware required! TasteIQ works on any existing tablet, smartphone, or computer. You can use your current devices and printers. Our system is cloud-based and works seamlessly across Android, iOS, Windows, and Mac devices. This saves you thousands in upfront hardware costs.',
  },
  {
    question: 'Are there any hidden charges or add-on fees with TasteIQ?',
    answer:
      'Absolutely not. Unlike other systems that charge extra for inventory management, online ordering, or multiple outlets, TasteIQ includes everything in one transparent subscription. There are no setup fees, no hidden charges, and no sudden price increases. What you see is what you pay - 15% less than your current provider.',
  },
];

export default function FAQ() {
  const t = useLandingTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const structuredData = generateFAQStructuredData(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section className={t.sectionMuted}>
        <div className="container mx-auto px-4">
          <h2 className={`${t.heading} text-center mb-12`}>
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${t.card} overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className={`font-semibold pr-4 ${t.bodyTitle}`}>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 ${t.accentText} transition-transform flex-shrink-0 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className={`px-6 pb-4 ${t.subtext}`}>{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

