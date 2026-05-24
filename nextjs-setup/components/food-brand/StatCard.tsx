import type { ReactNode } from 'react';
import IconChip from './IconChip';

type StatCardProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
};

export default function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <article className="fb-stat-card">
      {icon && <IconChip>{icon}</IconChip>}
      <div className={`fb-stat-value${accent ? ' is-accent' : ''}`}>{value}</div>
      <div className="fb-stat-label">{label}</div>
    </article>
  );
}
