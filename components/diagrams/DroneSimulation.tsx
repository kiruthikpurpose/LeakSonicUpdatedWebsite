'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { SimStep } from './drone-sim/Scene';

const DroneSimScene = dynamic(
  () => import('./drone-sim/Scene').then((m) => m.DroneSimScene),
  { ssr: false },
);

const STEPS: { label: string; caption: string }[] = [
  { label: 'Flight', caption: 'The drone flies the corridor - one input among several the platform can work from.' },
  { label: 'Evidence capture', caption: 'Surface signals along the route are flagged as candidate evidence, not conclusions yet.' },
  { label: 'Sentrix', caption: 'Evidence is standardised and compared against prior cycles - the decision layer at work.' },
  { label: 'Decision', caption: 'One finding is prioritised with its evidence attached - an engineer reviews and acts on it.' },
];

const STEP_MS = 3200;

/** Interactive 3D explainer for the evidence-to-decision flow described
 * elsewhere on the site as text and a 2D flow diagram. Deliberately low-poly
 * and unlit so it stays smooth on a mid-range phone: no shadows, no
 * textures, capped device-pixel-ratio, and the whole thing only mounts once
 * it scrolls into view and the underlying 3D library has loaded. */
export function DroneSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [step, setStep] = useState<SimStep>(0);
  const [playing, setPlaying] = useState(true);

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

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % STEPS.length) as SimStep);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-squircle border border-line bg-card">
      <div className="relative aspect-[4/3] w-full sm:aspect-video">
        {inView ? (
          <DroneSimScene step={step} reducedMotion={reducedMotion} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-base">
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-ink-faint">
              Loading simulation…
            </span>
          </div>
        )}

        {/* Step caption, overlaid bottom-left - plain HTML, not part of the
            WebGL canvas, so it stays sharp and accessible at any zoom. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-base/95 via-base/60 to-transparent p-4 sm:p-6">
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-accent">
            Step {step + 1} of {STEPS.length} · {STEPS[step]!.label}
          </span>
          <p className="mt-1.5 max-w-md text-sm leading-snug text-ink-secondary">
            {STEPS[step]!.caption}
          </p>
        </div>
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
          onClick={() => {
            setStep(0);
            setPlaying(true);
          }}
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
              onClick={() => {
                setStep(i as SimStep);
                setPlaying(false);
              }}
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
        Illustrative simulation - drag to orbit, tap a step to jump to it. Not a rendering of any
        specific network or engagement.
      </p>
    </div>
  );
}
