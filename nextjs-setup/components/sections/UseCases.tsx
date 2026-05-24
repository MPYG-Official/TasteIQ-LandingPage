'use client';

import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function UseCases() {
  const t = useLandingTheme();
  const useCases = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Cafés & Bakeries',
      description: 'Streamline quick-service operations and manage fresh inventory with ease.',
      gradient: 'from-amber-100 to-orange-100',
      color: 'text-amber-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Full-Service Restaurants',
      description: 'Enhance tableside service and manage complex menus efficiently.',
      gradient: 'from-red-100 to-pink-100',
      color: 'text-red-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Cloud Kitchens',
      description: 'Optimize delivery operations and manage multiple brands seamlessly.',
      gradient: 'from-blue-100 to-cyan-100',
      color: 'text-blue-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Restaurant Chains',
      description: 'Manage multiple outlets with centralized control and consistent experience.',
      gradient: 'from-purple-100 to-indigo-100',
      color: 'text-brand-primary',
    },
  ];

  return (
    <section id="usecases" className={t.section}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-4`}>
          TasteIQ: Perfect for Every Food Business
        </h2>
        <p className={`text-center text-lg mb-12 max-w-2xl mx-auto ${t.subtext}`}>
          From small cafés to large restaurant chains, TasteIQ adapts to your business needs.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={t.useCaseCard}
            >
              <div className="flex justify-center mb-6">
                <div className={t.useCaseIcon(useCase.gradient, useCase.color)}>
                  {useCase.icon}
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${t.bodyTitle}`}>{useCase.title}</h3>
              <p className={t.subtext}>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
