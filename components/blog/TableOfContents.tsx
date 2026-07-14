'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import type { TocEntry } from '@/lib/blog';

/**
 * Sticky, scroll-spy table of contents for long-form posts. Shown as a sidebar
 * on large screens only (the article stays single-column and full-width on
 * mobile). Highlights the heading currently in view and smooth-scrolls on
 * click. Purely a navigation aid - the content is unaffected if JS is off.
 */
export function TableOfContents({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently intersecting the upper band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Trigger band sits just below the sticky navbar, near the top third.
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mono-label mb-4">On this page</p>
      <ul className="space-y-2 border-l border-line">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-px block border-l-2 py-0.5 pl-4 leading-snug transition-colors',
                activeId === item.id
                  ? 'border-accent font-medium text-accent'
                  : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
