'use client';

import { useCallback, useEffect, useState } from 'react';
import { whatsAppUrl } from '@/lib/theme';

export default function StartFreeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      setDone(false);
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setDone(true);
  }, []);

  const defaultWa = whatsAppUrl("Hi TasteIQ, I'd like to set up my restaurant.");

  if (!open) return null;

  return (
    <div className="proto-modal on" role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="proto-modal-back" onClick={onClose} aria-hidden />
      <div className="proto-modal-card">
        <button type="button" className="proto-modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 3 L11 11 M11 3 L3 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!done ? (
          <>
            <p className="hero-eye" style={{ marginBottom: 12 }}>
              <span className="hero-eye-dot" />
              Start your restaurant on TasteIQ
            </p>
            <h3 className="proto-modal-h">
              Let&apos;s <em>shape it</em> around your business.
            </h3>
            <p className="proto-modal-sub">
              Tell us a little about your restaurant. We&apos;ll set up a 20-minute call and get you
              live within a day.
            </p>
            <form className="proto-modal-form" onSubmit={handleSubmit}>
              <div className="proto-modal-field">
                <label htmlFor="sf-name">Your name</label>
                <input id="sf-name" name="name" type="text" required placeholder="e.g. Anita Rao" />
              </div>
              <div className="proto-modal-field">
                <label htmlFor="sf-restaurant">Restaurant name</label>
                <input
                  id="sf-restaurant"
                  name="restaurant"
                  type="text"
                  required
                  placeholder="e.g. Halli Mane"
                />
              </div>
              <div className="proto-modal-field">
                <label htmlFor="sf-phone">Phone / WhatsApp</label>
                <input
                  id="sf-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98xxxxxxxx"
                />
              </div>
              <div className="proto-modal-row">
                <div className="proto-modal-field">
                  <label htmlFor="sf-country">Country</label>
                  <select id="sf-country" name="country" required defaultValue="">
                    <option value="" disabled>
                      Pick one
                    </option>
                    <option>India</option>
                    <option>United Arab Emirates</option>
                    <option>United Kingdom</option>
                    <option>Singapore</option>
                    <option>United States</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="proto-modal-field">
                  <label htmlFor="sf-city">City</label>
                  <input id="sf-city" name="city" type="text" required placeholder="Bengaluru" />
                </div>
              </div>
              <button type="submit" className="proto-modal-submit">
                Send my details
              </button>
            </form>
            <a className="proto-modal-wa" href={defaultWa} target="_blank" rel="noopener noreferrer">
              WhatsApp right away
            </a>
          </>
        ) : (
          <>
            <h3 className="proto-modal-h">We&apos;ve got your details.</h3>
            <p className="proto-modal-sub">
              Someone from the team will reach out within 24 hours. Want it faster? Ping us on
              WhatsApp.
            </p>
            <a
              className="proto-modal-wa"
              href={whatsAppUrl('Hi TasteIQ, I just submitted the form — following up here.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue on WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}
