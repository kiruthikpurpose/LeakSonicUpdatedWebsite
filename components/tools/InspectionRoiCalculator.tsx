'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/tools/Slider';
import { ProjectionChart } from '@/components/tools/BarChart';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

const UNITS: Record<'pipeline' | 'refinery', string> = {
  pipeline: 'km of network',
  refinery: 'static-equipment assets',
};

function formatINR(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

export function InspectionRoiCalculator() {
  const [assetType, setAssetType] = useState<'pipeline' | 'refinery'>('pipeline');
  const [scale, setScale] = useState(500);
  const [cycleMonths, setCycleMonths] = useState(12);
  const [reviewHours, setReviewHours] = useState(160);
  const [hourlyCost, setHourlyCost] = useState(1500);
  const [efficiencyGain, setEfficiencyGain] = useState(40);

  const model = useMemo(() => {
    const cyclesPerYear = 12 / cycleMonths;
    const annualReviewHours = reviewHours * cyclesPerYear;
    const hoursSavedPerCycle = (reviewHours * efficiencyGain) / 100;
    const hoursSavedPerYear = hoursSavedPerCycle * cyclesPerYear;
    const costSavedPerCycle = hoursSavedPerCycle * hourlyCost;
    const costSavedPerYear = hoursSavedPerYear * hourlyCost;

    const projection = Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const cumulative = costSavedPerYear * year;
      return { label: `Yr ${year}`, value: cumulative, display: formatINR(cumulative) };
    });

    return {
      cyclesPerYear,
      annualReviewHours,
      hoursSavedPerCycle,
      hoursSavedPerYear,
      costSavedPerCycle,
      costSavedPerYear,
      projection,
    };
  }, [cycleMonths, reviewHours, hourlyCost, efficiencyGain]);

  const log: LogLine[] = [
    {
      label: 'Cycle frequency derived from your interval',
      detail: `A ${cycleMonths}-month inspection cycle means ${model.cyclesPerYear.toFixed(2)} cycles per year for this ${assetType === 'pipeline' ? 'network' : 'site'}.`,
    },
    {
      label: 'Current annual manual review load',
      detail: `${reviewHours.toLocaleString()} engineer-hours/cycle × ${model.cyclesPerYear.toFixed(2)} cycles/year = ${model.annualReviewHours.toLocaleString(undefined, { maximumFractionDigits: 0 })} engineer-hours/year currently spent on manual evidence review and reporting across ${scale.toLocaleString()} ${UNITS[assetType]}.`,
    },
    {
      label: 'Applying your stated efficiency assumption',
      detail: `${model.annualReviewHours.toLocaleString(undefined, { maximumFractionDigits: 0 })} hours/year × ${efficiencyGain}% (an assumption you set, not one we assert) = ${model.hoursSavedPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })} engineer-hours/year potentially freed up.`,
    },
    {
      label: 'Converting to cost at your stated hourly rate',
      detail: `${model.hoursSavedPerYear.toLocaleString(undefined, { maximumFractionDigits: 0 })} hours/year × ${formatINR(hourlyCost)}/hour = ${formatINR(model.costSavedPerYear)}/year in illustrative engineering cost.`,
    },
    {
      label: 'Five-year cumulative potential',
      detail: `Holding all assumptions constant, five years of this saving compounds to ${formatINR(model.costSavedPerYear * 5)} - shown as a running total in the chart below, not a forecast that accounts for network growth or changing cycles.`,
    },
  ];

  return (
    <div className="space-y-6">
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

            <Slider
              label={`Network size (${UNITS[assetType]})`}
              value={scale}
              min={10}
              max={assetType === 'pipeline' ? 5000 : 500}
              step={10}
              onChange={setScale}
              display={`${scale.toLocaleString()} ${UNITS[assetType]}`}
              help="Contextual - used for the insight log, not the core cost arithmetic"
            />
            <Slider
              label="Inspection cycle length"
              value={cycleMonths}
              min={1}
              max={24}
              step={1}
              onChange={setCycleMonths}
              display={`Every ${cycleMonths} month${cycleMonths === 1 ? '' : 's'}`}
            />
            <Slider
              label="Manual evidence review & reporting, per cycle"
              value={reviewHours}
              min={10}
              max={800}
              step={10}
              onChange={setReviewHours}
              display={`${reviewHours.toLocaleString()} engineer-hours`}
            />
            <Slider
              label="Fully-loaded engineering cost per hour"
              value={hourlyCost}
              min={200}
              max={6000}
              step={50}
              onChange={setHourlyCost}
              display={`₹${hourlyCost.toLocaleString()} / hour`}
            />
            <Slider
              label="Assumed review-effort reduction"
              value={efficiencyGain}
              min={10}
              max={70}
              step={5}
              onChange={setEfficiencyGain}
              display={`${efficiencyGain}%`}
              help="You control this assumption - we don't assert a fixed figure"
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
                value={model.hoursSavedPerCycle.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              />
              <Stat
                label="Engineer-hours saved / year"
                value={model.hoursSavedPerYear.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              />
              <Stat label="Estimated cost saved / cycle" value={formatINR(model.costSavedPerCycle)} />
              <Stat
                label="Estimated cost saved / year"
                value={formatINR(model.costSavedPerYear)}
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

      <ProjectionChart
        data={model.projection}
        caption="Five-year cumulative cost-saving potential, holding all current assumptions constant."
      />

      <InsightLog lines={log} />

      <References
        items={[
          {
            label: 'How much does manual inspection review actually cost? (this tool, explained)',
            href: '/blog/inspection-cost-roi-calculator-guide',
            note: 'LeakSonic blog - full methodology write-up for this calculator.',
          },
          {
            label: 'The economics of methane leak detection',
            href: '/blog/methane-leak-detection-economics',
            note: 'LeakSonic blog - why finding issues earlier changes the cost curve.',
          },
          {
            label: 'How operators budget and plan pipeline inspection frequency',
            href: '/blog/pipeline-inspection-budgeting-frequency-planning',
            note: 'LeakSonic blog - context on cycle length and cost planning.',
          },
          {
            label: 'ASME',
            href: 'https://www.asme.org/',
            note: 'Publisher of ASME B31.8S, the integrity-management standard our review-cycle framing draws on.',
            external: true,
          },
        ]}
      />
    </div>
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
