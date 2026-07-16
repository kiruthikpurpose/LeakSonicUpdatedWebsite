'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/tools/Slider';
import { ProjectionChart } from '@/components/tools/BarChart';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

function formatINR(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

export function MethaneValueEstimator() {
  const [leakRate, setLeakRate] = useState(2);
  const [hoursUndetected, setHoursUndetected] = useState(720);
  const [pricePerKg, setPricePerKg] = useState(60);
  const [gwp, setGwp] = useState(28);

  const model = useMemo(() => {
    const gasLostKg = leakRate * hoursUndetected;
    const valueLost = gasLostKg * pricePerKg;
    const co2eKg = gasLostKg * gwp;
    const co2eTonnes = co2eKg / 1000;

    const projection = Array.from({ length: 5 }, (_, i) => {
      const year = i + 1;
      const cumulative = valueLost * year;
      return { label: `Yr ${year}`, value: cumulative, display: formatINR(cumulative) };
    });

    return { gasLostKg, valueLost, co2eTonnes, projection };
  }, [leakRate, hoursUndetected, pricePerKg, gwp]);

  const log: LogLine[] = [
    {
      label: 'Gas lost while undetected',
      detail: `${leakRate} kg/hour × ${hoursUndetected.toLocaleString()} hours undetected = ${model.gasLostKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg of methane lost to atmosphere before this leak is found and repaired.`,
    },
    {
      label: 'Commercial value lost',
      detail: `${model.gasLostKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg × ${formatINR(pricePerKg)}/kg = ${formatINR(model.valueLost)} of gas that never reached a customer or meter - product lost, not just emissions.`,
    },
    {
      label: 'Climate-equivalent impact',
      detail: `${model.gasLostKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg × a ${gwp}x global warming potential (your chosen figure - IPCC methane GWP estimates vary by assessment report and time horizon) = ${model.co2eTonnes.toLocaleString(undefined, { maximumFractionDigits: 1 })} tonnes of CO2-equivalent for this single undetected leak.`,
    },
    {
      label: 'Why detection speed is the lever',
      detail: `Every input here is fixed except one: hours undetected. Halving that number halves every result on this page - which is the entire case for prioritised, cycle-over-cycle inspection over a fixed calendar schedule.`,
    },
    {
      label: 'Five-year exposure if the pattern repeats',
      detail: `If a leak of this size and duration recurred once a year, five years of undetected recurrences would total ${formatINR(model.valueLost * 5)} in lost product value alone - shown as a running total in the chart below.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Leak assumptions</h3>
          <div className="mt-6 space-y-6">
            <Slider
              label="Estimated leak rate"
              value={leakRate}
              min={0.1}
              max={20}
              step={0.1}
              onChange={setLeakRate}
              display={`${leakRate.toFixed(1)} kg CH₄/hour`}
            />
            <Slider
              label="Hours undetected before repair"
              value={hoursUndetected}
              min={24}
              max={4380}
              step={24}
              onChange={setHoursUndetected}
              display={`${hoursUndetected.toLocaleString()} hrs (${(hoursUndetected / 24).toFixed(0)} days)`}
              help="The time between when a leak starts and when it is found and fixed"
            />
            <Slider
              label="Gas value"
              value={pricePerKg}
              min={10}
              max={200}
              step={5}
              onChange={setPricePerKg}
              display={`₹${pricePerKg}/kg`}
            />
            <Slider
              label="Global warming potential (GWP) multiplier"
              value={gwp}
              min={20}
              max={85}
              step={1}
              onChange={setGwp}
              display={`${gwp}x CO₂e`}
              help="~28-36 for GWP-100, ~80-83 for GWP-20 per recent IPCC assessments - adjust to match your reporting framework"
            />
          </div>
        </Card>

        <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
          <div>
            <h3 className="text-h3 font-semibold text-ink">Illustrative impact</h3>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Stat
                label="Gas lost"
                value={`${model.gasLostKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg`}
              />
              <Stat label="Value lost" value={formatINR(model.valueLost)} accent />
              <Stat
                label="CO₂-equivalent"
                value={`${model.co2eTonnes.toLocaleString(undefined, { maximumFractionDigits: 1 })} t`}
                accent
              />
              <Stat label="Detection window" value={`${(hoursUndetected / 24).toFixed(0)} days`} />
            </div>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-ink-faint">
            An illustrative estimate from the assumptions you set - not a measurement of any real
            leak, and not a Sentrix performance claim.
          </p>
        </Card>
      </div>

      <ProjectionChart
        data={model.projection}
        caption="Cumulative value lost if a leak of this size and duration recurred once a year, five years running."
      />

      <InsightLog lines={log} />

      <References
        items={[
          {
            label: 'The economics of methane leak detection',
            href: '/blog/methane-leak-detection-economics',
            note: 'LeakSonic blog - the full economic case this tool illustrates.',
          },
          {
            label: 'How global oil and gas majors are committing to measured methane reporting',
            href: '/blog/global-oil-gas-majors-methane-commitments',
            note: 'LeakSonic blog - industry context on why detection speed is under scrutiny.',
          },
          {
            label: 'Methane regulation and reporting: a global comparison',
            href: '/blog/methane-regulation-global-comparison',
            note: 'LeakSonic blog - regulatory background behind the GWP and reporting framing.',
          },
          {
            label: 'IPCC - Intergovernmental Panel on Climate Change',
            href: 'https://www.ipcc.ch/',
            note: 'Source of the methane global warming potential (GWP) figures referenced here.',
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
