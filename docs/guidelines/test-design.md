# Test Case Design Guidelines

## Purpose

This document provides comprehensive guidelines for test case design in the Chronia library. It systematizes test design techniques such as equivalence partitioning, boundary value analysis, and category value testing, enabling all developers to create consistent, high-quality tests.

**Target Audience**: Developers and contributors to the Chronia project who create new functions or modify existing functions

**Related Guidelines**:

- [Test-Driven Development (TDD) Guidelines](./test-driven-development.md) - TDD cycle (Red-Green-Refactor) and basic test structure
- [Function Testing Guidelines](./function-testing.md) - Overview of test phases (TDD/PBT)
- [Property-Based Testing Guidelines](./property-based-testing.md) - Property-based testing with fast-check

## 1. Equivalence Partitioning and Representative Value Testing

### 1.1 Overview of Equivalence Partitioning

**Equivalence Partitioning** is a test design technique that divides the input domain into equivalence classes that exhibit the same behavior. By selecting representative values from each equivalence class for testing, we achieve efficient and comprehensive test coverage.

**Basic Principles**:

- Divide input space into **valid equivalence classes** and **invalid equivalence classes**
- Select **at least one representative value** from each equivalence class for testing
- Values within the same class exhibit the same behavior, so testing multiple values is unnecessary

**Benefits**:

- Ensure comprehensiveness while minimizing the number of test cases
- Clarify test intent (which equivalence class is being tested)
- Reduce duplicate tests and lower maintenance costs

### 1.2 Methods for Defining Equivalence Classes

#### Equivalence Partitioning for Numeric Parameters

Numeric parameters should be divided into equivalence classes from the following perspectives:

**Basic Partitioning**:

- **Positive numbers** (value > 0) - Representative values: `5`, `10`, `100`, etc.
- **Zero** (value === 0) - Representative value: `0`
- **Negative numbers** (value < 0) - Representative values: `-5`, `-10`, `-100`, etc.

**Additional Partitioning**:

- **Integers** (no fractional part) - Representative values: `1`, `5`, `10`
- **Decimals** (with fractional part) - Representative values: `1.5`, `2.7`, `3.14`
- **Special values** - `NaN`, `Infinity`, `-Infinity`

**Example: `days` parameter in `addDays(date, days)`**:

```typescript
/**
 * Equivalence classes:
 * - Class 1: Negative days (days < 0) → Returns past date
 * - Class 2: Zero days (days === 0) → Returns same date
 * - Class 3: Positive days (days > 0) → Returns future date
 * - Class 4: Fractional days (days % 1 !== 0) → Floors down with floor(days)
 *
 * Representative value selection:
 * - Class 1: -5 (typical negative value)
 * - Class 2: 0 (boundary value)
 * - Class 3: 5 (typical positive value)
 * - Class 4: 2.7 (positive number with decimal)
 */

describe('addDays - equivalence partitioning for days parameter', () => {
  it('should subtract days when days is negative (Class 1: days < 0)', () => {
    const date = new Date(2025, 0, 10); // Jan 10
    const result = addDays(date, -5); // Representative value: -5
    expect(result.getDate()).toBe(5); // Jan 5
  });

  it('should return same date when days is zero (Class 2: days === 0)', () => {
    const date = new Date(2025, 0, 15);
    const result = addDays(date, 0); // Representative value: 0
    expect(result.getTime()).toBe(date.getTime());
  });

  it('should add days when days is positive (Class 3: days > 0)', () => {
    const date = new Date(2025, 0, 1); // Jan 1
    const result = addDays(date, 5); // Representative value: 5
    expect(result.getDate()).toBe(6); // Jan 6
  });

  it('should floor fractional days (Class 4: days % 1 !== 0)', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, 2.7); // Representative value: 2.7
    expect(result.getDate()).toBe(3); // 1 + floor(2.7) = 1 + 2
  });
});
```

#### Equivalence Partitioning for Date Type Parameters

Date type parameters should be divided from the following perspectives:

**Basic Partitioning**:

- **Valid dates** (isValid(date) === true)
  - **Typical date** - Representative value: `new Date(2025, 0, 15)` (mid-month)
  - **First day of month** - Representative value: `new Date(2025, 0, 1)`
  - **Last day of month** - Representative value: `new Date(2025, 0, 31)`
  - **First day of year** - Representative value: `new Date(2025, 0, 1)`
  - **Last day of year** - Representative value: `new Date(2025, 11, 31)`
- **Invalid dates** (isValid(date) === false)
  - **Invalid Date** - Representative value: `new Date('invalid')`
  - **NaN** - Representative value: `NaN`
  - **Infinity** - Representative values: `Infinity`, `-Infinity`

**Example: `date` parameter in `getMonth(date)`**:

```typescript
/**
 * Equivalence classes:
 * - Valid Class 1: Valid date (typical month) → Returns month number 1-12
 * - Valid Class 2: Valid date (boundary: first day of month) → Returns correct month number
 * - Valid Class 3: Valid date (boundary: last day of month) → Returns correct month number
 * - Invalid Class: Invalid date → Returns NaN
 *
 * Representative value selection:
 * - Valid Class 1: 2025-01-15 (mid-month)
 * - Valid Class 2: 2025-01-01 (first day of month)
 * - Valid Class 3: 2025-01-31 (last day of month)
 * - Invalid Class: new Date('invalid')
 */

describe('getMonth - equivalence partitioning for date parameter', () => {
  it('should return month for typical date (Valid Class 1)', () => {
    const date = new Date(2025, 0, 15); // Representative value: mid-month
    expect(getMonth(date)).toBe(1); // 1-indexed: January
  });

  it('should return month for first day of month (Valid Class 2)', () => {
    const date = new Date(2025, 0, 1); // Representative value: first day of month
    expect(getMonth(date)).toBe(1);
  });

  it('should return month for last day of month (Valid Class 3)', () => {
    const date = new Date(2025, 0, 31); // Representative value: last day of month
    expect(getMonth(date)).toBe(1);
  });

  it('should return NaN for invalid date (Invalid Class)', () => {
    const invalidDate = new Date('invalid'); // Representative value: Invalid Date
    expect(getMonth(invalidDate)).toBe(NaN);
  });
});
```

#### Comprehensive Type Variation Coverage for Arguments

**Important Principle**: When a function signature accepts multiple types (e.g., union types), **all type variations must be tested**.

**Basic Policy**:

- **Define equivalence classes for each type** - Select representative values for valid and invalid values for each type
- **Cover all type combinations** - Perform tests with all acceptable types
- **Consider future expansion** - Apply the same principle when new types are added

**Test Strategy**:

1. Check the function signature and list all accepted types
2. Define equivalence classes for valid and invalid values for each type
3. Create test cases with representative values for each type
4. Verify that all type variations are covered

**Example: Testing functions that accept multiple types**:

```typescript
/**
 * Function signature: function processDate(input: Type1 | Type2 | ...): Result
 *
 * Equivalence classes by type:
 * - Type1 Class (valid): Returns normal processing result
 * - Type1 Class (invalid): Returns error handling or default value
 * - Type2 Class (valid): Returns normal processing result
 * - Type2 Class (invalid): Returns error handling or default value
 * - ... (similarly for all acceptable types)
 */

describe('processDate - type variation coverage', () => {
  // Valid Type1 value
  it('should process valid Type1 input', () => {
    const input = /* Valid representative value for Type1 */;
    const result = processDate(input);
    expect(result).toBe(/* Expected result */);
  });

  // Invalid Type1 value
  it('should handle invalid Type1 input', () => {
    const input = /* Invalid representative value for Type1 */;
    const result = processDate(input);
    expect(result).toBe(/* Expected error handling value */);
  });

  // Valid Type2 value
  it('should process valid Type2 input', () => {
    const input = /* Valid representative value for Type2 */;
    const result = processDate(input);
    expect(result).toBe(/* Expected result */);
  });

  // Invalid Type2 value
  it('should handle invalid Type2 input', () => {
    const input = /* Invalid representative value for Type2 */;
    const result = processDate(input);
    expect(result).toBe(/* Expected error handling value */);
  });

  // ... Add similar tests for all types
});
```

**Notes**:

- When new types are added, apply the same test pattern to the new types
- Define valid/invalid boundaries for each type according to the type's characteristics
- Covering all type variations ensures type safety and robustness

#### Equivalence Partitioning for String Pattern Parameters

String pattern parameters (used in `format` and `parse` functions) should be divided into equivalence classes based on the pattern syntax rules.

**Target Functions**: `format`, `parse`

**Equivalence Classes for Pattern Strings**:

- **Class 1: Token-only patterns** - Patterns containing only recognized format tokens
  - Representative values: `"yyyy-MM-dd"`, `"HH:mm:ss"`, `"yyyy-MM-dd HH:mm:ss.SSS"`
  - Behavior: All tokens are replaced with formatted date/time components
- **Class 2: Literal text patterns** - Patterns with text enclosed in single quotes
  - Representative values: `"'Year' yyyy"`, `"'Month' MM"`, `"'at' HH:mm"`
  - Behavior: Quoted text is output as-is (quotes are removed)
- **Class 3: Escaped quote patterns** - Patterns with two consecutive single quotes (`''`)
  - Representative values: `"yyyy''MM"`, `"HH''mm''ss"`, `"''yyyy''"`
  - Behavior: Two consecutive quotes are replaced with a single quote character
- **Class 4: Mixed patterns** - Combination of tokens, literals, and escaped quotes
  - Representative values: `"'It''s' yyyy"`, `"'Today''s date:' yyyy-MM-dd"`, `"EEEE, MMMM dd, yyyy 'at' h:mm a"`
  - Behavior: All syntax rules applied in combination
- **Class 5: Unrecognized characters** - Patterns with characters outside quotes
  - Representative values: `"yyyy-MM-dd"` (hyphens), `"yyyy/MM/dd"` (slashes), `"yyyy.MM.dd"` (periods)
  - Behavior: Unrecognized characters are passed through as-is

**Pattern Syntax Rules** (from format function specification):

- **Literal text** must be enclosed in single quotes (e.g., `'at'`, `'Year'`)
- **Two single quotes** (`''`) represent a literal single quote character in the output
- **Tokens are case-sensitive** (e.g., `MM` for month vs `mm` for minutes)
- **Unrecognized characters** outside of quotes are passed through as-is

**Example: Equivalence Partitioning for `format` Function**:

```typescript
/**
 * Equivalence partitioning for format pattern strings:
 * - Class 1: Token-only patterns (no quotes)
 * - Class 2: Literal text patterns (single-quoted text)
 * - Class 3: Escaped quote patterns (two consecutive quotes)
 * - Class 4: Mixed patterns (combination of above)
 * - Class 5: Unrecognized characters (punctuation, separators)
 *
 * Representative value selection:
 * - Class 1: "yyyy-MM-dd HH:mm:ss" (common date-time format)
 * - Class 2: "'Year' yyyy" (simple literal)
 * - Class 3: "yyyy''MM''dd" (quotes between tokens)
 * - Class 4: "'It''s' yyyy" (literal + escaped quote + token)
 * - Class 5: "yyyy-MM-dd" (hyphens as separators)
 */

describe('format - pattern string equivalence partitioning', () => {
  const date = new Date(2024, 0, 15, 14, 30, 45, 123);

  it('should handle token-only pattern (Class 1)', () => {
    const result = format(date, 'yyyy-MM-dd HH:mm:ss');
    expect(result).toBe('2024-01-15 14:30:45');
  });

  it('should handle literal text pattern (Class 2)', () => {
    const result = format(date, "'Year' yyyy");
    expect(result).toBe('Year 2024');
  });

  it('should handle escaped quote pattern (Class 3)', () => {
    const result = format(date, "yyyy''MM''dd");
    expect(result).toBe("2024'01'15");
  });

  it('should handle mixed pattern with literal and escaped quotes (Class 4)', () => {
    const result = format(date, "'It''s' yyyy");
    expect(result).toBe("It's 2024");
  });

  it('should pass through unrecognized characters (Class 5)', () => {
    const result = format(date, 'yyyy-MM-dd');
    expect(result).toBe('2024-01-15'); // Hyphens passed through
  });
});
```

**Advanced Pattern Examples**:

```typescript
describe('format - complex pattern combinations', () => {
  const date = new Date(2024, 0, 15, 14, 30, 45);

  it('should handle multiple literals in one pattern', () => {
    expect(format(date, "'Year' yyyy', Month' MM")).toBe('Year 2024, Month 01');
  });

  it('should handle escaped quotes within literal text', () => {
    expect(format(date, "'Today''s date:' yyyy-MM-dd")).toBe(
      "Today's date: 2024-01-15"
    );
  });

  it('should handle complex real-world format', () => {
    expect(format(date, "EEEE, MMMM dd, yyyy 'at' h:mm a")).toBe(
      'Monday, January 15, 2024 at 2:30 PM'
    );
  });

  it('should handle consecutive escaped quotes', () => {
    expect(format(date, "yyyy''''MM")).toBe("2024''01");
  });
});
```

**Notes**:

- Quote escaping is a **normal feature**, not an edge case - it should be tested comprehensively
- Empty patterns (`""`) should be tested as an edge case (returns empty string or Invalid Date string)
- Pattern validation tests should cover both valid and invalid syntax
- For `parse` function, apply the same equivalence partitioning to pattern strings

### 1.3 Representative Value Selection Criteria

Criteria for selecting representative values from each equivalence class:

#### Criterion 1: Choose Typical Values

- Values near the center of the equivalence class are preferable
- Example: Positive number class → `5` (avoid extremely large or small values)

#### Criterion 2: Choose Meaningful Values

- Values that make the test intent easy to understand
- Example: Test for adding days → `5 days` (clear and easy to calculate)

#### Criterion 3: Consistency with Existing Tests

- Use the same representative values for related functions
- Example: Use the same test dataset for `addDays` and `subDays`

#### Criterion 4: Values That Are Easy to Calculate

- Choose values that are easy to verify manually
- Example: Adding `5 days` to `2025-01-01` → `2025-01-06` (clear)

#### Discouraged: Random or Complex Values

```typescript
// ❌ Bad: Complex and unclear intent
it('should add days', () => {
  const date = new Date(2025, 7, 23, 14, 37, 42, 123);
  const result = addDays(date, 17);
  expect(result.getDate()).toBe(9); // Why 9? Calculation required
});

// ✅ Good: Simple and clear intent
it('should add days (Partition: days > 0)', () => {
  const date = new Date(2025, 0, 1); // Beginning of year
  const result = addDays(date, 5); // Representative value: 5
  expect(result.getDate()).toBe(6); // Clear: 1 + 5 = 6
});
```

### 1.4 Documentation Patterns for Equivalence Partitioning

Documenting the rationale for equivalence partitioning in test files clarifies test intent and provides decision criteria for future modifications.

#### Pattern 1: Specify Equivalence Classes in JSDoc Comments

