import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { BlogCover } from '@/components/diagrams/BlogCover';
import { BLOG_CATEGORIES, formatDate, type BlogMeta } from '@/lib/blog-meta';
import { cn } from '@/lib/cn';

export function BlogCard({ post, featured = false }: { post: BlogMeta; featured?: boolean }) {
  const category = BLOG_CATEGORIES.find((c) => c.id === post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex h-full overflow-hidden rounded-card border border-line bg-card transition-colors duration-150 hover:border-line-strong hover:bg-elevated',
        featured
          ? 'flex-col sm:col-span-2 sm:flex-row lg:col-span-3'
          : 'flex-col',
      )}
    >
      {/* Generated on-brand cover art */}
      <div className={cn('relative border-b border-line', featured && 'sm:w-2/5 sm:border-b-0 sm:border-r')}>
        <BlogCover
          slug={post.slug}
          category={post.category}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent sm:hidden" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="muted">{category?.label ?? post.category}</Badge>
            {featured && <Badge variant="accent">Latest</Badge>}
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" />
        </div>
        <h3
          className={cn(
            'mt-4 font-semibold leading-snug text-ink transition-colors group-hover:text-accent',
            featured ? 'text-h2' : 'text-h3',
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            'mt-3 flex-1 leading-relaxed text-ink-secondary',
            featured ? 'text-base' : 'text-sm',
          )}
        >
          {post.summary}
        </p>
        <div className="mt-5 flex items-center gap-3 font-sans text-[0.7rem] text-ink-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
