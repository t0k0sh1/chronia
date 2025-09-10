import { describe, it, expect } from "vitest";
import { truncateToUnit } from "../../src/_lib/truncateToUnit";

describe("truncateToUnit (local time based)", () => {
  type Case = {
    unit:
      | "year"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond";
    input: Date;
    expected: Date;
  };

  const cases: Case[] = [
    {
      unit: "year",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 0, 1, 0, 0, 0, 0),
    },
    {
      unit: "month",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 1, 0, 0, 0, 0),
    },
    {
      unit: "day",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 10, 0, 0, 0, 0),
    },
    {
      unit: "hour",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 10, 15, 0, 0, 0),
    },
    {
      unit: "minute",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 10, 15, 45, 0, 0),
    },
    {
      unit: "second",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 10, 15, 45, 30, 0),
    },
    {
      unit: "millisecond",
      input: new Date(2025, 8, 10, 15, 45, 30, 123),
      expected: new Date(2025, 8, 10, 15, 45, 30, 123),
    },
  ];

  it.each(cases)(
    "should truncate $unit correctly",
    ({ unit, input, expected }) => {
      expect(truncateToUnit(input, unit)).toEqual(expected);
    },
  );

  describe("boundary values", () => {
    it("year: Dec 31 just before midnight → Jan 1", () => {
      const d = new Date(2025, 11, 31, 23, 59, 59, 999);
      expect(truncateToUnit(d, "year")).toEqual(
        new Date(2025, 0, 1, 0, 0, 0, 0),
      );
    });

    it("month: last day just before midnight", () => {
      const d = new Date(2025, 1, 28, 23, 59, 59, 999); // 2025-02-28
      expect(truncateToUnit(d, "month")).toEqual(
        new Date(2025, 1, 1, 0, 0, 0, 0),
      );
    });

    it("day: just before midnight", () => {
      const d = new Date(2025, 8, 10, 23, 59, 59, 999);
      expect(truncateToUnit(d, "day")).toEqual(
        new Date(2025, 8, 10, 0, 0, 0, 0),
      );
    });

    it("minute: boundary second", () => {
      const d = new Date(2025, 8, 10, 15, 45, 59, 999);
      expect(truncateToUnit(d, "minute")).toEqual(
        new Date(2025, 8, 10, 15, 45, 0, 0),
      );
    });

    it("second: boundary millisecond", () => {
      const d = new Date(2025, 8, 10, 15, 45, 30, 999);
      expect(truncateToUnit(d, "second")).toEqual(
        new Date(2025, 8, 10, 15, 45, 30, 0),
      );
    });
  });
});
