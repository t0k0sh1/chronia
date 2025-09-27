import { bench, describe } from "vitest";
import { isValidDate, isValidNumber, isValidDateOrNumber } from "../../src/_lib/validators";

describe.skip("Validator Performance Benchmarks", () => {
  // Test data
  const validDate = new Date();
  const invalidDate = new Date("invalid");
  const validNumber = 42;
  const invalidNumber = NaN;
  const nullValue = null;
  const stringValue = "2024-01-01";

  describe("isValidDate performance", () => {
    bench("valid Date", () => {
      isValidDate(validDate);
    });

    bench("invalid Date", () => {
      isValidDate(invalidDate);
    });

    bench("non-Date value", () => {
      isValidDate(validNumber);
    });

    bench("null/undefined", () => {
      isValidDate(nullValue);
    });

    bench("string", () => {
      isValidDate(stringValue);
    });
  });

  describe("isValidNumber performance", () => {
    bench("valid number", () => {
      isValidNumber(validNumber);
    });

    bench("invalid number (NaN)", () => {
      isValidNumber(invalidNumber);
    });

    bench("infinity", () => {
      isValidNumber(Infinity);
    });

    bench("non-number value", () => {
      isValidNumber(validDate);
    });

    bench("null/undefined", () => {
      isValidNumber(nullValue);
    });

    bench("string", () => {
      isValidNumber(stringValue);
    });
  });

  describe("isValidDateOrNumber performance", () => {
    bench("valid Date", () => {
      isValidDateOrNumber(validDate);
    });

    bench("valid number", () => {
      isValidDateOrNumber(validNumber);
    });

    bench("invalid Date", () => {
      isValidDateOrNumber(invalidDate);
    });

    bench("invalid number", () => {
      isValidDateOrNumber(invalidNumber);
    });

    bench("non-date-or-number value", () => {
      isValidDateOrNumber(stringValue);
    });
  });

  describe("Real-world usage patterns", () => {
    const testValues = [
      new Date(),
      new Date("2024-01-01"),
      new Date("invalid"),
      42,
      3.14,
      0,
      -42,
      NaN,
      Infinity,
      -Infinity,
      null,
      undefined,
      "2024-01-01",
      {},
      [],
      true,
      false
    ];

    bench("mixed validation batch (isValidDate)", () => {
      for (const value of testValues) {
        isValidDate(value);
      }
    });

    bench("mixed validation batch (isValidNumber)", () => {
      for (const value of testValues) {
        isValidNumber(value);
      }
    });

    bench("mixed validation batch (isValidDateOrNumber)", () => {
      for (const value of testValues) {
        isValidDateOrNumber(value);
      }
    });
  });

  describe("High-volume validation", () => {
    const dates = Array.from({ length: 1000 }, () => new Date());
    const numbers = Array.from({ length: 1000 }, (_, i) => i);
    const mixed = Array.from({ length: 1000 }, (_, i) => i % 2 === 0 ? new Date() : i);

    bench("1000 Date validations", () => {
      for (const date of dates) {
        isValidDate(date);
      }
    });

    bench("1000 number validations", () => {
      for (const number of numbers) {
        isValidNumber(number);
      }
    });

    bench("1000 mixed validations", () => {
      for (const value of mixed) {
        isValidDateOrNumber(value);
      }
    });
  });
});