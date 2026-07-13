import type { Metadata } from 'next';
import { Scale, BookOpenCheck, Microscope } from 'lucide-react';
import { AudienceLayout, type AudienceContent } from '@/components/sections/AudienceLayout';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'For researchers & academic collaborators',
  description:
    'For academic and industrial researchers: genuine open problems in pipeline integrity, inspection decision-making, and validation methodology that we invite collaboration on - with real operational context and honest, citable framing.',
  path: '/solutions/researchers',
  keywords: [
    'pipeline integrity research',
    'inspection decision support research',
    'pipeline inspection validation',
  ],
});

const content: AudienceContent = {
  eyebrow: 'For researchers',
  title: 'Real open problems, not a marketing brochure.',
  lead: 'For academic and industrial research collaborators. We work on the harder questions in pipeline integrity and inspection decision-making - and we have genuine unresolved problems where a research partner could make a real contribution.',
  slug: '/solutions/researchers',
  name: 'Researchers',
  stats: [
    { value: 'Open', label: 'research questions we publish, not hide', icon: BookOpenCheck },
    { value: 'Real data', label: 'grounded in field engagement', icon: Microscope },
    { value: 'Honest', label: 'we publish outcomes either way', icon: Scale },
  ],
  concernsHeading: 'What makes a collaboration worth your time',
  concernsLead:
    'Researchers want problems that are genuinely open, data that is real, and a partner who won’t overclaim. We try to offer all three.',
  concerns: [
    {
      title: 'Are the problems genuinely open?',
      body: 'Yes - and we publish them. How to validate inspection findings against real ground truth, what makes an integrity team genuinely trust an automated finding, and what false-positive rate an engineer will actually tolerate are unsolved questions, not solved ones we’re dressing up.',
    },
    {
      title: 'Is there real domain access?',
      body: 'We engage directly with pipeline operators and integrity specialists and have done field work on active sites, which means collaboration can be grounded in real operational context rather than a synthetic benchmark.',
    },
    {
      title: 'Will the work be represented honestly?',
      body: 'We commit to publishing validation outcomes either way and to citing research context accurately - informs-our-approach, not proves-our-product. Your contribution won’t be spun into a performance claim.',
    },
    {
      title: 'Is there a path to impact?',
      body: 'These questions sit on the critical path of a real deployment aimed at a real, large-scale problem - so good answers have somewhere concrete to go.',
    },
  ],
  valueHeading: 'What we can offer a research partner',
  values: [
    {
      title: 'Published, well-scoped open questions',
      body: 'A concrete set of research questions on our approach page, each framed tightly enough to build a study around.',
    },
    {
      title: 'Grounded operational context',
      body: 'Direct engagement with operators and field sites so the problem framing reflects real integrity workflows.',
    },
    {
      title: 'Honest, citable framing',
      body: 'Accurate use of the literature and a commitment to publishing outcomes, so collaboration builds shared credibility.',
    },
    {
      title: 'A real deployment target',
      body: 'A clear line from research question to operational impact on a gas pipeline integrity problem that plays out on networks worldwide, starting with the markets we work in today.',
    },
  ],
  cta: {
    title: 'Have an idea - or a disagreement?',
    body: 'Tell us your institution, area of interest, and the collaboration you have in mind. We especially want to hear from you if you think one of our claims is wrong.',
    primaryHref: '/contact',
    primaryLabel: 'Contact as a researcher',
  },
};

export default function Page() {
  return <AudienceLayout content={content} />;
}
