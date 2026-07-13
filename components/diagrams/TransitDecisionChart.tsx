'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { Plane, ClipboardCheck } from 'lucide-react';

/**
 * The "20% transit / 80% decision" reframe. A horizontal bar shows the split;
 * labels live in a legend row below the bar (never inside/under the segments)
 * so they can never overlap regardless of how narrow a segment is. Numbers
 * count up on scroll-into-view and a small marker pulses at the boundary for
 * a touch of life, all gated behind prefers-reduced-motion.
 */

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

export function TransitDecisionChart({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const active = !!inView || !!reduce;

  const transitCount = useCountUp(20, active);
  const decisionCount = useCountUp(80, active);
  const displayTransit = reduce ? 20 : transitCount;
  const displayDecision = reduce ? 80 : decisionCount;

  const barX = 40;
  const barW = 720;
  const transitW = (barW * 20) / 100;

  return (
    <figure className={className} ref={ref}>
      <svg
        viewBox="0 0 800 150"
        className="w-full"
        role="img"
        aria-label="An inspection cycle split into roughly 20 percent data collection and transit, and roughly 80 percent decision-making: reviewing imagery, prioritising targets, and reporting."
      >
        <defs>
          <pattern
            id="hatch"
            width="6"
            height="6"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke="#33333A" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Transit segment */}
        <m.rect
          x={barX}
          y="46"
          height="58"
          rx="10"
          fill="url(#hatch)"
          stroke="#33333A"
          strokeWidth="1"
          initial={reduce ? undefined : { width: 0 }}
          animate={active && !reduce ? { width: transitW } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          width={reduce ? transitW : undefined}
        />
        {/* Decision segment - the emphasised one, carries the accent */}
        <m.rect
          x={barX + transitW}
          y="46"
          height="58"
          rx="10"
          fill="#C41F2B"
          initial={reduce ? undefined : { width: 0 }}
          animate={active && !reduce ? { width: barW - transitW } : undefined}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          width={reduce ? barW - transitW : undefined}
        />

        {/* Boundary marker - a small pulsing ring for a sense of life */}
        {!reduce && (
          <>
            <m.circle
              cx={barX + transitW}
              cy="75"
              r="4"
              fill="#F5F5F4"
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
            <m.circle
              cx={barX + transitW}
              cy="75"
              r="4"
              fill="none"
              stroke="#F5F5F4"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 1 }}
              animate={active ? { opacity: [0, 0.6, 0], scale: [1, 3.2, 3.2] } : undefined}
              transition={{ duration: 1.8, delay: 1, repeat: Infinity, repeatDelay: 1.4 }}
              style={{ transformOrigin: `${barX + transitW}px 75px` }}
            />
          </>
        )}
      </svg>

      {/* Legend row - fixed two-column layout, independent of bar segment width
          so labels can never collide regardless of the 20/80 proportion. */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
        <div className="flex items-start gap-3 rounded-squircle border border-line bg-card p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-ink-muted">
            <Plane className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <div className="text-2xl font-bold tabular-nums text-ink">{displayTransit}%</div>
            <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
              Flight · data collection
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-squircle border border-accent/30 bg-accent/[0.06] p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile border border-accent/30 bg-accent/10 text-accent">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <div className="text-2xl font-bold tabular-nums text-ink">{displayDecision}%</div>
            <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-ink-secondary">
              Review · prioritisation · reporting
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Most of an inspection cycle is not spent flying - it is spent turning raw imagery and sensor
        data into decisions. Sentrix targets that 80%: the review, prioritisation, and reporting
        where time and judgement actually go.
      </figcaption>
    </figure>
  );
}
