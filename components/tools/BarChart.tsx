export type BarDatum = { label: string; value: number; display: string };

/** Horizontal bar chart, red fill, for factor/category breakdowns. Pure
 * inline SVG so it needs no chart library. */
export function BarChart({ data, max, caption }: { data: BarDatum[]; max: number; caption: string }) {
  const rowH = 34;
  const height = data.length * rowH + 10;
  const labelW = 168;
  const chartW = 800 - labelW - 70;

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-card p-4 sm:p-6">
      <svg
        viewBox={`0 0 800 ${height}`}
        role="img"
        aria-label={caption}
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((d, i) => {
          const y = i * rowH + 6;
          const w = Math.max(2, (d.value / max) * chartW);
          return (
            <g key={d.label}>
              <text x={0} y={y + 16} className="fill-ink-secondary" style={{ fontSize: '11.5px' }}>
                {d.label}
              </text>
              <rect
                x={labelW}
                y={y + 4}
                width={chartW}
                height={14}
                rx={7}
                className="fill-surface"
              />
              <rect x={labelW} y={y + 4} width={w} height={14} rx={7} className="fill-accent" />
              <text
                x={labelW + chartW + 8}
                y={y + 15}
                className="fill-ink"
                style={{ fontSize: '11.5px', fontWeight: 600 }}
              >
                {d.display}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">{caption}</figcaption>
    </figure>
  );
}

/** Vertical column chart for year-over-year style projections. An optional
 * threshold line (e.g. a minimum required wall thickness) draws as a dashed
 * red reference line with its own label, independent of the column scale. */
export function ProjectionChart({
  data,
  caption,
  threshold,
}: {
  data: { label: string; value: number; display: string }[];
  caption: string;
  threshold?: { value: number; label: string };
}) {
  const max = Math.max(...data.map((d) => d.value), threshold?.value ?? 0, 1);
  const w = 800;
  const h = 220;
  const colGap = 24;
  const colW = (w - colGap * (data.length + 1)) / data.length;
  const baseline = h - 34;
  const top = 16;
  const thresholdY = threshold ? baseline - ((baseline - top) * threshold.value) / max : null;

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-card p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={caption}
        className="h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((d, i) => {
          const barH = ((baseline - top) * d.value) / max;
          const x = colGap + i * (colW + colGap);
          const y = baseline - barH;
          const belowThreshold = threshold !== undefined && d.value <= threshold.value;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={colW}
                height={barH}
                rx={6}
                className={
                  belowThreshold
                    ? 'fill-accent'
                    : i === data.length - 1
                      ? 'fill-accent'
                      : 'fill-accent/50'
                }
              />
              <text
                x={x + colW / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-ink"
                style={{ fontSize: '11px', fontWeight: 600 }}
              >
                {d.display}
              </text>
              <text
                x={x + colW / 2}
                y={baseline + 18}
                textAnchor="middle"
                className="fill-ink-muted"
                style={{ fontSize: '11px' }}
              >
                {d.label}
              </text>
            </g>
          );
        })}
        {threshold && thresholdY !== null && (
          <g>
            <line
              x1={0}
              y1={thresholdY}
              x2={w}
              y2={thresholdY}
              className="stroke-accent"
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            <text x={w - 4} y={thresholdY - 6} textAnchor="end" className="fill-accent" style={{ fontSize: '10.5px', fontWeight: 600 }}>
              {threshold.label}
            </text>
          </g>
        )}
        <line x1={0} y1={baseline} x2={w} y2={baseline} className="stroke-line" strokeWidth={1} />
      </svg>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">{caption}</figcaption>
    </figure>
  );
}
