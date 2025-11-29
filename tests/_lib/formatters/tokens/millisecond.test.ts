import { describe, it, expect } from "vitest";
import { formatMillisecond } from "../../../../src/_lib/formatters/tokens/millisecond";

describe("formatMillisecond", () => {
  it.each([
    { ms: 0, token: "S", expected: "0" },
    { ms: 7, token: "S", expected: "0" }, // Math.floor(7/100) = 0
    { ms: 7, token: "SS", expected: "00" }, // Math.floor(7/10) = 0, padStart(2) = "00"
    { ms: 7, token: "SSS", expected: "007" },

    { ms: 45, token: "S", expected: "0" }, // Math.floor(45/100) = 0
    { ms: 45, token: "SS", expected: "04" }, // Math.floor(45/10) = 4, padStart(2) = "04"
    { ms: 45, token: "SSS", expected: "045" },

    { ms: 789, token: "S", expected: "7" },
    { ms: 789, token: "SS", expected: "78" },
    { ms: 789, token: "SSS", expected: "789" },
  ])("ms=$ms token=$token => $expected", ({ ms, token, expected }) => {
    const d = new Date(2025, 0, 1, 0, 0, 0, ms);
    expect(formatMillisecond(d, token)).toBe(expected);
  });
});
