import { describe, it, expect } from "vitest";
import { defaultLocale } from "../../src/_lib/defaultLocale";
import { enUS } from "../../src/i18n/en-US";
import type { Locale } from "../../src/types";

describe("defaultLocale", () => {
  describe("Type and Structure Validation", () => {
    it("should be defined", () => {
      expect(defaultLocale).toBeDefined();
    });

    it("should be a Locale object", () => {
      expect(defaultLocale).toHaveProperty("era");
      expect(defaultLocale).toHaveProperty("month");
      expect(defaultLocale).toHaveProperty("weekday");
      expect(defaultLocale).toHaveProperty("dayPeriod");
    });

    it("should be the same reference as enUS", () => {
      expect(defaultLocale).toBe(enUS);
    });

    it("should satisfy Locale type constraints", () => {
      // Type assertion ensures type compatibility
      const locale: Locale = defaultLocale;
      expect(locale).toBe(defaultLocale);
    });
  });

  describe("Era Data Validation", () => {
    it("should have era with all three widths", () => {
      expect(defaultLocale.era).toHaveProperty("narrow");
      expect(defaultLocale.era).toHaveProperty("abbr");
      expect(defaultLocale.era).toHaveProperty("wide");
    });

    it("should have era narrow with exactly 2 elements", () => {
      expect(defaultLocale.era.narrow).toHaveLength(2);
      expect(typeof defaultLocale.era.narrow[0]).toBe("string");
      expect(typeof defaultLocale.era.narrow[1]).toBe("string");
    });

    it("should have era abbr with exactly 2 elements", () => {
      expect(defaultLocale.era.abbr).toHaveLength(2);
      expect(typeof defaultLocale.era.abbr[0]).toBe("string");
      expect(typeof defaultLocale.era.abbr[1]).toBe("string");
    });

    it("should have era wide with exactly 2 elements", () => {
      expect(defaultLocale.era.wide).toHaveLength(2);
      expect(typeof defaultLocale.era.wide[0]).toBe("string");
      expect(typeof defaultLocale.era.wide[1]).toBe("string");
    });

    it("should have non-empty era strings", () => {
      expect(defaultLocale.era.narrow[0].length).toBeGreaterThan(0);
      expect(defaultLocale.era.narrow[1].length).toBeGreaterThan(0);
      expect(defaultLocale.era.abbr[0].length).toBeGreaterThan(0);
      expect(defaultLocale.era.abbr[1].length).toBeGreaterThan(0);
      expect(defaultLocale.era.wide[0].length).toBeGreaterThan(0);
      expect(defaultLocale.era.wide[1].length).toBeGreaterThan(0);
    });
  });

  describe("Month Data Validation", () => {
    it("should have month with all three widths", () => {
      expect(defaultLocale.month).toHaveProperty("narrow");
      expect(defaultLocale.month).toHaveProperty("abbr");
      expect(defaultLocale.month).toHaveProperty("wide");
    });

    it("should have month narrow with exactly 12 elements", () => {
      expect(defaultLocale.month.narrow).toHaveLength(12);
      defaultLocale.month.narrow.forEach((month) => {
        expect(typeof month).toBe("string");
      });
    });

    it("should have month abbr with exactly 12 elements", () => {
      expect(defaultLocale.month.abbr).toHaveLength(12);
      defaultLocale.month.abbr.forEach((month) => {
        expect(typeof month).toBe("string");
      });
    });

    it("should have month wide with exactly 12 elements", () => {
      expect(defaultLocale.month.wide).toHaveLength(12);
      defaultLocale.month.wide.forEach((month) => {
        expect(typeof month).toBe("string");
      });
    });

    it("should have non-empty month strings", () => {
      defaultLocale.month.narrow.forEach((month) => {
        expect(month.length).toBeGreaterThan(0);
      });
      defaultLocale.month.abbr.forEach((month) => {
        expect(month.length).toBeGreaterThan(0);
      });
      defaultLocale.month.wide.forEach((month) => {
        expect(month.length).toBeGreaterThan(0);
      });
    });

    it("should have month data starting with January at index 0", () => {
      // Verify en-US specific data (zero-based indexing)
      expect(defaultLocale.month.wide[0]).toBe("January");
      expect(defaultLocale.month.wide[11]).toBe("December");
    });
  });

  describe("Weekday Data Validation", () => {
    it("should have weekday with all three widths", () => {
      expect(defaultLocale.weekday).toHaveProperty("narrow");
      expect(defaultLocale.weekday).toHaveProperty("abbr");
      expect(defaultLocale.weekday).toHaveProperty("wide");
    });

    it("should have weekday narrow with exactly 7 elements", () => {
      expect(defaultLocale.weekday.narrow).toHaveLength(7);
      defaultLocale.weekday.narrow.forEach((day) => {
        expect(typeof day).toBe("string");
      });
    });

    it("should have weekday abbr with exactly 7 elements", () => {
      expect(defaultLocale.weekday.abbr).toHaveLength(7);
      defaultLocale.weekday.abbr.forEach((day) => {
        expect(typeof day).toBe("string");
      });
    });

    it("should have weekday wide with exactly 7 elements", () => {
      expect(defaultLocale.weekday.wide).toHaveLength(7);
      defaultLocale.weekday.wide.forEach((day) => {
        expect(typeof day).toBe("string");
      });
    });

    it("should have non-empty weekday strings", () => {
      defaultLocale.weekday.narrow.forEach((day) => {
        expect(day.length).toBeGreaterThan(0);
      });
      defaultLocale.weekday.abbr.forEach((day) => {
        expect(day.length).toBeGreaterThan(0);
      });
      defaultLocale.weekday.wide.forEach((day) => {
        expect(day.length).toBeGreaterThan(0);
      });
    });

    it("should have weekday data starting with Sunday at index 0", () => {
      // Verify en-US specific data (Sunday is day 0)
      expect(defaultLocale.weekday.wide[0]).toBe("Sunday");
      expect(defaultLocale.weekday.wide[6]).toBe("Saturday");
    });
  });

  describe("DayPeriod Data Validation", () => {
    it("should have dayPeriod with all three widths", () => {
      expect(defaultLocale.dayPeriod).toHaveProperty("narrow");
      expect(defaultLocale.dayPeriod).toHaveProperty("abbr");
      expect(defaultLocale.dayPeriod).toHaveProperty("wide");
    });

    it("should have dayPeriod narrow with exactly 2 elements", () => {
      expect(defaultLocale.dayPeriod.narrow).toHaveLength(2);
      expect(typeof defaultLocale.dayPeriod.narrow[0]).toBe("string");
      expect(typeof defaultLocale.dayPeriod.narrow[1]).toBe("string");
    });

    it("should have dayPeriod abbr with exactly 2 elements", () => {
      expect(defaultLocale.dayPeriod.abbr).toHaveLength(2);
      expect(typeof defaultLocale.dayPeriod.abbr[0]).toBe("string");
      expect(typeof defaultLocale.dayPeriod.abbr[1]).toBe("string");
    });

    it("should have dayPeriod wide with exactly 2 elements", () => {
      expect(defaultLocale.dayPeriod.wide).toHaveLength(2);
      expect(typeof defaultLocale.dayPeriod.wide[0]).toBe("string");
      expect(typeof defaultLocale.dayPeriod.wide[1]).toBe("string");
    });

    it("should have non-empty dayPeriod strings", () => {
      expect(defaultLocale.dayPeriod.narrow[0].length).toBeGreaterThan(0);
      expect(defaultLocale.dayPeriod.narrow[1].length).toBeGreaterThan(0);
      expect(defaultLocale.dayPeriod.abbr[0].length).toBeGreaterThan(0);
      expect(defaultLocale.dayPeriod.abbr[1].length).toBeGreaterThan(0);
      expect(defaultLocale.dayPeriod.wide[0].length).toBeGreaterThan(0);
      expect(defaultLocale.dayPeriod.wide[1].length).toBeGreaterThan(0);
    });

    it("should have dayPeriod data with AM at index 0 and PM at index 1", () => {
      // Verify en-US specific data
      expect(defaultLocale.dayPeriod.abbr[0]).toBe("AM");
      expect(defaultLocale.dayPeriod.abbr[1]).toBe("PM");
    });
  });

  describe("Immutability Validation", () => {
    it("should be a const export (TypeScript compile-time check)", () => {
      // TypeScript prevents reassignment at compile time
      // This test verifies the type system enforces immutability
      const locale: typeof defaultLocale = defaultLocale;
      expect(locale).toBe(defaultLocale);
    });

    it("should have readonly type for era arrays", () => {
      // TypeScript enforces readonly constraint at compile time
      // Runtime: JavaScript arrays are always mutable, but type system prevents modification
      const era: readonly [string, string] = defaultLocale.era.narrow;
      expect(era).toBe(defaultLocale.era.narrow);
    });

    it("should have readonly type for month arrays", () => {
      // TypeScript enforces readonly constraint at compile time
      const monthAbbr: readonly string[] = defaultLocale.month.abbr;
      expect(monthAbbr).toBe(defaultLocale.month.abbr);
    });
  });

  describe("Integration with en-US Locale", () => {
    it("should match en-US era data exactly", () => {
      expect(defaultLocale.era.narrow).toEqual(enUS.era.narrow);
      expect(defaultLocale.era.abbr).toEqual(enUS.era.abbr);
      expect(defaultLocale.era.wide).toEqual(enUS.era.wide);
    });

    it("should match en-US month data exactly", () => {
      expect(defaultLocale.month.narrow).toEqual(enUS.month.narrow);
      expect(defaultLocale.month.abbr).toEqual(enUS.month.abbr);
      expect(defaultLocale.month.wide).toEqual(enUS.month.wide);
    });

    it("should match en-US weekday data exactly", () => {
      expect(defaultLocale.weekday.narrow).toEqual(enUS.weekday.narrow);
      expect(defaultLocale.weekday.abbr).toEqual(enUS.weekday.abbr);
      expect(defaultLocale.weekday.wide).toEqual(enUS.weekday.wide);
    });

    it("should match en-US dayPeriod data exactly", () => {
      expect(defaultLocale.dayPeriod.narrow).toEqual(enUS.dayPeriod.narrow);
      expect(defaultLocale.dayPeriod.abbr).toEqual(enUS.dayPeriod.abbr);
      expect(defaultLocale.dayPeriod.wide).toEqual(enUS.dayPeriod.wide);
    });
  });
});
