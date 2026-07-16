import { getAllPosts, BLOG_CATEGORIES } from '@/lib/blog';
import { SITE } from '@/lib/site';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function categoryLabel(id: string): string {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/** RSS 2.0 feed for the blog - real content-marketing/subscriber value, not
 * just a page. Full-namespace (content, dc, media) so aggregators, feed
 * readers, and syndication/backlink crawlers get a rich, accurate item:
 * author, tags-as-categories, a teaser in content:encoded, and a thumbnail
 * enclosure - not just a bare title and link. */
export async function GET() {
  const posts = getAllPosts();
  const base = SITE.url;
  const feedUrl = `${base}/blog/feed.xml`;

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const ogImage = `${base}/api/og?${new URLSearchParams({ title: post.title }).toString()}`;
      const categories = [post.category, ...post.tags]
        .map((c) => `      <category>${escapeXml(categoryLabel(c))}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary)}</description>
      <content:encoded><![CDATA[<p>${escapeXml(post.summary)}</p><p><a href="${url}">Continue reading on ${escapeXml(SITE.name)} &#8594;</a></p>]]></content:encoded>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <author>${SITE.emailResearch} (${escapeXml(post.author)})</author>
${categories}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <enclosure url="${ogImage}" type="image/png" length="0" />
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE.name} - AI, Drones & Infrastructure Intelligence Blog`)}</title>
    <link>${base}/blog</link>
    <description>Explainers on AI-driven inspection, drone technology, pipeline and refinery integrity, methane detection, and free engineering tools for gas and industrial infrastructure.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} ${SITE.legalName}</copyright>
    <generator>${SITE.name} custom feed</generator>
    <ttl>60</ttl>
    <image>
      <url>${base}/LeakSonicLogo.png</url>
      <title>${SITE.name}</title>
      <link>${base}/blog</link>
    </image>
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
