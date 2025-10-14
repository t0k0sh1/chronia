import { describe, it, expect } from "vitest";
import { compare } from "../../src/compare";

describe("CompareOptions API Contracts", () => {
  const earlier = new Date("2024-01-01");
  const later = new Date("2024-01-02");

  // T003: Contract 1 - Default Behavior (Omitted Parameter)
  describe("Contract 1: Default Behavior (Omitted Parameter)", () => {
    it("should default to ascending order when options omitted", () => {
      expect(compare(earlier, later)).toBe(-1);
      expect(compare(later, earlier)).toBe(1);
      expect(compare(earlier, earlier)).toBe(0);
    });

    it("should match explicit ASC behavior", () => {
      expect(compare(earlier, later)).toBe(
        compare(earlier, later, { order: "ASC" }),
      );
    });
  });

  // T004: Contract 2 - Default Behavior (Empty Options Object)
  describe("Contract 2: Default Behavior (Empty Options Object)", () => {
    it("should default to ascending order with empty object", () => {
      expect(compare(earlier, later, {})).toBe(-1);
    });

    it("should match omitted parameter behavior", () => {
      expect(compare(earlier, later, {})).toBe(compare(earlier, later));
    });
  });

  // T005: Contract 3 - Explicit Ascending Order
  describe("Contract 3: Explicit Ascending Order", () => {
    it("should return -1 when first date is earlier", () => {
      expect(compare(earlier, later, { order: "ASC" })).toBe(-1);
    });

    it("should return 1 when first date is later", () => {
      expect(compare(later, earlier, { order: "ASC" })).toBe(1);
    });

    it("should return 0 when dates are equal", () => {
      expect(compare(earlier, earlier, { order: "ASC" })).toBe(0);
    });
  });

  // T006: Contract 4 - Explicit Descending Order
  describe("Contract 4: Explicit Descending Order", () => {
    it("should return 1 when first date is earlier (inverted)", () => {
      expect(compare(earlier, later, { order: "DESC" })).toBe(1);
    });

    it("should return -1 when first date is later (inverted)", () => {
      expect(compare(later, earlier, { order: "DESC" })).toBe(-1);
    });

    it("should return 0 when dates are equal", () => {
      expect(compare(earlier, earlier, { order: "DESC" })).toBe(0);
    });

    it("should invert ASC results", () => {
      expect(compare(earlier, later, { order: "DESC" })).toBe(
        -compare(earlier, later, { order: "ASC" }),
      );
    });
  });

  // T007: Contract 5 - Case-Insensitive Order Values
  describe("Contract 5: Case-Insensitive Order Values", () => {
    it("should handle lowercase 'desc'", () => {
      // @ts-expect-error Testing runtime case-insensitivity
      expect(compare(earlier, later, { order: "desc" })).toBe(1);
    });

    it("should handle lowercase 'asc'", () => {
      // @ts-expect-error Testing runtime case-insensitivity
      expect(compare(earlier, later, { order: "asc" })).toBe(-1);
    });

    it("should handle mixed case", () => {
      // @ts-expect-error Testing runtime case-insensitivity
      expect(compare(earlier, later, { order: "Desc" })).toBe(1);
    });
  });

  // T008: Contract 6 - Invalid Order Values Default to ASC
  describe("Contract 6: Invalid Order Values Default to ASC", () => {
    it("should default to ASC for invalid string", () => {
      // @ts-expect-error Testing invalid order value
      expect(compare(earlier, later, { order: "invalid" })).toBe(-1);
    });

    it("should match ASC behavior for invalid value", () => {
      // @ts-expect-error Testing invalid order value
      const invalidResult = compare(earlier, later, { order: "xyz" });
      expect(invalidResult).toBe(compare(earlier, later, { order: "ASC" }));
    });
  });

  // T009: Contract 7 - Null/Undefined Options Default to ASC
  describe("Contract 7: Null/Undefined Options Default to ASC", () => {
    it("should handle undefined options", () => {
      expect(compare(earlier, later, undefined)).toBe(-1);
    });

    it("should handle null options", () => {
      // @ts-expect-error Testing null handling
      expect(compare(earlier, later, null)).toBe(-1);
    });

    it("should match default behavior", () => {
      // @ts-expect-error Testing null handling
      expect(compare(earlier, later, null)).toBe(compare(earlier, later));
    });
  });

  // T010: Contract 8 - Unknown Properties Are Ignored
  describe("Contract 8: Unknown Properties Are Ignored", () => {
    it("should ignore excess properties", () => {
      // @ts-expect-error Testing excess properties
      const result = compare(earlier, later, {
        order: "DESC",
        unknown: true,
        extra: "value",
      });
      expect(result).toBe(1);
    });

    it("should match clean options behavior", () => {
      // @ts-expect-error Testing excess properties
      expect(compare(earlier, later, { order: "DESC", unknown: true })).toBe(
        compare(earlier, later, { order: "DESC" }),
      );
    });
  });

  // T011: Contract 9 - Invalid Date Inputs Return NaN
  describe("Contract 9: Invalid Date Inputs Return NaN", () => {
    const invalidDate = new Date("invalid");
    const validDate = new Date("2024-01-01");

    it("should return NaN for invalid first date", () => {
      expect(compare(invalidDate, validDate, { order: "ASC" })).toBeNaN();
    });

    it("should return NaN for invalid second date", () => {
      expect(compare(validDate, invalidDate, { order: "DESC" })).toBeNaN();
    });

    it("should return NaN for both invalid dates", () => {
      expect(compare(invalidDate, invalidDate, {})).toBeNaN();
    });
  });

  // T012: Contract 10 - Maintains Array.sort() Compatibility
  describe("Contract 10: Maintains Array.sort() Compatibility", () => {
    it("should sort in ascending order", () => {
      const dates = [
        new Date("2024-01-03"),
        new Date("2024-01-01"),
        new Date("2024-01-02"),
      ];
      dates.sort((a, b) => compare(a, b));

      expect(dates[0].toISOString()).toBe("2024-01-01T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-03T00:00:00.000Z");
    });

    it("should sort in descending order", () => {
      const dates = [
        new Date("2024-01-01"),
        new Date("2024-01-03"),
        new Date("2024-01-02"),
      ];
      dates.sort((a, b) => compare(a, b, { order: "DESC" }));

      expect(dates[0].toISOString()).toBe("2024-01-03T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });
  });

  // Contract 11 - Direct String Argument (JavaScript Flexibility)
  describe("Contract 11: Direct String Argument (JavaScript Flexibility)", () => {
    it("should accept string 'ASC' as third argument", () => {
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "ASC")).toBe(-1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(later, earlier, "ASC")).toBe(1);
    });

    it("should accept string 'DESC' as third argument", () => {
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "DESC")).toBe(1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(later, earlier, "DESC")).toBe(-1);
    });

    it("should handle case-insensitive direct strings", () => {
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "asc")).toBe(-1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "desc")).toBe(1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "Asc")).toBe(-1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "Desc")).toBe(1);
    });

    it("should default invalid direct strings to ASC", () => {
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "invalid")).toBe(-1);
      // @ts-expect-error Testing direct string for JS flexibility
      expect(compare(earlier, later, "xyz")).toBe(-1);
    });

    it("should work with Array.sort() using direct strings", () => {
      const dates = [
        new Date("2024-01-01"),
        new Date("2024-01-03"),
        new Date("2024-01-02"),
      ];
      // @ts-expect-error Testing direct string for JS flexibility
      dates.sort((a, b) => compare(a, b, "DESC"));

      expect(dates[0].toISOString()).toBe("2024-01-03T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });
  });
});
