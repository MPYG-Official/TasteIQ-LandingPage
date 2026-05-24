import TasteIQBrandLogo from './TasteIQBrandLogo';

type TasteIQFoodLogoProps = {
  onDark?: boolean;
};

export default function TasteIQFoodLogo({ onDark }: TasteIQFoodLogoProps) {
  return <TasteIQBrandLogo suffix="FOOD" onDark={onDark} />;
}
