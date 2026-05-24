import { ImageResponse } from 'next/og';
import { OG_PAGE_VISUALS, type OgPageKey } from '@/lib/og-pages';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function ogImageAlt(page: OgPageKey): string {
  return OG_PAGE_VISUALS[page].alt;
}

export function createOgImage(page: OgPageKey): ImageResponse {
  const { headline, subheadline, cta, badge, accent } = OG_PAGE_VISUALS[page];
  const lines = headline.split('\n');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(145deg, #faf7f2 0%, #f0ebe3 48%, #e8e0d6 100%)',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
          color: '#0e1116',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              textTransform: 'lowercase',
            }}
          >
            tasteiq
          </div>
          {badge ? (
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                padding: '10px 20px',
                borderRadius: 999,
                background: 'rgba(14, 17, 22, 0.06)',
                color: '#3d454f',
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: 820 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: lines.length > 1 ? 58 : 64,
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.35,
                color: '#4a5560',
                maxWidth: 720,
              }}
            >
              {subheadline}
            </div>
          </div>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${accent}33, ${accent}11 70%, transparent)`,
              border: `3px solid ${accent}44`,
              flexShrink: 0,
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 26,
              fontWeight: 600,
              color: '#fff',
              background: accent,
              padding: '18px 36px',
              borderRadius: 14,
              boxShadow: '0 8px 24px rgba(14, 17, 22, 0.12)',
            }}
          >
            {cta}
          </div>
          <div style={{ fontSize: 22, color: '#6b7280', fontWeight: 500 }}>tasteiq.in</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
