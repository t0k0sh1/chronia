import { describe, it, expect } from 'vitest';
import { compare } from '../src/compare/index.js';

describe('compare', () => {
  // T003: Contract tests based on compare.contract.ts
  describe('Contract tests', () => {
    describe('Ascending order (default)', () => {
      it.each([
        {
          name: 'Earlier date returns -1',
          date1: new Date('2024-01-01T00:00:00.000Z'),
          date2: new Date('2024-01-02T00:00:00.000Z'),
          order: 'ASC' as const,
          expected: -1,
        },
        {
          name: 'Later date returns 1',
          date1: new Date('2024-01-02T00:00:00.000Z'),
          date2: new Date('2024-01-01T00:00:00.000Z'),
          order: 'ASC' as const,
          expected: 1,
        },
        {
          name: 'Equal dates return 0',
          date1: new Date('2024-01-01T00:00:00.000Z'),
          date2: new Date('2024-01-01T00:00:00.000Z'),
          order: 'ASC' as const,
          expected: 0,
        },
      ])('should handle $name in ASC order', ({ date1, date2, order, expected }) => {
        const result = compare(date1, date2, order);
        expect(result).toBe(expected);
      });
    });

    describe('Descending order', () => {
      it.each([
        {
          name: 'Earlier date returns 1 in DESC mode',
          date1: new Date('2024-01-01T00:00:00.000Z'),
          date2: new Date('2024-01-02T00:00:00.000Z'),
          order: 'DESC' as const,
          expected: 1,
        },
        {
          name: 'Later date returns -1 in DESC mode',
          date1: new Date('2024-01-02T00:00:00.000Z'),
          date2: new Date('2024-01-01T00:00:00.000Z'),
          order: 'DESC' as const,
          expected: -1,
        },
        {
          name: 'Equal dates return 0 in DESC mode',
          date1: new Date('2024-01-01T00:00:00.000Z'),
          date2: new Date('2024-01-01T00:00:00.000Z'),
          order: 'DESC' as const,
          expected: 0,
        },
      ])('should handle $name', ({ date1, date2, order, expected }) => {
        const result = compare(date1, date2, order);
        expect(result).toBe(expected);
      });
    });

    describe('Default behavior', () => {
      it('should default to ascending order when order parameter is omitted', () => {
        const date1 = new Date('2024-01-01T00:00:00.000Z');
        const date2 = new Date('2024-01-02T00:00:00.000Z');

        expect(compare(date1, date2)).toBe(-1);
      });

      it('should default to ascending order when undefined is passed explicitly', () => {
        const date1 = new Date('2024-01-01T00:00:00.000Z');
        const date2 = new Date('2024-01-02T00:00:00.000Z');

        expect(compare(date1, date2, undefined)).toBe(-1);
      });
    });
  });

  // T004: Basic comparison scenarios
  describe('Basic comparison scenarios', () => {
    it.each([
      {
        name: 'Compare dates with different years',
        date1: new Date('2023-12-31'),
        date2: new Date('2024-01-01'),
        expected: -1,
      },
      {
        name: 'Compare dates with different months',
        date1: new Date('2024-01-15'),
        date2: new Date('2024-02-15'),
        expected: -1,
      },
      {
        name: 'Compare dates with different days',
        date1: new Date('2024-01-15'),
        date2: new Date('2024-01-16'),
        expected: -1,
      },
      {
        name: 'Compare dates with different hours',
        date1: new Date('2024-01-01T10:00:00'),
        date2: new Date('2024-01-01T11:00:00'),
        expected: -1,
      },
      {
        name: 'Compare dates with millisecond precision',
        date1: new Date('2024-01-01T12:00:00.001Z'),
        date2: new Date('2024-01-01T12:00:00.002Z'),
        expected: -1,
      },
    ])('should correctly compare $name', ({ date1, date2, expected }) => {
      expect(compare(date1, date2)).toBe(expected);
      expect(compare(date2, date1)).toBe(-expected);
    });

    describe('Descending order scenarios', () => {
      it('should reverse comparison results for DESC order', () => {
        const earlier = new Date('2024-01-01');
        const later = new Date('2024-01-02');

        expect(compare(earlier, later, 'ASC')).toBe(-1);
        expect(compare(earlier, later, 'DESC')).toBe(1);
        expect(compare(later, earlier, 'ASC')).toBe(1);
        expect(compare(later, earlier, 'DESC')).toBe(-1);
      });
    });
  });

  // T005: Array.sort() integration tests
  describe('Array.sort() integration', () => {
    it('should sort dates in ascending order', () => {
      const dates = [
        new Date('2024-01-03'),
        new Date('2024-01-01'),
        new Date('2024-01-02'),
      ];

      dates.sort(compare);

      expect(dates[0].toISOString()).toBe('2024-01-01T00:00:00.000Z');
      expect(dates[1].toISOString()).toBe('2024-01-02T00:00:00.000Z');
      expect(dates[2].toISOString()).toBe('2024-01-03T00:00:00.000Z');
    });

    it('should sort dates in descending order', () => {
      const dates = [
        new Date('2024-01-01'),
        new Date('2024-01-03'),
        new Date('2024-01-02'),
      ];

      dates.sort((a, b) => compare(a, b, 'DESC'));

      expect(dates[0].toISOString()).toBe('2024-01-03T00:00:00.000Z');
      expect(dates[1].toISOString()).toBe('2024-01-02T00:00:00.000Z');
      expect(dates[2].toISOString()).toBe('2024-01-01T00:00:00.000Z');
    });

    it('should maintain sort stability for equal dates', () => {
      const date1 = new Date('2024-01-01T00:00:00.000Z');
      const date2 = new Date('2024-01-01T00:00:00.000Z');
      const date3 = new Date('2024-01-02T00:00:00.000Z');

      const dates = [date3, date1, date2];
      dates.sort(compare);

      expect(compare(dates[0], dates[1])).toBe(0); // First two should be equal
      expect(dates[2]).toBe(date3); // Last should be the later date
    });

    it('should work with large date arrays', () => {
      const dates = Array.from({ length: 100 }, (_, i) =>
        new Date(2024, 0, Math.floor(Math.random() * 31) + 1)
      );
      const originalDates = [...dates];

      dates.sort(compare);

      // Verify sorting is correct
      for (let i = 1; i < dates.length; i++) {
        expect(compare(dates[i-1], dates[i])).toBeLessThanOrEqual(0);
      }

      // Verify all original dates are still present
      expect(dates).toHaveLength(originalDates.length);
    });
  });

  // T006: Error handling tests for invalid arguments
  describe('Error handling', () => {
    describe('Invalid first argument', () => {
      it.each([
        { name: 'null', input: null },
        { name: 'undefined', input: undefined },
        { name: 'string', input: '2024-01-01' },
        { name: 'number', input: 1704067200000 },
        { name: 'boolean', input: true },
        { name: 'object', input: {} },
        { name: 'array', input: [] },
      ])('should throw RangeError for $name as first argument', ({ input }) => {
        expect(() => {
          compare(input as any, new Date());
        }).toThrow(RangeError);
        expect(() => {
          compare(input as any, new Date());
        }).toThrow('First argument must be a Date object');
      });
    });

    describe('Invalid second argument', () => {
      it.each([
        { name: 'null', input: null },
        { name: 'undefined', input: undefined },
        { name: 'string', input: '2024-01-01' },
        { name: 'number', input: 1704067200000 },
        { name: 'boolean', input: true },
        { name: 'object', input: {} },
        { name: 'array', input: [] },
      ])('should throw RangeError for $name as second argument', ({ input }) => {
        expect(() => {
          compare(new Date(), input as any);
        }).toThrow(RangeError);
        expect(() => {
          compare(new Date(), input as any);
        }).toThrow('Second argument must be a Date object');
      });
    });

    describe('Invalid Date objects', () => {
      it('should throw RangeError for invalid first date', () => {
        const invalidDate = new Date('invalid');
        const validDate = new Date();

        expect(() => {
          compare(invalidDate, validDate);
        }).toThrow(RangeError);
        expect(() => {
          compare(invalidDate, validDate);
        }).toThrow('First date is invalid');
      });

      it('should throw RangeError for invalid second date', () => {
        const validDate = new Date();
        const invalidDate = new Date('invalid');

        expect(() => {
          compare(validDate, invalidDate);
        }).toThrow(RangeError);
        expect(() => {
          compare(validDate, invalidDate);
        }).toThrow('Second date is invalid');
      });
    });

    describe('Invalid order parameter', () => {
      it.each([
        'asc',
        'desc',
        'ASCENDING',
        'DESCENDING',
        'up',
        'down',
        1,
        true,
        null,
        {},
        [],
      ])('should throw RangeError for invalid order: %s', (invalidOrder) => {
        expect(() => {
          compare(new Date(), new Date(), invalidOrder as any);
        }).toThrow(RangeError);
        expect(() => {
          compare(new Date(), new Date(), invalidOrder as any);
        }).toThrow("Order must be 'ASC' or 'DESC'");
      });
    });
  });

  // T007: Edge case tests for date boundaries and precision
  describe('Edge cases', () => {
    describe('Date boundaries', () => {
      it('should handle maximum valid Date timestamp', () => {
        const maxDate = new Date(8640000000000000);
        const normalDate = new Date('2024-01-01');

        expect(compare(normalDate, maxDate)).toBe(-1);
        expect(compare(maxDate, normalDate)).toBe(1);
        expect(compare(maxDate, maxDate)).toBe(0);
      });

      it('should handle minimum valid Date timestamp', () => {
        const minDate = new Date(-8640000000000000);
        const normalDate = new Date('2024-01-01');

        expect(compare(minDate, normalDate)).toBe(-1);
        expect(compare(normalDate, minDate)).toBe(1);
        expect(compare(minDate, minDate)).toBe(0);
      });

      it('should handle Unix epoch', () => {
        const epochDate = new Date(0);
        const laterDate = new Date('2024-01-01');

        expect(compare(epochDate, laterDate)).toBe(-1);
        expect(compare(laterDate, epochDate)).toBe(1);
        expect(compare(epochDate, new Date(0))).toBe(0);
      });
    });

    describe('Precision handling', () => {
      it('should handle millisecond precision differences', () => {
        const date1 = new Date('2024-01-01T12:00:00.001Z');
        const date2 = new Date('2024-01-01T12:00:00.002Z');

        expect(compare(date1, date2)).toBe(-1);
        expect(compare(date2, date1)).toBe(1);
      });

      it('should handle identical timestamps created differently', () => {
        const date1 = new Date('2024-01-01T00:00:00.000Z');
        const date2 = new Date(2024, 0, 1, 0, 0, 0, 0);

        // Adjust for timezone if needed
        date2.setTime(date1.getTime());

        expect(compare(date1, date2)).toBe(0);
      });
    });

    describe('Timezone consistency', () => {
      it('should compare dates consistently regardless of timezone representation', () => {
        // Same moment in time, different timezone representations
        const utcDate = new Date('2024-01-01T12:00:00.000Z');
        const localDate = new Date(utcDate.getTime());

        expect(compare(utcDate, localDate)).toBe(0);
      });
    });
  });

  // T008: Performance comparison tests vs native Date comparison
  describe('Performance tests', () => {
    it('should perform comparably to direct Date comparison', () => {
      const dates1 = Array.from({ length: 1000 }, () =>
        new Date(Math.random() * 1000000000000)
      );
      const dates2 = [...dates1];

      // Native comparison performance
      const startNative = performance.now();
      dates1.sort((a, b) => a.getTime() - b.getTime());
      const nativeTime = performance.now() - startNative;

      // Compare function performance
      const startCompare = performance.now();
      dates2.sort(compare);
      const compareTime = performance.now() - startCompare;

      // Implementation should be within reasonable factor of native performance
      expect(compareTime).toBeLessThan(nativeTime * 10);
    });

    it('should handle rapid successive comparisons efficiently', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      const startTime = performance.now();

      // Perform many rapid comparisons
      for (let i = 0; i < 10000; i++) {
        compare(date1, date2);
        compare(date2, date1);
        compare(date1, date1);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (1 second for 30k operations)
      expect(duration).toBeLessThan(1000);
    });
  });

  // T009: Compatibility tests verifying correct -1/0/1 return values for Array.sort()
  describe('Array.sort() compatibility', () => {
    it('should return only -1, 0, or 1', () => {
      const testCases = [
        [new Date('2024-01-01'), new Date('2024-01-02')], // -1
        [new Date('2024-01-02'), new Date('2024-01-01')], // 1
        [new Date('2024-01-01'), new Date('2024-01-01')], // 0
        [new Date(0), new Date(1000)], // -1
        [new Date(8640000000000000), new Date(-8640000000000000)], // 1
      ];

      testCases.forEach(([date1, date2]) => {
        const result = compare(date1, date2);
        expect([-1, 0, 1]).toContain(result);
      });
    });

    it('should satisfy transitivity property for sorting', () => {
      const a = new Date('2024-01-01');
      const b = new Date('2024-01-02');
      const c = new Date('2024-01-03');

      // If a < b and b < c, then a < c
      expect(compare(a, b)).toBe(-1);
      expect(compare(b, c)).toBe(-1);
      expect(compare(a, c)).toBe(-1);
    });

    it('should satisfy antisymmetry property', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');

      // If compare(a,b) = x, then compare(b,a) = -x (except when x = 0)
      const result1 = compare(date1, date2);
      const result2 = compare(date2, date1);

      if (result1 === 0) {
        expect(result2).toBe(0);
      } else {
        expect(result2).toBe(-result1);
      }
    });

    it('should satisfy reflexivity property', () => {
      const date = new Date('2024-01-01');

      // compare(a, a) should always be 0
      expect(compare(date, date)).toBe(0);
    });

    it('should work correctly with Array.sort() for various scenarios', () => {
      // Test with duplicate dates
      const dates = [
        new Date('2024-01-03'),
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-01'), // duplicate
        new Date('2024-01-03'), // duplicate
      ];

      dates.sort(compare);

      // Verify sorted order
      expect(dates[0].getTime()).toBeLessThanOrEqual(dates[1].getTime());
      expect(dates[1].getTime()).toBeLessThanOrEqual(dates[2].getTime());
      expect(dates[2].getTime()).toBeLessThanOrEqual(dates[3].getTime());
      expect(dates[3].getTime()).toBeLessThanOrEqual(dates[4].getTime());
    });
  });
});