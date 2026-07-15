import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { ReportingReadinessQuiz } from '@/components/tools/ReportingReadinessQuiz';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Integrity & Methane Reporting Readiness Assessment',
  description:
    'Free 5-question self-assessment: find out how your gas pipeline or refinery inspection and emissions-reporting workflow compares to measurement-based, evidence-driven best practice - with a directional readiness band and next steps.',
  path: '/tools/reporting-readiness-assessment',
  keywords: [
    'OGMP 2.0 readiness assessment',
    'methane reporting readiness tool',
    'pipeline integrity reporting self-assessment',
    'measurement-based methane reporting checklist',
    'gas pipeline compliance readiness quiz',
  ],
});

const faqs = [
  {
    question: 'What is the Integrity & Methane Reporting Readiness Assessment?',
    answer:
      'A free, five-question self-assessment that scores how close your current inspection prioritisation, cycle-over-cycle comparison, data measurement, and reporting workflow are to measurement-based, evidence-driven best practice - returning a directional readiness band, not a formal audit result.',
  },
  {
    question: 'Is this an official OGMP 2.0 conformance check?',
    answer:
      'No. OGMP 2.0 conformance is assessed formally through the framework’s own reporting tiers and process. This tool is a quick, directional self-assessment to help you identify where your workflow has the most room to improve - a starting point for a conversation, not a substitute for formal conformance assessment.',
  },
  {
    question: 'How is the score calculated?',
    answer:
      'Each of the five questions is worth up to 2 points based on the option you select, for a maximum score of 10. Your total maps to one of three bands - Foundational, Developing, or Advanced - each with a short explanation of what typically helps most at that stage.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Integrity & Methane Reporting Readiness Assessment"
      lead="Five quick questions on how you prioritise inspection, compare cycles, measure data, and report findings - answered honestly, scored instantly, with a directional next step."
      slug="/tools/reporting-readiness-assessment"
      name="Integrity & Methane Reporting Readiness Assessment"
      schemaDescription="A free five-question self-assessment tool that scores a gas pipeline or refinery operator's inspection and emissions-reporting workflow against measurement-based best practice."
      methodologyNote="Each answer carries 0, 1, or 2 points based on how close it is to a defined, evidence-based, measurement-driven workflow. The maximum score is 10, mapped to three bands. This is a self-reported, directional tool built for quick reflection - it does not verify your answers, does not connect to any regulatory system, and is not a substitute for a formal OGMP 2.0 conformance assessment or a real technical evaluation of your programme."
      faqs={faqs}
    >
      <ReportingReadinessQuiz />
    </ToolShell>
  );
}
