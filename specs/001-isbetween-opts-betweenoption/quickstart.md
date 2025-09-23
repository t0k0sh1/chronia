# Quickstart: isBetween with BetweenOption

## Overview
This guide demonstrates how to use the enhanced `isBetween` function with configurable boundary inclusion/exclusion using the new `BetweenOption` parameter.

## Installation
```bash
npm install chronia
```

## Basic Usage

### Import
```typescript
import { isBetween } from 'chronia';
```

### Default Behavior (Backward Compatible)
```typescript
const date = new Date('2024-06-15');
const interval = {
  start: new Date('2024-06-10'),
  end: new Date('2024-06-20')
};

// Default: Both boundaries excluded "()"
console.log(isBetween(date, interval)); // true

// Boundary dates are excluded by default
console.log(isBetween(new Date('2024-06-10'), interval)); // false
console.log(isBetween(new Date('2024-06-20'), interval)); // false
```

## Using Boundary Options

### Include Both Boundaries "[]"
```typescript
const opts = { bounds: "[]" };

// Both start and end dates are included
console.log(isBetween(new Date('2024-06-10'), interval, opts)); // true
console.log(isBetween(new Date('2024-06-15'), interval, opts)); // true
console.log(isBetween(new Date('2024-06-20'), interval, opts)); // true
```

### Include Start Only "[)"
```typescript
const opts = { bounds: "[)" };

// Start is included, end is excluded
console.log(isBetween(new Date('2024-06-10'), interval, opts)); // true
console.log(isBetween(new Date('2024-06-15'), interval, opts)); // true
console.log(isBetween(new Date('2024-06-20'), interval, opts)); // false
```

### Include End Only "(]"
```typescript
const opts = { bounds: "(]" };

// Start is excluded, end is included
console.log(isBetween(new Date('2024-06-10'), interval, opts)); // false
console.log(isBetween(new Date('2024-06-15'), interval, opts)); // true
console.log(isBetween(new Date('2024-06-20'), interval, opts)); // true
```

## Common Use Cases

### Event Duration Check
```typescript
// Check if current time is within event hours (inclusive)
const now = new Date();
const eventHours = {
  start: new Date('2024-06-15 09:00:00'),
  end: new Date('2024-06-15 17:00:00')
};

const isDuringEvent = isBetween(now, eventHours, { bounds: "[]" });
```

### Membership Period Validation
```typescript
// Check if date is within membership period (start inclusive, end exclusive)
const checkDate = new Date('2024-12-31');
const membership = {
  start: new Date('2024-01-01'),
  end: new Date('2025-01-01')
};

const isActiveMember = isBetween(checkDate, membership, { bounds: "[)" });
```

### Overlapping Intervals
```typescript
// Check if a date falls in overlapping periods
function isInAnyPeriod(date: Date, periods: Array<{ start: Date, end: Date }>) {
  return periods.some(period =>
    isBetween(date, period, { bounds: "[]" })
  );
}
```

## TypeScript Support

The function is fully typed with TypeScript:

```typescript
import { isBetween, type BetweenOption, type Interval } from 'chronia';

const interval: Interval = {
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
};

const options: BetweenOption = {
  bounds: "[]" // TypeScript ensures only valid values
};

// Type-safe usage
const result: boolean = isBetween(new Date(), interval, options);
```

## Validation Tests

Run these examples to verify the implementation:

```typescript
// Test 1: Default behavior (backward compatibility)
console.assert(
  isBetween(new Date('2024-06-15'), {
    start: new Date('2024-06-10'),
    end: new Date('2024-06-20')
  }) === true,
  "Default behavior should exclude boundaries"
);

// Test 2: Inclusive boundaries
console.assert(
  isBetween(new Date('2024-06-10'), {
    start: new Date('2024-06-10'),
    end: new Date('2024-06-20')
  }, { bounds: "[]" }) === true,
  "Inclusive boundaries should include start date"
);

// Test 3: Mixed boundaries
console.assert(
  isBetween(new Date('2024-06-20'), {
    start: new Date('2024-06-10'),
    end: new Date('2024-06-20')
  }, { bounds: "[)" }) === false,
  "Start-inclusive should exclude end date"
);

// Test 4: Invalid bounds fallback
console.assert(
  isBetween(new Date('2024-06-10'), {
    start: new Date('2024-06-10'),
    end: new Date('2024-06-20')
  }, { bounds: "invalid" as any }) === false,
  "Invalid bounds should default to '()'"
);

console.log("All validation tests passed!");
```

## Migration Guide

### From Existing Code
```typescript
// Old code (still works)
if (isBetween(date, interval)) {
  // ...
}

// To include boundaries, add options
if (isBetween(date, interval, { bounds: "[]" })) {
  // ...
}
```

### Boundary Notation Reference
- `()` - Exclude both (start < date < end)
- `[]` - Include both (start ≤ date ≤ end)
- `[)` - Include start only (start ≤ date < end)
- `(]` - Include end only (start < date ≤ end)

## Performance Notes
- No performance impact for existing code
- Minimal overhead for boundary option processing
- Type checking happens at compile time (zero runtime cost)