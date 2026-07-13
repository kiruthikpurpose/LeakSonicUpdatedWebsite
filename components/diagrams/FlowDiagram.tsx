import { Plane, Sparkles, UserCheck, Boxes, CircleCheckBig, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The single plain-language flow the public site exposes:
 * Drone evidence -> Sentrix -> Engineer -> Existing systems -> Decision.
 *
 * Deliberately outcome-level. It communicates positioning (Sentrix is the
 * decision layer, the drone is one input) without revealing any mechanism -
 * no sensors, no data sources, no architecture. The accent sits on the
 * Sentrix node because that is the product; everything else is context.
 */

type Node = {
  icon: LucideIcon;
  label: string;
  sub: string;
  accent?: boolean;
};

const NODES: Node[] = [
  { icon: Plane, label: 'Drone evidence', sub: 'Raw inspection data from the field' },
  {
    icon: Sparkles,
    label: 'Sentrix',
    sub: 'Standardise · compare · prioritise',
    accent: true,
  },
  { icon: UserCheck, label: 'Integrity engineer', sub: 'Reviews evidence, stays in control' },
  { icon: Boxes, label: 'Existing systems', sub: 'The tools your team already runs on' },
  { icon: CircleCheckBig, label: 'Decision', sub: 'Where to inspect, repair, and report' },
];

export function FlowDiagram({ className }: { className?: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-card border border-line bg-card p-6 sm:p-10 ${className ?? ''}`}
    >
      <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          const isLast = i === NODES.length - 1;
          return (
            <li
              key={node.label}
              className="flex flex-col items-stretch gap-3 lg:flex-1 lg:flex-row lg:items-center"
            >
              <div
                className={`flex flex-1 flex-col items-center rounded-tile border p-4 text-center ${
                  node.accent
                    ? 'border-accent/40 bg-accent/[0.07]'
                    : 'border-line bg-surface'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-tile border ${
                    node.accent
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-line bg-card text-ink-secondary'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span
                  className={`mt-3 text-sm font-semibold ${node.accent ? 'text-accent' : 'text-ink'}`}
                >
                  {node.label}
                </span>
                <span className="mt-1 text-[0.72rem] leading-snug text-ink-muted">{node.sub}</span>
              </div>

              {!isLast && (
                <span
                  className="flex shrink-0 items-center justify-center text-ink-faint lg:px-1"
                  aria-hidden
                >
                  {/* down arrow on mobile, right arrow on desktop */}
                  <ArrowRight className="hidden h-4 w-4 lg:block" />
                  <ArrowRight className="h-4 w-4 rotate-90 lg:hidden" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-6 text-center text-xs text-ink-faint">
        Sentrix is the decision layer between raw drone evidence and an auditable engineering
        decision - it works alongside the systems operators already use, it does not replace them.
      </figcaption>
    </figure>
  );
}
