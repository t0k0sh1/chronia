import { describe, it, expect } from "vitest";
import { formatDate } from "../src";

describe("formatDate", () => {
  it("should format a date to YYYY-MM-DD", () => {
    const d = new Date(2025, 8, 6); // 2025-09-06 (月は0始まり)
    expect(formatDate(d)).toBe("2025-09-06");
  });

  it("should add leading zeros to month and day", () => {
    const d = new Date(2025, 0, 5); // 2025-01-05
    expect(formatDate(d)).toBe("2025-01-05");
  });
});
