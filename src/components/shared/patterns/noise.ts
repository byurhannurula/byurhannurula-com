/**
 * Smooth 3D value noise, 0 to 1. Enough for slow background fields; not a
 * full simplex noise, and not meant to be.
 */
const PERM = new Uint8Array(512);
{
  // A fixed seed, so every visit draws the same field.
  let seed = 7;
  const order = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = order[i & 255];
}

const fade = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const at = (x: number, y: number, z: number) =>
  PERM[PERM[PERM[x & 255] + (y & 255)] + (z & 255)] / 255;

export function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const u = fade(x - xi);
  const v = fade(y - yi);
  const w = fade(z - zi);
  const corner = (dx: number, dy: number, dz: number) =>
    at(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(
      lerp(corner(0, 0, 0), corner(1, 0, 0), u),
      lerp(corner(0, 1, 0), corner(1, 1, 0), u),
      v,
    ),
    lerp(
      lerp(corner(0, 0, 1), corner(1, 0, 1), u),
      lerp(corner(0, 1, 1), corner(1, 1, 1), u),
      v,
    ),
    w,
  );
}

/** Two octaves: big shapes with a little detail on top. */
export const fbm3 = (x: number, y: number, z: number) =>
  noise3(x, y, z) * 0.7 + noise3(x * 2.1, y * 2.1, z * 1.3) * 0.3;
