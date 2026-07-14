import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import GithubSlugger from 'github-slugger';
import type { BlogFrontmatter, BlogPost, BlogMeta, BlogCategoryId } from './blog-meta';

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/**
 * Extract the h2/h3 headings from a post's markdown body for the table of
 * contents. Uses the same GithubSlugger that rehype-slug uses at render time,
 * so the anchor ids match exactly. Fenced code blocks are skipped so a `##`
 * comment inside code never becomes a heading.
 */
export function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const raw of markdown.split('\n')) {
    const line = raw.trimEnd();
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!m) continue;
    const level = m[1]!.length as 2 | 3;
    // Strip inline markdown (links, emphasis, code) to plain text.
    const text = m[2]!
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();
    entries.push({ id: slugger.slug(text), text, level });
  }
  return entries;
}

// Re-export client-safe pieces so existing server imports keep working.
export {
  BLOG_CATEGORIES,
  formatDate,
  type BlogCategoryId,
  type BlogFrontmatter,
  type BlogPost,
  type BlogMeta,
} from './blog-meta';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFile(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;
  return {
    ...fm,
    tags: fm.tags ?? [],
    faqs: fm.faqs ?? [],
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPost(slug: string): BlogPost {
  return parseFile(slug);
}

export function getAllPosts(): BlogMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = parseFile(slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRelatedPosts(slug: string, category: BlogCategoryId, limit = 3): BlogMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const sameCategory = all.filter((p) => p.category === category);
  const rest = all.filter((p) => p.category !== category);
  return [...sameCategory, ...rest].slice(0, limit);
}
