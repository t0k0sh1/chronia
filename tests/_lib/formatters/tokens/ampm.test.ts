import { describe, it, expect } from "vitest";
import { formatAmPm } from "../../../../src/_lib/formatters/tokens/ampm";

describe("formatAmPm", () => {
  it.each([
    { hour: 0, expected: "AM" },
    { hour: 11, expected: "AM" },
    { hour: 12, expected: "PM" },
    { hour: 23, expected: "PM" },
  ])("hour=$hour => $expected", ({ hour, expected }) => {
    const d = new Date(2025, 0, 1, hour);
    expect(formatAmPm(d, "a")).toBe(expected);
  });
});
