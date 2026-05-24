'use client';

import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function WhySwitch() {
  const t = useLandingTheme();
  const switchReasons = [
    {
      icon: '💰',
      title: 'Cost Savings Guarantee',
      description:
        'Use your current system FREE until your subscription ends, then pay 15% LESS than your current provider.',
    },
    {
      icon: '⚡',
      title: 'All-In-One Solution',
      description:
        'Stop paying for multiple systems. TasteIQ includes ALL features in one subscription – no hidden add-ons.',
    },
    {
      icon: '📈',
      title: 'Boost Your Revenue',
      description:
        'Restaurants using TasteIQ report average 22% increase in direct orders, reducing aggregator commissions.',
    },
    {
      icon: '⏰',
      title: 'Save 20+ Hours/Week',
      description:
        'Automated inventory, billing and reporting save managers significant time on manual tasks.',
    },
  ];

  const comparisonData = [
    { feature: 'Technology Stack', current: 'Legacy, Pre-AI Era', tasteiq: 'Post-AI, Future-Ready' },
    { feature: 'Ordering Channels', current: 'Limited (Menu-based)', tasteiq: 'WhatsApp, Chatbot, Phone, AI Calls, Table QR Code' },
    { feature: 'Interface Type', current: 'Rigid, Menu-Driven', tasteiq: 'Conversational, Natural Language' },
    { feature: 'Setup Time', current: 'Days or Weeks', tasteiq: '15 Minutes' },
    { feature: 'Separate Inventory System', current: 'Extra Fee', tasteiq: 'Included' },
    { feature: 'Own Ordering Website', current: 'Extra Fee', tasteiq: 'Included' },
    { feature: 'Multi-Outlet Management', current: 'Complex & Expensive', tasteiq: 'Simple & Included' },
    { feature: 'Customer Support', current: 'Limited Hours', tasteiq: '24×7 Support' },
    { feature: 'Hidden Charges', current: 'Yes', tasteiq: 'None' },
  ];

  return (
    <section id="switch" className={t.sectionMuted}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-4`}>
          Why Restaurant Owners Are Switching to TasteIQ
        </h2>
        <p className={`text-center text-lg mb-12 max-w-2xl mx-auto ${t.subtext}`}>
          Built for the post-AI world. Redefining how restaurants interact with customers through conversational interfaces.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {switchReasons.map((reason, index) => (
            <div
              key={index}
              className={`${t.card} border-l-4 p-6 ${t.isPrototype ? 'border-l-[#c24a2a]' : 'border-l-brand-primary'}`}
            >
              <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2 ${t.bodyTitle}`}>
                <span className="text-2xl">{reason.icon}</span>
                {reason.title}
              </h3>
              <p className={t.subtext}>{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className={`${t.card} p-6 md:p-8`}>
          <h3 className={`text-2xl text-center mb-6 ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}>
            TasteIQ vs. Your Current System
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Your Current System</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">TasteIQ</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-3">{row.feature}</td>
                    <td className="border border-gray-300 px-4 py-3">{row.current}</td>
                    <td className={`border border-gray-300 px-4 py-3 font-semibold ${t.accentText}`}>
                      {row.tasteiq}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

