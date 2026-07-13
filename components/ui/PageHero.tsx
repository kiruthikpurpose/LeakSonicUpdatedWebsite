import { Breadcrumbs } from './Breadcrumbs';
import { SectionLabel } from './SectionLabel';
import type { Crumb } from '@/lib/schema';

/** Consistent inner-page hero used by every route except the homepage. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container-content relative py-16 sm:py-20">
        <Breadcrumbs crumbs={crumbs} />
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-5 max-w-4xl text-display font-extrabold text-ink">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">{lead}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
