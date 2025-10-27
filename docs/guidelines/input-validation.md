# Input Validation

## Core Principle

All Chronia functions follow a **validation-first approach**: inputs are validated before any processing occurs.

## Validation Utilities

Chronia provides centralized validation helpers in `src/_lib/validators.ts` (internal, not exported).

### `isValidDateOrNumber(value: any): boolean`

Checks if a value is a valid Date object or a finite number (timestamp).

```typescript
// Internal implementation (not exported)
function isValidDateOrNumber(value: any): boolean {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === "number") {
    return Number.isFinite(value);
  }
  return false;
}
```

**Accepts:**
- Valid Date objects
- Finite numbers (timestamps)

**Rejects:**
- Invalid Date objects (`new Date(NaN)`)
- `NaN`, `Infinity`, `-Infinity`
- `null`, `undefined`
- Strings, booleans, objects, arrays

### `isValidNumber(value: any): boolean`

Checks if a value is a finite number (not NaN or ±Infinity).

```typescript
// Internal implementation (not exported)
function isValidNumber(value: any): boolean {
  return typeof value === "number" && Number.isFinite(value);
}
```

**Accepts:**
- Finite numbers (including 0, negative numbers, decimals)

**Rejects:**
- `NaN`, `Infinity`, `-Infinity`
- Strings, booleans, objects, arrays
- `null`, `undefined`

## Validation-First Implementation Pattern

Every Chronia function validates inputs **before** processing:

```typescript
export function addDays(date: Date | number, amount: number): Date {
  // STEP 1: Validate ALL inputs first
  if (!isValidDateOrNumber(date) || !isValidNumber(amount)) {
    return new Date(NaN);  // Return error value immediately
  }

  // STEP 2: Process with confidence (inputs are valid)
  const dt = new Date(date);
  const daysToAdd = Math.trunc(amount);
  dt.setDate(dt.getDate() + daysToAdd);
  return dt;
}
```

### Why Validate First?

1. **Early Return**: Avoid wasted computation on invalid inputs
2. **Clear Error Signals**: Immediate feedback for invalid data
3. **Type Safety**: Ensures type conversions are safe
4. **Consistent Behavior**: All functions fail the same way

## Common Validation Patterns

### Pattern 1: Single Date Input

```typescript
export function someFunction(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);
  }
  // Process date...
}
```

**Used in:** `getYear`, `getMonth`, `getDay`, `startOfDay`, `endOfMonth`, etc.

### Pattern 2: Date + Numeric Amount

```typescript
export function someArithmetic(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount)) {
    return new Date(NaN);
  }
  // Process arithmetic...
}
```

**Used in:** `addDays`, `subMonths`, `setYear`, etc.

### Pattern 3: Two Date Inputs

```typescript
export function someComparison(
  dateLeft: Date | number,
  dateRight: Date | number
): boolean {
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight)) {
    return false;  // Boolean functions return false on error
  }
  // Compare dates...
}
```

**Used in:** `isAfter`, `isBefore`, `isEqual`, `diffDays`, etc.

### Pattern 4: Date + Options Object

```typescript
export function someFunction(
  date: Date | number,
  options: SomeOptions = {}
): ReturnType {
  if (!isValidDateOrNumber(date)) {
    return errorValue;  // Depends on return type
  }
  
  // Options are validated as needed
  const unit = options.unit ?? "millisecond";
  
  // Process...
}
```

**Used in:** `isEqual`, `isAfter`, `isBetween`, `compare`, etc.

## Edge Cases and Special Handling

### Fractional Numbers

Fractional amounts are **allowed** and truncated via `Math.trunc()`:

```typescript
export function addDays(date: Date | number, amount: number): Date {
  // amount = 3.7 is VALID (not an error)
  if (!isValidDateOrNumber(date) || !isValidNumber(amount)) {
    return new Date(NaN);
  }
  
  const daysToAdd = Math.trunc(amount);  // 3.7 → 3
  // ...
}
```

### Negative Numbers

Negative amounts are **valid**:

```typescript
addDays(date, -7);   // VALID: Subtract 7 days
setMonth(date, -1);  // INVALID: Month out of range (0-11)
```

**Validation depends on semantic meaning:**
- Arithmetic functions: Negative amounts accepted
- Setter functions: Negative values may be invalid (e.g., month < 0)

### Zero

Zero is always a **valid** number:

```typescript
addDays(date, 0);     // VALID: Returns same date
diffDays(date, date); // VALID: Returns 0
```

### Timestamp Boundaries

JavaScript Date range: ±8,640,000,000,000,000 milliseconds from epoch.

```typescript
import { MIN_DATE, MAX_DATE } from "chronia";

addDays(MAX_DATE, 1);  // May return Invalid Date (overflow)
addDays(MIN_DATE, -1); // May return Invalid Date (underflow)
```

**Validation strategy:** Let JavaScript Date handle overflow naturally.

## Options Object Validation

Options are validated lazily (only when used):

```typescript
export function isEqual(
  dateLeft: Date | number,
  dateRight: Date | number,
  options: ComparisonOptions = {}
): boolean {
  // Validate dates first
  if (!isValidDateOrNumber(dateLeft) || !isValidDateOrNumber(dateRight)) {
    return false;
  }

  // Validate options only if used
  const unit = options.unit ?? "millisecond";
  
  // Unit validation happens in truncateToUnit()
  // Invalid unit returns Invalid Date, caught downstream
}
```

**Rationale:** Options have defaults, so validation deferred to usage site.

## Interval Validation

