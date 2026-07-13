import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, founderSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'About LeakSonic - mission & founder',
  description:
    'LeakSonic builds Sentrix, an engineering decision intelligence platform for pipeline inspection - a government-incubated, MSME-registered deep-tech company making sure integrity engineers never work from evidence that is months out of date.',
  path: '/about',
  keywords: [
    'LeakSonic',
    'Leak Sonic',
    'Sentrix',
    'pipeline inspection technology company',
    'deep-tech startup India',
    'pipeline integrity company',
    'oil and gas inspection technology',
    'Smart India Hackathon startup',
    'AIC RAISE incubated startup',
    'DPIIT recognised startup',
    'Startup India MSME',
    'Coimbatore deep-tech startup',
    'energy climate tech startup India',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const WHY = [
  {
    title: 'Why this problem',
    body: 'Energy loss from pipeline infrastructure is largely invisible until it fails - expensive, hazardous, and climate-damaging when it does. The tools to see it exist but sit disconnected from the decisions that matter. That gap is a real, unglamorous, high-consequence engineering problem worth a company.',
  },
  {
    title: 'Why this company',
    body: 'We’re building the engineering decision layer, not another flight service. That means going deep on making evidence comparable, findings defensible, and output that fits existing workflows - rather than competing on flight logistics. A narrower, harder, more defensible focus.',
  },
  {
    title: 'Why now',
    body: 'Gas networks worldwide are expanding faster than inspection can scale, and methane is shifting from an estimated to a measured quantity. Operators need to make more inspection decisions, faster, from evidence they can stand behind - and the manual workflow that used to be good enough no longer is. The timing is not incidental; it’s the thesis.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), founderSchema()]} />
      <PageHero
        eyebrow="About"
        title="No engineer should decide from evidence that’s months out of date."
        lead="That’s the mission, stated plainly. We started with gas pipelines because that’s where the problem is most acute and the timing is right - but the underlying idea, turning raw inspection evidence into decisions an engineer can defend, generalises across critical infrastructure."
        crumbs={crumbs}
      />

      {/* Mission */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content max-w-3xl">
          <Reveal>
            <SectionLabel>Mission</SectionLabel>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-secondary">
              <p>
                Critical infrastructure leaks - energy, integrity, and attention - in ways that stay
                invisible until something breaks. LeakSonic exists to make that loss visible early
                enough to act on, starting with the gas pipelines where the stakes are highest.
              </p>
              <p>
                Sentrix is the engineering decision layer that turns raw drone inspection evidence
                into a validated, comparable, auditable answer to a single question: where should
                you look next, and why? Everything we build is measured against one standard - does
                it help an integrity team make a faster, better-evidenced decision, with less manual
                effort, than the workflow it replaces?
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Active development / partnership */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionLabel>Where we are now</SectionLabel>
            <h2 className="mt-4 text-h2 font-bold text-ink">
              Actively building, and looking for the right partners to build it with.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 text-base leading-relaxed text-ink-secondary">
              <p>
                Sentrix is under active development. We are refining the platform, testing the
                claims published on our{' '}
                <Link href="/research" className="text-accent hover:text-accent-hover">
                  approach page
                </Link>{' '}
                with practising engineers, and working directly with operators, regulators, and
                researchers to shape the platform around what actually moves the needle on inspection
                effort and decision speed - not what looks impressive in a demo.
              </p>
              <p>
                We’re actively seeking pilot, research, and program partners who want to work
                through this together: operators looking to reduce inspection cost and catch
                integrity risk earlier, government and incubation programs backing serious
                gas-infrastructure technology, and researchers who want real operational data behind
                their work. If that’s you, we’d like to hear from you.
              </p>
              <p className="text-sm text-ink-muted">
                Alongside Sentrix, we’re also in early exploration on Corvex, a continuous
                ground-based cathodic-protection monitoring concept - a complementary line of work,
                not a separate product launch, and not yet a priority next to getting Sentrix right.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal>
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-squircle border border-line bg-surface">
              <Image
                src="/KiruthikProfilePictureSquare.png"
                alt="Kiruthik, founder of LeakSonic"
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Founder"
              title="Built by an engineer who went to the field first"
            />
            {/* SPACE: expand with the full founder bio, and add team members / advisors as the
                team grows and names are confirmed. Insert founder name once public. */}
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-secondary">
              <p>
                The founding conviction is simple and slightly unfashionable: the hard part of
                pipeline integrity isn’t collecting more data, it’s deciding what the data means.
                That conviction came from the field - from standing on a live construction site and
                seeing where the real bottlenecks are - not from a slide deck, and it shapes every
                technical choice the company makes.
              </p>
              <p className="text-sm text-ink-muted">
                LeakSonic’s founding team has a track record in applied engineering competitions,
                including a national win at India’s Smart India Hackathon 2025 - one early signal
                among several, not the headline. LeakSonic Private Limited is a government-incubated,
                MSME-registered deep-tech company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Why this, why now"
              title="The case for the company, in three parts"
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-line bg-card p-7">
                  <h3 className="text-h3 font-semibold text-ink">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's reduce inspection cost and speed up your decisions - together."
        body="We’re a small, focused team actively building Sentrix and looking for the right partners to build it with - operators, programs, researchers, and investors. Tell us who you are and we’ll route the conversation accordingly."
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/research"
        secondaryLabel="See our approach"
      />
    </>
  );
}
