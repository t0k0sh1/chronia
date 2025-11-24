import { describe, it, expect } from 'vitest';
import { compareDateTimes } from '../../src/_lib/compareDates';

describe('compareDateTimes', () => {
  // Priority 1: Invalid Inputs (Highest Priority)
  describe('invalid inputs', () => {
    describe('Invalid Date handling', () => {
      it('should return false when first parameter is Invalid Date', () => {
        const invalidDate = new Date('invalid');
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(invalidDate, validDate)).toBe(false);
      });

      it('should return false when second parameter is Invalid Date', () => {
        const validDate = new Date(2025, 0, 1);
        const invalidDate = new Date('invalid');
        expect(compareDateTimes(validDate, invalidDate)).toBe(false);
      });

      it('should return false when both parameters are Invalid Date', () => {
        const invalid1 = new Date('invalid');
        const invalid2 = new Date('not a date');
        expect(compareDateTimes(invalid1, invalid2)).toBe(false);
      });
    });

    describe('NaN handling', () => {
      it('should return false when first parameter is NaN', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(NaN, validDate)).toBe(false);
      });

      it('should return false when second parameter is NaN', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(validDate, NaN)).toBe(false);
      });

      it('should return false when both parameters are NaN', () => {
        expect(compareDateTimes(NaN, NaN)).toBe(false);
      });
    });

    describe('Infinity handling', () => {
      it('should return false when first parameter is Infinity', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(Infinity, validDate)).toBe(false);
      });

      it('should return false when first parameter is -Infinity', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(-Infinity, validDate)).toBe(false);
      });

      it('should return false when second parameter is Infinity', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(validDate, Infinity)).toBe(false);
      });

      it('should return false when second parameter is -Infinity', () => {
        const validDate = new Date(2025, 0, 1);
        expect(compareDateTimes(validDate, -Infinity)).toBe(false);
      });

      it('should return false when both parameters are Infinity', () => {
        expect(compareDateTimes(Infinity, Infinity)).toBe(false);
      });

      it('should return false when both parameters are -Infinity', () => {
        expect(compareDateTimes(-Infinity, -Infinity)).toBe(false);
      });

      it('should return false when first is Infinity and second is -Infinity', () => {
        expect(compareDateTimes(Infinity, -Infinity)).toBe(false);
      });
    });

    describe('mixed invalid inputs', () => {
      it('should return false when first is NaN and second is Infinity', () => {
        expect(compareDateTimes(NaN, Infinity)).toBe(false);
      });

      it('should return false when first is Invalid Date and second is NaN', () => {
        const invalidDate = new Date('invalid');
        expect(compareDateTimes(invalidDate, NaN)).toBe(false);
      });

      it('should return false when first is Infinity and second is Invalid Date', () => {
        const invalidDate = new Date('invalid');
        expect(compareDateTimes(Infinity, invalidDate)).toBe(false);
      });
    });
  });

  // Priority 2: Boundary Cases (High Priority)
  describe('boundary cases', () => {
    describe('millisecond precision boundaries', () => {
      it('should correctly identify larger date when differing by 1 millisecond', () => {
        const earlier = new Date(2025, 0, 1, 12, 0, 0, 0);
        const later = new Date(2025, 0, 1, 12, 0, 0, 1);
        expect(compareDateTimes(later, earlier)).toBe(1);
      });

      it('should correctly identify smaller date when differing by 1 millisecond', () => {
        const earlier = new Date(2025, 0, 1, 12, 0, 0, 0);
        const later = new Date(2025, 0, 1, 12, 0, 0, 1);
        expect(compareDateTimes(earlier, later)).toBe(-1);
      });

      it('should return 0 for identical timestamps', () => {
        const date1 = new Date(2025, 0, 1, 12, 0, 0, 500);
        const date2 = new Date(2025, 0, 1, 12, 0, 0, 500);
        expect(compareDateTimes(date1, date2)).toBe(0);
      });

      it('should return 0 for same Date object reference', () => {
        const date = new Date(2025, 0, 1);
        expect(compareDateTimes(date, date)).toBe(0);
      });
    });

    describe('extreme timestamp boundaries', () => {
      it('should handle minimum safe integer timestamp', () => {
        const MIN_SAFE_TIMESTAMP = Number.MIN_SAFE_INTEGER;
        const laterDate = new Date(2025, 0, 1);
        // Note: MIN_SAFE_INTEGER is beyond valid Date range, should return false
        expect(compareDateTimes(MIN_SAFE_TIMESTAMP, laterDate)).toBe(false);
      });

      it('should handle maximum safe integer timestamp', () => {
        const MAX_SAFE_TIMESTAMP = Number.MAX_SAFE_INTEGER;
        const earlierDate = new Date(2025, 0, 1);
        // Note: MAX_SAFE_INTEGER is beyond valid Date range, should return false
        expect(compareDateTimes(MAX_SAFE_TIMESTAMP, earlierDate)).toBe(false);
      });

      it('should handle epoch timestamp (0)', () => {
        const epoch = 0;
        const laterDate = new Date(2025, 0, 1);
        expect(compareDateTimes(epoch, laterDate)).toBe(-1);
      });

      it('should handle negative timestamp (before epoch)', () => {
        const beforeEpoch = -86400000; // 1 day before epoch
        const afterEpoch = 86400000; // 1 day after epoch
        expect(compareDateTimes(beforeEpoch, afterEpoch)).toBe(-1);
      });
    });

    describe('timestamp edge cases', () => {
      it('should handle comparison at epoch boundary', () => {
        const justBeforeEpoch = -1;
        const epoch = 0;
        expect(compareDateTimes(justBeforeEpoch, epoch)).toBe(-1);
      });

      it('should handle comparison at epoch boundary (reverse)', () => {
        const epoch = 0;
        const justAfterEpoch = 1;
        expect(compareDateTimes(epoch, justAfterEpoch)).toBe(-1);
      });
    });
  });

  // Priority 3: Happy Path (Minimum Necessary)
  describe('happy path', () => {
    describe('Date object comparisons', () => {
      it('should return 1 when first Date is after second Date', () => {
        const earlier = new Date(2025, 0, 1);
        const later = new Date(2025, 0, 2);
        expect(compareDateTimes(later, earlier)).toBe(1);
      });

      it('should return -1 when first Date is before second Date', () => {
        const earlier = new Date(2025, 0, 1);
        const later = new Date(2025, 0, 2);
        expect(compareDateTimes(earlier, later)).toBe(-1);
      });

      it('should return 0 when Dates are equal', () => {
        const date1 = new Date(2025, 0, 1, 12, 30, 45, 123);
        const date2 = new Date(2025, 0, 1, 12, 30, 45, 123);
        expect(compareDateTimes(date1, date2)).toBe(0);
      });
    });

    describe('timestamp comparisons', () => {
      it('should return 1 when first timestamp is greater', () => {
        const earlier = 1704067200000; // 2024-01-01
        const later = 1704153600000; // 2024-01-02
        expect(compareDateTimes(later, earlier)).toBe(1);
      });

      it('should return -1 when first timestamp is smaller', () => {
        const earlier = 1704067200000;
        const later = 1704153600000;
        expect(compareDateTimes(earlier, later)).toBe(-1);
      });

      it('should return 0 when timestamps are equal', () => {
        const timestamp = 1704067200000;
        expect(compareDateTimes(timestamp, timestamp)).toBe(0);
      });
    });

    describe('mixed type comparisons', () => {
      it('should handle Date vs timestamp comparison (Date larger)', () => {
        const dateObj = new Date(2025, 0, 2);
        const timestamp = new Date(2025, 0, 1).getTime();
        expect(compareDateTimes(dateObj, timestamp)).toBe(1);
      });

      it('should handle Date vs timestamp comparison (Date smaller)', () => {
        const dateObj = new Date(2025, 0, 1);
        const timestamp = new Date(2025, 0, 2).getTime();
        expect(compareDateTimes(dateObj, timestamp)).toBe(-1);
      });

      it('should handle Date vs timestamp comparison (equal)', () => {
        const dateObj = new Date(2025, 0, 1, 12, 0, 0);
        const timestamp = dateObj.getTime();
        expect(compareDateTimes(dateObj, timestamp)).toBe(0);
      });

      it('should handle timestamp vs Date comparison (timestamp larger)', () => {
        const timestamp = new Date(2025, 0, 2).getTime();
        const dateObj = new Date(2025, 0, 1);
        expect(compareDateTimes(timestamp, dateObj)).toBe(1);
      });
    });
  });
});
