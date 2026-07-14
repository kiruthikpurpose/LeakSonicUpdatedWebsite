import type { Metadata } from 'next';
import { Mail, Award, Rocket, Building, Landmark, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Press & media',
  description:
    'Press and media resources for LeakSonic - company facts, brand assets, recognitions, and press contact. Coverage and press releases will be listed here as they become available.',
  path: '/press',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Press', path: '/press' },
];

const FACTS: [string, string][] = [
  ['Legal entity', SITE.legalName],
  ['Product', 'Sentrix - engineering decision intelligence platform for pipeline inspection'],
  ['Stage', 'Actively developing and validating with practising engineers'],
  ['Market focus', 'Built in India, designed for gas pipeline networks globally'],
  ['Headquarters', `${SITE.address.city}, ${SITE.address.region}, ${SITE.address.country}`],
  [
    'Status',
    'MSME-registered · DPIIT-recognised under Startup India · incubated at AIC RAISE (Atal Incubation Centre)',
  ],
  [
    'Government support',
    'Supported by Atal Innovation Mission (AIM), NITI Aayog, and MeitY Startup Hub',
  ],
  ['Recognition', 'National winner, Smart India Hackathon 2025 (BEL PS-25163)'],
];

// Official program marks (Startup India, MeitY, AIC RAISE, etc.) are
// trademarked assets we cannot recreate or source without permission from
// each program - using an unofficial recreation would be worse than not
// showing one. Text + icon chips are the intentional, correct treatment
// until we have written clearance to display the real marks.
const RECOGNITIONS: { icon: LucideIcon; label: string }[] = [
  { icon: Award, label: 'Smart India Hackathon' },
  { icon: Rocket, label: 'Startup India' },
  { icon: Building, label: 'MSME' },
  { icon: Landmark, label: 'MeitY' },
  { icon: GraduationCap, label: 'AIC RAISE' },
];

// Real coverage/releases go here as they happen: { title, outlet, date, href }.
// The section above only renders when this array is non-empty.
const COVERAGE: { title: string; outlet: string; date: string; href: string }[] = [];

export default function PressPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Press & media"
        title="Company facts, assets, and a direct line for media."
        lead="Everything a journalist or program needs to write about us accurately. Where we don’t yet have something - coverage, releases - we say so rather than padding the page."
        crumbs={crumbs}
      />

      {/* Company facts */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="At a glance" title="Company facts" />
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-card border border-line">
            {FACTS.map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-1 gap-1 bg-card p-5 sm:grid-cols-[220px_1fr] sm:gap-6 ${
                  i < FACTS.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <dt className="mono-label pt-0.5">{k}</dt>
                <dd className="text-ink-body">{v}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="Recognition & programs" title="Where we’re recognised" />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {RECOGNITIONS.map((r) => {
              const Icon = r.icon;
              return (
                <span
                  key={r.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Icon className="h-4 w-4 text-ink-muted" aria-hidden />
                  {r.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage & releases - section only renders once COVERAGE has entries,
          so an empty state is never shown to visitors. Add real coverage here
          as it happens: { title, outlet, date, href }. */}
      {COVERAGE.length > 0 && (
        <section className="border-b border-line bg-base py-section">
          <div className="container-content">
            <Reveal>
              <SectionHeading eyebrow="In the media" title="Coverage & releases" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Press contact */}
      <section className="bg-base py-section">
        <div className="container-content">
          <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-line bg-card p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-h3 font-semibold text-ink">Media enquiries</h2>
              <p className="mt-2 text-sm text-ink-secondary">
                For interviews, quotes, or brand assets, reach our press contact directly.
              </p>
            </div>
            <a
              href={`mailto:${SITE.emailPress}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <Mail className="h-4 w-4" /> {SITE.emailPress}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
