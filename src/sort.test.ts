import { describe, it, expect } from "vitest";
import { sort } from "./sort";

type TestCase = [number, number, number, number, string, string];
const falsy = [null, undefined, NaN, "", , false];

const testCases: TestCase[] = [
  [
    10,
    10,
    10,
    10,
    "STANDARD",
    "not bulky (1000 volume) and not heavy (10 mass)",
  ],
  [
    100,
    100,
    100,
    10,
    "SPECIAL",
    "bulky (1000000 volume) and not heavy (10 mass)",
  ],
  [10, 10, 10, 25, "SPECIAL", "not bulky (1000 volume) but heavy (25 mass)"],
  [100, 100, 100, 25, "REJECTED", "bulky (1000000 volume) and heavy (25 mass)"],
  [
    99,
    100,
    102,
    19,
    "SPECIAL",
    "just bulky (1009800 volume) and not heavy (19 mass)",
  ],
  [
    10,
    10,
    10,
    20,
    "SPECIAL",
    "not bulky (1000 volume) but just heavy (20 mass)",
  ],
  [
    100,
    100,
    100,
    20,
    "REJECTED",
    "bulky (1000000 volume) and just heavy (20 mass)",
  ],
];

describe("sort", () => {
  it.each(testCases)(
    "should return %s when dimensions are %i x %i x %i with mass %i (%s)",
    (width, height, length, mass, expected, description) => {
      expect(sort(width, height, length, mass)).toBe(expected);
    },
  );

  it("should handle zero values", () => {
    expect(sort(0, 0, 0, 0)).toBe("STANDARD");
  });

  it("should handle negative values", () => {
    expect(sort(-10, -10, -10, -10)).toBe("UNKNOWN");
  });

  it("should handle very large numbers", () => {
    expect(sort(1e6, 1e6, 1e6, 15)).toBe("SPECIAL");
  });

  it("should handle very small decimal numbers", () => {
    expect(sort(0.0001, 0.0001, 0.0001, 0.0001)).toBe("STANDARD");
  });
});

describe("sort falsy testing", () => {
  falsy.forEach((falsyWidth) => {
    falsy.forEach((falsyHeight) => {
      falsy.forEach((falsyLength) => {
        falsy.forEach((falsyMass) => {
          it(`should handle combination of falsy values: [${falsyWidth}, ${falsyHeight}, ${falsyLength}, ${falsyMass}]`, () => {
            // @ts-expect-error accept bad types for test
            expect(sort(falsyWidth, falsyHeight, falsyLength, falsyMass)).toBe(
              "UNKNOWN",
            );
          });
        });
      });
    });
  });
});
