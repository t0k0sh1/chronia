import { describe, it, expect } from 'vitest';
import { getHours } from '../src/getHours';

describe('getHours', () => {
  it.each([
    ['2024-01-15T00:00:00', 0],
    ['2024-01-15T01:30:45', 1],
    ['2024-01-15T12:00:00', 12],
    ['2024-01-15T23:59:59', 23],
    ['2024-01-15T15:45:30', 15],
    ['2024-12-31T23:00:00', 23],
    ['2024-02-29T08:15:00', 8],
    ['2024-01-01T00:00:00', 0],
    ['1970-01-01T00:00:00', 0],
    ['2000-01-01T18:30:00', 18],
  ])('returns hours from date string %s', (dateString, expected) => {
    const date = new Date(dateString);
    expect(getHours(date)).toBe(expected);
  });

  it.each([
    [new Date(2024, 0, 15, 0, 0, 0), 0],
    [new Date(2024, 0, 15, 1, 30, 45), 1],
    [new Date(2024, 0, 15, 12, 0, 0), 12],
    [new Date(2024, 0, 15, 23, 59, 59), 23],
    [new Date(2024, 0, 15, 15, 45, 30), 15],
    [new Date(2024, 11, 31, 23, 0, 0), 23],
    [new Date(2024, 1, 29, 8, 15, 0), 8],
    [new Date(2024, 0, 1, 0, 0, 0), 0],
    [new Date(1970, 0, 1, 0, 0, 0), 0],
    [new Date(2000, 0, 1, 18, 30, 0), 18],
  ])('returns hours from Date object %s', (date, expected) => {
    expect(getHours(date)).toBe(expected);
  });

  it.each([
    [0, new Date(0).getHours()],
    [1705276800000, new Date(1705276800000).getHours()],
    [1705318200000, new Date(1705318200000).getHours()],
    [1705359599000, new Date(1705359599000).getHours()],
    [Date.now(), new Date().getHours()],
  ])('returns hours from timestamp %d', (timestamp, expected) => {
    expect(getHours(timestamp)).toBe(expected);
  });

  it('handles boundary values correctly', () => {
    const midnight = new Date(2024, 0, 1, 0, 0, 0);
    expect(getHours(midnight)).toBe(0);

    const almostMidnight = new Date(2024, 0, 1, 23, 59, 59);
    expect(getHours(almostMidnight)).toBe(23);

    const noon = new Date(2024, 0, 1, 12, 0, 0);
    expect(getHours(noon)).toBe(12);
  });

  it('handles different timezones correctly', () => {
    const utcDate = new Date(Date.UTC(2024, 0, 15, 14, 30, 0));
    const localHours = utcDate.getHours();
    expect(getHours(utcDate)).toBe(localHours);
  });

  it('handles negative years', () => {
    const bcDate = new Date(-100, 0, 1, 10, 0, 0);
    expect(getHours(bcDate)).toBe(10);
  });

  it('handles far future dates', () => {
    const futureDate = new Date(9999, 11, 31, 20, 0, 0);
    expect(getHours(futureDate)).toBe(20);
  });
});