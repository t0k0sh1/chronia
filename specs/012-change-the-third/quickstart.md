# Quickstart: CompareOptions Implementation & Validation

**Feature**: compare() function with options object parameter
**Date**: 2025-01-14
**Purpose**: Step-by-step guide for implementing and validating the CompareOptions feature

## Prerequisites
- [x] Feature specification reviewed (spec.md)
- [x] Implementation plan reviewed (plan.md)
- [x] Research decisions documented (research.md)
- [x] Data model defined (data-model.md)
- [x] Contracts specified (contracts/compare-options.contract.md)

## Implementation Overview

### What We're Building
Refactoring the `compare()` function to accept an options object instead of a string for the third parameter:

**Before**:
```typescript
compare(date1, date2, "DESC") // String parameter
```

**After**:
```typescript
compare(date1, date2, { order: "DESC" }) // Options object
```

### Why This Change
- **Extensibility**: Options object allows future additions (locale, custom compare function)
- **Consistency**: Aligns with other chronia functions that accept options
- **Type Safety**: Better TypeScript IntelliSense and compile-time checks
- **Industry Standard**: Follows patterns from date-fns, Day.js, Luxon

---

## Step-by-Step Implementation Guide

### Phase 1: Type Definitions

#### Step 1.1: Define CompareOptions Interface
**File**: `src/types/index.ts`

**Action**: Add or update the CompareOptions interface

```typescript
/**
 * Options for configuring the compare() function behavior.
 */
export interface CompareOptions {
  /**
   * Sort order for comparison results.
   * @default "ASC"
   */
  order?: "ASC" | "DESC";
}
```

**Verification**:
```bash
# TypeScript compilation should succeed
npm run build

# No errors expected at this stage
```

#### Step 1.2: Export CompareOptions from Main Entry Point
**File**: `src/index.ts`

**Action**: Export the new type

```typescript
export type { CompareOptions } from "./types";
```

**Verification**:
```bash
# Check export is available
node -e "const { CompareOptions } = require('./dist/index.cjs'); console.log('Export available');"
```

---

### Phase 2: Write Contract Tests (TDD)

#### Step 2.1: Create Contract Test File
**File**: `tests/contract/compare-options.test.ts`

**Action**: Create test file with all 10 contracts from `contracts/compare-options.contract.md`

