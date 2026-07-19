import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Landmark, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SITE } from '@/lib/site';

/**
 * Full-viewport dark hero. Leads with the decision-intelligence positioning -
 * Sentrix is the engineering decision layer, the drone is one input. Two
 * audience CTAs get top billing: operators and government/research partners.
 * The right column carries a real photograph of a drone over a pipeline
 * corridor at dusk, framed inside the same "product panel" chrome the rest
 * of the site uses for diagrams, so it reads as evidence, not stock art.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(60% 55% at 75% 35%, rgba(196,31,43,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="container-content grid min-h-[calc(100svh-4rem)] grid-cols-1 items-center gap-9 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        <div className="max-w-2xl">
          <Badge variant="accent" className="mb-6">
            AI + Drone Engineering Intelligence · Oil &amp; Gas Inspection
          </Badge>

          <h1 className="text-display-lg font-extrabold text-ink">
            Turn raw drone inspection evidence into{' '}
            <span className="text-accent">decisions you can defend</span>.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
            {SITE.positioning}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-secondary">
            Comparing today’s inspection to last year’s shouldn’t depend on someone remembering
            which photo was which.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Compared to walking a right-of-way with a handheld detector, or scaffolding and rope
            access on refinery static equipment, a drone covers the same ground faster and feeds
            evidence straight into the Integrity Management Systems your team already reports
            through - it replaces the walk, not the engineer.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/solutions/pipeline-operators"
              className="group inline-flex items-center justify-between gap-4 rounded-xl bg-accent px-6 py-4 text-left transition-colors duration-150 hover:bg-accent-hover"
            >
              <span>
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/70">
                  For pipeline operators
                </span>
                <span className="block text-[0.95rem] font-semibold text-white">
                  Reduce risk &amp; inspection cost
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/solutions/refinery-operators"
              className="group inline-flex items-center justify-between gap-4 rounded-xl border border-line-strong bg-card px-6 py-4 text-left transition-colors duration-150 hover:border-line-strong hover:bg-elevated"
            >
              <span>
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
                  For refinery &amp; industrial operators
                </span>
                <span className="block text-[0.95rem] font-semibold text-ink">
                  Reduce scaffolding &amp; rope-access cost
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Government, research, or investor partner?{' '}
            <Link
              href="/solutions/government-agencies"
              className="text-accent hover:text-accent-hover"
            >
              See how we work with agencies
            </Link>{' '}
            or{' '}
            <Link href="/solutions/researchers" className="text-accent hover:text-accent-hover">
              explore the research
            </Link>
            .
          </p>

          <p className="mt-4 text-xs text-ink-faint">
            AI-first, not a flight service - we design and test our own drone hardware to ground
            the intelligence layer in real flight data, built across pipeline, refinery, terminal,
            and offshore inspection, expanding from an India base to a global market.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Award className="h-3.5 w-3.5 text-accent" aria-hidden />
              National winner, Smart India Hackathon 2025
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <Landmark className="h-3.5 w-3.5 text-accent" aria-hidden />
              Government-incubated deep-tech
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden />
              LeakSonic Private Limited
            </span>
          </div>
        </div>

        {/* Hero photograph */}
        <div className="relative">
          <div className="overflow-hidden rounded-squircle border border-line bg-surface/60 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-[1px]">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted">
                Sentrix · corridor 04
              </span>
              <span className="flex items-center gap-1.5 font-sans text-[0.65rem] text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> reviewing
              </span>
            </div>
            <div className="relative aspect-[8/9] w-full">
              <Image
                src="/images/generated/hero-drone-pipeline-corridor.jpg"
                alt="A Sentrix inspection drone flying low over a gas pipeline right-of-way corridor at dusk"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center font-sans text-[0.65rem] text-ink-faint">
            Illustrative - Sentrix turns field evidence into a ranked, auditable decision.
          </p>
        </div>
      </div>
    </section>
  );
}
