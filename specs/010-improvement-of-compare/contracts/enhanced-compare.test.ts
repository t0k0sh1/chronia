import { describe, it, expect } from 'vitest';
import { compare } from '../../../src/compare/index.js';

describe('Enhanced Compare Function Contracts', () => {
  describe('Input Type Support', () => {
    it('should accept Date objects (existing behavior)', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      expect(() => compare(date1, date2)).not.toThrow();
      expect(compare(date1, date2)).toBe(-1);
    });

    it('should accept numeric timestamps', () => {
      const timestamp1 = new Date('2024-01-01').getTime();
      const timestamp2 = new Date('2024-01-02').getTime();

      expect(() => compare(timestamp1, timestamp2)).not.toThrow();
      expect(compare(timestamp1, timestamp2)).toBe(-1);
    });

    it('should accept mixed Date and number inputs', () => {
      const date = new Date('2024-01-01');
      const timestamp = new Date('2024-01-02').getTime();

      expect(() => compare(date, timestamp)).not.toThrow();
      expect(() => compare(timestamp, date)).not.toThrow();
      expect(compare(date, timestamp)).toBe(-1);
      expect(compare(timestamp, date)).toBe(1);
    });
  });

  describe('Case-Insensitive Order Parameters', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-02');

    it('should accept uppercase ASC/DESC (existing behavior)', () => {
      expect(() => compare(date1, date2, 'ASC')).not.toThrow();
      expect(() => compare(date1, date2, 'DESC')).not.toThrow();
      expect(compare(date1, date2, 'ASC')).toBe(-1);
      expect(compare(date1, date2, 'DESC')).toBe(1);
    });

    it('should accept lowercase asc/desc (new behavior)', () => {
      expect(() => compare(date1, date2, 'asc')).not.toThrow();
      expect(() => compare(date1, date2, 'desc')).not.toThrow();
      expect(compare(date1, date2, 'asc')).toBe(-1);
      expect(compare(date1, date2, 'desc')).toBe(1);
    });
  });

  describe('Default Parameter Behavior', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-02');

    it('should default to ascending order when order parameter omitted', () => {
      expect(() => compare(date1, date2)).not.toThrow();
      expect(compare(date1, date2)).toBe(-1);
      expect(compare(date1, date2)).toBe(compare(date1, date2, 'ASC'));
    });

    it('should default to ascending order when order parameter is undefined', () => {
      expect(() => compare(date1, date2, undefined)).not.toThrow();
      expect(compare(date1, date2, undefined)).toBe(-1);
      expect(compare(date1, date2, undefined)).toBe(compare(date1, date2, 'ASC'));
    });
  });

  describe('Error Handling Contracts', () => {
    it('should throw RangeError for invalid Date objects', () => {
      const invalidDate = new Date('invalid');
      const validDate = new Date('2024-01-01');

      expect(() => compare(invalidDate, validDate)).toThrow(RangeError);
      expect(() => compare(validDate, invalidDate)).toThrow(RangeError);
    });

    it('should throw RangeError for invalid timestamps', () => {
      const validDate = new Date('2024-01-01');
      const invalidTimestamp = NaN;

      expect(() => compare(invalidTimestamp, validDate.getTime())).toThrow(RangeError);
      expect(() => compare(validDate.getTime(), invalidTimestamp)).toThrow(RangeError);
    });

    it('should throw RangeError for invalid order parameters', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      // @ts-expect-error Testing invalid order parameter
      expect(() => compare(date1, date2, 'invalid')).toThrow(RangeError);
      // @ts-expect-error Testing invalid order parameter
      expect(() => compare(date1, date2, 'ascending')).toThrow(RangeError);
    });
  });

  describe('Backward Compatibility Contracts', () => {
    it('should maintain identical behavior for existing function signatures', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      const date3 = new Date('2024-01-01'); // Equal to date1

      // Basic comparison
      expect(compare(date1, date2)).toBe(-1);
      expect(compare(date2, date1)).toBe(1);
      expect(compare(date1, date3)).toBe(0);

      // With explicit order
      expect(compare(date1, date2, 'ASC')).toBe(-1);
      expect(compare(date1, date2, 'DESC')).toBe(1);
    });

    it('should maintain Array.sort() compatibility', () => {
      const dates = [
        new Date('2024-01-03'),
        new Date('2024-01-01'),
        new Date('2024-01-02')
      ];

      const sorted = [...dates].sort(compare);
      expect(sorted[0].getTime()).toBe(new Date('2024-01-01').getTime());
      expect(sorted[1].getTime()).toBe(new Date('2024-01-02').getTime());
      expect(sorted[2].getTime()).toBe(new Date('2024-01-03').getTime());
    });
  });

  describe('Performance Contracts', () => {
    it('should complete individual comparisons efficiently', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        compare(date1, date2);
      }
      const end = performance.now();

      expect(end - start).toBeLessThan(50); // 1000 comparisons in <50ms
    });

    it('should handle large array sorting within performance targets', () => {
      // Generate 1000 random dates for testing (scaled down from 10k for CI)
      const dates = Array.from({ length: 1000 }, () =>
        new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      );

      const start = performance.now();
      dates.sort(compare);
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // 1000 dates sorted in <100ms
    });
  });
});