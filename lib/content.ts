import type { LucideIcon } from 'lucide-react';
import { GitCompareArrows, ShieldCheck, Workflow } from 'lucide-react';

/**
 * The three value pillars, stated as outcomes rather than features. Shared by
 * the homepage and /platform. Deliberately kept at the level of what an
 * operator gets - never how it is produced.
 */
export type Capability = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  href: string;
  detail: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: 'comparable',
    icon: GitCompareArrows,
    title: 'Comparable evidence',
    short:
      'Find the same defect, every time. Sentrix standardises how inspection evidence is captured and aligned, so this cycle can be compared to the last without depending on someone remembering which image was which.',
    href: '/platform#comparable',
    detail: [
      'The valuable question is rarely what is there today - it is what changed since the last inspection. Sentrix makes that comparison reliable, so an evolving problem is visible early rather than rediscovered from scratch each cycle.',
      'By keeping evidence consistent from one cycle to the next, the platform surfaces genuine change - and stops re-flagging the same static features every time - so an engineer spends time on what moved, not on re-reviewing what did not.',
    ],
  },
  {
    id: 'defensible',
    icon: ShieldCheck,
    title: 'Confidence you can defend',
    short:
      'Every finding is explainable, never a black box. Each item carries the evidence behind it and a visible confidence level, so an integrity engineer can audit the reasoning and stand behind the decision.',
    href: '/platform#defensible',
    detail: [
      'A score no one can interrogate is a liability, not an aid. Sentrix attaches the supporting evidence to every finding and shows how confident it is, so the engineer stays in control of the judgement.',
      'That auditability is what lets a finding survive scrutiny - from a chief engineer, a regulator, or an incident review - because the reasoning is visible rather than asserted.',
    ],
  },
  {
    id: 'fits',
    icon: Workflow,
    title: 'Fits what you already use',
    short:
      'Works alongside your existing inspection and risk-management systems, never replaces them. Sentrix produces decision-ready records that feed the reporting and workflows your team already runs on.',
    href: '/platform#fits',
    detail: [
      'Operators already run integrity-management and risk-based-inspection processes. Sentrix is built to slot into them - standardising and prioritising the evidence that flows through - not to become another system that has to be adopted wholesale.',
      'Findings come out in a form that is ready to feed the operator’s existing records and reports, so the output reduces manual work instead of creating a new silo of it.',
    ],
  },
];
