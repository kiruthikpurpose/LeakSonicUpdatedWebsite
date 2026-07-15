import { Terminal } from 'lucide-react';

export type LogLine = { label: string; detail: string };

/** Renders the step-by-step reasoning behind a computed result, monospace,
 * so the tool reads as showing its work rather than handing over a bare
 * number. Every line is derived directly from the current inputs. */
export function InsightLog({ lines, title = 'How this result was computed' }: { lines: LogLine[]; title?: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-base">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <Terminal className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="font-sans text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
          {title}
        </span>
      </div>
      <ol className="divide-y divide-line">
        {lines.map((line, i) => (
          <li key={i} className="px-4 py-3">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[0.68rem] text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-semibold text-ink">{line.label}</span>
            </div>
            <p className="mt-1 pl-6 text-[0.82rem] leading-relaxed text-ink-secondary">
              {line.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
