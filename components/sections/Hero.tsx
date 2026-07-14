import Link from 'next/link';
import { ArrowRight, Award, Landmark, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { DroneScan } from '@/components/diagrams/DroneScan';

/**
 * Full-viewport dark hero. Leads with the decision-intelligence positioning -
 * Sentrix is the engineering decision layer, the drone is one input. Two
 * audience CTAs get top billing: operators and government/research partners.
 * The right column carries an abstract, on-brand animated visual - no
 * generated imagery, no gradient-mesh tells. On mobile it stacks beneath copy.
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
            Engineering Decision Intelligence · Oil &amp; Gas Inspection
          </Badge>

          <h1 className="text-display-lg font-extrabold text-ink">
            Turn raw drone inspection evidence into{' '}
            <span className="text-accent">decisions you can defend</span>.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
            Sentrix reduces the engineering effort required to validate, compare, prioritise, and
            report inspection findings across pipeline corridors, refineries, terminals, and
            offshore platforms - turning raw drone evidence into standardised, decision-ready
            intelligence inside the workflows operators already use. Comparing today’s inspection to
            last year’s shouldn’t depend on someone remembering which photo was which.
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
              href="/solutions/government-agencies"
              className="group inline-flex items-center justify-between gap-4 rounded-xl border border-line-strong bg-card px-6 py-4 text-left transition-colors duration-150 hover:border-line-strong hover:bg-elevated"
            >
              <span>
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
                  For research &amp; government partners
                </span>
                <span className="block text-[0.95rem] font-semibold text-ink">
                  Evaluate Sentrix
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Researcher or investor?{' '}
            <Link href="/solutions/researchers" className="text-accent hover:text-accent-hover">
              Explore the research
            </Link>{' '}
            or{' '}
            <Link href="/contact#investor" className="text-accent hover:text-accent-hover">
              talk to us about funding Sentrix
            </Link>
            .
          </p>

          <p className="mt-4 text-xs text-ink-faint">
            A decision layer, not a flight service - built across pipeline, refinery, terminal, and
            offshore inspection, expanding from an India base to a global market.
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
              MSME-registered
            </span>
          </div>
        </div>

        {/* Animated drone-scan visual */}
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
            <DroneScan className="aspect-[16/9] w-full" />
          </div>
          <p className="mt-3 text-center font-sans text-[0.65rem] text-ink-faint">
            Illustrative - Sentrix turns field evidence into a ranked, auditable decision.
          </p>
        </div>
      </div>
    </section>
  );
}
