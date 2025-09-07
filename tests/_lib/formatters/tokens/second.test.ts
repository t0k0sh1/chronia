import { describe, it, expect } from "vitest";
import { formatSecond } from "../../../../src/_lib/formatters/tokens/second";

describe("formatSecond", () => {
  it.each([
    { second: 0, token: "s", expected: "0" },
    { second: 0, token: "ss", expected: "00" },
    { second: 7, token: "s", expected: "7" },
    { second: 7, token: "ss", expected: "07" },
    { second: 59, token: "s", expected: "59" },
    { second: 59, token: "ss", expected: "59" },
  ])(
    "second=$second token=$token => $expected",
    ({ second, token, expected }) => {
      const d = new Date(2025, 0, 1, 0, 0, second);
      expect(formatSecond(d, token)).toBe(expected);
    },
  );
});
