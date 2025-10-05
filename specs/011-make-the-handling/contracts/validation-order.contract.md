# Contract: Validation Order for clamp Function

## Contract Definition

The `clamp` function MUST validate all input arguments BEFORE converting them to Date objects, following the established pattern used by `addDays`.

## Contract Rules

### Rule 1: Validate Before Convert
**Requirement**: Validation MUST occur on original arguments (Date | number)
**Implementation**: Call `isValidDateOrNumber()` on unconverted arguments
**Location**: First operation in function body, before any `new Date()` calls

### Rule 2: Early Return on Invalid Input
**Requirement**: Return Invalid Date immediately if any argument is invalid
**Implementation**: `return new Date(NaN)` when validation fails
**No Conversion**: Invalid arguments MUST NOT be converted to Date objects

### Rule 3: Convert Only After Validation
**Requirement**: Conversion to Date objects MUST happen only after validation passes
**Implementation**: `const dateObj = typeof date === "number" ? new Date(date) : date`
**Guarantee**: Only valid arguments are converted

### Rule 4: Use Standard Validators
**Requirement**: MUST use `isValidDateOrNumber()` from `_lib/validators`
**Prohibited**: Direct `isNaN(dateObj.getTime())` checks (max/min anti-pattern)
**Rationale**: Centralizes validation logic, validates before conversion

## Success Criteria

### Criteria 1: Validation Happens First
- [ ] `isValidDateOrNumber(date)` called before any `new Date(date)`
- [ ] `isValidDateOrNumber(minDate)` called before any `new Date(minDate)`
- [ ] `isValidDateOrNumber(maxDate)` called before any `new Date(maxDate)`

### Criteria 2: Code Structure
- [ ] Validation block at lines 43-46 (before conversion block)
- [ ] Conversion block at lines 48-51 (after validation block)
- [ ] No conversion operations in validation block
- [ ] No validation operations after conversion block

### Criteria 3: Consistency with addDays
- [ ] Same validation approach as `addDays` (validate original args)
- [ ] Same validator functions used (`isValidDateOrNumber`)
- [ ] Same error handling (return `new Date(NaN)`)

## Test Cases

### TC-1: Validation Rejects Invalid Date Before Conversion
```typescript
const invalidDate = new Date('invalid');
const validMin = new Date(2024, 5, 10);
const validMax = new Date(2024, 5, 20);
const result = clamp(invalidDate, validMin, validMax);

// Contract: Invalid Date detected in original form
expect(isNaN(result.getTime())).toBe(true);
```

### TC-2: Validation Rejects NaN Before Conversion
```typescript
const nanValue = NaN;
const validMin = Date.now();
const validMax = Date.now() + 1000;
const result = clamp(nanValue, validMin, validMax);

// Contract: NaN rejected by isValidNumber (before conversion)
expect(isNaN(result.getTime())).toBe(true);
```

### TC-3: Validation Rejects Infinity Before Conversion
```typescript
const infinityValue = Infinity;
const validMin = 0;
const validMax = 1000;
const result = clamp(infinityValue, validMin, validMax);

// Contract: Infinity rejected by isValidNumber (before conversion)
expect(isNaN(result.getTime())).toBe(true);
```

### TC-4: Valid Arguments Pass Validation, Then Convert
```typescript
const timestamp = Date.now();
const minTimestamp = timestamp - 1000;
const maxTimestamp = timestamp + 1000;
const result = clamp(timestamp, minTimestamp, maxTimestamp);

// Contract: Valid numbers pass validation, get converted, return valid Date
expect(result.getTime()).toBe(timestamp);
```

### TC-5: Mixed Invalid Arguments Fail Fast
```typescript
const validDate = new Date(2024, 5, 15);
const invalidMin = new Date('invalid');
const validMax = new Date(2024, 5, 20);
const result = clamp(validDate, invalidMin, validMax);

// Contract: Any invalid argument causes early return (no conversion)
expect(isNaN(result.getTime())).toBe(true);
```

## Verification Method

### Static Analysis
```bash
# Check that validation comes before conversion in source code
grep -A 10 "export function clamp" src/clamp/index.ts | grep -E "(isValidDateOrNumber|new Date)"

# Expected order:
# Line N:   if (!isValidDateOrNumber(...) || !isValidDateOrNumber(...) || !isValidDateOrNumber(...))
# Line N+1:     return new Date(NaN);
# Line N+2:
# Line N+3:   const dateObj = typeof date === "number" ? new Date(date) : date;
```

### Runtime Testing
```bash
# Run clamp test suite
npm test tests/clamp.test.ts

# All existing tests should pass (behavior unchanged)
# New validation-order tests verify contract compliance
```

### Integration Testing
```bash
# Run full test suite to ensure no regressions
npm test

# All 75+ test files should pass
```

## Failure Scenarios

### Violation 1: Conversion Before Validation
**Symptom**: `new Date()` called before `isValidDateOrNumber()`
**Impact**: Invalid arguments converted unnecessarily
**Detection**: Static analysis shows conversion precedes validation
**Fix**: Move validation block before conversion block

### Violation 2: Using Wrong Validator
**Symptom**: `isNaN(dateObj.getTime())` used instead of `isValidDateOrNumber()`
**Impact**: Validates after conversion (wrong order)
**Detection**: Code review or grep for isNaN
**Fix**: Replace with `isValidDateOrNumber(originalArg)`

### Violation 3: No Early Return
**Symptom**: Validation check exists but doesn't return on failure
**Impact**: Invalid arguments processed after conversion
**Detection**: Test with invalid input, check for Invalid Date
**Fix**: Add `return new Date(NaN)` after failed validation

## Acceptance Criteria

This contract is satisfied when:

1. ✅ Validation occurs before conversion (code order verified)
2. ✅ `isValidDateOrNumber()` used on original arguments (not converted)
3. ✅ Invalid arguments return `new Date(NaN)` without conversion
4. ✅ All test cases pass
5. ✅ Code structure matches addDays pattern
6. ✅ No regressions in existing test suite

## Related Contracts

- **addDays validation contract**: Model for validate-first pattern
- **isValidDateOrNumber contract**: Defines validation behavior
- **Error handling contract**: Invalid Date return for invalid inputs
