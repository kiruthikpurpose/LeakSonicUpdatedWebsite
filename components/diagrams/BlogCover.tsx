import { cn } from '@/lib/cn';
import type { BlogCategoryId } from '@/lib/blog-meta';

/**
 * Generated cover art for blog posts. There is no image-generation tool
 * available in this build environment (no Gemini / Nano Banana access), so
 * this is a hand-built SVG composition rather than a photograph - but it is
 * built with an atmospheric, editorial treatment (horizon, depth, soft bokeh,
 * a converging-perspective corridor) rather than a flat technical diagram, so
 * it reads closer to a moody industrial photo than a schematic. Distinct per
 * category and deterministically varied per slug. No raster asset to manage;
 * scales perfectly and loads instantly.
 *
 * IMAGE: once real or AI-generated photography is available, replace this
 * component's usage with a photographic hero per post - dark-toned, editorial,
 * aerial/industrial gas-infrastructure imagery in the black/red/white palette.
 * Drop files into /public/images/blog/ and swap <BlogCover> for <Image>.
 */

// Small deterministic hash so each slug gets a stable, varied composition.
function seed(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const CATEGORY_LABEL: Record<BlogCategoryId, string> = {
  fundamentals: 'FUNDAMENTALS',
  india: 'INDIA',
  technical: 'TECHNICAL',
  industry: 'INDUSTRY & MARKET',
};

/** Atmospheric backdrop shared by every cover: horizon, depth, soft bokeh. */
function Atmosphere({ id, s }: { id: string; s: number }) {
  const bokeh = Array.from({ length: 4 }).map((_, i) => ({
    cx: 60 + ((s >> (i * 5)) % 500),
    cy: 20 + ((s >> (i * 3)) % 90),
    r: 14 + ((s >> (i * 2)) % 22),
    op: 0.05 + ((s >> i) % 6) / 100,
  }));
  return (
    <>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141417" />
          <stop offset="100%" stopColor="#0A0A0B" />
        </linearGradient>
        <linearGradient id={`ground-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F0F11" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="72%" cy="24%" r="60%">
          <stop offset="0%" stopColor="#C41F2B" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C41F2B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`vignette-${id}`} cx="50%" cy="50%" r="75%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {/* Sky / ground split, evoking a horizon rather than a flat panel */}
      <rect width="600" height="176" fill={`url(#sky-${id})`} />
      <rect y="176" width="600" height="124" fill={`url(#ground-${id})`} />
      <rect width="600" height="300" fill={`url(#glow-${id})`} />

      {/* Soft out-of-focus light circles - a cheap, effective photographic cue */}
      {bokeh.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#FFFFFF" opacity={b.op} />
      ))}

      {/* Horizon line */}
      <line x1="0" y1="176" x2="600" y2="176" stroke="#26262B" strokeWidth="1" />

      {/* Converging right-of-way corridor, aerial-perspective cue */}
      <path d="M 220 300 L 300 176 L 300 176 L 380 300 Z" fill="#141417" opacity="0.6" />
      <line x1="220" y1="300" x2="300" y2="176" stroke="#26262B" strokeWidth="1" />
      <line x1="380" y1="300" x2="300" y2="176" stroke="#26262B" strokeWidth="1" />
    </>
  );
}

function FundamentalsMotif({ s }: { s: number }) {
  // Concentric pipeline cross-section: steel wall, coating, soil rings.
  const cx = 300;
  const cy = 150;
  const rings = [86, 70, 54, 40];
  return (
    <g>
      {[130, 100].map((r, i) => (
        <circle key={`o${i}`} cx={cx} cy={cy} r={r} fill="none" stroke="#26262B" strokeWidth="1" />
      ))}
      {rings.map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={i === 1 ? '#C41F2B' : '#33333A'}
          strokeWidth={i === 1 ? 2 : 1}
        />
      ))}
      {/* corrosion pit marker on the wall */}
      <circle
        cx={cx + 70 * Math.cos((s % 6) - 1)}
        cy={cy + 70 * Math.sin((s % 6) - 1)}
        r="5"
        fill="#C41F2B"
      />
      {/* radial tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + 90 * Math.cos(a)}
            y1={cy + 90 * Math.sin(a)}
            x2={cx + 98 * Math.cos(a)}
            y2={cy + 98 * Math.sin(a)}
            stroke="#33333A"
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

function IndiaMotif({ s }: { s: number }) {
  // Network graph: nodes joined by pipeline links, one hot node.
  const nodes = Array.from({ length: 7 }).map((_, i) => ({
    x: 120 + ((s >> (i * 2)) % 5) * 78 + (i % 2) * 24,
    y: 70 + ((s >> (i * 3)) % 4) * 48,
  }));
  const hot = s % nodes.length;
  return (
    <g>
      {nodes.map((n, i) =>
        i < nodes.length - 1 ? (
          <line
            key={`l${i}`}
            x1={n.x}
            y1={n.y}
            x2={nodes[i + 1]!.x}
            y2={nodes[i + 1]!.y}
            stroke="#33333A"
            strokeWidth="1.5"
          />
        ) : null,
      )}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={i === hot ? 8 : 5}
            fill={i === hot ? '#C41F2B' : '#141417'}
            stroke={i === hot ? '#C41F2B' : '#4A4A52'}
            strokeWidth="1.5"
          />
          {i === hot && (
            <circle
              cx={n.x}
              cy={n.y}
              r="15"
              fill="none"
              stroke="#C41F2B"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          )}
        </g>
      ))}
    </g>
  );
}

function TechnicalMotif({ s }: { s: number }) {
  // Stacked signal bands converging - multi-signal fusion.
  const rows = [90, 130, 170, 210];
  return (
    <g>
      {rows.map((y, i) => {
        const accent = i === 1;
        const amp = 8 + ((s >> (i * 4)) % 10);
        const pts = Array.from({ length: 24 })
          .map((_, k) => {
            const x = 90 + k * 18;
            const yy = y + Math.sin(k * 0.7 + i + (s % 5)) * amp;
            return `${x},${yy.toFixed(1)}`;
          })
          .join(' ');
        return (
          <polyline
            key={y}
            points={pts}
            fill="none"
            stroke={accent ? '#C41F2B' : '#3A3A42'}
            strokeWidth={accent ? 2 : 1.25}
          />
        );
      })}
      {/* fusion node */}
      <circle cx="510" cy="150" r="6" fill="#C41F2B" />
      <line
        x1="510"
        y1="90"
        x2="510"
        y2="210"
        stroke="#26262B"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </g>
  );
}

