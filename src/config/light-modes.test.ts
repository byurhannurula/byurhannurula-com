import { describe, expect, it } from "vitest";

import {
  LIGHT_MODES,
  type LightMode,
  lightRank,
  modeForHour,
  msUntilNextMode,
} from "./light-modes";

describe("modeForHour", () => {
  it("covers every hour of the day", () => {
    for (let h = 0; h < 24; h++) {
      expect(LIGHT_MODES).toContain(modeForHour(h));
    }
  });

  it("wraps midnight into night", () => {
    expect(modeForHour(23)).toBe("night");
    expect(modeForHour(0)).toBe("night");
    expect(modeForHour(4)).toBe("night");
  });

  it("moves through the day in order", () => {
    expect(modeForHour(5)).toBe("morning");
    expect(modeForHour(10)).toBe("morning");
    expect(modeForHour(11)).toBe("day");
    expect(modeForHour(16)).toBe("day");
    expect(modeForHour(17)).toBe("evening");
    expect(modeForHour(20)).toBe("evening");
    expect(modeForHour(21)).toBe("night");
  });
});

describe("msUntilNextMode", () => {
  it("always lands on a different mode", () => {
    for (let h = 0; h < 24; h++) {
      const now = new Date(2026, 0, 1, h, 30, 0, 0);
      const then = new Date(now.getTime() + msUntilNextMode(now));
      expect(modeForHour(then.getHours())).not.toBe(modeForHour(h));
    }
  });

  it("is always in the future and within a day", () => {
    for (let h = 0; h < 24; h++) {
      const ms = msUntilNextMode(new Date(2026, 0, 1, h, 30));
      expect(ms).toBeGreaterThan(0);
      expect(ms).toBeLessThanOrEqual(24 * 60 * 60 * 1000);
    }
  });
});

describe("lightRank", () => {
  it("orders light to dark", () => {
    const ranks = LIGHT_MODES.map((m: LightMode) => lightRank(m));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });
});
