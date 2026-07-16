'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, RotateCcw, Satellite, Thermometer, Droplets, Gauge } from 'lucide-react';
import type { SimStep, Telemetry } from './drone-sim/Scene';

const DroneSimScene = dynamic(
  () => import('./drone-sim/Scene').then((m) => m.DroneSimScene),
  { ssr: false },
);

type StepConfig = { label: string; caption: string; durationMs: number };

const STEPS: StepConfig[] = [
  {
    label: 'Manual patrol',
    caption:
      'Today, most rights-of-way are still walked on foot with a handheld gas detector. It works - but it is slow, it covers a small stretch at a time, and it depends on who is walking and what they happen to notice.',
    durationMs: 5200,
  },
  {
    label: 'Drone launch',
    caption:
      'The same corridor, flown. GPS and RTK positioning lock the flight path to the known pipeline centreline, so every metre of evidence is located precisely - not estimated from a landmark.',
    durationMs: 4400,
  },
  {
    label: 'Mapping the ROW',
    caption:
      'The right-of-way is more than the pipe - vegetation, crops, and roads nearby all matter to what the drone is looking at and why. Evidence is logged against the actual corridor, not a generic flight path.',
    durationMs: 4600,
  },
  {
    label: 'Anomalies flagged',
    caption:
      'Two different kinds of finding, flagged as candidates, not conclusions: equipment working close to the right-of-way, and a thermal signature consistent with a leak - exactly the surface signals a foot patrol could miss or reach hours later.',
    durationMs: 4200,
  },
  {
    label: 'Sentrix: evidence to decision',
    caption:
      'Both findings are standardised, compared against the last cycle, and routed to the decision layer - the same evidence an engineer will review, not a black-box score.',
    durationMs: 3600,
  },
  {
    label: 'The decision',
    caption:
      'Findings reach an engineer’s desk ranked by priority, with evidence attached and synced to the systems they already use - GPS-located, timestamped, ready to act on.',
    durationMs: 7000,
  },
];

const CORRIDOR_KM = 12.4;
const MANUAL_HOURS = 6.5;
const MANUAL_KM = 1.2;
const DRONE_MINUTES = 9;
const FLIGHT_STEP_COUNT = STEPS.length - 1;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

/** Interactive 3D explainer for the evidence-to-decision flow described
 * elsewhere on the site as text and a 2D flow diagram - built around a
 * deliberate before/after contrast: today's manual foot patrol, then the
 * same corridor flown, mapped, and resolved into a prioritised decision.
 * Deliberately low-poly and unlit so it stays smooth on a mid-range phone:
 * no shadows, no textures, capped device-pixel-ratio, and the whole thing
 * only mounts once it scrolls into view and the 3D library has loaded. */
