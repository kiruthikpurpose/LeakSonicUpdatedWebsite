import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/** Reusable end-of-page call to action, routed to a contact segment or page. */
export function CtaBand({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-base py-section">
      <div className="container-content">
        <Reveal>
          <div className="rounded-card border border-line bg-card p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <h2 className="text-h2 font-bold text-ink">{title}</h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-secondary">{body}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink href={primaryHref} variant="primary" size="lg">
                  {primaryLabel} <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                {secondaryHref && secondaryLabel && (
                  <ButtonLink href={secondaryHref} variant="secondary" size="lg">
                    {secondaryLabel}
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
