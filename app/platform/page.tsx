import type { Metadata } from 'next';
import { ShieldCheck, Lock } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { FlowDiagram } from '@/components/diagrams/FlowDiagram';
import { DashboardPreview } from '@/components/diagrams/DashboardPreview';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { CAPABILITIES } from '@/lib/content';
import { SITE } from '@/lib/site';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, softwareApplicationSchema, serviceSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'The Sentrix platform',
  description:
    'Sentrix turns raw drone inspection evidence into decision-ready engineering intelligence: comparable evidence across cycles, findings you can defend, and reports ready for the systems your integrity team already runs on.',
  path: '/platform',
  keywords: [
    'pipeline inspection software',
    'pipeline integrity management',
    'inspection decision intelligence',
    'drone pipeline inspection',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Platform', path: '/platform' },
];

const PROBLEMS = [
  {
    title: 'Which segment to inspect is a judgement call',
    body: 'Deciding which parts of hundreds of kilometres to prioritise often rests on institutional memory and spreadsheets rather than a defensible, evidence-based ranking - so the same effort does not always land where it matters most.',
  },
  {
    title: 'Evidence review is slow and manual',
    body: 'Inspection evidence is reviewed piece by piece by experienced engineers, a process that scales with pipeline length and depends heavily on who happens to be looking on a given day.',
  },
  {
    title: 'Comparing to last time is done from memory',
    body: 'The most valuable question - what changed since the last inspection - is answered by an engineer trying to recall a prior cycle, rather than from evidence that lines up cleanly on its own.',
  },
  {
    title: 'Reports are re-created by hand',
    body: 'Turning field findings into a finished, reportable record is a manual, error-prone step that consumes engineering time better spent on judgement.',
  },
];

const DELIVERABLES = [
  {
    n: '01',
    title: 'Prioritised inspection target list',
    body: 'A ranked list of pipeline segments ordered by risk and change, so scarce inspection effort points at the highest-value locations first instead of walking the line uniformly.',
  },
  {
    n: '02',
    title: 'Located, mapped findings',
    body: 'Every flagged location is mapped with its evidence attached, so an engineer can navigate straight to it rather than work from a rough description.',
  },
  {
    n: '03',
    title: 'What changed since last time',
    body: 'A clean comparison against the previous inspection that isolates what is new or evolving from the static features already known - so nobody re-derives last year’s findings by hand.',
  },
  {
    n: '04',
    title: 'An auditable record',
    body: 'A durable record of what was observed, when, and on what evidence - so the reasoning behind every finding can be reviewed later rather than living only in an engineer’s memory.',
  },
  {
    n: '05',
    title: 'Report-ready output',
    body: 'Findings structured to feed the reporting your team already produces, removing the manual transcription step between field observation and a finished record.',
  },
  {
    n: '06',
    title: 'A defensible confidence level',
    body: 'Each finding carries a visible confidence level and the evidence behind it, so it can stand up to review from a chief engineer, a regulator, or an incident post-mortem.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), softwareApplicationSchema(), serviceSchema()]} />
      <PageHero
        eyebrow="The platform"
        title="Sentrix is the engineering decision layer between drone evidence and an auditable decision."
        lead="Built to help integrity teams validate, compare, prioritise, and report inspection findings with far less manual effort. Written for the people who have to trust it - integrity engineers, chief engineers, and program managers. Here is what the platform does, and what you get out of it."
        crumbs={crumbs}
      />

      {/* Problem - practitioner language */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="The problem, in your terms"
              title="The cost of an inspection cycle is in the decisions, not the flight"
              lead="Capturing the evidence is the easy, cheap part of a cycle. The expensive part is everything that happens to that evidence afterwards - and that is where today’s workflow leaks time."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <h3 className="text-h3 font-semibold text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where it fits - the one plain flow diagram + the three pillars */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Where it fits"
              title="One decision layer, alongside what you already run"
              lead="The drone is one input. Sentrix takes the evidence it captures, makes it comparable and defensible, and hands a decision-ready result to the systems your team already uses. It does not replace anything."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <FlowDiagram className="mt-9" />
          </Reveal>

          <div className="mt-14 space-y-14">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.id}>
                  <div
                    id={cap.id}
                    className="grid scroll-mt-24 grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]"
                  >
                    <div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-tile border border-line bg-card text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="mt-4 font-sans text-xs text-ink-faint">{`PILLAR 0${i + 1}`}</div>
                      <h3 className="mt-2 text-h3 font-semibold text-ink">{cap.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {cap.detail.map((para, j) => (
                        <p key={j} className="text-base leading-relaxed text-ink-secondary">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you get - six deliverables */}
      <section id="deliverables" className="scroll-mt-24 border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionLabel>What you get</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-h2 font-bold text-ink">
              Six concrete deliverables, not a dashboard full of pixels
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              Each of these is an output an integrity team can act on directly - the most concrete,
              valuable part of the platform, so it gets room to breathe.
            </p>
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {DELIVERABLES.map((d) => (
              <div key={d.n} className="bg-card p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-sm text-accent">{d.n}</span>
                  <h3 className="text-h3 font-semibold text-ink">{d.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{d.body}</p>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <p className="mono-label mb-4">Illustrative integrity console</p>
              <DashboardPreview />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Standards & governance - the language a major operator's integrity
          and procurement teams look for. Frameworks only, no vendor names. */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Standards & governance"
              title="Built to speak your integrity department’s language"
              lead="Sentrix is designed to fit the frameworks a serious operator already runs its integrity and reporting programme against - so its output slots into your governance rather than sitting beside it."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SITE.standards.map((s) => (
              <div key={s.code} className="bg-card p-6">
                <div className="font-sans text-sm font-semibold text-accent">{s.code}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.desc}</p>
              </div>
            ))}
            <div className="flex items-center bg-card p-6">
              <p className="text-sm leading-relaxed text-ink-muted">
                Alignment to these frameworks is a design input, not a checkbox added later - and we
                extend to further jurisdictions as we work with operators in them.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full gap-4 rounded-card border border-line bg-card p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 font-semibold text-ink">Auditable by design</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    Every finding carries its evidence and a visible confidence level, so it can
                    stand up to review from a chief engineer, a regulator, or an incident
                    post-mortem. No black-box scores that have to be trusted on faith.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full gap-4 rounded-card border border-line bg-card p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                  <Lock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 font-semibold text-ink">Your network data stays yours</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                    Pipeline coordinates, inspection findings, and network detail are commercially
                    and security-sensitive. Data residency, access control, and retention are agreed
                    with the operator up front - we treat your network as your data, not ours to
                    publicise.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's find out how much time your decisions could get back."
        body="Tell us about your pipeline network and inspection cycle. We’ll walk you through how Sentrix would prioritise it, where it could reduce manual effort and turnaround time, and be honest about what we can and can’t yet prove."
        primaryHref="/solutions/pipeline-operators"
        primaryLabel="For pipeline operators"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
