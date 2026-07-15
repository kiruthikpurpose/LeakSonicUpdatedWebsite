import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { ReportingReadinessQuiz } from '@/components/tools/ReportingReadinessQuiz';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Integrity & Methane Reporting Readiness Assessment',
  description:
    'Free 8-category self-assessment engine: find out how your gas pipeline or refinery inspection and emissions-reporting workflow compares to measurement-based, evidence-driven best practice - with a per-category breakdown, insight log, and directional readiness band.',
  path: '/tools/reporting-readiness-assessment',
  keywords: [
    'OGMP 2.0 readiness assessment',
    'methane reporting readiness tool',
    'pipeline integrity reporting self-assessment',
    'measurement-based methane reporting checklist',
    'gas pipeline compliance readiness quiz',
    'OGMP 2.0 reporting tiers self-assessment',
  ],
});

const faqs = [
  {
    question: 'What is the Integrity & Methane Reporting Readiness Assessment?',
    answer:
      'A free, eight-category self-assessment engine that scores your current inspection prioritisation, cycle comparison, data measurement, data granularity, turnaround time, reporting format, verification/QA, and audit trail against measurement-based, evidence-driven best practice - returning a per-category breakdown chart, a line-by-line insight log, and a directional readiness band, not a formal audit result.',
  },
  {
    question: 'Is this an official OGMP 2.0 conformance check?',
    answer:
      'No. OGMP 2.0 conformance is assessed formally through the framework’s own reporting tiers and process, run by the Oil & Gas Methane Partnership. This tool is a quick, directional self-assessment informed by the general shape of that framework, to help you identify where your workflow has the most room to improve - a starting point for a conversation, not a substitute for formal conformance assessment.',
  },
  {
    question: 'How is the score calculated?',
    answer:
      'Each of the eight categories is worth up to 2 points based on the option you select, for a maximum score of 16. Your total, and your per-category breakdown, map to one of three bands - Foundational, Developing, or Advanced - each with a short explanation of what typically helps most at that stage, plus a full insight log explaining every category score.',
  },
  {
    question: 'Why does the assessment include a "data granularity" category?',
    answer:
      'Because measurement-based reporting frameworks like OGMP 2.0 distinguish between source-level measurement and site-level reconciliation - the highest reporting tiers require both, not one alone. That distinction is easy to miss, so we score it as its own category rather than folding it into general "measurement."',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Integrity & Methane Reporting Readiness Assessment"
      lead="Eight questions across eight categories - prioritisation, cycle comparison, measurement, granularity, turnaround, format, verification, and audit trail - scored instantly with a category breakdown and a full insight log."
      slug="/tools/reporting-readiness-assessment"
      name="Integrity & Methane Reporting Readiness Assessment"
      schemaDescription="A free eight-category self-assessment engine that scores a gas pipeline or refinery operator's inspection and emissions-reporting workflow against measurement-based best practice, with a per-category chart and insight log."
      methodologyNote="Each of the eight categories carries 0, 1, or 2 points based on how close your answer is to a defined, evidence-based, measurement-driven workflow. The maximum score is 16, mapped to three bands, with a bar chart showing your score in every category and a line-by-line insight log explaining each one. The category set is directionally informed by the general shape of frameworks like OGMP 2.0 - source-level versus site-level data granularity, independent verification, and audit traceability are treated as distinct categories because the highest measurement-based reporting tiers require all of them together. This is a self-reported, directional tool built for quick reflection - it does not verify your answers, does not connect to any regulatory system, and is not a substitute for a formal OGMP 2.0 conformance assessment or a real technical evaluation of your programme."
      faqs={faqs}
    >
      <ReportingReadinessQuiz />
    </ToolShell>
  );
}
