// Draws share image designs and share video frames for every page, for the
// review page claude-lab/og-preview.html. This is a design tool: the live
// images come from src/lib/og.tsx. When a design is chosen, port it there.
//
// Run from the project root:
//   node scripts/make-og-preview.mjs <images-dir> <frames-dir>
// Then, for each page, join its frames (see frames.txt in each folder).

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og.js';

const SIZE = { width: 1200, height: 630 };

const DARK = {
  bg: '#0a0a0a',
  card: '#141414',
  ink: '#e6e6e6',
  soft: '#9e9e9e',
  faint: '#6c6c6c',
  line: '#262626',
  accent: '#4ade80',
};
const WARM = {
  bg: '#faf6f0',
  card: '#fffdf9',
  ink: '#241f1a',
  soft: '#554d45',
  faint: '#8f867b',
  line: '#e8dfd2',
  accent: '#127036',
};

const PAGES = [
  {
    key: 'home',
    path: '',
    eyebrow: 'home',
    hue: '#4ade80',
    shape: 'circle',
    title:
      'Full-stack engineer. I build web products from the first commit to the server.',
    meta: 'Full-stack engineer and team lead',
  },
  {
    key: 'about',
    path: 'about',
    eyebrow: 'about',
    hue: '#f472b6',
    shape: 'half',
    title: 'Six years, one company, every layer of the product.',
    meta: 'Intern to team lead at ReCheck',
  },
  {
    key: 'work',
    path: 'work',
    eyebrow: 'work',
    hue: '#60a5fa',
    shape: 'square',
    title: 'Small tools that do one job well.',
    meta: 'Open source. No tracking.',
  },
  {
    key: 'notes',
    path: 'notes',
    eyebrow: 'notes',
    hue: '#fb923c',
    shape: 'diamond',
    title: 'Notes on things I build, fix and run.',
    meta: 'One idea for each post.',
  },
  {
    key: 'uses',
    path: 'uses',
    eyebrow: 'uses',
    hue: '#a78bfa',
    shape: 'triangle',
    title: 'What I use every day.',
    meta: 'Hardware and software on my desk.',
  },
  {
    key: 'homelab',
    path: 'homelab',
    eyebrow: 'homelab',
    hue: '#22d3ee',
    shape: 'rack',
    title: 'A small homelab that I run like production.',
    meta: 'A hobby, not my job.',
  },
  {
    key: 'note',
    path: 'notes/third-time-is-the-charm',
    eyebrow: 'note',
    hue: '#fb923c',
    shape: 'diamond',
    title: 'Third time is the charm',
    meta: '11 Sep 2026 · 5 min read',
  },
  {
    key: 'note-long',
    path: 'notes/a-long-title',
    eyebrow: 'note',
    hue: '#fb923c',
    shape: 'diamond',
    title:
      'A screenshot extension with zero dependencies: what I had to write myself',
    meta: 'A long title, to test the fit',
  },
];

const el = (type, style, children) => ({ type, props: { style, children } });
const row = (style, children) =>
  el('div', { display: 'flex', ...style }, children);

function titleSize(title, scale = 1) {
  const size =
    title.length > 70
      ? 56
      : title.length > 44
        ? 68
        : title.length > 24
          ? 82
          : 96;
  return Math.round(size * scale);
}

const wordmark = (c, size = 36) =>
  row({ fontSize: size, fontWeight: 700 }, [
    'byurhan',
    el('span', { color: c.accent }, '.'),
  ]);

