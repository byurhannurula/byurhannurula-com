/** Most images a justified row can hold before it reads as a contact sheet. */
const MAX_PER_ROW = 3;

/**
 * Split `count` images into justified rows.
 *
 * Rows come from the image count rather than an authored column number, so a
 * gallery never ends on a lonely leftover: 4 images give 2 + 2 and 7 give
 * 3 + 2 + 2, not 3 + 1 and 3 + 3 + 1. Row sizes differ by at most one, which
 * is enough because each row solves for its own height independently.
 */
export function splitIntoRows<T>(items: readonly T[]): T[][] {
  if (items.length === 0) return [];
  const rowCount = Math.ceil(items.length / MAX_PER_ROW);
  const base = Math.floor(items.length / rowCount);
  // The first `remainder` rows take one extra image; the rest take `base`.
  const remainder = items.length % rowCount;

  const rows: T[][] = [];
  let cursor = 0;
  for (let row = 0; row < rowCount; row++) {
    const size = base + (row < remainder ? 1 : 0);
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
}
