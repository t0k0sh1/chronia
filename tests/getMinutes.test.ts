import { describe, it, expect } from 'vitest';
import { getMinutes } from '../src/getMinutes';

describe('getMinutes', () => {
  it.each([
    ['2024-01-15T00:00:00', 0],
    ['2024-01-15T01:30:45', 30],
    ['2024-01-15T12:45:00', 45],
    ['2024-01-15T23:59:59', 59],
    ['2024-01-15T15:15:30', 15],
    ['2024-12-31T23:01:00', 1],
    ['2024-02-29T08:25:00', 25],
    ['2024-01-01T00:00:00', 0],
    ['1970-01-01T00:00:00', 0],
    ['2000-01-01T18:42:00', 42],
  ])('returns minutes from date string %s', (dateString, expected) => {
    const date = new Date(dateString);
    expect(getMinutes(date)).toBe(expected);
  });

  it.each([
    [new Date(2024, 0, 15, 0, 0, 0), 0],
    [new Date(2024, 0, 15, 1, 30, 45), 30],
    [new Date(2024, 0, 15, 12, 45, 0), 45],
    [new Date(2024, 0, 15, 23, 59, 59), 59],
    [new Date(2024, 0, 15, 15, 15, 30), 15],
    [new Date(2024, 11, 31, 23, 1, 0), 1],
    [new Date(2024, 1, 29, 8, 25, 0), 25],
    [new Date(2024, 0, 1, 0, 0, 0), 0],
    [new Date(1970, 0, 1, 0, 0, 0), 0],
    [new Date(2000, 0, 1, 18, 42, 0), 42],
  ])('returns minutes from Date object %s', (date, expected) => {
    expect(getMinutes(date)).toBe(expected);
  });

  it.each([
    [0, new Date(0).getMinutes()],
    [1705276800000, new Date(1705276800000).getMinutes()],
    [1705318200000, new Date(1705318200000).getMinutes()],
    [1705359599000, new Date(1705359599000).getMinutes()],
    [Date.now(), new Date().getMinutes()],
  ])('returns minutes from timestamp %d', (timestamp, expected) => {
    expect(getMinutes(timestamp)).toBe(expected);
  });

  it('handles boundary values correctly', () => {
    const startOfHour = new Date(2024, 0, 1, 10, 0, 0);
    expect(getMinutes(startOfHour)).toBe(0);

    const endOfHour = new Date(2024, 0, 1, 10, 59, 59);
    expect(getMinutes(endOfHour)).toBe(59);

    const midHour = new Date(2024, 0, 1, 10, 30, 0);
    expect(getMinutes(midHour)).toBe(30);
  });

  it('handles different timezones correctly', () => {
    const utcDate = new Date(Date.UTC(2024, 0, 15, 14, 33, 0));
    const localMinutes = utcDate.getMinutes();
    expect(getMinutes(utcDate)).toBe(localMinutes);
  });

  it('handles negative years', () => {
    const bcDate = new Date(-100, 0, 1, 10, 45, 0);
    expect(getMinutes(bcDate)).toBe(45);
  });

  it('handles far future dates', () => {
    const futureDate = new Date(9999, 11, 31, 20, 15, 0);
    expect(getMinutes(futureDate)).toBe(15);
  });
});