'use client';

import { useSiteTheme } from '@/components/theme/ThemeProvider';
import { getLandingTheme } from '@/lib/landing-theme';

export function useLandingTheme() {
  const { theme } = useSiteTheme();
  return getLandingTheme(theme === 'prototype');
}
