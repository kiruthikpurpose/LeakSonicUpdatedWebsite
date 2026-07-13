import type { Metadata } from 'next';
import { SITE } from './site';

type BuildMetaArgs = {
  title: string;
  description: string;
  path: string;
  /** Overrides the generated OG image for this page. */
  ogImage?: string;
  /** Short eyebrow shown on the generated OG image. */
  ogEyebrow?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

/** Build the per-page branded OG image URL from the /api/og template route. */
function ogImageFor(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set('eyebrow', eyebrow);
  return `/api/og?${params.toString()}`;
}

/**
 * Build per-route metadata. Every page passes a page-specific title and an
 * answer-first description - no templated duplicates.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  ogEyebrow,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
}: BuildMetaArgs): Metadata {
  const url = new URL(path, SITE.url).toString();
  const image = new URL(ogImage ?? ogImageFor(title, ogEyebrow), SITE.url).toString();
  const fullTitle = path === '/' ? title : `${title} · ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
      // Next only shallow-merges metadata per top-level key, so the RSS
      // autodiscovery link has to travel with every page's `alternates`
      // object rather than living once in the root layout - otherwise each
      // page's own `alternates.canonical` would silently drop it.
      types: { 'application/rss+xml': [{ url: '/blog/feed.xml', title: `${SITE.name} Blog` }] },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_IN',
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
