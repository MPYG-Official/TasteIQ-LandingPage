type BrushBadgeProps = {
  children: string;
  className?: string;
};

export default function BrushBadge({ children, className = '' }: BrushBadgeProps) {
  return <span className={`fb-brush-badge ${className}`.trim()}>{children}</span>;
}
