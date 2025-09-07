import { describe, it, expect } from "vitest";
import { formatEra } from "../../../../src/_lib/formatters/tokens/era";

describe("formatEra", () => {
  it.each([
    { year: 2025, token: "G", expected: "AD" },
    { year: 1, token: "G", expected: "AD" },
    { year: 0, token: "G", expected: "BC" },
    { year: -1, token: "G", expected: "BC" },
    { year: -44, token: "G", expected: "BC" },
  ])("year=$year token=$token => $expected", ({ year, token, expected }) => {
    const d = new Date(0, 0, 1);
    d.setFullYear(year);
    expect(formatEra(d, token)).toBe(expected);
  });
});
