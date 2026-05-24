import Link from 'next/link';
import HiringContactForm from '@/components/sections/HiringContactForm';
import ContentPageHeader from './ContentPageHeader';

export default function CareersPageContent() {
  return (
    <main className="mkt-page">
      <section className="mkt-hero wrap">
        <h1 className="mkt-hero-title">
          join the <em>revolution.</em>
        </h1>
        <p className="mkt-hero-lead">
          Lead the next generation of POS in the post-AI world. Build something extraordinary with
          TasteIQ.
        </p>
        <div className="mkt-pills">
          <span className="mkt-pill">High growth</span>
          <span className="mkt-pill">Lucrative opportunities</span>
          <span className="mkt-pill">Entrepreneurial freedom</span>
          <span className="mkt-pill">Fast-paced &amp; exciting</span>
        </div>
      </section>

      <section className="mkt-sec mkt-sec--alt wrap">
        <ContentPageHeader
          eye="Why TasteIQ"
          align="left"
          title="we&apos;re not just building software."
          subtitle="We're transforming how restaurants operate in the AI era."
        />
        <div className="mkt-cards-3">
          <div className="mkt-card">
            <div className="mkt-card-icon" aria-hidden="true">
              ◎
            </div>
            <h3>Own your territory</h3>
            <p>
              Take complete ownership of your market. Build relationships, grow your network, and
              create lasting impact.
            </p>
          </div>
          <div className="mkt-card">
            <div className="mkt-card-icon" aria-hidden="true">
              ↗
            </div>
            <h3>Scale without limits</h3>
            <p>
              Unlimited earning potential. The more you grow, the more you earn — no caps, no limits.
            </p>
          </div>
          <div className="mkt-card">
            <div className="mkt-card-icon" aria-hidden="true">
              ✦
            </div>
            <h3>AI-powered future</h3>
            <p>
              Be at the forefront of the AI revolution in restaurant technology. Shape the future of
              dining.
            </p>
          </div>
        </div>
      </section>

      <section className="mkt-sec wrap">
        <span className="mkt-role-badge">Open position</span>
        <ContentPageHeader
          eye="Role"
          align="left"
          title="On-Ground Business Development Associate"
          subtitle="Be the face of TasteIQ. Connect with restaurants and transform their operations."
        />

        <div className="mkt-panel">
          <h3>What you&apos;ll own</h3>
          <ul className="mkt-checklist">
            <li>
              <span>
                <strong>Your territory:</strong> Complete ownership of your assigned region or
                market segment
              </span>
            </li>
            <li>
              <span>
                <strong>Client relationships:</strong> Build long-term partnerships with restaurant
                owners
              </span>
            </li>
            <li>
              <span>
                <strong>Sales pipeline:</strong> End-to-end control from prospecting to closing
              </span>
            </li>
            <li>
              <span>
                <strong>Your success:</strong> Direct correlation between effort and earnings
              </span>
            </li>
          </ul>
        </div>

        <div className="mkt-panel">
          <h3>What you&apos;ll do</h3>
          <ul className="mkt-checklist">
            <li>
              <span>
                <strong>Prospect &amp; connect:</strong> Engage restaurants ready to modernize
              </span>
            </li>
            <li>
              <span>
                <strong>Demonstrate value:</strong> Show how TasteIQ transforms operations
              </span>
            </li>
            <li>
              <span>
                <strong>Close deals:</strong> Convert prospects with our 15-minute setup promise
              </span>
            </li>
            <li>
              <span>
                <strong>Build community:</strong> Grow a network of TasteIQ-powered restaurants
              </span>
            </li>
          </ul>
        </div>

        <div className="mkt-highlight">
          <h3>The opportunity is massive</h3>
          <p>
            Thousands of restaurants still run on outdated systems. Every conversion is a step toward
            building your success — from individual sales to your own team and territory.
          </p>
          <div className="mkt-stat-row">
            <div className="mkt-stat">
              <strong>∞</strong>
              <span>Unlimited scale — no caps on growth</span>
            </div>
            <div className="mkt-stat">
              <strong>15m</strong>
              <span>Fast execution — rapid deployment</span>
            </div>
            <div className="mkt-stat">
              <strong>₹</strong>
              <span>High rewards — competitive commissions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mkt-cta-band">
        <div className="wrap">
          <h2>Ready to lead the revolution?</h2>
          <p>
            Join TasteIQ and be part of the team transforming restaurants for the AI era.
          </p>
          <div className="mkt-cta-row">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMh8WcYw2o0lsECAzm3mgc85eQ8JvDqdsjNy4sm1rNsdd3Ow/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply now
            </a>
            <a href="#contact" className="btn btn-ghost-light">
              Let&apos;s talk
            </a>
            <Link href="/blog" className="btn btn-ghost-light">
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="mkt-sec mkt-sec--alt">
        <div className="wrap mkt-form-sec">
          <ContentPageHeader
            eye="Contact"
            title="let&apos;s talk."
            subtitle="Interested in joining? Fill out the form — we&apos;ll get back within 24 hours."
          />
          <HiringContactForm />
        </div>
      </section>
    </main>
  );
}
