import { describe, expect, it } from "vitest";

import { splitIntoRows } from "./gallery-rows";

const shape = (n: number) =>
  splitIntoRows(Array.from({ length: n }, (_, i) => i)).map((r) => r.length);

describe("splitIntoRows", () => {
  it("keeps small galleries on one row", () => {
    expect(shape(1)).toEqual([1]);
    expect(shape(2)).toEqual([2]);
    expect(shape(3)).toEqual([3]);
  });

  it("never leaves a lonely last image", () => {
    expect(shape(4)).toEqual([2, 2]);
    expect(shape(5)).toEqual([3, 2]);
    expect(shape(7)).toEqual([3, 2, 2]);
    expect(shape(8)).toEqual([3, 3, 2]);
    // A trailing row of one is only acceptable when it is the whole gallery.
    for (let n = 2; n <= 60; n++) {
      const rows = shape(n);
      if (rows.length > 1) expect(rows.at(-1)).toBeGreaterThan(1);
    }
  });

  it("caps a row at three", () => {
    for (let n = 1; n <= 60; n++) {
      for (const row of shape(n)) expect(row).toBeLessThanOrEqual(3);
    }
  });

  it("keeps rows within one image of each other", () => {
    for (let n = 1; n <= 60; n++) {
      const rows = shape(n);
      expect(Math.max(...rows) - Math.min(...rows)).toBeLessThanOrEqual(1);
    }
  });

  it("keeps every image exactly once", () => {
    for (let n = 0; n <= 60; n++) {
      const items = Array.from({ length: n }, (_, i) => i);
      expect(splitIntoRows(items).flat()).toEqual(items);
    }
  });

  it("handles an empty gallery", () => {
    expect(splitIntoRows([])).toEqual([]);
  });
});
