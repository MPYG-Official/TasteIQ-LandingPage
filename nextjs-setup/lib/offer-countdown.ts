/** 12-hour per-visitor offer window (browser localStorage). */

export const OFFER_WINDOW_MS = 12 * 60 * 60 * 1000;
const STORAGE_END = 'tasteiq_launch_offer_ends_at';

export type OfferTimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

export function formatOfferUnit(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

/** Ensures a future end timestamp exists; rolls forward by 12h when expired. */
export function syncOfferWindowEnd(now = Date.now()): number {
  if (typeof window === 'undefined') {
    return now + OFFER_WINDOW_MS;
  }

  const raw = window.localStorage.getItem(STORAGE_END);
  let end = raw ? Number.parseInt(raw, 10) : Number.NaN;

  if (!Number.isFinite(end) || end <= now) {
    end = now + OFFER_WINDOW_MS;
    window.localStorage.setItem(STORAGE_END, String(end));
  }

  return end;
}

export function getOfferTimeLeft(end: number, now = Date.now()): OfferTimeLeft {
  const totalMs = Math.max(0, end - now);
  return {
    hours: Math.floor(totalMs / (1000 * 60 * 60)),
    minutes: Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((totalMs % (1000 * 60)) / 1000),
    totalMs,
  };
}

export function tickOfferCountdown(now = Date.now()): OfferTimeLeft {
  let end = syncOfferWindowEnd(now);
  let left = getOfferTimeLeft(end, now);

  if (left.totalMs === 0) {
    end = now + OFFER_WINDOW_MS;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_END, String(end));
    }
    left = getOfferTimeLeft(end, now);
  }

  return left;
}
