import type { Metadata } from 'next';
import { ShieldCheck, ScrollText, FlaskConical } from 'lucide-react';
import { AudienceLayout, type AudienceContent } from '@/components/sections/AudienceLayout';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'For government programs & agencies',
  description:
    'For regulators, incubators, and grant programs: a technically serious, regulation-fluent team building measurement-based methane and pipeline-integrity intelligence, with an honest technology-readiness stage and a published validation plan.',
  path: '/solutions/government-agencies',
  keywords: [
    'PNGRB compliance technology',
    'methane emissions reporting',
    'pipeline integrity policy',
    'deep-tech grant technology oil and gas',
    'City Gas Distribution regulation technology',
    'industrial asset inspection policy',
  ],
});

const content: AudienceContent = {
  eyebrow: 'For government & agencies',
  title: 'Technical seriousness and regulatory fluency, stated honestly.',
  lead: 'For regulators, incubation programs, and grant reviewers evaluating pipeline-integrity and methane-monitoring technology. We build measurement-based pipeline-integrity intelligence for gas infrastructure, we know the regulatory landscape we operate in, and we tell you exactly what stage we’re at.',
  slug: '/solutions/government-agencies',
  name: 'Government & agencies',
  stats: [
    { value: 'Published', label: 'validation methodology', icon: ScrollText },
    { value: 'Regulator-aligned', label: 'compliance output', icon: ShieldCheck },
    { value: 'Testable', label: 'claims, stated openly', icon: FlaskConical },
  ],
  context: {
    heading: 'What we actually build, for a technical reviewer',
    paragraphs: [
      'LeakSonic builds Sentrix, a proprietary software and hardware engineering decision intelligence platform. Our core focus today is gas pipeline integrity inspection, including City Gas Distribution networks, with refinery and industrial static-equipment inspection as a second genuine, current application area of the same platform - not a future roadmap item.',
      'For a program or agency evaluating us, the relevant facts are: government-incubated at AIC RAISE, DPIIT-recognised under Startup India, MSME-registered, a national win at Smart India Hackathon 2025, and a patent application filed on our core methodology. We are actively validating the platform with practising engineers rather than presenting unproven claims as fact, and we publish exactly what we are testing on our approach page.',
      'The structural case for funding is straightforward: gas network and refinery inspection capacity is not scaling with the growth and ageing of the underlying asset base, and methane reporting is shifting from estimated to measured under frameworks like OGMP 2.0 - a policy-relevant, multi-decade problem, not a one-time pitch.',
    ],
  },
  flowStages: [
    { label: 'Field evidence', sub: 'Inspection data from pipeline or plant assets' },
    { label: 'Sentrix', sub: 'Proprietary decision-intelligence software' },
    { label: 'Operator engineer', sub: 'Reviews findings, retains judgement' },
    { label: 'Regulator-aligned record', sub: 'PNGRB-format and OGMP 2.0-aligned output' },
  ],
  flowAccentIndex: 1,
  flowCaption: 'How Sentrix output is designed to align with the reporting frameworks a program already tracks.',
  concernsHeading: 'What a program reviewer is really assessing',
  concernsLead:
    'Not polish - seriousness. Whether the team understands the domain and the regulations, whether the technical claims are grounded, and whether the stage is represented honestly.',
  concerns: [
    {
      title: 'Is the team technically serious?',
      body: 'Our approach page shows how we work: every claim tested with practising engineers, evidence attached to every finding, and an explicit account of what we do and do not do. No hand-waving, no undefined "AI" - and no exposure of the internals a competitor would love to see.',
    },
    {
      title: 'Is it regulation-fluent?',
      body: 'The platform is designed around integrity reporting that fits how operators actually report - PNGRB in India today, built to extend to other jurisdictions - and the shift toward measurement-based methane accounting under regimes such as OGMP 2.0. Regulatory fit is a design input, not a checkbox added later.',
    },
    {
      title: 'Is the stage represented honestly?',
      body: 'We describe our stage plainly and everywhere - actively developing and validating with practising engineers. We publish the claims we’re testing and commit to reporting outcomes either way, which is exactly the posture a grant reviewer should want to see.',
    },
    {
      title: 'Does it fit your priorities?',
      body: 'Gas-focused, aligned with the methane-measurement agenda and the structural gap between pipeline network growth and inspection capacity that most gas-producing and gas-importing regions are facing.',
    },
    {
      title: 'Is the underlying technology protected?',
      body: 'Yes - the core methodology is proprietary and a patent application has been filed. We do not publish the specific technical implementation, which is a deliberate posture for a deep-tech evaluation, not a gap in the underlying work.',
    },
  ],
  valueHeading: 'What we bring to a program or evaluation',
  values: [
    {
      title: 'A published validation methodology',
      body: 'A concrete, testable plan - named claims, defined tests, and a commitment to publish results - that a reviewer can hold us to.',
    },
    {
      title: 'Regulatory-native output',
      body: 'Compliance-aligned integrity reporting and measurement-based emissions framing built into the product, not bolted on.',
    },
    {
      title: 'A grounded, honest stage',
      body: 'No inflated readiness claims - a clearly stated technology readiness level, with a clear line of sight to controlled field validation and an operator pilot.',
    },
    {
      title: 'A structural problem worth funding',
      body: 'Gas network growth is outpacing inspection capacity across multiple regions at once; the underlying model transfers wherever that gap exists.',
    },
  ],
  cta: {
    title: 'Evaluating us for a program?',
    body: 'Tell us which program or evaluation, and what you need to assess. We’ll give you the technical detail and honest stage information a rigorous review requires.',
    primaryHref: '/contact',
    primaryLabel: 'Contact as a program or agency',
  },
};

export default function Page() {
  return <AudienceLayout content={content} />;
}
