'use client';

import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react';

type StartFreeNavContextValue = {
  registerStartFree: (handler: (() => void) | null) => void;
  triggerStartFree: () => void;
};

const StartFreeNavContext = createContext<StartFreeNavContextValue | null>(null);

export function StartFreeNavProvider({ children }: { children: ReactNode }) {
  const handlerRef = useRef<(() => void) | null>(null);

  const registerStartFree = useCallback((handler: (() => void) | null) => {
    handlerRef.current = handler;
  }, []);

  const triggerStartFree = useCallback(() => {
    if (handlerRef.current) {
      handlerRef.current();
      return;
    }
    if (typeof window !== 'undefined') {
      window.location.href = '/vision#start';
    }
  }, []);

  const value = useMemo(
    () => ({ registerStartFree, triggerStartFree }),
    [registerStartFree, triggerStartFree]
  );

  return (
    <StartFreeNavContext.Provider value={value}>{children}</StartFreeNavContext.Provider>
  );
}

export function useStartFreeNav() {
  const ctx = useContext(StartFreeNavContext);
  if (!ctx) {
    throw new Error('useStartFreeNav must be used within StartFreeNavProvider');
  }
  return ctx;
}

/** Optional hook for pages that may render outside provider during tests */
export function useStartFreeNavOptional() {
  return useContext(StartFreeNavContext);
}
