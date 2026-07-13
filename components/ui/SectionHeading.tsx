import { cn } from '@/lib/cn';
import { SectionLabel } from './SectionLabel';

/** Consistent section header: eyebrow label, display heading, optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <Heading className="text-h2 font-bold text-ink">{title}</Heading>
      {lead && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed text-ink-secondary',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
