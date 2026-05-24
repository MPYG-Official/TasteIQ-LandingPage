'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import BrushBadge from './BrushBadge';
import IconChip from './IconChip';
import PrimaryButton from './PrimaryButton';
import SectionDivider from './SectionDivider';
import StatCard from './StatCard';
import TasteIQFoodLogo from './TasteIQFoodLogo';
import TrustRow from './TrustRow';
import {
  CurvedArrow,
  IconCheckCircle,
  IconRupee,
  IconShare,
  IconTiffin,
  IconUsers,
  IconWallet,
} from './icons';
import {
  AffiliateApiError,
  type AffiliateDashboard,
  type AffiliateProgram,
  affiliateLogin,
  affiliateSignup,
  formatInr,
  getAffiliateDashboard,
  getAffiliateProgram,
  lifetimeEarned,
  requestAffiliatePayout,
} from '@/lib/affiliate-api';
import {
  clearAffiliateToken,
  getAffiliateToken,
  setAffiliateToken,
} from '@/lib/affiliate-auth';
import { FOODS_SITE_URL } from '@/lib/site-urls';

type Toast = { message: string; type: 'success' | 'error' } | null;

function formatPayoutDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function referralShareUrl(code: string, link?: string): string {
  if (link) return link;
  return `${FOODS_SITE_URL}?ref=${encodeURIComponent(code)}`;
}

