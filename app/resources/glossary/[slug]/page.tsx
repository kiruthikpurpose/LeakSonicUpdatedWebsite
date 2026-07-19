import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY, glossarySlug, type GlossaryEntry } from '@/lib/glossary';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

type Params = { slug: string };

function findEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((g) => glossarySlug(g.term) === slug);
}

export async function generateStaticParams(): Promise<Params[]> {
  return GLOSSARY.map((g) => ({ slug: glossarySlug(g.term) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return buildMetadata({ title: 'Glossary', description: '', path: '/resources/glossary' });

  const label = entry.abbr ? `${entry.term} (${entry.abbr})` : entry.term;
  return buildMetadata({
    title: `What is ${label}? - pipeline integrity glossary`,
    description: entry.definition.slice(0, 155).trim() + (entry.definition.length > 155 ? '…' : ''),
    path: `/resources/glossary/${slug}`,
    keywords: [entry.term, entry.abbr, `${entry.term} pipeline`, `${entry.term} definition`].filter(
      (k): k is string => Boolean(k),
    ),
  });
}

// DefinedTerm structured data for a single term - the schema type answer
// engines resolve directly against "what is X" queries, giving each term its
// own citable, indexable unit instead of one entry buried in a combined page.
function definedTermSchema(entry: GlossaryEntry, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.abbr ? `${entry.term} (${entry.abbr})` : entry.term,
    description: entry.definition,
    inDefinedTermSet: `${SITE.url}/resources/glossary`,
    url: `${SITE.url}/resources/glossary/${slug}`,
  };
}

export default async function GlossaryTermPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources/glossary' },
    { name: 'Glossary', path: '/resources/glossary' },
    { name: entry.term, path: `/resources/glossary/${slug}` },
  ];

  const related = GLOSSARY.filter((g) => g.term !== entry.term).slice(0, 6);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), definedTermSchema(entry, slug)]} />
      <PageHero
        eyebrow="Resources · Glossary"
        title={entry.abbr ? `${entry.term} (${entry.abbr})` : entry.term}
        lead={entry.definition}
        crumbs={crumbs}
      />

      <section className="bg-base py-section">
        <div className="container-content max-w-3xl">
          <Reveal>
            <Link
              href="/resources/glossary"
              className="inline-flex items-center gap-1.5 font-sans text-sm text-accent hover:text-accent-hover"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Back to the full glossary
            </Link>
          </Reveal>

          {related.length > 0 && (
            <Reveal delay={0.08}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="mono-label">Related terms</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {related.map((g) => (
                    <Link
                      key={g.term}
                      href={`/resources/glossary/${glossarySlug(g.term)}`}
                      className="rounded-xl border border-line bg-card px-3 py-1.5 font-sans text-xs text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
                    >
                      {g.abbr ?? g.term}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand
        title="See how Sentrix puts this to work"
        body="This is one term out of many an integrity team has to track. Sentrix turns the underlying inspection evidence into a standardised, prioritised, defensible decision - see the platform, or explore the free tools."
        primaryHref="/platform"
        primaryLabel="See the platform"
        secondaryHref="/tools"
        secondaryLabel="Explore free tools"
      />
    </>
  );
}