```typescript
/**
 * Equivalence classes:
 * - Class 1: Negative days (days < 0) → Move date to the past
 * - Class 2: Zero days (days === 0) → Do not change date
 * - Class 3: Positive days (days > 0) → Move date to the future
 * - Class 4: Fractional days (days % 1 !== 0) → Floor to integer
 *
 * Representative values:
 * - Class 1: -5 (typical negative value)
 * - Class 2: 0 (boundary value)
 * - Class 3: 5 (typical positive value)
 * - Class 4: 2.7 (fractional value)
 */
describe('addDays - days parameter partitioning', () => {
  // Test cases...
});
```

#### Pattern 2: Include Equivalence Classes in Test Case Names

```typescript
describe('addDays', () => {
  describe('equivalence partitioning: days parameter', () => {
    it('should subtract days (Partition: days < 0, Representative: -5)', () => {
      const date = new Date(2025, 0, 10);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(5);
    });

    it('should return same date (Partition: days === 0, Representative: 0)', () => {
      const date = new Date(2025, 0, 15);
      const result = addDays(date, 0);
      expect(result.getTime()).toBe(date.getTime());
    });

    it('should add days (Partition: days > 0, Representative: 5)', () => {
      const date = new Date(2025, 0, 1);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });
  });
});
```

#### Pattern 3: Array-Based Equivalence Classes with `it.each`

```typescript
describe('addDays', () => {
  describe('equivalence partitioning: days parameter', () => {
    /**
     * Test case array:
     * Each element represents a representative value of one equivalence class
     */
    it.each([
      {
        partition: 'days < 0',
        representative: -5,
        inputDate: new Date(2025, 0, 10),
        expectedDate: 5,
        desc: 'should subtract days when days is negative',
      },
      {
        partition: 'days === 0',
        representative: 0,
        inputDate: new Date(2025, 0, 15),
        expectedDate: 15,
        desc: 'should return same date when days is zero',
      },
      {
        partition: 'days > 0',
        representative: 5,
        inputDate: new Date(2025, 0, 1),
        expectedDate: 6,
        desc: 'should add days when days is positive',
      },
      {
        partition: 'days % 1 !== 0',
        representative: 2.7,
        inputDate: new Date(2025, 0, 1),
        expectedDate: 3,
        desc: 'should floor fractional days',
      },
    ])('$desc (Partition: $partition, Representative: $representative)',
      ({ representative, inputDate, expectedDate }) => {
        const result = addDays(inputDate, representative);
        expect(result.getDate()).toBe(expectedDate);
      }
    );
  });
});
```

#### Documentation Best Practices

- ✅ Clearly state the rationale for equivalence class definitions (why this partitioning?)
- ✅ Explain the selection criteria for representative values (why this value?)
- ✅ Make the correspondence between equivalence classes and expected behavior clear
- ✅ Use language that future developers can easily understand
- ❌ Avoid overly verbose comments (when the code is self-evident)

### 1.5 Equivalence Partitioning Checklist

When creating tests for a new function, use the following checklist to verify that equivalence partitioning is properly applied:

#### Input Analysis

- [ ] Have all input parameters been identified?
- [ ] Do you understand the type and valid range of each parameter?
- [ ] Have dependencies between parameters been considered?

#### Equivalence Class Definition

- [ ] Have valid input classes been defined?
- [ ] Have invalid input classes been defined?
- [ ] Has partitioning by type (Date vs number) been considered?
- [ ] Has partitioning by range (positive/zero/negative) been considered?
- [ ] Have special values (NaN, Infinity, Invalid Date) been considered?

#### Representative Value Selection

- [ ] Has at least one representative value been selected from each equivalence class?
- [ ] Are the representative values typical and meaningful?
- [ ] Are the representative values easy to calculate and verify?
- [ ] Is consistency with existing tests maintained?

#### Documentation

- [ ] Have the equivalence class definitions been clearly stated in comments?
- [ ] Has the rationale for representative value selection been explained?
- [ ] Do test case names clearly indicate the equivalence classes?

#### Coverage Verification

- [ ] Are there test cases for all equivalence classes?
- [ ] Are multiple values from the same class being tested (redundancy check)?
- [ ] Are edge cases separately covered by boundary value analysis?

## 2. Boundary Value Analysis

### 2.1 Overview of Boundary Value Analysis

**Boundary Value Analysis** is a test design technique that focuses on the boundaries between equivalence classes. Based on the empirical observation that bugs are more likely to occur near boundary values, this technique emphasizes testing boundary values and their neighboring values.

**Core Principles**:

- **Identify boundary values**: Find values that represent boundaries between equivalence classes
- **Test boundary ± 1**: Test the boundary value itself, boundary - 1, and boundary + 1
- **Test minimum and maximum values**: Always test the minimum and maximum values of the valid range

**Benefits**:

- Focused testing on areas where bugs are most likely to occur
- Detection of off-by-one errors
- Discovery of logic errors in range checking

**Relationship with Equivalence Partitioning**:

- Equivalence partitioning: Test one representative value within a class
- Boundary value analysis: Test three values at class boundaries (boundary, boundary - 1, boundary + 1)

### 2.2 Boundary Value Testing for Numeric Parameters

#### Methods for Identifying Boundary Values

Boundary values for numeric parameters are identified from the following perspectives:

**Basic Boundaries**:

- **Zero boundary**: Test `-1`, `0`, `1` with `0` as the boundary
- **Range boundaries**: Minimum and maximum values of the valid range and their neighbors
- **Sign boundary**: Boundary between positive and negative numbers (zero)

**Example: Month number (1-12) boundary values**:

```typescript
/**
 * Boundary values:
 * - Lower boundary: 1 (minimum value of valid range)
 *   - Boundary - 1: 0 (invalid: out of range)
 *   - Boundary: 1 (valid: January)
 *   - Boundary + 1: 2 (valid: February)
 * - Upper boundary: 12 (maximum value of valid range)
 *   - Boundary - 1: 11 (valid: November)
 *   - Boundary: 12 (valid: December)
 *   - Boundary + 1: 13 (invalid: out of range)
 */

describe('setMonth - boundary value analysis', () => {
  describe('lower boundary (month = 1)', () => {
    it('should reject month 0 (boundary - 1)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 0);
      expect(isValid(result)).toBe(false);
    });

    it('should accept month 1 (boundary)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 1);
      expect(getMonth(result)).toBe(1); // January
    });

    it('should accept month 2 (boundary + 1)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 2);
      expect(getMonth(result)).toBe(2); // February
    });
  });

  describe('upper boundary (month = 12)', () => {
    it('should accept month 11 (boundary - 1)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 11);
      expect(getMonth(result)).toBe(11); // November
    });

    it('should accept month 12 (boundary)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 12);
      expect(getMonth(result)).toBe(12); // December
    });

    it('should reject month 13 (boundary + 1)', () => {
      const date = new Date(2025, 0, 15);
      const result = setMonth(date, 13);
      expect(isValid(result)).toBe(false);
    });
  });
});
```

#### Testing Strategy for Minimum and Maximum Values

**Timestamp boundary values**:

```typescript
/**
 * JavaScript safe date range:
 * - Minimum: -8640000000000000 (approximately 271821 BC)
 * - Maximum: 8640000000000000 (approximately 275760 AD)
 *
 * Boundary value tests:
 * - Minimum - 1: Out of range (invalid)
 * - Minimum: Boundary (valid)
 * - Minimum + 1: Within range (valid)
 * - Maximum - 1: Within range (valid)
 * - Maximum: Boundary (valid)
 * - Maximum + 1: Out of range (invalid)
 */

describe('isValid - timestamp boundary value analysis', () => {
  const MIN_TIMESTAMP = -8640000000000000;
  const MAX_TIMESTAMP = 8640000000000000;

  describe('minimum timestamp boundary', () => {
    it('should reject timestamp below minimum (boundary - 1)', () => {
      expect(isValid(MIN_TIMESTAMP - 1)).toBe(false);
    });

    it('should accept minimum timestamp (boundary)', () => {
      expect(isValid(MIN_TIMESTAMP)).toBe(true);
    });

    it('should accept timestamp above minimum (boundary + 1)', () => {
      expect(isValid(MIN_TIMESTAMP + 1)).toBe(true);
    });
  });

  describe('maximum timestamp boundary', () => {
    it('should accept timestamp below maximum (boundary - 1)', () => {
      expect(isValid(MAX_TIMESTAMP - 1)).toBe(true);
    });

    it('should accept maximum timestamp (boundary)', () => {
      expect(isValid(MAX_TIMESTAMP)).toBe(true);
    });

    it('should reject timestamp above maximum (boundary + 1)', () => {
      expect(isValid(MAX_TIMESTAMP + 1)).toBe(false);
    });
  });
});
```

### 2.3 Date Boundary Testing

#### Month-End Boundary Value Testing

Since month-end days vary by month, test all variations:

**Month-End Variations**:

- **28 days**: February in non-leap years
- **29 days**: February in leap years
- **30 days**: April, June, September, November
- **31 days**: January, March, May, July, August, October, December

```typescript
/**
 * Month-end boundary value tests:
 * - Test the last day of each month and its neighbors
 * - Verify month boundary transitions (January 31 → February 1)
 */

describe('addDays - month end boundary analysis', () => {
  describe('31-day months', () => {
    it('should handle day 30 of January (boundary - 1)', () => {
      const jan30 = new Date(2025, 0, 30);
      const result = addDays(jan30, 1);
      expect(result.getMonth()).toBe(0); // Still January
      expect(result.getDate()).toBe(31);
    });

    it('should handle day 31 of January (boundary)', () => {
      const jan31 = new Date(2025, 0, 31);
      const result = addDays(jan31, 1);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(1);
    });

    it('should handle Feb 1 (boundary + 1 from Jan)', () => {
      const feb1 = new Date(2025, 1, 1);
      const result = addDays(feb1, -1);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(31);
    });
  });

  describe('30-day months', () => {
    it('should handle day 29 of April (boundary - 1)', () => {
      const apr29 = new Date(2025, 3, 29);
      const result = addDays(apr29, 1);
      expect(result.getMonth()).toBe(3); // Still April
      expect(result.getDate()).toBe(30);
    });

    it('should handle day 30 of April (boundary)', () => {
      const apr30 = new Date(2025, 3, 30);
      const result = addDays(apr30, 1);
      expect(result.getMonth()).toBe(4); // May
      expect(result.getDate()).toBe(1);
    });
  });

  describe('February in non-leap year', () => {
    it('should handle day 27 of February (boundary - 1)', () => {
      const feb27 = new Date(2025, 1, 27);
      const result = addDays(feb27, 1);
      expect(result.getMonth()).toBe(1); // Still February
      expect(result.getDate()).toBe(28);
    });

    it('should handle day 28 of February in non-leap year (boundary)', () => {
      const feb28 = new Date(2025, 1, 28);
      const result = addDays(feb28, 1);
      expect(result.getMonth()).toBe(2); // March
      expect(result.getDate()).toBe(1);
    });
  });

  describe('February in leap year', () => {
    it('should handle day 28 of February in leap year (boundary - 1)', () => {
      const feb28 = new Date(2024, 1, 28);
      const result = addDays(feb28, 1);
      expect(result.getMonth()).toBe(1); // Still February
      expect(result.getDate()).toBe(29);
    });

    it('should handle day 29 of February in leap year (boundary)', () => {
      const feb29 = new Date(2024, 1, 29);
      const result = addDays(feb29, 1);
      expect(result.getMonth()).toBe(2); // March
      expect(result.getDate()).toBe(1);
    });
  });
});
```

#### Year Boundary Testing

```typescript
/**
 * Year boundary value tests:
 * - Transition from December 31 to January 1
 * - Verification of calculations across year boundaries
 */

describe('addDays - year boundary analysis', () => {
  it('should handle Dec 30 (boundary - 1)', () => {
    const dec30 = new Date(2025, 11, 30);
    const result = addDays(dec30, 1);
    expect(result.getFullYear()).toBe(2025); // Same year
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
  });

  it('should handle Dec 31 (boundary)', () => {
    const dec31 = new Date(2025, 11, 31);
    const result = addDays(dec31, 1);
    expect(result.getFullYear()).toBe(2026); // Next year
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it('should handle Jan 1 (boundary + 1 from previous year)', () => {
    const jan1 = new Date(2026, 0, 1);
    const result = addDays(jan1, -1);
    expect(result.getFullYear()).toBe(2025); // Previous year
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(31);
  });
});
```

#### Leap Year Boundary Value Testing

```typescript
/**
 * Leap year determination boundaries:
 * - Leap year: Divisible by 4 (except years divisible by 100 but not by 400)
 * - Boundary years: 2024 (leap), 2025 (non-leap), 2100 (non-leap), 2400 (leap)
 */

describe('isExists - leap year boundary analysis', () => {
  describe('Feb 29 existence', () => {
    it('should accept Feb 29 in leap year 2024', () => {
      expect(isExists(2024, 2, 29)).toBe(true);
    });

    it('should reject Feb 29 in non-leap year 2025', () => {
      expect(isExists(2025, 2, 29)).toBe(false);
    });

    it('should reject Feb 29 in century non-leap year 2100', () => {
      expect(isExists(2100, 2, 29)).toBe(false);
    });

    it('should accept Feb 29 in quad-century leap year 2400', () => {
      expect(isExists(2400, 2, 29)).toBe(true);
    });
  });

  describe('Feb 28 vs Feb 29 boundary', () => {
    it('should accept Feb 28 in all years', () => {
      expect(isExists(2024, 2, 28)).toBe(true);
      expect(isExists(2025, 2, 28)).toBe(true);
    });

    it('should accept Feb 29 only in leap years', () => {
      expect(isExists(2024, 2, 29)).toBe(true); // Leap year
      expect(isExists(2025, 2, 29)).toBe(false); // Non-leap year
    });

    it('should reject Feb 30 in all years', () => {
      expect(isExists(2024, 2, 30)).toBe(false);
      expect(isExists(2025, 2, 30)).toBe(false);
    });
  });
});
```

### 2.4 Timezone and DST Boundary Testing

While Chronia aims for timezone-independent behavior, verify correct operation at boundaries such as DST transitions:

```typescript
/**
 * Timezone boundary considerations:
 * - Chronia uses timestamp-based calculations (timezone-independent)
 * - Verify accurate millisecond-precision behavior even during DST transitions
 */

describe('date calculations - DST boundary', () => {
  it('should handle DST transition correctly (Spring forward)', () => {
    // March 9, 2025, 2:00 AM: US DST transition
    const beforeDST = new Date(2025, 2, 9, 1, 0, 0, 0);
    const afterDST = new Date(2025, 2, 9, 3, 0, 0, 0);

    // Timestamp-based comparison is accurate
    expect(isBefore(beforeDST, afterDST)).toBe(true);
    expect(isAfter(afterDST, beforeDST)).toBe(true);
  });

  it('should calculate time differences correctly across DST', () => {
    const before = new Date(2025, 2, 9, 0, 0, 0, 0);
    const after = new Date(2025, 2, 10, 0, 0, 0, 0);

    // 24-hour difference (including DST transition)
    const diffMs = after.getTime() - before.getTime();
    expect(diffMs).toBe(24 * 60 * 60 * 1000); // Accurate to millisecond precision
  });
});
```

