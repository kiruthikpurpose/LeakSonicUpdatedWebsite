'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart } from '@/components/tools/BarChart';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

type Question = {
  id: string;
  category: string;
  prompt: string;
  rationale: string;
  options: { label: string; points: 0 | 1 | 2 }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'prioritisation',
    category: 'Prioritisation',
    prompt: 'How do you currently decide which segments or assets to inspect next?',
    rationale: 'Evidence-based ranking is the foundation measurement-based reporting is built on.',
    options: [
      { label: 'Ad hoc, or based on institutional memory', points: 0 },
      { label: 'Spreadsheet-based scheduling', points: 1 },
      { label: 'A defined, evidence-based risk ranking', points: 2 },
    ],
  },
  {
    id: 'comparison',
    category: 'Cycle comparison',
    prompt: 'Do you systematically compare each inspection cycle against the last one?',
    rationale: 'Cycle-over-cycle comparison is what turns raw readings into a trend a regulator can trust.',
    options: [
      { label: 'Rarely - mostly reviewed fresh each time', points: 0 },
      { label: 'Sometimes, informally', points: 1 },
      { label: 'Yes, systematically for every cycle', points: 2 },
    ],
  },
  {
    id: 'measurement',
    category: 'Data measurement',
    prompt: 'Is your emissions/integrity reporting based on estimated or measured data?',
    rationale: 'Frameworks like OGMP 2.0 explicitly distinguish estimate-based reporting from measurement-based reporting.',
    options: [
      { label: 'Mostly estimated factors', points: 0 },
      { label: 'A mix of estimated and measured', points: 1 },
      { label: 'Mostly measured, source-level data', points: 2 },
    ],
  },
  {
    id: 'granularity',
    category: 'Data granularity',
    prompt: 'Is your data reconciled at the site level, or only at the individual source level?',
    rationale: 'The highest measurement-based reporting tiers require site-level totals reconciled against source-level data, not one or the other alone.',
    options: [
      { label: 'Source-level only, no site-level reconciliation', points: 0 },
      { label: 'Some reconciliation, not systematic', points: 1 },
      { label: 'Source-level data reconciled against site-level totals', points: 2 },
    ],
  },
  {
    id: 'turnaround',
    category: 'Turnaround time',
    prompt: 'How long does it typically take to turn field evidence into a finished report?',
    rationale: 'Reporting lag determines whether findings can actually inform near-term maintenance decisions.',
    options: [
      { label: 'Multiple weeks', points: 0 },
      { label: 'About a week', points: 1 },
      { label: 'A few days or less', points: 2 },
    ],
  },
  {
    id: 'format',
    category: 'Reporting format',
    prompt: 'Do your inspection records map cleanly to your regulatory reporting format?',
    rationale: 'Manual re-keying between inspection records and compliance formats is where errors and delay both concentrate.',
    options: [
      { label: 'No, significant manual re-keying is needed', points: 0 },
      { label: 'Partially - some manual work remains', points: 1 },
      { label: 'Yes, largely structured for direct reporting', points: 2 },
    ],
  },
  {
    id: 'verification',
    category: 'Verification / QA',
    prompt: 'Is there an independent review or QA step before a finding becomes a reported figure?',
    rationale: 'Third-party or independent verification is a defining feature of the higher measurement-based reporting tiers.',
    options: [
      { label: 'No formal QA step', points: 0 },
      { label: 'Internal review only', points: 1 },
      { label: 'Independent or third-party verification', points: 2 },
    ],
  },
  {
    id: 'audit',
    category: 'Audit trail',
    prompt: 'Can you trace a reported figure back to the specific evidence behind it?',
    rationale: 'A defensible report needs a traceable evidence chain, not just a final aggregate number.',
    options: [
      { label: 'Not easily - records are scattered', points: 0 },
      { label: 'With effort, across multiple systems', points: 1 },
      { label: 'Yes, every figure traces to specific evidence', points: 2 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 2;

const BANDS = [
  {
    max: 0.35,
    name: 'Foundational',
    body: 'Your current workflow leans on manual review and estimation. That is common, and not a criticism - it is where most integrity programmes start. The highest-leverage next step is usually introducing a defined, evidence-based prioritisation method before anything else.',
  },
  {
    max: 0.65,
    name: 'Developing',
    body: 'You have real structure in some categories - partial comparison across cycles, or a mix of estimated and measured data - but manual steps are still creating rework elsewhere. Closing the gap between field evidence and a report-ready, audit-traceable record is typically the next highest-leverage step.',
  },
  {
    max: 1.01,
    name: 'Advanced',
    body: 'Your programme already has real structure across most categories: systematic cycle comparison, measured and reconciled data, independent QA, and reporting-aligned records. At this stage the marginal gains usually come from tightening turnaround time and deepening the audit trail further.',
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
  const ratio = score / MAX_SCORE;
  const band = useMemo(() => BANDS.find((b) => ratio <= b.max) ?? BANDS[BANDS.length - 1]!, [ratio]);

  const barData = QUESTIONS.map((q) => ({
    label: q.category,
    value: answers[q.id] ?? 0,
    display: answers[q.id] !== undefined ? `${answers[q.id]}/2` : '-/2',
  }));

  const log: LogLine[] = allAnswered
    ? [
        ...QUESTIONS.map((q) => ({
          label: `${q.category}: ${answers[q.id]}/2`,
          detail: `${q.options.find((o) => o.points === answers[q.id])?.label}. ${q.rationale}`,
        })),
        {
          label: 'Total score',
          detail: `${score} of a possible ${MAX_SCORE} points across ${QUESTIONS.length} categories (${Math.round(ratio * 100)}%), mapping to the "${band.name}" band.`,
        },
      ]
    : [];

  function reset() {
    setAnswers({});
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Eight questions, eight categories</h3>
          <div className="mt-6 space-y-7">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id}>
                <p className="mono-label text-accent">{q.category}</p>
                <p className="mt-1.5 text-sm font-medium text-ink">
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
                <div className="font-sans text-2xl font-bold text-accent">
                  {score} / {MAX_SCORE}
                </div>
                <div className="mt-1 text-xs text-ink-muted">self-assessed score</div>
              </div>
            </div>
          ) : (
            <div>
              <p className="mono-label text-ink-muted">Your readiness band</p>
              <h3 className="mt-3 text-h3 font-semibold text-ink">
                Answer all eight questions to see your result
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

      <BarChart
        data={barData}
        max={2}
        caption="Your score in each of the eight readiness categories."
      />

      {allAnswered && <InsightLog lines={log} title="Category-by-category breakdown" />}

      <References
        items={[
          {
            label: 'Where does your inspection programme sit on the path to measurement-based reporting?',
            href: '/blog/methane-reporting-readiness-self-assessment',
            note: 'LeakSonic blog - full methodology write-up for this assessment.',
          },
          {
            label: 'What "audit-ready" pipeline data actually means under PNGRB, OGMP 2.0, and emerging standards',
            href: '/blog/audit-ready-pipeline-data-standards',
            note: 'LeakSonic blog - the audit-trail and format categories in this tool.',
          },
          {
            label: 'Methane regulation and reporting: a global comparison',
            href: '/blog/methane-regulation-global-comparison',
            note: 'LeakSonic blog - regulatory context behind the measurement/granularity categories.',
          },
          {
            label: 'OGMP 2.0 - Oil & Gas Methane Partnership',
            href: 'https://www.ogmpartnership.com/',
            note: 'The official measurement-based methane reporting framework this assessment is directionally informed by.',
            external: true,
          },
          {
            label: 'PNGRB - Petroleum and Natural Gas Regulatory Board',
            href: 'https://www.pngrb.gov.in/',
            note: 'India\'s pipeline integrity and reporting regulator, referenced in the format category.',
            external: true,
          },
        ]}
      />
    </div>
  );
}
