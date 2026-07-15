'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';

type Level = 'low' | 'medium' | 'high';

const LEVEL_POINTS: Record<Level, number> = { low: 1, medium: 2, high: 3 };

const BANDS = [
  {
    max: 6,
    name: 'Low priority',
    color: 'text-ink-secondary',
    cadence: 'Standard cycle is likely sufficient',
    body: 'Based on what you entered, this asset sits toward the lower end of relative priority. A standard inspection cadence is likely reasonable, revisited if any input changes materially.',
  },
  {
    max: 10,
    name: 'Medium priority',
    color: 'text-ink',
    cadence: 'Consider tightening the inspection interval',
    body: 'This asset carries a moderate combination of age, construction, consequence, and history factors. Consider whether your current inspection interval still matches that risk profile.',
  },
  {
    max: 14,
    name: 'High priority',
    color: 'text-accent',
    cadence: 'Prioritise for the next inspection cycle',
    body: 'Several factors are elevated at once. This is a strong candidate to move up your inspection queue rather than wait for its position in a standard rotation.',
  },
  {
    max: 18,
    name: 'Critical priority',
    color: 'text-accent',
    cadence: 'Warrants near-term attention',
    body: 'Age, construction risk, consequence area, time since last inspection, and history are all elevated. This combination typically warrants near-term inspection attention rather than standard scheduling.',
  },
];

function LevelSelect({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value: Level;
  onChange: (v: Level) => void;
  helper: string;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-ink-secondary">{label}</span>
      <p className="mt-0.5 text-xs text-ink-faint">{helper}</p>
      <div className="mt-2 flex gap-2">
        {(['low', 'medium', 'high'] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => onChange(lvl)}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium capitalize transition-colors ${
              value === lvl
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-line bg-surface text-ink-secondary hover:border-line-strong'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PriorityScoreEstimator() {
  const [age, setAge] = useState<Level>('medium');
  const [construction, setConstruction] = useState<Level>('medium');
  const [consequence, setConsequence] = useState<Level>('medium');
  const [sinceLast, setSinceLast] = useState<Level>('medium');
  const [history, setHistory] = useState<Level>('low');

  const score = useMemo(
    () =>
      LEVEL_POINTS[age] +
      LEVEL_POINTS[construction] +
      LEVEL_POINTS[consequence] +
      LEVEL_POINTS[sinceLast] +
      LEVEL_POINTS[history] +
      LEVEL_POINTS[history], // history weighted 2x - past anomalies are the strongest single signal
    [age, construction, consequence, sinceLast, history],
  );
  const band = useMemo(() => BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]!, [score]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="p-6 sm:p-8">
        <h3 className="text-h3 font-semibold text-ink">Describe the asset</h3>
        <div className="mt-6 space-y-6">
          <LevelSelect
            label="Age"
            helper="Relative to typical design life for this asset type"
            value={age}
            onChange={setAge}
          />
          <LevelSelect
            label="Construction / material risk"
            helper="Known susceptibility to corrosion, fatigue, or defect classes"
            value={construction}
            onChange={setConstruction}
          />
          <LevelSelect
            label="Consequence area"
            helper="Population density or criticality nearby if this asset failed"
            value={consequence}
            onChange={setConsequence}
          />
          <LevelSelect
            label="Time since last inspection"
            helper="Relative to your normal cadence for this asset class"
            value={sinceLast}
            onChange={setSinceLast}
          />
          <LevelSelect
            label="History of anomalies or repairs"
            helper="Weighted more heavily - past findings are the strongest signal"
            value={history}
            onChange={setHistory}
          />
        </div>
      </Card>

      <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
        <div>
          <p className="mono-label text-ink-muted">Estimated relative priority</p>
          <h3 className={`mt-3 text-h2 font-bold ${band.color}`}>{band.name}</h3>
          <p className="mt-2 text-sm font-medium text-ink-secondary">{band.cadence}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{band.body}</p>
          <div className="mt-6 rounded-tile border border-line bg-card p-4">
            <div className="font-sans text-2xl font-bold text-accent">{score} / 18</div>
            <div className="mt-1 text-xs text-ink-muted">illustrative priority score</div>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-ink-faint">
          Educational tool only - not a substitute for a formal risk-based inspection (RBI)
          programme, and it does not use any of your actual asset data.
        </p>
      </Card>
    </div>
  );
}