function IndustryMotif({ s }: { s: number }) {
  // Rising columns with a trend line - market/ecosystem feel, same precision
  // language as the other motifs (thin strokes, single accent).
  const bars = Array.from({ length: 9 }).map((_, i) => {
    const h = 30 + ((s >> i) % 7) * 14 + i * 9;
    return { x: 110 + i * 46, h };
  });
  const trend = bars.map((b) => `${b.x + 12},${(238 - b.h - 16).toFixed(0)}`).join(' ');
  return (
    <g>
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={238 - b.h}
          width="24"
          height={b.h}
          rx="4"
          fill={i === bars.length - 2 ? 'rgba(196,31,43,0.55)' : '#1D1D22'}
          stroke={i === bars.length - 2 ? '#C41F2B' : '#33333A'}
          strokeWidth="1"
        />
      ))}
      <polyline points={trend} fill="none" stroke="#C41F2B" strokeWidth="1.5" opacity="0.7" />
      <line x1="90" y1="238" x2="530" y2="238" stroke="#33333A" strokeWidth="1" />
    </g>
  );
}

function FundamentalsAltMotif({ s }: { s: number }) {
  // Horizontal strata band - coating / steel / soil layers - a structurally
  // different composition from the concentric cross-section, for variety.
  const bandY = 90 + ((s >> 3) % 20);
  return (
    <g>
      <rect x="80" y={bandY} width="440" height="16" fill="#1D1D22" stroke="#33333A" />
      <rect x="80" y={bandY + 16} width="440" height="10" fill="#C41F2B" opacity="0.55" />
      <rect x="80" y={bandY + 26} width="440" height="30" fill="#141417" stroke="#26262B" />
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1={80 + i * 44}
          y1={bandY - 14}
          x2={80 + i * 44}
          y2={bandY}
          stroke="#33333A"
          strokeWidth="1"
        />
      ))}
      <circle cx={140 + ((s >> 2) % 320)} cy={bandY + 21} r="4" fill="#C41F2B" />
    </g>
  );
}

