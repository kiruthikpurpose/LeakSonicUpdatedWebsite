import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ClipboardCheck, Gauge, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Free tools for gas pipeline & refinery inspection teams',
  description:
    'Free, self-serve calculators and assessments for gas pipeline, City Gas Distribution, and refinery inspection teams: estimate inspection ROI, check your reporting readiness, and score inspection priority - no signup required.',
  path: '/tools',
  keywords: [
    'pipeline inspection tools',
    'free inspection calculator',
    'refinery inspection tools',
    'CGD inspection tools',
    'inspection ROI calculator',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
];

type Tool = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const TOOLS: Tool[] = [
  {
    icon: Calculator,
    title: 'Inspection Cost & ROI Calculator',
    body: 'Estimate the engineer-hours and cost a prioritised, decision-ready inspection workflow could save on your pipeline network or refinery site - using assumptions you control.',
    href: '/tools/inspection-cost-calculator',
    cta: 'Open the calculator',
  },
  {
    icon: ClipboardCheck,
    title: 'Integrity & Methane Reporting Readiness Assessment',
    body: 'Five quick questions on prioritisation, cycle comparison, measurement, and reporting - answered instantly with a directional readiness band and next step.',
    href: '/tools/reporting-readiness-assessment',
    cta: 'Take the assessment',
  },
  {
    icon: Gauge,
    title: 'Inspection Priority Score Estimator',
    body: 'Describe an asset across five risk factors and see an illustrative relative-priority score - a fast, hands-on look at how risk-based prioritisation works.',
    href: '/tools/inspection-priority-score',
    cta: 'Estimate a score',
  },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            TOOLS.map((t) => ({ name: t.title, path: t.href, description: t.body })),
            'Free Sentrix tools for gas pipeline and refinery inspection teams',
          ),
        ]}
      />
      <PageHero
        eyebrow="Tools"
        title="Free tools, built from the same thinking behind Sentrix."
        lead="No signup, no data collection beyond what you type in. Each tool is a simplified, honest look at a real question we help operators answer every day - use them, then talk to us if you want the real, evidence-backed version for your network or site."
        crumbs={crumbs}
      />

      <section className="border-b border-line bg-base py-section">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TOOLS.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.href} delay={i * 0.08}>
                  <Card interactive className="flex h-full flex-col p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-tile border border-line bg-surface text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h2 className="mt-5 text-h3 font-semibold text-ink">{tool.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                      {tool.body}
                    </p>
                    <Link
                      href={tool.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {tool.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
