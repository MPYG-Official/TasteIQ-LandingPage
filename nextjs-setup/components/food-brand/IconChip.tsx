import type { ReactNode } from 'react';

type IconChipProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export default function IconChip({ children, className = '', label }: IconChipProps) {
  return (
    <span
      className={`fb-icon-chip ${className}`.trim()}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {children}
    </span>
  );
}
