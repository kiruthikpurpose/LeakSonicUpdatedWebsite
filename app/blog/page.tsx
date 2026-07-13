import type { Metadata } from 'next';
import { Rss } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { NewsletterSignup } from '@/components/blog/NewsletterSignup';
import JsonLd from '@/components/JsonLd';
import { getAllPosts } from '@/lib/blog';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Blog - pipeline integrity, methane detection & inspection intelligence',
  description:
    'Substantive, citable explainers on pipeline integrity management, methane leak detection technology, gas network expansion, drone regulation, and sensor fusion - written for a technical audience.',
  path: '/blog',
  keywords: [
    'pipeline integrity blog',
    'methane leak detection',
    'gas pipeline inspection technology',
    'pipeline corrosion monitoring',
  ],
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            posts.map((p) => ({
              name: p.title,
              path: `/blog/${p.slug}`,
              description: p.summary,
            })),
            'LeakSonic blog posts',
          ),
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Field notes on pipeline integrity, methane, and gas infrastructure."
        lead="Category authority, written plainly. These posts explain the domain we work in - they are not product-performance claims. Each opens with a direct answer and cites its sources."
        crumbs={crumbs}
      />
      <section className="bg-base py-section">
        <div className="container-content">
          <div className="mb-8 flex justify-end">
            <a
              href="/blog/feed.xml"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-line-strong hover:text-ink"
            >
              <Rss className="h-3.5 w-3.5 text-accent" aria-hidden />
              RSS feed
            </a>
          </div>
          <BlogIndex posts={posts} />
          <div className="mt-14">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
