# Test-Driven Development (TDD) Guidelines

## Purpose

This document defines the standards and best practices for Test-Driven Development (TDD) in the Chronia library. TDD ensures code quality, prevents regressions, and serves as executable documentation of function behavior.

Use this guideline when implementing functions using the TDD approach with Vitest framework.

## Overview

Test-Driven Development is a software development methodology where tests are written before implementation code. This approach:

- **Clarifies Requirements**: Writing tests first forces clear thinking about function behavior
- **Prevents Regressions**: Automated tests catch breaking changes immediately
- **Documents Behavior**: Tests serve as executable examples of how functions work
- **Improves Design**: Test-first approach leads to more testable, modular code
- **Increases Confidence**: Comprehensive test coverage enables safe refactoring

**Key Principle**: Write failing tests first, then write minimal code to make them pass.

### TDD Test Coverage Strategy

TDD focuses on **formal and rigorous testing based on design**:

- **Equivalence Partitioning**: Divide input space into equivalence classes
- **Boundary Value Analysis**: Test at boundaries between equivalence classes
- **Representative Values**: Select representative values from each partition
- **Minimal Happy Path**: Keep normal case tests to minimum necessary
- **Focus on Edge Cases**: Prioritize boundary values and error conditions
- **Design-Based**: Tests verify implementation matches design specifications

**Example of Equivalence Partitioning**:

```typescript
// For addDays(date, days), partition the 'days' parameter:
// Partition 1: Negative days (days < 0)  → Representative: -5
// Partition 2: Zero days (days === 0)    → Representative: 0
// Partition 3: Positive days (days > 0)  → Representative: 5

// Boundary values between partitions:
// Boundary 1: -1 (edge of negative partition)
// Boundary 2: 0 (boundary between negative and zero)
// Boundary 3: 1 (edge of positive partition)
```

### TDD vs Property-Based Testing

**TDD (this guideline)**:

- **Test Strategy**: Equivalence partitioning + boundary value analysis
- **Test Data**: Carefully selected representative and boundary values
- **Coverage**: Formal, rigorous verification of design specifications
- **Focus**: Minimal normal cases, maximum edge cases and error conditions
- **Basis**: Design documents and interface specifications
- **Nature**: Deterministic tests with specific, predictable inputs

**Property-Based Testing** (see [Property-Based Testing Guidelines](./property-based-testing.md)):

- **Test Strategy**: Random input generation with invariant verification
- **Test Data**: Large volume of randomly generated inputs
- **Coverage**: Probabilistic verification of requirement properties
- **Focus**: Invariants and properties that must hold for all inputs
- **Basis**: Requirements documents and acceptance criteria
- **Nature**: Probabilistic tests with randomized, unpredictable inputs

**Key Difference**: TDD uses minimal, carefully selected test cases to rigorously verify design, while PBT uses large volumes of random inputs to probabilistically verify requirements.

---

## TDD Cycle

### The Red-Green-Refactor Cycle

TDD follows a three-step cycle:

```text
1. RED: Write a failing test
   ├─ Define expected behavior
   ├─ Write test that verifies this behavior
   └─ Run test (it should fail - no implementation yet)

2. GREEN: Make the test pass
   ├─ Write minimal code to pass the test
   ├─ Focus on making it work, not perfect
   └─ Run test (it should pass now)

3. REFACTOR: Improve the code
   ├─ Clean up implementation
   ├─ Remove duplication
   ├─ Improve readability
   └─ Ensure tests still pass

4. REPEAT: Go to step 1 for next behavior
```

### Workflow Example

```typescript
// Step 1: RED - Write failing test
describe('addDays', () => {
  it('should add positive days to a date', () => {
    const date = new Date(2025, 0, 1); // Jan 1, 2025
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(6); // Should be Jan 6
  });
});

// Run: pnpm test
// Result: FAIL - addDays is not defined

// Step 2: GREEN - Minimal implementation
export function addDays(date: Date | number, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Run: pnpm test
// Result: PASS

// Step 3: REFACTOR - Improve implementation
export function addDays(date: Date | number, days: number): Date {
  const timestamp = typeof date === 'number' ? date : date.getTime();
  const daysInMs = Math.floor(days) * 86400000;
  return new Date(timestamp + daysInMs);
}

// Run: pnpm test
// Result: PASS (still works after refactoring)

// Step 4: REPEAT - Write next test (e.g., for negative days)
```

---

## Test Structure

### File Organization