/** The mark of a page: the same shapes as the section marks on the site. */
function mark(page, size) {
  const base = {
    display: 'flex',
    width: size,
    height: size,
    background: page.hue,
  };
  if (page.shape === 'circle')
    return el('div', { ...base, borderRadius: size / 2 });
  if (page.shape === 'square')
    return el('div', { ...base, borderRadius: size * 0.22 });
  if (page.shape === 'half') {
    return el('div', {
      ...base,
      height: size / 2,
      borderRadius: `${size}px ${size}px 0 0`,
    });
  }
  if (page.shape === 'diamond') {
    return el('div', {
      ...base,
      borderRadius: size * 0.16,
      transform: 'rotate(45deg) scale(0.74)',
    });
  }
  if (page.shape === 'triangle') {
    return el('div', {
      display: 'flex',
      width: 0,
      height: 0,
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${page.hue}`,
    });
  }
  // rack: three bars
  return el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: size,
      height: size,
    },
    [1, 0.6, 0.3].map((opacity) =>
      el('div', {
        display: 'flex',
        height: size * 0.24,
        borderRadius: size * 0.08,
        background: page.hue,
        opacity,
      }),
    ),
  );
}

const frameBox = (c, children, extra = {}) =>
  el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      background: c.bg,
      color: c.ink,
      ...extra,
    },
    children,
  );

// A: the live design. Wordmark, small mark, title, one line.
function designA(page, c = DARK) {
  return frameBox(
    c,
    [
      row({ alignItems: 'center', justifyContent: 'space-between' }, [
        wordmark(c),
        row({ alignItems: 'center', gap: 14, fontSize: 26, color: c.soft }, [
          el('div', {
            display: 'flex',
            width: 18,
            height: 18,
            borderRadius: 9,
            background: page.hue,
          }),
          page.eyebrow,
        ]),
      ]),
      row(
        {
          fontSize: titleSize(page.title),
          fontWeight: 700,
          letterSpacing: -2.5,
          lineHeight: 1.06,
          maxWidth: 1000,
        },
        page.title,
      ),
      row(
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: `2px solid ${c.line}`,
          fontSize: 26,
          color: c.soft,
        },
        [row({}, page.meta), row({ color: c.faint }, 'Byurhan Nurula')],
      ),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 72 },
  );
}

// B: a large page mark at the right, like a stamp. No rule line.
function designB(page, c = DARK) {
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 760,
        },
        [
          wordmark(c),
          el('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
            row({ fontSize: 28, color: page.hue }, page.eyebrow),
            row(
              {
                fontSize: titleSize(page.title, 0.86),
                fontWeight: 700,
                letterSpacing: -2.5,
                lineHeight: 1.06,
              },
              page.title,
            ),
          ]),
          row({ fontSize: 26, color: c.soft }, page.meta),
        ],
      ),
      row({ flex: 1, alignItems: 'center', justifyContent: 'center' }, [
        mark(page, 260),
      ]),
    ],
    { padding: 72 },
  );
}

// C: the title inside a browser window with the page address.
function designC(page, c = DARK) {
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          borderRadius: 28,
          background: c.card,
          border: `2px solid ${c.line}`,
          overflow: 'hidden',
        },
        [
          row(
            {
              alignItems: 'center',
              gap: 12,
              padding: '22px 28px',
              borderBottom: `2px solid ${c.line}`,
            },
            [
              ...['#f472b6', '#facc15', '#4ade80'].map((color) =>
                el('div', {
                  display: 'flex',
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  background: color,
                }),
              ),
              row(
                { marginLeft: 18, fontSize: 24, color: c.faint },
                `byurhannurula.com/${page.path}`,
              ),
            ],
          ),
          el(
            'div',
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              padding: 48,
            },
            [
              row(
                {
                  fontSize: titleSize(page.title, 0.9),
                  fontWeight: 700,
                  letterSpacing: -2.5,
                  lineHeight: 1.06,
                },
                page.title,
              ),
              row(
                {
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 26,
                  color: c.soft,
                },
                [
                  row({ alignItems: 'center', gap: 14 }, [
                    mark(page, 22),
                    page.meta,
                  ]),
                  wordmark(c, 30),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
    { padding: 44 },
  );
}

// D: the morning palette. Warm white, for a share that stands out in a
// dark chat list.
const designD = (page) => designA(page, WARM);

// E: a colour band at the left in the page hue, title on the dark side.
function designE(page, c = DARK) {
  return frameBox(c, [
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 250,
        padding: 48,
        background: page.hue,
        color: '#0a0a0a',
      },
      [
        row({ fontSize: 34, fontWeight: 700 }, 'byurhan.'),
        row({ fontSize: 30 }, page.eyebrow),
      ],
    ),
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        padding: 64,
      },
      [
        row(
          {
            fontSize: titleSize(page.title, 0.88),
            fontWeight: 700,
            letterSpacing: -2.5,
            lineHeight: 1.06,
          },
          page.title,
        ),
        row({ fontSize: 26, color: c.soft }, page.meta),
      ],
    ),
  ]);
}

const DESIGNS = { a: designA, b: designB, c: designC, d: designD, e: designE };

// ---- video frames: wordmark typed, then the page mark and title ----
const WORD = 'byurhan';

function videoFrame(page, s) {
  const c = DARK;
  return frameBox(
    c,
    [
      row(
        {
          alignItems: 'center',
          height: 110,
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -4,
        },
        [
          row({}, WORD.slice(0, s.letters)),
          s.dot ? el('div', { display: 'flex', color: c.accent }, '.') : null,
          s.caret
            ? el('div', {
                display: 'flex',
                width: 8,
                height: 84,
                marginLeft: 6,
                background: c.accent,
              })
            : null,
        ].filter(Boolean),
      ),
      el(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 22, opacity: s.title },
        [
          row({ alignItems: 'center', gap: 16, fontSize: 30, color: c.soft }, [
            mark(page, 26),
            page.eyebrow,
          ]),
          row(
            {
              fontSize: titleSize(page.title, 0.8),
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
              maxWidth: 1000,
            },
            page.title,
          ),
        ],
      ),
      row({ fontSize: 26, color: c.soft, opacity: s.meta }, page.meta),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 72 },
  );
}

const base = { letters: 0, caret: false, dot: false, title: 0, meta: 0 };
const typed = { ...base, letters: WORD.length, dot: true };
const STEPS = [
  [{ ...base, caret: true }, 0.3],
  ...Array.from({ length: WORD.length }, (_, i) => [
    { ...base, letters: i + 1, caret: true },
    0.09,
  ]),
  [{ ...base, letters: WORD.length, caret: true }, 0.2],
  [typed, 0.3],
  ...[0.25, 0.5, 0.75, 1].map((title) => [{ ...typed, title }, 0.08]),
  ...[0.33, 0.66, 1].map((meta) => [{ ...typed, title: 1, meta }, 0.08]),
  [{ ...typed, title: 1, meta: 1 }, 2.4],
];

async function png(element, file) {
  const image = new ImageResponse(element, SIZE);
  await writeFile(file, Buffer.from(await image.arrayBuffer()));
}

const imagesDir = path.resolve(process.argv[2] ?? 'og-preview');
const framesDir = path.resolve(process.argv[3] ?? 'og-frames');
await mkdir(imagesDir, { recursive: true });

for (const page of PAGES) {
  for (const [name, design] of Object.entries(DESIGNS)) {
    await png(design(page), path.join(imagesDir, `${page.key}-${name}.png`));
  }
  const dir = path.join(framesDir, page.key);
  await mkdir(dir, { recursive: true });
  const list = [];
  for (const [index, [state, seconds]] of STEPS.entries()) {
    const file = path.join(dir, `f${String(index).padStart(2, '0')}.png`);
    await png(videoFrame(page, state), file);
    list.push(`file '${file}'`, `duration ${seconds}`);
  }
  // The concat demuxer needs the last file twice to keep its duration.
  list.push(list.at(-2));
  await writeFile(path.join(dir, 'frames.txt'), `${list.join('\n')}\n`);
}

process.stdout.write(
  `${PAGES.length} pages, ${Object.keys(DESIGNS).length} designs\n`,
);
