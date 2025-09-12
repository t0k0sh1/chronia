import { describe, it, expect } from 'vitest';
import { getMilliseconds } from '../src/getMilliseconds';

describe('getMilliseconds', () => {
  it.each([
    [new Date(2024, 0, 15, 0, 0, 0, 0), 0],
    [new Date(2024, 0, 15, 1, 30, 45, 123), 123],
    [new Date(2024, 0, 15, 12, 45, 30, 456), 456],
    [new Date(2024, 0, 15, 23, 59, 59, 999), 999],
    [new Date(2024, 0, 15, 15, 15, 15, 500), 500],
    [new Date(2024, 11, 31, 23, 1, 1, 1), 1],
    [new Date(2024, 1, 29, 8, 25, 25, 250), 250],
    [new Date(2024, 0, 1, 0, 0, 0, 0), 0],
    [new Date(1970, 0, 1, 0, 0, 0, 0), 0],
    [new Date(2000, 0, 1, 18, 42, 42, 750), 750],
  ])('returns milliseconds from Date object %s', (date, expected) => {
    expect(getMilliseconds(date)).toBe(expected);
  });

  it.each([
    [0, 0],
    [123, 123],
    [999, 999],
    [1000, 0],
    [1500, 500],
    [59999, 999],
    [60000, 0],
    [1705276800000, 0],
    [1705276800123, 123],
    [1705276800999, 999],
  ])('returns milliseconds from timestamp %d', (timestamp, expected) => {
    expect(getMilliseconds(timestamp)).toBe(expected);
  });

  it('handles boundary values correctly', () => {
    const startOfSecond = new Date(2024, 0, 1, 10, 30, 45, 0);
    expect(getMilliseconds(startOfSecond)).toBe(0);

    const endOfSecond = new Date(2024, 0, 1, 10, 30, 45, 999);
    expect(getMilliseconds(endOfSecond)).toBe(999);

    const midSecond = new Date(2024, 0, 1, 10, 30, 45, 500);
    expect(getMilliseconds(midSecond)).toBe(500);
  });

  it('handles different timezones correctly', () => {
    const utcDate = new Date(Date.UTC(2024, 0, 15, 14, 33, 47, 333));
    const localMilliseconds = utcDate.getMilliseconds();
    expect(getMilliseconds(utcDate)).toBe(localMilliseconds);
  });

  it('handles negative years', () => {
    const bcDate = new Date(-100, 0, 1, 10, 45, 33, 666);
    expect(getMilliseconds(bcDate)).toBe(666);
  });

  it('handles far future dates', () => {
    const futureDate = new Date(9999, 11, 31, 20, 15, 55, 888);
    expect(getMilliseconds(futureDate)).toBe(888);
  });

  it('handles current time', () => {
    const now = Date.now();
    const expected = new Date(now).getMilliseconds();
    expect(getMilliseconds(now)).toBe(expected);
  });

  it('handles various millisecond values', () => {
    for (let ms = 0; ms < 1000; ms += 100) {
      const date = new Date(2024, 0, 1, 0, 0, 0, ms);
      expect(getMilliseconds(date)).toBe(ms);
    }
  });
});