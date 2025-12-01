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
    it("should return true for date exactly 1ms in the future", () => {
      // Arrange
      const future = new Date(FIXED_TIME + 1);

      // Act
      const result = isFuture(future);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for date exactly 1ms in the past", () => {
      // Arrange
      const past = new Date(FIXED_TIME - 1);

      // Act
      const result = isFuture(past);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for date exactly equal to current time", () => {
      // Arrange
      const now = new Date(FIXED_TIME);

      // Act
      const result = isFuture(now);

      // Assert
      expect(result).toBe(false);
    });

    it("should return false for timestamp exactly equal to Date.now()", () => {
      // Arrange & Act
      const result = isFuture(FIXED_TIME);

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
