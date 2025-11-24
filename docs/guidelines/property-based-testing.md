# Property-Based Testing Guidelines

## Purpose

This document defines the standards and best practices for Property-Based Testing (PBT) in the Chronia library. PBT validates that implementations satisfy specification requirements across a comprehensive range of automatically generated test cases.

Use this guideline when creating property-based tests to verify functions against their specifications.

## Overview

Property-Based Testing is a complementary testing approach that:

- **Validates Specifications**: Verifies implementation matches formal specification requirements
- **Generates Test Cases**: Automatically creates diverse test inputs using fast-check library
- **Discovers Edge Cases**: Finds unexpected behaviors through randomized testing
- **Ensures Correctness**: Provides mathematical confidence in implementation correctness

**Relationship to TDD**:

- **TDD (Phase 1)**: Example-based tests that verify specific behaviors
- **PBT (Phase 2)**: Property-based tests that verify general invariants and specification compliance

Both approaches are complementary and should be used together for comprehensive coverage.

### PBT Test Coverage Strategy

PBT focuses on **probabilistic verification of requirements-based acceptance criteria**:

- **Random Input Generation**: Automatically generates large volumes of test inputs
- **Invariant Verification**: Verifies properties that must hold for all valid inputs
- **Requirements-Based**: Tests verify implementation satisfies requirement properties
- **Acceptance Testing**: Acts as automated acceptance tests for specifications
- **Probabilistic Coverage**: High volume compensates for randomness
- **Property Focus**: Tests what should always be true, not specific cases

**Example of Property vs Example**:

```typescript
// TDD Example Test (specific, deterministic):
it('should add 5 days correctly', () => {
  const date = new Date(2025, 0, 1);
  const result = addDays(date, 5);
  expect(result.getDate()).toBe(6);
});

// PBT Property Test (general, probabilistic):
it('should satisfy: add then subtract returns original', () => {
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
  // Runs 100 times with random inputs by default
});
```

### PBT vs Test-Driven Development

**Property-Based Testing (this guideline)**:

- **Test Strategy**: Random input generation + invariant verification
- **Test Data**: Large volume (100-10000) of randomly generated inputs
- **Coverage**: Probabilistic verification of requirement properties
- **Focus**: Properties and invariants from requirements that must always hold
- **Basis**: Requirements documents (`.kiro/specs/<spec-name>/requirements.md`)
- **Nature**: Probabilistic, high-volume acceptance testing
- **Test Type**: Automated acceptance tests for specifications

**TDD** (see [Test-Driven Development Guidelines](./test-driven-development.md)):

- **Test Strategy**: Equivalence partitioning + boundary value analysis
- **Test Data**: Minimal, carefully selected representative and boundary values
- **Coverage**: Formal, rigorous verification of design specifications
- **Focus**: Minimal normal cases, maximum edge cases and error conditions
- **Basis**: Design documents and interface specifications
- **Nature**: Deterministic, minimal unit testing
- **Test Type**: Formal verification of design implementation

**Key Difference**: PBT generates large volumes of random inputs to probabilistically verify requirements hold, while TDD uses minimal carefully-selected inputs to rigorously verify design implementation. PBT tests **what should always be true** (requirements), TDD tests **what should happen** (design).

---

## When to Use PBT

### Required Scenarios

Property-Based Testing is **REQUIRED** when:

1. **Specification Exists**: A formal specification exists in `.kiro/specs/<spec-name>/`
2. **Functions Created/Modified**: Public functions have been created or modified
3. **Properties Defined**: The specification defines testable properties or invariants

### Optional Scenarios

Consider PBT even without formal specs when:

- Testing mathematical operations with known properties
- Verifying round-trip transformations
- Ensuring invariants hold across wide input ranges
- Comparing implementation against reference implementations

---

## Test Scope

### What to Test

**Include**:

- All public functions exported from `src/*/index.ts` files
- Functions with specifications in `.kiro/specs/<spec-name>/requirements.md`
- Functions with defined properties or invariants in requirements

**Exclude**:

