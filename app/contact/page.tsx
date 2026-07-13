import type { Metadata } from 'next';
import { Building2, Landmark, GraduationCap, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm, type FieldSpec } from '@/components/contact/ContactForm';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE, type ContactSegmentId } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact - routed to the right context',
  description:
    'Reach LeakSonic by who you are: pipeline operator, government program, researcher, or investor. Each path has its own short form and response commitment so your inquiry lands in the right context.',
  path: '/contact',
  keywords: [
    'contact LeakSonic',
    'pipeline inspection software demo',
    'gas pipeline integrity partnership',
    'pipeline inspection pilot enquiry',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

const COMMON: FieldSpec[] = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Full name' },
  { name: 'email', label: 'Work email', type: 'email', placeholder: 'you@organisation.com' },
];

type Segment = {
  id: ContactSegmentId;
  icon: LucideIcon;
  heading: string;
  blurb: string;
  confirmation: string;
  fields: FieldSpec[];
};

const SEGMENTS: Segment[] = [
  {
    id: 'operator',
    icon: Building2,
    heading: 'I’m a pipeline operator or industry partner',
    blurb:
      'Gas transmission and distribution operators, city gas networks, and integrity specialists.',
    confirmation: 'We respond to operator inquiries within 2 business days.',
    fields: [
      ...COMMON,
      { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Company name' },
      { name: 'role', label: 'Your role', type: 'text', placeholder: 'e.g. Integrity Engineer' },
      {
        name: 'networkType',
        label: 'Network type / size',
        type: 'text',
        placeholder: 'e.g. ~800 km gas transmission',
        optional: true,
        full: true,
      },
      {
        name: 'message',
        label: 'What problem are you solving?',
        type: 'textarea',
        placeholder: 'Briefly describe your inspection challenge.',
      },
    ],
  },
  {
    id: 'government',
    icon: Landmark,
    heading: 'I’m from a government program, incubator, or funding body',
    blurb: 'Regulators, incubation programs, and grant or technology evaluators.',
    confirmation: 'We respond to program and agency inquiries within 3 business days.',
    fields: [
      ...COMMON,
      {
        name: 'programName',
        label: 'Program / body',
        type: 'text',
        placeholder: 'e.g. a national deep-tech grant or incubation program',
      },
      {
        name: 'evaluatingFor',
        label: 'What are you evaluating for?',
        type: 'text',
        placeholder: 'e.g. grant fit, technical review',
      },
      {
        name: 'message',
        label: 'Details',
        type: 'textarea',
        placeholder: 'What do you need from us to assess?',
      },
    ],
  },
  {
    id: 'research',
    icon: GraduationCap,
    heading: 'I’m a researcher or academic',
    blurb: 'Pipeline integrity, inspection decision-making, validation methodology, and related fields.',
    confirmation: 'We respond to research inquiries within 3 business days.',
    fields: [
      ...COMMON,
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'University / lab' },
      {
        name: 'areaOfInterest',
        label: 'Area of interest',
        type: 'text',
        placeholder: 'e.g. validating inspection findings',
      },
      {
        name: 'message',
        label: 'Collaboration idea',
        type: 'textarea',
        placeholder: 'What would you like to explore together?',
      },
    ],
  },
  {
    id: 'investor',
    icon: TrendingUp,
    heading: 'I’m an investor',
    blurb: 'Deep-tech and climate / infrastructure-focused funds.',
    confirmation: 'We respond to investor inquiries within 3 business days.',
    fields: [
      ...COMMON,
      { name: 'firm', label: 'Firm', type: 'text', placeholder: 'Fund name' },
      {
        name: 'stageFocus',
        label: 'Stage focus',
        type: 'text',
        placeholder: 'e.g. pre-seed / seed',
      },
      {
        name: 'thesisFit',
        label: 'Thesis fit',
        type: 'text',
        placeholder: 'Why this space fits your thesis',
        optional: true,
        full: true,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Anything you’d like us to know.',
      },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Contact"
        title="Tell us who you are - we’ll route you to the right context."
        lead="Four short paths, four different sets of questions. Pick the one that fits and we’ll reply with the context that’s actually useful to you."
        crumbs={crumbs}
      >
        <nav aria-label="Jump to a contact form" className="flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-line bg-card px-3.5 py-1.5 font-sans text-xs text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
            >
              {s.heading.replace('I’m ', '').replace('a ', '').replace('from ', '')}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="bg-base py-section">
        <div className="container-content max-w-3xl space-y-6">
          {SEGMENTS.map((s) => {
            const Icon = s.icon;
            return (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-card border border-line bg-card p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-h3 font-semibold text-ink">{s.heading}</h2>
                    <p className="mt-1 text-sm text-ink-muted">{s.blurb}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ContactForm segmentId={s.id} fields={s.fields} confirmation={s.confirmation} />
                </div>
              </section>
            );
          })}

          <p className="pt-4 text-center text-sm text-ink-muted">
            Prefer email? Reach us at{' '}
            <a href={`mailto:${SITE.email}`} className="text-accent hover:text-accent-hover">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
