'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type Question = {
  id: string;
  prompt: string;
  options: { label: string; points: 0 | 1 | 2 }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'prioritisation',
    prompt: 'How do you currently decide which segments or assets to inspect next?',
    options: [
      { label: 'Ad hoc, or based on institutional memory', points: 0 },
      { label: 'Spreadsheet-based scheduling', points: 1 },
      { label: 'A defined, evidence-based risk ranking', points: 2 },
    ],
  },
  {
    id: 'comparison',
    prompt: 'Do you systematically compare each inspection cycle against the last one?',
    options: [
      { label: 'Rarely - mostly reviewed fresh each time', points: 0 },
      { label: 'Sometimes, informally', points: 1 },
      { label: 'Yes, systematically for every cycle', points: 2 },
    ],
  },
  {
    id: 'measurement',
    prompt: 'Is your emissions/integrity reporting based on estimated or measured data?',
    options: [
      { label: 'Mostly estimated factors', points: 0 },
      { label: 'A mix of estimated and measured', points: 1 },
      { label: 'Mostly measured, source-level data', points: 2 },
    ],
  },
  {
    id: 'turnaround',
    prompt: 'How long does it typically take to turn field evidence into a finished report?',
    options: [
      { label: 'Multiple weeks', points: 0 },
      { label: 'About a week', points: 1 },
      { label: 'A few days or less', points: 2 },
    ],
  },
  {
    id: 'format',
    prompt: 'Do your inspection records map cleanly to your regulatory reporting format?',
    options: [
      { label: 'No, significant manual re-keying is needed', points: 0 },
      { label: 'Partially - some manual work remains', points: 1 },
      { label: 'Yes, largely structured for direct reporting', points: 2 },
    ],
  },
];

const BANDS = [
  {
    max: 3,
    name: 'Foundational',
    body: 'Your current workflow leans on manual review and estimation. That is common, and not a criticism - it is where most integrity programmes start. The highest-leverage next step is usually introducing a defined, evidence-based prioritisation method before anything else.',
  },
  {
    max: 6,
    name: 'Developing',
    body: 'You have some structure in place - partial comparison across cycles, or a mix of estimated and measured data - but there are still manual steps creating rework. Closing the gap between field evidence and a report-ready record is typically the next highest-leverage step.',
  },
  {
    max: 10,
    name: 'Advanced',
    body: 'Your programme already has real structure: systematic cycle comparison, measured data, and reporting-aligned records. At this stage the marginal gains usually come from tightening turnaround time and making the evidence behind each finding more auditable.',
  },
];

export function ReportingReadinessQuiz() {
  const [answers, setAnswers] = useState<Record<string, 0 | 1 | 2>>({});
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const score = useMemo(
    () => Object.values(answers).reduce((sum: number, p) => sum + p, 0),
    [answers],
  );
  const band = useMemo(() => BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1]!, [score]);

  function reset() {
    setAnswers({});
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6 sm:p-8">
        <h3 className="text-h3 font-semibold text-ink">Five quick questions</h3>
        <div className="mt-6 space-y-7">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-ink">
                {qi + 1}. {q.prompt}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {q.options.map((opt) => (
                  <label
                    key={opt.label}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                      answers[q.id] === opt.points
                        ? 'border-accent/50 bg-accent/10 text-ink'
                        : 'border-line bg-surface text-ink-secondary hover:border-line-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="sr-only"
                      checked={answers[q.id] === opt.points}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.points }))}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {answeredCount > 0 && (
          <Button variant="ghost" size="sm" className="mt-6" onClick={reset}>
            Reset answers
          </Button>
        )}
      </Card>

      <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
        {allAnswered ? (
          <div>
            <p className="mono-label text-accent">Your readiness band</p>
            <h3 className="mt-3 text-h2 font-bold text-ink">{band.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{band.body}</p>
            <div className="mt-6 rounded-tile border border-line bg-card p-4">
              <div className="font-sans text-2xl font-bold text-accent">{score} / 10</div>
              <div className="mt-1 text-xs text-ink-muted">self-assessed score</div>
            </div>
          </div>
        ) : (
          <div>
            <p className="mono-label text-ink-muted">Your readiness band</p>
            <h3 className="mt-3 text-h3 font-semibold text-ink">
              Answer all five questions to see your result
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {answeredCount} of {QUESTIONS.length} answered.
            </p>
          </div>
        )}
        <p className="mt-8 text-xs leading-relaxed text-ink-faint">
          This is a directional self-assessment, not a formal compliance or OGMP 2.0 conformance
          audit. Use it to identify where to focus, not as a substitute for a real evaluation.
        </p>
      </Card>
    </div>
  );
}