### 2.5 Boundary Value Analysis Checklist

Checklist for applying boundary value analysis when testing new functions:

#### Numeric Parameters

- [ ] Have you tested the minimum value of the valid range?
- [ ] Have you tested the maximum value of the valid range?
- [ ] Have you tested minimum - 1 (invalid value)?
- [ ] Have you tested maximum + 1 (invalid value)?
- [ ] Have you tested the zero boundary (-1, 0, 1)?

#### Date Parameters

- [ ] Have you tested all month-end day variations (28/29/30/31)?
- [ ] Have you tested month boundary transitions (month-end → month-start)?
- [ ] Have you tested year boundary transitions (December 31 → January 1)?
- [ ] Have you tested February 29 in both leap and non-leap years?
- [ ] Have you tested minimum timestamp boundaries?
- [ ] Have you tested maximum timestamp boundaries?

#### Special Boundaries

- [ ] Have you tested DST transition boundaries (if applicable)?
- [ ] Have you tested the epoch date (1970-01-01 00:00:00 UTC)?
- [ ] Have you tested negative timestamps (before 1970)?

## 3. Comprehensive Category Value Testing

### 3.1 Overview of Category Value Testing

**Category Value Testing** is a technique for comprehensively testing all values in parameters that have a discrete set of values (categories). For cases with limited possible values like months or weekdays, test all category values to prevent bugs that occur only with specific values.

**Core Principles**:

- **Test all values**: Comprehensively test all elements of the category
- **Explicit checklist**: Enumerate all tested category values in comments
- **Leverage `it.each`**: Reduce redundancy with parameterized tests

**Examples of Category Values**:

- **Months**: 1-12 (January-December)
- **Weekdays**: 0-6 (Sunday-Saturday) or 1-7
- **Time units**: year, month, day, hour, minute, second, millisecond
- **Locales**: en-US, ja, (unspecified)

**Benefits**:

- Detection of bugs that occur only with specific category values
- Explicit guarantee of coverage
- Prevention of missing test cases

### 3.2 Comprehensive Month Testing

Months are a category with 12 discrete values (1-12). Testing for all months is necessary.

#### Why Test All Months

**Differences in Days per Month**:

- 31 days: January, March, May, July, August, October, December (7 months)
- 30 days: April, June, September, November (4 months)
- 28/29 days: February (1 month, varies in leap years)

**Examples of Month-Specific Bugs**:

- Leap year handling for February
- Boundaries between 31-day and 30-day months
- Index calculation errors (0-indexed vs 1-indexed)

#### Comprehensive Month Testing Pattern

```typescript
/**
 * Comprehensive month testing:
 * - Test cases for all months (1-12)
 * - Consider differences in days per month
 *
 * Category value checklist:
 * ✓ 1: January (31 days)
 * ✓ 2: February (28/29 days)
 * ✓ 3: March (31 days)
 * ✓ 4: April (30 days)
 * ✓ 5: May (31 days)
 * ✓ 6: June (30 days)
 * ✓ 7: July (31 days)
 * ✓ 8: August (31 days)
 * ✓ 9: September (30 days)
 * ✓ 10: October (31 days)
 * ✓ 11: November (30 days)
 * ✓ 12: December (31 days)
 */

describe('getMonth - comprehensive month testing', () => {
  it.each([
    { month: 0, expected: 1, name: 'January' },
    { month: 1, expected: 2, name: 'February' },
    { month: 2, expected: 3, name: 'March' },
    { month: 3, expected: 4, name: 'April' },
    { month: 4, expected: 5, name: 'May' },
    { month: 5, expected: 6, name: 'June' },
    { month: 6, expected: 7, name: 'July' },
    { month: 7, expected: 8, name: 'August' },
    { month: 8, expected: 9, name: 'September' },
    { month: 9, expected: 10, name: 'October' },
    { month: 10, expected: 11, name: 'November' },
    { month: 11, expected: 12, name: 'December' },
  ])('should return $expected for $name (month index $month)', ({ month, expected }) => {
    const date = new Date(2025, month, 15);
    expect(getMonth(date)).toBe(expected);
  });
});
```

#### Comprehensive Month-End Testing

```typescript
/**
 * Comprehensive month-end testing:
 * - Verify the last day of each month
 * - Cover all months with 31/30/28/29 days
 */

describe('endOfMonth - comprehensive month-end testing', () => {
  it.each([
    { month: 0, expectedDay: 31, name: 'January' },
    { month: 1, expectedDay: 28, name: 'February (non-leap)' },
    { month: 2, expectedDay: 31, name: 'March' },
    { month: 3, expectedDay: 30, name: 'April' },
    { month: 4, expectedDay: 31, name: 'May' },
    { month: 5, expectedDay: 30, name: 'June' },
    { month: 6, expectedDay: 31, name: 'July' },
    { month: 7, expectedDay: 31, name: 'August' },
    { month: 8, expectedDay: 30, name: 'September' },
    { month: 9, expectedDay: 31, name: 'October' },
    { month: 10, expectedDay: 30, name: 'November' },
    { month: 11, expectedDay: 31, name: 'December' },
  ])('should return day $expectedDay for $name', ({ month, expectedDay }) => {
    const date = new Date(2025, month, 15);
    const result = endOfMonth(date);
    expect(result.getDate()).toBe(expectedDay);
  });

  it('should return day 29 for February in leap year', () => {
    const date = new Date(2024, 1, 15); // Feb 15, 2024 (leap year)
    const result = endOfMonth(date);
    expect(result.getDate()).toBe(29);
  });
});
```

### 3.3 Comprehensive Weekday Testing

Weekdays are a category with 7 discrete values (0-6 or 1-7).

#### Why Test All Weekdays

**Examples of Weekday-Specific Bugs**:

- Handling of week start day (Sunday-start vs Monday-start)
- Index calculation errors (0-indexed vs 1-indexed)
- Locale-dependent weekday names

#### Comprehensive Weekday Testing Pattern

```typescript
/**
 * Comprehensive weekday testing:
 * - Test cases for all weekdays (0-6)
 * - JavaScript Date.getDay() returns 0=Sunday, 6=Saturday
 *
 * Category value checklist:
 * ✓ 0: Sunday
 * ✓ 1: Monday
 * ✓ 2: Tuesday
 * ✓ 3: Wednesday
 * ✓ 4: Thursday
 * ✓ 5: Friday
 * ✓ 6: Saturday
 */

describe('getDayOfWeek - comprehensive weekday testing', () => {
  it.each([
    { date: new Date(2025, 0, 5), expected: 0, name: 'Sunday' },
    { date: new Date(2025, 0, 6), expected: 1, name: 'Monday' },
    { date: new Date(2025, 0, 7), expected: 2, name: 'Tuesday' },
    { date: new Date(2025, 0, 8), expected: 3, name: 'Wednesday' },
    { date: new Date(2025, 0, 9), expected: 4, name: 'Thursday' },
    { date: new Date(2025, 0, 10), expected: 5, name: 'Friday' },
    { date: new Date(2025, 0, 11), expected: 6, name: 'Saturday' },
  ])('should return $expected for $name', ({ date, expected }) => {
    expect(getDayOfWeek(date)).toBe(expected);
  });
});
```

### 3.4 Comprehensive Time Unit Testing

Time units are a category with 7 discrete values (year, month, day, hour, minute, second, millisecond).

#### Why Test All Time Units

**Examples of Unit-Specific Bugs**:

- Truncation logic errors for specific units
- Calculation mistakes in unit conversions
- Unimplemented unit options

#### Comprehensive Time Unit Testing Pattern

```typescript
/**
 * Comprehensive time unit testing:
 * - Test cases for all time units
 * - Verify comparison and truncation behavior for each unit
 *
 * Category value checklist:
 * ✓ year
 * ✓ month
 * ✓ day
 * ✓ hour
 * ✓ minute
 * ✓ second
 * ✓ millisecond
 */

describe('isBefore - comprehensive time unit testing', () => {
  const date1 = new Date(2025, 0, 15, 10, 30, 45, 123);
  const date2 = new Date(2025, 0, 15, 14, 45, 50, 456);

  it.each([
    { unit: 'year' as TimeUnit, expected: false, desc: 'same year' },
    { unit: 'month' as TimeUnit, expected: false, desc: 'same month' },
    { unit: 'day' as TimeUnit, expected: false, desc: 'same day' },
    { unit: 'hour' as TimeUnit, expected: true, desc: 'different hour' },
    { unit: 'minute' as TimeUnit, expected: true, desc: 'different minute' },
    { unit: 'second' as TimeUnit, expected: true, desc: 'different second' },
    { unit: 'millisecond' as TimeUnit, expected: true, desc: 'different millisecond' },
  ])('should compare at $unit precision ($desc)', ({ unit, expected }) => {
    expect(isBefore(date1, date2, { unit })).toBe(expected);
  });
});
```

### 3.5 Comprehensive Locale Testing

Locales are a category with a discrete set of values (en-US, ja, unspecified, etc.).

#### Why Test All Supported Locales

**Examples of Locale-Specific Bugs**:

- Format errors in specific locales
- Fallback behavior when locale is unspecified
- Inconsistencies between locales

#### Comprehensive Locale Testing Pattern

```typescript
/**
 * Comprehensive locale testing:
 * - Test cases for all supported locales
 * - Also verify default behavior when locale is unspecified
 *
 * Category value checklist:
 * ✓ en-US (English - United States)
 * ✓ ja (Japanese)
 * ✓ undefined (default locale)
 */

describe('format - comprehensive locale testing', () => {
  const date = new Date(2025, 0, 15);

  it.each([
    {
      locale: 'en-US',
      pattern: 'MMMM',
      expected: 'January',
      desc: 'English locale',
    },
    {
      locale: 'ja',
      pattern: 'MMMM',
      expected: '1月',
      desc: 'Japanese locale',
    },
    {
      locale: undefined,
      pattern: 'MMMM',
      expected: 'January',
      desc: 'default locale (en-US)',
    },
  ])('should format month name in $desc', ({ locale, pattern, expected }) => {
    const result = format(date, pattern, { locale });
    expect(result).toBe(expected);
  });
});
```

### 3.6 Category Value Coverage Checklist

Checklist for verifying coverage of category value tests:

#### Month Category Values

- [ ] Have you tested January?
- [ ] Have you tested February?
- [ ] Have you tested March?
- [ ] Have you tested April?
- [ ] Have you tested May?
- [ ] Have you tested June?
- [ ] Have you tested July?
- [ ] Have you tested August?
- [ ] Have you tested September?
- [ ] Have you tested October?
- [ ] Have you tested November?
- [ ] Have you tested December?

#### Weekday Category Values

- [ ] Have you tested Sunday?
- [ ] Have you tested Monday?
- [ ] Have you tested Tuesday?
- [ ] Have you tested Wednesday?
- [ ] Have you tested Thursday?
- [ ] Have you tested Friday?
- [ ] Have you tested Saturday?

#### Time Unit Category Values

- [ ] Have you tested year unit?
- [ ] Have you tested month unit?
- [ ] Have you tested day unit?
- [ ] Have you tested hour unit?
- [ ] Have you tested minute unit?
- [ ] Have you tested second unit?
- [ ] Have you tested millisecond unit?

#### Locale Category Values

- [ ] Have you tested en-US locale?
- [ ] Have you tested ja locale?
- [ ] Have you tested unspecified locale (default behavior)?

#### Category Value Documentation

- [ ] Have you created a checklist of all category values in comments?
- [ ] Have you verified that the `it.each` array includes all category values?
- [ ] Have you documented the procedure for adding tests when new category values are added?

## 4. Testing Invalid Inputs and Special Cases

### 4.1 Overview of Invalid Inputs and Special Cases

**Invalid inputs and special cases** are test cases for abnormal data and extreme conditions. In TDD, we prioritize testing these cases to intensively cover areas where bugs are most likely to occur.

**Important**: Boundary values in the normal range (such as February 29th in leap years, end-of-month dates, year boundaries) should be tested in **Section 2 (Boundary Value Analysis)**, not in this section. Here, we focus on **abnormal data and invalid inputs**.

**Classification of Invalid Inputs and Special Cases**:

- **Invalid Date**: `new Date('invalid')`, `new Date(NaN)`
- **Non-finite Numbers**: `NaN`, `Infinity`, `-Infinity`
- **Date | number Dual Support**: Behavior with both Date objects and number timestamps
- **Fractional Number Inputs**: Floor behavior for positive and negative decimals
- **String Inputs**: Empty strings, whitespace-only strings, extremely long strings

### 4.2 Testing Invalid Date

Invalid Date is the most common edge case. All functions must handle it appropriately.

#### Methods to Generate Invalid Date

```typescript
// Patterns for generating Invalid Date:
const invalidDate1 = new Date('invalid string'); // Invalid string
const invalidDate2 = new Date(NaN); // From NaN
const invalidDate3 = new Date(Infinity); // From Infinity
const invalidDate4 = new Date(undefined); // From undefined
```

#### Test Patterns for Invalid Date

```typescript
/**
 * Invalid Date edge case tests:
 * - Handle Invalid Date appropriately in all functions
 * - Verify expected error handling behavior
 */

describe('function-name - Invalid Date handling', () => {
  describe('validation functions', () => {
    it('should return false for Invalid Date', () => {
      const invalidDate = new Date('invalid');
      expect(isValid(invalidDate)).toBe(false);
    });

    it('should return false when comparing with Invalid Date', () => {
      const validDate = new Date(2025, 0, 1);
      const invalidDate = new Date('invalid');

      expect(isBefore(invalidDate, validDate)).toBe(false);
      expect(isBefore(validDate, invalidDate)).toBe(false);
      expect(isBefore(invalidDate, invalidDate)).toBe(false);
    });
  });

  describe('accessor functions', () => {
    it('should return NaN for Invalid Date', () => {
      const invalidDate = new Date('invalid');
      expect(getYear(invalidDate)).toBe(NaN);
      expect(getMonth(invalidDate)).toBe(NaN);
      expect(getDay(invalidDate)).toBe(NaN);
    });
  });

  describe('transformation functions', () => {
    it('should return Invalid Date for Invalid Date input', () => {
      const invalidDate = new Date('invalid');
      const result = addDays(invalidDate, 5);
      expect(isValid(result)).toBe(false);
    });
  });
});
```

### 4.3 Testing NaN, Infinity, and -Infinity

Non-finite numbers (NaN, Infinity, -Infinity) are edge cases for numeric parameters.

#### Test Patterns for Non-finite Numbers

