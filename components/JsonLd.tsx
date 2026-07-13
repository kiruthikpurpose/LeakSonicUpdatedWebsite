/**
 * Renders a JSON-LD script tag. Accepts a single schema object or an array.
 * Used for Organization, Article, FAQPage, and BreadcrumbList structured data.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is generated server-side from trusted data, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
