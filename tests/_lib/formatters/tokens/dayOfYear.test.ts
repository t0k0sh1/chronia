import { describe, it, expect } from "vitest";
import { formatDayOfYear } from "../../../../src/_lib/formatters/tokens/dayOfYear";

describe("formatDayOfYear", () => {
  it.each([
    { date: new Date(2025, 0, 1), token: "D", expected: "1" }, // Jan 1
    { date: new Date(2025, 0, 1), token: "DD", expected: "01" },
    { date: new Date(2025, 0, 1), token: "DDD", expected: "001" },

    { date: new Date(2025, 11, 31), token: "D", expected: "365" }, // Dec 31, not leap
    { date: new Date(2025, 11, 31), token: "DDD", expected: "365" },

    { date: new Date(2024, 1, 29), token: "D", expected: "60" }, // Leap year Feb 29
    { date: new Date(2024, 11, 31), token: "D", expected: "366" }, // Dec 31 leap year
  ])("date=$date token=$token => $expected", ({ date, token, expected }) => {
    expect(formatDayOfYear(date, token)).toBe(expected);
  });
});
