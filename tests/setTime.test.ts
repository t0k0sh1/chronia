import { describe, it, expect } from "vitest";
import { setTime } from "../src/setTime";

describe("setTime", () => {
  it.each([
    // --- Valid cases ---
    {
      time: 1704067200000,
      expected: new Date(1704067200000),
      desc: "sets standard timestamp",
    },
    {
      time: 0,
      expected: new Date(0),
      desc: "sets Unix epoch",
    },
    {
      time: -86400000,
      expected: new Date(-86400000),
      desc: "sets negative timestamp (before epoch)",
    },
    {
      time: 8.64e15,
      expected: new Date(8.64e15),
      desc: "sets maximum valid timestamp",
    },
    {
      time: -8.64e15,
      expected: new Date(-8.64e15),
      desc: "sets minimum valid timestamp",
    },
    {
      time: 1.5,
      expected: new Date(1.5),
      desc: "preserves fractional milliseconds",
    },

    // --- Invalid cases ---
    {
      time: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is NaN",
    },
    {
      time: Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is Infinity",
    },
    {
      time: -Infinity,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp is -Infinity",
    },
    {
      time: 8.64e15 + 1,
      expected: new Date(NaN),
      desc: "returns Invalid Date when timestamp exceeds maximum range",
    },
  ])("$desc", ({ time, expected }) => {
    const date = new Date();
    const result = setTime(date, time);

    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });

  it("does not mutate the original date", () => {
    const original = new Date("2020-01-01");
    const originalTime = original.getTime();

    setTime(original, 1704067200000);

    expect(original.getTime()).toBe(originalTime);
  });

  it.each([
    { name: "null", input: null },
    { name: "undefined", input: undefined },
    { name: "string", input: "2024-01-01" },
    { name: "number", input: 1704067200000 },
    { name: "boolean", input: true },
    { name: "object", input: {} },
    { name: "array", input: [] },
  ])("returns Invalid Date for $name as first argument", ({ input }) => {
    const result = setTime(input as any, 1704067200000);
    expect(isNaN(result.getTime())).toBe(true);
  });
});