```text
tests/
├─ <function-name>/
│  └─ index.test.ts      # Main test file for function
├─ <category>/
│  ├─ function1.test.ts
│  ├─ function2.test.ts
│  └─ ...
```

### Test File Template

```typescript
import { describe, it, expect } from 'vitest';
import { functionName } from '../src/category/functionName';

describe('functionName', () => {
  describe('happy path', () => {
    it('should handle typical use case', () => {
      // Arrange
      const input = /* test data */;

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toBe(/* expected output */);
    });
  });

  describe('edge cases', () => {
    it('should handle boundary values', () => {
      // Test implementation
    });
  });

  describe('invalid inputs', () => {
    it('should handle invalid input gracefully', () => {
      // Test implementation
    });
  });

  describe('options', () => {
    it('should respect custom options', () => {
      // Test implementation
    });
  });
});
```

### Arrange-Act-Assert Pattern

Structure each test clearly:

```typescript
it('should add days correctly', () => {
  // Arrange: Set up test data
  const date = new Date(2025, 0, 1);
  const daysToAdd = 5;

  // Act: Execute the function
  const result = addDays(date, daysToAdd);

  // Assert: Verify the outcome
  expect(result.getDate()).toBe(6);
  expect(result.getMonth()).toBe(0);
  expect(result.getFullYear()).toBe(2025);
});
```

---

## Test Categories

### Test Category Priority

In TDD, prioritize test categories as follows:

1. **Edge Cases & Boundaries** (Highest Priority) - Focus here
2. **Invalid Inputs** (High Priority) - Comprehensive error handling
3. **Options** (Medium Priority) - If function has configurable behavior
4. **Happy Path** (Minimum Necessary) - Keep to essential cases only

**Rationale**: Edge cases and error conditions are where bugs hide. Normal cases are typically straightforward and less likely to fail.

---

### 1. Happy Path Tests

Test normal, expected usage scenarios with **minimum necessary coverage**.

**Purpose**: Verify function works correctly under typical conditions

**Strategy**:

- Select **one representative value** from each major equivalence partition
- Avoid testing multiple similar normal cases
- Focus testing effort on edge cases instead

**Examples**:

```typescript
describe('happy path', () => {
  it('should handle Date objects', () => {
    const date = new Date(2025, 0, 15);
    expect(isValid(date)).toBe(true);
  });

  it('should handle timestamps', () => {
    const timestamp = new Date(2025, 0, 15).getTime();
    expect(isValid(timestamp)).toBe(true);
  });

  it('should handle mixed types in comparisons', () => {
    const date = new Date(2025, 0, 1);
    const timestamp = new Date(2025, 0, 2).getTime();
    expect(isBefore(date, timestamp)).toBe(true);
  });

  it('should return expected value for standard input', () => {
    const date = new Date(2025, 5, 15); // June 15, 2025
    expect(getMonth(date)).toBe(6); // 1-indexed month
  });
});
```

**Best Practices**:

- **Minimize happy path tests**: One representative case per equivalence class is sufficient
- Test both Date objects and numeric timestamps (different equivalence classes)
- Use realistic, meaningful test data
- **Spend more effort on edge cases**: Normal cases are least likely to have bugs
- Keep tests simple and focused

---

### 2. Edge Cases Tests

Test boundary values, special dates, and corner cases. **This is the primary focus of TDD.**

**Purpose**: Verify function handles unusual but valid inputs correctly

**Strategy**:

- **Identify boundaries** between equivalence partitions
- **Test at boundaries**: Test values exactly at, just above, and just below boundaries
- **Special values**: Epoch, min/max dates, leap years, month/year boundaries
- **Transition points**: DST changes, timezone boundaries, locale-specific edge cases

**Boundary Value Analysis Example**:

```typescript
// For getMonth(date), test boundaries between months:
describe('month boundaries', () => {
  it('should handle last day of month', () => {
    const lastDay = new Date(2025, 0, 31); // Jan 31
    expect(getMonth(lastDay)).toBe(1); // January
  });

  it('should handle first day of next month', () => {
    const firstDay = new Date(2025, 1, 1); // Feb 1
    expect(getMonth(firstDay)).toBe(2); // February
  });

  it('should handle transition (Jan 31 → Feb 1)', () => {
    const jan31 = new Date(2025, 0, 31);
    const feb1 = addDays(jan31, 1);
    expect(getMonth(feb1)).toBe(2); // Crosses boundary
  });
});
```

**Examples**:

```typescript
describe('edge cases', () => {
  it('should handle epoch date (timestamp 0)', () => {
    const epoch = new Date(0);
    expect(isValid(epoch)).toBe(true);
    expect(getTime(epoch)).toBe(0);
  });

  it('should handle dates before Unix epoch', () => {
    const beforeEpoch = new Date(-86400000); // 1 day before epoch
    expect(isValid(beforeEpoch)).toBe(true);
    expect(getTime(beforeEpoch)).toBe(-86400000);
  });

  it('should handle leap year dates', () => {
    const leapDay = new Date(2024, 1, 29); // Feb 29, 2024
    expect(isValid(leapDay)).toBe(true);
    expect(getDay(leapDay)).toBe(29);
  });

  it('should handle month boundaries', () => {
    const lastDayOfMonth = new Date(2025, 0, 31); // Jan 31
    const result = addDays(lastDayOfMonth, 1);
    expect(getMonth(result)).toBe(2); // February (1-indexed)
    expect(getDay(result)).toBe(1);
  });

  it('should handle year boundaries', () => {
    const lastDayOfYear = new Date(2025, 11, 31);
    const result = addDays(lastDayOfYear, 1);
    expect(getYear(result)).toBe(2026);
    expect(getMonth(result)).toBe(1); // January
  });

  it('should handle DST transitions', () => {
    // Spring forward: March 9, 2025 (US)
    const beforeDST = new Date(2025, 2, 9, 1, 0);
    const afterDST = new Date(2025, 2, 9, 3, 0);
    expect(isBefore(beforeDST, afterDST)).toBe(true);
  });

  it('should handle same timestamp comparison', () => {
    const date = new Date(2025, 0, 15);
    expect(isBefore(date, date)).toBe(false);
    expect(isAfter(date, date)).toBe(false);
  });

  it('should handle minimum safe date', () => {
    const minDate = new Date(-8640000000000000);
    expect(isValid(minDate)).toBe(true);
  });

  it('should handle maximum safe date', () => {
    const maxDate = new Date(8640000000000000);
    expect(isValid(maxDate)).toBe(true);
  });
});
```

**Common Edge Cases to Test**:

- **Temporal Boundaries**:
  - Epoch date (timestamp 0)
  - Negative timestamps (before 1970)
  - Minimum safe date (-8640000000000000)
  - Maximum safe date (8640000000000000)
- **Calendar Boundaries**:
  - Month boundaries (last day → first day of next month)
  - Year boundaries (Dec 31 → Jan 1)
  - Leap years (Feb 28 → Feb 29 in leap year, Feb 28 → Mar 1 in non-leap)
- **Comparison Boundaries**:
  - Same value comparisons (a === b)
  - Adjacent values (difference of 1 millisecond)
- **Special Dates**:
  - Daylight Saving Time transitions
  - Leap seconds (if applicable)
  - Locale-specific holidays or calendars

**Priority**: Spend most testing effort here, not on happy path.

---

### 3. Invalid Inputs Tests

Test graceful handling of invalid inputs. **High priority in TDD.**

**Purpose**: Verify function handles errors according to design specification

**Strategy**:

- **Identify invalid partitions**: Inputs outside valid equivalence classes
- **Test all error conditions**: NaN, Infinity, Invalid Date, out-of-range values
- **Verify error handling**: Ensure function follows design's error handling strategy
- **No exceptions**: Chronia functions should never throw for invalid dates

**Equivalence Partitioning for Validation**:

```typescript
// For isValid(date), partition inputs:
// Valid Partition 1: Valid Date objects
// Valid Partition 2: Finite numeric timestamps
// Invalid Partition 1: Invalid Date objects
// Invalid Partition 2: NaN
// Invalid Partition 3: Infinity / -Infinity
// Invalid Partition 4: Non-numeric, non-Date values (prevented by TypeScript)
```

**Examples**:

```typescript
describe('invalid inputs', () => {
  it('should handle Invalid Date', () => {
    const invalidDate = new Date('invalid string');
    expect(isValid(invalidDate)).toBe(false);
  });

  it('should handle NaN', () => {
    expect(isValid(NaN)).toBe(false);
  });

  it('should handle Infinity', () => {
    expect(isValid(Infinity)).toBe(false);
    expect(isValid(-Infinity)).toBe(false);
  });

  it('should return appropriate default for invalid input', () => {
    // Validation functions return false
    expect(isValid(NaN)).toBe(false);

    // Accessor functions return NaN
    expect(getYear(NaN)).toBe(NaN);
    expect(getMonth(new Date('invalid'))).toBe(NaN);

    // Transformation functions return Invalid Date
    const result = addDays(NaN, 5);
    expect(isValid(result)).toBe(false);
  });

  it('should handle invalid input in comparison functions', () => {
    const validDate = new Date(2025, 0, 1);
    const invalidDate = new Date('invalid');

    expect(isBefore(invalidDate, validDate)).toBe(false);
    expect(isBefore(validDate, invalidDate)).toBe(false);
    expect(isBefore(invalidDate, invalidDate)).toBe(false);
  });

  it('should handle invalid input in both parameters', () => {
    expect(isBefore(NaN, Infinity)).toBe(false);
    expect(isAfter(Infinity, NaN)).toBe(false);
  });
});
```

