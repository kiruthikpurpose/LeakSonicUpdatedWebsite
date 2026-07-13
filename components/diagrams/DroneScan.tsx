'use client';

import { m, useReducedMotion } from 'framer-motion';

/**
 * Animated hero visual: a drone traversing a pipeline right-of-way, its scan
 * cone sweeping the corridor while buried anomalies pulse as it passes. Pure
 * SVG + transform/opacity animation (GPU-friendly), reduced-motion aware.
 * Palette: white / red / black only.
 */

const ANOMALIES = [
  { x: 250, sev: 'low' },
  { x: 430, sev: 'high' },
  { x: 610, sev: 'med' },
];

const SEV_COLOR: Record<string, string> = {
  low: '#4A4A52',
  med: '#E1A23A',
  high: '#C41F2B',
};

export function DroneScan({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 800 400" className="h-full w-full">
        <defs>
          <linearGradient id="ds-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C41F2B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C41F2B" stopOpacity="0" />
          </linearGradient>
          <pattern id="ds-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#18181B" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="800" height="400" fill="url(#ds-grid)" />

        {/* Ground line */}
        <line x1="0" y1="250" x2="800" y2="250" stroke="#2A2A30" strokeWidth="1.5" />
        {/* Sky/ground faint split label */}
        <text x="16" y="242" className="fill-ink-faint font-sans" fontSize="10" letterSpacing="1">
          SURFACE · RIGHT-OF-WAY
        </text>
        <text x="16" y="272" className="fill-ink-faint font-sans" fontSize="10" letterSpacing="1">
          BURIED PIPELINE
        </text>

        {/* Buried pipeline */}
        <line
          x1="0"
          y1="300"
          x2="800"
          y2="300"
          stroke="#3A3A42"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="300"
          x2="800"
          y2="300"
          stroke="#0A0A0B"
          strokeWidth="2"
          strokeDasharray="2 10"
        />

        {/* Anomalies buried on the line */}
        {ANOMALIES.map((a, i) => (
          <g key={i}>
            <line
              x1={a.x}
              y1="250"
              x2={a.x}
              y2="300"
              stroke="#26262B"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <m.circle
              cx={a.x}
              cy={300}
              r="6"
              fill={SEV_COLOR[a.sev]}
              initial={reduce ? undefined : { opacity: 0.25 }}
              animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 6, times: [0, 0.5, 1], repeat: Infinity, delay: (a.x / 800) * 6 }
              }
            />
            {a.sev === 'high' && !reduce && (
              <m.circle
                cx={a.x}
                cy={300}
                r="6"
                fill="none"
                stroke="#C41F2B"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.7, 0], scale: [1, 3, 3] }}
                transition={{ duration: 6, repeat: Infinity, delay: (a.x / 800) * 6 }}
                style={{ transformOrigin: `${a.x}px 300px` }}
              />
            )}
          </g>
        ))}

        {/* Drone group - sweeps left to right */}
        <m.g
          initial={reduce ? { x: 400 } : { x: 40 }}
          animate={reduce ? { x: 400 } : { x: [40, 720, 40] }}
          transition={reduce ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* scan cone */}
          <path d="M0 120 L-70 250 L70 250 Z" fill="url(#ds-beam)" />
          <line
            x1="0"
            y1="120"
            x2="-70"
            y2="250"
            stroke="#C41F2B"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <line
            x1="0"
            y1="120"
            x2="70"
            y2="250"
            stroke="#C41F2B"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* sweeping scan line */}
          {!reduce && (
            <m.line
              x1="-70"
              x2="70"
              stroke="#C41F2B"
              strokeWidth="1.5"
              initial={{ y1: 250, y2: 250, opacity: 0 }}
              animate={{ y1: [140, 250], y2: [140, 250], opacity: [0.9, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* drone body */}
          <g transform="translate(0,110)">
            <rect x="-18" y="-6" width="36" height="12" rx="3" fill="#F5F5F4" />
            <rect x="-6" y="-3" width="12" height="6" rx="1.5" fill="#C41F2B" />
            {/* arms */}
            <line x1="-18" y1="0" x2="-34" y2="-10" stroke="#8A8A90" strokeWidth="2" />
            <line x1="18" y1="0" x2="34" y2="-10" stroke="#8A8A90" strokeWidth="2" />
            {/* rotors */}
            {[-34, 34].map((rx) => (
              <g key={rx} transform={`translate(${rx},-12)`}>
                <m.ellipse
                  rx="14"
                  ry="2.5"
                  fill="#C4C4C6"
                  fillOpacity="0.7"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={
                    reduce ? undefined : { duration: 0.12, repeat: Infinity, ease: 'linear' }
                  }
                  style={{ transformOrigin: 'center' }}
                />
                <circle r="2" fill="#F5F5F4" />
              </g>
            ))}
          </g>
        </m.g>

        {/* Corner telemetry readout */}
        <g>
          <rect x="596" y="24" width="188" height="52" rx="4" fill="#0F0F11" stroke="#26262B" />
          <text x="608" y="44" className="fill-ink-muted font-sans" fontSize="10">
            EVIDENCE · ALIGNED
          </text>
          <text x="608" y="62" className="fill-accent font-sans" fontSize="10">
            STATUS: REVIEWING
          </text>
          {!reduce && (
            <m.circle
              cx="770"
              cy="40"
              r="3"
              fill="#C41F2B"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
