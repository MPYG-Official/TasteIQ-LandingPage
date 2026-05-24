'use client';

import Link from 'next/link';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function Footer() {
  const t = useLandingTheme();
  const currentYear = new Date().getFullYear();

  const footerClass = t.isPrototype
    ? 'bg-[#0e1116] text-[#faf8f4] py-12'
    : 'bg-gray-900 text-white py-12';

  const mutedClass = t.isPrototype ? 'text-[rgba(250,248,244,0.65)]' : 'text-gray-400';

  return (
    <footer className={footerClass}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className={`text-xl mb-4 ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}>
              TasteIQ
            </h5>
            <p className={mutedClass}>
              The intelligent operating system for modern food businesses. Built by IIT & IIM
              founders who understand restaurants.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className={`space-y-2 ${mutedClass}`}>
              <li>
                <a href="#quickstart" className="hover:text-white transition-colors">
                  15-Min Setup
                </a>
              </li>
              <li>
                <a href="#switch" className="hover:text-white transition-colors">
                  Why Switch
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Risk-Free Pricing
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link href="/vision" className="hover:text-white transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="/fnb" className="hover:text-white transition-colors">
                  F&amp;B
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Join Us / Hiring
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p className={mutedClass}>
              Email: founders@tasteiq.com
              <br />
              Phone: +91 6207466460
              <br />
              Address: Bangalore, India
            </p>
          </div>
        </div>
        <hr className={t.isPrototype ? 'border-[rgba(255,255,255,0.12)] mb-6' : 'border-gray-700 mb-6'} />
        <div className={`text-center ${mutedClass}`}>
          <p>&copy; {currentYear} TasteIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