**Invalid Input Patterns**:

- Invalid Date objects: `new Date('invalid')`
- NaN
- Infinity and -Infinity
- Dates beyond safe range (outside ±8640000000000000)

**Error Handling Strategy**:

- **Validation functions** (`isValid`, `isBefore`, etc.): Return `false`
- **Accessor functions** (`getYear`, `getMonth`, etc.): Return `NaN`
- **Transformation functions** (`addDays`, `startOfDay`, etc.): Return Invalid Date
- **No exceptions thrown**: Functions handle errors gracefully

---

### 4. Options Tests

Test configurable behavior through options parameters.

**Purpose**: Verify options modify function behavior correctly

**Examples**:

```typescript
describe('options', () => {
  it('should use default options when none provided', () => {
    const a = new Date(2025, 0, 1, 10, 30);
    const b = new Date(2025, 0, 1, 14, 45);
    // Default unit is millisecond (exact comparison)
    expect(isBefore(a, b)).toBe(true);
  });

  it('should respect custom unit option', () => {
    const a = new Date(2025, 0, 1, 10, 30);
    const b = new Date(2025, 0, 1, 14, 45);
    // Same day, different times
    expect(isBefore(a, b, { unit: 'day' })).toBe(false);
  });

  it('should handle all supported unit values', () => {
    const units: TimeUnit[] = [
      'year', 'month', 'day', 'hour',
      'minute', 'second', 'millisecond'
    ];
    const date1 = new Date(2025, 0, 1);
    const date2 = new Date(2025, 0, 2);

    units.forEach(unit => {
      expect(() => isBefore(date1, date2, { unit })).not.toThrow();
    });
  });

  it('should handle year unit comparison', () => {
    const a = new Date(2025, 0, 1);
    const b = new Date(2025, 11, 31);
    // Same year
    expect(isBefore(a, b, { unit: 'year' })).toBe(false);
    expect(isAfter(a, b, { unit: 'year' })).toBe(false);
  });

  it('should handle month unit comparison', () => {
    const a = new Date(2025, 5, 1);
    const b = new Date(2025, 5, 30);
    // Same month
    expect(isBefore(a, b, { unit: 'month' })).toBe(false);
  });
});
```

**Options Testing Patterns**:

- Test default behavior (no options)
- Test each option value individually
- Test option combinations
- Verify options don't affect non-relevant behavior

---

## Test Patterns by Function Category

### Validation Functions

Functions that return boolean values based on validation logic.

```typescript
describe('isValid', () => {
  describe('valid inputs', () => {
    it('should return true for valid Date objects', () => {
      expect(isValid(new Date(2025, 0, 1))).toBe(true);
      expect(isValid(new Date())).toBe(true);
    });

    it('should return true for valid timestamps', () => {
      expect(isValid(0)).toBe(true);
      expect(isValid(1704067200000)).toBe(true);
      expect(isValid(-86400000)).toBe(true);
    });
  });

  describe('invalid inputs', () => {
    it('should return false for Invalid Date', () => {
      expect(isValid(new Date('invalid'))).toBe(false);
    });

    it('should return false for non-finite numbers', () => {
      expect(isValid(NaN)).toBe(false);
      expect(isValid(Infinity)).toBe(false);
      expect(isValid(-Infinity)).toBe(false);
    });
  });
});
```

---

### Comparison Functions

Functions that compare two dates.

