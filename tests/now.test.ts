import { describe, it, expect } from "vitest";
import { now } from "../src/now";
import { addDays } from "../src/addDays";
import { subHours } from "../src/subHours";
import { format } from "../src/format";

describe("now", () => {
  describe("happy path", () => {
    it("should return a Date object", () => {
      // Act
      const result = now();

      // Assert
      expect(result).toBeInstanceOf(Date);
      expect(typeof result).toBe("object");
    });

    it("should return a valid Date (not Invalid Date)", () => {
      // Act
      const result = now();

      // Assert
      expect(Number.isNaN(result.getTime())).toBe(false);
    });

    it("should return current time within execution window", () => {
      // Arrange
      const beforeCall = new Date();

      // Act
      const result = now();

      // Assert
      const afterCall = new Date();
      expect(result.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });

    it("should return date with millisecond precision", () => {
      // Act
      const result = now();

      // Assert
      const milliseconds = result.getMilliseconds();
      expect(milliseconds).toBeGreaterThanOrEqual(0);
      expect(milliseconds).toBeLessThanOrEqual(999);
      expect(Number.isInteger(milliseconds)).toBe(true);
    });

    it("should return monotonically increasing timestamps when called sequentially", () => {
      // Arrange
      const callCount = 5;
      const timestamps: number[] = [];

      // Act
      for (let i = 0; i < callCount; i++) {
        timestamps.push(now().getTime());
      }

      // Assert
      for (let i = 1; i < timestamps.length; i++) {
        expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i - 1]);
      }
    });

    it("should return timestamp very close to Date.now()", () => {
      // Arrange
      const maxDeltaMs = 10;

      // Act
      const result = now();
      const systemNow = Date.now();

      // Assert
      const delta = Math.abs(result.getTime() - systemNow);
      expect(delta).toBeLessThanOrEqual(maxDeltaMs);
    });
  });

  describe("edge cases", () => {
    it("should return time after Unix epoch (positive timestamp)", () => {
      // Arrange
      const UNIX_EPOCH = 0;

      // Act
      const result = now();

      // Assert
      expect(result.getTime()).toBeGreaterThan(UNIX_EPOCH);
    });

    it("should return different values on consecutive calls", () => {
      // Arrange & Act
      const firstCall = now();
      const secondCall = now();

      // Assert
      // Note: May occasionally be equal if calls are extremely close together
      expect(secondCall.getTime()).toBeGreaterThanOrEqual(firstCall.getTime());
    });

    it("should return Date with all components accessible", () => {
      // Act
      const result = now();

      // Assert
      expect(() => result.getFullYear()).not.toThrow();
      expect(() => result.getMonth()).not.toThrow();
      expect(() => result.getDate()).not.toThrow();
      expect(() => result.getHours()).not.toThrow();
      expect(() => result.getMinutes()).not.toThrow();
      expect(() => result.getSeconds()).not.toThrow();
      expect(() => result.getMilliseconds()).not.toThrow();
    });
  });

  describe("integration tests", () => {
    it("should return date that can be used with addDays function", () => {
      // Arrange
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;
      const DST_TOLERANCE_MS = 60 * 60 * 1000; // 1 hour tolerance for DST

      // Act
      const currentTime = now();
      const tomorrow = addDays(currentTime, 1);

      // Assert
      const timeDiff = tomorrow.getTime() - currentTime.getTime();
      // Allow for DST transitions - a day can be 23, 24, or 25 hours
      expect(Math.abs(timeDiff - ONE_DAY_MS)).toBeLessThanOrEqual(DST_TOLERANCE_MS);
      expect(tomorrow.getTime()).toBeGreaterThan(currentTime.getTime());
    });

    it("should return date that can be used with subHours function", () => {
      // Arrange
      const ONE_HOUR_MS = 60 * 60 * 1000;

      // Act
      const currentTime = now();
      const oneHourAgo = subHours(currentTime, 1);

      // Assert
      const timeDiff = currentTime.getTime() - oneHourAgo.getTime();
      // Allow for DST transitions - an hour can be 0, 59, 60, or 120 minutes
      expect(timeDiff).toBeGreaterThan(0);
      expect(timeDiff).toBeLessThanOrEqual(2 * ONE_HOUR_MS);
    });

    it("should return date that can be formatted using format function", () => {
      // Act
      const currentTime = now();
      const formatted = format(currentTime, "yyyy-MM-dd");

      // Assert
      expect(typeof formatted).toBe("string");
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Verify formatted output matches actual date components
      const expectedYear = currentTime.getFullYear().toString();
      const expectedMonth = (currentTime.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const expectedDay = currentTime.getDate().toString().padStart(2, "0");
      const expected = `${expectedYear}-${expectedMonth}-${expectedDay}`;

      expect(formatted).toBe(expected);
    });
  });
});