# Contract: CompareOptions API

**Feature**: compare() function with options object
**Date**: 2025-01-14
**Status**: Contract Definition

## Overview
This document defines the behavioral contracts for the `compare()` function's new options parameter. These contracts ensure consistent behavior across all scenarios specified in the feature requirements.

## Function Signature Contract

### Contract: Function Signature
```typescript
function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number;

interface CompareOptions {
  order?: "ASC" | "DESC";
}
```

**Guarantees**:
1. Third parameter is required in signature but has default value
2. TypeScript enforces `CompareOptions` type at compile time
3. Returns `number`: `-1`, `0`, `1`, or `NaN`
4. Never throws exceptions (adheres to project error handling policy)

---

## Behavioral Contracts

### Contract 1: Default Behavior (Omitted Parameter)

**Spec Reference**: FR-003

**Given**: Two valid dates to compare
**When**: Third parameter is omitted
**Then**: Ascending order comparison is performed (same as `{ order: "ASC" }`)

**Examples**:
```typescript
compare(new Date("2024-01-01"), new Date("2024-01-02"))
// Returns: -1 (ascending order, first date is earlier)

compare(new Date("2024-01-02"), new Date("2024-01-01"))
// Returns: 1 (ascending order, first date is later)

compare(new Date("2024-01-01"), new Date("2024-01-01"))
// Returns: 0 (dates are equal)
```

**Test Assertion**:
```typescript
expect(compare(earlier, later)).toBe(-1);
expect(compare(earlier, later)).toBe(compare(earlier, later, { order: "ASC" }));
```

---

### Contract 2: Default Behavior (Empty Options Object)

**Spec Reference**: FR-004

**Given**: Two valid dates to compare
**When**: Empty options object `{}` is provided
**Then**: Ascending order comparison is performed (defaults to `order: "ASC"`)

**Examples**:
```typescript
compare(new Date("2024-01-01"), new Date("2024-01-02"), {})
// Returns: -1 (same as omitted parameter or explicit { order: "ASC" })
```

**Test Assertion**:
```typescript
expect(compare(earlier, later, {})).toBe(-1);
expect(compare(earlier, later, {})).toBe(compare(earlier, later));
```

---

### Contract 3: Explicit Ascending Order

**Spec Reference**: FR-002

**Given**: Two valid dates to compare
**When**: `{ order: "ASC" }` is explicitly provided
**Then**: Returns `-1` if date1 < date2, `1` if date1 > date2, `0` if equal

**Examples**:
```typescript
compare(new Date("2024-01-01"), new Date("2024-01-02"), { order: "ASC" })
// Returns: -1

compare(new Date("2024-01-02"), new Date("2024-01-01"), { order: "ASC" })
// Returns: 1

compare(new Date("2024-01-01"), new Date("2024-01-01"), { order: "ASC" })
// Returns: 0
```

**Test Assertion**:
```typescript
expect(compare(earlier, later, { order: "ASC" })).toBe(-1);
expect(compare(later, earlier, { order: "ASC" })).toBe(1);
expect(compare(date, date, { order: "ASC" })).toBe(0);
```

---

### Contract 4: Explicit Descending Order

**Spec Reference**: FR-002

**Given**: Two valid dates to compare
**When**: `{ order: "DESC" }` is provided
**Then**: Returns `1` if date1 < date2, `-1` if date1 > date2, `0` if equal (inverted from ASC)

**Examples**:
```typescript
compare(new Date("2024-01-01"), new Date("2024-01-02"), { order: "DESC" })
// Returns: 1 (inverted from ASC -1)

compare(new Date("2024-01-02"), new Date("2024-01-01"), { order: "DESC" })
// Returns: -1 (inverted from ASC 1)

compare(new Date("2024-01-01"), new Date("2024-01-01"), { order: "DESC" })
// Returns: 0 (equal remains 0)
```

**Test Assertion**:
```typescript
expect(compare(earlier, later, { order: "DESC" })).toBe(1);
expect(compare(later, earlier, { order: "DESC" })).toBe(-1);
expect(compare(date, date, { order: "DESC" })).toBe(0);

// Verify inversion property
expect(compare(earlier, later, { order: "DESC" })).toBe(
  -compare(earlier, later, { order: "ASC" })
);
```

---

### Contract 5: Case-Insensitive Order Values

**Spec Reference**: FR-006

**Given**: Two valid dates to compare
**When**: Order value uses non-uppercase casing (e.g., "asc", "desc", "Desc")
**Then**: Value is normalized to uppercase and processed correctly

**Examples**:
```typescript
// TypeScript will error, but runtime behavior is defined
// @ts-expect-error Testing runtime case-insensitivity
compare(date1, date2, { order: "desc" })
// Runtime: Treated as "DESC", returns descending order

// @ts-expect-error
compare(date1, date2, { order: "asc" })
// Runtime: Treated as "ASC", returns ascending order

// @ts-expect-error
compare(date1, date2, { order: "Desc" })
// Runtime: Treated as "DESC", returns descending order
```

**Test Assertion**:
```typescript
// @ts-expect-error Testing runtime behavior
expect(compare(earlier, later, { order: "desc" })).toBe(1);

// @ts-expect-error
expect(compare(earlier, later, { order: "asc" })).toBe(-1);

// Verify equivalence
// @ts-expect-error
expect(compare(earlier, later, { order: "DESC" })).toBe(
  compare(earlier, later, { order: "desc" as any })
);
```

---

### Contract 6: Invalid Order Values Default to ASC

**Spec Reference**: FR-005

**Given**: Two valid dates to compare
**When**: Order value is not "ASC" or "DESC" (case-insensitive)
**Then**: Defaults to ascending order ("ASC")

