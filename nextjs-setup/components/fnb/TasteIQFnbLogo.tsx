import TasteIQBrandLogo from '@/components/food-brand/TasteIQBrandLogo';

type TasteIQFnbLogoProps = {
  onDark?: boolean;
};

export default function TasteIQFnbLogo({ onDark }: TasteIQFnbLogoProps) {
  return <TasteIQBrandLogo suffix="F&B" onDark={onDark} />;
}
