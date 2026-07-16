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
    durationMs: 4200,
  },
  {
    label: 'Anomaly detected',
    caption:
      'A thermal and visual signature consistent with a leak is flagged as a candidate, not a conclusion - exactly the kind of surface signal a foot patrol could easily miss or reach hours later.',
    durationMs: 3600,
  },
  {
    label: 'Sentrix: evidence to decision',
    caption:
      'Evidence is standardised, compared against the last cycle, and routed to the decision layer - the same evidence an engineer will review, not a black-box score.',
    durationMs: 3600,
  },
  {
    label: 'The decision',
    caption:
      'One prioritised finding, with its evidence attached, reaches an engineer’s desk - GPS-located, timestamped, ready to act on.',
    durationMs: 6000,
  },
];

const CORRIDOR_KM = 12.4;
const MANUAL_HOURS = 6.5;
const MANUAL_KM = 1.2;
const DRONE_MINUTES = 9;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

/** Interactive 3D explainer for the evidence-to-decision flow described
 * elsewhere on the site as text and a 2D flow diagram - built around a
 * deliberate before/after contrast: today's manual foot patrol, then the
 * same corridor flown, mapped, and resolved into a decision. Deliberately
 * low-poly and unlit so it stays smooth on a mid-range phone: no shadows,
 * no textures, capped device-pixel-ratio, and the whole thing only mounts
 * once it scrolls into view and the underlying 3D library has loaded. */
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
  // (An earlier version gated the tick itself on `playing`, which froze
  // every HUD counter - including "distance covered" - at its step-start
  // value the moment someone paused or clicked a step chip.)
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
  // Distance covered is deterministic on narrative position (which flight
  // step we're in, and how far through it), not a wall-clock timer - so it
  // always reads correctly whether the demo auto-played here or someone
  // jumped straight to a later step chip. Flight spans steps 1-5.
  const flightStepCount = STEPS.length - 1;
  const overallFlightProgress = step >= 1 ? ((step - 1) + stepProgress) / flightStepCount : 0;
  const droneKm = overallFlightProgress * CORRIDOR_KM;

  return (
    <div ref={containerRef} className="overflow-hidden rounded-squircle border border-line bg-card">
      <div className="relative aspect-[4/3] w-full sm:aspect-video">
        {inView ? (
          <DroneSimScene step={step} reducedMotion={reducedMotion} onTelemetry={setTelemetry} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-base">
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-faint">
              Loading simulation…
            </span>
          </div>
        )}

        {/* Telemetry HUD - top-left, plain HTML so it stays sharp at any
            zoom and never competes with the WebGL canvas for layout. */}
        <div className="pointer-events-none absolute left-3 top-3 flex max-w-[13rem] flex-col gap-1 rounded-tile border border-line bg-base/85 p-2.5 backdrop-blur-sm sm:left-4 sm:top-4 sm:max-w-[15rem]">
          {step === 0 ? (
            <>
              <HudRow icon={Gauge} label="Elapsed" value={`${manualHours.toFixed(1)} hrs`} />
              <HudRow icon={Satellite} label="Covered" value={`${manualKm.toFixed(2)} km`} />
              <HudRow icon={Thermometer} label="Crew" value="1 technician, on foot" />
            </>
          ) : (
            <>
              <HudRow
                icon={Satellite}
                label="GPS · RTK"
                value={telemetry ? `${telemetry.lat.toFixed(4)}°, ${telemetry.lon.toFixed(4)}°` : '—'}
              />
              <HudRow
                icon={Gauge}
                label="Alt · speed"
                value={telemetry ? `${telemetry.altitudeM.toFixed(0)} m · ${telemetry.speedKmh.toFixed(0)} km/h` : '—'}
              />
              <HudRow
                icon={Thermometer}
                label="Temp · humidity"
                value={telemetry ? `${telemetry.tempC.toFixed(1)}°C · ${telemetry.humidityPct.toFixed(0)}%` : '—'}
              />
              <HudRow icon={Droplets} label="Covered" value={`${droneKm.toFixed(1)} / ${CORRIDOR_KM} km`} />
            </>
          )}
        </div>

        {/* Step caption, overlaid bottom-left. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-base/95 via-base/60 to-transparent p-4 sm:p-6">
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-accent">
            Step {step + 1} of {STEPS.length} · {STEPS[step]!.label}
          </span>
          <p className="mt-1.5 max-w-md text-sm leading-snug text-ink-secondary">
            {STEPS[step]!.caption}
          </p>
        </div>

        {/* Dashboard payoff card - final step only. */}
        {step === 5 && (
          <div className="absolute right-3 top-3 w-[13.5rem] rounded-tile border border-accent/40 bg-card/95 p-3 shadow-xl backdrop-blur-sm sm:right-4 sm:top-4 sm:w-60">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.12em] text-accent">
                Finding · #A-104
              </span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 font-sans text-[0.6rem] font-semibold text-accent">
                High
              </span>
            </div>
            <p className="mt-2 text-xs leading-snug text-ink-secondary">
              Thermal + visual anomaly, confidence 94%. Located at{' '}
              {telemetry ? `${telemetry.lat.toFixed(4)}°, ${telemetry.lon.toFixed(4)}°` : 'flagged GPS point'}.
            </p>
            <p className="mt-2 font-sans text-[0.65rem] font-medium text-ink">
              Recommended: schedule excavation crew
            </p>
            <div className="mt-3 border-t border-line pt-2 text-[0.62rem] leading-relaxed text-ink-faint">
              Manual: ~{MANUAL_HOURS} hrs for {MANUAL_KM} km. Sentrix: ~{DRONE_MINUTES} min for the full{' '}
              {CORRIDOR_KM} km corridor.
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 border-t border-line bg-surface p-3">
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
              className={`rounded-full border px-3 py-1 font-sans text-[0.7rem] font-medium transition-colors ${
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
      <p className="border-t border-line bg-surface px-4 py-2.5 text-center font-sans text-[0.68rem] text-ink-faint sm:px-6">
        Illustrative, time-lapsed simulation - drag to orbit, tap a step to jump to it. Coordinates,
        timings, and the finding shown are for demonstration only, not a real network or engagement.
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
    <div className="flex items-center gap-1.5">
      <Icon className="h-3 w-3 shrink-0 text-accent" aria-hidden />
      <span className="font-sans text-[0.6rem] uppercase tracking-[0.08em] text-ink-faint">
        {label}
      </span>
      <span className="ml-auto whitespace-nowrap font-sans text-[0.66rem] font-medium text-ink-secondary">
        {value}
      </span>
    </div>
  );
}
