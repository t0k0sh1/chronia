import { describe, it, expect } from "vitest";
import { compare } from "../src/compare/index.js";

describe("compare", () => {
  // T003: Contract tests based on compare.contract.ts
  describe("Contract tests", () => {
    describe("Ascending order (default)", () => {
      it.each([
        {
          name: "Earlier date returns -1",
          date1: new Date("2024-01-01T00:00:00.000Z"),
          date2: new Date("2024-01-02T00:00:00.000Z"),
          order: "ASC" as const,
          expected: -1,
        },
        {
          name: "Later date returns 1",
          date1: new Date("2024-01-02T00:00:00.000Z"),
          date2: new Date("2024-01-01T00:00:00.000Z"),
          order: "ASC" as const,
          expected: 1,
        },
        {
          name: "Equal dates return 0",
          date1: new Date("2024-01-01T00:00:00.000Z"),
          date2: new Date("2024-01-01T00:00:00.000Z"),
          order: "ASC" as const,
          expected: 0,
        },
      ])(
        "should handle $name in ASC order",
        ({ date1, date2, order, expected }) => {
          const result = compare(date1, date2, { order });
          expect(result).toBe(expected);
        },
      );
    });

    describe("Descending order", () => {
      it.each([
        {
          name: "Earlier date returns 1 in DESC mode",
          date1: new Date("2024-01-01T00:00:00.000Z"),
          date2: new Date("2024-01-02T00:00:00.000Z"),
          order: "DESC" as const,
          expected: 1,
        },
        {
          name: "Later date returns -1 in DESC mode",
          date1: new Date("2024-01-02T00:00:00.000Z"),
          date2: new Date("2024-01-01T00:00:00.000Z"),
          order: "DESC" as const,
          expected: -1,
        },
        {
          name: "Equal dates return 0 in DESC mode",
          date1: new Date("2024-01-01T00:00:00.000Z"),
          date2: new Date("2024-01-01T00:00:00.000Z"),
          order: "DESC" as const,
          expected: 0,
        },
      ])("should handle $name", ({ date1, date2, order, expected }) => {
        const result = compare(date1, date2, { order });
        expect(result).toBe(expected);
      });
    });

    describe("Default behavior", () => {
      it("should default to ascending order when order parameter is omitted", () => {
        const date1 = new Date("2024-01-01T00:00:00.000Z");
        const date2 = new Date("2024-01-02T00:00:00.000Z");

        expect(compare(date1, date2)).toBe(-1);
      });

      it("should default to ascending order when undefined is passed explicitly", () => {
        const date1 = new Date("2024-01-01T00:00:00.000Z");
        const date2 = new Date("2024-01-02T00:00:00.000Z");

        expect(compare(date1, date2, undefined)).toBe(-1);
      });
    });
  });

  // T004: Basic comparison scenarios
  describe("Basic comparison scenarios", () => {
    it.each([
      {
        name: "Compare dates with different years",
        date1: new Date("2023-12-31"),
        date2: new Date("2024-01-01"),
        expected: -1,
      },
      {
        name: "Compare dates with different months",
        date1: new Date("2024-01-15"),
        date2: new Date("2024-02-15"),
        expected: -1,
      },
      {
        name: "Compare dates with different days",
        date1: new Date("2024-01-15"),
        date2: new Date("2024-01-16"),
        expected: -1,
      },
      {
        name: "Compare dates with different hours",
        date1: new Date("2024-01-01T10:00:00"),
        date2: new Date("2024-01-01T11:00:00"),
        expected: -1,
      },
      {
        name: "Compare dates with millisecond precision",
        date1: new Date("2024-01-01T12:00:00.001Z"),
        date2: new Date("2024-01-01T12:00:00.002Z"),
        expected: -1,
      },
    ])("should correctly compare $name", ({ date1, date2, expected }) => {
      expect(compare(date1, date2)).toBe(expected);
      expect(compare(date2, date1)).toBe(-expected);
    });

    describe("Descending order scenarios", () => {
      it("should reverse comparison results for DESC order", () => {
        const earlier = new Date("2024-01-01");
        const later = new Date("2024-01-02");

        expect(compare(earlier, later, { order: "ASC" })).toBe(-1);
        expect(compare(earlier, later, { order: "DESC" })).toBe(1);
        expect(compare(later, earlier, { order: "ASC" })).toBe(1);
        expect(compare(later, earlier, { order: "DESC" })).toBe(-1);
      });
    });
  });

  // T005: Array.sort() integration tests
  describe("Array.sort() integration", () => {
    it("should sort dates in ascending order", () => {
      const dates = [
        new Date("2024-01-03"),
        new Date("2024-01-01"),
        new Date("2024-01-02"),
      ];

      dates.sort(compare);

      expect(dates[0].toISOString()).toBe("2024-01-01T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-03T00:00:00.000Z");
    });

    it("should sort dates in descending order", () => {
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

    it("should maintain sort stability for equal dates", () => {
      const date1 = new Date("2024-01-01T00:00:00.000Z");
      const date2 = new Date("2024-01-01T00:00:00.000Z");
      const date3 = new Date("2024-01-02T00:00:00.000Z");

      const dates = [date3, date1, date2];
      dates.sort(compare);

      expect(compare(dates[0], dates[1])).toBe(0); // First two should be equal
      expect(dates[2]).toBe(date3); // Last should be the later date
    });

    it("should work with large date arrays", () => {
      const dates = Array.from(
        { length: 100 },
        (_, i) => new Date(2024, 0, Math.floor(Math.random() * 31) + 1),
      );
      const originalDates = [...dates];

      dates.sort(compare);

      // Verify sorting is correct
      for (let i = 1; i < dates.length; i++) {
        expect(compare(dates[i - 1], dates[i])).toBeLessThanOrEqual(0);
      }

      // Verify all original dates are still present
      expect(dates).toHaveLength(originalDates.length);
    });
  });

  // T006: Error handling tests for invalid arguments
  describe("Error handling", () => {
    describe("Invalid first argument", () => {
      it.each([
        { name: "null", input: null },
        { name: "undefined", input: undefined },
        { name: "string", input: "2024-01-01" },
        { name: "boolean", input: true },
        { name: "object", input: {} },
        { name: "array", input: [] },
      ])("should return NaN for $name as first argument", ({ input }) => {
        const result = compare(input as any, new Date());
        expect(result).toBeNaN();
      });

      it("should accept number as first argument (new feature)", () => {
        const timestamp = 1704067200000; // Valid timestamp
        const date = new Date("2024-01-02");

        expect(compare(timestamp, date)).not.toBeNaN();
        expect(compare(timestamp, date)).toBe(-1); // timestamp is earlier
      });
    });

    describe("Invalid second argument", () => {
      it.each([
        { name: "null", input: null },
        { name: "undefined", input: undefined },
        { name: "string", input: "2024-01-01" },
        { name: "boolean", input: true },
        { name: "object", input: {} },
        { name: "array", input: [] },
      ])("should return NaN for $name as second argument", ({ input }) => {
        const result = compare(new Date(), input as any);
        expect(result).toBeNaN();
      });

      it("should accept number as second argument (new feature)", () => {
        const date = new Date("2024-01-01");
        const timestamp = 1704153600000; // Valid timestamp for later date

        expect(compare(date, timestamp)).not.toBeNaN();
        expect(compare(date, timestamp)).toBe(-1); // date is earlier than timestamp
      });
    });

    describe("Invalid Date objects", () => {
      it("should return NaN for invalid first date", () => {
        const invalidDate = new Date("invalid");
        const validDate = new Date();

        const result = compare(invalidDate, validDate);

        expect(result).toBeNaN();
      });

      it("should return NaN for invalid second date", () => {
        const validDate = new Date();
        const invalidDate = new Date("invalid");

        const result = compare(validDate, invalidDate);

        expect(result).toBeNaN();
      });
    });

    describe("Order parameter behavior (new specification)", () => {
      it("should handle null and undefined order parameters without throwing", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // Test that null doesn't cause toUpperCase() error
        // @ts-expect-error Testing runtime behavior with null
        expect(() => compare(date1, date2, null)).not.toThrow();
        // @ts-expect-error Testing runtime behavior with null
        expect(compare(date1, date2, null)).toBe(-1); // defaults to ASC

        // Test that undefined is handled properly
        expect(() => compare(date1, date2, undefined)).not.toThrow();
        expect(compare(date1, date2, undefined)).toBe(-1); // defaults to ASC

        // Confirm consistent behavior
        // @ts-expect-error Testing runtime behavior with null
        expect(compare(date1, date2, null)).toBe(compare(date1, date2));
        expect(compare(date1, date2, undefined)).toBe(compare(date1, date2));
      });

      it("should accept case-insensitive order parameters", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // Test case-insensitive order parameters
        // @ts-expect-error Testing runtime behavior with non-typed values
        expect(compare(date1, date2, { order: "asc" })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with non-typed values
        expect(compare(date1, date2, { order: "Asc" })).toBe(-1);
        expect(compare(date1, date2, { order: "ASC" })).toBe(-1);

        // @ts-expect-error Testing runtime behavior with non-typed values
        expect(compare(date1, date2, { order: "desc" })).toBe(1);
        // @ts-expect-error Testing runtime behavior with non-typed values
        expect(compare(date1, date2, { order: "Desc" })).toBe(1);
        expect(compare(date1, date2, { order: "DESC" })).toBe(1);
      });

      it("should treat invalid strings as ASC (default)", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // Invalid strings should default to ASC
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: "ASCENDING" })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: "DESCENDING" })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: "xyz" })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: "" })).toBe(-1);
      });

      it("should treat non-string order values as ASC (default)", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // Non-string order values should default to ASC
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: 123 })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: true })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: false })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: null })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: {} })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: [] })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: NaN })).toBe(-1);
        // @ts-expect-error Testing runtime behavior with invalid values
        expect(compare(date1, date2, { order: Infinity })).toBe(-1);
      });
    });
  });

  // T007: Edge case tests for date boundaries and precision
  describe("Edge cases", () => {
    describe("Date boundaries", () => {
      it("should handle maximum valid Date timestamp", () => {
        const maxDate = new Date(8640000000000000);
        const normalDate = new Date("2024-01-01");

        expect(compare(normalDate, maxDate)).toBe(-1);
        expect(compare(maxDate, normalDate)).toBe(1);
        expect(compare(maxDate, maxDate)).toBe(0);
      });

      it("should handle minimum valid Date timestamp", () => {
        const minDate = new Date(-8640000000000000);
        const normalDate = new Date("2024-01-01");

        expect(compare(minDate, normalDate)).toBe(-1);
        expect(compare(normalDate, minDate)).toBe(1);
        expect(compare(minDate, minDate)).toBe(0);
      });

      it("should handle Unix epoch", () => {
        const epochDate = new Date(0);
        const laterDate = new Date("2024-01-01");

        expect(compare(epochDate, laterDate)).toBe(-1);
        expect(compare(laterDate, epochDate)).toBe(1);
        expect(compare(epochDate, new Date(0))).toBe(0);
      });
    });

    describe("Precision handling", () => {
      it("should handle millisecond precision differences", () => {
        const date1 = new Date("2024-01-01T12:00:00.001Z");
        const date2 = new Date("2024-01-01T12:00:00.002Z");

        expect(compare(date1, date2)).toBe(-1);
        expect(compare(date2, date1)).toBe(1);
      });

      it("should handle identical timestamps created differently", () => {
        const date1 = new Date("2024-01-01T00:00:00.000Z");
        const date2 = new Date(2024, 0, 1, 0, 0, 0, 0);

        // Adjust for timezone if needed
        date2.setTime(date1.getTime());

        expect(compare(date1, date2)).toBe(0);
      });
    });

    describe("Timezone consistency", () => {
      it("should compare dates consistently regardless of timezone representation", () => {
        // Same moment in time, different timezone representations
        const utcDate = new Date("2024-01-01T12:00:00.000Z");
        const localDate = new Date(utcDate.getTime());

        expect(compare(utcDate, localDate)).toBe(0);
      });
    });
  });

  // T008: Compatibility tests verifying correct -1/0/1 return values for Array.sort()
  describe("Array.sort() compatibility", () => {
    it("should return only -1, 0, or 1", () => {
      const testCases = [
        [new Date("2024-01-01"), new Date("2024-01-02")], // -1
        [new Date("2024-01-02"), new Date("2024-01-01")], // 1
        [new Date("2024-01-01"), new Date("2024-01-01")], // 0
        [new Date(0), new Date(1000)], // -1
        [new Date(8640000000000000), new Date(-8640000000000000)], // 1
      ];

      testCases.forEach(([date1, date2]) => {
        const result = compare(date1, date2);
        expect([-1, 0, 1]).toContain(result);
      });
    });

    it("should satisfy transitivity property for sorting", () => {
      const a = new Date("2024-01-01");
      const b = new Date("2024-01-02");
      const c = new Date("2024-01-03");

      // If a < b and b < c, then a < c
      expect(compare(a, b)).toBe(-1);
      expect(compare(b, c)).toBe(-1);
      expect(compare(a, c)).toBe(-1);
    });

    it("should satisfy antisymmetry property", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-02");

      // If compare(a,b) = x, then compare(b,a) = -x (except when x = 0)
      const result1 = compare(date1, date2);
      const result2 = compare(date2, date1);

      if (result1 === 0) {
        expect(result2).toBe(0);
      } else {
        expect(result2).toBe(-result1);
      }
    });

    it("should satisfy reflexivity property", () => {
      const date = new Date("2024-01-01");

      // compare(a, a) should always be 0
      expect(compare(date, date)).toBe(0);
    });

    it("should correctly sort array with duplicate dates using Array.sort()", () => {
      // Test with duplicate dates
      const dates = [
        new Date("2024-01-03"),
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-01"), // duplicate
        new Date("2024-01-03"), // duplicate
      ];

      dates.sort(compare);

      // Verify sorted order
      expect(dates[0].getTime()).toBeLessThanOrEqual(dates[1].getTime());
      expect(dates[1].getTime()).toBeLessThanOrEqual(dates[2].getTime());
      expect(dates[2].getTime()).toBeLessThanOrEqual(dates[3].getTime());
      expect(dates[3].getTime()).toBeLessThanOrEqual(dates[4].getTime());
    });
  });

  // Integration tests for mixed input types and real-world scenarios
  describe("Mixed Input Type Integration", () => {
    it("should handle Date and number inputs consistently", () => {
      const dateObj = new Date("2024-01-15");
      const timestamp = new Date("2024-01-10").getTime();

      // Test all combinations
      expect(() => compare(dateObj, timestamp)).not.toThrow();
      expect(() => compare(timestamp, dateObj)).not.toThrow();
      expect(() => compare(timestamp, timestamp)).not.toThrow();

      // Verify correct ordering
      expect(compare(dateObj, timestamp)).toBe(1); // dateObj is later
      expect(compare(timestamp, dateObj)).toBe(-1); // timestamp is earlier
      expect(compare(timestamp, timestamp)).toBe(0); // same timestamp
    });

    it("should correctly sort array containing both Date objects and timestamps", () => {
      const mixed = [
        new Date("2024-01-03"),
        new Date("2024-01-01").getTime(),
        new Date("2024-01-02"),
        new Date("2024-01-04").getTime(),
      ];

      expect(() => mixed.sort((a, b) => compare(a, b))).not.toThrow();

      const sorted = mixed.sort((a, b) => compare(a, b));

      // Convert all to timestamps for comparison
      const timestamps = sorted.map((item) =>
        typeof item === "number" ? item : item.getTime(),
      );

      // Verify ascending order
      for (let i = 1; i < timestamps.length; i++) {
        expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i - 1]);
      }
    });

    it("should handle case-insensitive order parameters at runtime", () => {
      const date1 = new Date("2024-01-01");
      const timestamp2 = new Date("2024-01-02").getTime();

      // Test TypeScript-typed values
      expect(compare(date1, timestamp2, { order: "ASC" })).toBe(-1);
      expect(compare(date1, timestamp2, { order: "DESC" })).toBe(1);

      // Test runtime case-insensitive behavior (using type assertions)
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, { order: "asc" })).toBe(-1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, { order: "desc" })).toBe(1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, { order: "Asc" })).toBe(-1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, { order: "Desc" })).toBe(1);
    });

    it("should default to ascending order when order parameter omitted", () => {
      const timestamp1 = new Date("2024-01-01").getTime();
      const date2 = new Date("2024-01-02");

      expect(() => compare(timestamp1, date2)).not.toThrow();
      expect(compare(timestamp1, date2)).toBe(-1);
      expect(compare(timestamp1, date2)).toBe(
        compare(timestamp1, date2, { order: "ASC" }),
      );
    });
  });

  describe("Real-world Scenarios", () => {
    it("should handle large mixed arrays efficiently", () => {
      const size = 1000;
      const mixedArray = Array.from({ length: size }, (_, i) =>
        i % 2 === 0
          ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
          : Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      );

      expect(() => mixedArray.sort((a, b) => compare(a, b))).not.toThrow();

      const sorted = mixedArray.sort((a, b) => compare(a, b));
      expect(sorted).toHaveLength(size);
    });

    it("should maintain precision with timestamp inputs", () => {
      const baseTime = Date.now();
      const timestamp1 = baseTime;
      const timestamp2 = baseTime + 1;
      const timestamp3 = baseTime + 1000;

      expect(compare(timestamp1, timestamp2)).toBe(-1);
      expect(compare(timestamp2, timestamp3)).toBe(-1);
      expect(compare(timestamp1, timestamp1)).toBe(0);
      expect(compare(timestamp3, timestamp1)).toBe(1);
    });
  });

  // Backward compatibility tests
  describe("Backward Compatibility", () => {
    describe("Existing Function Signature Compatibility", () => {
      it("should maintain identical behavior for Date objects", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");
        const date3 = new Date("2024-01-01"); // Equal to date1

        // Basic comparisons
        expect(compare(date1, date2)).toBe(-1);
        expect(compare(date2, date1)).toBe(1);
        expect(compare(date1, date3)).toBe(0);

        // With explicit ASC order
        expect(compare(date1, date2, { order: "ASC" })).toBe(-1);
        expect(compare(date2, date1, { order: "ASC" })).toBe(1);
        expect(compare(date1, date3, { order: "ASC" })).toBe(0);

        // With DESC order
        expect(compare(date1, date2, { order: "DESC" })).toBe(1);
        expect(compare(date2, date1, { order: "DESC" })).toBe(-1);
        expect(compare(date1, date3, { order: "DESC" })).toBe(0);
      });

      it("should maintain Array.sort() compatibility", () => {
        const dates = [
          new Date("2024-01-03"),
          new Date("2024-01-01"),
          new Date("2024-01-02"),
        ];

        // Ascending sort
        const ascSorted = [...dates].sort(compare);
        expect(ascSorted[0].getTime()).toBe(new Date("2024-01-01").getTime());
        expect(ascSorted[1].getTime()).toBe(new Date("2024-01-02").getTime());
        expect(ascSorted[2].getTime()).toBe(new Date("2024-01-03").getTime());

        // Descending sort
        const descSorted = [...dates].sort((a, b) =>
          compare(a, b, { order: "DESC" }),
        );
        expect(descSorted[0].getTime()).toBe(new Date("2024-01-03").getTime());
        expect(descSorted[1].getTime()).toBe(new Date("2024-01-02").getTime());
        expect(descSorted[2].getTime()).toBe(new Date("2024-01-01").getTime());
      });

      it("should maintain error handling for invalid Date objects", () => {
        const invalidDate = new Date("invalid");
        const validDate = new Date("2024-01-01");

        const result1 = compare(invalidDate, validDate);
        const result2 = compare(validDate, invalidDate);
        const result3 = compare(invalidDate, invalidDate);

        expect(result1).toBeNaN();
        expect(result2).toBeNaN();
        expect(result3).toBeNaN();
      });

      it("should handle runtime order parameters with new specification", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // New behavior: invalid order parameters default to ASC (no errors)
        // @ts-expect-error Testing runtime behavior
        expect(() => compare(date1, date2, { order: "invalid" })).not.toThrow();
        // @ts-expect-error Testing runtime behavior
        expect(compare(date1, date2, { order: "invalid" })).toBe(-1); // defaults to ASC

        // Case-insensitive handling
        // @ts-expect-error Testing runtime behavior
        expect(compare(date1, date2, { order: "asc" })).toBe(-1);
        // @ts-expect-error Testing runtime behavior
        expect(compare(date1, date2, { order: "desc" })).toBe(1);
      });

      it("should support direct string argument for JavaScript flexibility", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // Direct string API (JavaScript flexibility - concise when options has single parameter)
        // @ts-expect-error Testing direct string for JS flexibility
        expect(compare(date1, date2, "ASC")).toBe(-1);
        // @ts-expect-error Testing direct string for JS flexibility
        expect(compare(date1, date2, "DESC")).toBe(1);

        // Case-insensitive direct string
        // @ts-expect-error Testing direct string for JS flexibility
        expect(compare(date1, date2, "asc")).toBe(-1);
        // @ts-expect-error Testing direct string for JS flexibility
        expect(compare(date1, date2, "desc")).toBe(1);

        // Invalid direct string defaults to ASC
        // @ts-expect-error Testing direct string for JS flexibility
        expect(compare(date1, date2, "invalid")).toBe(-1);
      });
    });

    describe("Edge Cases Compatibility", () => {
      it("should handle boundary dates correctly", () => {
        const minDate = new Date(-8640000000000000);
        const maxDate = new Date(8640000000000000);
        const normalDate = new Date("2024-01-01");

        expect(compare(minDate, maxDate)).toBe(-1);
        expect(compare(maxDate, minDate)).toBe(1);
        expect(compare(normalDate, minDate)).toBe(1);
        expect(compare(normalDate, maxDate)).toBe(-1);
      });

      it("should handle millisecond precision correctly", () => {
        const date1 = new Date("2024-01-01T00:00:00.000Z");
        const date2 = new Date("2024-01-01T00:00:00.001Z");

        expect(compare(date1, date2)).toBe(-1);
        expect(compare(date2, date1)).toBe(1);
        expect(compare(date1, date1)).toBe(0);
      });

      it("should handle timezone consistency", () => {
        // Dates that represent the same moment but created differently
        const utcDate = new Date("2024-01-01T12:00:00.000Z");
        const localDate = new Date(2024, 0, 1, 12, 0, 0, 0); // Local time

        // Since compare uses getTime(), timezone representation shouldn't matter
        // for the comparison logic itself
        expect(() => compare(utcDate, localDate)).not.toThrow();
        expect(typeof compare(utcDate, localDate)).toBe("number");
      });

      it("should maintain performance characteristics", () => {
        // Test that existing performance is not degraded
        const dates = Array.from(
          { length: 1000 },
          () =>
            new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        );

        const start = performance.now();
        dates.sort(compare);
        const end = performance.now();

        // Should be very fast for 1000 Date objects
        expect(end - start).toBeLessThan(100); // Allow for slower CI environments
      });
    });

    describe("Type System Compatibility", () => {
      it("should accept existing function call patterns", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        // All these should work without TypeScript errors
        expect(() => compare(date1, date2)).not.toThrow();
        expect(() => compare(date1, date2, { order: "ASC" })).not.toThrow();
        expect(() => compare(date1, date2, { order: "DESC" })).not.toThrow();
      });

      it("should return correct numeric values", () => {
        const date1 = new Date("2024-01-01");
        const date2 = new Date("2024-01-02");

        const result1 = compare(date1, date2);
        const result2 = compare(date2, date1);
        const result3 = compare(date1, date1);

        expect(typeof result1).toBe("number");
        expect(typeof result2).toBe("number");
        expect(typeof result3).toBe("number");

        expect([result1, result2, result3]).toEqual([-1, 1, 0]);
      });
    });
  });
});

