import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';
import type { CSSProperties, ReactNode } from 'react';

import { brand } from '@/lib/brand';
import { contourArt, dotsArt, halftoneArt } from '@/lib/og-art';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Styles of the share image. Compare them on /og-lab (dev only), then set
 * the winner in OG_STYLE and delete the others.
 */
export const OG_STYLES = [
  'plain',
  'dots',
  'contour',
  'halftone',
  'glow',
  'poster',
  'terminal',
  'stack',
  'cover',
  'split',
] as const;
export type OgStyle = (typeof OG_STYLES)[number];

/** The style every page uses. */
export const OG_STYLE: OgStyle = 'dots';

/**
 * A note with a cover picture uses this style instead, so its link shows
 * the picture. `null`: notes use OG_STYLE like every page.
 */
export const OG_NOTE_STYLE: OgStyle | null = 'cover';

/** Styles that draw the cover picture. Without one they fall back. */
const NEEDS_COVER = new Set<OgStyle>(['cover', 'split']);

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

export interface ShareImageInput {
  kind: ShareKind;
  /** Small line above the title, for example "note" or "about". */
  eyebrow: string;
  title: string;
  /** Bottom line, for example a date and reading time. */
  meta?: string;
  /** A note's cover: a /public path or a full URL. */
  cover?: string;
}

// Geist, copied from the `geist` package: the default face of the image
// renderer has no tight heading cut. Read at build time (the images are
// static), so the files never ship to a visitor.
const font = (file: string) =>
  readFile(join(process.cwd(), 'src/assets/og', file));
let fonts: ReturnType<typeof loadFonts> | undefined;
const loadFonts = async () => [
  {
    name: 'Geist',
    data: await font('Geist-Regular.ttf'),
    weight: 400 as const,
  },
  {
    name: 'Geist',
    data: await font('Geist-SemiBold.ttf'),
    weight: 600 as const,
  },
  {
    name: 'Geist Mono',
    data: await font('GeistMono-Medium.ttf'),
    weight: 500 as const,
  },
];

// Long titles get smaller type so they stay inside three lines.
function titleSize(title: string, scale = 1) {
  const base =
    title.length > 70
      ? 56
      : title.length > 44
        ? 68
        : title.length > 24
          ? 82
          : 96;
  return Math.round(base * scale);
}

interface Parts extends ShareImageInput {
  hue: string;
  /** The cover as a data URL, once loaded. */
  picture?: string;
}

/**
 * The cover as a data URL, or undefined when it cannot be read. Loaded here
 * and not by the renderer, so a slow or missing picture never fails a build.
 */
async function loadCover(src: string) {
  try {
    const data = src.startsWith('/')
      ? await readFile(join(process.cwd(), 'public', src))
      : Buffer.from(
          await (
            await fetch(src, { signal: AbortSignal.timeout(8000) })
          ).arrayBuffer(),
        );
    // The renderer reads PNG and JPEG; anything else falls back.
    const type =
      data[0] === 0x89 ? 'image/png' : data[0] === 0xff ? 'image/jpeg' : null;
    return type ? `data:${type};base64,${data.toString('base64')}` : undefined;
  } catch {
    return undefined;
  }
}

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const fill: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: 1200,
  height: 630,
};

function Wordmark({ dot, color }: { dot: string; color?: string }) {
  return (
    <div style={{ display: 'flex', fontSize: 36, fontWeight: 600, color }}>
      {brand.wordmark}
      <span style={{ color: dot }}>.</span>
    </div>
  );
}

function Eyebrow({
  hue,
  text,
  color,
}: {
  hue: string;
  text: string;
  color?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 24,
        fontFamily: 'Geist Mono',
        color: color ?? COLORS.soft,
      }}
    >
      <div
        style={{ width: 16, height: 16, borderRadius: 8, background: hue }}
      />
      {text}
    </div>
  );
}

function Title({
  text,
  scale,
  color,
  max = 1000,
}: {
  text: string;
  scale?: number;
  color?: string;
  max?: number;
}) {
  return (
    <div
      style={{
        display: 'flex',
        fontSize: titleSize(text, scale),
        fontWeight: 600,
        letterSpacing: -2.5,
        lineHeight: 1.04,
        maxWidth: max,
        color,
      }}
    >
      {text}
    </div>
  );
}

