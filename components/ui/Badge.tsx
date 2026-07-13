import * as React from 'react';
import { cn } from '@/lib/cn';

const styles = {
  neutral: 'border-line bg-card text-ink-secondary',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  muted: 'border-line bg-surface text-ink-muted',
} as const;

export function Badge({
  className,
  variant = 'neutral',
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof styles }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em]',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
