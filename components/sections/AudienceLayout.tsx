import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { CtaBand } from '@/components/sections/CtaBand';
import { FlowDiagram } from '@/components/diagrams/FlowDiagram';
import { SectionLabel } from '@/components/ui/SectionLabel';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, type Crumb } from '@/lib/schema';

export type AudienceConcern = { title: string; body: string };
export type AudienceValue = { title: string; body: string };
export type AudienceStat = { value: string; label: string; icon: LucideIcon };

export type AudienceContent = {
  eyebrow: string;
  title: string;
  lead: string;
  slug: string;
  name: string;
  /** A short strip of distinguishing signals unique to this audience. */
  stats: AudienceStat[];
  /** What this audience actually cares about - addressed directly. */
  concernsHeading: string;
  concernsLead: string;
  concerns: AudienceConcern[];
  /** Concrete value points. */
  valueHeading: string;
  values: AudienceValue[];
  cta: {
    title: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
  };
};

/** Shared layout for the three /solutions/* audience pages. */
export function AudienceLayout({ content }: { content: AudienceContent }) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: content.slug },
    { name: content.name, path: content.slug },
  ];

  return (
    <>
      {/* Concerns are written as direct question-and-answer pairs, so they are
          emitted as FAQPage schema too - a strong AEO signal on each audience page. */}
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          faqSchema(content.concerns.map((c) => ({ question: c.title, answer: c.body }))),
        ]}
      />
      <PageHero eyebrow={content.eyebrow} title={content.title} lead={content.lead} crumbs={crumbs}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {content.stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-card border border-line bg-card p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile border border-accent/30 bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{s.value}</div>
                  <div className="text-xs text-ink-muted">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </PageHero>

      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="What you care about"
              title={content.concernsHeading}
              lead={content.concernsLead}
            />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
            {content.concerns.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <h3 className="text-h3 font-semibold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{c.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <Reveal>
            <SectionLabel>Where it fits</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-h2 font-bold text-ink">
              A decision layer, not another system to adopt
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <FlowDiagram className="mt-8" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-section">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="What Sentrix gives you" title={content.valueHeading} />
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {content.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-card border border-line bg-card p-6">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={content.cta.title}
        body={content.cta.body}
        primaryHref={content.cta.primaryHref}
        primaryLabel={content.cta.primaryLabel}
        secondaryHref="/platform"
        secondaryLabel="See the platform"
      />
    </>
  );
}