- Internal implementation files matching `src/_lib/**/*.ts`
- Helper functions not exposed in public API
- Functions without testable properties in requirements

### Requirements-Based Acceptance Testing

PBT serves as **automated acceptance testing** for specifications:

**Purpose**: Verify that implementation satisfies acceptance criteria defined in requirements

**Approach**:

1. **Read Requirements**: Extract testable properties from `.kiro/specs/<spec-name>/requirements.md`
2. **Define Properties**: Translate "system shall" statements into property tests
3. **Generate Inputs**: Use arbitraries to generate comprehensive test data
4. **Verify Invariants**: Ensure properties hold across all generated inputs

**Example - Requirement to Property Translation**:

```markdown
<!-- From requirements.md -->
## Requirement 2: Date Comparison

When the system compares two dates:
- The system shall return true if the first date chronologically precedes the second date
- The system shall return false if the first date is equal to or follows the second date
- The system shall satisfy transitivity: if A < B and B < C, then A < C
```

```typescript
// Translated to PBT properties:
describe('Date Comparison - Requirements Verification', () => {
  it('Req 2.1: should return true when first precedes second', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.date(),
        (a, b) => {
          fc.pre(a.getTime() < b.getTime());
          expect(isBefore(a, b)).toBe(true);
        }
      )
    );
  });

  it('Req 2.3: should satisfy transitivity property', () => {
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

**Note**: PBT does **not** test specific boundary values (that's TDD's job). PBT tests that properties **always hold**, regardless of inputs.

---

## Validation Strategies

For each function under test, verify correctness by comparing outputs with:

### 1. Native JavaScript Functions

Compare Chronia functions with equivalent native JavaScript APIs:

```typescript
import * as fc from 'fast-check';
import { getYear } from '../../../src/getYear';

describe('getYear - PBT', () => {
  it('should match native Date.getFullYear()', () => {
    fc.assert(
      fc.property(fc.date(), (date) => {
        expect(getYear(date)).toBe(date.getFullYear());
      })
    );
  });
});
```

### 2. Reference Library (date-fns)

Compare against date-fns for date/time operations:

```typescript
import * as fc from 'fast-check';
import { addDays } from '../../../src/addDays';
import { addDays as dateFnsAddDays } from 'date-fns';

describe('addDays - PBT', () => {
  it('should match date-fns addDays behavior', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -10000, max: 10000 }),
        (date, days) => {
          const chroniaResult = addDays(date, days);
          const dateFnsResult = dateFnsAddDays(date, days);
          expect(chroniaResult.getTime()).toBe(dateFnsResult.getTime());
        }
      )
    );
  });
});
```

### 3. Mathematical Properties

Verify mathematical invariants and properties:

```typescript
describe('addDays - PBT', () => {
  it('should satisfy associativity: add(add(d,a),b) = add(d,a+b)', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -1000, max: 1000 }),
        fc.integer({ min: -1000, max: 1000 }),
        (date, a, b) => {
          const result1 = addDays(addDays(date, a), b);
          const result2 = addDays(date, a + b);
          expect(result1.getTime()).toBe(result2.getTime());
        }
      )
    );
  });
});
```

### 4. Specification-Defined Invariants

Verify properties explicitly stated in requirements:

```typescript
describe('isBefore - PBT', () => {
  it('should satisfy spec requirement: never true for equal dates', () => {
    fc.assert(
      fc.property(fc.date(), (date) => {
        // Requirement 2.1: isBefore returns false for equal dates
        expect(isBefore(date, date)).toBe(false);
      })
    );
  });
});
```

**Important**: Some functions may have intentional behavioral differences from standard implementations. When tests fail, consult the specification before assuming it's a bug.

---

## Test File Structure

### File Location

Place PBT test files following this pattern:

```text
.kiro/specs/<spec-name>/<function-name>.pbt.test.ts
```

**Examples**:

```text
.kiro/specs/date-validation/isValid.pbt.test.ts
.kiro/specs/date-arithmetic/addDays.pbt.test.ts
.kiro/specs/date-comparison/isBefore.pbt.test.ts
```

### File Template

```typescript
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { functionName } from '../../../src/category/functionName';
import { referenceFn } from 'date-fns'; // If comparing against reference