```typescript
/**
 * Non-finite number edge case tests:
 * - Verify handling of NaN, Infinity, -Infinity
 * - All treated as invalid inputs
 */

describe('function-name - non-finite number handling', () => {
  it('should handle NaN as invalid', () => {
    expect(isValid(NaN)).toBe(false);
  });

  it('should handle Infinity as invalid', () => {
    expect(isValid(Infinity)).toBe(false);
  });

  it('should handle -Infinity as invalid', () => {
    expect(isValid(-Infinity)).toBe(false);
  });

  it('should return Invalid Date when adding NaN days', () => {
    const date = new Date(2025, 0, 1);
    const result = addDays(date, NaN);
    expect(isValid(result)).toBe(false);
  });
});
```

### 4.4 Testing Date | number Dual Support

Many functions in Chronia accept the `Date | number` type. We verify that both types work correctly.

#### Test Patterns for Date | number Dual Support

```typescript
/**
 * Date | number dual support edge case tests:
 * - Verify same behavior with Date objects and number timestamps
 * - Test mixed patterns (Date + number)
 */

describe('function-name - Date | number type handling', () => {
  const timestamp = new Date(2025, 0, 15).getTime();
  const dateObj = new Date(timestamp);

  describe('single parameter functions', () => {
    it('should handle Date object', () => {
      const result = getYear(dateObj);
      expect(result).toBe(2025);
    });

    it('should handle number timestamp', () => {
      const result = getYear(timestamp);
      expect(result).toBe(2025);
    });

    it('should return same result for Date and number', () => {
      expect(getYear(dateObj)).toBe(getYear(timestamp));
    });
  });

  describe('two parameter functions', () => {
    const date1 = new Date(2025, 0, 1);
    const timestamp1 = date1.getTime();
    const date2 = new Date(2025, 0, 2);
    const timestamp2 = date2.getTime();

    it('should handle Date + Date', () => {
      expect(isBefore(date1, date2)).toBe(true);
    });

    it('should handle number + number', () => {
      expect(isBefore(timestamp1, timestamp2)).toBe(true);
    });

    it('should handle Date + number (mixed)', () => {
      expect(isBefore(date1, timestamp2)).toBe(true);
    });

    it('should handle number + Date (mixed)', () => {
      expect(isBefore(timestamp1, date2)).toBe(true);
    });
  });
});
```

### 4.5 Testing Fractional Number Inputs

Verify floor behavior when fractional numbers are input as numeric parameters such as days.

#### Test Patterns for Fractional Floor Behavior

```typescript
/**
 * Fractional number input edge case tests:
 * - Verify floor behavior for positive and negative decimals
 */

describe('addDays - fractional input handling', () => {
  const date = new Date(2025, 0, 1);

  it('should floor positive fractional days', () => {
    const result = addDays(date, 2.7);
    expect(result.getDate()).toBe(3); // 1 + floor(2.7) = 1 + 2 = 3
  });

  it('should floor negative fractional days', () => {
    const result = addDays(new Date(2025, 0, 10), -2.7);
    expect(result.getDate()).toBe(8); // 10 + floor(-2.7) = 10 + (-3) = 7 (note: floor(-2.7) = -3)
  });

  it('should handle fractional value close to zero', () => {
    const result = addDays(date, 0.9);
    expect(result.getDate()).toBe(1); // 1 + floor(0.9) = 1 + 0 = 1
  });
});
```

### 4.6 String Input Edge Cases

Testing empty strings, whitespace characters, and extremely long strings in functions that accept strings (such as parse).

#### Test Patterns for String Inputs

```typescript
/**
 * String input edge case tests:
 * - Verify empty strings, whitespace-only strings, and very long strings
 */

describe('parse - string input edge cases', () => {
  it('should handle empty string', () => {
    const result = parse('', 'YYYY-MM-DD');
    expect(isValid(result)).toBe(false);
  });

  it('should handle whitespace-only string', () => {
    const result = parse('   ', 'YYYY-MM-DD');
    expect(isValid(result)).toBe(false);
  });

  it('should handle very long string', () => {
    const longString = 'a'.repeat(10000);
    const result = parse(longString, 'YYYY-MM-DD');
    expect(isValid(result)).toBe(false);
  });

  it('should handle string with special characters', () => {
    const result = parse('2025-01-01\0\n\t', 'YYYY-MM-DD');
    // Behavior is implementation-dependent (trimmed or treated as invalid)
  });
});
```

### 4.7 Checklist for Invalid Inputs and Special Cases

Checklist to verify comprehensive coverage of invalid inputs and special cases when testing new functions:

**Note**: For boundary values in the normal range (such as February 29th in leap years, end-of-month dates, year boundaries), refer to the **Section 2 (Boundary Value Analysis) checklist**.

#### Invalid Date & Non-finite Numbers

- [ ] Tested Invalid Date (`new Date('invalid')`)?
- [ ] Tested NaN?
- [ ] Tested Infinity?
- [ ] Tested -Infinity?
- [ ] Tested out-of-range timestamps (min-1, max+1)?

#### Date | number Dual Support

- [ ] Tested Date object input?
- [ ] Tested number timestamp input?
- [ ] Tested Date + number mixed patterns (if applicable)?
- [ ] Verified that Date and number inputs return the same result?

#### Fractional & String Inputs

- [ ] Tested floor behavior for positive decimals?
- [ ] Tested floor behavior for negative decimals?
- [ ] Tested empty string (if applicable)?
- [ ] Tested whitespace-only string (if applicable)?

#### Timezone & Special Cases

- [ ] Tested timezone-independent behavior?
- [ ] Tested DST transition boundaries (if applicable)?
- [ ] Tested negative timestamps (before 1970)?

## 5. Test Consistency Patterns

### 5.1 Overview of Test Consistency

**Test consistency** is a design principle that unifies test case design across related functions (paired functions, same-category functions) to facilitate understanding and maintenance of tests.

**Core Principles**:

- **Paired functions**: Use the same test data, only inverting expected values
- **Same-category functions**: Use the same `describe` block structure
- **Unified equivalence partitioning**: Standardize granularity and method of equivalence partitioning for related functions
- **Standardized data structures**: Unify test data structure for `it.each`

**Benefits**:

- Easy test understanding (learning patterns enables understanding other tests)
- Improved maintainability (impact of changes is predictable)
- Rapid test creation for new functions (reuse existing patterns)

### 5.2 Shared Test Data for Paired Functions

For paired functions (isBefore/isAfter, addDays/subDays), use the same test dataset and only invert the expected values.

#### Examples of Paired Functions

**Comparison Function Pairs**:

- `isBefore` / `isAfter`
- `isBeforeOrEqual` / `isAfterOrEqual`

**Arithmetic Function Pairs**:

- `addDays` / `subDays`
- `addMonths` / `subMonths`
- `addYears` / `subYears`

**Boundary Function Pairs**:

- `startOfDay` / `endOfDay`
- `startOfMonth` / `endOfMonth`
- `startOfYear` / `endOfYear`

#### Shared Test Data Pattern

```typescript
/**
 * Shared test data pattern for paired functions:
 * - Use the same test data constants
 * - Calculate expected values per function
 * - Guarantee test consistency
 */

// Define shared test data (at the beginning of the file)
const COMPARISON_TEST_DATA = [
  {
    a: new Date(2025, 0, 1, 10, 0, 0, 0),
    b: new Date(2025, 0, 1, 10, 0, 0, 1),
    desc: 'a is 1ms before b',
  },
  {
    a: new Date(2025, 0, 1, 10, 0, 0, 1),
    b: new Date(2025, 0, 1, 10, 0, 0, 0),
    desc: 'a is 1ms after b',
  },
  {
    a: new Date(2025, 0, 1, 10, 0, 0, 0),
    b: new Date(2025, 0, 1, 10, 0, 0, 0),
    desc: 'a equals b',
  },
] as const;

// isBefore.test.ts
describe('isBefore', () => {
  describe('millisecond precision (default)', () => {
    it.each(
      COMPARISON_TEST_DATA.map(data => ({
        ...data,
        // Calculate expected value: a < b
        expected: data.a.getTime() < data.b.getTime(),
      }))
    )('$desc → $expected', ({ a, b, expected }) => {
      expect(isBefore(a, b)).toBe(expected);
    });
  });
});

// isAfter.test.ts
describe('isAfter', () => {
  describe('millisecond precision (default)', () => {
    // Use the same test dataset (only invert expected values)
    it.each(
      COMPARISON_TEST_DATA.map(data => ({
        ...data,
        // Calculate expected value: a > b
        expected: data.a.getTime() > data.b.getTime(),
      }))
    )('$desc → $expected', ({ a, b, expected }) => {
      expect(isAfter(a, b)).toBe(expected);
    });
  });
});
```

#### Shared Test Data for Arithmetic Function Pairs

```typescript
/**
 * Shared test data for addDays/subDays:
 * - Add and subtract the same number of days
 * - Set expected dates symmetrically
 */

const DAYS_ARITHMETIC_TEST_DATA = [
  {
    baseDate: new Date(2025, 0, 15), // Jan 15
    days: 5,
    addExpected: 20, // Jan 20
    subExpected: 10, // Jan 10
    desc: 'add/subtract 5 days',
  },
  {
    baseDate: new Date(2025, 0, 31), // Jan 31
    days: 1,
    addExpected: 1, // Feb 1
    subExpected: 30, // Jan 30
    desc: 'cross month boundary',
  },
  {
    baseDate: new Date(2025, 11, 31), // Dec 31
    days: 1,
    addExpected: 1, // Jan 1 (next year)
    subExpected: 30, // Dec 30
    desc: 'cross year boundary',
  },
] as const;

// addDays.test.ts
describe('addDays', () => {
  it.each(DAYS_ARITHMETIC_TEST_DATA)(
    '$desc',
    ({ baseDate, days, addExpected }) => {
      const result = addDays(baseDate, days);
      expect(result.getDate()).toBe(addExpected);
    }
  );
});

// subDays.test.ts
describe('subDays', () => {
  it.each(DAYS_ARITHMETIC_TEST_DATA)(
    '$desc',
    ({ baseDate, days, subExpected }) => {
      const result = subDays(baseDate, days);
      expect(result.getDate()).toBe(subExpected);
    }
  );
});
```

### 5.3 Unified `describe` Block Structure for Same-Category Functions

For functions in the same category (all `add*` functions, all `is*` functions), use the same `describe` block structure.

#### Unified Structure for Comparison Functions

```typescript
/**
 * Standard test structure for comparison functions:
 * 1. Basic comparisons
 * 2. Unit-based comparisons
 * 3. Type flexibility
 * 4. Invalid inputs
 */

// isBefore.test.ts
describe('isBefore', () => {
  describe('basic comparisons', () => {
    // Basic comparison tests
  });

  describe('unit-based comparisons', () => {
    // Comparison tests with unit options
  });

  describe('type flexibility', () => {
    // Tests with mixed Date/number types
  });

  describe('invalid inputs', () => {
    // Tests for Invalid Date, NaN, Infinity
  });
});

// isAfter.test.ts
describe('isAfter', () => {
  describe('basic comparisons', () => {
    // Basic comparison tests
  });

  describe('unit-based comparisons', () => {
    // Comparison tests with unit options
  });

  describe('type flexibility', () => {
    // Tests with mixed Date/number types
  });

  describe('invalid inputs', () => {
    // Tests for Invalid Date, NaN, Infinity
  });
});
```

#### Unified Structure for Arithmetic Functions

```typescript
/**
 * Standard test structure for arithmetic functions:
 * 1. Basic operations
 * 2. Boundary handling
 * 3. Immutability
 * 4. Fractional amounts
 * 5. Type flexibility
 * 6. Invalid inputs
 */

// addDays.test.ts
describe('addDays', () => {
  describe('basic operations', () => {
    // Tests for positive, negative, and zero values
  });

  describe('boundary handling', () => {
    // Tests for month boundaries, year boundaries, leap years
  });

  describe('immutability', () => {
    // Verify original date is not modified
  });

  describe('fractional amounts', () => {
    // Tests for decimal floor behavior
  });

  describe('type flexibility', () => {
    // Tests with mixed Date/number types
  });

  describe('invalid inputs', () => {
    // Tests for Invalid Date, NaN, Infinity
  });
});

// subDays.test.ts (same structure)
describe('subDays', () => {
  describe('basic operations', () => { /* ... */ });
  describe('boundary handling', () => { /* ... */ });
  describe('immutability', () => { /* ... */ });
  describe('fractional amounts', () => { /* ... */ });
  describe('type flexibility', () => { /* ... */ });
  describe('invalid inputs', () => { /* ... */ });
});
```

#### Unified Structure for Accessor Functions

```typescript
/**
 * Standard test structure for accessor functions:
 * 1. Valid inputs
 * 2. Edge cases
 * 3. Type flexibility
 * 4. Invalid inputs
 */

// getYear.test.ts
describe('getYear', () => {
  describe('valid inputs', () => { /* ... */ });
  describe('edge cases', () => { /* ... */ });
  describe('type flexibility', () => { /* ... */ });
  describe('invalid inputs', () => { /* ... */ });
});

// getMonth.test.ts (same structure)
describe('getMonth', () => {
  describe('valid inputs', () => { /* ... */ });
  describe('edge cases', () => { /* ... */ });
  describe('type flexibility', () => { /* ... */ });
  describe('invalid inputs', () => { /* ... */ });
});
```

### 5.4 Unified Granularity and Method of Equivalence Partitioning

For related functions, unify the granularity and method of equivalence partitioning.

#### Example of Unified Equivalence Partitioning

```typescript
/**
 * Unified equivalence partitioning for add*/sub* functions:
 * - Use the same equivalence class definition for all add*/sub* functions
 * - Unify representative value selection criteria
 */

// addDays/subDays/addMonths/subMonths/addYears/subYears
// All use the same equivalence partitioning:
// - Class 1: Negative values (amount < 0) → Representative: -5
// - Class 2: Zero (amount === 0) → Representative: 0
// - Class 3: Positive values (amount > 0) → Representative: 5
// - Class 4: Decimal (amount % 1 !== 0) → Representative: 2.7

describe('addDays - equivalence partitioning', () => {
  it('should handle negative days (Class 1: amount < 0)', () => {
    const result = addDays(new Date(2025, 0, 10), -5);
    expect(result.getDate()).toBe(5);
  });

  it('should handle zero days (Class 2: amount === 0)', () => {
    const result = addDays(new Date(2025, 0, 15), 0);
    expect(result.getDate()).toBe(15);
  });

  it('should handle positive days (Class 3: amount > 0)', () => {
    const result = addDays(new Date(2025, 0, 1), 5);
    expect(result.getDate()).toBe(6);
  });

  it('should handle fractional days (Class 4: amount % 1 !== 0)', () => {
    const result = addDays(new Date(2025, 0, 1), 2.7);
    expect(result.getDate()).toBe(3);
  });
});

// subDays also uses the same equivalence partitioning and representative values
describe('subDays - equivalence partitioning', () => {
  it('should handle negative days (Class 1: amount < 0)', () => {
    const result = subDays(new Date(2025, 0, 10), -5);
    expect(result.getDate()).toBe(15); // Reverse direction
  });

  it('should handle zero days (Class 2: amount === 0)', () => {
    const result = subDays(new Date(2025, 0, 15), 0);
    expect(result.getDate()).toBe(15);
  });

  it('should handle positive days (Class 3: amount > 0)', () => {
    const result = subDays(new Date(2025, 0, 10), 5);
    expect(result.getDate()).toBe(5);
  });

  it('should handle fractional days (Class 4: amount % 1 !== 0)', () => {
    const result = subDays(new Date(2025, 0, 10), 2.7);
    expect(result.getDate()).toBe(7);
  });
});
```

