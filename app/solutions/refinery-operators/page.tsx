import type { Metadata } from 'next';
import { ShieldCheck, FileCheck2, Flame } from 'lucide-react';
import { AudienceLayout, type AudienceContent } from '@/components/sections/AudienceLayout';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'For refinery and industrial operators',
  description:
    'For refinery, terminal, and plant inspection teams: Sentrix turns drone evidence from fired heaters, vessels, storage tanks, and elevated piping into a defensible, report-ready record - a rope access and scaffolding alternative that fits your existing turnaround and RBI programmes.',
  path: '/solutions/refinery-operators',
  keywords: [
    'refinery inspection drone',
    'static equipment inspection',
    'rope access alternative',
    'scaffolding inspection alternative',
    'industrial asset inspection drone',
    'fired heater inspection',
    'pressure vessel inspection drone',
  ],
});

const content: AudienceContent = {
  eyebrow: 'For operators',
  title: 'Turn a turnaround-season inspection backlog into a prioritised, defensible plan.',
  lead: 'For refinery, terminal, and process-plant inspection teams. Sentrix is an engineering decision layer that fits inside your existing risk-based inspection programme - it turns drone evidence from fired heaters, vessels, storage tanks, and elevated piping into a prioritised, defensible answer to what needs attention next, without the scaffolding or rope-access mobilisation that evidence used to require.',
  slug: '/solutions/refinery-operators',
  name: 'Refinery & industrial operators',
  stats: [
    { value: 'Risk-ranked', label: 'static equipment prioritisation', icon: ShieldCheck },
    { value: 'Rope-access', label: 'alternative for evidence gathering', icon: Flame },
    { value: 'RBI-format', label: 'output, not rework', icon: FileCheck2 },
  ],
  concernsHeading: 'The questions a plant inspection lead actually asks',
  concernsLead:
    'You don’t need another flight vendor. You need less scaffolding time, less rope-access mobilisation, and a record your RBI programme can actually use. That’s what we optimise for.',
  concerns: [
    {
      title: 'Does it reduce scaffolding and rope-access cost?',
      body: 'Fired heaters, elevated piping, vessel shells, and tank roofs are traditionally accessed by scaffolding or rope-access teams working at height. Sentrix turns drone-captured evidence into the same defensible record, so mobilisation is reserved for the locations that genuinely need close-contact work.',
    },
    {
      title: 'Does it fit our RBI and turnaround programme?',
      body: 'Report-ready output is a first-class deliverable, not a manual afterthought. Findings come structured to feed your existing risk-based inspection and turnaround planning process, removing a transcription step rather than adding a new one.',
    },
    {
      title: 'Does it replace our thickness gauging and NDT programme?',
      body: 'No. Ultrasonic thickness gauging, weld examination, and other contact-based NDT measure things airborne evidence cannot. Sentrix works on the visual and thermal evidence layer and focuses where that close-contact effort is spent - screening first, mobilising second.',
    },
    {
      title: 'Can I trust a software-flagged finding?',
      body: 'Every flagged item carries its evidence - what was observed and why it was flagged - so your inspection engineers audit the reasoning instead of trusting an opaque score.',
    },
  ],
  valueHeading: 'What lands on your inspection team’s desk',
  values: [
    {
      title: 'A prioritised static-equipment target list',
      body: 'A defensible, evidence-based ranking of vessels, heaters, tanks, and elevated piping to inspect first - replacing ad hoc scheduling as the basis for turnaround planning.',
    },
    {
      title: 'Cycle-over-cycle change detection',
      body: 'What changed since the last inspection pass, isolated from what was already known, so your team reviews new risk rather than re-reading static condition.',
    },
    {
      title: 'A report-ready inspection record',
      body: 'Auditable records generated automatically, structured to align with your RBI programme and internal reporting requirements.',
    },
    {
      title: 'Evidence you can defend in a budget review',
      body: 'A clear, traceable basis for where inspection and maintenance spend goes next - useful to the engineer doing the review and the person signing off the budget.',
    },
  ],
  cta: {
    title: 'Tell us about your site.',
    body: 'Share what static equipment and access constraints you’re working with, and we’ll walk through how Sentrix would prioritise it - including an honest account of what we can and can’t yet prove at this stage.',
    primaryHref: '/contact',
    primaryLabel: 'Talk to us as an operator',
  },
};

export default function Page() {
  return <AudienceLayout content={content} />;
}
