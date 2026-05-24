import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import MarketingPageShell from '@/components/content/MarketingPageShell';
import MarketingFooter from '@/components/content/MarketingFooter';

export const metadata: Metadata = genMeta({
  title: 'Privacy Policy',
  description:
    'TasteIQ Privacy Policy - Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'TasteIQ privacy'],
  url: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <MarketingPageShell>
      <main className="mkt-page">
        <div className="mkt-legal-banner wrap">
          <h1>Privacy policy</h1>
          <p className="mkt-legal-date">Last updated: January 2024</p>
        </div>
        <section className="mkt-sec wrap">
          <div className="mkt-prose">
            <p>
              At TasteIQ, we are committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our
              restaurant management software and services.
            </p>

            <h2>1. Information we collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name, email address, phone number, and contact information</li>
              <li>Restaurant details, menu information, and business data</li>
              <li>Payment and billing information</li>
              <li>Account credentials and preferences</li>
            </ul>

            <h2>2. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2>3. Information sharing and disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information only in the following circumstances:
            </p>
            <ul>
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2>4. Data security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>5. Your rights and choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform
              and hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>

            <h2>7. Changes to this privacy policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>

            <h2>8. Contact us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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