### 5.5 Unified Test Data Structure for `it.each`

For related functions, unify the test data structure (property names, data format) for `it.each`.

#### Standardization of Test Data Structure

```typescript
/**
 * Standard test data structure for comparison functions:
 * - Properties: a, b, expected, desc
 * - Unified across all comparison functions
 */

// Common structure for isBefore/isAfter/isEqual
type ComparisonTestCase = {
  a: Date | number;
  b: Date | number;
  expected: boolean;
  desc: string;
};

// Test data for isBefore
const isBeforeTestData: ComparisonTestCase[] = [
  {
    a: new Date(2025, 0, 1),
    b: new Date(2025, 0, 2),
    expected: true,
    desc: 'a is before b',
  },
  // ...
];

// Test data for isAfter (same structure)
const isAfterTestData: ComparisonTestCase[] = [
  {
    a: new Date(2025, 0, 2),
    b: new Date(2025, 0, 1),
    expected: true,
    desc: 'a is after b',
  },
  // ...
];

/**
 * Standard test data structure for arithmetic functions:
 * - Properties: baseDate, amount, expectedDate (or expectedMonth/expectedYear)
 * - Unified across all arithmetic functions
 */

type ArithmeticTestCase = {
  baseDate: Date;
  amount: number;
  expectedDate: number;
  desc: string;
};

// Common structure for addDays/subDays
const daysArithmeticTestData: ArithmeticTestCase[] = [
  {
    baseDate: new Date(2025, 0, 1),
    amount: 5,
    expectedDate: 6,
    desc: 'add 5 days to Jan 1',
  },
  // ...
];
```

### 5.6 Unified Comment Style

Unify comment style and description writing across test files for related functions.

#### Unified Comment Pattern

```typescript
/**
 * Unified comment pattern for related functions:
 * 1. JSDoc comment at file beginning (equivalence partitioning, test strategy)
 * 2. Comments for shared test data (data meaning, usage)
 * 3. Comments for describe blocks (section purpose)
 */

// File-beginning comment (unified across all comparison functions)
/**
 * Tests for isBefore function
 *
 * Equivalence partitioning:
 * - Class 1: a < b → true
 * - Class 2: a > b → false
 * - Class 3: a === b → false
 *
 * Test strategy:
 * 1. Basic comparisons (millisecond precision)
 * 2. Unit-based comparisons (year/month/day/hour/minute/second)
 * 3. Type flexibility (Date/number)
 * 4. Invalid inputs (Invalid Date, NaN, Infinity)
 */

// Shared test data comment (unified across all arithmetic functions)
/**
 * Test data for date arithmetic operations
 *
 * Each test case includes:
 * - baseDate: Starting date for the operation
 * - amount: Number of units to add/subtract
 * - expectedDate: Expected day of month after operation
 * - desc: Human-readable description
 *
 * Usage:
 * - addDays: baseDate + amount days → expectedDate
 * - subDays: baseDate - amount days → expectedDate
 */

// Comments within describe blocks (unified across all functions)
describe('basic operations', () => {
  // Test positive, negative, and zero amounts
  // ...
});

describe('boundary handling', () => {
  // Test month/year boundaries and leap years
  // ...
});
```

### 5.7 Test Consistency Checklist

Checklist for verifying test consistency when creating tests for a new function:

#### Paired Functions

- [ ] Have you identified if a paired function exists?
- [ ] Are you using the same test dataset?
- [ ] Are you only inverting expected values?
- [ ] Have you explicitly stated the relationship between paired functions in comments?

#### Same-Category Functions

- [ ] Have you identified functions in the same category?
- [ ] Are you using the same `describe` block structure?
- [ ] Have you unified section names (basic operations, boundary handling, etc.)?
- [ ] Have you unified the test order (basic → boundary → type flexibility → invalid inputs)?

#### Equivalence Partitioning

- [ ] Are you using the same equivalence partitioning for related functions?
- [ ] Have you unified representative value selection criteria?
- [ ] Have you unified equivalence class naming (Class 1, Class 2, etc.)?

#### Test Data Structure

- [ ] Have you unified property names in `it.each`?
- [ ] Have you unified data format (object structure)?
- [ ] Are you sharing type definitions (type/interface)?

#### Comment Style

- [ ] Have you unified JSDoc comment patterns at the beginning of files?
- [ ] Have you unified comment format for shared test data?
- [ ] Have you unified comment style within describe blocks?

## 6. Test Readability and Hierarchy

### 6.1 Overview of Readability and Hierarchy

**Test readability and hierarchy** is a design principle that ensures tests are properly structured by content and are easy to read and understand.

**Core Principles**:

- **Hierarchical structure**: Nest up to 3 levels with `describe` blocks
- **Clear naming**: Use descriptive test block names starting with verbs
- **Logical order**: Arrange test cases in a meaningful order
- **Appropriate granularity**: Test units that are neither too large nor too small

**Benefits**:

- Test intent can be understood immediately
- Easy identification of problem areas when tests fail
- Rapid onboarding of new developers

### 6.2 Nesting Rules for `describe` Blocks

Test files should nest up to 3 levels maximum, and refactor if deeper hierarchy is needed.

#### Definition of Nesting Levels

```typescript
/**
 * Standard structure for 3-level nesting:
 * Level 1: Function name
 * Level 2: Test perspective/category
 * Level 3: Specific scenario (optional)
 */

// Level 1: Function name
describe('isBefore', () => {
  // Level 2: Test perspective
  describe('basic comparisons', () => {
    // Level 3: Specific scenario (only when necessary)
    describe('chronological order', () => {
      it('should return true when a < b', () => { /* ... */ });
      it('should return false when a > b', () => { /* ... */ });
      it('should return false when a === b', () => { /* ... */ });
    });
  });

  // Level 2: Test perspective
  describe('unit-based comparisons', () => {
    // Test directly with it.each without using Level 3
    it.each([
      { unit: 'year', expected: false },
      { unit: 'month', expected: false },
      { unit: 'day', expected: true },
    ])('should compare at $unit precision', ({ unit, expected }) => {
      // ...
    });
  });
});
```

#### Recommended Structure Patterns

##### Pattern 1: 2-Level Structure (Recommended)

```typescript
describe('functionName', () => {
  describe('test category', () => {
    it('should do X', () => { /* ... */ });
    it('should do Y', () => { /* ... */ });
  });
});
```

##### Pattern 2: 3-Level Structure (Only When Necessary)

```typescript
describe('functionName', () => {
  describe('test category', () => {
    describe('specific scenario', () => {
      it('should do X', () => { /* ... */ });
    });
  });
});
```

##### Pattern 3: Reduce Hierarchy with it.each (Recommended)

```typescript
describe('functionName', () => {
  describe('test category', () => {
    it.each([
      { input: 'A', expected: 'X' },
      { input: 'B', expected: 'Y' },
    ])('should handle $input', ({ input, expected }) => {
      // ...
    });
  });
});
```

#### How to Avoid 4+ Level Nesting

```typescript
// ❌ Bad: 4-level nesting
describe('addDays', () => {
  describe('boundary handling', () => {
    describe('month boundaries', () => {
      describe('31-day months', () => {
        it('should handle Jan 31 → Feb 1', () => { /* ... */ });
      });
    });
  });
});

// ✅ Good: Reduce hierarchy with it.each
describe('addDays', () => {
  describe('boundary handling', () => {
    it.each([
      { month: 'January', day: 31, desc: '31-day month' },
      { month: 'April', day: 30, desc: '30-day month' },
      { month: 'February', day: 28, desc: 'non-leap year' },
    ])('should handle $desc boundary ($month $day)', ({ month, day }) => {
      // ...
    });
  });
});

// ✅ Good: Split with helper functions
describe('addDays', () => {
  describe('boundary handling', () => {
    testMonthBoundaries(); // Helper function
    testYearBoundaries(); // Helper function
  });
});

function testMonthBoundaries() {
  it('should handle 31-day month boundary', () => { /* ... */ });
  it('should handle 30-day month boundary', () => { /* ... */ });
  it('should handle February boundary', () => { /* ... */ });
}
```

### 6.3 Naming Conventions for Test Blocks

Test block names should use clear descriptions starting with verbs.

#### Naming Patterns

**`describe` block naming**:

- **Level 1 (function name)**: Function name as-is (e.g., `'isBefore'`, `'addDays'`)
- **Level 2 (perspective)**: Noun phrase (e.g., `'basic operations'`, `'invalid inputs'`, `'boundary handling'`)
- **Level 3 (scenario)**: Noun phrase (e.g., `'chronological order'`, `'month boundaries'`)

**`it` block naming**:

- **Pattern**: `'should [verb] [object/condition]'`
- **Examples**:
  - `'should return true when a < b'`
  - `'should handle month boundaries'`
  - `'should not mutate the original date'`

#### Good and Bad Naming Examples

```typescript
// ✅ Good: Clear and descriptive
describe('isBefore', () => {
  describe('basic comparisons', () => {
    it('should return true when first date is before second', () => { /* ... */ });
    it('should return false when first date is after second', () => { /* ... */ });
    it('should return false when dates are equal', () => { /* ... */ });
  });

  describe('invalid inputs', () => {
    it('should return false for Invalid Date', () => { /* ... */ });
    it('should return false for NaN', () => { /* ... */ });
  });
});

// ❌ Bad: Vague and unclear
describe('isBefore', () => {
  describe('tests', () => {
    it('test 1', () => { /* ... */ });
    it('test 2', () => { /* ... */ });
  });

  describe('errors', () => {
    it('handles bad input', () => { /* ... */ });
  });
});

// ❌ Bad: Not using "should"
describe('isBefore', () => {
  it('returns true', () => { /* ... */ });
  it('returns false', () => { /* ... */ });
});

// ✅ Good: Includes specific conditions
describe('isBefore', () => {
  it('should return true when a < b', () => { /* ... */ });
  it('should return false when a > b', () => { /* ... */ });
});
```

### 6.4 Logical Ordering of Test Data in `it.each`

Test data in `it.each` should be arranged in a meaningful logical order.

#### Logical Ordering Patterns

##### Pattern 1: Valid → Invalid

```typescript
it.each([
  // Valid cases first
  { input: 1, expected: true, desc: 'valid input: 1' },
  { input: 12, expected: true, desc: 'valid input: 12' },
  // Invalid cases later
  { input: 0, expected: false, desc: 'invalid input: 0' },
  { input: 13, expected: false, desc: 'invalid input: 13' },
])('$desc', ({ input, expected }) => {
  // ...
});
```

##### Pattern 2: Small Values → Large Values

```typescript
it.each([
  { month: 1, name: 'January' },
  { month: 2, name: 'February' },
  { month: 3, name: 'March' },
  // ... in order
  { month: 12, name: 'December' },
])('should return $name for month $month', ({ month, name }) => {
  // ...
});
```

##### Pattern 3: Typical → Special

```typescript
it.each([
  // Typical cases first
  { date: new Date(2025, 0, 15), desc: 'mid-month date' },
  // Special cases later
  { date: new Date(2025, 0, 1), desc: 'first day of month' },
  { date: new Date(2025, 0, 31), desc: 'last day of month' },
  { date: new Date(2024, 1, 29), desc: 'leap year Feb 29' },
])('should handle $desc', ({ date }) => {
  // ...
});
```

##### Pattern 4: Equivalence Class Order

```typescript
it.each([
  // Class 1: Negative values
  { amount: -5, desc: 'negative amount' },
  // Class 2: Zero
  { amount: 0, desc: 'zero amount' },
  // Class 3: Positive values
  { amount: 5, desc: 'positive amount' },
  // Class 4: Decimals
  { amount: 2.7, desc: 'fractional amount' },
])('should handle $desc (amount: $amount)', ({ amount }) => {
  // ...
});
```

### 6.5 Test Case Classification Perspectives

Test cases should be classified from the following perspectives and organized in `describe` blocks.

#### Standard Classification Perspectives

##### Classification 1: Valid vs Invalid Cases

```typescript
describe('functionName', () => {
  describe('valid cases', () => {
    // Tests for valid inputs
  });

  describe('invalid cases', () => {
    // Tests for invalid inputs
  });
});
```

##### Classification 2: By Functionality

```typescript
describe('isBefore', () => {
  describe('millisecond comparison', () => {
    // Default millisecond precision comparison
  });

  describe('unit-based comparison', () => {
    // Comparison with unit option
  });
});
```

##### Classification 3: By Input Type

```typescript
describe('functionName', () => {
  describe('Date object input', () => {
    // Tests for Date object input
  });

  describe('number timestamp input', () => {
    // Tests for timestamp input
  });
});
```

##### Classification 4: By Scenario

```typescript
describe('addDays', () => {
  describe('within month', () => {
    // Date addition within the same month
  });

  describe('cross month boundary', () => {
    // Addition crossing month boundary
  });

  describe('cross year boundary', () => {
    // Addition crossing year boundary
  });
});
```

### 6.6 Helper Functions and File Splitting Guidelines

When test files become too large, consider using helper functions or splitting files.

#### Helper Function Patterns

```typescript
/**
 * Helper function usage example:
 * - Extract common test logic into functions
 * - Hide complex test data generation
 */

// Helper function definition
function createDateRange(start: Date, days: number): Date[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    return date;
  });
}

// Helper function usage
describe('isBefore', () => {
  it('should handle consecutive dates', () => {
    const dates = createDateRange(new Date(2025, 0, 1), 7);

    for (let i = 0; i < dates.length - 1; i++) {
      expect(isBefore(dates[i], dates[i + 1])).toBe(true);
    }
  });
});
```

#### File Splitting Guidelines

**Split Criteria**:

- When the test file exceeds 500 lines
- When there are multiple independent test groups
- When the test focus differs significantly

**Split Pattern**:

```text
# Before: One large file
tests/isBefore.test.ts (800 lines)

# After: Split by focus
tests/isBefore/
├─ basic-comparisons.test.ts
├─ unit-based-comparisons.test.ts
├─ type-flexibility.test.ts
└─ invalid-inputs.test.ts
```

**Split Precautions**:

- Extract shared test data to a separate file (`test-data.ts`)
- Each file should be self-contained even after splitting
- File names should clearly indicate the test focus

