import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

export default function FoodBrandLayout({ children }: { children: React.ReactNode }) {
  return <div className={interTight.variable}>{children}</div>;
}
