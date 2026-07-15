import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export type Reference = { label: string; href: string; note: string; external?: boolean };

/** Citation list grounding a tool's methodology - internal blog posts plus
 * the external standards bodies the underlying logic draws on. External
 * links go to the standards body's homepage, not a claimed specific page,
 * so nothing here asserts a citation we can't stand behind. */
export function References({ items }: { items: Reference[] }) {
  return (
    <div className="rounded-card border border-line bg-card p-5">
      <div className="flex items-center gap-2 text-ink-muted">
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em]">
          References & further reading
        </span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {items.map((ref) =>
          ref.external ? (
            <li key={ref.href}>
              <a
                href={ref.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
              >
                {ref.label}
                <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
              </a>
              <p className="text-xs text-ink-muted">{ref.note}</p>
            </li>
          ) : (
            <li key={ref.href}>
              <Link
                href={ref.href}
                className="text-sm font-medium text-accent hover:text-accent-hover"
              >
                {ref.label}
              </Link>
              <p className="text-xs text-ink-muted">{ref.note}</p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
