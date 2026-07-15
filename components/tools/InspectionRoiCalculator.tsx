'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';

const UNITS: Record<'pipeline' | 'refinery', string> = {
  pipeline: 'km of network',
  refinery: 'static-equipment assets',
};

export function InspectionRoiCalculator() {
  const [assetType, setAssetType] = useState<'pipeline' | 'refinery'>('pipeline');
  const [scale, setScale] = useState(500);
  const [cycleMonths, setCycleMonths] = useState(12);
  const [reviewHours, setReviewHours] = useState(160);
  const [hourlyCost, setHourlyCost] = useState(1500);
  const [efficiencyGain, setEfficiencyGain] = useState(40);

  const results = useMemo(() => {
    const cyclesPerYear = 12 / cycleMonths;
    const hoursSavedPerCycle = (reviewHours * efficiencyGain) / 100;
    const hoursSavedPerYear = hoursSavedPerCycle * cyclesPerYear;
    const costSavedPerCycle = hoursSavedPerCycle * hourlyCost;
    const costSavedPerYear = hoursSavedPerYear * hourlyCost;
    return { hoursSavedPerCycle, hoursSavedPerYear, costSavedPerCycle, costSavedPerYear };
  }, [cycleMonths, reviewHours, hourlyCost, efficiencyGain]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="p-6 sm:p-8">
        <h3 className="text-h3 font-semibold text-ink">Your inputs</h3>
        <div className="mt-6 space-y-6">
          <div>
            <span className="text-sm font-medium text-ink-secondary">Asset type</span>
            <div className="mt-2 flex gap-2">
              {(['pipeline', 'refinery'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAssetType(t)}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    assetType === t
                      ? 'border-accent/50 bg-accent/10 text-accent'
                      : 'border-line bg-surface text-ink-secondary hover:border-line-strong'
                  }`}
                >
                  {t === 'pipeline' ? 'Pipeline / CGD network' : 'Refinery / industrial site'}
                </button>
              ))}
            </div>
          </div>

          <SliderField
            label={`Network size (${UNITS[assetType]})`}
            value={scale}
            min={10}
            max={assetType === 'pipeline' ? 5000 : 500}
            step={10}
            onChange={setScale}
            display={`${scale.toLocaleString()} ${UNITS[assetType]}`}
          />
          <SliderField
            label="Inspection cycle length"
            value={cycleMonths}
            min={1}
            max={24}
            step={1}
            onChange={setCycleMonths}
            display={`Every ${cycleMonths} month${cycleMonths === 1 ? '' : 's'}`}
          />
          <SliderField
            label="Manual evidence review & reporting, per cycle"
            value={reviewHours}
            min={10}
            max={800}
            step={10}
            onChange={setReviewHours}
            display={`${reviewHours.toLocaleString()} engineer-hours`}
          />
          <SliderField
            label="Fully-loaded engineering cost per hour"
            value={hourlyCost}
            min={200}
            max={6000}
            step={50}
            onChange={setHourlyCost}
            display={`₹${hourlyCost.toLocaleString()} / hour`}
          />
          <SliderField
            label="Assumed review-effort reduction"
            value={efficiencyGain}
            min={10}
            max={70}
            step={5}
            onChange={setEfficiencyGain}
            display={`${efficiencyGain}% - adjust this yourself`}
          />
        </div>
      </Card>

      <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
        <div>
          <h3 className="text-h3 font-semibold text-ink">Illustrative estimate</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Based on the inputs on the left and the review-effort reduction you set.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Stat
              label="Engineer-hours saved / cycle"
              value={results.hoursSavedPerCycle.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            />
            <Stat
              label="Engineer-hours saved / year"
              value={results.hoursSavedPerYear.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            />
            <Stat
              label="Estimated cost saved / cycle"
              value={`₹${results.costSavedPerCycle.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`}
            />
            <Stat
              label="Estimated cost saved / year"
              value={`₹${results.costSavedPerYear.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}`}
              accent
            />
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-ink-faint">
          This is a planning estimate you control, not a validated performance claim about
          Sentrix. Actual results depend on your data, workflow, and network.
        </p>
      </Card>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium text-ink-secondary">
        {label}
        <span className="font-sans text-sm font-semibold text-accent">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 w-full accent-[--color-accent]"
        style={{ accentColor: 'var(--color-accent)' }}
      />
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-tile border border-line bg-card p-4">
      <div className={`font-sans text-xl font-bold ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </div>
  );
}
