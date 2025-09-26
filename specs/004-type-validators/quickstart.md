# Quickstart: Type Validation Functions

## Overview
This guide demonstrates how to use the internal type validation functions in the chronia library. These functions are for internal use only and are not exported in the public API.

## Setup

### 1. Import the validators (internal use only)
```typescript
import { isValidDate, isValidNumber, isValidDateOrNumber } from '../_lib/validators';
```

## Basic Usage

### Validate Date Objects

```typescript
// Valid Date instances
console.log(isValidDate(new Date()));                    // true
console.log(isValidDate(new Date('2024-01-01')));       // true
console.log(isValidDate(new Date(2024, 0, 1)));         // true

// Invalid cases
console.log(isValidDate(new Date('invalid')));          // false
console.log(isValidDate(42));                           // false
console.log(isValidDate('2024-01-01'));                 // false
console.log(isValidDate(null));                         // false
console.log(isValidDate(undefined));                    // false
```

### Validate Numbers

```typescript
// Valid finite numbers
console.log(isValidNumber(42));                         // true
console.log(isValidNumber(3.14));                       // true
console.log(isValidNumber(0));                          // true
console.log(isValidNumber(-100));                       // true

// Invalid cases
console.log(isValidNumber(NaN));                        // false
console.log(isValidNumber(Infinity));                   // false
console.log(isValidNumber(-Infinity));                  // false
console.log(isValidNumber('42'));                       // false
console.log(isValidNumber(new Date()));                 // false
console.log(isValidNumber(null));                       // false
```

### Validate Date or Number

```typescript
// Valid dates or numbers
console.log(isValidDateOrNumber(new Date()));           // true
console.log(isValidDateOrNumber(42));                   // true
console.log(isValidDateOrNumber(3.14));                 // true

// Invalid cases
console.log(isValidDateOrNumber(new Date('invalid')));  // false
console.log(isValidDateOrNumber(NaN));                  // false
console.log(isValidDateOrNumber(Infinity));             // false
console.log(isValidDateOrNumber('42'));                 // false
console.log(isValidDateOrNumber(null));                 // false
```

## Integration Examples

### Using in a Date Function

```typescript
export function addDays(date: Date | number, amount: number): Date {
  // Validate input at the beginning
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  if (!isValidNumber(amount)) {
    return new Date(NaN);
  }

  // Process valid inputs
  const d = date instanceof Date ? date : new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}
```

### Using in a Comparison Function

```typescript
export function compare(
  dateLeft: Date,
  dateRight: Date,
  order: 'asc' | 'desc' = 'asc'
): number {
  // Strict validation with error throwing
  if (!isValidDate(dateLeft)) {
    throw new RangeError('First argument must be a valid Date');
  }
  if (!isValidDate(dateRight)) {
    throw new RangeError('Second argument must be a valid Date');
  }

  // Process valid dates
  const diff = dateLeft.getTime() - dateRight.getTime();
  return order === 'asc' ? Math.sign(diff) : Math.sign(-diff);
}
```

### Using as Type Guards

```typescript
function processValue(value: unknown) {
  if (isValidDate(value)) {
    // TypeScript now knows value is Date
    console.log(value.toISOString());
  } else if (isValidNumber(value)) {
    // TypeScript now knows value is number
    console.log(value.toFixed(2));
  } else {
    console.log('Invalid input');
  }
}
```

## Testing Validators

### Test Valid Inputs
```typescript
describe('isValidDate', () => {
  it('should return true for valid Date instances', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date('2024-01-01'))).toBe(true);
    expect(isValidDate(new Date(1704067200000))).toBe(true);
  });
});
```

### Test Edge Cases
```typescript
describe('edge cases', () => {
  it('should handle Invalid Date correctly', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate(new Date(NaN))).toBe(false);
  });

  it('should handle special number values', () => {
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
  });

  it('should handle null and undefined', () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidDateOrNumber(null)).toBe(false);
    expect(isValidDateOrNumber(undefined)).toBe(false);
  });
});
```

## Performance Verification

```typescript
// Performance test
const iterations = 1000000;
const testDate = new Date();
const testNumber = 42;

console.time('isValidDate');
for (let i = 0; i < iterations; i++) {
  isValidDate(testDate);
}
console.timeEnd('isValidDate'); // Should be < 100ms for 1M iterations

console.time('isValidNumber');
for (let i = 0; i < iterations; i++) {
  isValidNumber(testNumber);
}
console.timeEnd('isValidNumber'); // Should be < 100ms for 1M iterations
```

## Migration Guide

### Before (Inline Validation)
```typescript
export function someFunction(date: Date | number) {
  if (!(date instanceof Date || typeof date === 'number')) {
    return new Date(NaN);
  }
  const dt = date instanceof Date ? date : new Date(date);
  if (isNaN(dt.getTime())) {
    return new Date(NaN);
  }
  // ... rest of function
}
```

### After (Using Validators)
```typescript
import { isValidDateOrNumber } from './_lib/validators';

export function someFunction(date: Date | number) {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  const dt = date instanceof Date ? date : new Date(date);
  // ... rest of function
}
```

## Validation Matrix Quick Reference

| Input | isValidDate | isValidNumber | isValidDateOrNumber |
|-------|-------------|---------------|---------------------|
| `new Date()` | ✓ | ✗ | ✓ |
| `42` | ✗ | ✓ | ✓ |
| `NaN` | ✗ | ✗ | ✗ |
| `null` | ✗ | ✗ | ✗ |
| `"2024"` | ✗ | ✗ | ✗ |

## Common Pitfalls

1. **Don't forget to validate Invalid Date**: A Date object can be invalid (`new Date('invalid')`)
2. **Remember NaN is a number type**: Use `isValidNumber` to exclude it
3. **Type coercion doesn't happen**: String numbers like `"42"` return false
4. **These are internal only**: Don't export these functions in the public API