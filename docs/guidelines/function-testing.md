# Function Testing Guidelines

## Purpose

This document defines the testing standards and patterns for functions in the Chronia library. Comprehensive testing ensures reliability, catches regressions, and documents expected behavior.

Use this guideline when writing tests for new or modified functions.

## Testing Phases

Function testing follows a **two-phase approach**:

### Phase 1: TDD (Test-Driven Development)

- **Framework**: Vitest
- **Commands**: `pnpm test`, `pnpm test:coverage`
- **Location**: `tests/` directory
- **Purpose**: Implement and verify function behavior through unit tests

### Phase 2: Property-Based Testing (PBT)

- **Framework**: fast-check
- **Command**: `pnpm test:pbt`
- **Location**: `.kiro/spec/<spec-name>/` directory (when spec exists)
- **Purpose**: Verify implementation satisfies specification properties

**IMPORTANT**:

- Phase 1 (TDD) is always required for all functions
- Phase 2 (PBT) is required only when a specification exists in `.kiro/spec/`
- Phase 1 must be completed and passing before starting Phase 2

## Testing Requirements

### Phase 1: TDD Requirements

Each function MUST have comprehensive test coverage including:

1. **Happy path**: Normal, expected usage
2. **Edge cases**: Boundary values, special dates
3. **Invalid inputs**: Invalid Date, NaN, Infinity
4. **Type variations**: Both Date objects and timestamps
5. **Options variations**: Different option combinations (if applicable)

### Phase 2: PBT Requirements (when spec exists)

Property-based tests MUST verify:

1. **Specification compliance**: All properties defined in the spec
2. **Invariants**: Properties that must hold for all valid inputs
3. **Idempotence**: Operations that should be repeatable
4. **Commutativity**: Operations where order doesn't matter (if applicable)
5. **Round-trip properties**: Transformations that should be reversible

## Test Structure

### Standard Test Organization

```typescript
describe('functionName', () => {
  describe('happy path', () => {
    it('should handle Date objects', () => { /* ... */ });
    it('should handle timestamps', () => { /* ... */ });
  });

  describe('options', () => {
    it('should use default options', () => { /* ... */ });
    it('should respect custom options', () => { /* ... */ });
  });

  describe('edge cases', () => {
    it('should handle boundary values', () => { /* ... */ });
    it('should handle epoch date', () => { /* ... */ });
  });

  describe('invalid inputs', () => {
    it('should handle Invalid Date', () => { /* ... */ });
    it('should handle NaN', () => { /* ... */ });
    it('should handle Infinity', () => { /* ... */ });
  });
});
```

---

## Test Categories

### 1. Happy Path Tests

