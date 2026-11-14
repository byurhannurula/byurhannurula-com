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

// ---- designs after a look at ogimage.org/inspiration (portfolio set) ----

// K: one giant word on a flat colour, as type-led portfolios do. The word
// is the page name; the title is small below it.
function designK(page) {
  const ink = '#0a0a0a';
  const word = page.eyebrow === 'home' ? 'byurhan' : page.eyebrow;
  const size = Math.min(330, Math.floor(1850 / word.length));
  return frameBox(
    { bg: page.hue, ink },
    [
      row(
        { alignItems: 'center', justifyContent: 'space-between', fontSize: 26 },
        [row({ fontWeight: 700 }, 'byurhan.'), row({}, 'Byurhan Nurula')],
      ),
      row(
        {
          fontSize: size,
          fontWeight: 700,
          letterSpacing: -size * 0.05,
          lineHeight: 0.9,
          marginLeft: -8,
        },
        word,
      ),
      row({ fontSize: 30, lineHeight: 1.25, maxWidth: 900 }, page.title),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 64 },
  );
}

// L: a mostly empty image with the wordmark very large and cut by the
// bottom edge, like the big name in the site footer.
function designL(page, c = DARK) {
  return frameBox(c, [
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        padding: '64px 72px 0',
        flex: 1,
      },
      [
        row({ alignItems: 'center', gap: 14, fontSize: 26, color: c.soft }, [
          mark(page, 22),
          page.eyebrow,
        ]),
        row(
          {
            fontSize: titleSize(page.title, 0.62),
            fontWeight: 700,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            maxWidth: 900,
          },
          page.title,
        ),
      ],
    ),
    row(
      {
        position: 'absolute',
        left: 56,
        bottom: -84,
        width: 1400,
        whiteSpace: 'nowrap',
        fontSize: 286,
        fontWeight: 700,
        letterSpacing: -16,
        lineHeight: 1,
        color: c.ink,
      },
      ['byurhan', el('span', { color: page.hue }, '.')],
    ),
  ]);
}

// M: the title on top and a strip of pictures that rises from the bottom
// edge. Notes use the cover; other pages use blocks in the site hues.
function designM(page, c = DARK) {
  const hues = ['#f472b6', '#60a5fa', '#a78bfa', '#22d3ee', '#fb923c'];
  const tile = (index) =>
    page.cover && index === 2
      ? img(COVER, {
          width: 250,
          height: 250,
          objectFit: 'cover',
          borderRadius: 22,
        })
      : el(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: index === 2 ? 250 : 200,
            height: index === 2 ? 250 : 190,
            borderRadius: 22,
            background:
              index === 2 ? page.hue : mix(hues[index], '#0a0a0a', 0.3),
          },
          index === 2 ? [mark(page, 96, '#0a0a0a')] : [],
        );
  return frameBox(
    c,
    [
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '56px 90px 0',
        },
        [
          row(
            { fontSize: 24, color: c.faint, letterSpacing: 4 },
            'BYURHAN NURULA',
          ),
          row(
            {
              fontSize: titleSize(page.title, 0.7),
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.08,
              textAlign: 'center',
            },
            page.title,
          ),
        ],
      ),
      row(
        {
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 22,
          marginBottom: -60,
        },
        [0, 1, 2, 3, 4].map(tile),
      ),
    ],
    { flexDirection: 'column', justifyContent: 'space-between' },
  );
}

// N: text at the left, a small product panel at the right: a window with
// lines in the page colour, or the cover for a note.
function designN(page, c = WARM) {
  const line = (width, color = c.line) =>
    el('div', {
      display: 'flex',
      width,
      height: 16,
      borderRadius: 8,
      background: color,
    });
  const panel = page.cover
    ? img(COVER, { width: 420, height: 300, objectFit: 'cover' })
    : el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          padding: 32,
          width: 420,
          height: 300,
        },
        [
          row({ alignItems: 'center', gap: 14 }, [
            mark(page, 34),
            line(150, c.ink),
          ]),
          line(330),
          line(280),
          row({ gap: 12 }, [
            line(120, page.hue),
            line(90, mix(page.hue, c.bg, 0.35)),
          ]),
          line(300),
          line(200),
        ],
      );
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
          wordmark(c, 34),
          title(page, 0.78),
          row({ fontSize: 26, color: c.soft }, page.meta),
        ],
      ),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          borderRadius: 26,
          overflow: 'hidden',
          background: c.card,
          border: `2px solid ${c.line}`,
        },
        [
          row(
            {
              gap: 10,
              padding: '16px 20px',
              borderBottom: `2px solid ${c.line}`,
            },
            ['#f472b6', '#facc15', '#4ade80'].map((color) =>
              el('div', {
                display: 'flex',
                width: 14,
                height: 14,
                borderRadius: 7,
                background: color,
              }),
            ),
          ),
          panel,
        ],
      ),
    ],
    { padding: 64 },
  );
}

