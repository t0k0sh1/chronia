import { describe, it, expect } from "vitest";
import { formatMonth } from "../../../../src/_lib/formatters/tokens/month";

describe("formatMonth", () => {
  it.each([
    { month: 0, token: "M", expected: "1" }, // Jan
    { month: 0, token: "MM", expected: "01" },
    { month: 8, token: "M", expected: "9" }, // Sep
    { month: 8, token: "MM", expected: "09" },
    { month: 11, token: "M", expected: "12" }, // Dec
    { month: 11, token: "MM", expected: "12" },
  ])("month=$month token=$token => $expected", ({ month, token, expected }) => {
    const d = new Date(2025, month, 1);
    expect(formatMonth(d, token)).toBe(expected);
  });
});
