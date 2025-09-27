import { describe, it, expect } from 'vitest';
import { compare } from '../src/compare/index.js';

describe('Enhanced Compare Integration Tests', () => {
  describe('Mixed Input Type Integration', () => {
    it('should handle Date and number inputs consistently', () => {
      const dateObj = new Date('2024-01-15');
      const timestamp = new Date('2024-01-10').getTime();

      // Test all combinations
      expect(() => compare(dateObj, timestamp)).not.toThrow();
      expect(() => compare(timestamp, dateObj)).not.toThrow();
      expect(() => compare(timestamp, timestamp)).not.toThrow();

      // Verify correct ordering
      expect(compare(dateObj, timestamp)).toBe(1); // dateObj is later
      expect(compare(timestamp, dateObj)).toBe(-1); // timestamp is earlier
      expect(compare(timestamp, timestamp)).toBe(0); // same timestamp
    });

    it('should work correctly in Array.sort() with mixed types', () => {
      const mixed = [
        new Date('2024-01-03'),
        new Date('2024-01-01').getTime(),
        new Date('2024-01-02'),
        new Date('2024-01-04').getTime()
      ];

      expect(() => mixed.sort((a, b) => compare(a, b))).not.toThrow();

      const sorted = mixed.sort((a, b) => compare(a, b));

      // Convert all to timestamps for comparison
      const timestamps = sorted.map(item =>
        typeof item === 'number' ? item : item.getTime()
      );

      // Verify ascending order
      for (let i = 1; i < timestamps.length; i++) {
        expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i - 1]);
      }
    });

    it('should handle case-insensitive order parameters at runtime', () => {
      const date1 = new Date('2024-01-01');
      const timestamp2 = new Date('2024-01-02').getTime();

      // Test TypeScript-typed values
      expect(compare(date1, timestamp2, 'ASC')).toBe(-1);
      expect(compare(date1, timestamp2, 'DESC')).toBe(1);

      // Test runtime case-insensitive behavior (using type assertions)
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, 'asc')).toBe(-1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, 'desc')).toBe(1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, 'Asc')).toBe(-1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, timestamp2, 'Desc')).toBe(1);
    });

    it('should default to ascending order when order parameter omitted', () => {
      const timestamp1 = new Date('2024-01-01').getTime();
      const date2 = new Date('2024-01-02');

      expect(() => compare(timestamp1, date2)).not.toThrow();
      expect(compare(timestamp1, date2)).toBe(-1);
      expect(compare(timestamp1, date2)).toBe(compare(timestamp1, date2, 'ASC'));
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle large mixed arrays efficiently', () => {
      const size = 1000;
      const mixedArray = Array.from({ length: size }, (_, i) =>
        i % 2 === 0
          ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
          : Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      );

      expect(() => mixedArray.sort((a, b) => compare(a, b))).not.toThrow();

      const sorted = mixedArray.sort((a, b) => compare(a, b));
      expect(sorted).toHaveLength(size);
    });

    it('should maintain precision with timestamp inputs', () => {
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
});