/** Wordmark and eyebrow, title, meta line: the frame most styles share. */
function Frame({
  p,
  children,
  rule = true,
}: {
  p: Parts;
  children?: ReactNode;
  rule?: boolean;
}) {
  return (
    <div
      style={{
        ...fill,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
      }}
    >
      <div style={row}>
        <Wordmark dot={COLORS.accent} />
        <Eyebrow hue={p.hue} text={p.eyebrow} />
      </div>
      {children ?? <Title text={p.title} max={900} />}
      <div
        style={{
          ...row,
          paddingTop: 28,
          borderTop: rule ? `2px solid ${COLORS.line}` : 'none',
          fontSize: 26,
          color: COLORS.soft,
        }}
      >
        <div style={{ display: 'flex' }}>{p.meta ?? brand.role}</div>
        <div style={{ display: 'flex', color: COLORS.faint }}>{brand.name}</div>
      </div>
    </div>
  );
}

const Art = ({ src, style }: { src: string; style?: CSSProperties }) => (
  // oxlint-disable-next-line nextjs/no-img-element -- the image renderer needs a plain img
  <img
    alt=""
    src={src}
    width={1200}
    height={630}
    style={{ ...fill, ...style }}
  />
);

/** Fades art out to the left, so the title stays on calm ground. */
const Fade = ({ from = 'left' }: { from?: string }) => (
  <div
    style={{
      ...fill,
      background: `linear-gradient(to ${from === 'left' ? 'right' : 'top'}, ${COLORS.bg} 30%, rgba(10,10,10,0.2) 75%, rgba(10,10,10,0))`,
    }}
  />
);

const Picture = ({
  src,
  width,
  height,
  style,
}: {
  src: string;
  width: number;
  height: number;
  style?: CSSProperties;
}) => (
  // oxlint-disable-next-line nextjs/no-img-element -- the image renderer needs a plain img
  <img
    alt=""
    src={src}
    width={width}
    height={height}
    style={{ objectFit: 'cover', width, height, ...style }}
  />
);

