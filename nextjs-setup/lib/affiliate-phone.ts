/** Parse user phone input for affiliate signup/login (India-first, per backend spec). */

export type AffiliatePhonePayload =
  | { country_code: string; mobile: string }
  | { phone: string };

const DEFAULT_COUNTRY = '91';

export function parseAffiliatePhoneInput(raw: string): AffiliatePhonePayload | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return null;

  if (digits.length === 10) {
    return { country_code: DEFAULT_COUNTRY, mobile: digits };
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return { country_code: '91', mobile: digits.slice(2) };
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return { country_code: DEFAULT_COUNTRY, mobile: digits.slice(1) };
  }

  // Backend legacy: E.164 or local string
  return { phone: trimmed };
}

export function buildSignupBody(input: {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}): Record<string, string> {
  const body: Record<string, string> = {
    name: input.name,
    password: input.password,
  };
  if (input.email) body.email = input.email;
  const parsed = input.phone ? parseAffiliatePhoneInput(input.phone) : null;
  if (parsed) {
    if ('country_code' in parsed) {
      body.country_code = parsed.country_code;
      body.mobile = parsed.mobile;
    } else {
      body.phone = parsed.phone;
    }
  }
  return body;
}

export function buildLoginBody(input: {
  email?: string;
  phone?: string;
  password: string;
}): Record<string, string> {
  const body: Record<string, string> = { password: input.password };
  if (input.email) {
    body.email = input.email;
    return body;
  }
  const parsed = input.phone ? parseAffiliatePhoneInput(input.phone) : null;
  if (parsed) {
    if ('country_code' in parsed) {
      body.country_code = parsed.country_code;
      body.mobile = parsed.mobile;
    } else {
      body.phone = parsed.phone;
    }
  }
  return body;
}