// O: a field of small squares, some lit in the page colour, like the
// status bars and the contribution graph on the site. Title on top.
function designO(page, c = DARK) {
  const cols = 30;
  // Fewer rows under a long title, so the field never meets the text.
  const rows = page.title.length > 44 ? 5 : page.title.length > 24 ? 6 : 8;
  let state = page.title.length * 97;
  const next = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const depth = Math.floor(i / cols) / rows;
    const lit = next() < 0.1 + depth * 0.5;
    const strong = lit && next() < 0.45;
    return el('div', {
      display: 'flex',
      width: 28,
      height: 28,
      borderRadius: 7,
      background: strong ? page.hue : lit ? mix(page.hue, c.bg, 0.35) : c.card,
    });
  });
  return frameBox(
    c,
    [
      row({ alignItems: 'center', justifyContent: 'space-between' }, [
        wordmark(c, 34, page.hue),
        row({ fontSize: 26, color: c.soft }, page.eyebrow),
      ]),
      title(page, 0.74, { maxWidth: 980, marginTop: 34 }),
      row({ flexWrap: 'wrap', gap: 7, width: 1050, marginTop: 'auto' }, cells),
    ],
    { flexDirection: 'column', padding: '60px 72px 54px' },
  );
}

// P: the title in the centre and a pointer with a name tag in the page
// colour, as if someone points at the page.
function designP(page, c = DARK) {
  return frameBox(
    c,
    [
      wordmark(c, 34),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        },
        [
          row(
            {
              fontSize: titleSize(page.title, 0.86),
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.06,
              textAlign: 'center',
              maxWidth: 940,
            },
            page.title,
          ),
          el(
            'div',
            {
              display: 'flex',
              alignItems: 'flex-start',
              position: 'absolute',
              right: 40,
              bottom: -86,
            },
            [
              el('div', {
                display: 'flex',
                width: 0,
                height: 0,
                borderRight: '30px solid transparent',
                borderTop: `40px solid ${page.hue}`,
              }),
              row(
                {
                  marginTop: 26,
                  marginLeft: -4,
                  padding: '10px 20px',
                  borderRadius: 14,
                  background: page.hue,
                  color: '#0a0a0a',
                  fontSize: 28,
                  fontWeight: 700,
                },
                page.eyebrow,
              ),
            ],
          ),
        ],
      ),
      row({ fontSize: 26, color: c.soft }, page.meta),
    ],
    {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 64,
    },
  );
}

// ---- round three: colour as a surface, and squares that say something ----

const INK = '#0a0a0a';

/** Three colours for each page: the page hue and two that sit well with it. */
const TRIO = {
  home: ['#4ade80', '#facc15', '#60a5fa'],
  about: ['#f472b6', '#fb923c', '#a78bfa'],
  work: ['#60a5fa', '#22d3ee', '#4ade80'],
  notes: ['#fb923c', '#facc15', '#f472b6'],
  note: ['#fb923c', '#facc15', '#f472b6'],
  uses: ['#a78bfa', '#f472b6', '#60a5fa'],
  homelab: ['#22d3ee', '#4ade80', '#a78bfa'],
};
const SITE_HUES = [
  '#f472b6',
  '#fb923c',
  '#facc15',
  '#4ade80',
  '#22d3ee',
  '#60a5fa',
  '#a78bfa',
];
const pageWord = (page) => (page.eyebrow === 'home' ? 'byurhan' : page.eyebrow);

// 5 by 7 letters, one string per row, for the words the site needs.
const GLYPH = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
};

const MORSE = {
  A: '.-',
  B: '-...',
  E: '.',
  H: '....',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  W: '.--',
  Y: '-.--',
};

