const STORAGE_KEY = 'tasteiq_foods_referral_code';

/** Persist ?ref= from Foods landing for future checkout API calls. */
export function captureReferralFromUrl(searchParams: URLSearchParams): string | null {
  const ref = searchParams.get('ref')?.trim();
  if (!ref || ref.length > 32) return null;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, ref);
  }
  return ref;
}

export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function clearStoredReferralCode(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}
