'use client';

import { m, useReducedMotion } from 'framer-motion';

export type StepperItem = { n: string; label: string; status: 'in-progress' | 'done' };

/**
 * Visual progress-tracker for the five assumptions under test - a labelled
 * connector line with numbered nodes, matching the site's precision-diagram
 * language (thin lines, blueprint corner marks) rather than a wall of cards.
 * The line itself fills in on scroll to read as active, ongoing validation
 * work rather than a static checklist.
 */
export function ValidationStepper({ items }: { items: StepperItem[] }) {
  const reduce = useReducedMotion();
  const n = items.length;
  const w = 900;
  const pad = 100;
  const usable = w - pad * 2;
  const stepX = (i: number) => pad + (usable * i) / (n - 1);
  const y = 46;
  const labelW = 168;

  return (
    <figure className="overflow-hidden rounded-squircle border border-line bg-card p-6 sm:p-10">
      <svg
        viewBox={`0 0 ${w} 150`}
        className="w-full"
        role="img"
        aria-label="Validation progress across five assumptions, all currently in progress"
      >
        {/* blueprint corner marks */}
        <line x1="14" y1="14" x2="34" y2="14" stroke="#C41F2B" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="14" y2="34" stroke="#C41F2B" strokeWidth="1.5" />
        <line x1={w - 14} y1="14" x2={w - 34} y2="14" stroke="#C41F2B" strokeWidth="1.5" />
        <line x1={w - 14} y1="14" x2={w - 14} y2="34" stroke="#C41F2B" strokeWidth="1.5" />

        {/* base connector line */}
        <line x1={stepX(0)} y1={y} x2={stepX(n - 1)} y2={y} stroke="#26262B" strokeWidth="2" />

        {/* animated "active work" fill - not a completion bar, a pulse showing motion */}
        {!reduce && (
          <m.line
            x1={stepX(0)}
            y1={y}
            x2={stepX(0)}
            y2={y}
            stroke="#C41F2B"
            strokeWidth="2"
            strokeDasharray="10 8"
            initial={{ x2: stepX(0) }}
            whileInView={{ x2: stepX(n - 1) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {items.map((item, i) => (
          <g key={item.n}>
            <m.circle
              cx={stepX(i)}
              cy={y}
              r="16"
              fill="#141417"
              stroke="#C41F2B"
              strokeWidth="2"
              initial={reduce ? undefined : { scale: 0.6, opacity: 0 }}
              whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={reduce ? undefined : { delay: 0.12 * i, duration: 0.4 }}
            />
            {!reduce && (
              <m.circle
                cx={stepX(i)}
                cy={y}
                r="16"
                fill="none"
                stroke="#C41F2B"
                strokeWidth="1.5"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.6, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3 }}
                style={{ transformOrigin: `${stepX(i)}px ${y}px` }}
              />
            )}
            <text
              x={stepX(i)}
              y={y + 5}
              textAnchor="middle"
              className="fill-ink font-sans"
              fontSize="13"
              fontWeight="700"
            >
              {item.n}
            </text>
            <foreignObject x={stepX(i) - labelW / 2} y={y + 28} width={labelW} height="72">
              <div className="text-center text-[10.5px] leading-tight text-ink-muted">
                {item.label}
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 text-center text-xs text-ink-faint">
        All five assumptions are currently in progress. Status updates here as each test concludes.
      </figcaption>
    </figure>
  );
}