export function DroneSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [step, setStep] = useState<SimStep>(0);
  const [playing, setPlaying] = useState(true);
  const [stepStart, setStepStart] = useState<number>(Date.now());
  const [stepProgress, setStepProgress] = useState(0);
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    setPlaying(!mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Drives the within-step progress bar/counters. This always ticks, even
  // while paused or after jumping to a step via the chips below - only
  // whether it auto-*advances* to the next step depends on `playing`.
  useEffect(() => {
    const duration = STEPS[step]!.durationMs;
    const id = setInterval(() => {
      const elapsed = Date.now() - stepStart;
      const p = Math.min(1, elapsed / duration);
      setStepProgress(p);
      if (p >= 1 && playing) {
        setStep((s) => ((s + 1) % STEPS.length) as SimStep);
      }
    }, 100);
    return () => clearInterval(id);
  }, [playing, step, stepStart]);

  useEffect(() => {
    setStepStart(Date.now());
    setStepProgress(0);
  }, [step]);

  function goToStep(i: number) {
    setStep(i as SimStep);
    setPlaying(false);
  }

  function restart() {
    setStep(0);
    setPlaying(true);
  }

  const manualHours = lerp(0, MANUAL_HOURS, stepProgress);
  const manualKm = lerp(0, MANUAL_KM, stepProgress);
  // Single source of truth for "how far along the corridor has the drone
  // actually gotten" - drives the HUD counter, the 3D drone's position, and
  // when each finding is revealed, so all three always agree.
  const flightProgress = step >= 1 ? ((step - 1) + stepProgress) / FLIGHT_STEP_COUNT : 0;
  const droneKm = flightProgress * CORRIDOR_KM;

  return (
    <div ref={containerRef} className="overflow-hidden rounded-squircle border border-line bg-card">
      <div className="relative aspect-square w-full sm:aspect-video">
        {inView ? (
          <DroneSimScene
            step={step}
            flightProgress={flightProgress}
            reducedMotion={reducedMotion}
            onTelemetry={setTelemetry}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-base">
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-faint">
              Loading simulation…
            </span>
          </div>
        )}

        {/* Telemetry HUD - top-left, plain HTML so it stays sharp at any
            zoom and never competes with the WebGL canvas for layout. Small
            and fixed-width even on mobile, so it never eats much of the
            3D view. */}
        <div className="pointer-events-none absolute left-2 top-2 w-32 rounded-squircle border border-line bg-base/90 p-2 backdrop-blur-sm sm:left-4 sm:top-4 sm:w-44 sm:p-2.5">
          {step === 0 ? (
            <>
              <HudRow icon={Gauge} label="Elapsed" value={`${manualHours.toFixed(1)} hrs`} />
              <HudRow icon={Satellite} label="Covered" value={`${manualKm.toFixed(2)} km`} />
              <HudRow icon={Thermometer} label="Crew" value="1, on foot" />
            </>
          ) : (
            <>
              <HudRow
                icon={Satellite}
                label="GPS"
                value={telemetry ? `${telemetry.lat.toFixed(3)}°N ${telemetry.lon.toFixed(3)}°E` : '—'}
              />
              <HudRow
                icon={Gauge}
                label="Alt / speed"
                value={telemetry ? `${telemetry.altitudeM.toFixed(0)}m · ${telemetry.speedKmh.toFixed(0)}km/h` : '—'}
              />
              <HudRow
                icon={Thermometer}
                label="Temp / RH"
                value={telemetry ? `${telemetry.tempC.toFixed(1)}°C · ${telemetry.humidityPct.toFixed(0)}%` : '—'}
              />
              <HudRow icon={Droplets} label="Covered" value={`${droneKm.toFixed(1)}/${CORRIDOR_KM}km`} />
            </>
          )}
        </div>

        {/* Step caption, overlaid bottom-left. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-base/95 via-base/60 to-transparent p-3 sm:p-6">
          <span className="font-sans text-[0.64rem] uppercase tracking-[0.14em] text-accent sm:text-[0.68rem]">
            Step {step + 1} of {STEPS.length} · {STEPS[step]!.label}
          </span>
          <p className="mt-1.5 max-w-md text-xs leading-snug text-ink-secondary sm:text-sm">
            {STEPS[step]!.caption}
          </p>
        </div>

        {/* Dashboard payoff card - final step only, desktop/tablet: an
            overlay in the top-right corner, out of the HUD's way. */}
        {step === 5 && (
          <div className="absolute right-4 top-4 hidden w-64 sm:block">
            <FindingsCard />
          </div>
        )}
      </div>

      {/* Dashboard payoff card - final step only, mobile: a normal block
          under the canvas instead of an overlay, so it never competes with
          the HUD or covers most of the 3D view on a small screen. */}
      {step === 5 && (
        <div className="border-t border-line bg-surface p-3 sm:hidden">
          <FindingsCard />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface p-2.5 sm:gap-3 sm:p-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-secondary transition-colors hover:border-accent/50 hover:text-accent"
          aria-label={playing ? 'Pause simulation' : 'Play simulation'}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          onClick={restart}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-secondary transition-colors hover:border-accent/50 hover:text-accent"
          aria-label="Restart simulation"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <div className="flex flex-1 flex-wrap gap-1.5">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => goToStep(i)}
              className={`rounded-full border px-2.5 py-1 font-sans text-[0.64rem] font-medium transition-colors sm:px-3 sm:text-[0.7rem] ${
                step === i
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-line text-ink-muted hover:border-line-strong hover:text-ink-secondary'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <p className="border-t border-line bg-surface px-3 py-2.5 text-center font-sans text-[0.64rem] text-ink-faint sm:px-6 sm:text-[0.68rem]">
        Illustrative, time-lapsed simulation - drag to orbit, tap a step to jump to it. Coordinates,
        timings, and the findings shown are for demonstration only, not a real network or engagement.
      </p>
    </div>
  );
}

function HudRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Satellite;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-1.5 py-0.5">
      <Icon className="mt-0.5 h-2.5 w-2.5 shrink-0 text-accent" aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="font-sans text-[0.52rem] uppercase leading-tight tracking-[0.06em] text-ink-faint">
          {label}
        </div>
        <div className="truncate font-sans text-[0.62rem] font-medium leading-tight text-ink-secondary">
          {value}
        </div>
      </div>
    </div>
  );
}

/** The "prioritised findings" payoff content, shared between the desktop
 * overlay placement and the mobile in-flow placement so the two never
 * drift out of sync. */
function FindingsCard() {
  return (
    <div className="rounded-squircle border border-accent/40 bg-card/95 p-3 shadow-xl backdrop-blur-sm sm:p-3.5">
      <span className="font-sans text-[0.62rem] uppercase tracking-[0.1em] text-accent">
        Prioritised findings
      </span>
      <div className="mt-2 space-y-2">
        <FindingRow title="Leak signature" severity="High" action="Schedule excavation crew" accent />
        <FindingRow title="ROW encroachment" severity="Medium" action="Site visit within 48 hrs" />
      </div>
      <div className="mt-2.5 border-t border-line pt-2 text-[0.62rem] leading-relaxed text-ink-faint">
        Manual: ~{MANUAL_HOURS}hrs / {MANUAL_KM}km. Sentrix: ~{DRONE_MINUTES}min / full {CORRIDOR_KM}km.
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-line pt-2 text-[0.62rem] font-medium text-ink-secondary">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        Synced to your GIS / asset-management system
      </div>
    </div>
  );
}

function FindingRow({
  title,
  severity,
  action,
  accent,
}: {
  title: string;
  severity: string;
  action: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-full border border-line bg-base/60 px-3 py-1.5 sm:px-3.5 sm:py-2">
      <div className="flex items-center justify-between gap-1.5">
        <span className="font-sans text-[0.6rem] font-semibold text-ink sm:text-[0.68rem]">
          {title}
        </span>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 font-sans text-[0.5rem] font-semibold sm:text-[0.56rem] ${
            accent ? 'bg-accent/15 text-accent' : 'bg-amber-500/15 text-amber-400'
          }`}
        >
          {severity}
        </span>
      </div>
      <p className="mt-0.5 text-[0.56rem] leading-snug text-ink-muted sm:text-[0.62rem]">{action}</p>
    </div>
  );
}
