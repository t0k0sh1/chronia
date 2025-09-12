import { describe, it, expect } from 'vitest';
import { getSeconds } from '../src/getSeconds';

describe('getSeconds', () => {
  it.each([
    ['2024-01-15T00:00:00', 0],
    ['2024-01-15T01:30:45', 45],
    ['2024-01-15T12:45:30', 30],
    ['2024-01-15T23:59:59', 59],
    ['2024-01-15T15:15:15', 15],
    ['2024-12-31T23:01:01', 1],
    ['2024-02-29T08:25:25', 25],
    ['2024-01-01T00:00:00', 0],
    ['1970-01-01T00:00:00', 0],
    ['2000-01-01T18:42:42', 42],
  ])('returns seconds from date string %s', (dateString, expected) => {
    const date = new Date(dateString);
    expect(getSeconds(date)).toBe(expected);
  });

  it.each([
    [new Date(2024, 0, 15, 0, 0, 0), 0],
    [new Date(2024, 0, 15, 1, 30, 45), 45],
    [new Date(2024, 0, 15, 12, 45, 30), 30],
    [new Date(2024, 0, 15, 23, 59, 59), 59],
    [new Date(2024, 0, 15, 15, 15, 15), 15],
    [new Date(2024, 11, 31, 23, 1, 1), 1],
    [new Date(2024, 1, 29, 8, 25, 25), 25],
    [new Date(2024, 0, 1, 0, 0, 0), 0],
    [new Date(1970, 0, 1, 0, 0, 0), 0],
    [new Date(2000, 0, 1, 18, 42, 42), 42],
  ])('returns seconds from Date object %s', (date, expected) => {
    expect(getSeconds(date)).toBe(expected);
  });

  it.each([
    [0, new Date(0).getSeconds()],
    [1705276800000, new Date(1705276800000).getSeconds()],
    [1705318200000, new Date(1705318200000).getSeconds()],
    [1705359599000, new Date(1705359599000).getSeconds()],
    [Date.now(), new Date().getSeconds()],
  ])('returns seconds from timestamp %d', (timestamp, expected) => {
    expect(getSeconds(timestamp)).toBe(expected);
  });

  it('handles boundary values correctly', () => {
    const startOfMinute = new Date(2024, 0, 1, 10, 30, 0);
    expect(getSeconds(startOfMinute)).toBe(0);

    const endOfMinute = new Date(2024, 0, 1, 10, 30, 59);
    expect(getSeconds(endOfMinute)).toBe(59);

    const midMinute = new Date(2024, 0, 1, 10, 30, 30);
    expect(getSeconds(midMinute)).toBe(30);
  });

  it('handles different timezones correctly', () => {
    const utcDate = new Date(Date.UTC(2024, 0, 15, 14, 33, 47));
    const localSeconds = utcDate.getSeconds();
    expect(getSeconds(utcDate)).toBe(localSeconds);
  });

  it('handles negative years', () => {
    const bcDate = new Date(-100, 0, 1, 10, 45, 33);
    expect(getSeconds(bcDate)).toBe(33);
  });

  it('handles far future dates', () => {
    const futureDate = new Date(9999, 11, 31, 20, 15, 55);
    expect(getSeconds(futureDate)).toBe(55);
  });

  it('handles milliseconds correctly', () => {
    const dateWithMs = new Date(2024, 0, 1, 10, 30, 45, 999);
    expect(getSeconds(dateWithMs)).toBe(45);
  });
});