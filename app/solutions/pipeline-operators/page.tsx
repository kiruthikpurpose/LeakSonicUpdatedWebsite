import type { Metadata } from 'next';
import { Gauge, FileCheck2, GitCompareArrows } from 'lucide-react';
import { AudienceLayout, type AudienceContent } from '@/components/sections/AudienceLayout';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'For pipeline operators',
  description:
    'For gas transmission and distribution operators: Sentrix prioritises which pipeline segments to inspect, fits your compliance reporting, and complements - not replaces - your inline inspection and CP programmes.',
  path: '/solutions/pipeline-operators',
  keywords: [
    'gas pipeline inspection',
    'pipeline integrity monitoring',
    'pipeline right-of-way monitoring',
    'PNGRB compliance technology',
  ],
});

const content: AudienceContent = {
  eyebrow: 'For operators',
  title: 'Point scarce inspection effort at the segments that actually need it.',
  lead: 'For gas transmission, distribution, and city gas network operators anywhere. Sentrix is an engineering decision layer that fits inside your existing integrity programme - it turns raw drone evidence into a prioritised, defensible answer to where to inspect next, and hands you an audit trail and a report-ready record on the way out.',
  slug: '/solutions/pipeline-operators',
  name: 'Pipeline operators',
  stats: [
    { value: 'Risk-ranked', label: 'segment prioritisation', icon: Gauge },
    { value: 'Cycle-over-cycle', label: 'change detection', icon: GitCompareArrows },
    { value: 'Compliance-format', label: 'output, not rework', icon: FileCheck2 },
  ],
  concernsHeading: 'The questions a chief engineer actually asks',
  concernsLead:
    'You don’t need another imagery vendor. You need less risk per unit of inspection spend and a report that doesn’t create rework. That’s what we optimise for.',
  concerns: [
    {
      title: 'Does it reduce risk per inspection dollar?',
      body: 'By ranking segments on integrity risk and change, Sentrix concentrates your inspection budget on the highest-value locations instead of spreading it uniformly along the line - the same spend, pointed better.',
    },
    {
      title: 'Does it fit our compliance reporting?',
      body: 'Compliance-format output is a first-class deliverable, not a manual afterthought. Findings come structured for regulator-aligned integrity records - PNGRB-format in India, or the equivalent format your jurisdiction requires - removing a transcription step from your workflow.',
    },
    {
      title: 'Does it replace what we already run?',
      body: 'No. Inline inspection and cathodic-protection surveys measure things airborne sensing can’t. Sentrix works on the surface and the right-of-way and focuses the planning phase so your existing tools are aimed better.',
    },
    {
      title: 'Can I trust a software observation?',
      body: 'Every flagged segment carries its evidence - which signals agreed and what changed since the last cycle - so your engineers audit the reasoning instead of trusting a black box.',
    },
  ],
  valueHeading: 'What lands on your integrity team’s desk',
  values: [
    {
      title: 'A prioritised inspection target list',
      body: 'A defensible, data-driven ranking of segments to inspect first - replacing spreadsheets and institutional memory as the basis for planning.',
    },
    {
      title: 'Cycle-over-cycle change detection',
      body: 'What changed since the last inspection, isolated from what was already there, so your team reviews new risk rather than re-reading static features.',
    },
    {
      title: 'A compliance-format integrity record',
      body: 'Auditable records generated automatically, structured to align with your regulator’s reporting requirements.',
    },
    {
      title: 'A quantified emissions / risk signal',
      body: 'Where the data supports it, an indicator that ties surface observations to emissions and risk in measurement-based terms.',
    },
  ],
  cta: {
    title: 'Tell us about your network.',
    body: 'Share your network type and inspection cycle, and we’ll walk through how Sentrix would prioritise it - including an honest account of what we can and can’t yet prove at this stage.',
    primaryHref: '/contact',
    primaryLabel: 'Talk to us as an operator',
  },
};

export default function Page() {
  return <AudienceLayout content={content} />;
}
