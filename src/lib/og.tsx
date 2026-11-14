import { ImageResponse } from 'next/og';

import { brand } from '@/lib/brand';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Fixed colours: a share image cannot read the CSS tokens. They mirror the
// `night` mode in src/styles/tokens.css, so a link looks like the site.
const COLORS = {
  bg: '#0a0a0a',
  card: '#141414',
  ink: '#e6e6e6',
  soft: '#9e9e9e',
  faint: '#6c6c6c',
  line: '#262626',
  accent: '#4ade80',
};

/** One hue per kind of page, the same idea as the section marks. */
const HUES = {
  home: '#4ade80',
  about: '#f472b6',
  work: '#60a5fa',
  notes: '#fb923c',
  note: '#fb923c',
  uses: '#a78bfa',
  homelab: '#22d3ee',
  shelf: '#f87171',
  colophon: '#facc15',
} as const;

export type ShareKind = keyof typeof HUES;

interface ShareImageInput {
  kind: ShareKind;
  /** Small line above the title, for example "note" or "about". */
  eyebrow: string;
  title: string;
  /** Bottom line, for example a date and reading time. */
  meta?: string;
}

// Long titles get smaller type so they stay inside three lines.
function titleSize(title: string) {
  if (title.length > 70) return 56;
  if (title.length > 44) return 68;
  if (title.length > 24) return 82;
  return 96;
}

/**
 * The share image for every page: wordmark, a coloured mark for the kind of
 * page, the title and one line of meta. Route files call this from their
 * `opengraph-image.tsx`, so each page gets its own picture.
 */
export function renderShareImage({
  kind,
  eyebrow,
  title,
  meta,
}: ShareImageInput) {
  const hue = HUES[kind];
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: COLORS.bg,
        color: COLORS.ink,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 700 }}>
          {brand.wordmark}
          <span style={{ color: COLORS.accent }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 26,
            color: COLORS.soft,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: hue,
            }}
          />
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: titleSize(title),
          fontWeight: 700,
          letterSpacing: -2.5,
          lineHeight: 1.06,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: `2px solid ${COLORS.line}`,
          fontSize: 26,
          color: COLORS.soft,
        }}
      >
        <div style={{ display: 'flex' }}>{meta ?? brand.role}</div>
        <div style={{ display: 'flex', color: COLORS.faint }}>{brand.name}</div>
      </div>
    </div>,
    OG_SIZE,
  );
}
