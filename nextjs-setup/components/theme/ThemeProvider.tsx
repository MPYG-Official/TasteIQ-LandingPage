'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SiteTheme } from '@/lib/theme';

const ThemeContext = createContext<{
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
} | null>(null);

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: SiteTheme;
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<SiteTheme>(initialTheme);

  const applyTheme = useCallback((next: SiteTheme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', next);
    root.classList.toggle('theme-prototype', next === 'prototype');
    root.classList.toggle('theme-classic', next === 'classic');
    setThemeState(next);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      applyTheme(initialTheme);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const override = params.get('theme');
    if (override === 'classic' || override === 'prototype') {
      applyTheme(override);
      return;
    }

    applyTheme(initialTheme);
  }, [initialTheme, applyTheme]);

  const setTheme = useCallback(
    (next: SiteTheme) => {
      applyTheme(next);
    },
    [applyTheme]
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useSiteTheme must be used within ThemeProvider');
  }
  return ctx;
}
