import { describe, it, expect } from "vitest";
import { max } from "../src/max";

describe("max", () => {
  it("returns the latest date from multiple Date objects", () => {
    const date1 = new Date(2024, 5, 15); // June 15, 2024
    const date2 = new Date(2024, 5, 10); // June 10, 2024
    const date3 = new Date(2024, 5, 20); // June 20, 2024
    const result = max(date1, date2, date3);

    expect(result.getTime()).toBe(date3.getTime());
    expect(result).not.toBe(date3); // Should return a new Date object
  });

  it("returns the latest date from multiple timestamps", () => {
    const timestamp1 = new Date(2024, 5, 15).getTime();
    const timestamp2 = new Date(2024, 5, 10).getTime();
    const timestamp3 = new Date(2024, 5, 20).getTime();
    const result = max(timestamp1, timestamp2, timestamp3);

    expect(result.getTime()).toBe(timestamp3);
  });

  it("handles mixed Date objects and timestamps", () => {
    const date1 = new Date(2024, 5, 15);
    const timestamp2 = new Date(2024, 5, 10).getTime();
    const date3 = new Date(2024, 5, 20);
    const result = max(date1, timestamp2, date3);

    expect(result.getTime()).toBe(date3.getTime());
  });

  it("returns the same date when given a single date", () => {
    const date = new Date(2024, 5, 15);
    const result = max(date);

    expect(result.getTime()).toBe(date.getTime());
    expect(result).not.toBe(date); // Should return a new Date object
  });

  it("returns the same timestamp when given a single timestamp", () => {
    const timestamp = new Date(2024, 5, 15).getTime();
    const result = max(timestamp);

    expect(result.getTime()).toBe(timestamp);
  });

  it("throws error when called with no arguments", () => {
    const result = max();
    expect(result.getTime()).toBeNaN();
  });

  it("returns Invalid Date when any input is invalid", () => {
    const validDate = new Date(2024, 5, 15);
    const invalidDate = new Date("invalid");
    const result = max(validDate, invalidDate);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date when any timestamp is invalid", () => {
    const validTimestamp = new Date(2024, 5, 15).getTime();
    const invalidTimestamp = NaN;
    const result = max(validTimestamp, invalidTimestamp);

    expect(isNaN(result.getTime())).toBe(true);
  });

  it("handles dates with same timestamp", () => {
    const date1 = new Date(2024, 5, 15, 12, 0, 0);
    const date2 = new Date(2024, 5, 15, 12, 0, 0);
    const result = max(date1, date2);

    expect(result.getTime()).toBe(date1.getTime());
  });

  it("handles dates with millisecond precision", () => {
    const date1 = new Date(2024, 5, 15, 12, 0, 0, 100);
    const date2 = new Date(2024, 5, 15, 12, 0, 0, 200);
    const date3 = new Date(2024, 5, 15, 12, 0, 0, 50);
    const result = max(date1, date2, date3);

    expect(result.getTime()).toBe(date2.getTime());
  });

  it("handles dates across different years", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2023, 5, 15);
    const date3 = new Date(2025, 5, 15);
    const result = max(date1, date2, date3);

    expect(result.getTime()).toBe(date3.getTime());
  });

  it("handles dates across different months", () => {
    const date1 = new Date(2024, 5, 15); // June
    const date2 = new Date(2024, 2, 15); // March
    const date3 = new Date(2024, 8, 15); // September
    const result = max(date1, date2, date3);

    expect(result.getTime()).toBe(date3.getTime());
  });

  it("handles dates with different times on same day", () => {
    const date1 = new Date(2024, 5, 15, 14, 30, 0);
    const date2 = new Date(2024, 5, 15, 9, 15, 0);
    const date3 = new Date(2024, 5, 15, 18, 45, 0);
    const result = max(date1, date2, date3);

    expect(result.getTime()).toBe(date3.getTime());
  });

  it("handles large number of dates", () => {
    const dates: Date[] = [];
    const latest = new Date(2024, 0, 101);
    dates.push(latest);

    for (let i = 1; i <= 100; i++) {
      dates.push(new Date(2024, 0, i));
    }

    const result = max(...dates);
    expect(result.getTime()).toBe(latest.getTime());
  });

  it("handles BC dates", () => {
    const bcDate1 = new Date(-1, 5, 15); // Year 0 (1 BC)
    const bcDate2 = new Date(-2, 5, 15); // Year -1 (2 BC)
    const adDate = new Date(1, 5, 15); // Year 1 AD
    const result = max(bcDate1, bcDate2, adDate);

    expect(result.getTime()).toBe(adDate.getTime());
  });

  it("handles very large timestamps", () => {
    const timestamp1 = 8640000000000000 - 1000; // Near Date.MAX_VALUE
    const timestamp2 = 8640000000000000 - 2000;
    const timestamp3 = 8640000000000000 - 500;
    const result = max(timestamp1, timestamp2, timestamp3);

    expect(result.getTime()).toBe(timestamp3);
  });

  it("handles very small timestamps", () => {
    const timestamp1 = 1000;
    const timestamp2 = 500;
    const timestamp3 = 1500;
    const result = max(timestamp1, timestamp2, timestamp3);

    expect(result.getTime()).toBe(timestamp3);
  });

  it("returns a new Date object, not a reference", () => {
    const date1 = new Date(2024, 5, 15);
    const date2 = new Date(2024, 5, 20);
    const result = max(date1, date2);

    expect(result).not.toBe(date1);
    expect(result).not.toBe(date2);
    expect(result instanceof Date).toBe(true);
  });
});

