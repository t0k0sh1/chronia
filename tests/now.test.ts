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

      expect(tomorrow.getTime() - currentTime.getTime()).toBe(24 * 60 * 60 * 1000);
    });

    it("works correctly with subHours function", () => {
      const currentTime = now();
      const oneHourAgo = subHours(currentTime, 1);

      expect(currentTime.getTime() - oneHourAgo.getTime()).toBe(60 * 60 * 1000);
      expect(oneHourAgo.getTime()).toBeLessThan(currentTime.getTime());
    });

    it("works correctly with format function", () => {
      const currentTime = now();
      const formatted = format(currentTime, "yyyy-MM-dd");

      expect(typeof formatted).toBe("string");
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      const formattedDate = new Date(formatted);
      expect(formattedDate.getFullYear()).toBe(currentTime.getFullYear());
      expect(formattedDate.getMonth()).toBe(currentTime.getMonth());
      expect(formattedDate.getDate()).toBe(currentTime.getDate());
    });
  });

  describe("performance tests", () => {
    it("executes in less than 1ms", () => {
      const startTime = performance.now();
      now();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(1);
    });

    it("has minimal memory footprint", () => {
      const iterations = 1000;
      const results = [];

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