### 6.7 Readability and Hierarchy Checklist

When creating tests for new functions, use this checklist to verify readability and hierarchy:

#### Nesting Structure

- [ ] Is the `describe` block nesting 3 levels or fewer?
- [ ] Have 4+ level nests been refactored using `it.each` or helper functions?
- [ ] Does the top-level `describe` block indicate the function name?
- [ ] Do second-level `describe` blocks indicate the test perspective?

#### Naming Conventions

- [ ] Do `it` block names start with a verb and provide clear descriptions?
- [ ] Are `describe` block names clear noun phrases?
- [ ] Can you understand what is being tested just by reading the block names?
- [ ] Have ambiguous names (like "test1", "handles input") been avoided?

#### Test Data Ordering

- [ ] Are test cases in `it.each` arranged in a logical order?
- [ ] Are valid cases placed before invalid cases?
- [ ] Are values ordered from small to large?
- [ ] Are typical cases placed before special cases?

#### File Size

- [ ] Is the test file 500 lines or fewer?
- [ ] If over 500 lines, has file splitting or helper function extraction been considered?
- [ ] Has shared test data been extracted to a separate file? (if applicable)

#### Overall Readability

- [ ] Can the structure be understood when reading the test file for the first time?
- [ ] Can you immediately identify which test case failed when a failure occurs?
- [ ] Does the test code have appropriate comments?
- [ ] Is complex test logic hidden behind helper functions?

---

## 7. Test Code Quality Standards

Test code must meet the same quality standards as production code. This section defines the quality standards applied to test code in the Chronia project.

### 7.1 TypeScript Strict Mode Usage Rules

All test files must be written in TypeScript strict mode.

#### Strict Mode Configuration

Verify that strict mode is enabled in the project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

#### Explicit Type Annotations

Add explicit types to test data and expected results:

```typescript
// ❌ Bad example: Types are inferred but not explicit
const testCases = [
  { input: new Date(2025, 0, 1), expected: 1 },
  { input: new Date(2025, 11, 31), expected: 12 },
];

// ✅ Good example: Explicit type annotations
type MonthTestCase = {
  input: Date;
  expected: number;
  desc: string;
};

const testCases: MonthTestCase[] = [
  { input: new Date(2025, 0, 1), expected: 1, desc: 'January' },
  { input: new Date(2025, 11, 31), expected: 12, desc: 'December' },
];
```

#### Type-Safe Test Helpers

Add appropriate types to test helper functions:

```typescript
// ✅ Good example: Type-safe helper functions
function createTestDate(year: number, month: number, day: number): Date {
  return new Date(year, month, day);
}

function expectValidDate(date: Date): void {
  expect(date).toBeInstanceOf(Date);
  expect(date.getTime()).not.toBeNaN();
}
```

### 7.2 Naming Conventions

Follow the Chronia project's naming conventions.

#### Variables and Functions: camelCase

Use camelCase for variables, functions, and test case properties within tests:

```typescript
// ✅ Good example: camelCase
const testDate = new Date(2025, 0, 1);
const expectedResult = 1;
const isValidDate = (date: Date) => !isNaN(date.getTime());

it.each([
  { inputDate: testDate, expectedMonth: 1, description: 'January' },
])('$description', ({ inputDate, expectedMonth }) => {
  // ...
});
```

#### Types and Interfaces: PascalCase

Use PascalCase for type definitions, interfaces, and classes:

```typescript
// ✅ Good example: PascalCase
type TestCase = {
  input: Date;
  expected: number;
};

interface ComparisonTestData {
  dateA: Date;
  dateB: Date;
  expectedResult: boolean;
}

class DateTestHelper {
  static createDate(year: number): Date {
    return new Date(year, 0, 1);
  }
}
```

#### Constants: UPPER_SNAKE_CASE

Use UPPER_SNAKE_CASE for constants within tests:

```typescript
// ✅ Good example: UPPER_SNAKE_CASE
const FIXED_NOW = new Date(2025, 0, 1, 12, 0, 0);
const MIN_TIMESTAMP = -8640000000000000;
const MAX_TIMESTAMP = 8640000000000000;
const MILLISECONDS_PER_DAY = 86400000;
```

### 7.3 Prohibition of `any` Type and `unknown` Usage Guidelines

The use of the `any` type is prohibited. Use `unknown` when the type is truly dynamic.

#### Avoid `any` Type

```typescript
// ❌ Bad example: Using any type
function testInvalidInput(input: any): void {
  expect(() => someFunction(input)).toThrow();
}

// ✅ Good example: Use specific types
function testInvalidInput(input: Date | number | string): void {
  expect(() => someFunction(input)).toThrow();
}
```

#### Appropriate Use of `unknown` Type

When the type is truly unknown, use `unknown` and narrow it down with type guards:

```typescript
// ✅ Good example: unknown type with type guards
function testUnknownInput(input: unknown): void {
  if (input instanceof Date) {
    expect(someFunction(input)).toBeDefined();
  } else if (typeof input === 'number') {
    expect(someFunction(input)).toBeDefined();
  } else {
    expect(() => someFunction(input as never)).toThrow();
  }
}
```

#### Type Safety in Error Handling

```typescript
// ❌ Bad example: Catching error as any type
try {
  someFunction(invalidInput);
} catch (error: any) {
  expect(error.message).toBe('Invalid date');
}

// ✅ Good example: Catch error as unknown type and use type guards
try {
  someFunction(invalidInput);
} catch (error: unknown) {
  if (error instanceof Error) {
    expect(error.message).toBe('Invalid date');
  } else {
    throw error;
  }
}
```

### 7.4 Test File Size Management

Manage test files to not exceed 500 lines.

#### 500-Line Limit Standard

Keep a single test file to 500 lines or fewer:

```typescript
// Test file size guidelines:
// - 100-300 lines: Appropriate size
// - 300-500 lines: Acceptable range, but consider refactoring
// - Over 500 lines: Refactoring required
```

#### File Splitting Strategies

When exceeding 500 lines, split files using the following strategies:

##### Pattern 1: Split by Functionality

```typescript
// tests/addDays.test.ts (300 lines)
describe('addDays', () => {
  describe('basic arithmetic', () => { /* ... */ });
  describe('within month', () => { /* ... */ });
});

// tests/addDays.edge-cases.test.ts (200 lines)
describe('addDays - edge cases', () => {
  describe('month boundaries', () => { /* ... */ });
  describe('year boundaries', () => { /* ... */ });
  describe('leap years', () => { /* ... */ });
});
```

##### Pattern 2: Split by Input Type

```typescript
// tests/isBefore.date.test.ts
describe('isBefore - Date input', () => { /* ... */ });

// tests/isBefore.number.test.ts
describe('isBefore - number input', () => { /* ... */ });

// tests/isBefore.edge-cases.test.ts
describe('isBefore - edge cases', () => { /* ... */ });
```

#### Extracting Shared Test Data

Extract test data used across multiple test files into a separate file:

```typescript
// tests/_fixtures/comparison-test-data.ts
export const COMPARISON_TEST_DATA = [
  { a: new Date(2025, 0, 1), b: new Date(2025, 0, 2), desc: 'a before b' },
  { a: new Date(2025, 0, 2), b: new Date(2025, 0, 1), desc: 'a after b' },
] as const;

// tests/isBefore.test.ts
import { COMPARISON_TEST_DATA } from './_fixtures/comparison-test-data';

describe('isBefore', () => {
  it.each(COMPARISON_TEST_DATA)('$desc', ({ a, b }) => {
    // ...
  });
});
```

### 7.5 Zero Lint Errors Requirement

All test files must maintain zero errors with `pnpm lint`.

#### Linting Commands

All code including test files must pass linting:

```bash
# Lint all code
pnpm lint

# Lint specific test file
pnpm eslint tests/addDays.test.ts
```

#### Common Linting Errors and Fixes

##### Unused Variables

```typescript
// ❌ Bad example: Unused variable
it('should return correct value', () => {
  const result = addDays(new Date(), 1);
  const unused = 'this is not used'; // ESLint error
  expect(result).toBeInstanceOf(Date);
});

// ✅ Good example: Remove unused variable
it('should return correct value', () => {
  const result = addDays(new Date(), 1);
  expect(result).toBeInstanceOf(Date);
});
```

##### Unused Function Parameters

```typescript
// ❌ Bad example: Unused parameter
it.each([
  { input: 1, expected: true, desc: 'valid' },
])('$desc', ({ input, expected, desc }) => {
  // desc is not used
  expect(isValid(input)).toBe(expected);
});

// ✅ Good example: Underscore prefix or remove
it.each([
  { input: 1, expected: true, desc: 'valid' },
])('$desc', ({ input, expected }) => {
  expect(isValid(input)).toBe(expected);
});
```

##### Leftover console.log

```typescript
// ❌ Bad example: Debug console.log left in code
it('should calculate correctly', () => {
  const result = addDays(new Date(), 1);
  console.log(result); // ESLint error
  expect(result).toBeInstanceOf(Date);
});

// ✅ Good example: Remove console.log
it('should calculate correctly', () => {
  const result = addDays(new Date(), 1);
  expect(result).toBeInstanceOf(Date);
});
```

#### Adherence to ESLint Rules

Follow all rules defined in the project's `.eslintrc.js`:

- `no-console`: Prohibit use of console.log, etc.
- `no-unused-vars`: Prohibit unused variables
- `@typescript-eslint/no-explicit-any`: Prohibit any type
- `@typescript-eslint/explicit-function-return-type`: Explicit function return types (with relaxed settings)

### 7.6 Test Code Quality Checklist

#### Type Safety Verification

- [ ] Are all test files written in TypeScript strict mode?
- [ ] Do test data and expected results have explicit type annotations?
- [ ] Do test helper functions have appropriate types?
- [ ] Is `any` type avoided and `unknown` used when necessary?

#### Naming Verification

- [ ] Are variables and functions in camelCase?
- [ ] Are types and interfaces in PascalCase?
- [ ] Are constants in UPPER_SNAKE_CASE?
- [ ] Do names clearly express the test's intent?

#### Size Management Verification

- [ ] Are test files 500 lines or fewer?
- [ ] If over 500 lines, are files appropriately split?
- [ ] Is shared test data extracted to separate files?

#### Linting Verification

- [ ] Does `pnpm lint` pass with zero errors?
- [ ] Are there no unused variables or functions?
- [ ] Are debug console.log statements removed?
- [ ] Are all ESLint rules being followed?

---

## 8. Existing Test Refactoring Strategy

Define refactoring strategies to incrementally improve existing test suites.

### 8.1 Prioritization Criteria

Rather than refactoring all tests at once, prioritize based on impact and urgency.

#### Priority 1: Frequently Changed Files

Prioritize test files that are most frequently changed:

```bash
# Check change frequency from Git history
git log --format=format: --name-only | grep 'tests/.*\.test\.ts$' | sort | uniq -c | sort -rn | head -20

# Example: High-frequency files
# 45 tests/addDays.test.ts
# 32 tests/format.test.ts
# 28 tests/isBefore.test.ts
```

**Reason**: Files that are frequently changed require the highest test readability and maintainability.

#### Priority 2: High Complexity Files

Prioritize test files with high complexity:

```bash
# Sort by file size (approximation of complexity)
wc -l tests/*.test.ts | sort -rn | head -20

# Example: Large files
# 650 tests/format.test.ts
# 580 tests/parse.test.ts
# 520 tests/addDays.test.ts
```

**Indicators**:

- File size: Over 500 lines
- Nesting level: 4+ levels
- Test case count: 100+ cases

#### Priority 3: Related Function Groups

Refactor related functions together:

```typescript
// Priority Group 1: add/sub function group
// - addDays / subDays
// - addMonths / subMonths
// - addYears / subYears

// Priority Group 2: Comparison function group
// - isBefore / isAfter
// - isBeforeOrEqual / isAfterOrEqual
// - isBetween

// Priority Group 3: Getter function group
// - getYear / getMonth / getDay
// - getHours / getMinutes / getSeconds
```

**Reason**: Ensure test consistency across related functions.

### 8.2 Refactoring Procedure

Define 6 steps for safe refactoring.

#### Step 1: Assess Current State

Record the current state of tests before refactoring:

```bash
# 1. Record coverage
pnpm test:coverage
# Screenshot or copy the coverage report

# 2. Verify tests pass
pnpm test tests/addDays.test.ts

# 3. Record file size and structure
wc -l tests/addDays.test.ts
grep -E '^\s*(describe|it)\(' tests/addDays.test.ts | wc -l
```

#### Step 2: Refactoring Plan

Clarify what to improve:

```typescript
/**
 * Refactoring plan: tests/addDays.test.ts
 *
 * Current problems:
 * - File size: 650 lines (exceeds 500-line limit)
 * - Nesting level: 4-5 levels (exceeds 3-level limit)
 * - Duplicate test data: same data as subDays defined separately
 *
 * Improvements:
 * 1. Extract shared test data to _fixtures/
 * 2. Reduce nesting level with it.each
 * 3. Split edge case tests to separate file
 *
 * Expected results:
 * - File size: 400 lines or fewer
 * - Nesting level: 3 levels or fewer
 * - Test data sharing: use same data for addDays/subDays
 */
```

#### Step 3: Incremental Refactoring

Make one improvement at a time and run tests after each step:

```typescript
// Step 3-1: Extract shared data
// Create tests/_fixtures/days-arithmetic-data.ts
// Run tests: pnpm test tests/addDays.test.ts

// Step 3-2: Migrate to it.each
// Consolidate duplicate it blocks into it.each
// Run tests: pnpm test tests/addDays.test.ts

// Step 3-3: Split file
// Create tests/addDays.edge-cases.test.ts
// Run tests: pnpm test tests/addDays*.test.ts
```

**Important**: After each step, always run `pnpm test` to ensure all tests pass.

#### Step 4: Verify Coverage

After refactoring, verify that coverage is maintained or improved:

```bash
# Check coverage after refactoring
pnpm test:coverage

# Comparison:
# Before: Statements 100%, Branches 100%, Functions 100%, Lines 100%
# After:  Statements 100%, Branches 100%, Functions 100%, Lines 100%
```

**When coverage decreases**: Refer to rollback criteria in Section 8.5.

#### Step 5: Review and Update Documentation

Document the refactoring changes:

```typescript
// Add comment at the top of tests/addDays.test.ts
/**
 * Test strategy for addDays function
 *
 * Equivalence Classes:
 * - Class 1: Negative days (days < 0) → past dates
 * - Class 2: Zero days (days === 0) → same date
 * - Class 3: Positive days (days > 0) → future dates
 * - Class 4: Decimal days (days % 1 !== 0) → floored
 *
 * Test Data:
 * - Shared with subDays (inverted expectations)
 * - Defined in tests/_fixtures/days-arithmetic-data.ts
 *
 * Refactored: 2025-01-XX
 * - Reduced file size: 650 → 380 lines
 * - Reduced nesting: 4-5 → 2-3 levels
 * - Extracted shared test data
 */
```