```typescript
import { describe, it, expect } from "vitest";
import { compare } from "../src/compare";

describe("CompareOptions API Contracts", () => {
  const earlier = new Date("2024-01-01");
  const later = new Date("2024-01-02");

  describe("Contract 1: Default Behavior (Omitted Parameter)", () => {
    it("should default to ascending order when options omitted", () => {
      expect(compare(earlier, later)).toBe(-1);
      expect(compare(later, earlier)).toBe(1);
      expect(compare(earlier, earlier)).toBe(0);
    });

    it("should match explicit ASC behavior", () => {
      expect(compare(earlier, later)).toBe(
        compare(earlier, later, { order: "ASC" })
      );
    });
  });

  describe("Contract 2: Default Behavior (Empty Options Object)", () => {
    it("should default to ascending order with empty object", () => {
      expect(compare(earlier, later, {})).toBe(-1);
    });

    it("should match omitted parameter behavior", () => {
      expect(compare(earlier, later, {})).toBe(compare(earlier, later));
    });
  });

  describe("Contract 3: Explicit Ascending Order", () => {
    it("should return -1 when first date is earlier", () => {
      expect(compare(earlier, later, { order: "ASC" })).toBe(-1);
    });

    it("should return 1 when first date is later", () => {
      expect(compare(later, earlier, { order: "ASC" })).toBe(1);
    });

    it("should return 0 when dates are equal", () => {
      expect(compare(earlier, earlier, { order: "ASC" })).toBe(0);
    });
  });

  describe("Contract 4: Explicit Descending Order", () => {
    it("should return 1 when first date is earlier (inverted)", () => {
      expect(compare(earlier, later, { order: "DESC" })).toBe(1);
    });

    it("should return -1 when first date is later (inverted)", () => {
      expect(compare(later, earlier, { order: "DESC" })).toBe(-1);
    });

    it("should return 0 when dates are equal", () => {
      expect(compare(earlier, earlier, { order: "DESC" })).toBe(0);
    });

    it("should invert ASC results", () => {
      expect(compare(earlier, later, { order: "DESC" })).toBe(
        -compare(earlier, later, { order: "ASC" })
      );
    });
  });

  describe("Contract 5: Case-Insensitive Order Values", () => {
    it("should handle lowercase 'desc'", () => {
      // @ts-expect-error Testing runtime case-insensitivity
      expect(compare(earlier, later, { order: "desc" })).toBe(1);
    });

    it("should handle lowercase 'asc'", () => {
      // @ts-expect-error
      expect(compare(earlier, later, { order: "asc" })).toBe(-1);
    });

    it("should handle mixed case", () => {
      // @ts-expect-error
      expect(compare(earlier, later, { order: "Desc" })).toBe(1);
    });
  });

  describe("Contract 6: Invalid Order Values Default to ASC", () => {
    it("should default to ASC for invalid string", () => {
      // @ts-expect-error Testing invalid order value
      expect(compare(earlier, later, { order: "invalid" })).toBe(-1);
    });

    it("should match ASC behavior for invalid value", () => {
      // @ts-expect-error
      const invalidResult = compare(earlier, later, { order: "xyz" });
      expect(invalidResult).toBe(compare(earlier, later, { order: "ASC" }));
    });
  });

  describe("Contract 7: Null/Undefined Options Default to ASC", () => {
    it("should handle undefined options", () => {
      expect(compare(earlier, later, undefined)).toBe(-1);
    });

    it("should handle null options", () => {
      // @ts-expect-error Testing null handling
      expect(compare(earlier, later, null)).toBe(-1);
    });

    it("should match default behavior", () => {
      // @ts-expect-error
      expect(compare(earlier, later, null)).toBe(compare(earlier, later));
    });
  });

  describe("Contract 8: Unknown Properties Are Ignored", () => {
    it("should ignore excess properties", () => {
      // @ts-expect-error Testing excess properties
      const result = compare(earlier, later, {
        order: "DESC",
        unknown: true,
        extra: "value",
      });
      expect(result).toBe(1);
    });

    it("should match clean options behavior", () => {
      // @ts-expect-error
      expect(
        compare(earlier, later, { order: "DESC", unknown: true })
      ).toBe(compare(earlier, later, { order: "DESC" }));
    });
  });

  describe("Contract 9: Invalid Date Inputs Return NaN", () => {
    const invalidDate = new Date("invalid");
    const validDate = new Date("2024-01-01");

    it("should return NaN for invalid first date", () => {
      expect(compare(invalidDate, validDate, { order: "ASC" })).toBeNaN();
    });

    it("should return NaN for invalid second date", () => {
      expect(compare(validDate, invalidDate, { order: "DESC" })).toBeNaN();
    });

    it("should return NaN for both invalid dates", () => {
      expect(compare(invalidDate, invalidDate, {})).toBeNaN();
    });
  });

  describe("Contract 10: Maintains Array.sort() Compatibility", () => {
    it("should sort in ascending order", () => {
      const dates = [
        new Date("2024-01-03"),
        new Date("2024-01-01"),
        new Date("2024-01-02"),
      ];
      dates.sort((a, b) => compare(a, b));

      expect(dates[0].toISOString()).toBe("2024-01-01T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-03T00:00:00.000Z");
    });

    it("should sort in descending order", () => {
      const dates = [
        new Date("2024-01-01"),
        new Date("2024-01-03"),
        new Date("2024-01-02"),
      ];
      dates.sort((a, b) => compare(a, b, { order: "DESC" }));

      expect(dates[0].toISOString()).toBe("2024-01-03T00:00:00.000Z");
      expect(dates[1].toISOString()).toBe("2024-01-02T00:00:00.000Z");
      expect(dates[2].toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });
  });
});
```

**Verification**:
```bash
# Run contract tests - MUST FAIL at this point (TDD)
npm test tests/contract/compare-options.test.ts

# Expected: All tests fail (implementation not updated yet)
```

---

### Phase 3: Update compare() Function

#### Step 3.1: Update Function Signature
**File**: `src/compare/index.ts`

