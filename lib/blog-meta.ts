import type { FaqItem } from './schema';

/**
 * Client-safe blog types and constants - no Node filesystem imports, so this
 * can be imported by client components. The fs-backed loader lives in blog.ts.
 */

export const BLOG_CATEGORIES = [
  { id: 'fundamentals', label: 'Fundamentals' },
  { id: 'india', label: 'India' },
  { id: 'technical', label: 'Technical' },
  { id: 'industry', label: 'Industry & Market' },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]['id'];

export type BlogFrontmatter = {
  title: string;
  date: string;
  lastUpdated: string;
  author: string;
  summary: string;
  category: BlogCategoryId;
  tags: string[];
  /** Optional path to a hero image under /public. */
  image?: string;
  /** FAQ block rendered at the end of the post and emitted as FAQPage schema. */
  faqs?: FaqItem[];
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

export type BlogMeta = Omit<BlogPost, 'content'>;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