#### Step 6: Commit and PR

Commit refactoring changes with clear message:

```bash
# Example commit message
git add tests/addDays.test.ts tests/addDays.edge-cases.test.ts tests/_fixtures/days-arithmetic-data.ts
git commit -m "refactor(test): improve addDays test structure

- Extract shared test data to _fixtures/days-arithmetic-data.ts
- Reduce nesting from 4-5 to 2-3 levels using it.each
- Split edge cases to separate file (650 → 380 lines)
- Maintain 100% code coverage

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 8.3 Safety Checklist

Safety checks to always verify during refactoring.

#### Preserve Original Test Cases

- [ ] Are all original test cases preserved?
- [ ] Are test case descriptions (desc) maintained?
- [ ] Were deleted test cases truly duplicates?

**Verification method**:

```bash
# Test case count before refactoring
grep -E '^\s*it\(' tests/addDays.test.ts.backup | wc -l
# Example: 85

# Test case count after refactoring
grep -E '^\s*it\(' tests/addDays.test.ts | wc -l
grep -E '^\s*it\.each' tests/addDays.test.ts | wc -l
# Example: 15 it + 5 it.each (14 cases each) = 15 + 70 = 85
```

#### Maintain Coverage

- [ ] Is statement coverage maintained?
- [ ] Is branch coverage maintained?
- [ ] Is function coverage maintained?
- [ ] Is line coverage maintained?

**Verification method**:

```bash
# Before refactoring
pnpm test:coverage -- tests/addDays.test.ts
# Statements: 100%, Branches: 100%, Functions: 100%, Lines: 100%

# After refactoring
pnpm test:coverage -- tests/addDays*.test.ts
# Statements: 100%, Branches: 100%, Functions: 100%, Lines: 100%
```

#### Verify Test Equivalence

- [ ] Do tests make the same assertions for the same inputs?
- [ ] Are edge case tests not deleted?
- [ ] Is error handling testing maintained?

**Verification method**:

```typescript
// Verify tests make same assertions before and after refactoring

// Before:
it('should handle negative days', () => {
  const result = addDays(new Date(2025, 0, 5), -2);
  expect(result).toEqual(new Date(2025, 0, 3));
});

// After:
it.each([
  { base: new Date(2025, 0, 5), days: -2, expected: new Date(2025, 0, 3), desc: 'negative days' },
])('$desc', ({ base, days, expected }) => {
  const result = addDays(base, days);
  expect(result).toEqual(expected);
});
```

#### Run Regression Tests

- [ ] Do tests for the refactored file pass?
- [ ] Do all project tests pass?
- [ ] Does the build succeed?

**Verification method**:

```bash
# Run step by step
pnpm test tests/addDays.test.ts      # Target file
pnpm test                             # All tests
pnpm build                            # Build
```

### 8.4 Recommended Refactoring Scope per PR

Define the scope of refactoring to handle in a single PR.

#### Recommended Scope: 1-3 Files

Refactor 1-3 test files in a single PR:

```typescript
// ✅ Good example: Appropriate PR scope

// PR #1: Refactor addDays/subDays function tests
// - tests/addDays.test.ts (650 → 380 lines)
// - tests/subDays.test.ts (620 → 350 lines)
// - tests/_fixtures/days-arithmetic-data.ts (newly created)

// PR #2: Refactor isBefore/isAfter function tests
// - tests/isBefore.test.ts (550 → 320 lines)
// - tests/isAfter.test.ts (540 → 310 lines)
// - tests/_fixtures/comparison-data.ts (newly created)
```

#### PR Scope to Avoid

```typescript
// ❌ Bad example: PR scope too large

// PR #X: Refactor all test files
// - tests/*.test.ts (106 files) ← Difficult to review
```

#### PR Size Guidelines

- **Small PR**: 1 file, 200-500 lines changed
- **Medium PR**: 2-3 files, 500-1000 lines changed
- **Large PR**: Should be avoided (difficult to review)

### 8.5 Rollback Criteria When Coverage Decreases

Define response criteria when coverage decreases after refactoring.

#### Rollback Decision Criteria

Consider rollback if any of the following applies:

##### Criterion 1: Coverage Decrease

```bash
# Before
Statements: 100%, Branches: 100%, Functions: 100%, Lines 100%

# After
Statements: 98%, Branches: 95%, Functions: 100%, Lines: 99%

# → Rollback required (any coverage fell below 100%)
```

##### Criterion 2: New Test Failures

```bash
# After refactoring, previously passing tests fail
pnpm test
# FAIL tests/addDays.test.ts
#   ● addDays › should handle month boundaries
#     Expected: 2025-02-01
#     Received: 2025-01-32

# → Rollback required (test failure)
```

##### Criterion 3: Build Error

```bash
# After refactoring, TypeScript build fails
pnpm build
# Error: Type 'Date | undefined' is not assignable to type 'Date'

# → Rollback required (build error)
```

#### Rollback Procedure

```bash
# Step 1: Roll back changes
git checkout HEAD -- tests/addDays.test.ts

# Step 2: Verify tests pass
pnpm test tests/addDays.test.ts

# Step 3: Verify coverage recovered
pnpm test:coverage

# Step 4: Analyze problem and create new refactoring plan
```

#### Acceptable Coverage Decrease Cases

Temporary coverage decrease is acceptable only in these cases:

1. **Legitimate test deletion**: Completely duplicate tests deleted and equivalent tests exist elsewhere
2. **Incremental refactoring**: Split across multiple PRs with plan to return to 100%

**Important**: Must ultimately return to 100% coverage.

### 8.6 Refactoring Strategy Checklist

#### Prioritization

- [ ] Are frequently changed files prioritized?
- [ ] Are high complexity files prioritized?
- [ ] Are related functions refactored together?

#### Refactoring Procedure

- [ ] Was current state assessed (coverage recorded, tests run)?
- [ ] Was refactoring plan documented?
- [ ] Was incremental refactoring performed (test after each step)?
- [ ] Was coverage verified?
- [ ] Were refactoring changes documented?
- [ ] Was clear commit message written?

#### Safety Verification

- [ ] Are all original test cases preserved?
- [ ] Is coverage maintained (100%)?
- [ ] Is test equivalence verified?
- [ ] Do all regression tests pass?

#### PR Scope

- [ ] Is PR limited to 1-3 files?
- [ ] Is PR size appropriate (around 500-1000 lines)?
- [ ] Is it reviewable?

#### Rollback Preparation

- [ ] Are rollback criteria for coverage decrease understood?
- [ ] Is rollback procedure for problems known?
- [ ] Is there a plan to return to 100% coverage ultimately?

---

## 9. Test Strategy Documentation

Document complex test strategies to improve future maintainability.

### 9.1 JSDoc Comments for Complex Test Strategies

Add JSDoc comments at the beginning of test files to explain test strategies.

#### Basic Pattern

```typescript
/**
 * Test strategy for [functionName]
 *
 * @description
 * [Brief description of the function]
 *
 * @equivalenceClasses
 * - Class 1: [description] → [expected behavior]
 * - Class 2: [description] → [expected behavior]
 * - Class 3: [description] → [expected behavior]
 *
 * @boundaryValues
 * - [Boundary value description]
 * - [Boundary value description]
 *
 * @edgeCases
 * - [Edge case description]
 * - [Edge case description]
 *
 * @testData
 * [Test data reference location or sharing method]
 *
 * @references
 * [Related functions or documents]
 */
```

#### Example: addDays Function

```typescript
/**
 * Test strategy for addDays
 *
 * @description
 * Adds a specified number of days to a date and returns a new Date object.
 *
 * @equivalenceClasses
 * - Class 1: Negative days (days < 0) → Returns past date
 * - Class 2: Zero days (days === 0) → Returns same date
 * - Class 3: Positive days (days > 0) → Returns future date
 * - Class 4: Decimal days (days % 1 !== 0) → floor(days) applied
 *
 * @boundaryValues
 * - Month boundaries: Jan 31 + 1 day → Feb 1
 * - Year boundaries: Dec 31 + 1 day → Jan 1 next year
 * - Leap year: Feb 28 + 1 day (non-leap) vs Feb 29 + 1 day (leap)
 * - MIN_TIMESTAMP and MAX_TIMESTAMP boundaries
 *
 * @edgeCases
 * - Invalid Date input → returns Invalid Date
 * - NaN, Infinity, -Infinity → returns Invalid Date
 * - Very large positive/negative days → may exceed timestamp limits
 *
 * @testData
 * Test data is shared with subDays function.
 * Defined in: tests/_fixtures/days-arithmetic-data.ts
 * For addDays: use expected as-is
 * For subDays: invert days and expected
 *
 * @references
 * - Related function: subDays (inverse operation)
 * - Design doc: docs/guidelines/test-design.md (Section 1, 2, 4)
 * - Requirement: R1.1, R2.1, R3.1, R3.2 in requirements.md
 */

import { describe, it, expect } from 'vitest';
import { addDays } from '../src/addDays';
import { DAYS_ARITHMETIC_DATA } from './_fixtures/days-arithmetic-data';

describe('addDays', () => {
  // Test code...
});
```

#### Example: isBefore Function (Complex Comparison Function)

```typescript
/**
 * Test strategy for isBefore
 *
 * @description
 * Checks if the first date is before the second date.
 * Supports both millisecond-level and unit-based comparisons.
 *
 * @equivalenceClasses
 * - Class 1: dateA < dateB (any unit) → true
 * - Class 2: dateA === dateB (any unit) → false
 * - Class 3: dateA > dateB (any unit) → false
 * - Class 4: Invalid Date input → false
 *
 * @boundaryValues
 * - Exactly 1ms before: (dateA + 1ms) vs dateB
 * - Exactly equal: dateA vs dateA
 * - Exactly 1ms after: (dateA - 1ms) vs dateB
 * - Unit boundaries: 23:59:59.999 (end of day) vs 00:00:00.000 (start of next day)
 *
 * @edgeCases
 * - Both dates are Invalid Date → false
 * - One date is Invalid Date → false
 * - MIN_TIMESTAMP vs MAX_TIMESTAMP
 * - Same timestamp, different unit comparisons
 *
 * @testData
 * Test data is shared with isAfter function.
 * Defined in: tests/_fixtures/comparison-data.ts
 * For isBefore: use expected as-is
 * For isAfter: invert expected (true ↔ false)
 *
 * @categoryValues
 * Time units: 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'
 * All units must be tested exhaustively.
 *
 * @references
 * - Related function: isAfter (inverse expected)
 * - Related function: isBeforeOrEqual (inclusive version)
 * - Design doc: docs/guidelines/test-design.md (Section 2, 3, 5)
 * - Requirement: R2.3, R3.1, R4.1 in requirements.md
 */

import { describe, it, expect } from 'vitest';
import { isBefore } from '../src/isBefore';
import { COMPARISON_DATA } from './_fixtures/comparison-data';

describe('isBefore', () => {
  // Test code...
});
```

### 9.2 Document Equivalence Partitioning Rationale in Comments

Clearly document the rationale for equivalence class partitioning in comments.

#### Pattern 1: Comments within Test Files

```typescript
describe('addDays', () => {
  describe('equivalence partitioning', () => {
    /**
     * Equivalence partitioning rationale:
     *
     * Input domain: days (number type)
     *
     * Class 1: days < 0 (negative numbers)
     * - Rationale: Negative days mean calculation towards the past, requiring different logic than positive days
     * - Representative values: -1, -30, -365
     *
     * Class 2: days === 0 (zero)
     * - Rationale: Zero is a special case where the date remains unchanged
     * - Representative value: 0
     *
     * Class 3: days > 0 (positive numbers)
     * - Rationale: Positive days mean calculation towards the future, most common case
     * - Representative values: 1, 30, 365
     *
     * Class 4: days % 1 !== 0 (decimals)
     * - Rationale: Decimal days are floored, requiring special handling
     * - Representative values: 1.5, -2.7, 0.9
     *
     * Class 5: Invalid values (NaN, Infinity)
     * - Rationale: Invalid inputs require error handling
     * - Representative values: NaN, Infinity, -Infinity
     */

    it.each([
      // Class 1: Negative numbers
      { days: -1, desc: 'negative: -1 day' },
      { days: -30, desc: 'negative: -30 days' },
      { days: -365, desc: 'negative: -365 days' },

      // Class 2: Zero
      { days: 0, desc: 'zero: no change' },

      // Class 3: Positive numbers
      { days: 1, desc: 'positive: 1 day' },
      { days: 30, desc: 'positive: 30 days' },
      { days: 365, desc: 'positive: 365 days' },

      // Class 4: Decimals
      { days: 1.5, desc: 'decimal: 1.5 days (floored to 1)' },
      { days: -2.7, desc: 'decimal: -2.7 days (floored to -2)' },
    ])('$desc', ({ days }) => {
      // Test logic
    });
  });
});
```

#### Pattern 2: Comments in Shared Test Data Files

```typescript
// tests/_fixtures/days-arithmetic-data.ts

/**
 * Shared test data for addDays and subDays functions
 *
 * Equivalence partitioning rationale:
 *
 * Input domain: days (number)
 * - Class 1: days < 0 → Returns past date
 * - Class 2: days === 0 → Returns same date
 * - Class 3: days > 0 → Returns future date
 * - Class 4: days with decimal → Floored with floor(days)
 *
 * Usage:
 * - addDays: Use { base, days, expected } as-is
 * - subDays: Use as { base, days: -days, expected } (invert days)
 */

