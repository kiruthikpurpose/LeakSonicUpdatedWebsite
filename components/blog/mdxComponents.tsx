import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/cn';
import { DefinitionBox } from './DefinitionBox';

/**
 * Restyled MDX element mapping. Enterprise-dark prose: generous line-height,
 * clear hierarchy, monospace for inline code, and a table style that scrolls
 * horizontally inside its own container on narrow screens.
 */
export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn('mt-10 scroll-mt-24 text-h2 font-bold text-ink first:mt-0', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn('mt-10 scroll-mt-24 text-h3 font-semibold text-ink', className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('mt-5 text-[1.02rem] leading-[1.75] text-ink-secondary', className)}
      {...props}
    />
  ),
  a: ({ href = '#', className, ...props }) => (
    <Link
      href={href}
      className={cn(
        'font-medium text-accent underline underline-offset-4 hover:text-accent-hover',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'mt-5 list-disc space-y-2 pl-6 text-ink-secondary marker:text-accent',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'mt-5 list-decimal space-y-2 pl-6 text-ink-secondary marker:text-ink-muted',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('pl-1.5 leading-[1.7]', className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn('font-semibold text-ink', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-accent bg-card py-1 pl-5 pr-4 text-ink-secondary [&>p]:mt-0 [&>p]:italic',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'rounded bg-elevated px-1.5 py-0.5 font-sans text-[0.85em] text-ink',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => <hr className={cn('my-12 border-line', className)} {...props} />,
  table: ({ className, ...props }) => (
    <div className="mt-8 overflow-x-auto rounded-card border border-line">
      <table className={cn('w-full border-collapse text-left text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => <thead className={cn('bg-surface', className)} {...props} />,
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border-b border-line px-4 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border-b border-line px-4 py-3 align-top text-ink-secondary', className)}
      {...props}
    />
  ),
  Definition: DefinitionBox,
};