function IndiaAltMotif({ s }: { s: number }) {
  // Skyline of authorised-area markers - a growth/build-out feel, distinct
  // from the node-graph composition.
  const bars = Array.from({ length: 11 }).map((_, i) => ({
    x: 96 + i * 38,
    h: 24 + ((s >> i) % 8) * 12,
  }));
  const peak = s % bars.length;
  return (
    <g>
      <line x1="90" y1="230" x2="510" y2="230" stroke="#33333A" strokeWidth="1" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={230 - b.h}
          width="18"
          height={b.h}
          fill={i === peak ? '#C41F2B' : '#1D1D22'}
          stroke={i === peak ? '#C41F2B' : '#33333A'}
        />
      ))}
    </g>
  );
}

function TechnicalAltMotif({ s }: { s: number }) {
  // Radar/scan sweep with concentric range rings - a distinct instrumentation
  // motif from the converging signal bands.
  const cx = 300;
  const cy = 160;
  const angle = ((s % 360) * Math.PI) / 180;
  return (
    <g>
      {[100, 76, 50].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#26262B" strokeWidth="1" />
      ))}
      <line
        x1={cx}
        y1={cy}
        x2={cx + 100 * Math.cos(angle)}
        y2={cy + 100 * Math.sin(angle)}
        stroke="#C41F2B"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <circle
        cx={cx + 60 * Math.cos(angle - 0.6)}
        cy={cy + 60 * Math.sin(angle - 0.6)}
        r="4"
        fill="#C41F2B"
      />
    </g>
  );
}

function IndustryAltMotif({ s }: { s: number }) {
  // Node-and-edge ecosystem map - distinct from the bar-chart composition,
  // reads as "market/network" rather than "growth over time."
  const nodes = Array.from({ length: 6 }).map((_, i) => ({
    x: 140 + ((s >> (i * 2)) % 5) * 68,
    y: 90 + ((s >> (i * 3)) % 3) * 55,
  }));
  return (
    <g>
      {nodes.map((n, i) =>
        i > 0 ? (
          <line
            key={`e${i}`}
            x1={nodes[0]!.x}
            y1={nodes[0]!.y}
            x2={n.x}
            y2={n.y}
            stroke="#33333A"
            strokeWidth="1"
          />
        ) : null,
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 9 : 5}
          fill={i === 0 ? '#C41F2B' : '#141417'}
          stroke={i === 0 ? '#C41F2B' : '#4A4A52'}
          strokeWidth="1.5"
        />
      ))}
    </g>
  );
}

export function BlogCover({
  slug,
  category,
  className,
}: {
  slug: string;
  category: BlogCategoryId;
  className?: string;
}) {
  const s = seed(slug);
  const id = `${s % 9999}`;
  return (
    <div className={cn('relative aspect-[16/9] w-full overflow-hidden bg-surface', className)}>
      <svg
        viewBox="0 0 600 300"
        className="h-full w-full"
        role="img"
        aria-label={`${CATEGORY_LABEL[category]} article cover`}
      >
        <Atmosphere id={id} s={s} />

        {/* Two structurally distinct compositions per category, chosen
            deterministically by slug so variety doesn't come only from
            per-slug parameter tweaks - eight looks total, not four. */}
        {category === 'fundamentals' &&
          (s % 2 === 0 ? <FundamentalsMotif s={s} /> : <FundamentalsAltMotif s={s} />)}
        {category === 'india' && (s % 2 === 0 ? <IndiaMotif s={s} /> : <IndiaAltMotif s={s} />)}
        {category === 'technical' &&
          (s % 2 === 0 ? <TechnicalMotif s={s} /> : <TechnicalAltMotif s={s} />)}
        {category === 'industry' &&
          (s % 2 === 0 ? <IndustryMotif s={s} /> : <IndustryAltMotif s={s} />)}

        <rect width="600" height="300" fill={`url(#vignette-${id})`} />

        {/* brand corner marks */}
        <line x1="24" y1="24" x2="44" y2="24" stroke="#C41F2B" strokeWidth="2" />
        <line x1="24" y1="24" x2="24" y2="44" stroke="#C41F2B" strokeWidth="2" />
        <text x="24" y="284" className="fill-ink-faint font-sans" fontSize="11" letterSpacing="2">
          {CATEGORY_LABEL[category]}
        </text>
        <text
          x="576"
          y="284"
          textAnchor="end"
          className="fill-ink-faint font-sans"
          fontSize="11"
          letterSpacing="1"
        >
          LeakSonic · Sentrix
        </text>
      </svg>
    </div>
  );
}
