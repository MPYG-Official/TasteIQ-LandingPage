'use client';

import { useState } from 'react';
import { trackDemoBooking, trackButtonClick } from '@/lib/analytics';
import { useLandingTheme } from '@/components/theme/useLandingTheme';

export default function ContactForm() {
  const t = useLandingTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Please enter a valid name';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.city || formData.city.length < 2) {
      newErrors.city = 'Please enter your city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createWhatsAppMessage = () => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentTime = new Date().toLocaleTimeString('en-IN');
    const formattedPhone = `+91-${formData.phone}`;

    let message = `*NEW DEMO BOOKING REQUEST*\n\n`;
    message += `Date: ${currentDate}\n`;
    message += `Time: ${currentTime}\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formattedPhone}\n`;
    if (formData.email) {
      message += `Email: ${formData.email}\n`;
    }
    message += `City: ${formData.city}\n\n`;
    message += `*Request: FREE DEMO*\n\n`;
    message += `Hi TasteIQ team! I'm interested in booking a free demo to learn more about your services. Please contact me to schedule a convenient time.\n\n`;
    message += `Looking forward to enhancing my culinary experience with TasteIQ!`;

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Track conversion
    trackDemoBooking('homepage', formData);

    // Create WhatsApp message
    const message = createWhatsAppMessage();
    const whatsappURL = `https://wa.me/916207466460?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', email: '', city: '' });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  return (
    <section id="contact" className={t.sectionMuted}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className={`${t.heading} mb-4`}>
              Ready to Experience TasteIQ Risk-Free?
            </h2>
            <p className={`text-lg mb-6 ${t.subtext}`}>
              Take the first step towards a more efficient, profitable restaurant operation.
              Remember:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className={`${t.check} mt-1`}>✓</span>
                <span className={t.bodyText}>
                  <strong>Zero cost</strong> until your current subscription ends
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${t.check} mt-1`}>✓</span>
                <span className={t.bodyText}>
                  <strong>15-minute</strong> setup with our AI-powered system
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${t.check} mt-1`}>✓</span>
                <span className={t.bodyText}>
                  <strong>15% less</strong> than what you're currently paying
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className={`${t.check} mt-1`}>✓</span>
                <span className={t.bodyText}>
                  <strong>All features included</strong> - no hidden charges
                </span>
              </li>
            </ul>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <a
                    href="tel:+916207466460"
                    className={`${t.bodyTitle} ${t.isPrototype ? 'hover:text-[#c24a2a]' : 'hover:text-brand-primary'}`}
                    onClick={() => trackButtonClick('phone_click', 'contact_section')}
                  >
                    +91 6207466460
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <p className={t.bodyText}>Bangalore, India</p>
              </div>
            </div>
            <div className="mt-6">
              <span className={`${t.tagHighlight} px-4 py-1 rounded-full text-sm font-semibold`}>
                Limited Time: Risk-Free Switch Offer!
              </span>
            </div>
          </div>

          <div className={`${t.card} p-6 md:p-8`}>
            <h3 className={`text-2xl mb-6 text-center ${t.isPrototype ? 'font-display font-normal' : 'font-bold'}`}>
              Book Your Free Demo
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors ${t.inputFocus}`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className={`flex border-2 border-gray-200 rounded-lg transition-colors ${t.inputFocus}`}>
                  <span className="px-4 py-3 bg-gray-50 text-gray-600 font-medium rounded-l-lg">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="flex-1 px-4 py-3 border-0 rounded-r-lg focus:outline-none"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors ${t.inputFocus}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors ${t.inputFocus}`}
                  placeholder="Enter your city"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${t.isPrototype ? `${t.primaryBtn} w-full rounded-lg` : `${t.whatsappBtn} rounded-lg`}`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.485" />
                </svg>
                {isSubmitting ? 'Opening WhatsApp...' : 'Book Free Demo via WhatsApp'}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              🔒 Your information is secure and will only be used to contact you about your demo.
              We'll connect with you via WhatsApp within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