Test normal, expected usage scenarios.

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

  it('should handle mixed types', () => {
    const date = new Date(2025, 0, 1);
    const timestamp = new Date(2025, 0, 2).getTime();
    expect(isBefore(date, timestamp)).toBe(true);
  });
});
```

---

### 2. Options Tests

Test configurable behavior through options parameters.

```typescript
describe('options', () => {
  it('should use default options', () => {
    const a = new Date(2025, 0, 1, 10, 30);
    const b = new Date(2025, 0, 1, 14, 45);
    // Default unit is millisecond
    expect(isBefore(a, b)).toBe(true);
  });

  it('should respect custom unit option', () => {
    const a = new Date(2025, 0, 1, 10, 30);
    const b = new Date(2025, 0, 1, 14, 45);
    // Same day, different times
    expect(isBefore(a, b, { unit: 'day' })).toBe(false);
  });

  it('should handle all unit options', () => {
    const units: TimeUnit[] = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'];
    units.forEach(unit => {
      expect(() => isBefore(date1, date2, { unit })).not.toThrow();
    });
  });
});
```

---

### 3. Edge Cases Tests

Test boundary values and special dates.

```typescript
describe('edge cases', () => {
  it('should handle epoch date', () => {
    const epoch = new Date(0);
    expect(isValid(epoch)).toBe(true);
    expect(getTime(epoch)).toBe(0);
  });

  it('should handle dates before epoch', () => {
    const beforeEpoch = new Date(-86400000); // 1 day before epoch
    expect(isValid(beforeEpoch)).toBe(true);
  });

  it('should handle leap year dates', () => {
    const leapDay = new Date(2024, 1, 29); // Feb 29, 2024
    expect(isValid(leapDay)).toBe(true);
  });

  it('should handle month boundaries', () => {
    const lastDayOfMonth = new Date(2025, 0, 31);
    const firstDayOfNextMonth = new Date(2025, 1, 1);
    expect(isBefore(lastDayOfMonth, firstDayOfNextMonth)).toBe(true);
  });

  it('should handle DST transitions', () => {
    // Test behavior around daylight saving time transitions
    const beforeDST = new Date(2025, 2, 9, 1, 0); // Mar 9, 2025, 1:00 AM
    const afterDST = new Date(2025, 2, 9, 3, 0);  // Mar 9, 2025, 3:00 AM
    expect(isBefore(beforeDST, afterDST)).toBe(true);
  });

  it('should handle same timestamp', () => {
    const date = new Date(2025, 0, 15);
    expect(isEqual(date, date)).toBe(true);
    expect(isBefore(date, date)).toBe(false);
  });
});
```

---

### 4. Invalid Inputs Tests

Test graceful handling of invalid inputs.

```typescript
describe('invalid inputs', () => {
  it('should handle Invalid Date', () => {
    const invalidDate = new Date('invalid');
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
});
```

---

## Test Patterns by Function Category

### Comparison Functions

```typescript
describe('isBefore', () => {
  it('should return true when a is before b', () => {
    const a = new Date(2025, 0, 1);
    const b = new Date(2025, 0, 2);
    expect(isBefore(a, b)).toBe(true);
  });

  it('should return false when a is after b', () => {
    const a = new Date(2025, 0, 2);
    const b = new Date(2025, 0, 1);
    expect(isBefore(a, b)).toBe(false);
  });

  it('should return false when a equals b', () => {
    const date = new Date(2025, 0, 1);
    expect(isBefore(date, date)).toBe(false);
  });

  it('should support unit-based comparison', () => {
    const morning = new Date(2025, 0, 1, 9, 0);
    const evening = new Date(2025, 0, 1, 17, 0);

    expect(isBefore(morning, evening)).toBe(true);
    expect(isBefore(morning, evening, { unit: 'day' })).toBe(false);
  });
});
```

---

### Transformation Functions

```typescript
describe('addDays', () => {
  it('should add positive days', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 5);
    expect(getDay(result)).toBe(6);
  });

  it('should subtract with negative days', () => {
    const date = new Date(2025, 0, 10);
    const result = addDays(date, -5);
    expect(getDay(result)).toBe(5);
  });

  it('should handle month boundaries', () => {
    const date = new Date(2025, 0, 30);
    const result = addDays(date, 2);
    expect(getMonth(result)).toBe(1); // February
    expect(getDay(result)).toBe(1);
  });

  it('should not mutate original date', () => {
    const date = new Date(2025, 0, 1);
    const original = date.getTime();
    addDays(date, 5);
    expect(date.getTime()).toBe(original);
  });

  it('should handle fractional amounts', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 2.7);
    // Should floor to 2 days
    expect(getDay(result)).toBe(3);
  });
});
```

---

### Accessor Functions

```typescript
describe('getYear', () => {
  it('should return year from Date object', () => {
    const date = new Date(2025, 0, 1);
    expect(getYear(date)).toBe(2025);
  });

  it('should return year from timestamp', () => {
    const timestamp = new Date(2025, 0, 1).getTime();
    expect(getYear(timestamp)).toBe(2025);
  });

  it('should handle dates before 1970', () => {
    const date = new Date(1950, 0, 1);
    expect(getYear(date)).toBe(1950);
  });

  it('should return NaN for invalid input', () => {
    expect(getYear(NaN)).toBe(NaN);
    expect(getYear(new Date('invalid'))).toBe(NaN);
  });
});
```

---

### Validation Functions

```typescript
describe('isValid', () => {
  it('should return true for valid Date', () => {
    expect(isValid(new Date(2025, 0, 1))).toBe(true);
  });

  it('should return true for valid timestamp', () => {
    expect(isValid(1704067200000)).toBe(true);
    expect(isValid(0)).toBe(true);
    expect(isValid(-86400000)).toBe(true);
  });

  it('should return false for Invalid Date', () => {
    expect(isValid(new Date('invalid'))).toBe(false);
  });

  it('should return false for non-finite numbers', () => {
    expect(isValid(NaN)).toBe(false);
    expect(isValid(Infinity)).toBe(false);
    expect(isValid(-Infinity)).toBe(false);
  });
});
```

---

## Coverage Requirements

### Minimum Coverage Targets

- **Line Coverage**: 100%
- **Branch Coverage**: 100%
- **Function Coverage**: 100%
- **Statement Coverage**: 100%

### Coverage Exceptions

Only exception handling code for truly exceptional cases may have <100% coverage, and must be documented:

```typescript
// This error should never occur in practice due to TypeScript checks
// Coverage exception: extraordinary error case
if (typeof unit !== 'string') {
  throw new Error('Unit must be a string');
}
```

---

## Property-Based Testing (Phase 2)

### When to Use PBT

Use Property-Based Testing when:

- A specification exists in `.kiro/spec/<spec-name>/`
- The specification defines properties or invariants
- You need to verify the implementation against the specification

### PBT File Structure

```typescript
// .kiro/spec/<spec-name>/<function-name>.pbt.test.ts
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { functionName } from '../../../src/functionName';

