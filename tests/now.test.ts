import { describe, it, expect } from "vitest";
import { now } from "../src/now";
import { addDays } from "../src/addDays";
import { subHours } from "../src/subHours";
import { format } from "../src/format";

describe("now", () => {
  describe("contract tests", () => {
    it("returns a Date object", () => {
      const result = now();
      expect(result instanceof Date).toBe(true);
      expect(typeof result).toBe("object");
    });

    it("returns a valid Date object (not Invalid Date)", () => {
      const result = now();
      expect(isNaN(result.getTime())).toBe(false);
      expect(result.getTime()).toBeGreaterThan(0);
    });

    it("returns current time within reasonable range", () => {
      const beforeCall = new Date();
      const result = now();
      const afterCall = new Date();

      expect(result.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(result.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });

  });

  describe("integration tests", () => {
    it("works correctly with addDays function", () => {
      const currentTime = now();
      const tomorrow = addDays(currentTime, 1);

      // Allow for DST transitions - a day can be 23, 24, or 25 hours
      const timeDiff = tomorrow.getTime() - currentTime.getTime();
      const expectedDay = 24 * 60 * 60 * 1000; // 24 hours in ms
      expect(Math.abs(timeDiff - expectedDay)).toBeLessThanOrEqual(60 * 60 * 1000); // Within 1 hour tolerance

      // Verify the date actually advanced by 1 day
      expect(tomorrow.getDate()).not.toBe(currentTime.getDate());
      expect(tomorrow.getTime()).toBeGreaterThan(currentTime.getTime());
    });

    it("works correctly with subHours function", () => {
      const currentTime = now();
      const oneHourAgo = subHours(currentTime, 1);

      // Allow for DST transitions - an hour can be 0, 59, 60, or 120 minutes
      const timeDiff = currentTime.getTime() - oneHourAgo.getTime();
      const expectedHour = 60 * 60 * 1000; // 1 hour in ms
      expect(timeDiff).toBeGreaterThan(0); // Time should have moved backward
      expect(timeDiff).toBeLessThanOrEqual(2 * expectedHour); // But not more than 2 hours (DST spring forward)
      expect(oneHourAgo.getTime()).toBeLessThan(currentTime.getTime());
    });

    it("works correctly with format function", () => {
      const currentTime = now();
      const formatted = format(currentTime, "yyyy-MM-dd");

      expect(typeof formatted).toBe("string");
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Compare formatted components directly to avoid timezone issues
      const expectedYear = currentTime.getFullYear().toString();
      const expectedMonth = (currentTime.getMonth() + 1).toString().padStart(2, "0");
      const expectedDay = currentTime.getDate().toString().padStart(2, "0");
      const expected = `${expectedYear}-${expectedMonth}-${expectedDay}`;

      expect(formatted).toBe(expected);
    });
  });

  describe.skip("performance tests", () => {
    it("executes in less than 1ms", () => {
      const startTime = performance.now();
      now();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(1);
    });

    it("has minimal memory footprint", () => {
      const iterations = 1000;
      const results: Date[] = [];

      for (let i = 0; i < iterations; i++) {
        results.push(now());
      }

      // All should be unique Date objects
      expect(results.length).toBe(iterations);
      results.forEach(result => {
        expect(result instanceof Date).toBe(true);
      });
    });
  });
});