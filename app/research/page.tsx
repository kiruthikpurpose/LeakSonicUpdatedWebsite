import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { ValidationStepper } from '@/components/diagrams/ValidationStepper';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Approach - how Sentrix earns trust',
  description:
    'Sentrix is built on tested claims, not assumed capability. We validate with practising engineers, attach evidence to every finding, and say plainly what we do not do. Here is how we work, and why an integrity team can trust it.',
  path: '/research',
  keywords: [
    'pipeline integrity validation',
    'inspection technology trust',
    'engineering decision support',
    'pipeline inspection methodology',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Approach', path: '/research' },
];

// Outcome-level validation claims - what we prove before we assert it. No
// mechanism, no sensors, no accuracy figures - deliberately.
const CLAIMS = [
  {
    n: 'C1',
    claim: 'Prioritisation actually changes what an engineer would do.',
    test: 'We work directly with practising integrity engineers to test whether a ranked target list changes their decisions - or whether existing judgement already suffices. If it does not help, it is not worth shipping.',
  },
  {
    n: 'C2',
    claim: 'Comparing one cycle to the last is reliable enough to trust.',
    test: 'We check our cycle-over-cycle comparison against known, ground-referenced change, so a difference we surface reflects something real rather than noise - and we characterise where it is dependable and where it is not.',
  },
  {
    n: 'C3',
    claim: 'A finding holds up against real ground truth.',
    test: 'We test our findings against independently confirmed conditions to understand where they are dependable and where they are not - because an honest statement of limits is worth more than an accuracy headline.',
  },
  {
    n: 'C4',
    claim: 'Engineers will act on an evidence-backed finding.',
    test: 'We put findings in front of domain experts, with and without their supporting evidence, and measure whether the evidence changes their willingness to act - because a finding no one trusts is a finding no one uses.',
  },
  {
    n: 'C5',
    claim: 'The platform gives a working engineer real time back per cycle.',
    test: 'We compare the current review-and-report workflow against a Sentrix-assisted one on the same data, isolating exactly where time is saved and where it is not, rather than asserting a savings figure.',
  },
];

const PRINCIPLES = [
  {
    title: 'We validate with practising engineers',
    body: 'Every claim is tested against how integrity engineers actually work, not against a lab ideal. If it does not hold up in a real workflow, it does not ship.',
  },
  {
    title: 'We attach evidence to every finding',
    body: 'Nothing Sentrix outputs is a bare score. Each finding carries the evidence behind it, so the engineer stays in control of the judgement and can defend it later.',
  },
  {
    title: 'We say plainly what we don’t do',
    body: 'Sentrix does not measure pipe-wall thickness and does not sense underground. Naming a tool’s limits is the clearest signal that its capabilities are real.',
  },
  {
    title: 'We publish outcomes honestly',
    body: 'We state what we are proving and report the result either way - including when it forces us to change course. Confirmation and disconfirmation are both worth publishing.',
  },
];

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Approach"
        title="How we earn a skeptical engineer’s trust."
        lead="Sentrix is built on tested claims, not assumed capability. This page is how we work - with practising engineers, with evidence attached to every finding, and with honesty about what we do and don’t do. It is a genuine differentiator, and we publish it with confidence."
        crumbs={crumbs}
      />

      {/* Philosophy */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-2xl font-medium leading-relaxed text-ink sm:text-3xl">
                A capability you assume is a risk you’ve hidden. A capability you test is a claim you
                can defend.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
                Everything below is framed as a claim with a defined test, not a finished result. As
                each test concludes, we update its status here - and we report outcomes whether they
                confirm the claim or break it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work - four principles */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Four principles behind every claim we make"
              lead="These are not slogans. They are the standard we hold our own product to before we ask an operator to trust it."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-card border border-line bg-card p-7">
                  <h3 className="text-h3 font-semibold leading-snug text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Claims under test */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Claims under test"
              title="What we prove before we claim it"
              lead="If any of these turns out to be false, Sentrix has to change. That is exactly why we name them explicitly rather than assume them."
            />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-9">
              <ValidationStepper
                items={CLAIMS.map((c) => ({ n: c.n, label: c.claim, status: 'in-progress' }))}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
              <Badge variant="accent">Active validation</Badge>
              All five claims below are currently being tested with practising engineers - status
              updates here as each concludes.
            </p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {CLAIMS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.05}>
                <div className="rounded-card border border-line bg-card p-6 sm:p-7">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[auto_1.1fr_1.4fr] lg:items-start">
                    <div className="font-sans text-sm text-accent">{c.n}</div>
                    <div>
                      <div className="mono-label">Claim</div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
                        {c.claim}
                      </h3>
                    </div>
                    <div>
                      <span className="mono-label">How we test it</span>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{c.test}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration invitation */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                align="center"
                eyebrow="Working together"
                title="Where we invite collaboration"
                lead="We work with academic and industry partners on the harder questions in pipeline integrity and inspection decision-making - from validating findings against real ground truth to understanding what makes an engineering team genuinely trust an automated finding. If that overlaps with your work, we’d like to hear from you - including if you think one of our claims is wrong."
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Work on these with us."
        body="If you’re a researcher, lab, or integrity team working on pipeline inspection, decision support, or validation methodology, we’d like to hear from you - including if you think one of our claims is wrong."
        primaryHref="/solutions/researchers"
        primaryLabel="For researchers"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
