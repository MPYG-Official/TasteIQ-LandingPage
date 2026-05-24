import type { ButtonHTMLAttributes, ReactNode } from 'react';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  showChevron?: boolean;
};

export default function PrimaryButton({
  children,
  showChevron = true,
  className = '',
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  return (
    <button type={type} className={`fb-btn-primary ${className}`.trim()} {...rest}>
      <span>{children}</span>
      {showChevron && (
        <span aria-hidden="true" style={{ fontSize: '1.1em', lineHeight: 1 }}>
          ›
        </span>
      )}
    </button>
  );
}
