import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBand } from '@/components/sections/CtaBand';
import { EmbedBadge } from '@/components/tools/EmbedBadge';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, toolSchema, type Crumb, type FaqItem } from '@/lib/schema';

export type ToolFaq = FaqItem;

/** Shared page chrome for every /tools/* calculator: hero, breadcrumb + FAQ
 * schema, the tool itself (passed as children), a methodology/disclaimer
 * block, related FAQ, and a closing CTA. Keeps every tool page structurally
 * consistent and fully AEO/GEO-instrumented without repeating boilerplate. */
export function ToolShell({
  eyebrow,
  title,
  lead,
  slug,
  name,
  schemaDescription,
  methodologyNote,
  faqs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  slug: string;
  name: string;
  schemaDescription: string;
  methodologyNote: string;
  faqs: ToolFaq[];
  children: React.ReactNode;
}) {
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name, path: slug },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          toolSchema({ name, description: schemaDescription, path: slug }),
          faqSchema(faqs),
        ]}
      />
      <PageHero eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs} />

      <section className="border-b border-line bg-base py-section">
        <div className="container-content space-y-6">
          <Reveal>{children}</Reveal>
          <EmbedBadge name={name} slug={slug} />
        </div>
      </section>

      <section className="border-b border-line bg-surface py-section">
        <div className="container-content max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="How to read this" title="Methodology & limits" />
            <p className="mt-5 text-base leading-relaxed text-ink-secondary">{methodologyNote}</p>
          </Reveal>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-b border-line bg-base py-section">
          <div className="container-content max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow="Questions" title="Frequently asked" />
            </Reveal>
            <div className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="text-h3 font-semibold text-ink">{f.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Want this done properly, on your real network or site?"
        body="This tool gives you a fast, illustrative estimate. Sentrix gives you a defensible, evidence-backed answer, built on your actual data. Tell us about your network or site and we'll walk you through it."
        primaryHref="/contact"
        primaryLabel="Talk to us"
        secondaryHref="/platform"
        secondaryLabel="See the platform"
      />
    </>
  );
}
