import type { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY } from '@/lib/glossary';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Glossary - pipeline integrity & inspection terms',
  description:
    'Clear, standalone definitions of 30+ terms behind gas pipeline integrity and inspection: cathodic protection, in-line inspection, DCVG, CIPS, MAOP, HCA, MIC, risk-based inspection, false positive rate, and more.',
  path: '/resources/glossary',
  keywords: [
    'pipeline integrity glossary',
    'cathodic protection terms',
    'pipeline inspection terminology',
    'methane monitoring glossary',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources/glossary' },
  { name: 'Glossary', path: '/resources/glossary' },
];

// DefinedTermSet structured data aids AI retrieval and search understanding.
function glossarySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'LeakSonic pipeline integrity glossary',
    hasDefinedTerm: GLOSSARY.map((g) => ({
      '@type': 'DefinedTerm',
      name: g.abbr ? `${g.term} (${g.abbr})` : g.term,
      description: g.definition,
    })),
  };
}

function slug(term: string) {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), glossarySchema()]} />
      <PageHero
        eyebrow="Resources · Glossary"
        title="The vocabulary of pipeline integrity, defined properly."
        lead="Each entry is written to stand on its own as a citable passage - not a one-line dictionary gloss. If a term on this site was unfamiliar, it’s explained here in full."
        crumbs={crumbs}
      />

      <section className="bg-base py-section">
        <div className="container-content max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-xs text-ink-secondary">
            <BookOpenText className="h-3.5 w-3.5 text-accent" aria-hidden />
            {GLOSSARY.length} terms defined, standalone and citable
          </div>

          {/* Quick jump */}
          <div className="mb-10 flex flex-wrap gap-2">
            {GLOSSARY.map((g) => (
              <a
                key={g.term}
                href={`#${slug(g.term)}`}
                className="rounded-xl border border-line bg-card px-3 py-1.5 font-sans text-xs text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
              >
                {g.abbr ?? g.term}
              </a>
            ))}
          </div>

          <dl className="divide-y divide-line">
            {GLOSSARY.map((g, i) => (
              <Reveal key={g.term} delay={Math.min(i * 0.03, 0.2)}>
                <div id={slug(g.term)} className="scroll-mt-24 py-8 first:pt-0">
                  <dt>
                    <h2 className="text-h3 font-semibold text-ink">
                      {g.term}
                      {g.abbr && (
                        <span className="ml-2 font-sans text-sm font-normal text-ink-muted">
                          {g.abbr}
                        </span>
                      )}
                    </h2>
                  </dt>
                  <dd className="mt-3 leading-relaxed text-ink-secondary">{g.definition}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
