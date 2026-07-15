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
  ],
});

const faqs = [
  {
    question: 'What is the Inspection Priority Score Estimator?',
    answer:
      'A free educational tool that turns five relative risk factors - asset age, construction/material risk, consequence area, time since last inspection, and history of anomalies - into an illustrative priority score and band, to demonstrate how risk-based prioritisation thinking works.',
  },
  {
    question: 'Does this replace a real risk-based inspection (RBI) programme?',
    answer:
      'No. A formal RBI programme uses your actual asset data, applicable codes and standards, and a rigorous methodology. This tool is intentionally simplified and educational, meant to illustrate the kind of factors that matter, not to generate a defensible inspection plan.',
  },
  {
    question: 'Why is inspection history weighted more heavily than the other factors?',
    answer:
      'In practice, a documented history of anomalies or repairs is usually the single strongest signal that an asset needs closer attention, so this tool weights it roughly twice as heavily as the other four factors when computing the illustrative score.',
  },
];

export default function Page() {
  return (
    <ToolShell
      eyebrow="Free tool"
      title="Inspection Priority Score Estimator"
      lead="Describe a pipeline segment or a piece of refinery equipment across five risk factors and get an illustrative relative-priority score - a fast way to see how risk-based prioritisation thinking works."
      slug="/tools/inspection-priority-score"
      name="Inspection Priority Score Estimator"
      schemaDescription="A free tool that estimates the relative inspection priority of a pipeline segment or refinery static-equipment asset from five weighted risk factors."
      methodologyNote="Each factor is scored low/medium/high (1-3 points), with inspection history weighted roughly twice as heavily because documented anomalies are typically the strongest single risk signal. The combined score (4-18) maps to one of four illustrative priority bands. This is a simplified, educational demonstration of risk-based-inspection logic - it does not use your actual asset data and is not a substitute for a formal RBI programme aligned to applicable codes and standards."
      faqs={faqs}
    >
      <PriorityScoreEstimator />
    </ToolShell>
  );
}