describe('functionName - Property-Based Tests', () => {
  describe('specification compliance', () => {
    it('should satisfy property: [property description from spec]', () => {
      fc.assert(
        fc.property(
          // Arbitraries (input generators)
          fc.date(),
          fc.integer(),
          // Property function
          (date, amount) => {
            const result = functionName(date, amount);
            // Assertions
            expect(result).toSatisfy(condition);
          }
        )
      );
    });
  });

  describe('reference implementation comparison', () => {
    it('should match date-fns behavior', () => {
      fc.assert(
        fc.property(
          fc.date(),
          (date) => {
            expect(functionName(date)).toEqual(referenceFn(date));
          }
        )
      );
    });
  });

  describe('mathematical properties', () => {
    it('should satisfy [mathematical property]', () => {
      fc.assert(
        fc.property(
          // Appropriate arbitraries
          (inputs) => {
            // Verify mathematical property
          }
        )
      );
    });
  });
});
```

---

## Arbitraries

Arbitraries are input generators that create test data. Choose appropriate arbitraries for comprehensive coverage.

### Built-in Arbitraries

#### Date Arbitraries

```typescript
// Any date
fc.date()

// Date within range
fc.date({ min: new Date(2000, 0, 1), max: new Date(2050, 11, 31) })

// Recent dates only
fc.date({ min: new Date(Date.now() - 86400000 * 365) })
```

#### Numeric Arbitraries

```typescript
// Any integer
fc.integer()

// Integer within range
fc.integer({ min: -100, max: 100 })

// Natural numbers (0 and positive)
fc.nat()

// Positive integers only
fc.integer({ min: 1 })
```

#### Other Common Arbitraries

```typescript
// Boolean
fc.boolean()

// String
fc.string()

// Array of values
fc.array(fc.integer())

// One of specific values
fc.constantFrom('year', 'month', 'day', 'hour')
```

### Custom Arbitraries

Create domain-specific arbitraries for complex types:

```typescript
// Valid timestamp arbitrary
const validTimestamp = fc.integer({
  min: -8640000000000000, // Min safe date
  max: 8640000000000000   // Max safe date
});

// TimeUnit arbitrary
const timeUnit = fc.constantFrom(
  'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'
);

// Date or timestamp arbitrary
const dateOrTimestamp = fc.oneof(
  fc.date(),
  validTimestamp
);

// Usage
fc.assert(
  fc.property(
    dateOrTimestamp,
    timeUnit,
    (dateInput, unit) => {
      // Test logic
    }
  )
);
```

### Filtering with Preconditions

Use `fc.pre()` to filter out invalid test cases:

```typescript
fc.assert(
  fc.property(
    fc.date(),
    fc.date(),
    (date1, date2) => {
      // Only test when date1 is before date2
      fc.pre(date1.getTime() < date2.getTime());

      expect(isBefore(date1, date2)).toBe(true);
    }
  )
);
```

**Warning**: Excessive filtering reduces test effectiveness. If more than 50% of generated values are filtered, reconsider your arbitrary design.

---

## Properties

Properties are invariants that must hold for all valid inputs. Design properties based on specification requirements.

### Property Categories

#### 1. Invariant Properties

Properties that must always hold:

```typescript
describe('invariants', () => {
  it('output should always be a valid date', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -10000, max: 10000 }),
        (date, days) => {
          const result = addDays(date, days);
          expect(isValid(result)).toBe(true);
        }
      )
    );
  });

  it('should never mutate input', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer(),
        (date, days) => {
          const original = date.getTime();
          addDays(date, days);
          expect(date.getTime()).toBe(original);
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
  it('add then subtract should return to original', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -10000, max: 10000 }),
        (date, amount) => {
          const added = addDays(date, amount);
          const result = subDays(added, amount);
          expect(result.getTime()).toBe(date.getTime());
        }
      )
    );
  });

  it('format then parse should preserve value', () => {
    fc.assert(
      fc.property(
        fc.date(),
        (date) => {
          const formatted = format(date, 'yyyy-MM-dd');
          const parsed = parse(formatted, 'yyyy-MM-dd');
          expect(startOfDay(parsed).getTime()).toBe(startOfDay(date).getTime());
        }
      )
    );
  });
});
```

#### 3. Comparison Properties

Properties involving ordering and comparisons:

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

  it('should be antisymmetric: if a ≤ b and b ≤ a, then a = b', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.date(),
        (a, b) => {
          fc.pre(isBeforeOrEqual(a, b) && isBeforeOrEqual(b, a));
          expect(a.getTime()).toBe(b.getTime());
        }
      )
    );
  });

  it('should satisfy trichotomy: exactly one of a<b, a=b, a>b', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.date(),
        (a, b) => {
          const before = isBefore(a, b);
          const equal = a.getTime() === b.getTime();
          const after = isAfter(a, b);

          const trueCount = [before, equal, after].filter(Boolean).length;
          expect(trueCount).toBe(1);
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

  it('absolute value should be idempotent', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        (n) => {
          const once = Math.abs(n);
          const twice = Math.abs(once);
          expect(once).toBe(twice);
        }
      )
    );
  });
});
```

