import { PageHero } from '@/components/ui/PageHero';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

export type LegalSection = { heading: string; body: string[] };

/** Shared layout for the site's legal pages (privacy, terms). */
export function LegalLayout({
  title,
  eyebrow,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  eyebrow: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero eyebrow={eyebrow} title={title} crumbs={crumbs} />
      <section className="bg-base py-section">
        <div className="container-content max-w-prose">
          <p className="font-sans text-xs text-ink-muted">Effective and last updated: {updated}</p>
          <p className="mt-6 leading-relaxed text-ink-secondary">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-h3 font-semibold text-ink">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-ink-secondary">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-card border border-line bg-card p-5">
            <p className="text-xs leading-relaxed text-ink-muted">
              This document is provided for transparency and has not yet been finalised by outside
              legal counsel. It will be formally reviewed, and updated as needed, as the company’s
              products, jurisdictions of operation, and data practices evolve.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