// Q: the cut wordmark, with detail. The wordmark stands on a colour floor
// and is cut by the edge; above it: the address, the title, and the row of
// page marks with this page lit, like a small map of the site.
function designQ(page) {
  const [hue, second] =
    TRIO[page.key === 'note-long' ? 'note' : page.key] ?? TRIO.home;
  const c = DARK;
  const map = PAGES.slice(0, 6).map((p) =>
    el(
      'div',
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 14,
        background:
          p.eyebrow === page.eyebrow || (page.cover && p.key === 'notes')
            ? hue
            : c.card,
      },
      [
        mark(
          p,
          20,
          p.eyebrow === page.eyebrow || (page.cover && p.key === 'notes')
            ? INK
            : c.faint,
        ),
      ],
    ),
  );
  return frameBox(c, [
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        padding: '52px 64px 0',
        height: 330,
      },
      [
        row(
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1072,
          },
          [
            row(
              { fontSize: 24, color: c.soft, letterSpacing: 1 },
              `byurhannurula.com/${page.path}`,
            ),
            row({ gap: 10 }, map),
          ],
        ),
        title(page, 0.7, { maxWidth: 940 }),
      ],
    ),
    el('div', {
      display: 'flex',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 300,
      background: hue,
    }),
    el(
      'div',
      {
        display: 'flex',
        position: 'absolute',
        right: 64,
        bottom: 236,
        padding: '10px 20px',
        borderRadius: 999,
        background: INK,
        color: hue,
        fontSize: 24,
      },
      page.meta,
    ),
    el(
      'div',
      {
        display: 'flex',
        position: 'absolute',
        left: 64,
        bottom: 244,
        fontSize: 24,
        color: INK,
      },
      page.eyebrow,
    ),
    row(
      {
        position: 'absolute',
        left: 48,
        bottom: -70,
        width: 1400,
        whiteSpace: 'nowrap',
        fontSize: 270,
        fontWeight: 700,
        letterSpacing: -15,
        lineHeight: 1,
        color: INK,
      },
      'byurhan',
    ),
    el('div', {
      display: 'flex',
      position: 'absolute',
      right: 70,
      bottom: 34,
      width: 58,
      height: 58,
      borderRadius: 16,
      background: second,
    }),
  ]);
}

// R: squares that say something. The field is the status and contribution
// grid of the site, and the lit squares spell the page name.
function designR(page) {
  const [hue, second] =
    TRIO[page.key === 'note-long' ? 'note' : page.key] ?? TRIO.home;
  const bg = mix(hue, INK, 0.14);
  const dim = mix(hue, INK, 0.26);
  const word = pageWord(page).toUpperCase();
  const cols = 45;
  const rows = 9;
  const start = Math.floor((cols - (word.length * 6 - 1)) / 2);
  let state = word.length * 131;
  const next = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
  // One flex row for each line: a wrapped list can break one square early
  // and shift every letter.
  const lines = [];
  for (let y = 0; y < rows; y += 1) {
    const cells = [];
    lines.push(row({ gap: 4 }, cells));
    for (let x = 0; x < cols; x += 1) {
      const offset = x - start;
      const letter = GLYPH[word[Math.floor(offset / 6)]];
      const inWord =
        offset >= 0 &&
        offset % 6 < 5 &&
        y >= 1 &&
        y <= 7 &&
        letter?.[y - 1][offset % 6] === '1';
      // a few stray squares, like quiet days in a contribution graph
      const stray = !inWord && next() < 0.045;
      cells.push(
        el('div', {
          display: 'flex',
          width: 19.5,
          height: 19.5,
          borderRadius: 5,
          background: inWord ? hue : stray ? second : dim,
          opacity: stray ? 0.55 : 1,
        }),
      );
    }
  }
  return frameBox(
    { bg, ink: DARK.ink },
    [
      row({ alignItems: 'center', justifyContent: 'space-between' }, [
        wordmark(DARK, 34, hue),
        row({ fontSize: 24, color: mix(hue, '#ffffff', 0.5) }, page.meta),
      ]),
      row(
        {
          fontSize: titleSize(page.title, 0.6),
          fontWeight: 700,
          letterSpacing: -1.5,
          lineHeight: 1.1,
          maxWidth: 960,
          marginTop: 30,
        },
        page.title,
      ),
      el(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto' },
        lines,
      ),
    ],
    { flexDirection: 'column', padding: '56px 72px 56px' },
  );
}

