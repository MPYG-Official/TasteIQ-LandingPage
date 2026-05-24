import './brand-logo.css';

export type BrandLogoSuffix = 'HOTELS' | 'F&B' | 'FOOD';

type TasteIQBrandLogoProps = {
  suffix?: BrandLogoSuffix;
  onDark?: boolean;
  hero?: boolean;
  className?: string;
};

export default function TasteIQBrandLogo({
  suffix,
  onDark,
  hero,
  className = '',
}: TasteIQBrandLogoProps) {
  const aria = suffix ? `tasteiq ${suffix.toLowerCase()}` : 'tasteiq';

  return (
    <div
      className={`fb-brand-logo${onDark ? ' is-on-dark' : ''}${hero ? ' is-hero' : ''} ${className}`.trim()}
      aria-label={aria}
    >
      <div className="fb-logo">
        <span className="fb-logo-word">
          tasteiq<span className="fb-logo-dot">.</span>
        </span>
        {suffix && <span className="fb-logo-suffix">{suffix}</span>}
      </div>
    </div>
  );
}
