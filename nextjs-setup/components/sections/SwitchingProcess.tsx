'use client';

import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function SwitchingProcess() {
  const t = useLandingTheme();
  const steps = [
    {
      number: 1,
      title: 'Book a Demo',
      description:
        'Schedule a 15-minute demo call with our restaurant specialist to see TasteIQ in action',
    },
    {
      number: 2,
      title: 'Quick Setup',
      description: 'Upload your menu and complete the 15-minute setup with our guidance',
    },
    {
      number: 3,
      title: 'Parallel Testing',
      description:
        "Use TasteIQ alongside your current system at no cost until you're comfortable",
    },
    {
      number: 4,
      title: 'Full Transition',
      description:
        'When ready, complete the switch and enjoy 15% lower pricing than your previous provider',
    },
  ];

  return (
    <section className={t.section}>
      <div className="container mx-auto px-4">
        <h2 className={`${t.heading} text-center mb-12`}>
          Seamless Switching Process
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className={`${t.card} p-6 md:p-8`}>
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative pl-20">
                  <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                    {step.number}
                  </div>
                  <h5 className="text-xl font-semibold mb-2">{step.title}</h5>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-600">
              Our dedicated migration team will be with you every step of the way to ensure a
              smooth transition
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

