import IconChip from '@/components/food-brand/IconChip';
import type { SolutionItem } from '@/lib/hotels-data';
import type { ReactNode } from 'react';

type SolutionCardProps = {
  item: SolutionItem;
  icon: ReactNode;
};

export default function SolutionCard({ item, icon }: SolutionCardProps) {
  return (
    <article className="ht-solution-card">
      <IconChip label={item.title}>{icon}</IconChip>
      <h3 className="ht-solution-title">{item.title}</h3>
      <p className="ht-solution-desc">{item.description}</p>
    </article>
  );
}
