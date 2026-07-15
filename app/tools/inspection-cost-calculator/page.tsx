import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { InspectionRoiCalculator } from '@/components/tools/InspectionRoiCalculator';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Inspection Cost & ROI Calculator',
  description:
    'Free calculator: estimate the engineer-hours and cost a prioritised, decision-ready inspection workflow could save on your gas pipeline, City Gas Distribution network, or refinery site - based on inputs you control.',
  path: '/tools/inspection-cost-calculator',
  keywords: [
    'pipeline inspection cost calculator',
    'inspection ROI calculator',
    'refinery inspection cost savings tool',
    'CGD inspection cost estimator',
    'inspection efficiency calculator oil and gas',
  ],
});

const faqs = [
  {
    question: 'What does the Inspection Cost & ROI Calculator actually calculate?',
    answer:
      'It derives your current annual manual-review hour load from your cycle length and per-cycle review hours, applies a review-effort reduction percentage you set yourself, converts that to cost at your stated hourly rate, and projects the cumulative five-year potential. Every step is shown in a line-by-line insight log, not just a final number.',
  },
  {
    question: 'Is this calculator specific to pipelines, or does it work for refineries too?',
    answer:
      'Both. Toggle between a pipeline/City Gas Distribution network and a refinery or industrial site - the underlying calculation is the same because the real driver of cost is engineer review hours, not the specific asset type.',
  },
  {
    question: 'Where do the savings numbers come from, and can I trust them?',
    answer:
      'From your own inputs, transparently. You set the review-effort reduction assumption yourself rather than us asserting a fixed number, and the insight log shows the exact arithmetic behind every figure so you can audit it line by line - because the actual efficiency gain depends on your data quality, network, and workflow, and we don’t present unvalidated performance figures as fact.',
  },
  {
    question: 'What does the five-year projection chart show?',
    answer:
      'A running cumulative total of your estimated annual cost saving, held constant across five years. It does not account for network growth, changing cycle lengths, or inflation - it is a simple compounding view to help you see the scale of a recurring saving over time, not a financial forecast.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Inspection Cost & ROI Calculator"
      lead="A transparent estimation engine: set your cycle, review hours, and cost assumptions, and watch a five-year projection and a full line-by-line breakdown build in real time."
      slug="/tools/inspection-cost-calculator"
      name="Inspection Cost & ROI Calculator"
      schemaDescription="A free calculator engine that estimates engineer-hours and cost savings from a prioritised gas pipeline or refinery inspection workflow, based on user-supplied inputs, with a five-year projection and a transparent insight log."
      methodologyNote="This tool derives your current annual review-hour load from your cycle length and per-cycle hours, multiplies by the review-effort reduction percentage you set, applies your stated hourly cost, and projects the result across five years assuming constant inputs. It does not use any data from your organisation, does not connect to Sentrix, and does not represent a validated measurement of Sentrix's actual performance - it is a planning aid to help you reason transparently about where inspection cost currently goes, with every step of the arithmetic shown in the insight log below. For a defensible, evidence-backed number specific to your network, talk to us directly."
      faqs={faqs}
    >
      <InspectionRoiCalculator />
    </ToolShell>
  );
}
