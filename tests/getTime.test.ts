import { describe, it, expect } from 'vitest';
import { getTime } from '../src/getTime/index.js';

describe('getTime', () => {
  describe('Basic functionality', () => {
    it.each([
      {
        name: 'Valid ISO date string',
        input: new Date('2024-01-01T00:00:00.000Z'),
        expected: 1704067200000,
      },
      {
        name: 'Date from timestamp',
        input: new Date(1704067200000),
        expected: 1704067200000,
      },
      {
        name: 'Date constructor with numbers',
        input: new Date(2024, 0, 1), // Year, month (0-indexed), day
        expected: expect.any(Number),
      },
      {
        name: 'Unix epoch',
        input: new Date(0),
        expected: 0,
      },
      {
        name: 'Specific timestamp with milliseconds',
        input: new Date('2024-06-15T12:30:45.123Z'),
        expected: new Date('2024-06-15T12:30:45.123Z').getTime(),
      },
    ])('should return correct timestamp for $name', ({ input, expected }) => {
      const result = getTime(input);
      expect(result).toEqual(expected);
      expect(typeof result).toBe('number');
    });
  });

  describe('Invalid date handling', () => {
    it.each([
      {
        name: 'Invalid date string',
        input: new Date('invalid-date-string'),
      },
      {
        name: 'Date constructed with NaN',
        input: new Date(NaN),
      },
      {
        name: 'Invalid date values',
        input: new Date('2024-13-45'),
      },
    ])('should return NaN for $name', ({ input }) => {
      const result = getTime(input);
      expect(result).toBeNaN();
    });
  });

  describe('Edge cases', () => {
    it.each([
      {
        name: 'Maximum valid Date timestamp',
        input: new Date(8.64e15),
        expected: 8.64e15,
      },
      {
        name: 'Minimum valid Date timestamp',
        input: new Date(-8.64e15),
        expected: -8.64e15,
      },
      {
        name: 'Negative timestamp (before epoch)',
        input: new Date('1969-12-31T00:00:00.000Z'),
        expected: -86400000,
      },
      {
        name: 'Fractional milliseconds preserved',
        input: new Date(1.5),
        expected: new Date(1.5).getTime(),
      },
    ])('should handle $name correctly', ({ input, expected }) => {
      const result = getTime(input);
      expect(result).toBe(expected);
    });
  });

  describe('Native compatibility', () => {
    it.each([
      new Date('2024-01-01T00:00:00.000Z'),
      new Date(1704067200000),
      new Date('invalid'),
      new Date(NaN),
      new Date(0),
      new Date(8.64e15),
      new Date(-8.64e15),
    ])('should match native Date.prototype.getTime() for %s', (date) => {
      const nativeResult = date.getTime();
      const implResult = getTime(date);

      if (isNaN(nativeResult)) {
        expect(implResult).toBeNaN();
      } else {
        expect(implResult).toBe(nativeResult);
      }
    });
  });

  describe.skip('Performance', () => {
    it('should perform comparably to native getTime()', () => {
      const dates = Array.from({ length: 1000 }, () => new Date());

      // Native performance
      const startNative = performance.now();
      dates.forEach(date => date.getTime());
      const nativeTime = performance.now() - startNative;

      // Implementation performance
      const startImpl = performance.now();
      dates.forEach(date => getTime(date));
      const implTime = performance.now() - startImpl;

      // Implementation should be within reasonable factor of native performance
      expect(implTime).toBeLessThan(nativeTime * 10);
    });
  });

  describe('Type safety', () => {
    it('should always return number type', () => {
      const validDate = new Date('2024-01-01');
      const invalidDate = new Date('invalid');

      expect(typeof getTime(validDate)).toBe('number');
      expect(typeof getTime(invalidDate)).toBe('number');
    });

    it.each([
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'string', input: '2024-01-01' },
      { name: 'number', input: 1704067200000 },
      { name: 'boolean', input: true },
      { name: 'object', input: {} },
      { name: 'array', input: [] },
    ])('should return NaN for $name input', ({ input }) => {
      const result = getTime(input as any);
      expect(result).toBeNaN();
      expect(typeof result).toBe('number');
    });
  });
});