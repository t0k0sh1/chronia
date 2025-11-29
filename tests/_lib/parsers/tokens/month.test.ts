import { describe, it, expect } from "vitest";
import { parseMonth } from "../../../../src/_lib/parsers/tokens/month";
import { DateComponents, Locale } from "../../../../src/types";

describe("parseMonth", () => {
  const createDateComponents = (): DateComponents => ({
    year: 2000,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    isPM: false,
    hours12: null,
  });

  const mockLocale: Locale = {
    era: {
      narrow: ["B", "A"],
      abbr: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    },
    month: {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbr: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    weekday: {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      abbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    dayPeriod: {
      narrow: ["a", "p"],
      abbr: ["AM", "PM"],
      wide: ["AM (morning)", "PM (afternoon)"],
    },
  };

  describe("M pattern (single digit month)", () => {
    it.each([
      ["1", 0, 1, 0],   // January = month 0
      ["2", 0, 1, 1],   // February = month 1
      ["9", 0, 1, 8],   // September = month 8
      ["12", 0, 2, 11], // December = month 11
      ["1x", 0, 1, 0],  // Should stop at non-digit
    ])("parses %s at position %d, consumes %d chars, month=%d", (input, position, expectedLength, expectedMonth) => {
      const dateComponents = createDateComponents();
      const result = parseMonth(input, position, "M", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + expectedLength);
      expect(dateComponents.month).toBe(expectedMonth);
    });

    it("returns null for invalid month values", () => {
      const dateComponents = createDateComponents();

      expect(parseMonth("0", 0, "M", undefined, dateComponents)).toBeNull();
      expect(parseMonth("13", 0, "M", undefined, dateComponents)).toBeNull();
      expect(parseMonth("99", 0, "M", undefined, dateComponents)).toBeNull();
    });

    it("returns null for no digits", () => {
      const dateComponents = createDateComponents();
      const result = parseMonth("abc", 0, "M", undefined, dateComponents);
      expect(result).toBeNull();
    });
  });

  describe("MM pattern (two-digit month)", () => {
    it.each([
      ["01", 0, 0],  // January = month 0
      ["02", 0, 1],  // February = month 1
      ["12", 0, 11], // December = month 11
    ])("parses %s as month %d", (input, position, expectedMonth) => {
      const dateComponents = createDateComponents();
      const result = parseMonth(input, position, "MM", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(position + 2);
      expect(dateComponents.month).toBe(expectedMonth);
    });

    it("returns null for invalid formats or values", () => {
      const dateComponents = createDateComponents();

      expect(parseMonth("1", 0, "MM", undefined, dateComponents)).toBeNull(); // Not 2 digits
      expect(parseMonth("00", 0, "MM", undefined, dateComponents)).toBeNull(); // Invalid month
      expect(parseMonth("13", 0, "MM", undefined, dateComponents)).toBeNull(); // Invalid month
      expect(parseMonth("a1", 0, "MM", undefined, dateComponents)).toBeNull(); // Not digits
    });
  });

  describe("MMM pattern (abbreviated month)", () => {
    describe("with localization", () => {
      it.each([
        ["Jan", 0, 0],  // January = month 0
        ["Feb", 0, 1],  // February = month 1
        ["Mar", 0, 2],  // March = month 2
        ["Dec", 0, 11], // December = month 11
      ])("parses localized %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMM", mockLocale, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("without localization (English fallback)", () => {
      it.each([
        ["Jan", 0, 0],  // January = month 0
        ["Feb", 0, 1],  // February = month 1
        ["Mar", 0, 2],  // March = month 2
        ["Apr", 0, 3],  // April = month 3
        ["May", 0, 4],  // May = month 4
        ["Jun", 0, 5],  // June = month 5
        ["Jul", 0, 6],  // July = month 6
        ["Aug", 0, 7],  // August = month 7
        ["Sep", 0, 8],  // September = month 8
        ["Oct", 0, 9],  // October = month 9
        ["Nov", 0, 10], // November = month 10
        ["Dec", 0, 11], // December = month 11
      ])("parses English %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });

      it("returns null for invalid month names", () => {
        const dateComponents = createDateComponents();

        expect(parseMonth("Xyz", 0, "MMM", undefined, dateComponents)).toBeNull();
        expect(parseMonth("123", 0, "MMM", undefined, dateComponents)).toBeNull();
      });
    });
  });

  describe("MMMM pattern (full month name)", () => {
    describe("with localization", () => {
      it.each([
        ["January", 0, 0],
        ["February", 0, 1],
        ["December", 0, 11],
      ])("parses localized %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMMM", mockLocale, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("without localization (English fallback)", () => {
      it.each([
        ["January", 0, 0],
        ["February", 0, 1],
        ["March", 0, 2],
        ["April", 0, 3],
        ["May", 0, 4],
        ["June", 0, 5],
        ["July", 0, 6],
        ["August", 0, 7],
        ["September", 0, 8],
        ["October", 0, 9],
        ["November", 0, 10],
        ["December", 0, 11],
      ])("parses English %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });
  });

  describe("MMMMM pattern (narrow month)", () => {
    describe("with localization", () => {
      it.each([
        ["J", 0, 0],  // January
        ["F", 0, 1],  // February
        ["M", 0, 2],  // March
        ["A", 0, 3],  // April
        ["D", 0, 11], // December
      ])("parses localized narrow %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMMMM", mockLocale, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("without localization (English fallback)", () => {
      it.each([
        ["J", 0, 0],  // January
        ["F", 0, 1],  // February
        ["M", 0, 2],  // March
        ["A", 0, 3],  // April
        ["D", 0, 11], // December
      ])("parses English narrow %s as month %d", (input, position, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, position, "MMMMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(position + input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });
  });

  describe("position handling", () => {
    it("parses at different positions", () => {
      const dateComponents = createDateComponents();
      const result = parseMonth("abc05def", 3, "MM", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(4); // May = month 4
    });

    it("handles end of string", () => {
      const dateComponents = createDateComponents();
      const result = parseMonth("Dec", 0, "MMM", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(3);
      expect(dateComponents.month).toBe(11);
    });
  });

  describe("case-insensitive matching", () => {
    describe("MMM pattern (abbreviated)", () => {
      it.each([
        ["jan", 0],  // lowercase
        ["JAN", 0],  // uppercase
        ["Jan", 0],  // mixed case
        ["feb", 1],  // lowercase
        ["FEB", 1],  // uppercase
        ["dec", 11], // lowercase
        ["DEC", 11], // uppercase
      ])("parses %s as month %d (case-insensitive)", (input, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, 0, "MMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(3);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("MMMM pattern (full name)", () => {
      it.each([
        ["january", 0],   // lowercase
        ["JANUARY", 0],   // uppercase
        ["January", 0],   // mixed case
        ["february", 1],  // lowercase
        ["FEBRUARY", 1],  // uppercase
        ["december", 11], // lowercase
        ["DECEMBER", 11], // uppercase
      ])("parses %s as month %d (case-insensitive)", (input, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, 0, "MMMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(input.length);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("MMMMM pattern (narrow)", () => {
      it.each([
        ["j", 0],  // lowercase
        ["J", 0],  // uppercase
        ["f", 1],  // lowercase
        ["F", 1],  // uppercase
        ["d", 11], // lowercase
        ["D", 11], // uppercase
      ])("parses %s as month %d (case-insensitive)", (input, expectedMonth) => {
        const dateComponents = createDateComponents();
        const result = parseMonth(input, 0, "MMMMM", undefined, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(1);
        expect(dateComponents.month).toBe(expectedMonth);
      });
    });

    describe("with localization", () => {
      it("parses localized month names case-insensitively", () => {
        const dateComponents = createDateComponents();
        const result = parseMonth("jan", 0, "MMM", mockLocale, dateComponents);

        expect(result).not.toBeNull();
        expect(result!.position).toBe(3);
        expect(dateComponents.month).toBe(0);
      });
    });
  });

  describe("edge cases", () => {
    it("prefers longer matches first", () => {
      const dateComponents = createDateComponents();
      // "March" should match before "Mar"
      const result = parseMonth("March", 0, "MMMM", undefined, dateComponents);

      expect(result).not.toBeNull();
      expect(result!.position).toBe(5);
      expect(dateComponents.month).toBe(2);
    });

    it("returns null for empty numeric string", () => {
      const dateComponents = createDateComponents();
      const result = parseMonth("abc", 0, "M", undefined, dateComponents);
      expect(result).toBeNull();
    });

    it("returns null when locale text format doesn't match", () => {
      const chineseLocale: Locale = {
        era: {
          narrow: ["前", "公"],
          abbr: ["公元前", "公元"],
          wide: ["公元前", "公元"],
        },
        month: {
          narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          abbr: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        },
        weekday: {
          narrow: ["日", "一", "二", "三", "四", "五", "六"],
          abbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
          wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        },
        dayPeriod: {
          narrow: ["上", "下"],
          abbr: ["上午", "下午"],
          wide: ["上午", "下午"],
        },
      };
      const dateComponents = createDateComponents();
      const result = parseMonth("January", 0, "MMMM", chineseLocale, dateComponents);
      expect(result).toBeNull();
    });
  });
});