**Examples**:
```typescript
// @ts-expect-error Testing invalid order value
compare(date1, date2, { order: "invalid" })
// Returns: -1 (same as ASC)

// @ts-expect-error
compare(date1, date2, { order: "ASCENDING" })
// Returns: -1 (defaults to ASC)

// @ts-expect-error
compare(date1, date2, { order: "" })
// Returns: -1 (defaults to ASC)
```

**Test Assertion**:
```typescript
// @ts-expect-error
const invalidResult = compare(earlier, later, { order: "invalid" as any });
expect(invalidResult).toBe(-1);
expect(invalidResult).toBe(compare(earlier, later, { order: "ASC" }));
```

---

### Contract 7: Null/Undefined Options Default to ASC

**Spec Reference**: FR-011

**Given**: Two valid dates to compare
**When**: Options parameter is `null` or `undefined` (explicitly passed)
**Then**: Defaults to ascending order

**Examples**:
```typescript
// @ts-expect-error Testing null handling
compare(date1, date2, null)
// Returns: -1 (same as ASC)

compare(date1, date2, undefined)
// Returns: -1 (same as ASC, same as omitting parameter)
```

**Test Assertion**:
```typescript
// @ts-expect-error Testing runtime null handling
expect(compare(earlier, later, null)).toBe(-1);
expect(compare(earlier, later, undefined)).toBe(-1);
expect(compare(earlier, later, null as any)).toBe(compare(earlier, later));
```

---

### Contract 8: Unknown Properties Are Ignored

**Spec Reference**: FR-012

**Given**: Two valid dates to compare
**When**: Options object contains unknown properties
**Then**: Unknown properties are ignored, valid `order` property is used

**Examples**:
```typescript
// @ts-expect-error Testing excess properties
compare(date1, date2, { order: "DESC", unknown: true, extra: "value" })
// Returns: 1 (DESC order used, unknown properties ignored)
```

**Test Assertion**:
```typescript
// @ts-expect-error Testing excess properties
const result = compare(earlier, later, {
  order: "DESC",
  unknown: true,
  extra: "value",
} as any);

expect(result).toBe(1);
expect(result).toBe(compare(earlier, later, { order: "DESC" }));
```

---

### Contract 9: Invalid Date Inputs Return NaN

**Spec Reference**: FR-007, FR-008

**Given**: Invalid Date objects or non-numeric timestamps
**When**: Passed as date1 or date2 parameters
**Then**: Returns `NaN` (maintains existing error handling behavior)

**Examples**:
```typescript
compare(new Date("invalid"), new Date("2024-01-01"), { order: "ASC" })
// Returns: NaN

compare(new Date("2024-01-01"), new Date("invalid"), { order: "DESC" })
// Returns: NaN

compare("not-a-date" as any, new Date(), {})
// Returns: NaN
```

**Test Assertion**:
```typescript
const invalidDate = new Date("invalid");
const validDate = new Date("2024-01-01");

expect(compare(invalidDate, validDate, { order: "ASC" })).toBeNaN();
expect(compare(validDate, invalidDate, { order: "DESC" })).toBeNaN();
expect(compare(invalidDate, invalidDate, {})).toBeNaN();
```

---

### Contract 10: Maintains Array.sort() Compatibility

**Spec Reference**: FR-007

**Given**: Array of Date objects
**When**: Used with `Array.sort()` as comparator
**Then**: Sorts correctly in both ascending and descending order

**Examples**:
```typescript
const dates = [new Date("2024-01-03"), new Date("2024-01-01"), new Date("2024-01-02")];

// Ascending sort
dates.sort((a, b) => compare(a, b));
// Result: [2024-01-01, 2024-01-02, 2024-01-03]

// Descending sort
dates.sort((a, b) => compare(a, b, { order: "DESC" }));
// Result: [2024-01-03, 2024-01-02, 2024-01-01]
```

**Test Assertion**:
```typescript
const sorted = dates.sort((a, b) => compare(a, b, { order: "DESC" }));
expect(sorted[0].getTime()).toBeGreaterThan(sorted[1].getTime());
expect(sorted[1].getTime()).toBeGreaterThan(sorted[2].getTime());
```

---

## Contract Verification Checklist

Each contract must have:
- [x] Clear specification reference (FR-XXX)
- [x] Given-When-Then structure
- [x] Code examples demonstrating behavior
- [x] Test assertions in Vitest format
- [x] Edge cases documented

## Implementation Notes

### Test File Location
`tests/contract/compare-options.test.ts`

### Test Structure
```typescript
import { describe, it, expect } from "vitest";
import { compare, CompareOptions } from "../src";

describe("CompareOptions API Contracts", () => {
  describe("Contract 1: Default Behavior (Omitted Parameter)", () => {
    it("should default to ascending order when options omitted", () => {
      // Test implementation
    });
  });

  describe("Contract 2: Default Behavior (Empty Options Object)", () => {
    it("should default to ascending order with empty object", () => {
      // Test implementation
    });
  });

  // ... more contract tests
});
```

### TDD Requirement
**IMPORTANT**: All contract tests must be written BEFORE implementation changes. Tests must FAIL initially, then pass after implementation.

---

## Breaking Change Documentation

### Old API (No Longer Supported)
```typescript
compare(date1, date2, "DESC") // TypeScript error
```

### New API (Required)
```typescript
compare(date1, date2, { order: "DESC" }) // ✅ Correct
```

### Migration Validation
TypeScript compiler will catch all old API usage:
```
Type 'string' is not assignable to type 'CompareOptions'
```

---
**Contracts Complete**: All 10 behavioral contracts defined and ready for test implementation.
