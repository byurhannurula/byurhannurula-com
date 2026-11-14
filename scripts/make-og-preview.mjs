// Draws share image designs and share video frames for every page, for the
// review page claude-lab/og-preview.html. This is a design tool: the live
// images come from src/lib/og.tsx. When a design is chosen, port it there.
//
// Run from the project root:
//   node scripts/make-og-preview.mjs <images-dir> <frames-dir>
// Then, for each page, join its frames (see frames.txt in each folder).

import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
    cover: true,
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
    cover: true,
  },
];

// A local picture stands in for a note cover, so the script needs no network.
const coverFile = path.resolve('public/assets/projects/jotter/desktop.png');
const COVER = `data:image/png;base64,${(await readFile(coverFile)).toString('base64')}`;

const el = (type, style, children) => ({ type, props: { style, children } });
const img = (src, style) => ({ type: 'img', props: { src, style } });
const row = (style, children) =>
  el('div', { display: 'flex', ...style }, children);

/** Mixes two hex colours. `amount` is the share of the first one. */
function mix(a, b, amount) {
  const parse = (hex) =>
    [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16));
  const [x, y] = [parse(a), parse(b)];
  return `#${x
    .map((v, i) =>
      Math.round(v * amount + y[i] * (1 - amount))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

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

const wordmark = (c, size = 36, dot = c.accent) =>
  row({ fontSize: size, fontWeight: 700 }, [
    'byurhan',
    el('span', { color: dot }, '.'),
  ]);

/** The mark of a page: the same shapes as the section marks on the site. */
function mark(page, size, color = page.hue) {
  const base = {
    display: 'flex',
    width: size,
    height: size,
    background: color,
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
      borderBottom: `${size}px solid ${color}`,
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
        background: color,
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

const title = (page, scale, extra = {}) =>
  row(
    {
      fontSize: titleSize(page.title, scale),
      fontWeight: 700,
      letterSpacing: -2.5,
      lineHeight: 1.06,
      ...extra,
    },
    page.title,
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
      title(page, 1, { maxWidth: 1000 }),
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
            title(page, 0.86),
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
              title(page, 0.9),
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

// D: the morning palette. Warm white, to stand out in a dark chat list.
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
      [title(page, 0.88), row({ fontSize: 26, color: c.soft }, page.meta)],
    ),
  ]);
}

// F: the full image in the page colour. The loudest one.
function designF(page) {
  const ink = '#0a0a0a';
  return frameBox(
    { bg: page.hue, ink },
    [
      row({ alignItems: 'center', justifyContent: 'space-between' }, [
        wordmark({ accent: ink }, 36, mix(ink, page.hue, 0.45)),
        row({ fontSize: 26, color: mix(ink, page.hue, 0.7) }, page.eyebrow),
      ]),
      title(page, 1.04, { maxWidth: 1020 }),
      row(
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 26,
          color: mix(ink, page.hue, 0.7),
        },
        [row({}, page.meta), mark(page, 44, ink)],
      ),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 72 },
  );
}

// G: a dark page tinted with the page colour, and a colour block that holds
// the mark. Colour without a loud background.
function designG(page) {
  const c = {
    ...DARK,
    bg: mix(page.hue, '#0a0a0a', 0.1),
    line: mix(page.hue, '#0a0a0a', 0.24),
  };
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          paddingRight: 56,
        },
        [
          wordmark(c, 36, page.hue),
          title(page, 0.9),
          row(
            { fontSize: 26, color: mix(page.hue, '#9e9e9e', 0.35) },
            page.meta,
          ),
        ],
      ),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          width: 300,
          borderRadius: 40,
          background: page.hue,
          color: '#0a0a0a',
        },
        [
          mark(page, 132, '#0a0a0a'),
          row({ fontSize: 30, fontWeight: 700 }, page.eyebrow),
        ],
      ),
    ],
    { padding: 56 },
  );
}

// H: dark, with the page colour as a thick bar at the bottom edge and on
// the title's first words. The quietest colour option.
function designH(page, c = DARK) {
  const words = page.title.split(' ');
  const cut = Math.min(2, words.length - 1);
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          padding: '72px 72px 56px',
        },
        [
          row({ alignItems: 'center', justifyContent: 'space-between' }, [
            wordmark(c, 36, page.hue),
            row({ fontSize: 26, color: c.soft }, page.eyebrow),
          ]),
          row(
            {
              flexWrap: 'wrap',
              fontSize: titleSize(page.title),
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.06,
              maxWidth: 1040,
            },
            [
              el(
                'span',
                { color: page.hue, marginRight: 22 },
                words.slice(0, cut).join(' '),
              ),
              el('span', {}, words.slice(cut).join(' ')),
            ],
          ),
          row({ fontSize: 26, color: c.soft }, page.meta),
        ],
      ),
      el('div', { display: 'flex', height: 18, background: page.hue }),
    ],
    { flexDirection: 'column' },
  );
}

// I, notes only: the cover picture fills the image under a flat dark layer.
function designI(page, c = DARK) {
  if (!page.cover) return designH(page, c);
  return frameBox(c, [
    img(COVER, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1200,
      height: 630,
      objectFit: 'cover',
    }),
    el('div', {
      display: 'flex',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1200,
      height: 630,
      background: 'rgba(10,10,10,0.66)',
    }),
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        padding: 72,
      },
      [
        row({ alignItems: 'center', justifyContent: 'space-between' }, [
          wordmark(c),
          row(
            { alignItems: 'center', gap: 14, fontSize: 26, color: '#d4d4d4' },
            [mark(page, 20), page.eyebrow],
          ),
        ]),
        title(page, 1, { maxWidth: 1000, color: '#ffffff' }),
        row({ fontSize: 26, color: '#d4d4d4' }, page.meta),
      ],
    ),
  ]);
}

// J, notes only: the cover as a rounded picture at the right.
function designJ(page, c = DARK) {
  if (!page.cover) return designG(page);
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          paddingRight: 48,
        },
        [
          wordmark(c, 36, page.hue),
          el('div', { display: 'flex', flexDirection: 'column', gap: 20 }, [
            row(
              { alignItems: 'center', gap: 14, fontSize: 26, color: page.hue },
              [mark(page, 20), page.eyebrow],
            ),
            title(page, 0.78),
          ]),
          row({ fontSize: 26, color: c.soft }, page.meta),
        ],
      ),
      img(COVER, {
        width: 440,
        height: 518,
        objectFit: 'cover',
        borderRadius: 36,
      }),
    ],
    { padding: 56 },
  );
}

const DESIGNS = {
  a: designA,
  b: designB,
  c: designC,
  d: designD,
  e: designE,
  f: designF,
  g: designG,
  h: designH,
  i: designI,
  j: designJ,
};

// ---- video frames: the scramble effect of the site's hero ----
// Letters start as random glyphs and settle from left to right.
const WORD = 'byurhan';
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&/<>+=*';

// A fixed sequence, so two runs draw the same video.
let seed = 7;
const random = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

function scramble(text, settled) {
  return [...text]
    .map((char, i) =>
      i < settled || char === ' '
        ? char
        : GLYPHS[Math.floor(random() * GLYPHS.length)],
    )
    .join('');
}

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
          row({ color: s.word === WORD ? c.ink : c.soft }, s.word),
          s.dot ? el('div', { display: 'flex', color: page.hue }, '.') : null,
        ].filter(Boolean),
      ),
      el(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 22, opacity: s.show },
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
              color: s.title === page.title ? c.ink : c.soft,
            },
            s.title,
          ),
        ],
      ),
      row({ fontSize: 26, color: c.soft, opacity: s.meta }, page.meta),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 72 },
  );
}

function stepsFor(page) {
  const steps = [];
  const blank = { word: '', dot: false, show: 0, title: '', meta: 0 };
  // the wordmark: two full scrambles, then it settles letter by letter
  for (let i = 0; i < 2; i += 1)
    steps.push([{ ...blank, word: scramble(WORD, 0) }, 0.07]);
  for (let i = 1; i <= WORD.length; i += 1) {
    steps.push([{ ...blank, word: scramble(WORD, i) }, 0.07]);
  }
  const named = { ...blank, word: WORD, dot: true };
  steps.push([named, 0.3]);
  // the title: settles in about ten steps, whatever its length
  const chunk = Math.ceil(page.title.length / 10);
  for (let settled = 0; settled < page.title.length; settled += chunk) {
    steps.push([
      { ...named, show: 1, title: scramble(page.title, settled) },
      0.07,
    ]);
  }
  const full = { ...named, show: 1, title: page.title };
  steps.push(
    [full, 0.25],
    [{ ...full, meta: 0.5 }, 0.08],
    [{ ...full, meta: 1 }, 2.4],
  );
  return steps;
}

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
  for (const [index, [state, seconds]] of stepsFor(page).entries()) {
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
