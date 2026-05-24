import TasteIQBrandLogo from './TasteIQBrandLogo';

type TasteIQHotelsLogoProps = {
  onDark?: boolean;
};

export default function TasteIQHotelsLogo({ onDark }: TasteIQHotelsLogoProps) {
  return <TasteIQBrandLogo suffix="HOTELS" onDark={onDark} />;
}
