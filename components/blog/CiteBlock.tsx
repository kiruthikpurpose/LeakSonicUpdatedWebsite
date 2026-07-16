'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SITE } from '@/lib/site';

/**
 * Citation + backlink block shown at the foot of every article. Makes it
 * trivial for a researcher, journalist, or fellow blogger to cite the piece
 * correctly and link back to it - the single highest-leverage thing an
 * article can do to earn inbound links is make linking back effortless.
 */
export function CiteBlock({
  title,
  slug,
  author,
  date,
}: {
  title: string;
  slug: string;
  author: string;
  date: string;
}) {
  const url = `${SITE.url}/blog/${slug}`;
  const year = new Date(date).getFullYear();
  const citationText = `${author}. "${title}." ${SITE.legalName}, ${year}. ${url}`;
  const embedHtml = `<a href="${url}" target="_blank" rel="noopener">${title}</a> - via ${SITE.name}`;

  return (
    <div className="mt-9 grid grid-cols-1 gap-4 rounded-card border border-line bg-card p-5 sm:grid-cols-2">
      <CopyField label="Cite this article" value={citationText} />
      <CopyField label="Link back to this article" value={embedHtml} mono />
    </div>
  );
}

function CopyField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable - silently no-op, the text is still selectable.
    }
  }

  return (
    <div>
      <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </span>
      <div className="mt-2 flex items-start gap-2 rounded-tile border border-line bg-surface p-3">
        <p
          className={`flex-1 text-xs leading-relaxed text-ink-secondary ${mono ? 'font-mono' : ''}`}
        >
          {value}
        </p>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-line px-2 py-1 text-[0.68rem] font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
