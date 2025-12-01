import { describe, it, expect } from "vitest";
import { compareDateTimes } from "../../src/_lib/compareDates";

describe("compareDateTimes", () => {
  describe("happy path", () => {
    it("should return 1 when first Date is after second Date", () => {
      // Arrange
      const earlier = new Date(2025, 0, 1);
      const later = new Date(2025, 0, 2);

      // Act
      const result = compareDateTimes(later, earlier);

      // Assert
      expect(result).toBe(1);
    });

    it("should return -1 when first Date is before second Date", () => {
      // Arrange
      const earlier = new Date(2025, 0, 1);
      const later = new Date(2025, 0, 2);

      // Act
      const result = compareDateTimes(earlier, later);

      // Assert
      expect(result).toBe(-1);
    });

    it("should return 0 when Dates are equal", () => {
      // Arrange
      const date1 = new Date(2025, 0, 1, 12, 30, 45, 123);
      const date2 = new Date(2025, 0, 1, 12, 30, 45, 123);

      // Act
      const result = compareDateTimes(date1, date2);

      // Assert
      expect(result).toBe(0);
    });

    it("should return 1 when first timestamp is greater", () => {
      // Arrange
      const earlier = 1704067200000; // 2024-01-01
      const later = 1704153600000; // 2024-01-02

      // Act
      const result = compareDateTimes(later, earlier);

      // Assert
      expect(result).toBe(1);
    });

    it("should return -1 when first timestamp is smaller", () => {
      // Arrange
      const earlier = 1704067200000;
      const later = 1704153600000;

      // Act
      const result = compareDateTimes(earlier, later);

      // Assert
      expect(result).toBe(-1);
    });

    it("should return 0 when timestamps are equal", () => {
      // Arrange
      const timestamp = 1704067200000;

      // Act
      const result = compareDateTimes(timestamp, timestamp);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle Date vs timestamp comparison (Date larger)", () => {
      // Arrange
      const dateObj = new Date(2025, 0, 2);
      const timestamp = new Date(2025, 0, 1).getTime();

      // Act
      const result = compareDateTimes(dateObj, timestamp);

      // Assert
      expect(result).toBe(1);
    });

    it("should handle Date vs timestamp comparison (Date smaller)", () => {
      // Arrange
      const dateObj = new Date(2025, 0, 1);
      const timestamp = new Date(2025, 0, 2).getTime();

      // Act
      const result = compareDateTimes(dateObj, timestamp);

      // Assert
      expect(result).toBe(-1);
    });

    it("should handle Date vs timestamp comparison (equal)", () => {
      // Arrange
      const dateObj = new Date(2025, 0, 1, 12, 0, 0);
      const timestamp = dateObj.getTime();

      // Act
      const result = compareDateTimes(dateObj, timestamp);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe("edge cases", () => {
    it("should correctly identify larger date when differing by 1 millisecond", () => {
      // Arrange
      const earlier = new Date(2025, 0, 1, 12, 0, 0, 0);
      const later = new Date(2025, 0, 1, 12, 0, 0, 1);

      // Act
      const result = compareDateTimes(later, earlier);

      // Assert
      expect(result).toBe(1);
    });

    it("should correctly identify smaller date when differing by 1 millisecond", () => {
      // Arrange
      const earlier = new Date(2025, 0, 1, 12, 0, 0, 0);
      const later = new Date(2025, 0, 1, 12, 0, 0, 1);

      // Act
      const result = compareDateTimes(earlier, later);

      // Assert
      expect(result).toBe(-1);
    });

    it("should return 0 for identical timestamps", () => {
      // Arrange
      const date1 = new Date(2025, 0, 1, 12, 0, 0, 500);
      const date2 = new Date(2025, 0, 1, 12, 0, 0, 500);

      // Act
      const result = compareDateTimes(date1, date2);

      // Assert
      expect(result).toBe(0);
    });

    it("should return 0 for same Date object reference", () => {
      // Arrange
      const date = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(date, date);

      // Assert
      expect(result).toBe(0);
    });

    it("should handle epoch timestamp (0)", () => {
      // Arrange
      const epoch = 0;
      const laterDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(epoch, laterDate);

      // Assert
      expect(result).toBe(-1);
    });

    it("should handle negative timestamp (before epoch)", () => {
      // Arrange
      const beforeEpoch = -86400000; // 1 day before epoch
      const afterEpoch = 86400000; // 1 day after epoch

      // Act
      const result = compareDateTimes(beforeEpoch, afterEpoch);

      // Assert
      expect(result).toBe(-1);
    });

    it("should handle comparison at epoch boundary", () => {
      // Arrange
      const justBeforeEpoch = -1;
      const epoch = 0;

      // Act
      const result = compareDateTimes(justBeforeEpoch, epoch);

      // Assert
      expect(result).toBe(-1);
    });

    it("should handle comparison at epoch boundary (reverse)", () => {
      // Arrange
      const epoch = 0;
      const justAfterEpoch = 1;

      // Act
      const result = compareDateTimes(epoch, justAfterEpoch);

      // Assert
      expect(result).toBe(-1);
    });
  });

  describe("invalid inputs", () => {
    it("should return false when first parameter is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(invalidDate, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second parameter is Invalid Date", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);
      const invalidDate = new Date("invalid");

      // Act
      const result = compareDateTimes(validDate, invalidDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both parameters are Invalid Date", () => {
      // Arrange
      const invalid1 = new Date("invalid");
      const invalid2 = new Date("not a date");

      // Act
      const result = compareDateTimes(invalid1, invalid2);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first parameter is NaN", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(NaN, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second parameter is NaN", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(validDate, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both parameters are NaN", () => {
      // Act
      const result = compareDateTimes(NaN, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first parameter is Infinity", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(Infinity, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first parameter is -Infinity", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(-Infinity, validDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second parameter is Infinity", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(validDate, Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when second parameter is -Infinity", () => {
      // Arrange
      const validDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(validDate, -Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both parameters are Infinity", () => {
      // Act
      const result = compareDateTimes(Infinity, Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when both parameters are -Infinity", () => {
      // Act
      const result = compareDateTimes(-Infinity, -Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first is Infinity and second is -Infinity", () => {
      // Act
      const result = compareDateTimes(Infinity, -Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first is NaN and second is Infinity", () => {
      // Act
      const result = compareDateTimes(NaN, Infinity);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first is Invalid Date and second is NaN", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = compareDateTimes(invalidDate, NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when first is Infinity and second is Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid");

      // Act
      const result = compareDateTimes(Infinity, invalidDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when MIN_SAFE_INTEGER is used (beyond valid Date range)", () => {
      // Arrange
      const MIN_SAFE_TIMESTAMP = Number.MIN_SAFE_INTEGER;
      const laterDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(MIN_SAFE_TIMESTAMP, laterDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false when MAX_SAFE_INTEGER is used (beyond valid Date range)", () => {
      // Arrange
      const MAX_SAFE_TIMESTAMP = Number.MAX_SAFE_INTEGER;
      const earlierDate = new Date(2025, 0, 1);

      // Act
      const result = compareDateTimes(MAX_SAFE_TIMESTAMP, earlierDate);

      // Assert
      expect(result).toBe(false);
    });
  });
});
