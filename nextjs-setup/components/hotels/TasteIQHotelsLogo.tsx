type TasteIQHotelsLogoProps = {
  onDark?: boolean;
};

export default function TasteIQHotelsLogo({ onDark }: TasteIQHotelsLogoProps) {
  return (
    <div className="fb-logo" aria-label="tasteiq hotels">
      <span
        className="fb-logo-word"
        style={onDark ? { color: 'var(--fb-cream-on-dark)' } : undefined}
      >
        tasteiq<span className="fb-logo-dot">.</span>
      </span>
      <span
        className="fb-logo-food"
        style={onDark ? { color: 'var(--fb-cream-on-dark)' } : undefined}
      >
        HOTELS
      </span>
    </div>
  );
}
