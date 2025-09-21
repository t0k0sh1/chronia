import { describe, it, expect } from "vitest";
import { isBetween } from "../src/isBetween";
import { MIN_DATE, MAX_DATE } from "../src/constants";
import type { Interval } from "../src/types";

describe("isBetween", () => {
  const baseDate = new Date(2024, 5, 15, 12, 30, 45); // June 15, 2024 12:30:45
  const startDate = new Date(2024, 5, 10, 10, 0, 0); // June 10, 2024 10:00:00
  const endDate = new Date(2024, 5, 20, 14, 0, 0); // June 20, 2024 14:00:00

  describe("normal cases", () => {
    it.each([
      // Basic between cases
      {
        date: baseDate,
        interval: { start: startDate, end: endDate },
        expected: true,
        description: "date between start and end",
      },
      {
        date: new Date(2024, 5, 12),
        interval: { start: startDate, end: endDate },
        expected: true,
        description: "date between boundaries",
      },

      // Boundary cases (strict comparison)
      {
        date: startDate,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "date equals start boundary (excluded)",
      },
      {
        date: endDate,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "date equals end boundary (excluded)",
      },

      // Outside range cases
      {
        date: new Date(2024, 5, 5),
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "date before start",
      },
      {
        date: new Date(2024, 5, 25),
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "date after end",
      },

      // Null boundary cases (using MIN_DATE/MAX_DATE)
      {
        date: baseDate,
        interval: { start: startDate, end: null },
        expected: true,
        description: "null end boundary uses MAX_DATE, date after start",
      },
      {
        date: new Date(2024, 5, 5),
        interval: { start: startDate, end: null },
        expected: false,
        description: "null end boundary uses MAX_DATE, date before start",
      },
      {
        date: startDate,
        interval: { start: startDate, end: null },
        expected: false,
        description: "null end boundary uses MAX_DATE, date equals start",
      },
      {
        date: baseDate,
        interval: { start: null, end: endDate },
        expected: true,
        description: "null start boundary uses MIN_DATE, date before end",
      },
      {
        date: new Date(2024, 5, 25),
        interval: { start: null, end: endDate },
        expected: false,
        description: "null start boundary uses MIN_DATE, date after end",
      },
      {
        date: endDate,
        interval: { start: null, end: endDate },
        expected: false,
        description: "null start boundary uses MIN_DATE, date equals end",
      },

      // Both boundaries null (MIN_DATE < date < MAX_DATE)
      {
        date: baseDate,
        interval: { start: null, end: null },
        expected: true,
        description: "both boundaries null uses MIN_DATE and MAX_DATE",
      },
      {
        date: MIN_DATE,
        interval: { start: null, end: null },
        expected: false,
        description: "both boundaries null, date equals MIN_DATE",
      },
      {
        date: MAX_DATE,
        interval: { start: null, end: null },
        expected: false,
        description: "both boundaries null, date equals MAX_DATE",
      },

      // Extreme boundary cases
      {
        date: new Date(2024, 5, 15),
        interval: { start: MIN_DATE, end: null },
        expected: true,
        description: "MIN_DATE as start, null as end",
      },
      {
        date: new Date(2024, 5, 15),
        interval: { start: null, end: MAX_DATE },
        expected: true,
        description: "null as start, MAX_DATE as end",
      },

      // Timestamp inputs
      {
        date: baseDate.getTime(),
        interval: { start: startDate.getTime(), end: endDate.getTime() },
        expected: true,
        description: "using timestamps",
      },
      {
        date: baseDate.getTime(),
        interval: { start: startDate, end: endDate.getTime() },
        expected: true,
        description: "mixed Date and timestamp",
      },
    ])(
      "$description",
      ({ date, interval, expected }) => {
        expect(isBetween(date, interval)).toBe(expected);
      },
    );
  });

  describe("invalid input cases", () => {
    it.each([
      // Invalid date parameter
      {
        date: new Date(NaN),
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "invalid date",
      },
      {
        date: "invalid" as any,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "non-date string as date",
      },
      {
        date: NaN,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "NaN as date",
      },
      {
        date: Infinity,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "Infinity as date",
      },
      {
        date: -Infinity,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "-Infinity as date",
      },
      {
        date: true as any,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "boolean as date",
      },
      {
        date: {} as any,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "object as date",
      },
      {
        date: [] as any,
        interval: { start: startDate, end: endDate },
        expected: false,
        description: "array as date",
      },

      // Invalid interval parameter
      {
        date: baseDate,
        interval: null as any,
        expected: false,
        description: "null as interval",
      },
      {
        date: baseDate,
        interval: undefined as any,
        expected: false,
        description: "undefined as interval",
      },
      {
        date: baseDate,
        interval: "invalid" as any,
        expected: false,
        description: "string as interval",
      },
      {
        date: baseDate,
        interval: 123 as any,
        expected: false,
        description: "number as interval",
      },
      {
        date: baseDate,
        interval: true as any,
        expected: false,
        description: "boolean as interval",
      },

      // Invalid start/end in interval
      {
        date: baseDate,
        interval: { start: new Date(NaN), end: endDate },
        expected: false,
        description: "invalid start date",
      },
      {
        date: baseDate,
        interval: { start: startDate, end: new Date(NaN) },
        expected: false,
        description: "invalid end date",
      },
      {
        date: baseDate,
        interval: { start: "invalid" as any, end: endDate },
        expected: false,
        description: "non-date string as start",
      },
      {
        date: baseDate,
        interval: { start: startDate, end: "invalid" as any },
        expected: false,
        description: "non-date string as end",
      },
      {
        date: baseDate,
        interval: { start: true as any, end: endDate },
        expected: false,
        description: "boolean as start",
      },
      {
        date: baseDate,
        interval: { start: startDate, end: false as any },
        expected: false,
        description: "boolean as end",
      },
      {
        date: baseDate,
        interval: { start: {} as any, end: endDate },
        expected: false,
        description: "object as start",
      },
      {
        date: baseDate,
        interval: { start: startDate, end: [] as any },
        expected: false,
        description: "array as end",
      },
    ])(
      "$description",
      ({ date, interval, expected }) => {
        expect(isBetween(date, interval)).toBe(expected);
      },
    );
  });

  describe("edge cases", () => {
    it.each([
      // Inverted boundaries (start > end)
      {
        date: baseDate,
        interval: { start: endDate, end: startDate },
        expected: false,
        description: "inverted boundaries (start > end)",
      },

      // Same start and end
      {
        date: baseDate,
        interval: { start: startDate, end: startDate },
        expected: false,
        description: "start equals end",
      },

      // Millisecond precision
      {
        date: new Date(2024, 5, 15, 12, 30, 45, 500),
        interval: {
          start: new Date(2024, 5, 15, 12, 30, 45, 400),
          end: new Date(2024, 5, 15, 12, 30, 45, 600),
        },
        expected: true,
        description: "millisecond precision - between",
      },
      {
        date: new Date(2024, 5, 15, 12, 30, 45, 400),
        interval: {
          start: new Date(2024, 5, 15, 12, 30, 45, 400),
          end: new Date(2024, 5, 15, 12, 30, 45, 600),
        },
        expected: false,
        description: "millisecond precision - equals start",
      },
      {
        date: new Date(2024, 5, 15, 12, 30, 45, 600),
        interval: {
          start: new Date(2024, 5, 15, 12, 30, 45, 400),
          end: new Date(2024, 5, 15, 12, 30, 45, 600),
        },
        expected: false,
        description: "millisecond precision - equals end",
      },
    ])(
      "$description",
      ({ date, interval, expected }) => {
        expect(isBetween(date, interval)).toBe(expected);
      },
    );
  });

  describe("Interval type usage", () => {
    it("should work with explicitly typed Interval objects", () => {
      const interval1: Interval = { start: startDate, end: endDate };
      const interval2: Interval = { start: null, end: endDate };
      const interval3: Interval = { start: startDate, end: null };
      const interval4: Interval = { start: null, end: null };

      expect(isBetween(baseDate, interval1)).toBe(true);
      expect(isBetween(baseDate, interval2)).toBe(true);
      expect(isBetween(baseDate, interval3)).toBe(true);
      expect(isBetween(baseDate, interval4)).toBe(true);
    });

    it("should maintain type safety with Interval", () => {
      // TypeScript should catch invalid interval structures at compile time
      const validInterval: Interval = { start: startDate, end: endDate };

      expect(isBetween(baseDate, validInterval)).toBe(true);
    });
  });
});