/** Classic 5x5 likelihood x consequence risk matrix, in the shape used
 * across API 580-style risk-based inspection methodology. Likelihood and
 * consequence are each 1-5; the matching cell is highlighted. */
export function RiskMatrix({
  likelihood,
  consequence,
}: {
  likelihood: number;
  consequence: number;
}) {
  const cell = 62;
  const gap = 4;
  const gridSize = cell * 5 + gap * 4;
  const originX = 56;
  const originY = 10;

  function bandFor(l: number, c: number): 'low' | 'medium' | 'high' | 'critical' {
    const r = l + c;
    if (r <= 4) return 'low';
    if (r <= 6) return 'medium';
    if (r <= 8) return 'high';
    return 'critical';
  }

  const bandFill: Record<string, string> = {
    low: 'fill-ink-faint/20',
    medium: 'fill-accent/25',
    high: 'fill-accent/50',
    critical: 'fill-accent/80',
  };

  return (
    <figure className="overflow-hidden rounded-card border border-line bg-card p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${originX + gridSize + 20} ${originY + gridSize + 40}`}
        role="img"
        aria-label={`Risk matrix position: likelihood ${likelihood}, consequence ${consequence}`}
        className="h-auto w-full max-w-sm mx-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* y-axis label */}
        <text
          x={14}
          y={originY + gridSize / 2}
          textAnchor="middle"
          className="fill-ink-muted"
          style={{ fontSize: '10px' }}
          transform={`rotate(-90 14 ${originY + gridSize / 2})`}
        >
          LIKELIHOOD
        </text>

        {[5, 4, 3, 2, 1].map((lRow, rowIdx) => (
          <g key={lRow}>
            <text
              x={originX - 10}
              y={originY + rowIdx * (cell + gap) + cell / 2 + 4}
              textAnchor="end"
              className="fill-ink-faint"
              style={{ fontSize: '10px' }}
            >
              {lRow}
            </text>
            {[1, 2, 3, 4, 5].map((cCol, colIdx) => {
              const isActive = lRow === likelihood && cCol === consequence;
              const band = bandFor(lRow, cCol);
              const x = originX + colIdx * (cell + gap);
              const y = originY + rowIdx * (cell + gap);
              return (
                <g key={cCol}>
                  <rect
                    x={x}
                    y={y}
                    width={cell}
                    height={cell}
                    rx={6}
                    className={bandFill[band]}
                  />
                  {isActive && (
                    <rect
                      x={x + 2}
                      y={y + 2}
                      width={cell - 4}
                      height={cell - 4}
                      rx={5}
                      className="fill-none stroke-accent"
                      strokeWidth={3}
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}

        {[1, 2, 3, 4, 5].map((cCol, colIdx) => (
          <text
            key={cCol}
            x={originX + colIdx * (cell + gap) + cell / 2}
            y={originY + gridSize + 16}
            textAnchor="middle"
            className="fill-ink-faint"
            style={{ fontSize: '10px' }}
          >
            {cCol}
          </text>
        ))}
        <text
          x={originX + gridSize / 2}
          y={originY + gridSize + 34}
          textAnchor="middle"
          className="fill-ink-muted"
          style={{ fontSize: '10px' }}
        >
          CONSEQUENCE
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-ink-faint">
        Your asset’s position on a standard likelihood x consequence risk matrix (API 580-style).
        Highlighted cell = likelihood {likelihood}, consequence {consequence}.
      </figcaption>
    </figure>
  );
}
