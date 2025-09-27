import { describe, it, expect } from 'vitest';
import { compare } from '../src/compare/index.js';

describe('Enhanced Compare Backward Compatibility Tests', () => {
  describe('Existing Function Signature Compatibility', () => {
    it('should maintain identical behavior for Date objects', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      const date3 = new Date('2024-01-01'); // Equal to date1

      // Basic comparisons
      expect(compare(date1, date2)).toBe(-1);
      expect(compare(date2, date1)).toBe(1);
      expect(compare(date1, date3)).toBe(0);

      // With explicit ASC order
      expect(compare(date1, date2, 'ASC')).toBe(-1);
      expect(compare(date2, date1, 'ASC')).toBe(1);
      expect(compare(date1, date3, 'ASC')).toBe(0);

      // With DESC order
      expect(compare(date1, date2, 'DESC')).toBe(1);
      expect(compare(date2, date1, 'DESC')).toBe(-1);
      expect(compare(date1, date3, 'DESC')).toBe(0);
    });

    it('should maintain Array.sort() compatibility', () => {
      const dates = [
        new Date('2024-01-03'),
        new Date('2024-01-01'),
        new Date('2024-01-02')
      ];

      // Ascending sort
      const ascSorted = [...dates].sort(compare);
      expect(ascSorted[0].getTime()).toBe(new Date('2024-01-01').getTime());
      expect(ascSorted[1].getTime()).toBe(new Date('2024-01-02').getTime());
      expect(ascSorted[2].getTime()).toBe(new Date('2024-01-03').getTime());

      // Descending sort
      const descSorted = [...dates].sort((a, b) => compare(a, b, 'DESC'));
      expect(descSorted[0].getTime()).toBe(new Date('2024-01-03').getTime());
      expect(descSorted[1].getTime()).toBe(new Date('2024-01-02').getTime());
      expect(descSorted[2].getTime()).toBe(new Date('2024-01-01').getTime());
    });

    it('should maintain error handling for invalid Date objects', () => {
      const invalidDate = new Date('invalid');
      const validDate = new Date('2024-01-01');

      expect(() => compare(invalidDate, validDate)).toThrow(RangeError);
      expect(() => compare(validDate, invalidDate)).toThrow(RangeError);
      expect(() => compare(invalidDate, invalidDate)).toThrow(RangeError);
    });

    it('should handle runtime order parameters with new specification', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      // New behavior: invalid order parameters default to ASC (no errors)
      // @ts-expect-error Testing runtime behavior
      expect(() => compare(date1, date2, 'invalid')).not.toThrow();
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, date2, 'invalid')).toBe(-1); // defaults to ASC

      // Case-insensitive handling
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, date2, 'asc')).toBe(-1);
      // @ts-expect-error Testing runtime behavior
      expect(compare(date1, date2, 'desc')).toBe(1);
    });
  });

  describe('Edge Cases Compatibility', () => {
    it('should handle boundary dates correctly', () => {
      const minDate = new Date(-8640000000000000);
      const maxDate = new Date(8640000000000000);
      const normalDate = new Date('2024-01-01');

      expect(compare(minDate, maxDate)).toBe(-1);
      expect(compare(maxDate, minDate)).toBe(1);
      expect(compare(normalDate, minDate)).toBe(1);
      expect(compare(normalDate, maxDate)).toBe(-1);
    });

    it('should handle millisecond precision correctly', () => {
      const date1 = new Date('2024-01-01T00:00:00.000Z');
      const date2 = new Date('2024-01-01T00:00:00.001Z');

      expect(compare(date1, date2)).toBe(-1);
      expect(compare(date2, date1)).toBe(1);
      expect(compare(date1, date1)).toBe(0);
    });

    it('should handle timezone consistency', () => {
      // Dates that represent the same moment but created differently
      const utcDate = new Date('2024-01-01T12:00:00.000Z');
      const localDate = new Date(2024, 0, 1, 12, 0, 0, 0); // Local time

      // Since compare uses getTime(), timezone representation shouldn't matter
      // for the comparison logic itself
      expect(() => compare(utcDate, localDate)).not.toThrow();
      expect(typeof compare(utcDate, localDate)).toBe('number');
    });

    it('should maintain performance characteristics', () => {
      // Test that existing performance is not degraded
      const dates = Array.from({ length: 1000 }, () =>
        new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      );

      const start = performance.now();
      dates.sort(compare);
      const end = performance.now();

      // Should be very fast for 1000 Date objects
      expect(end - start).toBeLessThan(100); // Allow for slower CI environments
    });
  });

  describe('Type System Compatibility', () => {
    it('should accept existing function call patterns', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      // All these should work without TypeScript errors
      expect(() => compare(date1, date2)).not.toThrow();
      expect(() => compare(date1, date2, 'ASC')).not.toThrow();
      expect(() => compare(date1, date2, 'DESC')).not.toThrow();
    });

    it('should return correct numeric values', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      const result1 = compare(date1, date2);
      const result2 = compare(date2, date1);
      const result3 = compare(date1, date1);

      expect(typeof result1).toBe('number');
      expect(typeof result2).toBe('number');
      expect(typeof result3).toBe('number');

      expect([result1, result2, result3]).toEqual([-1, 1, 0]);
    });
  });
});