```typescript
describe('isBefore', () => {
  describe('chronological order', () => {
    it('should return true when first date is before second', () => {
      const earlier = new Date(2025, 0, 1);
      const later = new Date(2025, 0, 2);
      expect(isBefore(earlier, later)).toBe(true);
    });

    it('should return false when first date is after second', () => {
      const earlier = new Date(2025, 0, 1);
      const later = new Date(2025, 0, 2);
      expect(isBefore(later, earlier)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const date = new Date(2025, 0, 1);
      expect(isBefore(date, date)).toBe(false);
    });
  });

  describe('unit-based comparison', () => {
    it('should compare at millisecond precision by default', () => {
      const a = new Date(2025, 0, 1, 10, 0, 0, 0);
      const b = new Date(2025, 0, 1, 10, 0, 0, 1);
      expect(isBefore(a, b)).toBe(true);
    });

    it('should compare at day precision when unit is day', () => {
      const morning = new Date(2025, 0, 1, 9, 0);
      const evening = new Date(2025, 0, 1, 17, 0);
      expect(isBefore(morning, evening, { unit: 'day' })).toBe(false);
    });
  });

  describe('type flexibility', () => {
    it('should accept Date objects', () => {
      const a = new Date(2025, 0, 1);
      const b = new Date(2025, 0, 2);
      expect(isBefore(a, b)).toBe(true);
    });

    it('should accept timestamps', () => {
      const a = new Date(2025, 0, 1).getTime();
      const b = new Date(2025, 0, 2).getTime();
      expect(isBefore(a, b)).toBe(true);
    });

    it('should accept mixed types', () => {
      const dateObj = new Date(2025, 0, 1);
      const timestamp = new Date(2025, 0, 2).getTime();
      expect(isBefore(dateObj, timestamp)).toBe(true);
      expect(isBefore(timestamp, dateObj)).toBe(false);
    });
  });
});
```

---

### Transformation Functions

Functions that return modified dates.

```typescript
describe('addDays', () => {
  describe('basic operations', () => {
    it('should add positive days', () => {
      const date = new Date(2025, 0, 1);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should subtract with negative days', () => {
      const date = new Date(2025, 0, 10);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(5);
    });

    it('should handle zero days', () => {
      const date = new Date(2025, 0, 15);
      const result = addDays(date, 0);
      expect(result.getTime()).toBe(date.getTime());
    });
  });

  describe('boundary handling', () => {
    it('should handle month boundaries', () => {
      const date = new Date(2025, 0, 30); // Jan 30
      const result = addDays(date, 2);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(1);
    });

    it('should handle year boundaries', () => {
      const date = new Date(2025, 11, 30); // Dec 30
      const result = addDays(date, 2);
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0); // January
    });

    it('should handle leap years', () => {
      const date = new Date(2024, 1, 28); // Feb 28, 2024
      const result = addDays(date, 1);
      expect(result.getDate()).toBe(29); // Feb 29 exists in 2024
    });
  });

  describe('immutability', () => {
    it('should not mutate the original date', () => {
      const date = new Date(2025, 0, 1);
      const originalTime = date.getTime();

      addDays(date, 5);

      expect(date.getTime()).toBe(originalTime);
    });

    it('should return a new Date instance', () => {
      const date = new Date(2025, 0, 1);
      const result = addDays(date, 5);
      expect(result).not.toBe(date);
    });
  });

  describe('fractional amounts', () => {
    it('should floor fractional days', () => {
      const date = new Date(2025, 0, 1);
      const result = addDays(date, 2.7);
      expect(result.getDate()).toBe(3); // 1 + floor(2.7) = 1 + 2
    });
  });

  describe('type flexibility', () => {
    it('should accept Date objects', () => {
      const date = new Date(2025, 0, 1);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should accept timestamps', () => {
      const timestamp = new Date(2025, 0, 1).getTime();
      const result = addDays(timestamp, 5);
      expect(result.getDate()).toBe(6);
    });
  });
});
```

**Transformation Function Testing Checklist**:

- ✓ Basic operations (positive, negative, zero)
- ✓ Boundary handling (month/year boundaries)
- ✓ Immutability (original not modified)
- ✓ Type flexibility (Date and number)
- ✓ Fractional amounts (if applicable)
- ✓ Invalid inputs (return Invalid Date)

---

### Accessor Functions

Functions that extract values from dates.

```typescript
describe('getYear', () => {
  describe('valid inputs', () => {
    it('should return year from Date object', () => {
      const date = new Date(2025, 0, 1);
      expect(getYear(date)).toBe(2025);
    });

    it('should return year from timestamp', () => {
      const timestamp = new Date(2025, 0, 1).getTime();
      expect(getYear(timestamp)).toBe(2025);
    });
  });

  describe('edge cases', () => {
    it('should handle dates before 1970', () => {
      const date = new Date(1950, 0, 1);
      expect(getYear(date)).toBe(1950);
    });

    it('should handle year 0', () => {
      const date = new Date(0, 0, 1);
      expect(getYear(date)).toBe(1900); // JavaScript Date quirk
    });

    it('should handle far future dates', () => {
      const date = new Date(9999, 0, 1);
      expect(getYear(date)).toBe(9999);
    });
  });

  describe('invalid inputs', () => {
    it('should return NaN for Invalid Date', () => {
      const invalid = new Date('invalid');
      expect(getYear(invalid)).toBe(NaN);
    });

    it('should return NaN for NaN', () => {
      expect(getYear(NaN)).toBe(NaN);
    });

    it('should return NaN for Infinity', () => {
      expect(getYear(Infinity)).toBe(NaN);
      expect(getYear(-Infinity)).toBe(NaN);
    });
  });
});
```