export const DAYS_ARITHMETIC_DATA = [
  // Class 1: Negative days
  {
    base: new Date(2025, 0, 15),
    days: -5,
    expected: new Date(2025, 0, 10),
    desc: 'negative days: -5',
  },
  // ... Other test cases
] as const;
```

### 9.3 Category Value Checklist Comments

When exhaustively testing category values, explicitly document checklists in comments.

#### Pattern 1: Month (1-12) Checklist

```typescript
describe('getMonth', () => {
  /**
   * Category values: Months (1-12)
   *
   * Checklist (verify all months are tested):
   * ✓ 1: January (31 days)
   * ✓ 2: February (28 or 29 days)
   * ✓ 3: March (31 days)
   * ✓ 4: April (30 days)
   * ✓ 5: May (31 days)
   * ✓ 6: June (30 days)
   * ✓ 7: July (31 days)
   * ✓ 8: August (31 days)
   * ✓ 9: September (30 days)
   * ✓ 10: October (31 days)
   * ✓ 11: November (30 days)
   * ✓ 12: December (31 days)
   */

  it.each([
    { date: new Date(2025, 0, 1), expected: 1, name: 'January' },
    { date: new Date(2025, 1, 1), expected: 2, name: 'February' },
    { date: new Date(2025, 2, 1), expected: 3, name: 'March' },
    { date: new Date(2025, 3, 1), expected: 4, name: 'April' },
    { date: new Date(2025, 4, 1), expected: 5, name: 'May' },
    { date: new Date(2025, 5, 1), expected: 6, name: 'June' },
    { date: new Date(2025, 6, 1), expected: 7, name: 'July' },
    { date: new Date(2025, 7, 1), expected: 8, name: 'August' },
    { date: new Date(2025, 8, 1), expected: 9, name: 'September' },
    { date: new Date(2025, 9, 1), expected: 10, name: 'October' },
    { date: new Date(2025, 10, 1), expected: 11, name: 'November' },
    { date: new Date(2025, 11, 1), expected: 12, name: 'December' },
  ])('should return $expected for $name', ({ date, expected }) => {
    expect(getMonth(date)).toBe(expected);
  });
});
```

#### Pattern 2: Day of Week (0-6) Checklist

```typescript
describe('getDay', () => {
  /**
   * Category values: Day of week (0-6)
   *
   * Checklist (verify all weekdays are tested):
   * ✓ 0: Sunday
   * ✓ 1: Monday
   * ✓ 2: Tuesday
   * ✓ 3: Wednesday
   * ✓ 4: Thursday
   * ✓ 5: Friday
   * ✓ 6: Saturday
   */

  it.each([
    { date: new Date(2025, 0, 5), expected: 0, name: 'Sunday' },    // 2025-01-05 is Sunday
    { date: new Date(2025, 0, 6), expected: 1, name: 'Monday' },
    { date: new Date(2025, 0, 7), expected: 2, name: 'Tuesday' },
    { date: new Date(2025, 0, 8), expected: 3, name: 'Wednesday' },
    { date: new Date(2025, 0, 9), expected: 4, name: 'Thursday' },
    { date: new Date(2025, 0, 10), expected: 5, name: 'Friday' },
    { date: new Date(2025, 0, 11), expected: 6, name: 'Saturday' },
  ])('should return $expected for $name', ({ date, expected }) => {
    expect(getDay(date)).toBe(expected);
  });
});
```

#### Pattern 3: Time Unit Checklist

```typescript
describe('isBefore with unit option', () => {
  /**
   * Category values: Time units
   *
   * Checklist (verify all units are tested):
   * ✓ 'year'
   * ✓ 'month'
   * ✓ 'day'
   * ✓ 'hour'
   * ✓ 'minute'
   * ✓ 'second'
   * ✓ 'millisecond'
   */

  const baseDate = new Date(2025, 0, 15, 12, 30, 45, 500);

  it.each([
    {
      unit: 'year' as const,
      dateA: new Date(2024, 0, 1),
      dateB: new Date(2025, 0, 1),
      expected: true,
      desc: 'year unit: 2024 < 2025',
    },
    {
      unit: 'month' as const,
      dateA: new Date(2025, 0, 1),
      dateB: new Date(2025, 1, 1),
      expected: true,
      desc: 'month unit: January < February',
    },
    {
      unit: 'day' as const,
      dateA: new Date(2025, 0, 1),
      dateB: new Date(2025, 0, 2),
      expected: true,
      desc: 'day unit: 1st < 2nd',
    },
    {
      unit: 'hour' as const,
      dateA: new Date(2025, 0, 1, 10),
      dateB: new Date(2025, 0, 1, 11),
      expected: true,
      desc: 'hour unit: 10:00 < 11:00',
    },
    {
      unit: 'minute' as const,
      dateA: new Date(2025, 0, 1, 10, 30),
      dateB: new Date(2025, 0, 1, 10, 31),
      expected: true,
      desc: 'minute unit: 10:30 < 10:31',
    },
    {
      unit: 'second' as const,
      dateA: new Date(2025, 0, 1, 10, 30, 45),
      dateB: new Date(2025, 0, 1, 10, 30, 46),
      expected: true,
      desc: 'second unit: :45 < :46',
    },
    {
      unit: 'millisecond' as const,
      dateA: new Date(2025, 0, 1, 10, 30, 45, 500),
      dateB: new Date(2025, 0, 1, 10, 30, 45, 501),
      expected: true,
      desc: 'millisecond unit: 500ms < 501ms',
    },
  ])('$desc', ({ unit, dateA, dateB, expected }) => {
    expect(isBefore(dateA, dateB, { unit })).toBe(expected);
  });
});
```

#### Pattern 4: Locale Checklist

```typescript
describe('format with locale', () => {
  /**
   * Category values: Locale
   *
   * Checklist (verify all supported locales are tested):
   * ✓ en-US (English - United States)
   * ✓ ja (Japanese)
   * ✓ undefined (system default)
   */

  const testDate = new Date(2025, 0, 1); // January 1, 2025

  it.each([
    {
      locale: 'en-US' as const,
      expected: 'January',
      desc: 'en-US locale: January',
    },
    {
      locale: 'ja' as const,
      expected: '1月',
      desc: 'ja locale: 1月',
    },
    {
      locale: undefined,
      expected: expect.stringMatching(/January|1月/),
      desc: 'undefined locale: system default',
    },
  ])('$desc', ({ locale, expected }) => {
    expect(format(testDate, 'MMMM', { locale })).toEqual(expected);
  });
});
```

### 9.4 Test Strategy Documentation Checklist

#### JSDoc Comments

- [ ] Is there a JSDoc comment at the beginning of the test file?
- [ ] Is there a brief function description in `@description`?
- [ ] Are equivalence classes defined in `@equivalenceClasses`?
- [ ] Are boundary values defined in `@boundaryValues`?
- [ ] Are edge cases defined in `@edgeCases`?
- [ ] Is test data reference location documented in `@testData`?
- [ ] Are links to related documents in `@references`?

#### Equivalence Partitioning Rationale

- [ ] Is the rationale for equivalence class partitioning explained in comments?
- [ ] Are representative values for each equivalence class specified?
- [ ] Is it explained why each equivalence class is necessary?

#### Category Value Checklist

- [ ] Is a category value checklist included in comments?
- [ ] Are all category values listed with checkmarks?
- [ ] Does test data in `it.each` match the checklist?
- [ ] Can you verify no category values are missing?

## 10. Test Template Reference

### 10.1 Template Overview

The Chronia project provides standardized test templates for each function category. These templates serve as implementation examples of the test design techniques (equivalence partitioning, boundary value analysis, category value testing) explained in this guideline and can be referenced when creating tests for new functions.

**Template Location**: `docs/guidelines/test-templates/`

**Usage**:

1. Select the template file corresponding to the target function's category
2. Copy the template as `tests/{functionName}.test.ts`
3. Edit function names and test cases to match the actual function
4. Add function-specific test cases (leap years, month boundaries, etc.)
5. Remove unnecessary test cases

### 10.2 Core Templates

#### Arithmetic Template (`arithmetic.template.test.ts`)

**Target Functions**:

- `addYears`, `addMonths`, `addDays`, `addHours`, `addMinutes`, `addSeconds`, `addMilliseconds`
- `subYears`, `subMonths`, `subDays`, `subHours`, `subMinutes`, `subSeconds`, `subMilliseconds`
- `diffYears`, `diffMonths`, `diffDays`, `diffHours`, `diffMinutes`, `diffSeconds`, `diffMilliseconds`

**Included Test Cases**:

- Equivalence partitioning: Positive numbers, negative numbers, zero, decimals
- Boundary values: Month boundaries, year boundaries, February in leap years
- Edge cases: NaN, Infinity, Invalid Date
- Test data sharing pattern for paired functions (addDays/subDays)

**Usage Example**:

When creating a new arithmetic function (e.g., `addWeeks`), copy this template, replace `addDays` with `addWeeks`, and adjust test cases for week units.

#### Comparison Template (`comparison.template.test.ts`)

**Target Functions**:

- `isEqual`, `isBefore`, `isAfter`, `isBeforeOrEqual`, `isAfterOrEqual`
- `isBetween`
- `compare`

**Included Test Cases**:

- Equivalence partitioning: Before (a < b), after (a > b), equal (a === b)
- Category values: All time units (year, month, day, hour, minute, second, millisecond)
- Boundary values: Boundary dates (leap years, end of month, year boundaries)
- Edge cases: Invalid Date, NaN
- Test data sharing pattern for paired functions (isBefore/isAfter)
- Hierarchical test strategy (basic → inclusive → range → general)

**Usage Example**:

When creating a new comparison function, copy this template and include tests for all time unit options.

#### Getter Template (`getter.template.test.ts`)

**Target Functions**:

- `getYear`, `getMonth`, `getDay`, `getHours`, `getMinutes`, `getSeconds`, `getMilliseconds`
- `getTime`, `getDayOfWeek`, `getDayOfYear`, `getWeekOfYear`

**Included Test Cases**:

- Equivalence partitioning: Valid dates, invalid dates
- Category values: All months (0-11), all weekdays (0-6)
- Boundary values: Minimum value, maximum value
- Edge cases: Invalid Date, NaN

**Usage Example**:

When creating a new getter function, copy this template and include exhaustive category value tests.

#### Setter Template (`setter.template.test.ts`)

**Target Functions**:

- `setYear`, `setMonth`, `setDay`, `setHours`, `setMinutes`, `setSeconds`, `setMilliseconds`
- `setTime`

**Included Test Cases**:

- Equivalence partitioning: Valid values (0-11), out-of-range values (-1, 12)
- Category values: All months (0-11), boundary values (0, 1, 11, 12)
- Boundary values: February 29th in leap years, end-of-month dates (28/29/30/31)
- Edge cases: Invalid Date, NaN, Infinity

**Usage Example**:

When creating a new setter function, copy this template and include tests for date adjustment and overflow.

#### Format/Parse Template (`format-parse.template.test.ts`)

**Target Functions**:

- `format`, `parse`

**Included Test Cases**:

- Equivalence partitioning: Valid patterns, invalid patterns
- Category values: All tokens (year, month, day, hour, minute, second, millisecond), all locales (en-US, ja, unspecified)
- Boundary values: Min/max years, leap years, BC/AD
- Edge cases: Invalid Date, empty string, invalid patterns
- Round-trip property (format(parse(str)) === str)

**Usage Example**:

When creating a new format function, copy this template and include tests for all tokens and locales.

### 10.3 Extended Templates

#### Truncation Template (`truncation.template.test.ts`)

**Target Functions**:

- `truncYear`, `truncMonth`, `truncDay`, `truncHour`, `truncMinute`, `truncSecond`, `truncMillisecond`

**Included Test Cases**:

- Equivalence partitioning: Valid dates, invalid dates
- Category values: All time units (year, month, day, hour, minute, second, millisecond)
- Idempotency test: `truncDay(truncDay(date))` === `truncDay(date)`
- Edge cases: Invalid Date, NaN

**Usage Example**:

When creating a new truncation function, copy this template and include idempotency tests.

#### Boundary Template (`boundary.template.test.ts`)

**Target Functions**:

- `startOfYear`, `startOfMonth`, `startOfDay`
- `endOfYear`, `endOfMonth`, `endOfDay`

**Included Test Cases**:

- Equivalence partitioning: Valid dates, invalid dates
- Category values: All months (1-12), leap years/non-leap years
- Boundary values: End-of-month date variations (28/29/30/31)
- Edge cases: Invalid Date, NaN
- Test data sharing pattern for paired functions (startOfYear/endOfYear)

**Usage Example**:

When creating a new boundary function, copy this template and include tests for the start/end of all months.

#### Validation Template (`validation.template.test.ts`)

**Target Functions**:

- `isDate`, `isExists`, `isValid`

**Included Test Cases**:

- `isDate`: Test all types (Date, number, string, null, undefined, object)
- `isExists`: Test leap years, end-of-month dates, out-of-range values
- `isValid`: Test Invalid Date, NaN, valid dates
- Edge cases: Boundary values (minimum/maximum years)

**Usage Example**:

When creating a new validation function, copy this template and include tests for all types and boundary values.

#### Utility Template (`utility.template.test.ts`)

**Target Functions**:

- `min`, `max`, `now`, `clamp`

**Included Test Cases**:

- `min`/`max`: Test empty array, single element, multiple elements, mixed Invalid Dates
- `now`: Test comparison with mocked time
- `clamp`: Test within range, outside range (below minimum, above maximum)
- Edge cases: Invalid Date, NaN, Infinity

**Usage Example**:

When creating a new utility function, copy this template and adjust it to match the function-specific logic.

### 10.4 Template Selection Guide

When creating tests for a new function and unsure which template to use, refer to the following flowchart:

```text
What is the function's primary operation?
│
├─ Date/time addition, subtraction, difference calculation
│  → Arithmetic template
│
├─ Date/time comparison (greater/less than, equality)
│  → Comparison template
│
├─ Retrieve date/time component (year, month, day, etc.)
│  → Getter template
│
├─ Set date/time component (year, month, day, etc.)
│  → Setter template
│
├─ Format date (to string) or parse (string to Date)
│  → Format/Parse template
│
├─ Truncate date/time to specific unit
│  → Truncation template
│
├─ Get start/end of period (start of year, end of month, etc.)
│  → Boundary template
│
├─ Validate date/time (existence check, validity check)
│  → Validation template
│
└─ Other utilities (min/max, range constraint, etc.)
   → Utility template
```

### 10.5 Template Customization

Use templates as a starting point and customize them to match the function's specifications:

**Test Cases to Add**:

- Function-specific business logic
- Function-specific edge cases
- Optional parameter variations
- Complex conditional branches

**Test Cases to Remove**:

- Test cases that don't apply to the function's specifications
- Duplicate test cases
- Parameter types the function doesn't accept

**Comment Updates**:

- Update the template's JSDoc comments to match the function's specifications
- Rewrite equivalence partitioning rationale to function-specific content
- Update category value checklists to the actual categories the function handles

### 10.6 Template and Guideline Relationship

Each template provides implementation examples for the following sections of this guideline:

| Template | Related Sections |
|----------|------------------|
| Arithmetic | 1. Equivalence Partitioning / 2. Boundary Value Analysis / 4. Test Consistency Patterns |
| Comparison | 1. Equivalence Partitioning / 3. Category Value Coverage / 4. Test Consistency Patterns |
| Getter | 1. Equivalence Partitioning / 3. Category Value Coverage |
| Setter | 1. Equivalence Partitioning / 2. Boundary Value Analysis / 3. Category Value Coverage |
| Format/Parse | 1. Equivalence Partitioning / 3. Category Value Coverage |
| Truncation | 1. Equivalence Partitioning / 3. Category Value Coverage |
| Boundary | 1. Equivalence Partitioning / 2. Boundary Value Analysis / 3. Category Value Coverage |
| Validation | 1. Equivalence Partitioning / 2. Boundary Value Analysis |
| Utility | 1. Equivalence Partitioning / 4. Edge Case Coverage |

**Recommended Workflow**:

1. Understand the theory of equivalence partitioning, boundary value analysis, and category value testing in this guideline
2. Reference the corresponding template to see implementation patterns
3. Copy the template and customize it to match the function's specifications
4. Return to this guideline to validate the test design
