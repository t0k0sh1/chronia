import { describe, it, expect } from 'vitest';
import { setTime } from '../src/setTime/index.js';

describe('setTime', () => {
  describe('Basic functionality', () => {
    it.each([
      {
        name: 'Standard timestamp',
        timestamp: 1704067200000,
        expectedISO: '2024-01-01T00:00:00.000Z',
      },
      {
        name: 'Unix epoch',
        timestamp: 0,
        expectedISO: '1970-01-01T00:00:00.000Z',
      },
      {
        name: 'Negative timestamp (before epoch)',
        timestamp: -86400000,
        expectedISO: '1969-12-31T00:00:00.000Z',
      },
      {
        name: 'Current timestamp',
        timestamp: Date.now(),
        expectedISO: new Date(Date.now()).toISOString(),
      },
    ])('should set $name correctly', ({ timestamp, expectedISO }) => {
      const originalDate = new Date();
      const result = setTime(originalDate, timestamp);

      expect(result).not.toBe(originalDate); // Different object reference
      expect(result.getTime()).toBe(timestamp);
      expect(result.toISOString()).toBe(expectedISO);
      // Original date should be unchanged
      expect(originalDate.getTime()).not.toBe(timestamp);
    });
  });

  describe('Invalid timestamp handling', () => {
    it.each([
      {
        name: 'NaN timestamp',
        timestamp: NaN,
      },
      {
        name: 'Infinity timestamp',
        timestamp: Infinity,
      },
      {
        name: '-Infinity timestamp',
        timestamp: -Infinity,
      },
      {
        name: 'Beyond max valid range',
        timestamp: 8.64e15 + 1,
      },
    ])('should handle $name appropriately', ({ timestamp }) => {
      const originalDate = new Date();
      const originalTimestamp = originalDate.getTime();
      const result = setTime(originalDate, timestamp);

      expect(result).not.toBe(originalDate); // Different object reference
      expect(result.getTime()).toBeNaN();
      // Original date should be unchanged
      expect(originalDate.getTime()).toBe(originalTimestamp);
    });
  });

  describe('Edge cases', () => {
    it.each([
      {
        name: 'Maximum valid Date timestamp',
        timestamp: 8.64e15,
        expectedValid: true,
      },
      {
        name: 'Minimum valid Date timestamp',
        timestamp: -8.64e15,
        expectedValid: true,
      },
      {
        name: 'Fractional milliseconds preserved',
        timestamp: 1.5,
        expectedTimestamp: new Date(1.5).getTime(),
      },
    ])('should handle $name correctly', ({ timestamp, expectedValid, expectedTimestamp }) => {
      const originalDate = new Date();
      const originalTimestamp = originalDate.getTime();
      const result = setTime(originalDate, timestamp);

      expect(result).not.toBe(originalDate); // Different object reference
      // Original date should be unchanged
      expect(originalDate.getTime()).toBe(originalTimestamp);

      if (expectedValid !== undefined) {
        if (expectedValid) {
          expect(result.getTime()).toBe(timestamp);
          expect(!isNaN(result.getTime())).toBe(true);
        } else {
          expect(result.getTime()).toBeNaN();
        }
      }

      if (expectedTimestamp !== undefined) {
        expect(result.getTime()).toBe(expectedTimestamp);
      }
    });
  });

  describe('Immutability behavior', () => {
    it('should NOT modify original Date object', () => {
      const originalDate = new Date('2020-01-01');
      const originalTimestamp = originalDate.getTime();
      const newTimestamp = 1704067200000;

      const result = setTime(originalDate, newTimestamp);

      expect(result).not.toBe(originalDate); // Different reference
      expect(originalDate.getTime()).toBe(originalTimestamp); // Unchanged
      expect(result.getTime()).toBe(newTimestamp); // New date has new timestamp
    });

    it('should return new Date object', () => {
      const date = new Date();
      const result = setTime(date, 1704067200000);

      expect(result).not.toBe(date);
      expect(result instanceof Date).toBe(true);
    });
  });

  describe('Method chaining support', () => {
    it('should support chaining with Date methods', () => {
      const originalDate = new Date();
      const result = setTime(originalDate, 1704067200000);

      // Should be able to chain methods
      const isoString = result.toISOString();
      expect(isoString).toBe('2024-01-01T00:00:00.000Z');

      // Multiple setTime calls create new objects each time
      const finalResult = setTime(result, 0);
      expect(finalResult.toISOString()).toBe('1970-01-01T00:00:00.000Z');
      expect(finalResult).not.toBe(result);
      expect(finalResult).not.toBe(originalDate);
    });

    it('should support fluent interface', () => {
      const date = new Date();

      const chainedResult = setTime(date, 1704067200000)
        .toISOString();

      expect(typeof chainedResult).toBe('string');
      expect(chainedResult).toBe('2024-01-01T00:00:00.000Z');
      // Original date should be unchanged
      expect(date.getTime()).not.toBe(1704067200000);
    });
  });

  describe('Native compatibility', () => {
    it('should create dates with same state as native setTime()', () => {
      const testTimestamp = 1704067200000;

      // Native behavior
      const nativeDate = new Date();
      nativeDate.setTime(testTimestamp);

      // Our implementation
      const originalDate = new Date();
      const implResult = setTime(originalDate, testTimestamp);

      expect(implResult.getTime()).toBe(nativeDate.getTime());
      expect(implResult.toISOString()).toBe(nativeDate.toISOString());
    });

    it('should match native invalid timestamp handling', () => {
      // Native behavior with NaN
      const nativeDate = new Date();
      nativeDate.setTime(NaN);

      // Our implementation with NaN
      const originalDate = new Date();
      const implResult = setTime(originalDate, NaN);

      expect(implResult.getTime()).toBeNaN();
      expect(nativeDate.getTime()).toBeNaN();
    });

    it.each([
      1704067200000,
      0,
      -86400000,
      NaN,
      Infinity,
      -Infinity,
    ])('should create date with same state as native for timestamp %s', (timestamp) => {
      const nativeDate = new Date();
      nativeDate.setTime(timestamp);

      const originalDate = new Date();
      const implResult = setTime(originalDate, timestamp);

      if (isNaN(nativeDate.getTime())) {
        expect(implResult.getTime()).toBeNaN();
      } else {
        expect(implResult.getTime()).toBe(nativeDate.getTime());
      }
    });
  });

  describe.skip('Performance', () => {
    it('should perform comparably to native setTime()', () => {
      const dates1 = Array.from({ length: 1000 }, () => new Date());
      const dates2 = Array.from({ length: 1000 }, () => new Date());
      const timestamp = Date.now();

      // Native performance
      const startNative = performance.now();
      dates1.forEach(date => date.setTime(timestamp));
      const nativeTime = performance.now() - startNative;

      // Implementation performance
      const startImpl = performance.now();
      dates2.forEach(date => setTime(date, timestamp));
      const implTime = performance.now() - startImpl;

      // Implementation should be within reasonable factor of native performance
      expect(implTime).toBeLessThan(nativeTime * 10);
    });
  });

  describe('Return value behavior', () => {
    it('should always return new Date object', () => {
      const date = new Date();
      const result = setTime(date, 1704067200000);

      expect(result).not.toBe(date);
      expect(result instanceof Date).toBe(true);
    });

    it('should return Date object even for invalid timestamps', () => {
      const date = new Date();
      const result = setTime(date, NaN);

      expect(result).not.toBe(date);
      expect(result instanceof Date).toBe(true);
    });
  });

  describe('Type safety', () => {
    it.each([
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'string', input: '2024-01-01' },
      { name: 'number', input: 1704067200000 },
      { name: 'boolean', input: true },
      { name: 'object', input: {} },
      { name: 'array', input: [] },
    ])('should return new Date(NaN) for $name as first argument', ({ input }) => {
      const result = setTime(input as any, 1704067200000);
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
    });

    it.each([
      { name: 'null', input: null },
      { name: 'undefined', input: undefined },
      { name: 'string', input: '1704067200000' },
      { name: 'boolean', input: true },
      { name: 'object', input: {} },
      { name: 'array', input: [] },
    ])('should return new Date(NaN) for $name as second argument', ({ input }) => {
      const date = new Date();
      const result = setTime(date, input as any);
      expect(result instanceof Date).toBe(true);
      expect(result.getTime()).toBeNaN();
      expect(result).not.toBe(date); // Should not modify original
    });

    it('should accept number values including special numbers', () => {
      const date = new Date();

      // These should not return NaN due to type issues, only due to invalid timestamp values
      expect(setTime(date, NaN).getTime()).toBeNaN();
      expect(setTime(date, Infinity).getTime()).toBeNaN();
      expect(setTime(date, -Infinity).getTime()).toBeNaN();
      expect(setTime(date, 0).getTime()).toBe(0);
      expect(setTime(date, -1).getTime()).toBe(-1);

      // All should return Date objects
      expect(setTime(date, NaN) instanceof Date).toBe(true);
      expect(setTime(date, Infinity) instanceof Date).toBe(true);
      expect(setTime(date, -Infinity) instanceof Date).toBe(true);
      expect(setTime(date, 0) instanceof Date).toBe(true);
      expect(setTime(date, -1) instanceof Date).toBe(true);
    });
  });
});