#### 5. Associativity Properties

Operations where grouping doesn't matter:

```typescript
describe('associativity', () => {
  it('should satisfy: add(add(d,a),b) = add(d,a+b)', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.integer({ min: -1000, max: 1000 }),
        fc.integer({ min: -1000, max: 1000 }),
        (date, a, b) => {
          const left = addDays(addDays(date, a), b);
          const right = addDays(date, a + b);
          expect(left.getTime()).toBe(right.getTime());
        }
      )
    );
  });
});
```

#### 6. Specification Compliance Properties

Properties directly from specification requirements:

```typescript
describe('specification compliance', () => {
  it('should satisfy Requirement 1.2: handle epoch date', () => {
    fc.assert(
      fc.property(
        fc.constant(0), // Epoch timestamp
        (timestamp) => {
          expect(isValid(timestamp)).toBe(true);
        }
      )
    );
  });

  it('should satisfy Requirement 2.1: return false for equal dates', () => {
    fc.assert(
      fc.property(
        fc.date(),
        (date) => {
          expect(isBefore(date, date)).toBe(false);
        }
      )
    );
  });
});
```

---

## Edge Case Handling

### Boundary Values

Always test minimum, maximum, and boundary conditions:

```typescript
describe('boundary values', () => {
  it('should handle minimum safe date', () => {
    fc.assert(
      fc.property(
        fc.constant(new Date(-8640000000000000)),
        (minDate) => {
          expect(isValid(minDate)).toBe(true);
        }
      )
    );
  });

  it('should handle maximum safe date', () => {
    fc.assert(
      fc.property(
        fc.constant(new Date(8640000000000000)),
        (maxDate) => {
          expect(isValid(maxDate)).toBe(true);
        }
      )
    );
  });

  it('should handle epoch (zero)', () => {
    fc.assert(
      fc.property(
        fc.constant(0),
        (epoch) => {
          expect(isValid(epoch)).toBe(true);
          expect(getTime(epoch)).toBe(0);
        }
      )
    );
  });
});
```

### Invalid Inputs

Verify error handling matches specification:

```typescript
describe('invalid inputs', () => {
  it('should handle Invalid Date', () => {
    fc.assert(
      fc.property(
        fc.constant(new Date('invalid')),
        (invalidDate) => {
          expect(isValid(invalidDate)).toBe(false);
        }
      )
    );
  });

  it('should handle NaN', () => {
    fc.assert(
      fc.property(
        fc.constant(NaN),
        (nan) => {
          expect(isValid(nan)).toBe(false);
        }
      )
    );
  });

  it('should handle Infinity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(Infinity, -Infinity),
        (inf) => {
          expect(isValid(inf)).toBe(false);
        }
      )
    );
  });
});
```

