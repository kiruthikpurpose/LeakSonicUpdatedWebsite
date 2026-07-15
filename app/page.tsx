import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TransitDecisionChart } from '@/components/diagrams/TransitDecisionChart';
import { FlowDiagram } from '@/components/diagrams/FlowDiagram';
import { DashboardPreview } from '@/components/diagrams/DashboardPreview';
import { EvidenceTrail } from '@/components/diagrams/EvidenceTrail';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';
import { CAPABILITIES } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';
import { softwareApplicationSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'LeakSonic - Engineering decision intelligence for oil & gas inspection',
  description:
    'Sentrix turns raw drone inspection evidence into standardised, decision-ready engineering intelligence - so pipeline and refinery integrity teams validate, compare, prioritise, and report findings with far less manual effort, inside the workflows they already use.',
  path: '/',
  keywords: [
    'LeakSonic',
    'Leak Sonic',
    'Sentrix',
    'pipeline inspection software',
    'pipeline integrity management',
    'drone pipeline inspection',
    'oil and gas drones',
    'oil and gas drone inspection',
    'oil and gas drone company',
    'inspection decision intelligence',
    'gas pipeline inspection technology',
    'risk-based inspection',
    'pipeline integrity startup India',
    'oil and gas deep-tech startup',
    'drone inspection startup India',
    'methane leak detection company',
    'pipeline inspection company India',
    'refinery inspection',
    'static equipment inspection',
    'rope access alternative',
    'scaffolding inspection alternative',
    'industrial asset inspection drone',
    'City Gas Distribution inspection',
    'CGD pipeline inspection software',
    'decision intelligence software company',
    'drone software and hardware platform',
  ],
});

const BEFORE = [
  'Reviewing hundreds of inspection images, one by one',
  'Comparing this cycle to the last one, by memory and by hand',
  'Relocating the same defect across inspections to see if it moved',
  'Drafting the report from scratch, every single time',
];

