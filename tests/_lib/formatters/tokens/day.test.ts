import { describe, it, expect } from "vitest";
import { formatDay } from "../../../../src/_lib/formatters/tokens/day";

describe("formatDay", () => {
  it.each([
    { day: 1, token: "d", expected: "1" },
    { day: 1, token: "dd", expected: "01" },
    { day: 9, token: "d", expected: "9" },
    { day: 9, token: "dd", expected: "09" },
    { day: 15, token: "d", expected: "15" },
    { day: 15, token: "dd", expected: "15" },
    { day: 31, token: "d", expected: "31" },
    { day: 31, token: "dd", expected: "31" },
  ])("day=$day token=$token => $expected", ({ day, token, expected }) => {
    const d = new Date(2025, 0, day);
    expect(formatDay(d, token)).toBe(expected);
  });
});