// S: the page name in Morse code. Dots and dashes, a letter under each
// group, one colour for each letter. A reader who knows Morse gets a gift.
function designS(page) {
  const [hue] = TRIO[page.key === 'note-long' ? 'note' : page.key] ?? TRIO.home;
  const bg = mix(hue, '#ffffff', 0.22);
  const line = (word, unit, colours) =>
    row(
      { alignItems: 'flex-start', gap: unit * 1.5 },
      [...word.toUpperCase()].map((letter, index) =>
        el(
          'div',
          { display: 'flex', flexDirection: 'column', gap: unit * 0.55 },
          [
            row(
              { gap: unit * 0.4 },
              [...MORSE[letter]].map((sign) =>
                el('div', {
                  display: 'flex',
                  width: sign === '-' ? unit * 3 : unit,
                  height: unit,
                  borderRadius: unit / 2,
                  background: colours[index % colours.length],
                }),
              ),
            ),
            row(
              { fontSize: unit * 0.85, color: mix(INK, bg, 0.6) },
              letter.toLowerCase(),
            ),
          ],
        ),
      ),
    );
  const dark = SITE_HUES.map((colour) => mix(colour, INK, 0.72));
  return frameBox(
    { bg, ink: INK },
    [
      row(
        { alignItems: 'center', justifyContent: 'space-between', fontSize: 26 },
        [
          row({ fontWeight: 700 }, 'byurhan.'),
          row({ color: mix(INK, bg, 0.6) }, 'in Morse code'),
        ],
      ),
      el('div', { display: 'flex', flexDirection: 'column', gap: 34 }, [
        line('byurhan', 20, dark),
        line(pageWord(page) === 'byurhan' ? 'home' : pageWord(page), 30, [INK]),
      ]),
      row(
        {
          fontSize: titleSize(page.title, 0.52),
          fontWeight: 700,
          letterSpacing: -1,
          lineHeight: 1.15,
          maxWidth: 980,
        },
        page.title,
      ),
    ],
    { flexDirection: 'column', justifyContent: 'space-between', padding: 64 },
  );
}

// T: three large shapes in three colours, cut by the edges. The shapes are
// the page mark at poster size; the title sits on the first colour.
function designT(page) {
  const [hue, second, third] =
    TRIO[page.key === 'note-long' ? 'note' : page.key] ?? TRIO.home;
  return frameBox({ bg: hue, ink: INK }, [
    el('div', {
      display: 'flex',
      position: 'absolute',
      right: -120,
      top: -150,
      width: 520,
      height: 520,
      borderRadius: 260,
      background: second,
    }),
    el('div', {
      display: 'flex',
      position: 'absolute',
      right: 150,
      bottom: -190,
      width: 420,
      height: 420,
      borderRadius: 96,
      background: third,
      transform: 'rotate(18deg)',
    }),
    el(
      'div',
      {
        display: 'flex',
        position: 'absolute',
        right: 96,
        top: 210,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 44,
        background: INK,
      },
      [mark(page, 70, hue)],
    ),
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 720,
        padding: 64,
      },
      [
        row({ fontSize: 34, fontWeight: 700 }, 'byurhan.'),
        title(page, 0.84),
        row({ fontSize: 26 }, page.meta),
      ],
    ),
  ]);
}

// U: seven bars in the seven colours of the site, like a level meter. The
// bar of this page is the tall one and carries its name.
function designU(page, c = WARM) {
  const [hue] = TRIO[page.key === 'note-long' ? 'note' : page.key] ?? TRIO.home;
  const names = ['about', 'notes', 'now', 'home', 'homelab', 'work', 'uses'];
  const mine = page.eyebrow === 'note' ? 'notes' : page.eyebrow;
  const heights = [150, 210, 120, 190, 160, 230, 140];
  return frameBox(c, [
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        padding: '60px 72px 0',
      },
      [
        row(
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1056,
          },
          [wordmark(c, 34), row({ fontSize: 26, color: c.soft }, page.meta)],
        ),
        title(page, 0.7, { maxWidth: 1000 }),
      ],
    ),
    row(
      {
        position: 'absolute',
        left: 72,
        right: 72,
        bottom: 0,
        alignItems: 'flex-end',
        gap: 18,
      },
      SITE_HUES.map((colour, index) => {
        const on = names[index] === mine;
        return el(
          'div',
          {
            display: 'flex',
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: on ? 290 : heights[index],
            paddingTop: 18,
            borderRadius: '26px 26px 0 0',
            background: on ? hue : mix(colour, c.bg, 0.5),
            color: INK,
            fontSize: 24,
            fontWeight: 700,
          },
          on ? mine : '',
        );
      }),
    ),
  ]);
}

const DESIGNS = {
  q: designQ,
  r: designR,
  s: designS,
  t: designT,
  u: designU,
  k: designK,
  l: designL,
  m: designM,
  n: designN,
  o: designO,
  p: designP,
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
