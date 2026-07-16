'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SITE } from '@/lib/site';

/**
 * A copyable "powered by" badge and citation snippet for a free tool -
 * lets anyone who uses the tool on their own site or in a report link back
 * to it properly. The single highest-leverage lever a free tool has for
 * earning genuine inbound links is making that linking effortless.
 */
export function EmbedBadge({ name, slug }: { name: string; slug: string }) {
  const url = `${SITE.url}${slug}`;
  const badgeHtml = `<a href="${url}" target="_blank" rel="noopener">Calculated with ${SITE.name}'s ${name} ↗</a>`;
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(badgeHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable - text stays selectable in the field.
    }
  }

  return (
    <div className="rounded-card border border-line bg-card p-5">
      <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
        Using this on your own site or in a report?
      </span>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
        Copy this snippet to credit and link back to the tool.
      </p>
      <div className="mt-3 flex items-start gap-2 rounded-tile border border-line bg-surface p-3">
        <p className="flex-1 break-all font-mono text-xs leading-relaxed text-ink-secondary">
          {badgeHtml}
        </p>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-line px-2 py-1 text-[0.68rem] font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Copy embed snippet"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
