/**
 * Inline definition callout for MDX blog posts - lets a post surface a
 * glossary-grade definition of a term right where it's first used, instead
 * of sending the reader away to /resources/glossary mid-article. Available
 * in MDX as <Definition term="...">...</Definition>.
 */
export function DefinitionBox({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-card border border-l-4 border-line border-l-accent bg-card p-6">
      <p className="mono-label text-accent">Definition</p>
      <p className="mt-2 text-lg font-semibold text-ink">{term}</p>
      <p className="mt-2 leading-relaxed text-ink-secondary">{children}</p>
    </aside>
  );
}
