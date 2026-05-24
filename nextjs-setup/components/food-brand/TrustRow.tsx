import IconChip from './IconChip';
import { IconChart, IconShield, IconUnlock } from './icons';

const TRUST_ITEMS = [
  { label: 'Transparent payouts', display: 'TRANSPARENT PAYOUTS', icon: <IconShield />, key: 'payouts' },
  { label: 'Track in real-time', display: 'TRACK IN REAL-TIME', icon: <IconChart />, key: 'track' },
  { label: 'No lock-in', display: 'NO LOCK-IN', icon: <IconUnlock />, key: 'lockin' },
] as const;

export default function TrustRow() {
  return (
    <div className="fb-trust-row" role="list">
      {TRUST_ITEMS.map((item) => (
        <div key={item.key} className="fb-trust-item" role="listitem">
          <IconChip label={item.label}>{item.icon}</IconChip>
          <span className="fb-label" style={{ color: 'var(--fb-ink)', letterSpacing: '0.14em' }}>
            {item.display}
          </span>
        </div>
      ))}
    </div>
  );
}
