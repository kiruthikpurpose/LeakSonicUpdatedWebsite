'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/tools/Slider';
import { ProjectionChart } from '@/components/tools/BarChart';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

type Mechanism = 'general' | 'localized';

const MECHANISM_NOTE: Record<Mechanism, string> = {
  general:
    'General (uniform) corrosion loses metal roughly evenly across a surface, which is what makes a simple linear rate a reasonable first approximation.',
  localized:
    'Localized corrosion - pitting, corrosion under insulation, or microbiologically influenced corrosion - can progress far faster at specific points than a uniform average suggests. Treat this projection as optimistic if localized mechanisms are plausible.',
};

function formatMm(n: number): string {
  return `${n.toFixed(2)} mm`;
}

export function CorrosionRateCalculator() {
  const [originalThickness, setOriginalThickness] = useState(12.7);
  const [currentThickness, setCurrentThickness] = useState(11.4);
  const [yearsInService, setYearsInService] = useState(8);
  const [minRequired, setMinRequired] = useState(7.9);
  const [mechanism, setMechanism] = useState<Mechanism>('general');
  const [halfLifeCap, setHalfLifeCap] = useState(10);

  const model = useMemo(() => {
    const metalLoss = Math.max(0, originalThickness - currentThickness);
    const corrosionRate = yearsInService > 0 ? metalLoss / yearsInService : 0;
    const remainingAllowance = Math.max(0, currentThickness - minRequired);
    const remainingLifeYears =
      corrosionRate > 0 ? remainingAllowance / corrosionRate : Infinity;
    const halfLifeInterval = Number.isFinite(remainingLifeYears)
      ? Math.min(remainingLifeYears / 2, halfLifeCap)
      : halfLifeCap;

    const years = [0, 2, 4, 6, 8, 10, 15, 20];
    const projection = years.map((y) => {
      const projected = Math.max(0, currentThickness - corrosionRate * y);
      return { label: `+${y}y`, value: projected, display: projected.toFixed(1) };
    });

    return { metalLoss, corrosionRate, remainingAllowance, remainingLifeYears, halfLifeInterval, projection };
  }, [originalThickness, currentThickness, yearsInService, minRequired, halfLifeCap]);

  const log: LogLine[] = [
    {
      label: 'Metal loss since baseline',
      detail: `${originalThickness.toFixed(2)} mm original − ${currentThickness.toFixed(2)} mm current = ${formatMm(model.metalLoss)} lost over ${yearsInService} year${yearsInService === 1 ? '' : 's'} in service.`,
    },
    {
      label: 'Corrosion rate',
      detail: `${formatMm(model.metalLoss)} ÷ ${yearsInService} year${yearsInService === 1 ? '' : 's'} = ${model.corrosionRate.toFixed(3)} mm/year, assuming a linear rate. ${MECHANISM_NOTE[mechanism]}`,
    },
    {
      label: 'Remaining corrosion allowance',
      detail: `${currentThickness.toFixed(2)} mm current − ${minRequired.toFixed(2)} mm minimum required = ${formatMm(model.remainingAllowance)} of metal remaining before the asset reaches its retirement thickness.`,
    },
    {
      label: 'Projected remaining life',
      detail:
        model.corrosionRate > 0
          ? `${formatMm(model.remainingAllowance)} ÷ ${model.corrosionRate.toFixed(3)} mm/year = ${model.remainingLifeYears.toFixed(1)} years before this asset is projected to reach minimum required thickness, holding the current rate constant.`
          : 'No measurable metal loss between readings, so a rate - and therefore a remaining-life projection - cannot be computed from these two data points alone.',
    },
    {
      label: 'Suggested next-inspection interval',
      detail: `Using the "half of remaining life" convention common in API 510/570/653-style inspection intervals, capped at your stated maximum of ${halfLifeCap} years: min(${Number.isFinite(model.remainingLifeYears) ? (model.remainingLifeYears / 2).toFixed(1) : '∞'}, ${halfLifeCap}) = ${model.halfLifeInterval.toFixed(1)} years. Your actual code-compliant interval also depends on requirements this tool does not check.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Thickness readings</h3>
          <div className="mt-6 space-y-6">
            <Slider
              label="Original / nominal wall thickness"
              value={originalThickness}
              min={2}
              max={40}
              step={0.1}
              onChange={(v) => {
                setOriginalThickness(v);
                if (currentThickness > v) setCurrentThickness(v);
              }}
              display={formatMm(originalThickness)}
            />
            <Slider
              label="Current measured thickness"
              value={currentThickness}
              min={1}
              max={originalThickness}
              step={0.1}
              onChange={(v) => {
                setCurrentThickness(v);
                if (minRequired > v) setMinRequired(v);
              }}
              display={formatMm(currentThickness)}
            />
            <Slider
              label="Years in service since baseline reading"
              value={yearsInService}
              min={1}
              max={40}
              step={1}
              onChange={setYearsInService}
              display={`${yearsInService} yr`}
            />
            <Slider
              label="Minimum required (retirement) thickness"
              value={minRequired}
              min={0.5}
              max={currentThickness}
              step={0.1}
              onChange={setMinRequired}
              display={formatMm(minRequired)}
              help="From your governing code calculation (e.g. ASME B31G, API 579) - not computed by this tool"
            />
            <div>
              <span className="text-sm font-medium text-ink-secondary">Suspected corrosion mechanism</span>
              <div className="mt-2 flex gap-2">
                {(['general', 'localized'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMechanism(m)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                      mechanism === m
                        ? 'border-accent/50 bg-accent/10 text-accent'
                        : 'border-line bg-surface text-ink-secondary hover:border-line-strong'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <Slider
              label="Maximum inspection interval you allow"
              value={halfLifeCap}
              min={1}
              max={15}
              step={1}
              onChange={setHalfLifeCap}
              display={`${halfLifeCap} yr`}
              help="Caps the half-life recommendation - set to your code or company maximum"
            />
          </div>
        </Card>

        <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
          <div>
            <h3 className="text-h3 font-semibold text-ink">Result</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat label="Corrosion rate" value={`${model.corrosionRate.toFixed(3)} mm/yr`} />
              <Stat label="Remaining allowance" value={formatMm(model.remainingAllowance)} />
              <Stat
                label="Projected remaining life"
                value={Number.isFinite(model.remainingLifeYears) ? `${model.remainingLifeYears.toFixed(1)} yrs` : '—'}
                accent
              />
              <Stat label="Suggested next inspection" value={`${model.halfLifeInterval.toFixed(1)} yrs`} accent />
            </div>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-ink-faint">
            Linear projection from two thickness readings. Not a substitute for a fitness-for-service
            assessment (e.g. API 579-1/ASME FFS-1) or your governing code’s retirement calculation.
          </p>
        </Card>
      </div>

      <ProjectionChart
        data={model.projection}
        threshold={{ value: minRequired, label: `Minimum required: ${formatMm(minRequired)}` }}
        caption="Projected wall thickness over time at the current linear corrosion rate, against your minimum required thickness."
      />

      <InsightLog lines={log} />

      <References
        items={[
          {
            label: 'How this remaining-life engine works (this tool, explained)',
            href: '/blog/corrosion-remaining-life-calculator-explained',
            note: 'LeakSonic blog - full methodology write-up for this calculator.',
          },
          {
            label: 'External corrosion on buried pipelines: causes, warning signs, and controls',
            href: '/blog/external-corrosion-buried-pipelines',
            note: 'LeakSonic blog - background on the general corrosion mechanism this tool assumes by default.',
          },
          {
            label: 'Corrosion under insulation (CUI): why insulated pipe is a blind spot',
            href: '/blog/corrosion-under-insulation-explained',
            note: 'LeakSonic blog - a localized mechanism that can invalidate a simple linear-rate projection.',
          },
          {
            label: 'Microbiologically influenced corrosion (MIC): why bacteria are a threat',
            href: '/blog/microbiologically-influenced-corrosion-explained',
            note: 'LeakSonic blog - another localized mechanism worth ruling out before trusting a linear rate.',
          },
          {
            label: 'Risk-based inspection: how operators prioritise pipeline segments',
            href: '/blog/risk-based-inspection-pipelines',
            note: 'LeakSonic blog - how a remaining-life estimate typically feeds a prioritisation decision.',
          },
          {
            label: 'API - American Petroleum Institute',
            href: 'https://www.api.org/',
            note: 'Publisher of API 510, 570, 653 (in-service inspection codes) and API 579-1/ASME FFS-1 (fitness-for-service), which govern real retirement-thickness and interval decisions.',
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
      <div className={`font-sans text-lg font-bold ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </div>
  );
}
