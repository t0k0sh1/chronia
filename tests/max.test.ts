import { describe, it, expect } from "vitest";
import { max } from "../src/max";

describe("max", () => {
  describe("happy path", () => {
    it("should return latest date from multiple Date objects", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15); // June 15, 2024
      const date2 = new Date(2024, 5, 10); // June 10, 2024
      const date3 = new Date(2024, 5, 20); // June 20, 2024 (latest)

      // Act
      const result = max(date1, date2, date3);

      // Assert
      expect(result.getTime()).toBe(date3.getTime());
    });

    it("should return latest date from multiple timestamps", () => {
      // Arrange
      const timestamp1 = new Date(2024, 5, 15).getTime();
      const timestamp2 = new Date(2024, 5, 10).getTime();
      const timestamp3 = new Date(2024, 5, 20).getTime(); // Latest

      // Act
      const result = max(timestamp1, timestamp2, timestamp3);

      // Assert
      expect(result.getTime()).toBe(timestamp3);
    });

    it("should handle mixed Date objects and timestamps", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const timestamp2 = new Date(2024, 5, 10).getTime();
      const date3 = new Date(2024, 5, 20); // Latest

      // Act
      const result = max(date1, timestamp2, date3);

      // Assert
      expect(result.getTime()).toBe(date3.getTime());
    });
  });

  describe("edge cases", () => {
    it("should return same date when given single Date object", () => {
      // Arrange
      const date = new Date(2024, 5, 15);

      // Act
      const result = max(date);

      // Assert
      expect(result.getTime()).toBe(date.getTime());
    });

    it("should return same timestamp when given single timestamp", () => {
      // Arrange
      const timestamp = new Date(2024, 5, 15).getTime();

      // Act
      const result = max(timestamp);

      // Assert
      expect(result.getTime()).toBe(timestamp);
    });

    it("should handle dates with same timestamp", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 12, 0, 0);
      const date2 = new Date(2024, 5, 15, 12, 0, 0);

      // Act
      const result = max(date1, date2);

      // Assert
      expect(result.getTime()).toBe(date1.getTime());
      expect(result.getTime()).toBe(date2.getTime());
    });

    it("should handle dates with millisecond precision", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15, 12, 0, 0, 100);
      const date2 = new Date(2024, 5, 15, 12, 0, 0, 200); // Latest
      const date3 = new Date(2024, 5, 15, 12, 0, 0, 50);

      // Act
      const result = max(date1, date2, date3);

      // Assert
      expect(result.getTime()).toBe(date2.getTime());
    });

    it("should handle epoch date (timestamp 0)", () => {
      // Arrange
      const EPOCH = 0;
      const laterDate = new Date(2024, 5, 15);

      // Act
      const result = max(EPOCH, laterDate);

      // Assert
      expect(result.getTime()).toBe(laterDate.getTime());
    });

    it("should handle dates before epoch", () => {
      // Arrange
      const beforeEpoch = new Date(-86400000); // 1 day before epoch
      const afterEpoch = new Date(86400000); // 1 day after epoch

      // Act
      const result = max(beforeEpoch, afterEpoch);

      // Assert
      expect(result.getTime()).toBe(afterEpoch.getTime());
    });

    it("should handle very large timestamps near MAX_VALUE", () => {
      // Arrange
      const DATE_MAX_VALUE = 8640000000000000;
      const timestamp1 = DATE_MAX_VALUE - 1000;
      const timestamp2 = DATE_MAX_VALUE - 2000;
      const timestamp3 = DATE_MAX_VALUE - 500; // Latest

      // Act
      const result = max(timestamp1, timestamp2, timestamp3);

      // Assert
      expect(result.getTime()).toBe(timestamp3);
    });

    it("should handle timestamps near MAX_SAFE_INTEGER", () => {
      // Arrange
      const timestamp1 = Number.MAX_SAFE_INTEGER - 1000;
      const timestamp2 = Number.MAX_SAFE_INTEGER - 2000;
      const timestamp3 = Number.MAX_SAFE_INTEGER - 500; // Latest (but beyond valid Date range)

      // Act
      const result = max(timestamp1, timestamp2, timestamp3);

      // Assert
      // MAX_SAFE_INTEGER is beyond valid Date range (8640000000000000), so result should be Invalid Date
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle timestamps near MIN_SAFE_INTEGER", () => {
      // Arrange
      const timestamp1 = Number.MIN_SAFE_INTEGER + 1000;
      const timestamp2 = Number.MIN_SAFE_INTEGER + 2000; // Latest (but beyond valid Date range)
      const timestamp3 = Number.MIN_SAFE_INTEGER + 500;

      // Act
      const result = max(timestamp1, timestamp2, timestamp3);

      // Assert
      // MIN_SAFE_INTEGER is beyond valid Date range (-8640000000000000), so result should be Invalid Date
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should handle large number of dates (100+ arguments)", () => {
      // Arrange
      const dates: Date[] = [];
      const latest = new Date(2024, 0, 101);
      dates.push(latest);

      for (let i = 1; i <= 100; i++) {
        dates.push(new Date(2024, 0, i));
      }

      // Act
      const result = max(...dates);

      // Assert
      expect(result.getTime()).toBe(latest.getTime());
    });

    it("should return new Date object, not reference to input", () => {
      // Arrange
      const date1 = new Date(2024, 5, 15);
      const date2 = new Date(2024, 5, 20);

      // Act
      const result = max(date1, date2);

      // Assert
      expect(result).not.toBe(date1);
      expect(result).not.toBe(date2);
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("invalid inputs", () => {
    it("should return Invalid Date when no arguments provided", () => {
      // Act
      const result = max();

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when any Date is invalid", () => {
      // Arrange
      const validDate = new Date(2024, 5, 15);
      const invalidDate = new Date("invalid");

      // Act
      const result = max(validDate, invalidDate);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when any timestamp is NaN", () => {
      // Arrange
      const validTimestamp = new Date(2024, 5, 15).getTime();
      const invalidTimestamp = NaN;

      // Act
      const result = max(validTimestamp, invalidTimestamp);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });

    it("should return Invalid Date when any timestamp is Infinity", () => {
      // Arrange
      const validTimestamp = new Date(2024, 5, 15).getTime();

      // Act
      const resultWithPositiveInfinity = max(validTimestamp, Infinity);
      const resultWithNegativeInfinity = max(validTimestamp, -Infinity);

      // Assert
      expect(Number.isNaN(resultWithPositiveInfinity.getTime())).toBe(true);
      expect(Number.isNaN(resultWithNegativeInfinity.getTime())).toBe(true);
    });

    it("should return Invalid Date when all inputs are invalid", () => {
      // Arrange
      const invalidDate1 = new Date("invalid");
      const invalidDate2 = NaN;
      const invalidDate3 = Infinity;

      // Act
      const result = max(invalidDate1, invalidDate2, invalidDate3);

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(true);
    });
  });
});

