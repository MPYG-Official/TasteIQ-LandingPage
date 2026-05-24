'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function QuickStart() {
  const t = useLandingTheme();

  return (
    <section id="quickstart" className={t.section}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`${t.heading} mb-4`}>Setup Your Restaurant in Just 15 Minutes</h2>
            <p className={`text-lg mb-8 ${t.subtext}`}>
              No lengthy onboarding. No complicated training. Get your entire restaurant system
              running in minutes, not weeks.
            </p>

            {/* Step 1 */}
            <div className="relative pl-20 mb-8">
              <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                1
              </div>
              <h3 className={`text-xl mb-2 ${t.isPrototype ? 'font-medium' : 'font-semibold'}`}>
                <Link href="#contact" className={`${t.link} underline`}>
                  Contact Us
                </Link>
              </h3>
              <p className="text-gray-600">
                Reach out to our team to get started. We'll guide you through the entire process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-20 mb-8">
              <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                2
              </div>
              <h3 className={`text-xl mb-2 ${t.isPrototype ? 'font-medium' : 'font-semibold'}`}>Get Personalised Onboarding</h3>
              <p className="text-gray-600">
                Our team will provide you with a customized onboarding experience tailored to your restaurant's needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative pl-20 mb-8">
              <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                3
              </div>
              <h3 className={`text-xl mb-2 ${t.isPrototype ? 'font-medium' : 'font-semibold'}`}>Receive Login Details to Mail</h3>
              <p className="text-gray-600">
                You'll receive your login credentials via email, giving you instant access to your TasteIQ dashboard.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-20 mb-8">
              <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                4
              </div>
              <h3 className={`text-xl mb-2 ${t.isPrototype ? 'font-medium' : 'font-semibold'}`}>Login and Upload Your Current Physical Menu Details</h3>
              <p className="text-gray-600">
                Simply log in and upload your existing menu. Our AI will instantly extract all items, prices, and categories from your physical menu.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative pl-20 mb-8">
              <div className={`absolute left-0 top-0 w-16 h-16 text-white rounded-3xl flex items-center justify-center text-xl font-semibold ${t.isPrototype ? 'bg-[#c24a2a]' : 'bg-brand-primary'}`}>
                5
              </div>
              <h3 className={`text-xl mb-2 ${t.isPrototype ? 'font-medium' : 'font-semibold'}`}>Go Live</h3>
              <p className="text-gray-600">
                Start using TasteIQ immediately! If required, get training (although it's very intuitive and easy to operate).
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <span className={`${t.tagHighlight} px-3 py-1 rounded-full text-sm font-semibold`}>
                Get Onboarding Specialist
              </span>
              <p className="text-gray-600">Get personalized handholding during setup</p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-xl p-6">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Indian restaurant team setup"
                width={600}
                height={400}
                className="rounded-lg mb-6 w-full h-auto"
              />
              <div className="grid grid-cols-3 text-center">
                <div>
                  <h3 className={`text-3xl font-bold ${t.accentText}`}>15</h3>
                  <p className="text-sm text-gray-600">Minutes to Setup</p>
                </div>
                <div>
                  <h3 className={`text-3xl font-bold ${t.accentText}`}>1</h3>
                  <p className="text-sm text-gray-600">Hour Staff Training</p>
                </div>
                <div>
                  <h3 className={`text-3xl font-bold ${t.accentText}`}>0</h3>
                  <p className="text-sm text-gray-600">Special Hardware</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

