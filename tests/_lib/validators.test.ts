import { describe, it, expect } from "vitest";
import {
  isDateInstance,
  isValidDate,
  isNumber,
  isValidNumber,
  isValidDateOrNumber,
} from "../../src/_lib/validators";

describe("validators", () => {
  describe("isDateInstance", () => {
    describe("valid Date instances", () => {
      it("should return true for valid Date object", () => {
        const date = new Date(2025, 0, 1);
        expect(isDateInstance(date)).toBe(true);
      });

      it("should return true for Invalid Date object", () => {
        const invalidDate = new Date("invalid string");
        expect(isDateInstance(invalidDate)).toBe(true);
      });

      it("should return true for epoch date", () => {
        const epoch = new Date(0);
        expect(isDateInstance(epoch)).toBe(true);
      });

      it("should return true for current date", () => {
        const now = new Date();
        expect(isDateInstance(now)).toBe(true);
      });

      it("should return true for negative timestamp date", () => {
        const beforeEpoch = new Date(-86400000);
        expect(isDateInstance(beforeEpoch)).toBe(true);
      });
    });

    describe("non-Date values", () => {
      it("should return false for number", () => {
        expect(isDateInstance(123456789)).toBe(false);
      });

      it("should return false for timestamp 0", () => {
        expect(isDateInstance(0)).toBe(false);
      });

      it("should return false for NaN", () => {
        expect(isDateInstance(NaN)).toBe(false);
      });

      it("should return false for Infinity", () => {
        expect(isDateInstance(Infinity)).toBe(false);
      });

      it("should return false for negative Infinity", () => {
        expect(isDateInstance(-Infinity)).toBe(false);
      });

      it("should return false for string", () => {
        expect(isDateInstance("2025-01-01")).toBe(false);
      });

      it("should return false for null", () => {
        expect(isDateInstance(null)).toBe(false);
      });

      it("should return false for undefined", () => {
        expect(isDateInstance(undefined)).toBe(false);
      });

      it("should return false for plain object", () => {
        expect(isDateInstance({})).toBe(false);
      });

      it("should return false for array", () => {
        expect(isDateInstance([])).toBe(false);
      });

      it("should return false for boolean", () => {
        expect(isDateInstance(true)).toBe(false);
        expect(isDateInstance(false)).toBe(false);
      });

      it("should return false for function", () => {
        expect(isDateInstance(() => new Date())).toBe(false);
      });

      it("should return false for symbol", () => {
        expect(isDateInstance(Symbol("date"))).toBe(false);
      });
    });
  });


  describe("isValidDate", () => {
    describe("valid Date instances", () => {
      it("should return true for new Date()", () => {
        expect(isValidDate(new Date())).toBe(true);
      });

      it("should return true for Date with specific date", () => {
        expect(isValidDate(new Date("2024-01-01"))).toBe(true);
      });

      it("should return true for Date with timestamp", () => {
        expect(isValidDate(new Date(1704067200000))).toBe(true);
      });

      it("should return true for Date with year, month, day", () => {
        expect(isValidDate(new Date(2024, 0, 1))).toBe(true);
      });

      it("should return true for epoch date", () => {
        expect(isValidDate(new Date(0))).toBe(true);
      });

      it("should return true for negative timestamp date", () => {
        expect(isValidDate(new Date(-1000))).toBe(true);
      });
    });

    describe("invalid Date instances", () => {
      it("should return false for Invalid Date from string", () => {
        expect(isValidDate(new Date("invalid"))).toBe(false);
      });

      it("should return false for Invalid Date from NaN", () => {
        expect(isValidDate(new Date(NaN))).toBe(false);
      });

      it("should return false for Invalid Date from undefined", () => {
        expect(isValidDate(new Date(undefined as any))).toBe(false);
      });
    });

    describe("non-Date values", () => {
      it("should return false for numbers", () => {
        expect(isValidDate(42)).toBe(false);
        expect(isValidDate(3.14)).toBe(false);
        expect(isValidDate(0)).toBe(false);
        expect(isValidDate(-0)).toBe(false);
      });

      it("should return false for special number values", () => {
        expect(isValidDate(NaN)).toBe(false);
        expect(isValidDate(Infinity)).toBe(false);
        expect(isValidDate(-Infinity)).toBe(false);
      });

      it("should return false for strings", () => {
        expect(isValidDate("2024-01-01")).toBe(false);
        expect(isValidDate("42")).toBe(false);
        expect(isValidDate("")).toBe(false);
      });

      it("should return false for null and undefined", () => {
        expect(isValidDate(null)).toBe(false);
        expect(isValidDate(undefined)).toBe(false);
      });

      it("should return false for booleans", () => {
        expect(isValidDate(true)).toBe(false);
        expect(isValidDate(false)).toBe(false);
      });

      it("should return false for objects", () => {
        expect(isValidDate({})).toBe(false);
        expect(isValidDate({ getTime: () => 1000 })).toBe(false);
      });

      it("should return false for arrays", () => {
        expect(isValidDate([])).toBe(false);
        expect(isValidDate([2024, 0, 1])).toBe(false);
      });

      it("should return false for functions", () => {
        expect(isValidDate(() => new Date())).toBe(false);
      });

      it("should return false for symbols", () => {
        expect(isValidDate(Symbol("date"))).toBe(false);
      });
    });
  });

  describe("isNumber", () => {
    describe("edge cases and boundaries", () => {
      it("should return true for zero", () => {
        expect(isNumber(0)).toBe(true);
      });

      it("should return true for negative zero", () => {
        expect(isNumber(-0)).toBe(true);
      });

      it("should return true for NaN (number type)", () => {
        expect(isNumber(NaN)).toBe(true);
      });

      it("should return true for Infinity", () => {
        expect(isNumber(Infinity)).toBe(true);
      });

      it("should return true for negative Infinity", () => {
        expect(isNumber(-Infinity)).toBe(true);
      });

      it("should return true for Number.MIN_VALUE", () => {
        expect(isNumber(Number.MIN_VALUE)).toBe(true);
      });

      it("should return true for Number.MAX_SAFE_INTEGER", () => {
        expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
      });

      it("should return true for Number.MIN_SAFE_INTEGER", () => {
        expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
      });

      it("should return true for Number.MAX_VALUE", () => {
        expect(isNumber(Number.MAX_VALUE)).toBe(true);
      });
    });

    describe("invalid inputs (non-number types)", () => {
      it("should return false for string", () => {
        expect(isNumber("123")).toBe(false);
        expect(isNumber("")).toBe(false);
        expect(isNumber("NaN")).toBe(false);
      });

      it("should return false for boolean", () => {
        expect(isNumber(true)).toBe(false);
        expect(isNumber(false)).toBe(false);
      });

      it("should return false for null", () => {
        expect(isNumber(null)).toBe(false);
      });

      it("should return false for undefined", () => {
        expect(isNumber(undefined)).toBe(false);
      });

      it("should return false for object", () => {
        expect(isNumber({})).toBe(false);
        expect(isNumber({ valueOf: () => 42 })).toBe(false);
        expect(isNumber(new Number(42))).toBe(false);
      });

      it("should return false for array", () => {
        expect(isNumber([])).toBe(false);
        expect(isNumber([42])).toBe(false);
      });

      it("should return false for Date", () => {
        expect(isNumber(new Date())).toBe(false);
        expect(isNumber(new Date("invalid"))).toBe(false);
      });

      it("should return false for function", () => {
        expect(isNumber(() => 42)).toBe(false);
      });

      it("should return false for symbol", () => {
        expect(isNumber(Symbol("number"))).toBe(false);
      });
    });

    describe("happy path (minimal necessary)", () => {
      it("should return true for positive integer", () => {
        expect(isNumber(42)).toBe(true);
      });

      it("should return true for negative integer", () => {
        expect(isNumber(-42)).toBe(true);
      });

      it("should return true for float", () => {
        expect(isNumber(3.14)).toBe(true);
      });
    });

    describe("behavioral differences with isValidNumber", () => {
      it("should return true for NaN while isValidNumber returns false", () => {
        expect(isNumber(NaN)).toBe(true);
        expect(isValidNumber(NaN)).toBe(false);
      });

      it("should return true for Infinity while isValidNumber returns false", () => {
        expect(isNumber(Infinity)).toBe(true);
        expect(isValidNumber(Infinity)).toBe(false);
      });

      it("should return true for -Infinity while isValidNumber returns false", () => {
        expect(isNumber(-Infinity)).toBe(true);
        expect(isValidNumber(-Infinity)).toBe(false);
      });

      it("should return true for finite numbers just like isValidNumber", () => {
        expect(isNumber(42)).toBe(true);
        expect(isValidNumber(42)).toBe(true);
      });
    });
  });

  describe("isValidNumber", () => {
    describe("valid finite numbers", () => {
      it("should return true for positive integers", () => {
        expect(isValidNumber(42)).toBe(true);
        expect(isValidNumber(1)).toBe(true);
        expect(isValidNumber(999999)).toBe(true);
      });

      it("should return true for negative integers", () => {
        expect(isValidNumber(-42)).toBe(true);
        expect(isValidNumber(-1)).toBe(true);
        expect(isValidNumber(-999999)).toBe(true);
      });

      it("should return true for zero", () => {
        expect(isValidNumber(0)).toBe(true);
        expect(isValidNumber(-0)).toBe(true);
      });

      it("should return true for floating point numbers", () => {
        expect(isValidNumber(3.14)).toBe(true);
        expect(isValidNumber(-3.14)).toBe(true);
        expect(isValidNumber(0.1)).toBe(true);
        expect(isValidNumber(-0.1)).toBe(true);
      });

      it("should return true for very small numbers", () => {
        expect(isValidNumber(Number.MIN_VALUE)).toBe(true);
        expect(isValidNumber(-Number.MIN_VALUE)).toBe(true);
      });

      it("should return true for large numbers", () => {
        expect(isValidNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isValidNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
      });

      it("should return true for scientific notation", () => {
        expect(isValidNumber(1e10)).toBe(true);
        expect(isValidNumber(1e-10)).toBe(true);
      });
    });

    describe("invalid number values", () => {
      it("should return false for NaN", () => {
        expect(isValidNumber(NaN)).toBe(false);
      });

      it("should return false for Infinity", () => {
        expect(isValidNumber(Infinity)).toBe(false);
        expect(isValidNumber(Number.POSITIVE_INFINITY)).toBe(false);
      });

      it("should return false for -Infinity", () => {
        expect(isValidNumber(-Infinity)).toBe(false);
        expect(isValidNumber(Number.NEGATIVE_INFINITY)).toBe(false);
      });
    });

    describe("non-number values", () => {
      it("should return false for strings", () => {
        expect(isValidNumber("42")).toBe(false);
        expect(isValidNumber("3.14")).toBe(false);
        expect(isValidNumber("")).toBe(false);
        expect(isValidNumber("NaN")).toBe(false);
      });

      it("should return false for Date objects", () => {
        expect(isValidNumber(new Date())).toBe(false);
        expect(isValidNumber(new Date("invalid"))).toBe(false);
      });

      it("should return false for null and undefined", () => {
        expect(isValidNumber(null)).toBe(false);
        expect(isValidNumber(undefined)).toBe(false);
      });

      it("should return false for booleans", () => {
        expect(isValidNumber(true)).toBe(false);
        expect(isValidNumber(false)).toBe(false);
      });

      it("should return false for objects", () => {
        expect(isValidNumber({})).toBe(false);
        expect(isValidNumber({ valueOf: () => 42 })).toBe(false);
      });

      it("should return false for arrays", () => {
        expect(isValidNumber([])).toBe(false);
        expect(isValidNumber([42])).toBe(false);
      });

      it("should return false for functions", () => {
        expect(isValidNumber(() => 42)).toBe(false);
      });

      it("should return false for symbols", () => {
        expect(isValidNumber(Symbol("number"))).toBe(false);
      });
    });
  });

  describe("isValidDateOrNumber", () => {
    describe("valid Date instances", () => {
      it("should return true for valid Date objects", () => {
        expect(isValidDateOrNumber(new Date())).toBe(true);
        expect(isValidDateOrNumber(new Date("2024-01-01"))).toBe(true);
        expect(isValidDateOrNumber(new Date(1704067200000))).toBe(true);
      });

      it("should return false for Invalid Date", () => {
        expect(isValidDateOrNumber(new Date("invalid"))).toBe(false);
        expect(isValidDateOrNumber(new Date(NaN))).toBe(false);
      });
    });

    describe("valid numbers", () => {
      it("should return true for finite numbers", () => {
        expect(isValidDateOrNumber(42)).toBe(true);
        expect(isValidDateOrNumber(3.14)).toBe(true);
        expect(isValidDateOrNumber(0)).toBe(true);
        expect(isValidDateOrNumber(-42)).toBe(true);
      });

      it("should return false for non-finite numbers", () => {
        expect(isValidDateOrNumber(NaN)).toBe(false);
        expect(isValidDateOrNumber(Infinity)).toBe(false);
        expect(isValidDateOrNumber(-Infinity)).toBe(false);
      });
    });

    describe("invalid values", () => {
      it("should return false for strings", () => {
        expect(isValidDateOrNumber("42")).toBe(false);
        expect(isValidDateOrNumber("2024-01-01")).toBe(false);
      });

      it("should return false for null and undefined", () => {
        expect(isValidDateOrNumber(null)).toBe(false);
        expect(isValidDateOrNumber(undefined)).toBe(false);
      });

      it("should return false for booleans", () => {
        expect(isValidDateOrNumber(true)).toBe(false);
        expect(isValidDateOrNumber(false)).toBe(false);
      });

      it("should return false for objects", () => {
        expect(isValidDateOrNumber({})).toBe(false);
        expect(isValidDateOrNumber({ date: new Date() })).toBe(false);
      });

      it("should return false for arrays", () => {
        expect(isValidDateOrNumber([])).toBe(false);
        expect(isValidDateOrNumber([42])).toBe(false);
      });

      it("should return false for functions", () => {
        expect(isValidDateOrNumber(() => 42)).toBe(false);
      });

      it("should return false for symbols", () => {
        expect(isValidDateOrNumber(Symbol("value"))).toBe(false);
      });
    });

    describe("truth table verification", () => {
      it("should match the specification truth table", () => {
        // From data-model.md truth table
        expect(isValidDateOrNumber(new Date())).toBe(true); // Valid Date
        expect(isValidDateOrNumber(new Date("invalid"))).toBe(false); // Invalid Date
        expect(isValidDateOrNumber(42)).toBe(true); // number
        expect(isValidDateOrNumber(3.14)).toBe(true); // number
        expect(isValidDateOrNumber(0)).toBe(true); // number
        expect(isValidDateOrNumber(-0)).toBe(true); // number
        expect(isValidDateOrNumber(NaN)).toBe(false); // NaN
        expect(isValidDateOrNumber(Infinity)).toBe(false); // Infinity
        expect(isValidDateOrNumber(-Infinity)).toBe(false); // -Infinity
        expect(isValidDateOrNumber(null)).toBe(false); // null
        expect(isValidDateOrNumber(undefined)).toBe(false); // undefined
        expect(isValidDateOrNumber("42")).toBe(false); // string
        expect(isValidDateOrNumber({})).toBe(false); // object
        expect(isValidDateOrNumber([])).toBe(false); // array
        expect(isValidDateOrNumber(true)).toBe(false); // boolean
      });
    });
  });
});