**Action**: Change third parameter from string to CompareOptions

**Before**:
```typescript
export function compare(
  date1: Date | number,
  date2: Date | number,
  order?: "ASC" | "DESC",
): number
```

**After**:
```typescript
import { CompareOptions } from "../types";

export function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number
```

#### Step 3.2: Update Order Normalization Logic
**Action**: Extract order from options object and normalize

**Before**:
```typescript
let normalizedOrder: "ASC" | "DESC" = "ASC";
if (order !== undefined && order !== null && typeof order === "string") {
  const upperOrder = order.toUpperCase();
  if (upperOrder === "DESC") {
    normalizedOrder = "DESC";
  }
}
```

**After**:
```typescript
let normalizedOrder: "ASC" | "DESC" = "ASC";
if (options?.order !== undefined && options?.order !== null && typeof options.order === "string") {
  const upperOrder = options.order.toUpperCase();
  if (upperOrder === "DESC") {
    normalizedOrder = "DESC";
  }
}
```

#### Step 3.3: Update JSDoc Comments
**Action**: Update all JSDoc examples and parameter descriptions

**Verification**:
```bash
# Run contract tests - should START PASSING now
npm test tests/contract/compare-options.test.ts

# Expected: All 10 contract tests pass
```

---

### Phase 4: Update Existing Tests

#### Step 4.1: Update compare.test.ts
**File**: `tests/compare.test.ts`

**Action**: Replace all string parameter usage with options objects

**Find**: `compare(a, b, "DESC")`
**Replace**: `compare(a, b, { order: "DESC" })`

**Find**: `compare(a, b, "ASC")`
**Replace**: `compare(a, b, { order: "ASC" })`

**Verification**:
```bash
# Run all compare tests
npm test tests/compare.test.ts

# Expected: All ~74 tests pass
```

#### Step 4.2: Remove Runtime String Tests
**Action**: Remove tests that check case-insensitive string parameters (no longer applicable)

---

### Phase 5: Documentation Updates

#### Step 5.1: Update JSDoc in src/compare/index.ts
**Action**: Update all examples to use options object

**Example changes**:
```typescript
/**
 * @example
 * // Before (old API)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), 'DESC');
 *
 * // After (new API)
 * compare(new Date('2024-01-01'), new Date('2024-01-02'), { order: 'DESC' }); // 1
 */
```

#### Step 5.2: Update README.md
**File**: `README.md`

**Action**: Update "Comparison" section (line 227-236)

**Before**:
```typescript
import { isAfter, compare } from "chronia";

isAfter(new Date(2025, 0, 1), new Date(2024, 0, 1)); // true

const dates = [new Date(2024, 0, 10), new Date(2024, 0, 20)];
dates.sort(compare); // chronological order
```

**After**:
```typescript
import { isAfter, compare } from "chronia";

isAfter(new Date(2025, 0, 1), new Date(2024, 0, 1)); // true

const dates = [new Date(2024, 0, 10), new Date(2024, 0, 20)];
dates.sort(compare); // ascending order (default)
dates.sort((a, b) => compare(a, b, { order: "DESC" })); // descending order
```

#### Step 5.3: Update CHANGELOG.md
**File**: `CHANGELOG.md`

**Action**: Add breaking change entry

```markdown
## [Unreleased]

### BREAKING CHANGES

#### compare() function signature changed

The third parameter of `compare()` has been changed from a string (`"ASC" | "DESC"`) to an options object (`CompareOptions`).

**Migration Guide:**
- Replace `compare(date1, date2, "DESC")` with `compare(date1, date2, { order: "DESC" })`
- Replace `compare(date1, date2, "ASC")` with `compare(date1, date2, { order: "ASC" })` or omit third parameter
- TypeScript compiler will show errors at all call sites that need updates

**Rationale:** Options object provides better extensibility for future features (locale support, custom comparison functions, etc.)
```

---

## Validation Checklist

### Pre-Implementation
- [x] Feature spec reviewed and approved
- [x] Implementation plan created
- [x] Technical decisions documented
- [x] Contracts defined