### Special Values

Test with special cases mentioned in specifications:

```typescript
describe('special values', () => {
  it('should handle leap year dates', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2000, max: 2100 }).filter(y => y % 4 === 0),
        (leapYear) => {
          const leapDay = new Date(leapYear, 1, 29);
          expect(isValid(leapDay)).toBe(true);
          expect(getMonth(leapDay)).toBe(2); // March (1-indexed)
        }
      )
    );
  });

  it('should handle month boundaries', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 11 }),
        fc.integer({ min: 2000, max: 2100 }),
        (month, year) => {
          const lastDay = new Date(year, month + 1, 0);
          const nextDay = addDays(lastDay, 1);
          expect(getMonth(nextDay)).toBe((month + 2) % 12 || 12);
        }
      )
    );
  });
});
```

---

## Test Execution

### Running PBT Tests

```bash
# Run all property-based tests
pnpm test:pbt

# Run tests for specific spec
pnpm test:pbt date-validation

# Run specific PBT file
pnpm test:pbt date-validation/isValid
```

### Configuration

Adjust fast-check behavior in test files:

```typescript
// Increase number of test cases (default: 100)
fc.assert(
  fc.property(fc.date(), (date) => {
    // Property
  }),
  { numRuns: 1000 } // Run 1000 test cases
);

// Set seed for reproducible tests
fc.assert(
  fc.property(fc.date(), (date) => {
    // Property
  }),
  { seed: 42 } // Use specific seed
);

// Configure timeout
fc.assert(
  fc.property(fc.date(), (date) => {
    // Property
  }),
  { timeout: 5000 } // 5 second timeout
);
```

### Probabilistic Nature of PBT

**Understanding Randomness**:

PBT is **probabilistic**, not exhaustive:

- **Cannot test all inputs**: Infinite input space makes exhaustive testing impossible
- **Random sampling**: Tests a random sample of the input space
- **High volume compensates**: Running 100-10000 tests provides high confidence
- **Probabilistic guarantee**: Not 100% certainty, but very high probability

**Comparison with TDD**:

| Aspect          | TDD                          | PBT                                      |
|-----------------|------------------------------|------------------------------------------|
| Test cases      | ~5-20 per function           | ~100-10000 per property                  |
| Coverage type   | Deterministic, specific      | Probabilistic, random                    |
| Certainty       | 100% for tested cases        | High probability across input space      |
| Purpose         | Verify design implementation | Verify requirement properties            |
| Focus           | Edge cases, boundaries       | Invariants, properties                   |

**When PBT Finds Bugs TDD Missed**:

PBT excels at finding:

- Unexpected input combinations TDD didn't consider
- Edge cases in the vast middle of the input space
- Violations of mathematical properties
- Requirement violations that weren't covered in design

**Example**:

```typescript
// TDD might test:
it('should handle Feb 28 in leap year', () => {
  const date = new Date(2024, 1, 28);
  const result = addDays(date, 1);
  expect(result.getDate()).toBe(29);
});

// PBT discovers the general property:
it('should never produce invalid dates', () => {
  fc.assert(
    fc.property(
      fc.date(),
      fc.integer({ min: -10000, max: 10000 }),
      (date, days) => {
        const result = addDays(date, days);
        expect(isValid(result)).toBe(true); // Found case: Feb 30!
      }
    )
  );
});
```

---

## Root Cause Analysis

When property-based tests fail, perform systematic root cause analysis:

### 1. Analyze the Failure

```typescript
// fast-check will show the failing case
// Property failed after 42 tests
// { seed: 1234567890, path: "42:0:1", endOnFailure: true }
// Counterexample: [Date(2025-02-30T00:00:00.000Z), 5]
```

**Questions to ask**:

- Is the input valid according to the specification?
- Does the specification address this scenario?
- Is the test property correctly implemented?
- Is this an implementation bug or a test bug?

### 2. Reproduce Locally

