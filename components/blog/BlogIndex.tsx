'use client';

import { useState } from 'react';
import { BlogCard } from './BlogCard';
import { cn } from '@/lib/cn';
import { BLOG_CATEGORIES, type BlogMeta, type BlogCategoryId } from '@/lib/blog-meta';

type Filter = 'all' | BlogCategoryId;

export function BlogIndex({ posts }: { posts: BlogMeta[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All posts' },
    ...BLOG_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label })),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full border px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition-colors',
              filter === f.id
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-line bg-card text-ink-muted hover:border-line-strong hover:text-ink',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <BlogCard
            key={post.slug}
            post={post}
            // The first card in the default, unfiltered view gets a larger
            // treatment so the index doesn't read as one undifferentiated
            // wall of same-size tiles.
            featured={filter === 'all' && i === 0}
          />
        ))}
      </div>
    </div>
  );
}
