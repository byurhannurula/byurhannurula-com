import { fbm3 } from '@/components/shared/patterns/noise';

/**
 * Background drawings for the share images, as SVG data URLs. The image
 * renderer has no canvas, so each one is drawn here as plain SVG, the same
 * idea as the page-top patterns.
 */

const W = 1200;
const H = 630;

const svg = (body: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`,
  )}`;

/** A small seeded random, so an image is the same on every build. */
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const seedOf = (text: string) =>
  [...text].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 1e9, 7) ||
  7;

/** Flicker dots: small squares, thicker to the right. */
export function dotsArt(hue: string, seed: string) {
  const rand = random(seedOf(seed));
  const step = 14;
  let rects = '';
  for (let x = 0; x < W; x += step) {
    const weight = Math.max(0, (x - 380) / (W - 380));
    for (let y = 0; y < H; y += step) {
      const alpha = rand() * 0.5 * weight ** 1.4;
      if (alpha < 0.04) continue;
      rects += `<rect x="${x}" y="${y}" width="5" height="5" fill-opacity="${alpha.toFixed(2)}"/>`;
    }
  }
  return svg(`<g fill="${hue}">${rects}</g>`);
}

// Marching squares edges for each corner pattern; see contour-lines.tsx.
const SEGMENTS: number[][] = [
  [],
  [3, 2],
  [2, 1],
  [3, 1],
  [0, 1],
  [3, 0, 2, 1],
  [0, 2],
  [3, 0],
  [3, 0],
  [0, 2],
  [0, 1, 3, 2],
  [0, 1],
  [3, 1],
  [2, 1],
  [3, 2],
  [],
];

/** Contour lines of a noise map. One in four takes the hue. */
export function contourArt(hue: string, seed: string) {
  const cell = 12;
  const cols = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);
  const z = (seedOf(seed) % 1000) / 37;
  const field: number[] = [];
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      field.push(fbm3(x * cell * 0.0042, y * cell * 0.0042, z));
    }
  }
  let paths = '';
  const levels = 9;
  for (let level = 0; level < levels; level++) {
    const t = 0.22 + (level / (levels - 1)) * 0.56;
    let d = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * (cols + 1) + x;
        const a = field[i];
        const b = field[i + 1];
        const c = field[i + cols + 2];
        const e = field[i + cols + 1];
        const shape =
          (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (e > t ? 1 : 0);
        const segs = SEGMENTS[shape];
        const px = x * cell;
        const py = y * cell;
        const point = (edge: number) => {
          if (edge === 0) return [px + ((t - a) / (b - a)) * cell, py];
          if (edge === 1) return [px + cell, py + ((t - b) / (c - b)) * cell];
          if (edge === 2) return [px + ((t - e) / (c - e)) * cell, py + cell];
          return [px, py + ((t - a) / (e - a)) * cell];
        };
        for (let s = 0; s < segs.length; s += 2) {
          const [x1, y1] = point(segs[s]);
          const [x2, y2] = point(segs[s + 1]);
          d += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
        }
      }
    }
    const major = level % 4 === 2;
    paths += `<path d="${d}" stroke="${major ? hue : '#3a3a3a'}" stroke-opacity="${major ? 0.8 : 0.9}" stroke-width="${major ? 1.6 : 1.1}" fill="none"/>`;
  }
  return svg(paths);
}

/** Halftone: dots that grow toward the right edge. */
export function halftoneArt(hue: string) {
  const step = 22;
  let dots = '';
  for (let y = step / 2; y < H; y += step) {
    for (let x = step / 2; x < W; x += step) {
      const d = Math.hypot(W + 60 - x, H / 2 - y);
      // A band between the top and bottom rows, so no dot sits under text.
      const band = Math.min(1, (y - 120) / 90, (H - 120 - y) / 90);
      const r = 10.5 * Math.max(0, 1 - d / 720) * Math.max(0, band);
      if (r < 0.6) continue;
      dots += `<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}"/>`;
    }
  }
  return svg(`<g fill="${hue}">${dots}</g>`);
}
