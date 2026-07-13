import { cn } from '@/lib/cn';

/** Monospace eyebrow label with a short red tick - signals a new section. */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="h-px w-6 bg-accent" aria-hidden />
      <span className="mono-label text-accent">{children}</span>
    </span>
  );
}
