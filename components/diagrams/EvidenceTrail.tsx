'use client';

import { m, useReducedMotion } from 'framer-motion';
import { GitCompareArrows, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * A single finding's evidence trail, zoomed in - a second, distinct
 * illustrative mock alongside DashboardPreview so the "what does the output
 * actually look like" claim isn't carried by one visual alone. Where
 * DashboardPreview shows the ranked worklist, this shows what happens when an
 * engineer opens one item: the specific evidence and confidence behind it.
 * Same honesty rule as DashboardPreview - not a screenshot, a design-forward
 * mock, using the same brand tokens (no off-palette color).
 */

const EVIDENCE = [
  { label: 'Thermal delta', value: '+4.2°C vs. cycle 06', match: true },
  { label: 'Positional alignment', value: 'Confirmed, same segment', match: true },
  { label: 'Surface change', value: 'Present, both passes', match: true },
];

export function EvidenceTrail({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-squircle border border-line bg-card shadow-xl shadow-black/20',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="mono-label">Finding CH-042 · KM 118.4</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-sans text-[0.65rem] font-semibold text-accent">
          <ShieldCheck className="h-3 w-3" aria-hidden /> High confidence
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-[1fr_1fr]">
        {/* Evidence list */}
        <div className="bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Why this was flagged
          </p>
          <div className="mt-4 space-y-3">
            {EVIDENCE.map((e, i) => (
              <m.div
                key={e.label}
                initial={reduce ? undefined : { opacity: 0, x: -6 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={reduce ? undefined : { delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-2.5 text-sm"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <span className="block font-medium text-ink">{e.label}</span>
                  <span className="text-ink-muted">{e.value}</span>
                </span>
              </m.div>
            ))}
          </div>
        </div>

        {/* Cycle comparison */}
        <div className="bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <GitCompareArrows className="h-3.5 w-3.5" aria-hidden /> Cycle-over-cycle
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-tile border border-line bg-surface p-3">
              <p className="text-[0.65rem] text-ink-faint">Cycle 06</p>
              <p className="mt-1 text-sm font-semibold text-ink">Baseline</p>
            </div>
            <div className="rounded-tile border border-accent/30 bg-accent/[0.06] p-3">
              <p className="text-[0.65rem] text-ink-faint">Cycle 07</p>
              <p className="mt-1 text-sm font-semibold text-accent">+21% change</p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Every number here traces back to a specific signal - an engineer can open the source
            evidence, not just trust the score.
          </p>
        </div>
      </div>
    </div>
  );
}
