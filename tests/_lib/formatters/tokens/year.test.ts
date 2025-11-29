import { describe, it, expect } from "vitest";
import { formatYear } from "../../../../src/_lib/formatters/tokens/year";

describe("formatYear (current implementation)", () => {
  it.each([
    { year: 2025, token: "yyyy", expected: "2025" },
    { year: 2025, token: "yyy", expected: "2025" }, // date-fns: minimum 4 digits
    { year: 2025, token: "yy", expected: "25" },
    { year: 2025, token: "y", expected: "2025" },

    { year: 1, token: "yyyy", expected: "0001" },
    { year: 1, token: "yyy", expected: "0001" },
    { year: 1, token: "yy", expected: "01" },
    { year: 1, token: "y", expected: "1" },

    { year: 9, token: "yyyy", expected: "0009" },
    { year: 9, token: "yyy", expected: "0009" }, // date-fns: yyy pads to 4 digits
    { year: 9, token: "yy", expected: "09" },
    { year: 9, token: "y", expected: "9" },

    { year: 12, token: "yyyy", expected: "0012" },
    { year: 12, token: "yyy", expected: "0012" }, // date-fns: yyy pads to 4 digits
    { year: 12, token: "yy", expected: "12" },
    { year: 12, token: "y", expected: "12" },

    { year: 123, token: "yyyy", expected: "0123" },
    { year: 123, token: "yyy", expected: "0123" }, // date-fns: yyy pads to 4 digits
    { year: 123, token: "yy", expected: "23" },
    { year: 123, token: "y", expected: "123" },

    { year: 12345, token: "yyyy", expected: "12345" },
    { year: 12345, token: "yyy", expected: "12345" }, // date-fns: yyy pads to 4 digits
    { year: 12345, token: "yy", expected: "45" },
    { year: 12345, token: "y", expected: "12345" },

    { year: 0, token: "yyyy", expected: "0001" },
    { year: 0, token: "yyy", expected: "0001" }, // date-fns: yyy pads to 4 digits
    { year: 0, token: "yy", expected: "01" },
    { year: 0, token: "y", expected: "1" },

    { year: -1, token: "yyyy", expected: "0002" },
    { year: -1, token: "yyy", expected: "0002" }, // date-fns: yyy pads to 4 digits
    { year: -1, token: "yy", expected: "02" },
    { year: -1, token: "y", expected: "2" },

    { year: -998, token: "yyyy", expected: "0999" },
    { year: -998, token: "yyy", expected: "0999" }, // date-fns: yyy pads to 4 digits
    { year: -998, token: "yy", expected: "99" },
    { year: -998, token: "y", expected: "999" },
  ])("year=$year token=$token => $expected", ({ year, token, expected }) => {
    const d = new Date(0, 0, 1);
    d.setFullYear(year);
    expect(formatYear(d, token)).toBe(expected);
  });
});