const AFTER = [
  'Evidence standardised so this cycle and the last line up automatically',
  'What actually changed is surfaced for you - not re-derived by hand',
  'Every finding carries its evidence and a confidence you can defend',
  'A decision-ready report, formatted for the systems you already use',
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), serviceSchema()]} />
      <Hero />

      {/* 2 - The problem, visualised */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionLabel>The reframe</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-h2 font-bold text-ink">
              Inspection effort is not in the flying. It’s in the deciding.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              The drone captures evidence in an afternoon. Turning that evidence into a validated,
              comparable, defensible decision is where an engineering team’s real time goes - and
              that is the part Sentrix is built to reduce.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 rounded-card border border-line bg-card p-6 sm:p-10">
              <TransitDecisionChart />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2b - Before -> after workflow (outcome-level, no mechanism) */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Before and after"
              title="What Sentrix takes off the engineer’s desk"
              lead="Same drone, same corridor. The difference is everything that used to happen by hand afterwards."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card border border-line bg-card p-6 sm:p-8">
                <p className="mono-label">Today, by hand</p>
                <ul className="mt-5 space-y-3">
                  {BEFORE.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-card border border-accent/30 bg-accent/[0.05] p-6 sm:p-8">
                <p className="mono-label text-accent">With Sentrix</p>
                <ul className="mt-5 space-y-3">
                  {AFTER.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 - Three value pillars */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="What you get"
              title="Three outcomes, not fifty features"
              lead="Sentrix is a proprietary software and hardware decision layer between raw evidence and an auditable decision. It does three things, and it does them well."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.id} delay={i * 0.08}>
                  <Card interactive className="flex h-full flex-col p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-h3 font-semibold text-ink">{cap.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                      {cap.short}
                    </p>
                    <Link
                      href={cap.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3b - Where Sentrix fits (the one plain flow diagram) */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Where it fits"
              title="A decision layer, not another system to adopt"
              lead="Sentrix sits between the evidence your drone already captures and the systems your team already runs on. It standardises and prioritises what flows through - it does not replace anything."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <FlowDiagram className="mt-9" />
          </Reveal>
        </div>
      </section>

      {/* 3c - What the operator works from (dashboard mock + evidence-trail detail) */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionLabel>The output</SectionLabel>
            <h2 className="mt-5 max-w-2xl text-h2 font-bold text-ink">
              Not a dashboard full of pixels - a ranked list you can act on
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-secondary">
              Every finding carries its evidence and its change since the last cycle, so an
              integrity engineer can audit the reasoning, not just trust a score. Compliance-format
              export is one click, not a re-keying exercise.
            </p>
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal delay={0.05}>
              <DashboardPreview />
              <p className="mt-3 font-sans text-xs text-ink-faint">
                Illustrative - the prioritised worklist an engineer opens each cycle.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <EvidenceTrail />
              <p className="mt-3 font-sans text-xs text-ink-faint">
                Illustrative - opening one finding shows the evidence behind it, not just a score.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3d - Standards alignment band (trust signal for serious operators) */}
      <section className="border-b border-line bg-base py-14">
        <div className="container-content">
          <Reveal>
            <p className="text-center font-sans text-xs uppercase tracking-[0.14em] text-ink-muted">
              Designed to align with the frameworks your integrity programme already runs on
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
              {SITE.standards.map((s) => (
                <span
                  key={s.code}
                  className="rounded-full border border-line bg-card px-4 py-1.5 font-sans text-sm font-medium text-ink-secondary"
                  title={s.desc}
                >
                  {s.code}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 - Why now */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content grid grid-cols-1 gap-9 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionLabel>Why now</SectionLabel>
            <h2 className="mt-5 text-h2 font-bold text-ink">
              Gas pipeline and City Gas Distribution networks are our core focus - and the same gap
              shows up on refinery equipment
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            {/* SPACE: update these specific figures as more current sector data becomes
                available - each stat is written to remain quotable if the numbers move. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['300+', 'authorised City Gas Distribution areas in India alone'],
                ['Expanding', 'gas networks and refinery capacity, faster than inspection can scale'],
                ['Estimated → measured', 'methane reporting shifting under regimes like OGMP 2.0'],
              ].map(([v, l]) => (
                <div key={l} className="rounded-card border border-line bg-card p-5">
                  <div className="font-sans text-xl font-semibold text-accent">{v}</div>
                  <div className="mt-1.5 text-sm text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-ink-secondary">
              The same gap between asset footprint and inspection throughput shows up on gas
              pipeline networks and on refinery static equipment alike - the gap Sentrix is built to
              close by prioritising where scarce inspection effort goes. Deferred inspection tends to
              turn into unplanned, reactive maintenance, and reactive work is consistently more
              disruptive and more costly than a finding caught on a planned cycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 - Current engagement, honestly framed */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          {/* SPACE: this is the first section to update once any pilot / MOU / formal engagement
              can be named. Replace the honest statement below with the named engagement. */}
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel className="justify-center">Where we are</SectionLabel>
              <p className="mt-6 text-2xl font-medium leading-relaxed text-ink sm:text-3xl">
                In active technical discussions with gas transmission and distribution operators and
                pipeline integrity specialists.
              </p>
              <p className="mt-5 text-base text-ink-muted">
                We’ll name engagements here the moment they’re real - see how we work through
                <Link href="/research" className="text-accent hover:text-accent-hover">
                  {' '}
                  our approach
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 - Why Sentrix / differentiation - integrate, not replace; honest non-goals */}
      <section className="relative overflow-hidden border-b border-line bg-surface py-section">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              'radial-gradient(50% 60% at 20% 50%, rgba(196,31,43,0.14) 0%, transparent 60%)',
          }}
        />
        <div className="container-content grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <SectionLabel>Why Sentrix</SectionLabel>
            <h2 className="mt-5 text-h2 font-bold text-ink">
              We integrate rather than replace - and we say plainly what we don’t do.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-secondary">
              Sentrix is built to work alongside the inspection and risk-management systems you
              already run, not to become another platform you have to adopt wholesale. We’re
              equally direct about what it doesn’t do - see our full non-goals on the approach page
              below.
            </p>
            <ButtonLink href="/research" variant="primary" size="lg" className="mt-8">
              See how we work <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              {[
                [String(SITE.standards.length), 'standards & frameworks we align to by design'],
                ['5', 'engineering claims tested with practising engineers, not assumed'],
                ['2025', 'national winner, Smart India Hackathon'],
                ['Zero', 'fabricated logos or invented case studies, ever'],
              ].map(([v, l]) => (
                <div key={l} className="rounded-card border border-line bg-card p-5">
                  <div className="font-sans text-2xl font-semibold text-accent">{v}</div>
                  <div className="mt-1.5 text-sm text-ink-muted">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 - Footer CTA repeat (segmented routing handled in the global footer) */}
      <section className="bg-base py-section">
        <div className="container-content">
          <Reveal>
            <div className="rounded-card border border-line bg-card p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                <div>
                  <h2 className="text-h2 font-bold text-ink">
                    Talk to us in the language you work in.
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-secondary">
                    {SITE.positioning}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <ButtonLink href="/solutions/pipeline-operators" variant="primary" size="lg">
                    Pipeline operator <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/solutions/refinery-operators" variant="primary" size="lg">
                    Refinery operator <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary" size="lg">
                    Government · research · invest
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