`isBetween` allows `null` for open-ended intervals:

```typescript
export function isBetween(
  date: Date | number,
  interval: Interval,
  options: BetweenOption = {}
): boolean {
  // Validate date
  if (!isValidDateOrNumber(date)) {
    return false;
  }

  // Null start/end are VALID (use MIN_DATE/MAX_DATE)
  const start = interval.start ?? MIN_DATE;
  const end = interval.end ?? MAX_DATE;

  // Validate interval bounds
  if (!isValidDateOrNumber(start) || !isValidDateOrNumber(end)) {
    return false;
  }

  // Process...
}
```

## AI Guidance for Validation

### Recommend Pre-validation in User Code

```typescript
import { isValid, addDays } from "chronia";

// GOOD: Validate user input before passing to Chronia
function processUserDate(userInput: string, days: number): Date {
  const date = new Date(userInput);
  
  if (!isValid(date)) {
    throw new Error(`Invalid date input: ${userInput}`);
  }
  
  if (!Number.isFinite(days)) {
    throw new Error(`Invalid days amount: ${days}`);
  }

  return addDays(date, days);
}
```

### Type Guards for TypeScript

```typescript
import { isValid } from "chronia";

function ensureValidDate(date: Date): asserts date is Date {
  if (!isValid(date)) {
    throw new Error("Invalid date");
  }
}

// Usage
const userDate = new Date(userInput);
ensureValidDate(userDate);
// TypeScript now knows userDate is valid
const result = addDays(userDate, 7);
```

### Validation Helpers for User Code

Suggest creating wrapper utilities:

```typescript
import { isValid } from "chronia";

export function validateDate(value: any, fieldName: string): Date {
  const date = value instanceof Date ? value : new Date(value);
  
  if (!isValid(date)) {
    throw new Error(`Invalid ${fieldName}: ${value}`);
  }
  
  return date;
}

export function validateNumber(value: any, fieldName: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Invalid ${fieldName}: ${value}. Expected finite number.`);
  }
  
  return value;
}

// Usage
const date = validateDate(userInput, "start date");
const days = validateNumber(userAmount, "days to add");
const result = addDays(date, days);
```

## Testing Validation

```typescript
import { describe, it, expect } from "vitest";
import { addDays, isValid } from "chronia";

describe("addDays validation", () => {
  it("rejects invalid date", () => {
    const result = addDays(new Date("invalid"), 7);
    expect(isValid(result)).toBe(false);
  });

  it("rejects NaN amount", () => {
    const result = addDays(new Date(), NaN);
    expect(isValid(result)).toBe(false);
  });

  it("rejects Infinity amount", () => {
    const result = addDays(new Date(), Infinity);
    expect(isValid(result)).toBe(false);
  });

  it("rejects null date", () => {
    const result = addDays(null as any, 7);
    expect(isValid(result)).toBe(false);
  });

  it("accepts timestamp", () => {
    const result = addDays(Date.now(), 7);
    expect(isValid(result)).toBe(true);
  });

  it("accepts fractional amount (truncated)", () => {
    const result = addDays(new Date(2024, 0, 1), 3.7);
    expect(isValid(result)).toBe(true);
    expect(result).toEqual(new Date(2024, 0, 4)); // Truncated to 3
  });

  it("accepts negative amount", () => {
    const result = addDays(new Date(2024, 0, 10), -3);
    expect(isValid(result)).toBe(true);
    expect(result).toEqual(new Date(2024, 0, 7));
  });

  it("accepts zero amount", () => {
    const date = new Date(2024, 0, 15);
    const result = addDays(date, 0);
    expect(isValid(result)).toBe(true);
    expect(result).toEqual(date);
  });
});
```

## Validation vs. Error Handling

**Validation** (this document):
- Internal checks performed by library functions
- Uses `_lib/validators.ts` helpers
- Returns standardized error values

**Error Handling** (see `error-handling.md`):
- How library signals errors to consumers
- Three error value types: Invalid Date, NaN, false
- No exceptions thrown

**User Responsibility:**
- Validate user inputs before passing to library
- Check return values for errors using `isValid()`, `isNaN()`
- Handle errors appropriately in application context

## Common Validation Mistakes

### ❌ Mistake 1: Using Truthiness

```typescript
// WRONG: Invalid Date is truthy
if (date) {
  addDays(date, 7);  // Executes even for Invalid Date!
}

// CORRECT: Use isValid()
import { isValid } from "chronia";
if (isValid(date)) {
  addDays(date, 7);
}
```

### ❌ Mistake 2: String Dates

```typescript
// WRONG: Chronia doesn't validate strings
addDays("2024-01-15", 7);  // TypeScript error, runtime Invalid Date

// CORRECT: Convert to Date first
const date = new Date("2024-01-15");
if (isValid(date)) {
  addDays(date, 7);
}
```

### ❌ Mistake 3: Ignoring Validation Results

```typescript
// WRONG: Not checking result
const result = addDays(userDate, 7);
const formatted = format(result, "yyyy-MM-dd");
// If userDate invalid, formatted is "Invalid Date"

// CORRECT: Validate result
const result = addDays(userDate, 7);
if (!isValid(result)) {
  throw new Error("Failed to add days");
}
const formatted = format(result, "yyyy-MM-dd");
```

## Related

- **Error Handling**: See `error-handling.md` for error return values
- **Development Principles**: See `development-principles.md` for validation-first approach
- **Validators**: Internal `_lib/validators.ts` (not exported, documented here)
- **isValid Function**: See `docs/function-categories/comparison/validation.md`