### During Implementation
- [ ] CompareOptions interface defined in src/types/index.ts
- [ ] Type exported from src/index.ts
- [ ] Contract tests written (TDD - tests first!)
- [ ] Contract tests fail initially (expected)
- [ ] compare() signature updated
- [ ] Order normalization logic updated
- [ ] Contract tests pass after implementation
- [ ] Existing tests updated to use new API
- [ ] All existing tests pass

### Documentation
- [ ] JSDoc updated in src/compare/index.ts
- [ ] README.md "Comparison" section updated
- [ ] CHANGELOG.md breaking change entry added
- [ ] TypeDoc builds without errors

### Final Verification
- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes all tests (contract + existing)
- [ ] `npm run build` succeeds (ESM + CJS)
- [ ] `npx typedoc` generates docs without errors
- [ ] Git diff reviewed (no unintended changes)
- [ ] Commit message follows Conventional Commits

---

## Testing the Feature

### Manual Testing

#### Test 1: Default Behavior
```bash
node -e "
const { compare } = require('./dist/index.cjs');
const d1 = new Date('2024-01-01');
const d2 = new Date('2024-01-02');
console.log('Default (omitted):', compare(d1, d2)); // -1
console.log('Empty object:', compare(d1, d2, {})); // -1
"
```

#### Test 2: Explicit Order
```bash
node -e "
const { compare } = require('./dist/index.cjs');
const d1 = new Date('2024-01-01');
const d2 = new Date('2024-01-02');
console.log('ASC:', compare(d1, d2, { order: 'ASC' })); // -1
console.log('DESC:', compare(d1, d2, { order: 'DESC' })); // 1
"
```

#### Test 3: Array Sorting
```bash
node -e "
const { compare } = require('./dist/index.cjs');
const dates = [new Date('2024-01-03'), new Date('2024-01-01'), new Date('2024-01-02')];
dates.sort((a, b) => compare(a, b, { order: 'DESC' }));
console.log('Sorted DESC:', dates.map(d => d.toISOString().slice(0, 10)));
// ['2024-01-03', '2024-01-02', '2024-01-01']
"
```

### Automated Testing
```bash
# Run all tests
npm test

# Run specific contract tests
npm test -- tests/contract/compare-options.test.ts

# Run with coverage
npm test -- --coverage

# Expected coverage: 100% for compare() function
```

---

## Troubleshooting

### Issue: Contract tests fail after implementation
**Symptom**: Tests still failing after updating compare() function
**Solution**:
1. Check function signature matches `options: CompareOptions = { order: "ASC" }`
2. Verify order extraction: `options?.order?.toUpperCase()`
3. Ensure default value is set correctly
4. Check import: `import { CompareOptions } from "../types"`

### Issue: Existing tests fail with type errors
**Symptom**: TypeScript errors in tests/compare.test.ts
**Solution**:
1. Find all `compare(a, b, "DESC")` usage
2. Replace with `compare(a, b, { order: "DESC" })`
3. Update test expectations if needed (should remain the same)

### Issue: Build fails with type errors
**Symptom**: `npm run build` shows TypeScript errors
**Solution**:
1. Ensure CompareOptions is exported from src/types/index.ts
2. Verify re-export in src/index.ts: `export type { CompareOptions } from "./types"`
3. Check default value syntax: `options: CompareOptions = { order: "ASC" }`

### Issue: Performance regression
**Symptom**: Performance tests show slowdown
**Solution**:
1. Verify minimal overhead: only one additional property access
2. Check default value is not recreated per call
3. Run performance tests: `npm test -- tests/compare.test.ts -t "Performance"`
4. Expected: <1% difference (within noise margin)

---

## Success Criteria

✅ **Implementation Complete** when:
1. All contract tests pass (10/10)
2. All existing tests pass (~74 tests)
3. Lint passes with no errors
4. Build succeeds (ESM + CJS)
5. Documentation updated (JSDoc, README, CHANGELOG)
6. TypeDoc generates without errors
7. No performance regression (<1% overhead)
8. Git commit follows Conventional Commits format

---

## Next Steps

After quickstart validation:
1. Run `/tasks` command to generate detailed task breakdown
2. Execute tasks following TDD principles
3. Create commit with breaking change note
4. Consider creating migration guide for users (if needed for future)

---
**Quickstart Complete**: Ready for implementation following TDD workflow.
