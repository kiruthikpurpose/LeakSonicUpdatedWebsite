'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/tools/Slider';
import { BarChart } from '@/components/tools/BarChart';
import { RiskMatrix } from '@/components/tools/RiskMatrix';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

// Likelihood-side weights - history of anomalies carries the most signal,
// consistent with how risk-based inspection literature treats documented
// past findings as the strongest single predictor of future risk.
const WEIGHTS = { age: 0.8, construction: 1.2, history: 1.8, sinceLast: 0.7 };
const LIKELIHOOD_MAX = 10 * (WEIGHTS.age + WEIGHTS.construction + WEIGHTS.history + WEIGHTS.sinceLast);
const CONSEQUENCE_MAX = 10;

function bandFor(l: number, c: number): { name: string; color: string; cadence: string } {
  const r = l + c;
  if (r <= 4) return { name: 'Low priority', color: 'text-ink-secondary', cadence: 'Standard cycle is likely sufficient' };
  if (r <= 6) return { name: 'Medium priority', color: 'text-ink', cadence: 'Consider tightening the inspection interval' };
  if (r <= 8) return { name: 'High priority', color: 'text-accent', cadence: 'Prioritise for the next inspection cycle' };
  return { name: 'Critical priority', color: 'text-accent', cadence: 'Warrants near-term attention' };
}

function toBin(raw: number, max: number): number {
  return Math.min(5, Math.max(1, Math.ceil((raw / max) * 5)));
}

