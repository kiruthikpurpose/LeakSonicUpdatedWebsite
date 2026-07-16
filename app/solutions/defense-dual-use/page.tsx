import type { Metadata } from 'next';
import { Shield, Radar, Lock } from 'lucide-react';
import { AudienceLayout, type AudienceContent } from '@/components/sections/AudienceLayout';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Dual-use potential: defence, swarms & industrial infrastructure intelligence',
  description:
    'Sentrix is built today for gas pipeline and refinery inspection, pairing AI-driven software with drone hardware we design and test ourselves. That AI architecture is designed to generalise, and we see genuine long-term potential in defence, national-security infrastructure inspection, broader industrial infrastructure intelligence, and coordinated multi-drone (swarm) operation - stated honestly as an exploratory direction, not a current engagement.',
  path: '/solutions/defense-dual-use',
  keywords: [
    'dual-use drone software',
    'defense infrastructure inspection technology',
    'national security asset inspection software',
    'critical infrastructure monitoring technology',
    'defense decision intelligence software',
    'drone swarm AI software',
    'industrial infrastructure intelligence AI',
  ],
});

const content: AudienceContent = {
  eyebrow: 'For defence & dual-use exploration',
  title: 'Long-term potential in defence, swarms, and industrial infrastructure intelligence.',
  lead: 'We build Sentrix, an AI-driven decision-intelligence platform paired with drone hardware we design, build, and test ourselves, for gas pipeline and refinery inspection today - that remains our near-term focus. The underlying AI is deliberately general: evidence capture, standardised comparison, and defensible prioritisation are not oil-and-gas-specific problems, and we see genuine long-term potential in defence and national-security infrastructure inspection, broader industrial infrastructure intelligence, and coordinated multi-drone (swarm) operation, as directions the company may pursue as it matures.',
  slug: '/solutions/defense-dual-use',
  name: 'Defence & dual-use',
  stats: [
    { value: 'Exploratory', label: 'long-term R&D direction, not a current product', icon: Radar },
    { value: 'Dual-use', label: 'by architecture, not by current deployment', icon: Shield },
    { value: 'Proprietary', label: 'patent application filed on core methodology', icon: Lock },
  ],
  context: {
    heading: 'Where this actually stands today',
    paragraphs: [
      'To be direct: Sentrix has no current defence, national-security, or swarm deployment, program, or announced engagement. Our validated, near-term focus is gas pipeline inspection - including City Gas Distribution networks - and refinery and industrial static-equipment inspection. This page exists because the underlying AI is general enough that potential in defence, broader industrial infrastructure intelligence, and coordinated multi-drone operation is a genuine, honest part of our long-term thinking, and we would rather say that plainly than stay silent about it.',
      'What would make this real: sustained funding to support dedicated validation work outside oil and gas, a formal partnership or program with a defence or national-security stakeholder, and the technology-readiness work that any serious dual-use claim requires before it is more than architecture. None of that has happened yet.',
      'If you work in defence innovation, dual-use technology evaluation, or national-security infrastructure and this direction is genuinely relevant to your mandate, we would like to talk - with the clear understanding on both sides that this is early-stage exploration, not a fielded capability.',
    ],
  },
  flowStages: [
    { label: 'Proprietary core', sub: 'The decision-intelligence software we build today' },
    { label: 'Sentrix', sub: 'Standardise, compare, prioritise - asset-general by design' },
    { label: 'Hardware integration', sub: 'Evidence-capture systems, oil & gas today' },
    { label: 'Potential dual-use', sub: 'A long-term direction, not a current application' },
  ],
  flowAccentIndex: 1,
  flowCaption:
    'Conceptually, how the same proprietary decision layer could extend beyond oil and gas over the long term - not a fielded architecture or an active programme.',
  concernsHeading: 'What a defence or dual-use evaluator actually wants to know',
  concernsLead:
    'Mostly: is this real, and are you being straight about the stage. Here is the honest answer to both.',
  concerns: [
    {
      title: 'Is Sentrix deployed in any defence context today?',
      body: 'No. There is no current defence or national-security deployment, pilot, or announced partnership. Our validated work today is entirely in gas pipeline and refinery inspection.',
    },
    {
      title: 'Why mention it at all if it isn’t active?',
      body: 'Because it is a genuine part of our long-term thinking and we would rather state that honestly than have it discovered or assumed. We do not believe in overclaiming readiness, and we do not believe in staying silent about real intent either.',
    },
    {
      title: 'Does this change your near-term roadmap?',
      body: 'No. Gas pipeline and refinery inspection remain our validated, funded priority. Dual-use exploration is a longer-term direction we may pursue as the company, its funding, and its technology-readiness level mature - not a reallocation of current effort.',
    },
    {
      title: 'What would a real engagement require?',
      body: 'Dedicated validation work specific to the defence or national-security use case, a formal partnership or program relationship, and the security, certification, and technology-readiness processes any serious dual-use claim has to go through. We have not represented any of that as already in place.',
    },
  ],
  valueHeading: 'What a future conversation could look like',
  values: [
    {
      title: 'An honest starting point',
      body: 'A direct account of what the platform does today, what is architecturally general versus oil-and-gas-specific, and what stage the underlying technology is actually at.',
    },
    {
      title: 'A proprietary, protected core',
      body: 'The core decision-intelligence methodology is proprietary, with a patent application filed - the kind of protected foundation a serious dual-use conversation should expect.',
    },
    {
      title: 'A team used to rigorous validation',
      body: 'Our approach to oil and gas is built around testing claims with practising engineers rather than asserting them - the same discipline we would bring to any dual-use validation process.',
    },
    {
      title: 'No pressure, no overpromising',
      body: 'We are not seeking to manufacture urgency here. This is a long-term direction we are genuinely open about, not a pipeline we are trying to fill.',
    },
  ],
  cta: {
    title: 'Exploring dual-use potential in your mandate?',
    body: 'If you work in defence innovation, procurement, or dual-use technology evaluation and this direction is genuinely relevant, tell us about your context. We will be candid about exactly what stage we are at.',
    primaryHref: '/contact',
    primaryLabel: 'Talk to us about dual-use potential',
  },
};

export default function Page() {
  return <AudienceLayout content={content} />;
}
