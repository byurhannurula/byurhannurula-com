// Draws the frames of the share video (public/og/intro.mp4) and a frame
// list for ffmpeg. The video is the wordmark typed out, then the role.
//
// Run from the project root:
//   node scripts/make-og-video.mjs <frames-dir>
//   ffmpeg -y -f concat -safe 0 -i <frames-dir>/frames.txt \
//     -vf fps=30,format=yuv420p -c:v libx264 -crf 24 -movflags +faststart \
//     -an public/og/intro.mp4
//
// Frames come from next/og so the type matches the share images. ffmpeg
// only joins them: many builds have no text filter.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og.js';

const SIZE = { width: 1200, height: 630 };
// Mirrors the `night` colours in src/lib/og.tsx.
const C = {
  bg: '#0a0a0a',
  ink: '#e6e6e6',
  soft: '#9e9e9e',
  faint: '#6c6c6c',
  accent: '#4ade80',
};
const WORD = 'byurhan';

const el = (type, style, children) => ({ type, props: { style, children } });

function frame({ letters, caret, dot, role, name }) {
  return el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 80,
      background: C.bg,
      color: C.ink,
    },
    [
      el(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          height: 150,
          fontSize: 132,
          fontWeight: 700,
          letterSpacing: -5,
        },
        [
          el('div', { display: 'flex' }, WORD.slice(0, letters)),
          dot ? el('div', { display: 'flex', color: C.accent }, '.') : null,
          caret
            ? el('div', {
                display: 'flex',
                width: 10,
                height: 112,
                marginLeft: 8,
                background: C.accent,
              })
            : null,
        ].filter(Boolean),
      ),
      el(
        'div',
        {
          display: 'flex',
          marginTop: 44,
          fontSize: 46,
          color: C.soft,
          opacity: role,
        },
        'Full-stack engineer and team lead',
      ),
      el(
        'div',
        {
          display: 'flex',
          marginTop: 18,
          fontSize: 30,
          color: C.faint,
          opacity: name,
        },
        'Byurhan Nurula',
      ),
    ],
  );
}

// [state, seconds on screen]
const base = { letters: 0, caret: false, dot: false, role: 0, name: 0 };
const typed = { ...base, letters: WORD.length };
const steps = [
  [{ ...base, caret: true }, 0.4],
  ...Array.from({ length: WORD.length }, (_, i) => [
    { ...base, letters: i + 1, caret: true },
    0.11,
  ]),
  [{ ...typed }, 0.2],
  [{ ...typed, caret: true }, 0.25],
  [{ ...typed, dot: true }, 0.45],
  ...[0.25, 0.5, 0.75, 1].map((role) => [{ ...typed, dot: true, role }, 0.09]),
  ...[0.25, 0.5, 0.75, 1].map((name) => [
    { ...typed, dot: true, role: 1, name },
    0.09,
  ]),
  [{ ...typed, dot: true, role: 1, name: 1 }, 2.2],
];

const outDir = path.resolve(process.argv[2] ?? 'og-frames');
await mkdir(outDir, { recursive: true });

const list = [];
for (const [index, [state, seconds]] of steps.entries()) {
  const file = path.join(outDir, `frame-${String(index).padStart(2, '0')}.png`);
  const image = new ImageResponse(frame(state), SIZE);
  await writeFile(file, Buffer.from(await image.arrayBuffer()));
  list.push(`file '${file}'`, `duration ${seconds}`);
}
// The concat demuxer needs the last file twice to keep its duration.
list.push(list.at(-2));
await writeFile(path.join(outDir, 'frames.txt'), `${list.join('\n')}\n`);

process.stdout.write(`${steps.length} frames in ${outDir}\n`);