describe('functionName - Property-Based Tests', () => {
  describe('specification compliance', () => {
    it('should satisfy property from spec: [property description]', () => {
      fc.assert(
        fc.property(
          fc.date(), // or appropriate arbitrary
          (input) => {
            const result = functionName(input);
            // Verify property holds
            expect(result).toSatisfy(someProperty);
          }
        )
      );
    });
  });
});
```

### Common PBT Patterns

#### 1. Invariant Properties

Properties that must hold for all valid inputs:

```typescript
describe('invariants', () => {
  it('output should always be a valid date', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer(),
        (date, days) => {
          const result = addDays(date, days);
          expect(isValid(result)).toBe(true);
        }
      )
    );
  });
});
```

#### 2. Round-trip Properties

Operations that should be reversible:

```typescript
describe('round-trip properties', () => {
  it('adding then subtracting should return to original', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -10000, max: 10000 }),
        (date, days) => {
          const added = addDays(date, days);
          const result = subDays(added, days);
          expect(result.getTime()).toBe(date.getTime());
        }
      )
    );
  });
});
```

#### 3. Comparison Properties

Properties involving comparisons:

```typescript
describe('comparison properties', () => {
  it('should be transitive: if a < b and b < c, then a < c', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.date(),
        fc.date(),
        (a, b, c) => {
          fc.pre(isBefore(a, b) && isBefore(b, c));
          expect(isBefore(a, c)).toBe(true);
        }
      )
    );
  });
});
```

#### 4. Idempotence Properties

Operations that can be repeated without changing the result:

```typescript
describe('idempotence', () => {
  it('startOfDay should be idempotent', () => {
    fc.assert(
      fc.property(
        fc.date(),
        (date) => {
          const once = startOfDay(date);
          const twice = startOfDay(once);
          expect(once.getTime()).toBe(twice.getTime());
        }
      )
    );
  });
});
```

### PBT Best Practices

1. **Use Preconditions**: Filter out invalid test cases with `fc.pre()`
2. **Choose Appropriate Arbitraries**: Use domain-specific generators
3. **Keep Properties Simple**: Each test should verify one property
4. **Document Properties**: Clearly state what property is being verified
5. **Use Sufficient Iterations**: Default is usually fine, increase for critical code

### PBT File Location

**CRITICAL**: When a specification exists, place PBT files in:

```text
.kiro/spec/<spec-name>/<function-name>.pbt.test.ts
```

**Example**:

```text
.kiro/spec/date-validation/isValid.pbt.test.ts
.kiro/spec/date-validation/isBefore.pbt.test.ts
```

This keeps property-based tests organized with their corresponding specifications.

---

## Best Practices

### 1. Descriptive Test Names

Use clear, descriptive test names that explain the scenario and expected outcome:

```typescript
// Good
it('should return false when first date is after second date', () => {});

// Bad
it('should work', () => {});
```

---

### 2. Arrange-Act-Assert Pattern

Structure tests clearly:

```typescript
it('should add days correctly', () => {
  // Arrange
  const date = new Date(2025, 0, 1);
  const daysToAdd = 5;

  // Act
  const result = addDays(date, daysToAdd);

  // Assert
  expect(getDay(result)).toBe(6);
});
```

---

### 3. Test Isolation

Each test should be independent and not rely on other tests:

```typescript
// Good - each test creates its own data
it('test 1', () => {
  const date = new Date(2025, 0, 1);
  // ...
});

it('test 2', () => {
  const date = new Date(2025, 0, 1);
  // ...
});

// Bad - sharing state between tests
let sharedDate: Date;

beforeAll(() => {
  sharedDate = new Date(2025, 0, 1);
});

it('test 1', () => {
  // Modifies shared state
  sharedDate.setDate(5);
});

it('test 2', () => {
  // Depends on test 1
  expect(sharedDate.getDate()).toBe(5);
});
```

---

### 4. Avoid Magic Numbers

Use named constants for test data:

```typescript
// Good
const EPOCH_TIMESTAMP = 0;
const ONE_DAY_MS = 86400000;
const LEAP_YEAR = 2024;

it('should handle epoch date', () => {
  expect(isValid(EPOCH_TIMESTAMP)).toBe(true);
});

// Bad
it('should handle epoch date', () => {
  expect(isValid(0)).toBe(true);
});
```

---

## Testing Workflow

### Complete Testing Process

```text
1. Write TDD tests in tests/ directory
2. Implement function to pass TDD tests
3. Run tests: pnpm test
4. Verify coverage: pnpm test:coverage
5. If spec exists:
   a. Write PBT tests in .kiro/spec/<spec-name>/
   b. Run PBT: pnpm test:pbt
   c. Verify all properties pass
6. Proceed to next phase (code review)
```

### TDD Test Commands

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test <function-name>

# Check coverage
pnpm test:coverage
```

### PBT Test Commands

```bash
# Run all property-based tests
pnpm test:pbt

# Run specific PBT file
pnpm test:pbt <spec-name>/<function-name>
```

---

## See Also

- [Function Design Guidelines](./function-design.md) - Guidelines for designing functions
- [Function Implementation Guidelines](./function-implementation.md) - Guidelines for implementing functions
- [Function Check Guidelines](./function-check.md) - Guidelines for quality checks
