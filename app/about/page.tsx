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
import { SITE } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'About LeakSonic - mission & founder',
  description:
    'LeakSonic builds Sentrix, an AI-driven engineering decision intelligence platform - proprietary software paired with drone hardware we design and test ourselves - covering gas pipeline (including City Gas Distribution), refinery, terminal, and offshore inspection. A government-incubated, MSME-registered deep-tech company expanding from an India base to a global market.',
  path: '/about',
  keywords: [
    'LeakSonic',
    'Leak Sonic',
    'Sentrix',
    'pipeline inspection technology company',
    'deep-tech startup India',
    'pipeline integrity company',
    'oil and gas inspection technology',
    'City Gas Distribution inspection technology',
    'Smart India Hackathon startup',
    'AIC RAISE incubated startup',
    'DPIIT recognised startup',
    'Startup India MSME',
    'Coimbatore deep-tech startup',
    'energy climate tech startup India',
    'SDG aligned startup',
    'climate action methane reduction',
    'sustainable infrastructure technology',
    'decision intelligence software company',
    'drone software and hardware company',
    'AI drone company India',
    'AI infrastructure inspection company',
    'drone hardware and AI software company',
    'deep tech startup oil and gas India',
    'GAIL Pankh startup',
    'NIDHI PRAYAS pipeline technology',
    'iDEX dual-use drone technology',
    'Startup India DPIIT pipeline technology',
    'deep tech incubator oil gas',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const WHY = [
  {
    title: 'Why this problem',
    body: 'Energy loss and integrity risk on critical infrastructure - gas pipelines and refinery static equipment alike - are largely invisible until something fails: expensive, hazardous, and climate-damaging when it does. The tools to see it exist but sit disconnected from the decisions that matter. That gap is a real, unglamorous, high-consequence engineering problem worth a company.',
  },
  {
    title: 'Why this company',
    body: 'AI is the core of what we build - the scalable engine that makes evidence comparable, findings defensible, and output fit existing workflows. We are not purely a software company, though: we design, build, and test our own drone hardware and ground-control tooling in-house, at a deliberately focused scale, because an AI model is only as good as the real flight data it learns from. Software and hardware together, with AI as the primary source of long-term value - a narrower, harder, more defensible focus than competing on flight logistics alone.',
  },
  {
    title: 'Why now',
    body: 'Gas networks and refinery capacity are expanding worldwide faster than inspection can scale, and methane is shifting from an estimated to a measured quantity under frameworks like OGMP 2.0. Operators need to make more inspection decisions, faster, from evidence they can stand behind - and the manual workflow that used to be good enough no longer is. The timing is not incidental; it’s the thesis.',
  },
  {
    title: 'Where we’re headed',
    body: 'Pipeline corridors and refinery static equipment - fired heaters, vessels, tanks, elevated piping - carry the same evidence-to-decision problem in different settings, and we’re building for both as genuine, current application areas of the same platform. The AI itself is being built to reason about inspection evidence generally, not just drone imagery - our own drone hardware is the primary source today, with the architecture designed to take in more of it over time. Built in India, with the deliberate intent to expand into a global market as the platform and the evidence behind it mature - one validated claim at a time, not a launch announcement.',
  },
];

// The UN Sustainable Development Goals our work is genuinely aligned with. We
// frame this as contribution and alignment, not achievement - each with a
// specific, defensible rationale rather than a badge for its own sake.
const SDGS = [
  {
    n: '13',
    name: 'Climate Action',
    body: 'Methane is one of the most potent near-term greenhouse gases. Helping operators find and fix leaks faster - and supporting the shift to measurement-based reporting under frameworks like OGMP 2.0 - targets one of the highest-leverage climate levers available this decade.',
  },
  {
    n: '9',
    name: 'Industry, Innovation & Infrastructure',
    body: 'Resilient energy infrastructure depends on being inspected and maintained well. We build deep-tech that helps pipelines last longer and fail less - the definition of upgrading infrastructure with innovation.',
  },
  {
    n: '7',
    name: 'Affordable & Clean Energy',
    body: 'Natural gas is a transition fuel, and every leak is energy lost between source and consumer. Improving the integrity and efficiency of gas delivery keeps supply reliable and less wasteful through the energy transition.',
  },
  {
    n: '12',
    name: 'Responsible Consumption & Production',
    body: 'A gas leak is lost product as well as an emission. Prioritising inspection where it matters most reduces the waste of a finite resource and the environmental cost of losing it to the atmosphere.',
  },
  {
    n: '11',
    name: 'Sustainable Cities & Communities',
    body: 'Much gas infrastructure - especially city gas distribution - runs directly beneath and beside where people live and work. Better, faster integrity monitoring reduces the risk of incidents in populated areas.',
  },
  {
    n: '3',
    name: 'Good Health & Well-being',
    body: 'Drone-led inspection removes people from genuinely dangerous work - at height, in confined spaces, and near live hazards. Fewer people exposed to inspection risk is a direct, tangible safety outcome.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), founderSchema()]} />
      <PageHero
        eyebrow="About"
        title="No engineer should decide from evidence that’s months out of date."
        lead="That’s the mission, stated plainly. Turning raw inspection evidence into decisions an engineer can defend applies equally to gas pipelines and to refinery static equipment - fired heaters, vessels, tanks, elevated piping - not to one first and the other later."
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
                enough to act on, across gas pipelines and refinery static equipment alike.
              </p>
              <p>{SITE.positioning}</p>
              <p>
                Everything we build is measured against one standard - does it help an integrity
                team make a faster, better-evidenced decision, with less manual effort, than the
                workflow it replaces?
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
              <p className="text-sm text-ink-muted">
                The underlying AI and decision-intelligence software is deliberately built to
                generalise beyond oil and gas. We see long-term potential in adjacent domains -
                defence and national-security infrastructure inspection, broader industrial
                infrastructure intelligence, and coordinated multi-drone (swarm) operation among
                them - and it’s a direction we may pursue as the platform and our funding position
                mature. That is early, exploratory thinking today, not a current engagement or a
                near-term priority next to getting pipeline and refinery inspection right.
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
                src="/KiruthikProfilePictureSquare.jpg"
                alt="Kiruthik, founder of LeakSonic - the decision intelligence software and hardware company building Sentrix"
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
                asset integrity - on a pipeline or on a refinery floor - isn’t collecting more data,
                it’s deciding what the data means.
                That conviction came from the field - from standing on a live construction site and
                seeing where the real bottlenecks are - not from a slide deck, and it shapes every
                technical choice the company makes.
              </p>
              <p>
                The founder’s view is that drone hardware on its own, at today’s state of the art,
                is only moderately scalable - useful, but not yet the leverage point. AI is where
                the real long-term potential sits: as sensing, autonomy, and onboard computing keep
                improving year over year, the ceiling on what an AI-guided drone can actually do
                keeps rising with it. That’s the bet behind building our own hardware rather than
                treating it as someone else’s problem - it keeps the AI honest, and keeps us close
                to a field that is still moving quickly.
              </p>
              <p className="text-sm text-ink-muted">
                LeakSonic’s founding team has a track record in applied engineering competitions,
                including a national win at India’s Smart India Hackathon 2025 - one early signal
                among several, not the headline. LeakSonic Private Limited is a government-incubated,
                MSME-registered deep-tech company, and our core methodology is proprietary, with a
                patent application filed.
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
              title="The case for the company, in four parts"
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
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

      {/* For investors - market, defensibility, team, in one focused block */}
      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="For investors"
              title="The case in brief"
              lead="A short, honest version of the pitch - no invented traction, no projected numbers we haven't earned. For the full conversation, reach us directly."
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-card border border-line bg-card p-7">
              <h3 className="text-h3 font-semibold text-ink">Market</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Gas transmission and distribution networks, and refinery and industrial static
                equipment, are both expanding and ageing worldwide faster than inspection capacity
                can scale, and methane reporting is shifting from estimated to measured under
                frameworks like OGMP 2.0 - a structural, multi-decade demand curve, not a one-time
                opportunity.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-7">
              <h3 className="text-h3 font-semibold text-ink">Why defensible</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Flight hardware alone is increasingly commoditised and, by itself, only moderately
                scalable; the proprietary AI and decision layer that turns raw inspection evidence
                into comparable, defensible findings is what actually scales - and it is what we
                build the hardware around, not the other way round, with a patent application filed
                on our core methodology. That is a data, algorithms, and domain-trust problem, not a
                flight-logistics one - harder to replicate and harder to dislodge once an operator’s
                workflow depends on it.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-7">
              <h3 className="text-h3 font-semibold text-ink">Team</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Government-incubated at AIC RAISE, DPIIT-recognised under Startup India,
                MSME-registered, with a national Smart India Hackathon 2025 win - and a founding
                conviction grounded in field time on an active pipeline construction site, not a
                slide deck.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-7 md:col-span-2">
              <h3 className="text-h3 font-semibold text-ink">
                For grant programs, incubators, and government reviewers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                If you evaluate applications for programs like NIDHI-PRAYAS, iDEX, GAIL Pankh,
                IndianOil Ankur, MSME innovative schemes, or a deep-tech accelerator, the honest
                version of our stage and traction is exactly what you’ll get here and on our{' '}
                <Link href="/research" className="text-accent hover:text-accent-hover">
                  approach page
                </Link>{' '}
                - a government-incubated, DPIIT-recognised, MSME-registered team building a
                specific, named engineering capability, not a generic AI pitch. We would rather a
                reviewer find our stage clearly stated than have to ask.
              </p>
            </div>
            <div className="rounded-card border border-line bg-card p-7">
              <h3 className="text-h3 font-semibold text-ink">Stage, honestly</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Actively developing and validating Sentrix with practising engineers - see exactly
                what we’re testing and how on{' '}
                <Link href="/research" className="text-accent hover:text-accent-hover">
                  our approach page
                </Link>
                . We’d rather show you the real stage than round it up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The shift we're part of + SDG alignment */}
      <section className="relative overflow-hidden border-b border-line bg-surface py-section">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              'radial-gradient(55% 60% at 80% 30%, rgba(196,31,43,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="container-content">
          <Reveal>
            <SectionLabel>The shift we’re part of</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-h2 font-bold text-ink">
              Moving pipeline integrity from periodic and reactive to continuous and evidence-based.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              The industry is changing on three fronts at once: from inspection you do on a calendar
              to inspection informed by what’s actually happening, from methane you estimate to
              methane you measure, and from raw data an engineer wades through to decisions they can
              defend. Sentrix is built for that shift - and the shift itself is why our work touches
              goals far larger than any single pipeline.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <p className="mono-label">Aligned with the UN Sustainable Development Goals</p>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {SDGS.map((g) => (
                  <div
                    key={g.n}
                    className="flex h-full flex-col rounded-card border border-line bg-card p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile bg-accent font-sans text-lg font-bold text-white">
                        {g.n}
                      </span>
                      <span className="text-sm font-semibold leading-tight text-ink">
                        SDG {g.n} · {g.name}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{g.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-faint">
                We frame these as goals our work contributes toward and is aligned with - not
                achievements we claim. Each reflects a specific, defensible connection between
                pipeline integrity intelligence and a global objective.
              </p>
            </div>
          </Reveal>
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
