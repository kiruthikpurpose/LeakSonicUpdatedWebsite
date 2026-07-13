import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { QuickAnswer } from '@/components/blog/QuickAnswer';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogCover } from '@/components/diagrams/BlogCover';
import { FaqBlock } from '@/components/ui/FaqBlock';
import { mdxComponents } from '@/components/blog/mdxComponents';
import JsonLd from '@/components/JsonLd';
import { getPost, getPostSlugs, getRelatedPosts, formatDate, BLOG_CATEGORIES } from '@/lib/blog';
import { buildMetadata } from '@/lib/metadata';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  let post;
  try {
    post = getPost(params.slug);
  } catch {
    return {};
  }
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.lastUpdated,
    ogImage: post.image,
    keywords: post.tags,
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!getPostSlugs().includes(params.slug)) notFound();
  const post = getPost(params.slug);
  const related = getRelatedPosts(post.slug, post.category);
  const category = BLOG_CATEGORIES.find((c) => c.id === post.category);
  const hasFaqs = (post.faqs?.length ?? 0) > 0;

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const schemas: object[] = [
    breadcrumbSchema(crumbs),
    articleSchema({
      title: post.title,
      description: post.summary,
      slug: post.slug,
      datePublished: post.date,
      dateModified: post.lastUpdated,
      author: post.author,
      image: post.image,
      section: category?.label ?? post.category,
      keywords: post.tags,
      wordCount: post.content.trim().split(/\s+/).length,
    }),
  ];
  if (hasFaqs) schemas.push(faqSchema(post.faqs!));

  return (
    <>
      <JsonLd data={schemas} />
      <article className="bg-base">
        {/* Header */}
        <header className="border-b border-line bg-surface">
          <div className="container-content py-14">
            <div className="mx-auto max-w-4xl">
              <Breadcrumbs crumbs={crumbs} />
              <Badge variant="muted">{category?.label ?? post.category}</Badge>
              <h1 className="mt-5 text-display font-extrabold text-ink">{post.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs text-ink-muted">
                <span>{post.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-card border border-line">
              <BlogCover slug={post.slug} category={post.category} />
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container-content py-14">
          <div className="mx-auto max-w-4xl">
            <QuickAnswer>{post.summary}</QuickAnswer>

            <div className="mt-10">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {/* FAQ */}
            {hasFaqs && (
              <section className="mt-9">
                <SectionLabel>Frequently asked</SectionLabel>
                <h2 className="mt-4 text-h2 font-bold text-ink">Questions this raises</h2>
                {/* Schema already emitted above; avoid duplicate FAQPage nodes. */}
                <div className="mt-6">
                  <FaqBlock items={post.faqs!} withSchema={false} />
                </div>
              </section>
            )}

            {/* Last updated + tags */}
            <div className="mt-9 border-t border-line pt-6">
              <p className="font-sans text-xs text-ink-muted">
                Last updated: {formatDate(post.lastUpdated)}
              </p>
              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-card px-3 py-1 font-sans text-[0.68rem] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All posts
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-line bg-surface py-section">
            <div className="container-content">
              <div className="flex items-center justify-between">
                <h2 className="text-h2 font-bold text-ink">Related reading</h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-accent"
                >
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
