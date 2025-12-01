import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isFuture } from "../src/isFuture";

describe("isFuture", () => {
  const FIXED_TIME = new Date(2025, 0, 15, 12, 0, 0, 0).getTime(); // Jan 15, 2025, 12:00:00.000

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_TIME);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("happy path", () => {
    it("should return true for Date object in the future", () => {
      // Arrange
      const tomorrow = new Date(2025, 0, 16, 12, 0, 0, 0);

      // Act
      const result = isFuture(tomorrow);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true for timestamp in the future", () => {
      // Arrange
      const futureTimestamp = FIXED_TIME + 86400000; // +1 day

      // Act
      const result = isFuture(futureTimestamp);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for Date object in the past", () => {
      // Arrange
      const yesterday = new Date(2025, 0, 14, 12, 0, 0, 0);

      // Act
      const result = isFuture(yesterday);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for timestamp in the past", () => {
      // Arrange
      const pastTimestamp = FIXED_TIME - 86400000; // -1 day

      // Act
      const result = isFuture(pastTimestamp);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return false for date exactly 1ms in the past", () => {
      // Arrange
      const past = new Date(FIXED_TIME - 1);

      // Act
      const result = isFuture(past);

      // Assert
      expect(result).toBe(false);
    });

    it("should handle midnight boundary", () => {
      // Arrange
      const midnight = new Date(2025, 0, 16, 0, 0, 0, 0).getTime();
      vi.setSystemTime(midnight - 1); // 1ms before midnight
      const exactMidnight = new Date(midnight);

      // Act
      const result = isFuture(exactMidnight);

      // Assert
      expect(result).toBe(true);
    });

    it("should handle dates very close to current time", () => {
      // Arrange
      const currentTime = FIXED_TIME;
      const justBeforeNow = new Date(currentTime - 1);
      const justAfterNow = new Date(currentTime + 1);
      const exactlyNow = new Date(currentTime);

      // Act
      const resultBefore = isFuture(justBeforeNow);
      const resultAfter = isFuture(justAfterNow);
      const resultExact = isFuture(exactlyNow);

      // Assert
      expect(resultBefore).toBe(false); // 1ms before is past
      expect(resultAfter).toBe(true);   // 1ms after is future
      expect(resultExact).toBe(false);  // exactly now is not future
    });
  });

  describe("invalid inputs", () => {
    it("should return false for Invalid Date", () => {
      // Arrange
      const invalidDate = new Date("invalid string");

      // Act
      const result = isFuture(invalidDate);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for NaN", () => {
      // Act
      const result = isFuture(NaN);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for Infinity", () => {
      // Act
      const resultPositive = isFuture(Infinity);
      const resultNegative = isFuture(-Infinity);

      // Assert
      expect(resultPositive).toBe(false);
      expect(resultNegative).toBe(false);
    });
  });
});