```typescript
// Use the counterexample to create a minimal reproduction
it('reproduce failure', () => {
  const date = new Date('2025-02-30'); // Invalid date
  const result = addDays(date, 5);
  expect(isValid(result)).toBe(true); // Fails
});
```

### 3. Compare Against Specification

Read the relevant section in `.kiro/specs/<spec-name>/requirements.md`:

```markdown
## Requirement 3: Invalid Input Handling

When the system receives an invalid Date object or timestamp:
- The system shall return an Invalid Date object
- The system shall not throw an exception
```

### 4. Categorize the Issue

#### Implementation Defect

The code doesn't match the specification:

```typescript
// Spec: "Should return Invalid Date for invalid input"
// Actual: Returns valid date
// Action: Fix implementation
```

#### Test Defect

The test has incorrect assumptions:

```typescript
// Bad test: Assumes Feb 30 is valid
fc.property(
  fc.integer({ min: 1, max: 31 }),
  (day) => {
    const date = new Date(2025, 1, day); // Feb can't have 31 days
    expect(isValid(date)).toBe(true); // Wrong assumption
  }
);

// Fixed: Use valid day ranges per month
```

#### Specification Ambiguity

The specification doesn't clearly define behavior:

```markdown
Issue: Spec doesn't specify behavior for Feb 30
Action: Request clarification from spec author
```

### 5. Resolution Process

**For Implementation Issues**:

1. Document the deviation
2. Ask user for decision (fix implementation or update spec)
3. Apply the fix
4. Re-run tests

**For Test Issues**:

1. Fix the test code
2. Re-run tests
3. Maximum 3 iterations before escalating

**For Ambiguities**:

1. Document the ambiguous scenario
2. Request clarification from user
3. Update specification
4. Update tests accordingly

---

## Best Practices

### 1. Map Tests to Requirements

Explicitly reference specification requirements:

```typescript
it('should satisfy Requirement 2.3: transitivity of comparison', () => {
  fc.assert(
    fc.property(
      // Property implementation
    )
  );
});
```

### 2. Use Descriptive Property Names

Make properties self-documenting:

```typescript
// Good
it('adding then subtracting same amount should return to original date', () => {});

// Bad
it('round trip works', () => {});
```

### 3. Keep Properties Simple

Each test should verify one property:

```typescript
// Good - single property
it('should be idempotent', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const once = startOfDay(date);
      const twice = startOfDay(once);
      expect(once.getTime()).toBe(twice.getTime());
    })
  );
});

// Bad - multiple properties
it('should be idempotent and associative', () => {
  // Testing too much in one test
});
```

### 4. Choose Appropriate Arbitraries

Match arbitraries to the input domain:

```typescript
// Good - domain-appropriate
fc.property(
  fc.integer({ min: 1, max: 12 }), // Months
  fc.integer({ min: 1, max: 31 }), // Days
  (month, day) => { /* ... */ }
);

// Bad - too broad, many invalid combinations
fc.property(
  fc.integer(),
  fc.integer(),
  (month, day) => { /* ... */ }
);
```

### 5. Document Preconditions

Make filtering logic clear:

```typescript
it('should satisfy property when dates are chronologically ordered', () => {
  fc.assert(
    fc.property(
      fc.date(),
      fc.date(),
      (a, b) => {
        // Precondition: only test when a comes before b
        fc.pre(a.getTime() < b.getTime());

        expect(isBefore(a, b)).toBe(true);
      }
    )
  );
});
```

### 6. Use Sufficient Test Runs

Adjust `numRuns` based on criticality:

```typescript
// Standard functions: default (100 runs)
fc.assert(fc.property(fc.date(), (date) => { /* ... */ }));

// Critical functions: increased runs
fc.assert(
  fc.property(fc.date(), (date) => { /* ... */ }),
  { numRuns: 1000 }
);

// Complex properties: even more runs
fc.assert(
  fc.property(fc.date(), fc.date(), (a, b) => { /* ... */ }),
  { numRuns: 10000 }
);
```

### 7. Avoid False Positives

Ensure test failures indicate real issues:

