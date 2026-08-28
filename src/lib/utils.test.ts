import { describe, expect, it } from "vitest";
import { calculateReadingTime, cn } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last one wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b");
  });
});

describe("calculateReadingTime", () => {
  it("rounds up to the next minute at 200 wpm", () => {
    expect(calculateReadingTime("word ".repeat(201))).toBe("2 min");
  });
});
