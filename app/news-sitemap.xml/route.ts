import { getAllPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Google News sitemap. News sitemaps should only list articles published in
 * the last 2 days - it stays essentially empty between posts, which is
 * correct behaviour, not a bug. Ready for the day this blog publishes on a
 * cadence worth submitting to Google News.
 */
export async function GET() {
  const base = SITE.url;
  const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const recent = getAllPosts().filter((p) => new Date(p.lastUpdated || p.date).getTime() >= cutoff);

  const items = recent
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE.name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.date).toISOString()}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