---

## Coverage Requirements

### Minimum Coverage Targets

All new code must meet these coverage requirements:

- **Line Coverage**: 100%
- **Branch Coverage**: 100%
- **Function Coverage**: 100%
- **Statement Coverage**: 100%

### Checking Coverage

```bash
# Run tests with coverage report
pnpm test:coverage

# Example output:
# File                | % Stmts | % Branch | % Funcs | % Lines
# --------------------|---------|----------|---------|--------
# src/isValid/index.ts|   100   |    100   |   100   |   100
```

### Coverage Exceptions

Only exception handling code for truly exceptional cases may have <100% coverage, and must be documented:

```typescript
/**
 * Validates time unit parameter
 *
 * @throws {Error} Only when TypeScript type checking is bypassed
 * @coverage-exception Defensive check for runtime type violations
 */
function validateUnit(unit: TimeUnit): void {
  const validUnits = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];

  // This should never happen due to TypeScript, but defensive check
  // Coverage exception: extraordinary error case
  if (!validUnits.includes(unit)) {
    throw new Error(`Invalid unit: ${unit}`);
  }
}
```

**Valid Reasons for Coverage Exceptions**:

- Defensive checks that TypeScript prevents
- Error conditions that can't be triggered in normal operation
- Platform-specific code not testable in CI environment

**Documentation Required**:

- Inline comment explaining why coverage exception is needed
- `@coverage-exception` JSDoc tag

---

## Best Practices

### 1. Descriptive Test Names

Use clear, descriptive test names that explain the scenario and expected outcome:

```typescript
// ✅ Good - clear and specific
it('should return false when first date is after second date', () => {});
it('should handle leap year February 29th correctly', () => {});
it('should not mutate the original Date object', () => {});

// ❌ Bad - vague and unclear
it('should work', () => {});
it('handles dates', () => {});
it('test 1', () => {});
```

**Naming Convention**: `should [expected behavior] [when/for] [condition/input]`

---

### 2. Test Isolation

Each test should be independent and not rely on other tests:

```typescript
// ✅ Good - each test creates its own data
describe('addDays', () => {
  it('should add days correctly', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(6);
  });

  it('should handle month boundaries', () => {
    const date = new Date(2025, 0, 31);
    const result = addDays(date, 1);
    expect(result.getMonth()).toBe(1);
  });
});

// ❌ Bad - tests share state
describe('addDays', () => {
  let date: Date;

  beforeAll(() => {
    date = new Date(2025, 0, 1);
  });

  it('should add days correctly', () => {
    const result = addDays(date, 5);
    date = result; // Mutating shared state!
    expect(result.getDate()).toBe(6);
  });

  it('should handle month boundaries', () => {
    // This test depends on the previous test's mutation
    const result = addDays(date, 26);
    expect(result.getMonth()).toBe(1);
  });
});
```

---

### 3. Avoid Magic Numbers

Use named constants for test data:

```typescript
// ✅ Good - named constants
const EPOCH_TIMESTAMP = 0;
const ONE_DAY_MS = 86400000;
const LEAP_YEAR = 2024;
const NON_LEAP_YEAR = 2025;

describe('date calculations', () => {
  it('should handle epoch date', () => {
    expect(isValid(EPOCH_TIMESTAMP)).toBe(true);
  });

  it('should calculate one day difference', () => {
    const date1 = new Date(2025, 0, 1);
    const date2 = new Date(2025, 0, 2);
    expect(date2.getTime() - date1.getTime()).toBe(ONE_DAY_MS);
  });

  it('should recognize leap year', () => {
    const feb29 = new Date(LEAP_YEAR, 1, 29);
    expect(isValid(feb29)).toBe(true);
  });
});

// ❌ Bad - unexplained numbers
describe('date calculations', () => {
  it('should handle epoch date', () => {
    expect(isValid(0)).toBe(true);
  });

  it('should calculate one day difference', () => {
    const date1 = new Date(2025, 0, 1);
    const date2 = new Date(2025, 0, 2);
    expect(date2.getTime() - date1.getTime()).toBe(86400000);
  });
});
```

