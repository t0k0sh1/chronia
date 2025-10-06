import { describe, it, expect } from "vitest";
import { formatHour } from "../../../../src/_lib/formatters/tokens/hour";

describe("formatHour", () => {
  it.each([
    { hour: 0, token: "H", expected: "0" },
    { hour: 0, token: "HH", expected: "00" },
    { hour: 0, token: "h", expected: "12" }, // 12-hour clock special case
    { hour: 0, token: "hh", expected: "12" },

    { hour: 9, token: "H", expected: "9" },
    { hour: 9, token: "HH", expected: "09" },
    { hour: 9, token: "h", expected: "9" },
    { hour: 9, token: "hh", expected: "09" },

    { hour: 12, token: "H", expected: "12" },
    { hour: 12, token: "HH", expected: "12" },
    { hour: 12, token: "h", expected: "12" },
    { hour: 12, token: "hh", expected: "12" },

    { hour: 23, token: "H", expected: "23" },
    { hour: 23, token: "HH", expected: "23" },
    { hour: 23, token: "h", expected: "11" },
    { hour: 23, token: "hh", expected: "11" },

    // Default case (unknown token)
    { hour: 15, token: "HHH", expected: "15" },
  ])("hour=$hour token=$token => $expected", ({ hour, token, expected }) => {
    const d = new Date(2025, 0, 1, hour);
    expect(formatHour(d, token)).toBe(expected);
  });
});
