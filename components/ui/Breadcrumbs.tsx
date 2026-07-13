import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/lib/schema';

/** Visible breadcrumb trail. Pair with breadcrumbSchema() for JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-ink-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-ink-secondary" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-accent">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight className="h-3 w-3 text-line-strong" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
