const TOKEN_KEY = 'tasteiq_affiliate_token';

export function getAffiliateToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAffiliateToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAffiliateToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
