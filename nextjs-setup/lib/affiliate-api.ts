import { clearAffiliateToken, getAffiliateToken } from '@/lib/affiliate-auth';
import { buildLoginBody, buildSignupBody } from '@/lib/affiliate-phone';

export type AffiliateProgram = {
  reward_amount: number;
  hold_period_days: number;
  min_payout_threshold: number;
  currency?: string;
};

export type AffiliatePayout = {
  id: string;
  amount: number;
  created_at: string;
  status: 'requested' | 'processing' | 'completed' | 'failed';
  txn_ref?: string | null;
};

export type AffiliateDashboard = {
  referral_code: string;
  referral_link?: string;
  program: AffiliateProgram;
  stats: {
    total_referred: number;
    converted: number;
    earned: number;
    payable: number;
    paid: number;
  };
  payouts: AffiliatePayout[];
  referrals?: { id: string; status: string; created_at: string }[];
};

export type AffiliateAuthResponse = {
  token: string;
  affiliate?: { id: string; name: string; email?: string; phone?: string };
  program?: AffiliateProgram;
};

export class AffiliateApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AffiliateApiError';
    this.status = status;
  }
}

function apiBase(): string {
  if (typeof window !== 'undefined') {
    return '/api/affiliate';
  }
  const backend = process.env.AFFILIATE_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  return backend ? `${backend.replace(/\/$/, '')}/affiliate` : '/api/affiliate';
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  const trimmed = text.trim();
  if (trimmed.startsWith('<')) {
    throw new AffiliateApiError(
      res.status >= 500
        ? 'Affiliate service error. Please try again shortly.'
        : 'Unexpected response from server',
      res.status
    );
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new AffiliateApiError('Invalid response from server', res.status);
  }
}

function pickProgram(payload: Record<string, unknown>): AffiliateProgram | null {
  const program = payload.program ?? payload.config ?? payload.active_program;
  if (program && typeof program === 'object' && 'reward_amount' in program) {
    return program as AffiliateProgram;
  }
  return null;
}

async function affiliateFetch<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = true, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (!headers.has('Content-Type') && rest.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = getAffiliateToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${apiBase()}${path}`, { ...rest, headers });
  const data = await parseJson<Record<string, unknown>>(res);

  if (!res.ok) {
    const message =
      (typeof data.message === 'string' && data.message) ||
      (typeof data.error === 'string' && data.error) ||
      `Request failed (${res.status})`;
    if (res.status === 401 || res.status === 403) clearAffiliateToken();
    throw new AffiliateApiError(message, res.status);
  }

  return data as T;
}

/** Public program config for logged-out landing (`GET /affiliate/program` only). */
export async function getAffiliateProgram(): Promise<AffiliateProgram> {
  const data = await affiliateFetch<Record<string, unknown>>('/program', {
    method: 'GET',
    auth: false,
  });
  const program = pickProgram(data);
  if (program) return program;
  throw new AffiliateApiError('No active affiliate program', 404);
}

export async function affiliateSignup(body: {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}): Promise<AffiliateAuthResponse> {
  return affiliateFetch<AffiliateAuthResponse>('/signup', {
    method: 'POST',
    auth: false,
    body: JSON.stringify(buildSignupBody(body)),
  });
}

export async function affiliateLogin(body: {
  email?: string;
  phone?: string;
  password: string;
}): Promise<AffiliateAuthResponse> {
  return affiliateFetch<AffiliateAuthResponse>('/login', {
    method: 'POST',
    auth: false,
    body: JSON.stringify(buildLoginBody(body)),
  });
}

export async function getAffiliateDashboard(): Promise<AffiliateDashboard> {
  return affiliateFetch<AffiliateDashboard>('/dashboard', { method: 'GET' });
}

export async function requestAffiliatePayout(): Promise<{ ok?: boolean; message?: string }> {
  return affiliateFetch('/payout/request', { method: 'POST', body: JSON.stringify({}) });
}

export function formatInr(amount: number): string {
  const n = Math.round(amount);
  return `₹${n.toLocaleString('en-IN')}`;
}

export function lifetimeEarned(stats: AffiliateDashboard['stats']): number {
  return stats.paid + stats.payable + stats.earned;
}
