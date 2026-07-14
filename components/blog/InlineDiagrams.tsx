/**
 * Lightweight inline diagrams for use directly inside MDX blog posts, where a
 * simple visual resolves a concept faster than another paragraph. Static SVG
 * (no motion/client JS needed for a single illustrative diagram embedded in
 * long-form text), same visual language as the rest of the site (thin lines,
 * one accent, blueprint corner marks).
 */

export function LeakDetectionSpectrum() {
  const methods = [
    { label: 'Walking survey', sensitivity: 92, coverage: 8 },
    { label: 'Vehicle-mounted', sensitivity: 70, coverage: 30 },
    { label: 'Fixed sensors', sensitivity: 95, coverage: 3 },
    { label: 'Aerial / drone', sensitivity: 55, coverage: 65 },
    { label: 'Satellite', sensitivity: 25, coverage: 100 },
  ];
  return (
    <figure className="mt-8 overflow-hidden rounded-card border border-line bg-card p-6 sm:p-8">
      <svg viewBox="0 0 600 240" className="w-full" role="img" aria-label="Sensitivity versus coverage across gas leak detection methods, from precise low-coverage walking surveys to wide low-sensitivity satellite monitoring">
        <line x1="60" y1="20" x2="60" y2="200" stroke="#33333A" strokeWidth="1" />
        <line x1="60" y1="200" x2="580" y2="200" stroke="#33333A" strokeWidth="1" />
        <text x="30" y="20" className="fill-ink-faint font-sans" fontSize="10">High sensitivity</text>
        <text x="30" y="205" className="fill-ink-faint font-sans" fontSize="10">Low</text>
        <text x="500" y="222" className="fill-ink-faint font-sans" fontSize="10">Wider coverage →</text>
        {methods.map((m, i) => {
          const x = 100 + (m.coverage / 100) * 440;
          const y = 200 - (m.sensitivity / 100) * 170;
          return (
            <g key={m.label}>
              <circle cx={x} cy={y} r={i === 3 ? 7 : 5} fill={i === 3 ? '#C41F2B' : '#1D1D22'} stroke={i === 3 ? '#C41F2B' : '#4A4A52'} strokeWidth="1.5" />
              <text x={x} y={y - 12} textAnchor="middle" className="fill-ink font-sans" fontSize="10.5" fontWeight="600">
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-center text-xs text-ink-faint">
        No method wins on sensitivity and coverage at once - which is why serious programs layer
        several methods rather than picking one.
      </figcaption>
    </figure>
  );
}

export function PiggingFlow() {
  return (
    <figure className="mt-8 overflow-hidden rounded-card border border-line bg-card p-6 sm:p-8">
      <svg viewBox="0 0 600 140" className="w-full" role="img" aria-label="A pig launcher pushes the pig through the pipeline using product flow, to a receiver downstream">
        <rect x="40" y="55" width="70" height="30" rx="4" fill="#1D1D22" stroke="#4A4A52" />
        <text x="75" y="105" textAnchor="middle" className="fill-ink font-sans" fontSize="11" fontWeight="600">Launcher</text>
        <line x1="110" y1="70" x2="490" y2="70" stroke="#33333A" strokeWidth="6" strokeLinecap="round" />
        <circle cx="230" cy="70" r="14" fill="#C41F2B" />
        <text x="230" y="40" textAnchor="middle" className="fill-accent font-sans" fontSize="10.5" fontWeight="600">Pig, pushed by flow</text>
        <path d="M 260 70 L 280 64 M 260 70 L 280 76" stroke="#F5F5F4" strokeWidth="1.5" fill="none" />
        <rect x="490" y="55" width="70" height="30" rx="4" fill="#1D1D22" stroke="#4A4A52" />
        <text x="525" y="105" textAnchor="middle" className="fill-ink font-sans" fontSize="11" fontWeight="600">Receiver</text>
      </svg>
      <figcaption className="mt-4 text-center text-xs text-ink-faint">
        The pipeline provides the propulsion - no motor, no cable - which is what makes pigging one
        of the most economical maintenance techniques in the industry.
      </figcaption>
    </figure>
  );
}

export function DroneMarketLayers() {
  const layers = [
    { label: 'Hardware & sensors', desc: 'Airframe, cameras, gas sensors - increasingly commoditised' },
    { label: 'Flight & imagery services', desc: 'Pilots, flight ops, raw data delivery' },
    { label: 'Data & decision intelligence', desc: 'Turns raw evidence into a prioritised decision' },
  ];
  return (
    <figure className="mt-8 overflow-hidden rounded-card border border-line bg-card p-6 sm:p-8">
      <div className="space-y-2">
        {layers.map((l, i) => (
          <div
            key={l.label}
            className={`flex items-center gap-4 rounded-tile border p-4 ${
              i === 2 ? 'border-accent/40 bg-accent/[0.06]' : 'border-line bg-surface'
            }`}
          >
            <span className={`font-sans text-xs font-semibold ${i === 2 ? 'text-accent' : 'text-ink-faint'}`}>
              {i + 1}
            </span>
            <div>
              <div className={`text-sm font-semibold ${i === 2 ? 'text-accent' : 'text-ink'}`}>{l.label}</div>
              <div className="text-xs text-ink-muted">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-center text-xs text-ink-faint">
        Most of the commercial value increasingly sits in the third layer, not the first two.
      </figcaption>
    </figure>
  );
}
