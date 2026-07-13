import type { Config } from 'tailwindcss';

// Every color is a CSS custom property (space-separated RGB triplet) defined
// in globals.css, so a single `.light` class toggle on <html> repaints the
// entire site - every existing bg-base / text-ink-muted / border-line / etc.
// usage - with no per-component changes and full opacity-modifier support
// (bg-accent/10 etc. keep working via the <alpha-value> placeholder).
function withOpacity(cssVar: string) {
  return `rgb(var(${cssVar}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: withOpacity('--color-base'),
        surface: withOpacity('--color-surface'),
        card: withOpacity('--color-card'),
        elevated: withOpacity('--color-elevated'),
        line: withOpacity('--color-line'),
        'line-strong': withOpacity('--color-line-strong'),
        // Accent — the exact red from the LeakSonic mark, unchanged between
        // themes (works as well on white as on near-black)
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          hover: withOpacity('--color-accent-hover'),
          muted: withOpacity('--color-accent-muted'),
          dim: withOpacity('--color-accent-dim'),
        },
        ink: {
          DEFAULT: withOpacity('--color-ink'),
          body: withOpacity('--color-ink-body'),
          secondary: withOpacity('--color-ink-secondary'),
          muted: withOpacity('--color-ink-muted'),
          faint: withOpacity('--color-ink-faint'),
        },
      },
      fontFamily: {
        // Figtree only, sitewide — including anywhere `font-mono` is still
        // referenced in existing markup, so no monospace ever renders.
        sans: [
          'var(--font-figtree)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-figtree)',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        // Restrained enterprise scale
        'display-lg': [
          'clamp(2.75rem, 6vw, 4.5rem)',
          { lineHeight: '1.04', letterSpacing: '-0.03em' },
        ],
        display: [
          'clamp(2.25rem, 4.5vw, 3.5rem)',
          { lineHeight: '1.06', letterSpacing: '-0.025em' },
        ],
        h1: ['clamp(1.875rem, 3.5vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
        h3: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        // Fluid width: at most ~3% margin per side on any viewport, capped
        // for readability on ultra-wide monitors. Fixes large dead margins
        // that a flat pixel cap leaves on wide screens.
        content: 'min(94vw, 1440px)',
        prose: '68ch',
      },
      spacing: {
        // Tightened twice now - 7rem -> 4.25rem -> 3.25rem. Adjacent sections
        // each contribute this as both bottom and top padding, so the visual
        // gap between two stacked sections is ~2x this value; enterprise
        // sites (Stripe, Linear, Vercel) run noticeably denser than this.
        section: '3.25rem',
      },
      borderRadius: {
        // Squircle-leaning scale — larger, smoother radii read as continuous
        // curvature (Apple-style) rather than sharp rounded rectangles.
        card: '20px',
        squircle: '28px',
        'squircle-lg': '36px',
        tile: '22%',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
