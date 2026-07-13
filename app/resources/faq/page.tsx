import type { Metadata } from 'next';
import { ShieldQuestion, Layers, Scale, Lock, Radar } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { SITE_FAQ } from '@/lib/faq';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

const TOPICS = [
  { icon: ShieldQuestion, label: 'What Sentrix can and can’t do' },
  { icon: Layers, label: 'How Sentrix fits your workflow' },
  { icon: Scale, label: 'Vs. flight-and-imagery services' },
  { icon: Lock, label: 'Data & governance' },
  { icon: Radar, label: 'Detection & false positives' },
];

export const metadata: Metadata = buildMetadata({
  title: 'FAQ - honest answers about Sentrix & pipeline monitoring',
  description:
    'Straight answers to hard questions: can drones detect leaks in buried pipelines (not directly - here’s the proxy approach), what stage Sentrix is at, and how it differs from existing drone inspection services.',
  path: '/resources/faq',
  keywords: [
    'pipeline inspection FAQ',
    'drone pipeline leak detection',
    'gas pipeline monitoring questions',
    'pipeline integrity software FAQ',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources/faq' },
  { name: 'FAQ', path: '/resources/faq' },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Resources · FAQ"
        title="The hard questions, answered honestly."
        lead="We’d rather tell you what Sentrix can’t do than oversell what it can. These are the questions a skeptical engineer actually asks - with straight answers."
        crumbs={crumbs}
      />
      <section className="bg-base py-section">
        <div className="container-content max-w-3xl">
          <div className="mb-10 flex flex-wrap gap-2">
            {TOPICS.map((t) => {
              const Icon = t.icon;
              return (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-ink-secondary"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {t.label}
                </span>
              );
            })}
          </div>
          {/* FaqBlock emits FAQPage structured data for this page. */}
          <FaqBlock items={SITE_FAQ} />
        </div>
      </section>
      <CtaBand
        title="Still have a question?"
        body="If your question isn’t here - especially a tough technical one - ask it directly. We answer honestly, including when the answer is “we don’t know yet.”"
        primaryHref="/contact"
        primaryLabel="Ask us"
        secondaryHref="/resources/glossary"
        secondaryLabel="Glossary"
      />
    </>
  );
}
