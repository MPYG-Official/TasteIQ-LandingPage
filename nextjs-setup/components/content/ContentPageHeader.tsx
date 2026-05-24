import type { ReactNode } from 'react';

type Props = {
  eye: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
};

export default function ContentPageHeader({ eye, title, subtitle, align = 'center' }: Props) {
  return (
    <header className={`mkt-page-head${align === 'center' ? ' mkt-page-head--center' : ''}`}>
      <span className="sec-eye mkt-page-eye">
        <span className="sec-eye-dot" />
        {eye}
      </span>
      <h1 className="sec-h mkt-page-title">{title}</h1>
      {subtitle ? <p className="sec-sub mkt-page-sub">{subtitle}</p> : null}
    </header>
  );
}