export function PriorityScoreEstimator() {
  const [age, setAge] = useState(5);
  const [construction, setConstruction] = useState(5);
  const [history, setHistory] = useState(2);
  const [sinceLast, setSinceLast] = useState(5);
  const [consequence, setConsequence] = useState(5);

  const model = useMemo(() => {
    const likelihoodRaw =
      age * WEIGHTS.age +
      construction * WEIGHTS.construction +
      history * WEIGHTS.history +
      sinceLast * WEIGHTS.sinceLast;
    const consequenceRaw = consequence * 1.0;

    const likelihoodBin = toBin(likelihoodRaw, LIKELIHOOD_MAX);
    const consequenceBin = toBin(consequenceRaw, CONSEQUENCE_MAX);
    const band = bandFor(likelihoodBin, consequenceBin);
    const combinedPct = Math.round(
      ((likelihoodRaw + consequenceRaw) / (LIKELIHOOD_MAX + CONSEQUENCE_MAX)) * 100,
    );

    return { likelihoodRaw, consequenceRaw, likelihoodBin, consequenceBin, band, combinedPct };
  }, [age, construction, history, sinceLast, consequence]);

  const barData = [
    { label: `Age (×${WEIGHTS.age})`, value: age, display: `${age}/10` },
    { label: `Construction risk (×${WEIGHTS.construction})`, value: construction, display: `${construction}/10` },
    { label: `History of anomalies (×${WEIGHTS.history})`, value: history, display: `${history}/10` },
    { label: `Time since inspection (×${WEIGHTS.sinceLast})`, value: sinceLast, display: `${sinceLast}/10` },
    { label: 'Consequence area (×1.0)', value: consequence, display: `${consequence}/10` },
  ];

  const log: LogLine[] = [
    {
      label: 'Likelihood factors combined',
      detail: `Age (${age}/10 × ${WEIGHTS.age}) + construction/material risk (${construction}/10 × ${WEIGHTS.construction}) + history of anomalies (${history}/10 × ${WEIGHTS.history}, weighted highest) + time since last inspection (${sinceLast}/10 × ${WEIGHTS.sinceLast}) = ${model.likelihoodRaw.toFixed(1)} raw points out of a possible ${LIKELIHOOD_MAX}.`,
    },
    {
      label: 'Mapped to a 1-5 likelihood band',
      detail: `${model.likelihoodRaw.toFixed(1)} / ${LIKELIHOOD_MAX} scales to likelihood ${model.likelihoodBin} on a 1 (rare) to 5 (near-certain) scale.`,
    },
    {
      label: 'Consequence factor',
      detail: `Consequence area is scored ${consequence}/10, scaling to consequence ${model.consequenceBin} on a 1 (minor) to 5 (severe) scale. Note: a full RBI consequence assessment typically also weighs safety, environmental, and economic impact separately - this tool simplifies that to a single factor.`,
    },
    {
      label: 'Matrix placement',
      detail: `Plotted at likelihood ${model.likelihoodBin}, consequence ${model.consequenceBin} on the risk matrix below - the combination that determines the overall priority band.`,
    },
    {
      label: 'Overall priority band',
      detail: `Likelihood ${model.likelihoodBin} + consequence ${model.consequenceBin} = ${model.likelihoodBin + model.consequenceBin}, which this tool's illustrative banding maps to "${model.band.name}." These specific thresholds are our own simplified illustration, not an official API 580 value - API 580 leaves exact matrix definitions to each operator's own programme.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Likelihood factors</h3>
          <div className="mt-6 space-y-6">
            <Slider
              label="Age relative to design life"
              value={age}
              min={0}
              max={10}
              step={1}
              onChange={setAge}
              display={`${age}/10`}
              help="0 = new asset, 10 = well beyond typical design life"
            />
            <Slider
              label="Construction / material risk"
              value={construction}
              min={0}
              max={10}
              step={1}
              onChange={setConstruction}
              display={`${construction}/10`}
              help="Known susceptibility to corrosion, fatigue, or defect classes"
            />
            <Slider
              label="History of anomalies or repairs"
              value={history}
              min={0}
              max={10}
              step={1}
              onChange={setHistory}
              display={`${history}/10`}
              help="Weighted highest - documented past findings are the strongest single signal"
            />
            <Slider
              label="Time since last inspection"
              value={sinceLast}
              min={0}
              max={10}
              step={1}
              onChange={setSinceLast}
              display={`${sinceLast}/10`}
              help="Relative to your normal cadence for this asset class"
            />
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Consequence factor</h3>
          <div className="mt-6">
            <Slider
              label="Consequence area if this asset failed"
              value={consequence}
              min={0}
              max={10}
              step={1}
              onChange={setConsequence}
              display={`${consequence}/10`}
              help="Population density, environmental sensitivity, or operational criticality nearby"
            />
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="mono-label text-ink-muted">Result</p>
            <h3 className={`mt-2 text-h2 font-bold ${model.band.color}`}>{model.band.name}</h3>
            <p className="mt-1 text-sm font-medium text-ink-secondary">{model.band.cadence}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-tile border border-line bg-surface p-3">
                <div className="font-sans text-lg font-bold text-accent">{model.likelihoodBin}/5</div>
                <div className="mt-0.5 text-xs text-ink-muted">Likelihood</div>
              </div>
              <div className="rounded-tile border border-line bg-surface p-3">
                <div className="font-sans text-lg font-bold text-accent">{model.consequenceBin}/5</div>
                <div className="mt-0.5 text-xs text-ink-muted">Consequence</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RiskMatrix likelihood={model.likelihoodBin} consequence={model.consequenceBin} />
        <BarChart
          data={barData}
          max={10}
          caption="Your five input factors, with their relative weight in the likelihood/consequence model."
        />
      </div>

      <InsightLog lines={log} />

      <References
        items={[
          {
            label: 'Risk-based inspection: how operators prioritise pipeline segments',
            href: '/blog/risk-based-inspection-pipelines',
            note: 'LeakSonic blog - the RBI concepts this tool illustrates.',
          },
          {
            label: 'Why pipeline failures still happen: root causes worldwide',
            href: '/blog/pipeline-failure-root-causes-global-data',
            note: 'LeakSonic blog - context on the likelihood factors used here.',
          },
          {
            label: 'What actually determines inspection priority (this tool, explained)',
            href: '/blog/inspection-priority-score-explained',
            note: 'LeakSonic blog - full methodology write-up for this tool.',
          },
          {
            label: 'API - American Petroleum Institute',
            href: 'https://www.api.org/',
            note: 'Publisher of API 580/581, the risk-based inspection standard this tool\'s matrix shape is loosely modelled on.',
            external: true,
          },
          {
            label: 'ASME',
            href: 'https://www.asme.org/',
            note: 'Publisher of ASME B31.8S, the pipeline integrity management standard referenced across our RBI content.',
            external: true,
          },
        ]}
      />
    </div>
  );
}
