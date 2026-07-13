import { cn } from '@/lib/cn';
import { Camera } from 'lucide-react';

/**
 * Layout-correct slot for imagery not yet captured/uploaded. Styled as an
 * intentional "pending documentation" marker - not a broken image, not a
 * fake render - using the same precision-diagram corner marks as the site's
 * SVG diagrams so it reads as deliberate rather than unfinished.
 */
export function ImagePlaceholder({
  ratio = '16 / 9',
  label,
  className,
}: {
  ratio?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        'bg-grid relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-card border border-line bg-surface p-6 text-center',
        className,
      )}
      role="img"
      aria-label={label}
    >
      {/* blueprint corner marks, matching the diagram language */}
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/50" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-accent/50" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-accent/50" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/50" />

      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card text-ink-muted">
        <Camera className="h-4 w-4" aria-hidden />
      </span>
      <span className="mono-label text-ink-faint">Pending field documentation</span>
      <span className="max-w-xs text-[0.7rem] leading-relaxed text-ink-faint">{label}</span>
    </div>
  );
}
