import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';

/**
 * Branded OG image template, rendered per page from a title query param.
 * Dark base, red accent rule, monospace eyebrow - consistent with the site.
 * e.g. /api/og?title=The%20Sentrix%20platform&eyebrow=Platform
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? SITE.name).slice(0, 120);
  const eyebrow = (searchParams.get('eyebrow') ?? 'Pipeline integrity intelligence').slice(0, 60);

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0A0A0B',
        padding: '72px',
        backgroundImage:
          'radial-gradient(60% 60% at 80% 20%, rgba(196,31,43,0.18) 0%, transparent 60%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#C41F2B',
            borderRadius: '4px',
          }}
        />
        <div
          style={{
            color: '#8A8A90',
            fontSize: '24px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ color: '#FFFFFF', fontSize: '30px', fontWeight: 700 }}>Leak</div>
          <div style={{ color: '#C41F2B', fontSize: '30px', fontWeight: 700, marginLeft: '-10px' }}>
            Sonic
          </div>
        </div>
        <div style={{ color: '#5A5A61', fontSize: '22px' }}>
          Sentrix · pipeline inspection decision intelligence
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
