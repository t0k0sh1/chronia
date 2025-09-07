import { describe, it, expect } from "vitest";
import { formatMinute } from "../../../../src/_lib/formatters/tokens/minute";

describe("formatMinute", () => {
  it.each([
    { minute: 0, token: "m", expected: "0" },
    { minute: 0, token: "mm", expected: "00" },
    { minute: 5, token: "m", expected: "5" },
    { minute: 5, token: "mm", expected: "05" },
    { minute: 59, token: "m", expected: "59" },
    { minute: 59, token: "mm", expected: "59" },
  ])(
    "minute=$minute token=$token => $expected",
    ({ minute, token, expected }) => {
      const d = new Date(2025, 0, 1, 0, minute);
      expect(formatMinute(d, token)).toBe(expected);
    },
  );
});
