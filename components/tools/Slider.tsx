'use client';

/** Shared red-filled range slider for every /tools/* calculator - the fill
 * and thumb are always the brand accent (red), computed per-value so the
 * track visually communicates position, not just the thumb. */
export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  help,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  help?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink-secondary">
        <span>{label}</span>
        <span className="whitespace-nowrap font-sans text-sm font-semibold text-accent">
          {display}
        </span>
      </span>
      {help && <span className="mt-0.5 block text-xs leading-snug text-ink-faint">{help}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tool-slider mt-3 w-full"
        style={{
          background: `linear-gradient(to right, rgb(var(--color-accent)) 0%, rgb(var(--color-accent)) ${pct}%, rgb(var(--color-line-strong)) ${pct}%, rgb(var(--color-line-strong)) 100%)`,
        }}
        aria-label={label}
      />
    </label>
  );
}
