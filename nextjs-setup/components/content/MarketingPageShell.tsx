import '@/components/prototype/prototype.css';
import './content-pages.css';

export default function MarketingPageShell({ children }: { children: React.ReactNode }) {
  return <div className="prototype-site mkt-site">{children}</div>;
}
