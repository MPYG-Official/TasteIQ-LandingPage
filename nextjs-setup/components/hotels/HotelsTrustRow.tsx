import type { ReactNode } from 'react';
import IconChip from '@/components/food-brand/IconChip';
import { HOTELS_TRUST_ITEMS } from '@/lib/hotels-data';
import { IconGrid, IconLayers, IconShield, IconSync } from './icons';

const TRUST_ICONS: Record<string, ReactNode> = {
  'all-in-one': <IconLayers />,
  otas: <IconSync />,
  compliance: <IconShield />,
  multi: <IconGrid />,
};

export default function HotelsTrustRow() {
  return (
    <div className="fb-trust-row ht-trust-row" role="list">
      {HOTELS_TRUST_ITEMS.map((item) => (
        <div key={item.key} className="fb-trust-item" role="listitem">
          <IconChip label={item.label}>{TRUST_ICONS[item.key]}</IconChip>
          <span className="fb-label" style={{ color: 'var(--fb-cream-on-dark)', letterSpacing: '0.14em' }}>
            {item.display}
          </span>
        </div>
      ))}
    </div>
  );
}