---

### 4. One Assertion Per Concept

Keep tests focused on a single concept:

```typescript
// ✅ Good - separate tests for separate concepts
describe('addDays', () => {
  it('should add days correctly', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(6);
  });

  it('should not mutate original date', () => {
    const date = new Date(2025, 0, 1);
    const original = date.getTime();
    addDays(date, 5);
    expect(date.getTime()).toBe(original);
  });
});

// ⚠️ Acceptable - related assertions for same concept
describe('addDays', () => {
  it('should cross month boundary correctly', () => {
    const date = new Date(2025, 0, 31);
    const result = addDays(date, 1);

    // These assertions verify the same concept: boundary crossing
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);  // 1st day
    expect(result.getFullYear()).toBe(2025);
  });
});

// ❌ Bad - testing multiple unrelated concepts
describe('addDays', () => {
  it('should work correctly', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 5);

    expect(result.getDate()).toBe(6);           // Concept 1: adding days
    expect(date.getTime()).toBe(/* ... */);     // Concept 2: immutability
    expect(isValid(addDays(NaN, 5))).toBe(false); // Concept 3: error handling
  });
});
```

---

### 5. Test Behavior, Not Implementation

Focus on observable behavior, not internal implementation:

```typescript
// ✅ Good - tests public API behavior
describe('addDays', () => {
  it('should return date 5 days in the future', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(6);
  });
});

// ❌ Bad - tests implementation details
describe('addDays', () => {
  it('should call Date.setDate internally', () => {
    const spy = vi.spyOn(Date.prototype, 'setDate');
    const date = new Date(2025, 0, 1);
    addDays(date, 5);
    expect(spy).toHaveBeenCalled();
  });
});
```

**Why**: Implementation details can change during refactoring. Tests should verify behavior remains correct, not how it's achieved.

---

### 6. Use Setup and Teardown Appropriately

Use `beforeEach` / `afterEach` for test setup, but avoid sharing mutable state:

```typescript
// ✅ Good - setup that doesn't create coupling
describe('date comparisons', () => {
  let testDate: Date;

  beforeEach(() => {
    // Fresh date for each test
    testDate = new Date(2025, 0, 1);
  });

  it('should recognize same date', () => {
    expect(isBefore(testDate, testDate)).toBe(false);
  });

  it('should recognize later date', () => {
    const later = new Date(2025, 0, 2);
    expect(isBefore(testDate, later)).toBe(true);
  });
});

// ❌ Bad - setup that creates test coupling
describe('date operations', () => {
  let result: Date;

  beforeAll(() => {
    result = addDays(new Date(2025, 0, 1), 5);
  });

  it('should have correct date', () => {
    expect(result.getDate()).toBe(6);
  });

  it('should have correct month', () => {
    result.setMonth(5); // Mutating shared state!
    expect(result.getMonth()).toBe(5);
  });
});
```

---

### 7. Write Minimal Tests First

Start with the simplest test case, then add complexity:

```typescript
// Step 1: Simplest case
it('should add days to a date', () => {
  const date = new Date(2025, 0, 1);
  const result = addDays(date, 1);
  expect(result.getDate()).toBe(2);
});

// Step 2: Add edge cases
it('should handle month boundaries', () => {
  const date = new Date(2025, 0, 31);
  const result = addDays(date, 1);
  expect(result.getMonth()).toBe(1);
});

// Step 3: Add error cases
it('should handle invalid dates', () => {
  const result = addDays(NaN, 5);
  expect(isValid(result)).toBe(false);
});
```

---

## Common Pitfalls

### 1. Testing Multiple Things at Once

```typescript
// ❌ Bad - too much in one test
it('should handle all date operations', () => {
  expect(addDays(new Date(), 1)).toBeDefined();
  expect(subDays(new Date(), 1)).toBeDefined();
  expect(isBefore(new Date(), new Date())).toBe(false);
  expect(isValid(new Date())).toBe(true);
});

// ✅ Good - separate tests
it('should add days', () => {
  const result = addDays(new Date(2025, 0, 1), 1);
  expect(result.getDate()).toBe(2);
});

it('should subtract days', () => {
  const result = subDays(new Date(2025, 0, 2), 1);
  expect(result.getDate()).toBe(1);
});
```

---

### 2. Relying on Test Order

