import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Flame, Waves, Warehouse, Milestone } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Case studies & field evidence',
  description:
    'Honest, pre-pilot evidence of serious domain engagement - including a field visit to an active pipeline construction site - plus the validation roadmap that shows exactly how we will prove the platform works.',
  path: '/case-studies',
  keywords: [
    'pipeline inspection case study',
    'pipeline integrity validation',
    'gas pipeline inspection pilot',
    'field evidence pipeline monitoring',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Case studies', path: '/case-studies' },
];

// Real, documented industry problems the platform's drone-evidence category is
// built against - not invented pilot outcomes. Each links to the underlying
// research writeup so the claim is checkable, not just asserted.
const PROBLEMS = [
  {
    icon: Milestone,
    label: 'Pipeline corridors',
    body: 'Right-of-way patrol and encroachment monitoring across long linear corridors, where visual-line-of-sight rules make ground patrol slow and expensive.',
    href: '/blog/right-of-way-encroachment-monitoring',
    linkLabel: 'How encroachment monitoring works',
  },
  {
    icon: Flame,
    label: 'Refineries & terminals - scaffolding and rope access',
    body: 'Flare stacks, elevated structures, and tank shells traditionally require scaffolding, mobile platforms, or rope-access teams working at height. Drone survey absorbs much of that evidence-gathering, cutting both cost and the hours a person spends at height.',
    href: '/blog/storage-tank-terminal-drone-inspection',
    linkLabel: 'Storage tank & terminal drone inspection',
  },
  {
    icon: Waves,
    label: 'Offshore platforms',
    body: 'Splash zones, underdecks, and flare booms sit among the most hazardous routine inspection work in the industry - historically rope-access teams working at height over open water. Screening by drone means rope hours are fewer, and better targeted.',
    href: '/blog/offshore-platform-drone-inspection',
    linkLabel: 'Offshore platform drone inspection',
  },
  {
    icon: Warehouse,
    label: 'Confined-space tank entry',
    body: 'Internal tank inspection has historically meant gas-freeing, ventilation, and a person entering a confined hydrocarbon space under standby rescue cover. Collision-tolerant indoor drones now capture that evidence without an entry at all.',
    href: '/blog/storage-tank-terminal-drone-inspection',
    linkLabel: 'How internal tank inspection changed',
  },
];

const FIELD_VISIT = [
  {
    label: 'Why we went',
    body: 'Understanding the inspection problem from a slide deck is not the same as standing on a right-of-way. We visited an active gas pipeline construction site to see how the corridor is actually built and monitored.',
  },
  {
    label: 'What we learned',
    body: 'Right-of-way conditions, the practical constraints on repeat access, and where operational data already exists but sits disconnected from inspection decisions. The hard part is downstream of data collection - exactly where Sentrix is aimed.',
  },
  {
    label: 'What this is - and isn’t',
    body: 'Evidence of serious domain engagement, not a product outcome. We are not claiming a result here - we are showing our understanding is grounded in the field, the honest foundation a pilot has to be built on.',
  },
];

const ROADMAP = [
  {
    phase: 'Now',
    title: 'Testing our claims',
    body: 'Testing the claims published on our approach page with practising engineers: whether prioritisation changes decisions, whether cycle-over-cycle comparison is reliable enough to trust, whether engineers act on evidence-backed findings, and the time saved per cycle.',
  },
  {
    phase: 'Next',
    title: 'Controlled field validation',
    body: 'Repeat-flight change-detection trials on a bounded, instrumented section, with ground-referenced surface changes to characterise detection and false-positive rates honestly.',
  },
  {
    phase: 'Then',
    title: 'Operator pilot',
    body: 'A scoped pilot with a gas transmission or CGD operator on a real segment of network, measured against their existing inspection workflow. Results published either way.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {/* SPACE: replace this page's content entirely once real pilot outcomes exist. The
          problem / approach / outcome / quote template below is ready to receive real case
          study content - keep the honest-evidence framing until then. */}
      <PageHero
        eyebrow="Case studies"
        title="No invented case studies. Real evidence of real engagement."
        lead="We’re pre-pilot, so we won’t fabricate outcomes. What we can show is genuine domain engagement and a concrete, published plan for how we’ll prove the platform works."
        crumbs={crumbs}
      />

      {/* Problems the category is built for - grounded in published research,
          each card links to the underlying writeup rather than asserting an
          outcome. Covers pipeline corridors plus refinery/terminal and
          offshore scaffolding/rope-access replacement. */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Where drone evidence already changes the work"
              title="Problems we’re built for - documented, not invented"
              lead="Beyond pipeline corridors, the same evidence-to-decision problem shows up wherever inspection has meant scaffolding, mobile platforms, or rope access. Each of these is grounded in published research, not a claimed result."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.label} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-card border border-line bg-card p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                      <Icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-h3 font-semibold text-ink">{p.label}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary">
                      {p.body}
                    </p>
                    <Link
                      href={p.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      {p.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Field visit write-up */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <div className="flex items-center gap-3">
              <Badge variant="accent">Field engagement</Badge>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-muted">
                <MapPin className="h-3.5 w-3.5" /> Active pipeline construction site
              </span>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="mt-6 max-w-2xl text-h2 font-bold text-ink">
              A field visit to a live pipeline construction site
            </h2>
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {FIELD_VISIT.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-card border border-line bg-card p-6">
                  <div className="mono-label">{item.label}</div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Validation roadmap */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Validation roadmap"
              title="Here’s exactly how we’ll prove this works - and we’ll publish results either way"
              lead="Rather than a case study we don’t yet have, here is the sequence that will produce real ones. It cross-links to the detailed methodology on our research page."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {ROADMAP.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-card border border-line bg-card p-7">
                  <SectionLabel>{r.phase}</SectionLabel>
                  <h3 className="mt-4 text-h3 font-semibold text-ink">{r.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/research"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
            >
              See the full validation methodology <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want to be the first real case study?"
        body="We’re looking for a pilot partner willing to run Sentrix against a real segment of network and publish what happens - good or bad."
        primaryHref="/solutions/pipeline-operators"
        primaryLabel="Discuss a pilot"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
