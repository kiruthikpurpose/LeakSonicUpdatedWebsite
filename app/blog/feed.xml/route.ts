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

/** RSS 2.0 feed for the blog - real content-marketing/subscriber value, not just a page. */
export async function GET() {
  const posts = getAllPosts();
  const base = SITE.url;
  const feedUrl = `${base}/blog/feed.xml`;

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary)}</description>
      <author>${SITE.emailResearch} (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name} - Pipeline Integrity Intelligence Blog</title>
    <link>${base}/blog</link>
    <description>Explainers on pipeline integrity management, methane detection, sensor fusion, and inspection intelligence for gas infrastructure.</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
