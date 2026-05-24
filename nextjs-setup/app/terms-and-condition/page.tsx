import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';

export const metadata: Metadata = genMeta({
  title: 'Terms and Conditions',
  description:
    'TasteIQ Terms and Conditions - Read our terms of service and user agreement.',
  keywords: ['terms and conditions', 'terms of service', 'user agreement', 'TasteIQ terms'],
  url: '/terms-and-condition',
});

export default function TermsAndConditionPage() {
  return (
    <MarketingPageShell>
      <main className="mkt-page">
        <div className="mkt-legal-banner wrap">
          <h1>Terms and conditions</h1>
          <p className="mkt-legal-date">Last updated: January 2024</p>
        </div>
        <section className="mkt-sec wrap">
          <div className="mkt-prose">
            <p>
              Please read these Terms and Conditions carefully before using TasteIQ&apos;s restaurant
              management software and services.
            </p>

            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing and using TasteIQ&apos;s services, you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to these terms, please do
              not use our services.
            </p>

            <h2>2. Description of service</h2>
            <p>
              TasteIQ provides a cloud-based restaurant management system including POS, inventory
              management, billing, and online ordering capabilities. We reserve the right to modify,
              suspend, or discontinue any part of our services at any time.
            </p>

            <h2>3. User accounts and registration</h2>
            <p>To use our services, you must register for an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2>4. Payment terms</h2>
            <p>
              Subscription fees are billed annually or monthly as per your selected plan. All fees
              are non-refundable except as required by law. We reserve the right to change our
              pricing with 30 days&apos; notice.
            </p>

            <h2>5. Free trial and cancellation</h2>
            <p>
              We offer a 14-day free trial period. You may cancel your subscription at any time.
              Cancellation will take effect at the end of your current billing period. No refunds
              will be provided for partial billing periods.
            </p>

            <h2>6. Intellectual property</h2>
            <p>
              All content, features, and functionality of TasteIQ are owned by us and are protected
              by international copyright, trademark, and other intellectual property laws. You may
              not copy, modify, or create derivative works of our software.
            </p>

            <h2>7. User content and data</h2>
            <p>
              You retain ownership of all data you upload to TasteIQ. By using our services, you
              grant us a license to use, store, and process your data to provide and improve our
              services. We will not share your data with third parties except as described in our
              Privacy Policy.
            </p>

            <h2>8. Prohibited uses</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Reverse engineer or decompile our software</li>
              <li>Use automated systems to access the service without permission</li>
            </ul>

            <h2>9. Limitation of liability</h2>
            <p>
              TasteIQ shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use or inability to use our services. Our total
              liability shall not exceed the amount you paid us in the 12 months preceding the
              claim.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless TasteIQ from any claims, damages, losses, or
              expenses arising from your use of our services or violation of these terms.
            </p>

            <h2>11. Changes to terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of
              significant changes via email or through our platform. Continued use of our services
              after changes constitutes acceptance of the new terms.
            </p>

            <h2>12. Contact us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
            <p>
              Email: founders@tasteiq.com
              <br />
              Phone: +91 6207466460
              <br />
              Address: Bangalore, India
            </p>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </MarketingPageShell>
  );
}
