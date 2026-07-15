import type { Metadata } from 'next';
import { ToolShell } from '@/components/tools/ToolShell';
import { PriorityScoreEstimator } from '@/components/tools/PriorityScoreEstimator';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Inspection Priority Score Estimator',
  description:
    'Free tool: estimate the relative inspection priority of a pipeline segment or a piece of refinery static equipment from five risk factors - age, construction, consequence area, time since last inspection, and history.',
  path: '/tools/inspection-priority-score',
  keywords: [
    'risk-based inspection calculator',
    'pipeline segment priority score',
    'inspection priority estimator',
    'RBI scoring tool',
    'static equipment inspection priority tool',
    'API 580 risk matrix tool',
    'likelihood consequence matrix calculator',
  ],
});

const faqs = [
  {
    question: 'What is the Inspection Priority Score Estimator?',
    answer:
      'A free engine that models a pipeline segment or refinery asset on a likelihood x consequence risk matrix - the shape used across API 580-style risk-based inspection methodology. Four weighted likelihood factors and one consequence factor are combined, plotted on a 5x5 matrix, and explained line-by-line in an insight log.',
  },
  {
    question: 'Does this replace a real risk-based inspection (RBI) programme?',
    answer:
      'No, and it says so on the page. A formal RBI programme uses your actual asset data, multiple consequence categories (safety, environmental, economic), applicable codes and standards, and an operator-defined risk matrix. This tool illustrates the same underlying logic in simplified form - it is not a substitute for that process.',
  },
  {
    question: 'Why is inspection history weighted more heavily than the other likelihood factors?',
    answer:
      'A documented history of anomalies or repairs is typically the strongest single predictor of future risk, so it carries a ×1.8 weight in the likelihood calculation versus ×0.7-1.2 for the other three likelihood factors. The insight log shows the exact weighted arithmetic behind every result.',
  },
  {
    question: 'Is the risk matrix based on an official API 580 threshold?',
    answer:
      'The 5x5 likelihood/consequence matrix shape is modelled on the style used across API 580-based programmes, but the specific priority-band thresholds used here are our own simplified illustration - API 580 deliberately leaves exact matrix definitions to each operator\'s own programme, and we say that plainly rather than implying an official standard number.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Inspection Priority Score Estimator"
      lead="Set five weighted likelihood and consequence factors and watch the engine plot your asset on a live risk matrix - with a full, weighted breakdown of exactly how it got there."
      slug="/tools/inspection-priority-score"
      name="Inspection Priority Score Estimator"
      schemaDescription="A free risk-matrix engine that estimates the relative inspection priority of a pipeline segment or refinery static-equipment asset from weighted likelihood and consequence factors, in the style of API 580-based risk-based inspection."
      methodologyNote="Four likelihood factors (age, construction/material risk, history of anomalies, time since last inspection) are combined with individual weights - history carries the most weight because documented past findings are the strongest single risk signal - and scaled to a 1-5 likelihood band. A fifth factor, consequence area, scales to a 1-5 consequence band. The two bands place your asset on a 5x5 likelihood x consequence matrix in the general shape used by API 580-style risk-based inspection programmes. The specific band thresholds are our own simplified illustration, not API 580's official values, since API 580 leaves matrix definition to each operator. This tool does not use your actual asset data and is not a substitute for a formal RBI programme aligned to applicable codes and standards."
      faqs={faqs}
    >
      <PriorityScoreEstimator />
    </ToolShell>
  );
}