```typescript
// ❌ Bad - tests depend on order
let sharedDate: Date;

it('test 1: creates date', () => {
  sharedDate = new Date(2025, 0, 1);
  expect(sharedDate).toBeDefined();
});

it('test 2: uses date from test 1', () => {
  // Breaks if test 1 doesn't run first
  expect(sharedDate.getFullYear()).toBe(2025);
});

// ✅ Good - independent tests
it('creates and validates date', () => {
  const date = new Date(2025, 0, 1);
  expect(date.getFullYear()).toBe(2025);
});

it('validates another date independently', () => {
  const date = new Date(2025, 0, 1);
  expect(date.getMonth()).toBe(0);
});
```

---

### 3. Not Testing Edge Cases

```typescript
// ❌ Bad - only happy path
describe('addDays', () => {
  it('should add days', () => {
    const date = new Date(2025, 0, 15);
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(20);
  });
});

// ✅ Good - includes edge cases
describe('addDays', () => {
  it('should add days within month', () => {
    const date = new Date(2025, 0, 15);
    const result = addDays(date, 5);
    expect(result.getDate()).toBe(20);
  });

  it('should handle month boundaries', () => {
    const date = new Date(2025, 0, 31);
    const result = addDays(date, 1);
    expect(result.getMonth()).toBe(1);
  });

  it('should handle year boundaries', () => {
    const date = new Date(2025, 11, 31);
    const result = addDays(date, 1);
    expect(result.getFullYear()).toBe(2026);
  });

  it('should handle invalid dates', () => {
    const result = addDays(NaN, 5);
    expect(isValid(result)).toBe(false);
  });
});
```

---

### 4. Brittle Time-Dependent Tests

```typescript
// ❌ Bad - depends on current time
it('should check if date is in the past', () => {
  const date = new Date(2020, 0, 1);
  expect(isBefore(date, new Date())).toBe(true); // Breaks if run before 2020!
});

// ✅ Good - uses fixed reference points
it('should check if date is before reference date', () => {
  const date = new Date(2020, 0, 1);
  const reference = new Date(2025, 0, 1);
  expect(isBefore(date, reference)).toBe(true);
});
```

---

### 5. Incomplete Invalid Input Testing

```typescript
// ❌ Bad - only tests one invalid input
describe('invalid inputs', () => {
  it('should handle invalid date', () => {
    expect(isValid(new Date('invalid'))).toBe(false);
  });
});

// ✅ Good - comprehensive invalid input coverage
describe('invalid inputs', () => {
  it('should handle Invalid Date', () => {
    expect(isValid(new Date('invalid'))).toBe(false);
  });

  it('should handle NaN', () => {
    expect(isValid(NaN)).toBe(false);
  });

  it('should handle Infinity', () => {
    expect(isValid(Infinity)).toBe(false);
    expect(isValid(-Infinity)).toBe(false);
  });

  it('should handle dates beyond safe range', () => {
    expect(isValid(8640000000000001)).toBe(false);
  });
});
```

---

## Workflow Integration

### Phase 2: Implementation & Testing in Development Workflow

TDD is part of Phase 2 in the Code Development Workflow:

```text
Phase 1: Design
└─ Create function signatures

Phase 2: Implementation & Testing (TDD is here)
├─ 1. Write failing test (RED)
├─ 2. Write minimal implementation (GREEN)
├─ 3. Refactor code (REFACTOR)
├─ 4. Repeat until all behaviors covered
└─ 5. Verify coverage: pnpm test:coverage

Phase 3: Quality Check
└─ Code review

Phase 4: PBT Validation (if spec exists)
└─ Property-based tests

Phase 5: Documentation
└─ Write docs

Phase 6: Commit & PR
└─ Create commit
```

### Testing Commands

```bash
# Run all TDD tests
pnpm test

# Run tests in watch mode (auto-rerun on changes)
pnpm test --watch

# Run tests for specific file
pnpm test <function-name>

# Run tests with coverage report
pnpm test:coverage

# Run tests with UI (interactive)
pnpm test --ui
```

---

## See Also

- [Function Testing Guidelines](./function-testing.md) - Overview of testing phases (TDD + PBT)
- [Property-Based Testing Guidelines](./property-based-testing.md) - PBT-specific patterns
- [Function Implementation Guidelines](./function-implementation.md) - Implementation best practices
- [Function Check Guidelines](./function-check.md) - Quality verification
- [Vitest Documentation](https://vitest.dev/) - Official Vitest testing framework documentation
- [Test-Driven Development by Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) - Classic TDD book by Kent Beck