export default function AffiliatePage() {
  const [booting, setBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [program, setProgram] = useState<AffiliateProgram | null>(null);
  const [dashboard, setDashboard] = useState<AffiliateDashboard | null>(null);
  const [dashLoading, setDashLoading] = useState(false);
  const [dashError, setDashError] = useState('');
  const [programError, setProgramError] = useState('');

  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginId, setLoginId] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  const activeProgram = dashboard?.program ?? program;

  const loadProgram = useCallback(async () => {
    try {
      const p = await getAffiliateProgram();
      setProgram(p);
      setProgramError('');
      return p;
    } catch (err) {
      setProgramError(
        err instanceof AffiliateApiError ? err.message : 'Could not load program details'
      );
      return null;
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    setDashLoading(true);
    setDashError('');
    try {
      const data = await getAffiliateDashboard();
      setDashboard(data);
      setProgram(data.program);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      if (err instanceof AffiliateApiError && err.status === 401) {
        clearAffiliateToken();
        setIsAuthenticated(false);
        setDashboard(null);
      } else {
        setDashError(
          err instanceof AffiliateApiError ? err.message : 'Could not load your dashboard'
        );
      }
      return null;
    } finally {
      setDashLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getAffiliateToken();
      if (token) {
        const data = await loadDashboard();
        if (!cancelled && !data) await loadProgram();
      } else {
        await loadProgram();
      }
      if (!cancelled) setBooting(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [loadDashboard, loadProgram]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setFormError('Enter your name');
      return;
    }
    if (!trimmedEmail && !trimmedPhone) {
      setFormError('Enter your email or phone number');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    try {
      const res = await affiliateSignup({
        name: trimmedName,
        email: trimmedEmail || undefined,
        phone: trimmedPhone || undefined,
        password,
      });
      setAffiliateToken(res.token);
      if (res.program) setProgram(res.program);
      setPassword('');
      await loadDashboard();
      setToast({ message: 'Welcome! Your affiliate account is ready.', type: 'success' });
    } catch (err) {
      setFormError(err instanceof AffiliateApiError ? err.message : 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    const id = loginId.trim();
    if (!id || !password) {
      setFormError('Enter your email or phone and password');
      return;
    }

    const isEmail = id.includes('@');
    setSubmitting(true);
    try {
      const res = await affiliateLogin({
        email: isEmail ? id : undefined,
        phone: isEmail ? undefined : id,
        password,
      });
      setAffiliateToken(res.token);
      setPassword('');
      await loadDashboard();
      setToast({ message: 'Logged in successfully.', type: 'success' });
    } catch (err) {
      setFormError(err instanceof AffiliateApiError ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onLogout = () => {
    clearAffiliateToken();
    setIsAuthenticated(false);
    setDashboard(null);
    setAuthMode('signup');
    loadProgram();
  };

  const copyReferral = async () => {
    if (!dashboard) return;
    const url = referralShareUrl(dashboard.referral_code, dashboard.referral_link);
    try {
      await navigator.clipboard.writeText(url);
      setToast({ message: 'Referral link copied.', type: 'success' });
    } catch {
      setToast({ message: 'Could not copy — please copy manually.', type: 'error' });
    }
  };

  const shareReferral = async () => {
    if (!dashboard || !activeProgram) return;
    const url = referralShareUrl(dashboard.referral_code, dashboard.referral_link);
    const text = `Join TasteIQ Food with my link and get great daily meals. I earn ${formatInr(activeProgram.reward_amount)} when you subscribe!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TasteIQ Food', text, url });
      } catch {
        /* user cancelled */
      }
    } else {
      copyReferral();
    }
  };

  const onRequestPayout = async () => {
    if (!dashboard || !activeProgram) return;
    if (dashboard.stats.payable < activeProgram.min_payout_threshold) return;

    setPayoutLoading(true);
    try {
      await requestAffiliatePayout();
      setToast({ message: 'Payout requested. We will process it shortly.', type: 'success' });
      await loadDashboard();
    } catch (err) {
      setToast({
        message: err instanceof AffiliateApiError ? err.message : 'Payout request failed',
        type: 'error',
      });
    } finally {
      setPayoutLoading(false);
    }
  };

  const canWithdraw = useMemo(() => {
    if (!dashboard || !activeProgram) return false;
    return dashboard.stats.payable >= activeProgram.min_payout_threshold;
  }, [dashboard, activeProgram]);

  if (booting) {
    return (
      <div className="food-brand-site">
        <div className="fb-loading" role="status" aria-live="polite">
          <div className="fb-spinner" aria-hidden="true" />
          <p>Loading affiliate program…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-brand-site">
      <header className="fb-wrap" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TasteIQFoodLogo />
          {isAuthenticated && (
            <button type="button" className="fb-link-btn" onClick={onLogout}>
              Log out
            </button>
          )}
        </div>
      </header>

      {isAuthenticated ? (
        <main className="fb-wrap" style={{ paddingBottom: 48 }}>
          {dashLoading && !dashboard ? (
            <div className="fb-loading" role="status">
              <div className="fb-spinner" aria-hidden="true" />
              <p>Loading your dashboard…</p>
            </div>
          ) : dashError && !dashboard ? (
            <div className="fb-empty">
              <p>{dashError}</p>
              <PrimaryButton
                type="button"
                onClick={() => loadDashboard()}
                style={{ marginTop: 16, maxWidth: 240 }}
              >
                Try again
              </PrimaryButton>
            </div>
          ) : dashboard && activeProgram ? (
            <>
              <section className="fb-dash-top" aria-labelledby="referral-heading">
                <p className="fb-label" id="referral-heading">
                  Your referral link
                </p>
                <p className="fb-referral-code">
                  {dashboard.referral_link ||
                    referralShareUrl(dashboard.referral_code, dashboard.referral_link)}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <button type="button" className="fb-btn-ghost" onClick={copyReferral}>
                    Copy link
                  </button>
                  <button type="button" className="fb-btn-ghost" onClick={shareReferral}>
                    Share
                  </button>
                </div>
                <p style={{ marginTop: 16, fontSize: 15, color: 'var(--fb-muted)' }}>
                  You earn{' '}
                  <strong style={{ color: 'var(--fb-accent)' }}>
                    {formatInr(activeProgram.reward_amount)}
                  </strong>{' '}
                  every time someone subscribes with your link.
                </p>
              </section>

              <div className="fb-stat-grid">
                <StatCard
                  label="Total referred"
                  value={dashboard.stats.total_referred}
                  icon={<IconUsers />}
                />
                <StatCard
                  label="Converted"
                  value={dashboard.stats.converted}
                  icon={<IconCheckCircle />}
                />
                <StatCard
                  label="Available to withdraw"
                  value={formatInr(dashboard.stats.payable)}
                  icon={<IconWallet />}
                  accent
                />
                <StatCard
                  label="Lifetime earned"
                  value={formatInr(lifetimeEarned(dashboard.stats))}
                  icon={<IconRupee />}
                />
              </div>

              <h2 className="fb-label" style={{ marginBottom: 12 }}>
                Earnings breakdown
              </h2>
              <div className="fb-ledger">
                <div className="fb-ledger-card">
                  <div className="fb-stat-label">Pending</div>
                  <div className="fb-stat-value" style={{ fontSize: '1.35rem' }}>
                    {formatInr(dashboard.stats.earned)}
                  </div>
                  <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--fb-muted)' }}>
                    Credited after {activeProgram.hold_period_days}-day hold
                  </p>
                </div>
                <div className="fb-ledger-card">
                  <div className="fb-stat-label">Ready to withdraw</div>
                  <div className="fb-stat-value is-accent" style={{ fontSize: '1.35rem' }}>
                    {formatInr(dashboard.stats.payable)}
                  </div>
                </div>
                <div className="fb-ledger-card">
                  <div className="fb-stat-label">Paid out</div>
                  <div className="fb-stat-value" style={{ fontSize: '1.35rem' }}>
                    {formatInr(dashboard.stats.paid)}
                  </div>
                </div>
              </div>

              {dashboard.stats.total_referred === 0 && (
                <p className="fb-empty" style={{ padding: '24px 16px', marginBottom: 24 }}>
                  No referrals yet — share your link to get started.
                </p>
              )}

              <h2 className="fb-label" style={{ marginBottom: 12 }}>
                Past payouts
              </h2>
              {dashboard.payouts.length === 0 ? (
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--fb-muted)',
                    marginBottom: 24,
                  }}
                >
                  No payouts yet.
                </p>
              ) : (
                <div className="fb-table-wrap" style={{ marginBottom: 24 }}>
                  <table className="fb-table">
                    <caption className="sr-only">Past affiliate payouts</caption>
                    <thead>
                      <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.payouts.map((p) => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700, color: 'var(--fb-accent)' }}>
                            {formatInr(p.amount)}
                          </td>
                          <td>{formatPayoutDate(p.created_at)}</td>
                          <td>
                            <span className={`fb-status fb-status--${p.status}`}>{p.status}</span>
                          </td>
                          <td>{p.txn_ref || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <PrimaryButton
                type="button"
                onClick={onRequestPayout}
                disabled={!canWithdraw || payoutLoading}
                style={{ maxWidth: 360 }}
              >
                {payoutLoading ? 'Requesting…' : 'Request payout'}
              </PrimaryButton>
              {!canWithdraw && (
                <p style={{ marginTop: 10, fontSize: 13, color: 'var(--fb-muted)' }}>
                  Withdraw available at {formatInr(activeProgram.min_payout_threshold)}
                </p>
              )}
            </>
          ) : null}
        </main>
      ) : (
        <>
          <section className="fb-hero">
            <div className="fb-wrap fb-hero-grid">
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}>
                  <BrushBadge>Earn on every referral</BrushBadge>
                </div>
                <p className="fb-label" style={{ marginBottom: 12 }}>
                  Affiliate program
                </p>
                <h1 className="fb-headline">
                  good food.
                  <br />
                  <span className="fb-accent-text">better shared.</span>
                </h1>
                <p style={{ fontSize: '1.05rem', marginTop: 16, maxWidth: '36ch' }}>
                  Refer a friend. Earn{' '}
                  {activeProgram ? (
                    <strong style={{ color: 'var(--fb-accent)' }}>
                      {formatInr(activeProgram.reward_amount)}
                    </strong>
                  ) : (
                    <span style={{ color: 'var(--fb-accent)' }}>…</span>
                  )}{' '}
                  when they subscribe.
                </p>
                {programError && (
                  <p className="fb-form-error" style={{ color: '#8a2a1a', marginTop: 12 }}>
                    {programError}
                  </p>
                )}
              </div>
              <div className="fb-hero-visual">
                <CurvedArrow className="fb-curved-arrow fb-curved-arrow--tl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/food-brand/tiffin-hero.svg"
                  alt="Steel tiffin carrier representing shared meals"
                  width={280}
                  height={320}
                />
              </div>
            </div>
          </section>

          <section className="fb-wrap" aria-labelledby="how-heading">
            <h2 id="how-heading" className="fb-label" style={{ marginBottom: 8 }}>
              How it works
            </h2>
            <div className="fb-steps">
              <div className="fb-step">
                <IconChip label="Share your link">
                  <IconShare />
                </IconChip>
                <p>
                  <strong>Share your link</strong>
                  <br />
                  Send your personal referral link to friends and colleagues.
                </p>
              </div>
              <SectionDivider />
              <div className="fb-step">
                <IconChip label="Friend subscribes">
                  <IconTiffin />
                </IconChip>
                <p>
                  <strong>Friend subscribes</strong>
                  <br />
                  They sign up for a TasteIQ Food lunch subscription.
                </p>
              </div>
              <SectionDivider />
              <div className="fb-step">
                <IconChip label="You earn">
                  <IconRupee />
                </IconChip>
                <p>
                  <strong>
                    You earn{' '}
                    {activeProgram ? formatInr(activeProgram.reward_amount) : 'rewards'}
                  </strong>
                  <small>
                    {activeProgram
                      ? `Credited after a ${activeProgram.hold_period_days}-day hold period.`
                      : 'Credited after a short hold period.'}
                  </small>
                </p>
              </div>
            </div>
          </section>

          <section className="fb-dark-panel" aria-labelledby="join-heading">
            <div className="fb-wrap" style={{ maxWidth: 520 }}>
              <h2 id="join-heading" className="fb-serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 24 }}>
                Good food is better when shared.
              </h2>

              {authMode === 'signup' ? (
                <form onSubmit={onSignup} noValidate>
                  {formError && <p className="fb-form-error" role="alert">{formError}</p>}
                  <div className="fb-field" style={{ marginBottom: 16 }}>
                    <label htmlFor="aff-name">Name</label>
                    <input
                      id="aff-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fb-field" style={{ marginBottom: 16 }}>
                    <label htmlFor="aff-email">Email</label>
                    <input
                      id="aff-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="fb-field" style={{ marginBottom: 8 }}>
                    <label htmlFor="aff-phone">Or phone</label>
                    <input
                      id="aff-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(244,238,228,0.45)', marginBottom: 16 }}>
                    Provide email or phone (at least one).
                  </p>
                  <div className="fb-field" style={{ marginBottom: 20 }}>
                    <label htmlFor="aff-password">Password</label>
                    <input
                      id="aff-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <PrimaryButton type="submit" disabled={submitting}>
                    {submitting ? 'Joining…' : 'Join as affiliate'}
                  </PrimaryButton>
                  <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(244,238,228,0.7)' }}>
                    Already an affiliate?{' '}
                    <button
                      type="button"
                      className="fb-link-btn"
                      style={{ color: 'var(--fb-cream)' }}
                      onClick={() => {
                        setAuthMode('login');
                        setFormError('');
                      }}
                    >
                      Log in
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={onLogin} noValidate>
                  {formError && <p className="fb-form-error" role="alert">{formError}</p>}
                  <div className="fb-field" style={{ marginBottom: 16 }}>
                    <label htmlFor="aff-login-id">Email or phone</label>
                    <input
                      id="aff-login-id"
                      name="loginId"
                      type="text"
                      autoComplete="username"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="fb-field" style={{ marginBottom: 20 }}>
                    <label htmlFor="aff-login-password">Password</label>
                    <input
                      id="aff-login-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <PrimaryButton type="submit" disabled={submitting}>
                    {submitting ? 'Logging in…' : 'Log in'}
                  </PrimaryButton>
                  <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(244,238,228,0.7)' }}>
                    New here?{' '}
                    <button
                      type="button"
                      className="fb-link-btn"
                      style={{ color: 'var(--fb-cream)' }}
                      onClick={() => {
                        setAuthMode('signup');
                        setFormError('');
                      }}
                    >
                      Join as affiliate
                    </button>
                  </p>
                </form>
              )}

              <p className="fb-footnote">*T&amp;C apply</p>
            </div>
          </section>

          <div className="fb-wrap">
            <TrustRow />
          </div>
        </>
      )}

      {toast && (
        <div
          className={`fb-toast fb-toast--${toast.type}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
