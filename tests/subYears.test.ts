import { describe, it, expect } from "vitest";
import { subYears } from "../src/subYears";

describe("subYears", () => {
  it.each([
    // --- Valid cases ---
    {
      date: new Date(2025, 8, 20),
      amount: 5,
      expected: new Date(2020, 8, 20),
      desc: "subtracts positive years",
    },
    {
      date: new Date(2020, 3, 15),
      amount: -3,
      expected: new Date(2023, 3, 15),
      desc: "subtracts negative years (adds)",
    },
    {
      date: new Date(2025, 7, 10),
      amount: 0,
      expected: new Date(2025, 7, 10),
      desc: "subtracting zero years returns same date",
    },
    {
      date: new Date(2020, 0, 1),
      amount: 1.9,
      expected: new Date(2019, 0, 1),
      desc: "truncates fractional amount (positive)",
    },
    {
      date: new Date(2020, 0, 1),
      amount: -1.9,
      expected: new Date(2021, 0, 1),
      desc: "truncates fractional amount (negative)",
    },
    {
      date: new Date(2024, 1, 29),
      amount: 1,
      expected: new Date(2023, 1, 28),
      desc: "handles leap year to non-leap year (Feb 29 -> Feb 28)",
    },
    {
      date: new Date(2024, 1, 29),
      amount: 4,
      expected: new Date(2020, 1, 29),
      desc: "handles leap year to leap year (Feb 29 -> Feb 29)",
    },
    {
      date: new Date(2021, 0, 31),
      amount: 1,
      expected: new Date(2020, 0, 31),
      desc: "preserves month-end (Jan 31 → Jan 31 previous year)",
    },
    {
      date: new Date(2021, 2, 31),
      amount: -1,
      expected: new Date(2022, 2, 31),
      desc: "preserves month-end (Mar 31 → Mar 31 next year)",
    },
    {
      date: new Date(2025, 4, 20).getTime(),
      amount: 7,
      expected: new Date(2018, 4, 20),
      desc: "accepts timestamp input",
    },
    {
      date: new Date(2025, 0, 1),
      amount: 1000,
      expected: new Date(1025, 0, 1),
      desc: "handles large positive years",
    },
    {
      date: new Date(2025, 0, 1),
      amount: -1000,
      expected: new Date(3025, 0, 1),
      desc: "subtracts large negative years (adds)",
    },

    // --- Invalid cases ---
    {
      date: new Date("invalid"),
      amount: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 15),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
    {
      date: new Date(2025, 0, 15),
      amount: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is Infinity",
    },
    {
      date: new Date(2025, 0, 15),
      amount: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is -Infinity",
    },
    {
      date: NaN,
      amount: 1,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = subYears(date as Date | number, amount);
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  describe("type validation", () => {
    it("should return Invalid Date for invalid date argument types", () => {
      const invalidDateInputs = [
        null,
        undefined,
        true,
        false,
        {},
        [],
        () => {},
        Symbol("test")
      ];

      invalidDateInputs.forEach(input => {
        const result = subYears(input as any, 1);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for invalid amount argument types", () => {
      const validDate = new Date(2024, 0, 1);
      const invalidAmountInputs = [
        null,
        undefined,
        "1",
        true,
        false,
        {},
        [],
        () => {},
        Symbol("test")
      ];

      invalidAmountInputs.forEach(input => {
        const result = subYears(validDate, input as any);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });

    it("should return Invalid Date for Invalid Date objects", () => {
      const invalidDates = [
        new Date("invalid"),
        new Date(NaN)
      ];

      invalidDates.forEach(invalidDate => {
        const result = subYears(invalidDate, 1);
        expect(result instanceof Date).toBe(true);
        expect(result.getTime()).toBeNaN();
      });
    });
  });
});

