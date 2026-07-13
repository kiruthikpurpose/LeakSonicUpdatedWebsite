import type { Metadata } from 'next';
import { FileText, Download, Lock } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Reports & whitepapers',
  description:
    'Reports and whitepapers from LeakSonic on pipeline inspection decision intelligence and how we validate what Sentrix does. The flagship whitepaper is in preparation.',
  path: '/resources/reports',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources/reports' },
  { name: 'Reports', path: '/resources/reports' },
];

const REPORTS = [
  {
    title: 'Sentrix whitepaper',
    desc: 'A plain-language treatment of the inspection-decision problem, how Sentrix reduces the engineering effort it takes, and how we validate what we claim.',
    status: 'In preparation',
    // TODO: replace href with the real PDF once published, e.g. /reports/sentrix-whitepaper.pdf
    href: null,
  },
  {
    title: 'How we validate',
    desc: 'The claims we test before we assert them, how each is tested with practising engineers, and the criteria for calling each proven or disproven.',
    status: 'See our approach',
    href: '/research',
  },
];

export default function ReportsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Resources · Reports"
        title="Written detail for readers who want the full argument."
        lead="Our long-form technical writing lives here. We’d rather publish a whitepaper that’s honest and complete than rush a marketing PDF - so the flagship document is marked as in preparation until it’s ready."
        crumbs={crumbs}
      />

      <section className="bg-base py-section">
        <div className="container-content max-w-3xl space-y-4">
          {REPORTS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="flex flex-col gap-4 rounded-card border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                    <FileText className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-semibold text-ink">{r.title}</h2>
                    <p className="mt-1 text-sm text-ink-secondary">{r.desc}</p>
                    <Badge variant="muted" className="mt-3">
                      {r.status}
                    </Badge>
                  </div>
                </div>
                {r.href ? (
                  <a
                    href={r.href}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line-strong bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-elevated"
                  >
                    <Download className="h-4 w-4" /> Read
                  </a>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-medium text-ink-muted">
                    <Lock className="h-4 w-4" /> Coming soon
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want the whitepaper when it lands?"
        body="Tell us who you are and we’ll make sure you get the technical whitepaper as soon as it’s published - and we’ll route any questions to the right context in the meantime."
        primaryHref="/contact"
        primaryLabel="Get notified"
        secondaryHref="/research"
        secondaryLabel="See our approach"
      />
    </>
  );
}