```typescript
// Bad - floating point comparison
expect(result).toBe(expected); // May fail due to precision

// Good - appropriate tolerance
expect(result).toBeCloseTo(expected, 5);

// Bad - assumes specific implementation
expect(internals.cache.size).toBe(0);

// Good - tests observable behavior
expect(functionName(input)).toBe(expectedOutput);
```

### 8. Compare with Reference Implementations

When available, validate against trusted libraries:

```typescript
import { addDays as dateFnsAddDays } from 'date-fns';

it('should match date-fns behavior', () => {
  fc.assert(
    fc.property(
      fc.date(),
      fc.integer({ min: -10000, max: 10000 }),
      (date, days) => {
        expect(addDays(date, days).getTime())
          .toBe(dateFnsAddDays(date, days).getTime());
      }
    )
  );
});
```

---

## Workflow Integration

### Phase 4: PBT Validation in Development Workflow

Property-Based Testing is Phase 4 in the Code Development Workflow:

```text
1. Design          → function-interface-designer
2. Implementation  → function-implementer (includes TDD)
3. Quality Check   → code-reviewer
4. PBT Validation  → pbt-spec-validator (this phase)
5. Documentation   → function-docs-writer
6. Commit & PR     → commit-pr-validator
```

### When to Run PBT

Run property-based tests:

- **After TDD tests pass**: All unit tests in `tests/` must pass first
- **After code review passes**: Code quality must be verified
- **Before documentation**: Ensure correctness before documenting
- **When spec exists**: Only when `.kiro/specs/<spec-name>/` exists

### Iterative Fix Process

If PBT tests fail:

1. **Analyze Failures**: Review failing test cases and counterexamples
2. **Fix Implementation**: Use `function-implementer` agent to fix issues
3. **Verify TDD Still Passes**: Ensure fixes don't break existing tests
4. **Re-run PBT**: Run `pbt-spec-validator` again
5. **Repeat**: Continue until all property-based tests pass

---

## Common Pitfalls

### 1. Over-filtering with fc.pre()

```typescript
// Bad - filters out 99% of inputs
fc.property(
  fc.integer(),
  (n) => {
    fc.pre(n > 0 && n < 10 && n % 2 === 0);
    // Only 4 valid values: 2, 4, 6, 8
  }
);

// Good - use appropriate arbitrary
fc.property(
  fc.integer({ min: 2, max: 8 }).filter(n => n % 2 === 0),
  (n) => {
    // More efficient
  }
);
```

### 2. Testing Implementation Details

```typescript
// Bad - tests internal structure
expect(internals.cache).toBeDefined();
expect(internals.cache.size).toBe(0);

// Good - tests observable behavior
expect(functionName(input1)).toBe(output1);
expect(functionName(input2)).toBe(output2);
```

### 3. Non-Deterministic Properties

```typescript
// Bad - uses current time
fc.property(fc.date(), (date) => {
  expect(isBefore(date, new Date())).toBe(/* ??? */); // Flaky
});

// Good - uses fixed reference
fc.property(fc.date(), (date) => {
  const reference = new Date('2025-01-01');
  expect(isBefore(date, reference)).toBe(date.getTime() < reference.getTime());
});
```

### 4. Incorrect Property Formulation

```typescript
// Bad - property is always true
fc.property(fc.date(), (date) => {
  expect(true).toBe(true); // Useless test
});

// Good - meaningful property
fc.property(fc.date(), (date) => {
  const result = startOfDay(date);
  expect(result.getHours()).toBe(0);
  expect(result.getMinutes()).toBe(0);
  expect(result.getSeconds()).toBe(0);
});
```

---

## See Also

- [Function Testing Guidelines](./function-testing.md) - General testing standards including TDD
- [Function Implementation Guidelines](./function-implementation.md) - Implementation best practices
- [Function Check Guidelines](./function-check.md) - Code quality verification
- [fast-check Documentation](https://fast-check.dev/) - Official fast-check library documentation
- [Property-Based Testing Patterns](https://fsharpforfunandprofit.com/posts/property-based-testing/) - Advanced PBT patterns and techniques
