import Image from 'next/image';
import { Breadcrumbs } from './Breadcrumbs';
import { SectionLabel } from './SectionLabel';
import type { Crumb } from '@/lib/schema';

/** Consistent inner-page hero used by every route except the homepage.
 * Optional `image` renders a full-bleed photographic background behind the
 * copy, with a gradient scrim so text stays legible - the grid texture is
 * used instead when no image is supplied, so existing pages are unaffected. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-surface">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base via-base/90 to-base/50"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40"
            aria-hidden
          />
        </>
      ) : (
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      )}
      <div className="container-content relative py-16 sm:py-20">
        <Breadcrumbs crumbs={crumbs} />
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-5 max-w-4xl text-display font-extrabold text-ink">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">{lead}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
