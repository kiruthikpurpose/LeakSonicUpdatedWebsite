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
      'It converts the manual evidence-review and reporting hours you currently spend per inspection cycle into an illustrative time and cost saving, based on a review-effort reduction percentage you set yourself. It is a planning tool, not a benchmark of Sentrix’s actual measured performance.',
  },
  {
    question: 'Is this calculator specific to pipelines, or does it work for refineries too?',
    answer:
      'Both. Toggle between a pipeline/City Gas Distribution network and a refinery or industrial site - the underlying calculation is the same because the real driver of cost is engineer review hours, not the specific asset type.',
  },
  {
    question: 'Where do the savings numbers come from?',
    answer:
      'From your own inputs. You set the review-effort reduction assumption yourself rather than us asserting a fixed number, because the actual efficiency gain depends on your data quality, network, and workflow - and we don’t present unvalidated performance figures as fact.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Inspection Cost & ROI Calculator"
      lead="See what a prioritised, decision-ready inspection workflow could be worth on your network or site - in engineer-hours and cost, using assumptions you control."
      slug="/tools/inspection-cost-calculator"
      name="Inspection Cost & ROI Calculator"
      schemaDescription="A free calculator that estimates engineer-hours and cost savings from a prioritised gas pipeline or refinery inspection workflow, based on user-supplied inputs."
      methodologyNote="This tool multiplies the manual review hours you enter by the review-effort reduction percentage you set, then applies your stated hourly cost. It does not use any data from your organisation, does not connect to Sentrix, and does not represent a validated measurement of Sentrix's actual performance - it is a planning aid to help you reason about where inspection cost currently goes. For a defensible, evidence-backed number specific to your network, talk to us directly."
      faqs={faqs}
    >
      <InspectionRoiCalculator />
    </ToolShell>
  );
}
