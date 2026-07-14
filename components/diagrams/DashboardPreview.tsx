'use client';

import { m, useReducedMotion } from 'framer-motion';
import { LayoutGrid, Map, FileCheck2, Settings, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Illustrative Sentrix dashboard mock - the prioritised-target view an operator
 * would work from. Not a screenshot of a shipped product; a design-forward
 * representation of the platform's core output, built to read as a genuine
 * piece of software (sidebar, topbar, real data density) rather than a
 * decorative diagram. This mock intentionally stays dark regardless of the
 * site's light/dark setting, the way a real product screenshot embedded in a
 * light marketing page would (e.g. Linear, Vercel) - it is a "device", not
 * page chrome.
 */

type Target = {
  rank: number;
  seg: string;
  risk: number;
  change: string;
  sev: 'high' | 'med' | 'low';
};

const TARGETS: Target[] = [
  { rank: 1, seg: 'CH-042 · KM 118.4', risk: 94, change: '+21%', sev: 'high' },
  { rank: 2, seg: 'CH-017 · KM 63.9', risk: 81, change: '+12%', sev: 'high' },
  { rank: 3, seg: 'CH-088 · KM 204.1', risk: 66, change: '+7%', sev: 'med' },
  { rank: 4, seg: 'CH-051 · KM 141.7', risk: 48, change: '+3%', sev: 'med' },
  { rank: 5, seg: 'CH-023 · KM 79.2', risk: 29, change: '−1%', sev: 'low' },
];

const SEV_BG: Record<Target['sev'], string> = {
  high: 'bg-[#C41F2B]',
  med: 'bg-[#E1A23A]',
  low: 'bg-[#5A5A64]',
};

const NAV_ITEMS = [
  { icon: LayoutGrid, label: 'Prioritise', active: true },
  { icon: Map, label: 'Map', active: false },
  { icon: FileCheck2, label: 'Compliance', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

/**
 * Semicircular gauge with a needle computed by trigonometry (not a CSS
 * rotate-transform), so the angle-to-value mapping is unambiguous and easy to
 * verify: value 0 -> needle points left (arc start), value 100 -> needle
 * points right (arc end), value 50 -> needle points straight up.
 */
function Gauge({ value, reduce }: { value: number; reduce: boolean | null }) {
  const cx = 60;
  const cy = 60;
  const arcR = 46;
  const needleLen = 34;
  const clamped = Math.max(0, Math.min(100, value));

  // 0 -> 180deg (pointing left), 100 -> 0deg (pointing right), standard
  // math convention (0deg = +x/right, CCW positive) measured from +x axis.
  const angleDeg = 180 - (clamped / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const tipX = cx + needleLen * Math.cos(angleRad);
  const tipY = cy - needleLen * Math.sin(angleRad); // SVG y grows downward

  const circumference = Math.PI * arcR; // half-circle length
  const arcPath = `M ${cx - arcR} ${cy} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${cy}`;

  return (
    <svg viewBox="0 0 120 68" className="w-full overflow-visible">
      <path d={arcPath} fill="none" stroke="#2A2A30" strokeWidth="9" strokeLinecap="round" />
      <path
        d={arcPath}
        fill="none"
        stroke="#C41F2B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (circumference * clamped) / 100}
      />
      <m.line
        x1={cx}
        y1={cy}
        x2={tipX}
        y2={tipY}
        stroke="#F5F5F4"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? undefined : { x2: cx - needleLen, y2: cy }}
        whileInView={reduce ? undefined : { x2: tipX, y2: tipY }}
        viewport={{ once: true }}
        transition={reduce ? undefined : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle cx={cx} cy={cy} r="4.5" fill="#F5F5F4" />
      <circle cx={cx} cy={cy} r="2" fill="#0A0A0B" />
    </svg>
  );
}

export function DashboardPreview({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-squircle border border-[#26262B] bg-[#0B0B0D] shadow-2xl shadow-black/50',
        className,
      )}
    >
      {/* Window chrome - reinforces "this is a real application" */}
      <div className="flex items-center gap-3 border-b border-[#212126] bg-[#111113] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A40]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A40]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A40]" />
        </div>
        <div className="flex-1 rounded-md bg-[#18181B] px-3 py-1 text-center text-[0.68rem] text-[#6B6B72]">
          app.leaksonic.com/console
        </div>
      </div>

      <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[180px_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col gap-1 border-r border-[#212126] bg-[#0E0E10] p-2 sm:p-3">
          <div className="mb-2 hidden items-center gap-2 px-1 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#C41F2B]" />
            <span className="text-xs font-semibold text-[#F5F5F4]">Sentrix</span>
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs',
                  item.active ? 'bg-[#1D1D21] text-[#F5F5F4]' : 'text-[#6B6B72]',
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="hidden truncate sm:inline">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main pane */}
        <div className="min-w-0">
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-[#212126] px-4 py-2.5">
            <div className="flex items-center gap-2 text-[0.68rem] text-[#6B6B72]">
              <Search className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Cycle 07 · updated 2h ago</span>
              <span className="sm:hidden">Cycle 07</span>
            </div>
            <Bell className="h-3.5 w-3.5 text-[#6B6B72]" aria-hidden />
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#212126] md:grid-cols-[1.5fr_minmax(0,1fr)]">
            {/* Ranked targets */}
            <div className="min-w-0 bg-[#0B0B0D] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-[#8A8A92]">
                  Prioritised inspection targets
                </span>
                <span className="text-[0.65rem] text-[#5A5A62]">312 km scanned</span>
              </div>
              <div className="space-y-1.5">
                {TARGETS.map((t, i) => (
                  <m.div
                    key={t.rank}
                    initial={reduce ? undefined : { opacity: 0, x: -8 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={reduce ? undefined : { delay: i * 0.08, duration: 0.4 }}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border px-3 py-2',
                      t.rank === 1
                        ? 'border-[#C41F2B]/40 bg-[#C41F2B]/[0.07]'
                        : 'border-[#212126] bg-[#111113]',
                    )}
                  >
                    <span className="w-4 text-xs text-[#6B6B72]">{t.rank}</span>
                    <span className="flex-1 truncate text-[0.72rem] text-[#E4E4E6]">{t.seg}</span>
                    <span className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-[#212126] sm:block">
                      <m.span
                        className={cn('block h-full', SEV_BG[t.sev])}
                        initial={reduce ? undefined : { width: 0 }}
                        whileInView={reduce ? undefined : { width: `${t.risk}%` }}
                        viewport={{ once: true }}
                        transition={reduce ? undefined : { delay: 0.2 + i * 0.08, duration: 0.6 }}
                      />
                    </span>
                    <span className="w-8 text-right text-xs font-semibold text-[#F5F5F4]">
                      {t.risk}
                    </span>
                    <span
                      className={cn(
                        'w-10 text-right text-[0.68rem]',
                        t.change.startsWith('+') ? 'text-[#C41F2B]' : 'text-[#6B6B72]',
                      )}
                    >
                      {t.change}
                    </span>
                  </m.div>
                ))}
              </div>
            </div>

            {/* Risk + mini map */}
            <div className="flex min-w-0 flex-col gap-4 bg-[#0B0B0D] p-4">
              <div className="min-w-0">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-[#8A8A92]">
                  Network risk index
                </span>
                <div className="mt-2 flex items-end gap-2">
                  <div className="w-16 shrink-0">
                    <Gauge value={72} reduce={reduce} />
                  </div>
                  <div className="min-w-0 pb-1">
                    <div className="text-2xl font-semibold text-[#C41F2B]">72</div>
                    <div className="truncate text-[0.62rem] text-[#6B6B72]">elevated</div>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-[#8A8A92]">
                  Corridor
                </span>
                <svg
                  viewBox="0 0 200 90"
                  className="mt-2 block h-24 w-full sm:h-28"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <rect width="200" height="90" rx="6" fill="#111113" stroke="#212126" />
                  <path
                    d="M12 70 Q60 20 110 46 T188 30"
                    fill="none"
                    stroke="#3A3A42"
                    strokeWidth="2"
                  />
                  {[
                    { x: 60, y: 33, sev: 'high' },
                    { x: 110, y: 46, sev: 'med' },
                    { x: 160, y: 35, sev: 'low' },
                  ].map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={
                          p.sev === 'high' ? '#C41F2B' : p.sev === 'med' ? '#E1A23A' : '#5A5A64'
                        }
                      />
                      {p.sev === 'high' && !reduce && (
                        <m.circle
                          cx={p.x}
                          cy={p.y}
                          r="4"
                          fill="none"
                          stroke="#C41F2B"
                          strokeWidth="1.2"
                          initial={{ opacity: 0, scale: 1 }}
                          animate={{ opacity: [0, 0.8, 0], scale: [1, 2.6, 2.6] }}
                          transition={{ duration: 2.4, repeat: Infinity }}
                          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              <button
                className="w-full shrink-0 rounded-xl bg-[#C41F2B] px-2 py-2.5 text-center text-[0.62rem] font-semibold uppercase leading-tight tracking-wide text-white"
                type="button"
                tabIndex={-1}
              >
                Export compliance report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
