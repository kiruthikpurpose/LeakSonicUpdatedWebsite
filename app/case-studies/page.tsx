import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
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

      {/* Field visit write-up */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <div className="flex items-center gap-3">
              <Badge variant="accent">Field engagement</Badge>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-muted">
                <MapPin className="h-3.5 w-3.5" /> Active pipeline construction site
              </span>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <Reveal>
              <div className="space-y-5">
                <h2 className="text-h2 font-bold text-ink">
                  A field visit to a live pipeline construction site
                </h2>
                <div>
                  <div className="mono-label">Why we went</div>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    Understanding the inspection problem from a slide deck is not the same as
                    standing on a right-of-way. We visited an active gas pipeline construction site
                    to see how the corridor is actually built and monitored, and to ground our
                    assumptions in what integrity work looks like on the ground rather than in the
                    abstract.
                  </p>
                </div>
                <div>
                  <div className="mono-label">What we learned</div>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    The visit sharpened our understanding of right-of-way conditions, the practical
                    constraints on repeat access, and where operational data already exists but sits
                    disconnected from inspection decisions. It confirmed that the hard part of the
                    problem is downstream of data collection - in review, correlation, and reporting
                    - which is exactly where Sentrix is aimed.
                  </p>
                </div>
                <div>
                  <div className="mono-label">What this is - and isn’t</div>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    This is evidence of serious domain engagement, not a product outcome. We are not
                    claiming a result here; we are showing that our understanding of the problem is
                    grounded in the field, which is the honest foundation a pilot has to be built
                    on.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-3">
                {/* IMAGE: real, unpolished field photo from the pipeline construction-site visit,
                    documentary tone, 4:3. Drop into /public/images/field/ and replace this
                    placeholder - real field photos are a stronger trust signal than any render. */}
                <ImagePlaceholder
                  ratio="4 / 3"
                  label="FIELD PHOTO - pipeline construction site visit · /public/images/field/"
                />
                <p className="font-sans text-[0.7rem] text-ink-faint">
                  Real site photography will replace this placeholder as it clears review.
                </p>
              </div>
            </Reveal>
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

      {/* Template preview for future real case studies */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionLabel>Ready for real outcomes</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-h2 font-bold text-ink">
              The structure a real case study will drop into
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {['Problem', 'Approach', 'Outcome', 'Operator quote'].map((s) => (
              <div key={s} className="bg-card p-7">
                <div className="font-sans text-xs text-ink-faint">TEMPLATE SLOT</div>
                <h3 className="mt-2 text-h3 font-semibold text-ink">{s}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {/* SPACE: real case study content will populate this slot once a pilot concludes. */}
                  Populated with real, attributable content once a pilot concludes.
                </p>
              </div>
            ))}
          </div>
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
