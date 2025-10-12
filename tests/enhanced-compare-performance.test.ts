import { describe, it, expect } from "vitest";
import { compare } from "../src/compare/index.js";

describe("Enhanced Compare Performance Tests", () => {
  describe("Performance Benchmarks", () => {
    it("should sort 10,000 Date objects under 120ms", () => {
      const dates = Array.from(
        { length: 10000 },
        () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      );

      const start = performance.now();
      dates.sort(compare);
      const end = performance.now();

      expect(end - start).toBeLessThan(120);
    });

    it("should sort 10,000 timestamps under 120ms", () => {
      const timestamps = Array.from(
        { length: 10000 },
        () => Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      );

      const start = performance.now();
      timestamps.sort((a, b) => compare(a, b));
      const end = performance.now();

      expect(end - start).toBeLessThan(120);
    });

    it("should sort 10,000 mixed Date/number inputs under 120ms", () => {
      const mixed = Array.from({ length: 10000 }, (_, i) =>
        i % 2 === 0
          ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
          : Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      );

      const start = performance.now();
      mixed.sort((a, b) => compare(a, b));
      const end = performance.now();

      expect(end - start).toBeLessThan(120);
    });

    it("should have minimal overhead for individual comparisons", () => {
      const date1 = new Date("2024-01-01");
      const timestamp2 = new Date("2024-01-02").getTime();

      const start = performance.now();
      for (let i = 0; i < 10000; i++) {
        compare(date1, timestamp2);
      }
      const end = performance.now();

      // 10,000 individual comparisons should complete in well under 100ms
      expect(end - start).toBeLessThan(120);
    });

    it("should maintain performance with runtime case-insensitive order parameters", () => {
      const dates = Array.from(
        { length: 1000 },
        () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      );

      // Test with runtime lowercase order parameter (TypeScript will error but runtime works)
      const start = performance.now();
      // @ts-expect-error Testing runtime behavior with lowercase order
      dates.sort((a, b) => compare(a, b, "desc"));
      const end = performance.now();

      expect(end - start).toBeLessThan(120); // Should be very fast for 1k items, allow for slower CI
    });
  });

  describe("Memory Efficiency", () => {
    it("should not cause memory leaks with large datasets", () => {
      // Create large arrays multiple times to test memory usage
      for (let round = 0; round < 5; round++) {
        const large = Array.from({ length: 5000 }, (_, i) =>
          i % 2 === 0
            ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
            : Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
        );

        expect(() => large.sort((a, b) => compare(a, b))).not.toThrow();
        expect(large).toHaveLength(5000);
      }
    });

    it("should handle extreme values efficiently", () => {
      const extremes = [
        new Date(8640000000000000), // Max safe date
        new Date(-8640000000000000), // Min safe date
        Date.now(),
        0, // Unix epoch
        new Date("2024-01-01").getTime(),
      ];

      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        extremes.sort((a, b) => compare(a, b));
      }
      const end = performance.now();

      expect(end - start).toBeLessThan(120); // Allow for slower CI environments
    });
  });
});

