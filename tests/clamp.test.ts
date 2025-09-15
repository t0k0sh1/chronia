import { describe, it, expect } from "vitest";
import { clamp } from "../src/clamp";

describe("clamp", () => {
  it("returns the same date when within range", () => {
    const date = new Date(2024, 5, 15); // June 15, 2024
    const minDate = new Date(2024, 5, 10); // June 10, 2024
    const maxDate = new Date(2024, 5, 20); // June 20, 2024
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
    expect(result).not.toBe(date); // Should return a new Date object
  });

  it("returns minimum date when input is before range", () => {
    const date = new Date(2024, 5, 5); // June 5, 2024
    const minDate = new Date(2024, 5, 10); // June 10, 2024
    const maxDate = new Date(2024, 5, 20); // June 20, 2024
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(minDate.getTime());
    expect(result).not.toBe(minDate); // Should return a new Date object
  });

  it("returns maximum date when input is after range", () => {
    const date = new Date(2024, 5, 25); // June 25, 2024
    const minDate = new Date(2024, 5, 10); // June 10, 2024
    const maxDate = new Date(2024, 5, 20); // June 20, 2024
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(maxDate.getTime());
    expect(result).not.toBe(maxDate); // Should return a new Date object
  });

  it("handles timestamps correctly", () => {
    const timestamp = new Date(2024, 5, 15).getTime();
    const minTimestamp = new Date(2024, 5, 10).getTime();
    const maxTimestamp = new Date(2024, 5, 20).getTime();
    const result = clamp(timestamp, minTimestamp, maxTimestamp);

    expect(result.getTime()).toBe(timestamp);
  });

  it("handles mixed Date objects and timestamps", () => {
    const date = new Date(2024, 5, 15);
    const minTimestamp = new Date(2024, 5, 10).getTime();
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, minTimestamp, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("handles swapped min and max dates", () => {
    const date = new Date(2024, 5, 15);
    const minDate = new Date(2024, 5, 20); // Larger than maxDate
    const maxDate = new Date(2024, 5, 10); // Smaller than minDate
    const result = clamp(date, minDate, maxDate);

    // Should treat maxDate as min and minDate as max
    expect(result.getTime()).toBe(date.getTime()); // 15 is between 10 and 20
  });

  it("clamps to correct bound when min and max are swapped", () => {
    const date = new Date(2024, 5, 25); // After both bounds
    const minDate = new Date(2024, 5, 20); // Actually the max
    const maxDate = new Date(2024, 5, 10); // Actually the min
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(minDate.getTime()); // Should clamp to 20 (the actual max)
  });

  it("returns Invalid Date when input date is invalid", () => {
    const invalidDate = new Date("invalid");
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(invalidDate, minDate, maxDate);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date when min date is invalid", () => {
    const date = new Date(2024, 5, 15);
    const invalidMin = new Date("invalid");
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, invalidMin, maxDate);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date when max date is invalid", () => {
    const date = new Date(2024, 5, 15);
    const minDate = new Date(2024, 5, 10);
    const invalidMax = new Date("invalid");
    const result = clamp(date, minDate, invalidMax);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date when timestamp is NaN", () => {
    const nanTimestamp = NaN;
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(nanTimestamp, minDate, maxDate);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("handles same min and max dates", () => {
    const date = new Date(2024, 5, 15);
    const boundaryDate = new Date(2024, 5, 10);
    const result = clamp(date, boundaryDate, boundaryDate);

    expect(result.getTime()).toBe(boundaryDate.getTime());
  });

  it("handles date exactly at min boundary", () => {
    const date = new Date(2024, 5, 10);
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("handles date exactly at max boundary", () => {
    const date = new Date(2024, 5, 20);
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("handles dates with millisecond precision", () => {
    const date = new Date(2024, 5, 15, 12, 0, 0, 500);
    const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
    const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("clamps millisecond precision dates to min", () => {
    const date = new Date(2024, 5, 15, 12, 0, 0, 50);
    const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
    const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(minDate.getTime());
  });

  it("clamps millisecond precision dates to max", () => {
    const date = new Date(2024, 5, 15, 12, 0, 0, 1000);
    const minDate = new Date(2024, 5, 15, 12, 0, 0, 100);
    const maxDate = new Date(2024, 5, 15, 12, 0, 0, 900);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(maxDate.getTime());
  });

  it("handles dates across different years", () => {
    const date = new Date(2025, 5, 15);
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(maxDate.getTime());
  });

  it("handles BC dates", () => {
    const date = new Date(-1, 5, 15); // Year 0 (1 BC)
    const minDate = new Date(-2, 5, 10); // Year -1 (2 BC)
    const maxDate = new Date(1, 5, 20); // Year 1 AD
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("clamps BC date to min", () => {
    const date = new Date(-3, 5, 15); // Year -2 (3 BC)
    const minDate = new Date(-2, 5, 10); // Year -1 (2 BC)
    const maxDate = new Date(1, 5, 20); // Year 1 AD
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(minDate.getTime());
  });

  it("handles very large timestamps", () => {
    const timestamp = 8640000000000000 - 500; // Near Date.MAX_VALUE
    const minTimestamp = 8640000000000000 - 2000;
    const maxTimestamp = 8640000000000000 - 1000;
    const result = clamp(timestamp, minTimestamp, maxTimestamp);

    expect(result.getTime()).toBe(maxTimestamp);
  });

  it("handles very small timestamps", () => {
    const timestamp = 500;
    const minTimestamp = 1000;
    const maxTimestamp = 2000;
    const result = clamp(timestamp, minTimestamp, maxTimestamp);

    expect(result.getTime()).toBe(minTimestamp);
  });

  it("returns a new Date object, not a reference", () => {
    const date = new Date(2024, 5, 15);
    const minDate = new Date(2024, 5, 10);
    const maxDate = new Date(2024, 5, 20);
    const result = clamp(date, minDate, maxDate);

    expect(result).not.toBe(date);
    expect(result).not.toBe(minDate);
    expect(result).not.toBe(maxDate);
    expect(result instanceof Date).toBe(true);
  });

  it("handles time zones consistently", () => {
    const date = new Date(2024, 5, 15, 14, 30, 0);
    const minDate = new Date(2024, 5, 15, 12, 0, 0);
    const maxDate = new Date(2024, 5, 15, 16, 0, 0);
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(date.getTime());
  });

  it("clamps time component within same day", () => {
    const date = new Date(2024, 5, 15, 18, 30, 0); // 6:30 PM
    const minDate = new Date(2024, 5, 15, 12, 0, 0); // 12:00 PM
    const maxDate = new Date(2024, 5, 15, 16, 0, 0); // 4:00 PM
    const result = clamp(date, minDate, maxDate);

    expect(result.getTime()).toBe(maxDate.getTime());
  });
});