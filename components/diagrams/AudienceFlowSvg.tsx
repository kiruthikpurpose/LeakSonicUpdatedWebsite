export type FlowStage = { label: string; sub: string };

/**
 * A genuine inline SVG flow diagram, distinct from the icon-based FlowDiagram.
 * Renders a left-to-right pipeline of labelled stages connected by curved
 * connectors, with the Sentrix stage (accentIndex) highlighted. Used on each
 * /solutions/* page with audience-specific stage copy so the "where it fits"
 * story reads as tailored to that reader, not a generic reused graphic.
 */
export function AudienceFlowSvg({
  stages,
  accentIndex = 1,
  caption,
  className,
}: {
  stages: FlowStage[];
  accentIndex?: number;
  caption: string;
  className?: string;
}) {
  const n = stages.length;
  const boxW = 148;
  const boxH = 96;
  const gap = (760 - n * boxW) / (n - 1);
  const y = 40;

  return (
    <figure
      className={`overflow-hidden rounded-card border border-line bg-card p-4 sm:p-8 ${className ?? ''}`}
    >
      <svg
        viewBox="0 0 800 180"
        role="img"
        aria-label={caption}
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {stages.map((stage, i) => {
          const x = 20 + i * (boxW + gap);
          const isAccent = i === accentIndex;
          const cx = x + boxW / 2;

          return (
            <g key={stage.label}>
              {i < n - 1 && (
                <path
                  d={`M ${x + boxW} ${y + boxH / 2} C ${x + boxW + gap * 0.35} ${y + boxH / 2 - 22}, ${
                    x + boxW + gap * 0.65
                  } ${y + boxH / 2 + 22}, ${x + boxW + gap} ${y + boxH / 2}`}
                  fill="none"
                  className="stroke-line-strong"
                  strokeWidth="2"
                  strokeDasharray={isAccent ? '0' : '5 4'}
                />
              )}
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx={14}
                className={isAccent ? 'fill-accent/10 stroke-accent/50' : 'fill-surface stroke-line'}
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={y + 38}
                textAnchor="middle"
                className={isAccent ? 'fill-accent' : 'fill-ink'}
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                {stage.label}
              </text>
              {wrapLines(stage.sub, 20).map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={y + 58 + li * 14}
                  textAnchor="middle"
                  className="fill-ink-muted"
                  style={{ fontSize: '10.5px' }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-center text-xs text-ink-faint">{caption}</figcaption>
    </figure>
  );
}

function wrapLines(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}
