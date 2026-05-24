'use client';

import { useEffect, useState } from 'react';
import {
  formatOfferUnit,
  OFFER_WINDOW_MS,
  tickOfferCountdown,
  type OfferTimeLeft,
} from '@/lib/offer-countdown';

type HeroOfferCountdownProps = {
  isPrototype: boolean;
  /** Wrapper around the timer (card / dark box) */
  wrapperClassName: string;
  subtextClassName: string;
  unitClassName: string;
};

const UNITS: { key: keyof Pick<OfferTimeLeft, 'hours' | 'minutes' | 'seconds'>; label: string }[] =
  [
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Mins' },
    { key: 'seconds', label: 'Secs' },
  ];

export default function HeroOfferCountdown({
  isPrototype,
  wrapperClassName,
  subtextClassName,
  unitClassName,
}: HeroOfferCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<OfferTimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(tickOfferCountdown());

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = timeLeft ?? { hours: 12, minutes: 0, seconds: 0, totalMs: OFFER_WINDOW_MS };

  return (
    <div className={wrapperClassName}>
      <p className={`mb-1 text-sm font-medium ${subtextClassName}`}>
        Special offer ends in
      </p>
      <p className={`mb-3 text-xs ${subtextClassName} opacity-80`}>
        Claim your 14 day risk-free trial and special pricing before this window closes.
      </p>
      <div className="flex gap-2 justify-center" aria-live="polite" aria-atomic="true">
        {UNITS.map(({ key, label }) => (
          <div key={key} className={`${unitClassName} text-center min-w-[68px]`}>
            <div className="text-2xl font-bold tabular-nums">
              {formatOfferUnit(display[key])}
            </div>
            <div className="text-xs uppercase tracking-wide opacity-90">{label}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
