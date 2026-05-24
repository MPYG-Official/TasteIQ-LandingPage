import type { ReactNode } from 'react';

const S = { stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' as const };

const ICONS: Record<string, ReactNode> = {
  billing: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" {...S} />
      <path d="M8 10h8M8 14h5" strokeLinecap="round" {...S} />
    </svg>
  ),
  tables: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" {...S} />
      <rect x="13" y="3" width="8" height="8" rx="1.5" {...S} />
      <rect x="3" y="13" width="8" height="8" rx="1.5" {...S} />
      <rect x="13" y="13" width="8" height="8" rx="1.5" {...S} />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14v12H5z" {...S} />
      <path d="M9 10h6M9 14h4" strokeLinecap="round" {...S} />
      <path d="M12 6V4" strokeLinecap="round" {...S} />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12M6 10h12M6 15h8" strokeLinecap="round" {...S} />
      <circle cx="18" cy="15" r="2" {...S} />
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4v4M10 4v4M14 4v4M18 4v4" strokeLinecap="round" {...S} />
      <rect x="5" y="8" width="14" height="12" rx="2" {...S} />
      <path d="M9 13h6" strokeLinecap="round" {...S} />
    </svg>
  ),
  'in-room': (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" {...S} />
      <path d="M9 20v-5h6v5" {...S} />
    </svg>
  ),
  subscription: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" {...S} />
      <path d="M8 10h8M8 14h5" strokeLinecap="round" {...S} />
      <path d="M12 3v3" strokeLinecap="round" {...S} />
    </svg>
  ),
  reservations: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" {...S} />
      <path d="M8 3v4M16 3v4M4 10h16" strokeLinecap="round" {...S} />
    </svg>
  ),
  housekeeping: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 4v10H5V7l7-4z" strokeLinejoin="round" {...S} />
      <path d="M9 14h6" strokeLinecap="round" {...S} />
    </svg>
  ),
  folios: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10v16H7z" {...S} />
      <path d="M10 8h4M10 12h4M10 16h3" strokeLinecap="round" {...S} />
    </svg>
  ),
  channels: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" {...S} />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" {...S} />
    </svg>
  ),
  customers: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3" {...S} />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" {...S} />
    </svg>
  ),
  staff: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="2.5" {...S} />
      <circle cx="16" cy="9" r="2" {...S} />
      <path d="M4 19c0-2.5 2.2-4.5 5-4.5M13 19c0-2 1.8-3.5 4-3.5" strokeLinecap="round" {...S} />
    </svg>
  ),
  vendors: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h16l-2 10H6L4 9z" strokeLinejoin="round" {...S} />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" {...S} />
    </svg>
  ),
  compliance: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l8 4v6c0 4.4-3.6 8-8 8s-8-3.6-8-8V7l8-4z" strokeLinejoin="round" {...S} />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" {...S} />
    </svg>
  ),
  payment: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" {...S} />
      <path d="M3 10h18" {...S} />
    </svg>
  ),
  coupons: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14v8H5z" {...S} />
      <path d="M9 8v8M15 8v8" strokeLinecap="round" strokeDasharray="2 2" {...S} />
    </svg>
  ),
  expenses: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12v14H6z" {...S} />
      <path d="M9 9h6M9 13h4" strokeLinecap="round" {...S} />
      <path d="M14 17l3 3" strokeLinecap="round" {...S} />
    </svg>
  ),
  cash: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="2" {...S} />
      <circle cx="12" cy="12" r="2" {...S} />
    </svg>
  ),
};

export default function ModIcon({ id }: { id: string }) {
  return ICONS[id] ?? ICONS.billing;
}