const STYLES: Record<OgStyle, (p: Parts) => ReactNode> = {
  cover: (p) => (
    <>
      <Picture
        src={p.picture ?? ''}
        width={1200}
        height={630}
        style={{ position: 'absolute', inset: 0 }}
      />
      <div
        style={{
          ...fill,
          background:
            'linear-gradient(to right, rgba(10,10,10,0.94) 30%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.3))',
        }}
      />
      <Frame p={p} rule={false} />
    </>
  ),

  split: (p) => (
    <>
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 690,
          width: 470,
          height: 550,
          display: 'flex',
          overflow: 'hidden',
          borderRadius: 24,
          border: `2px solid ${COLORS.line}`,
        }}
      >
        <Picture src={p.picture ?? ''} width={470} height={550} />
      </div>
      <div
        style={{
          ...fill,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          width: 720,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Wordmark dot={COLORS.accent} />
          <Eyebrow hue={p.hue} text={p.eyebrow} />
        </div>
        <Title text={p.title} scale={0.82} max={580} />
        <div style={{ display: 'flex', fontSize: 24, color: COLORS.soft }}>
          {p.meta ?? brand.role}
        </div>
      </div>
    </>
  ),

  plain: (p) => <Frame p={p} />,

  dots: (p) => (
    <>
      <Art src={dotsArt(p.hue, p.title)} />
      <Fade />
      <Frame p={p} rule={false} />
    </>
  ),

  contour: (p) => (
    <>
      <Art src={contourArt(p.hue, p.title)} style={{ opacity: 0.85 }} />
      <Fade />
      <Frame p={p} rule={false} />
    </>
  ),

  halftone: (p) => (
    <>
      <Art src={halftoneArt(p.hue)} style={{ opacity: 0.9 }} />
      <Fade />
      <Frame p={p} rule={false} />
    </>
  ),

  glow: (p) => (
    <>
      <div
        style={{
          ...fill,
          background: `radial-gradient(60% 80% at 90% 10%, ${p.hue}55, transparent 70%), radial-gradient(50% 70% at 70% 110%, ${COLORS.accent}33, transparent 70%)`,
        }}
      />
      <Frame p={p} rule={false} />
    </>
  ),

  poster: (p) => (
    <div
      style={{
        ...fill,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        background: p.hue,
        color: COLORS.bg,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -160,
          bottom: -260,
          width: 620,
          height: 620,
          borderRadius: 310,
          border: `56px solid ${COLORS.bg}`,
          opacity: 0.12,
        }}
      />
      <div style={row}>
        <Wordmark dot={COLORS.bg} color={COLORS.bg} />
        <div
          style={{ display: 'flex', fontSize: 24, fontFamily: 'Geist Mono' }}
        >
          {p.eyebrow}
        </div>
      </div>
      <Title text={p.title} scale={1.12} color={COLORS.bg} max={1040} />
      <div style={{ ...row, fontSize: 26 }}>
        <div style={{ display: 'flex' }}>{p.meta ?? brand.role}</div>
        <div style={{ display: 'flex' }}>{brand.name}</div>
      </div>
    </div>
  ),

  terminal: (p) => (
    <div style={{ ...fill, display: 'flex', padding: 56 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderRadius: 24,
          border: `2px solid ${COLORS.line}`,
          background: COLORS.card,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '20px 28px',
            borderBottom: `2px solid ${COLORS.line}`,
          }}
        >
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div
              key={c}
              style={{ width: 16, height: 16, borderRadius: 8, background: c }}
            />
          ))}
          <div
            style={{
              display: 'flex',
              marginLeft: 18,
              fontFamily: 'Geist Mono',
              fontSize: 20,
              color: COLORS.faint,
            }}
          >
            {`${brand.wordmark} · zsh`}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: '36px 44px 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Geist Mono',
              fontSize: 26,
              color: COLORS.soft,
            }}
          >
            <span style={{ color: p.hue }}>~</span>
            <span style={{ margin: '0 14px', color: COLORS.faint }}>$</span>
            {`open ${p.eyebrow}`}
            <div
              style={{
                width: 14,
                height: 30,
                marginLeft: 10,
                background: p.hue,
              }}
            />
          </div>
          <Title text={p.title} scale={0.92} max={940} />
          <div
            style={{
              ...row,
              fontFamily: 'Geist Mono',
              fontSize: 22,
              color: COLORS.faint,
            }}
          >
            <div style={{ display: 'flex' }}>{p.meta ?? brand.role}</div>
            <div style={{ display: 'flex', color: COLORS.accent }}>
              {`${brand.wordmark}.`}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  stack: (p) => (
    <div
      style={{
        ...fill,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${p.hue}40, ${COLORS.bg} 60%)`,
      }}
    >
      {[-5, 3].map((turn) => (
        <div
          key={turn}
          style={{
            position: 'absolute',
            width: 1000,
            height: 470,
            borderRadius: 28,
            background: COLORS.card,
            border: `2px solid ${COLORS.line}`,
            transform: `rotate(${turn}deg)`,
            opacity: 0.7,
          }}
        />
      ))}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 1000,
          height: 470,
          padding: 52,
          borderRadius: 28,
          background: COLORS.bg,
          border: `2px solid ${COLORS.line}`,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div style={row}>
          <Wordmark dot={COLORS.accent} />
          <Eyebrow hue={p.hue} text={p.eyebrow} />
        </div>
        <Title text={p.title} scale={0.86} max={880} />
        <div style={{ ...row, fontSize: 22, color: COLORS.soft }}>
          <div style={{ display: 'flex' }}>{p.meta ?? brand.role}</div>
          <div style={{ display: 'flex', color: COLORS.faint }}>
            {brand.name}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * The share image for every page. Route files call this from their
 * `opengraph-image.tsx`, so each page gets its own picture.
 */
export async function renderShareImage(
  input: ShareImageInput,
  style: OgStyle = OG_STYLE,
) {
  fonts ??= loadFonts();
  const picture =
    NEEDS_COVER.has(style) && input.cover
      ? await loadCover(input.cover)
      : undefined;
  // A cover style with no picture to draw uses the site style.
  if (NEEDS_COVER.has(style) && !picture) {
    style = OG_STYLE;
  }
  const parts = { ...input, hue: HUES[input.kind], picture };
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: 'Geist',
      }}
    >
      {STYLES[style](parts)}
    </div>,
    { ...OG_SIZE, fonts: await fonts },
  );
}
