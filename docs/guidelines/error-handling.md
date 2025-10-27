# Error Handling

## Core Philosophy

Chronia **never throws exceptions**. All functions return standardized error values that are consistent with their return types.

## Standardized Error Values

### Date Functions → Invalid Date

Functions returning `Date` return `new Date(NaN)` (Invalid Date) on error.

```typescript
import { addDays, isValid } from "chronia";

const result = addDays(new Date("invalid"), 7);
console.log(result);  // Invalid Date

// Check for errors
if (!isValid(result)) {
  console.error("Date operation failed");
}
```

**Functions Using This Pattern:**
- Arithmetic: `add*`, `sub*` (addDays, subMonths, etc.)
- Getters: `get*` (getYear, getMonth, etc.) - **Exception: Return NaN, not Invalid Date**
- Setters: `set*` (setYear, setMonth, etc.)
- Boundary: `startOf*`, `endOf*`
- Truncation: `trunc*`
- Utility: `now()` never returns Invalid Date; `min()`, `max()`, `clamp()` return Invalid Date on error
- Formatting: `parse()` returns Invalid Date for unparseable strings

### Numeric Functions → NaN

Functions returning `number` return `NaN` on error.

```typescript
import { diffDays } from "chronia";

const result = diffDays(new Date("invalid"), new Date());
console.log(result);  // NaN

// Check for errors
if (isNaN(result)) {
  console.error("Difference calculation failed");
}
```

**Functions Using This Pattern:**
- Difference: `diff*` (diffDays, diffHours, etc.)
- Getters: `get*` (getYear, getMonth, etc.)
- Comparison: `compare()` returns `NaN` for invalid inputs

### Boolean Functions → false

Functions returning `boolean` return `false` on error.

```typescript
import { isAfter, isValid } from "chronia";

const result = isAfter(new Date("invalid"), new Date());
console.log(result);  // false

// IMPORTANT: Cannot distinguish error from valid "false"
// Must validate inputs separately:
if (!isValid(date1) || !isValid(date2)) {
  console.error("Invalid date inputs");
} else if (!result) {
  console.log("date1 is not after date2");  // Valid result
}
```

**Functions Using This Pattern:**
- Comparison: `isAfter`, `isBefore`, `isEqual`, `isAfterOrEqual`, `isBeforeOrEqual`, `isBetween`
- Same: `isSame*` (isSameYear, isSameMonth, etc.)
- Validation: `isValid()` - intentionally returns `false` for invalid dates

## Error Detection Patterns

### Pattern 1: Using `isValid()`

Most reliable for Date results:

```typescript
import { addMonths, isValid } from "chronia";

const result = addMonths(userDate, 3);
if (!isValid(result)) {
  return "Failed to add months - invalid date provided";
}
// Proceed with valid result
```

### Pattern 2: Using `isNaN()`

For numeric results:

```typescript
import { diffDays } from "chronia";

const daysDiff = diffDays(startDate, endDate);
if (isNaN(daysDiff)) {
  return "Failed to calculate difference - invalid dates";
}
console.log(`${daysDiff} days apart`);
```

### Pattern 3: Pre-validation

Validate inputs before calling functions:

```typescript
import { isValid, addDays } from "chronia";

function safeDateArithmetic(date: Date, days: number): Date | null {
  if (!isValid(date) || !Number.isFinite(days)) {
    return null;  // Custom error handling
  }
  return addDays(date, days);
}
```

### Pattern 4: Boolean Function Validation

Always validate inputs separately for boolean functions:

```typescript
import { isAfter, isValid } from "chronia";

function checkIfAfter(date1: Date, date2: Date): boolean | null {
  // Validate inputs first
  if (!isValid(date1) || !isValid(date2)) {
    return null;  // Error state
  }
  
  // Now we can trust the boolean result
  return isAfter(date1, date2);
}
```

## Common Error Scenarios

### Invalid Date Objects

```typescript
const invalid = new Date("not a date");

addDays(invalid, 7);        // Invalid Date
diffDays(invalid, new Date());  // NaN
isAfter(invalid, new Date());   // false (error)
```

### Invalid Numeric Inputs

```typescript
addDays(new Date(), NaN);        // Invalid Date
addDays(new Date(), Infinity);   // Invalid Date
setMonth(new Date(), -1);        // Invalid Date (out of range)
```

### Invalid Timestamps

```typescript
const invalidTimestamp = NaN;

addDays(invalidTimestamp, 7);  // Invalid Date
new Date(invalidTimestamp);    // Invalid Date
```

### Null/Undefined Inputs

```typescript
// TypeScript catches these at compile time
addDays(null, 7);        // TypeScript error
addDays(undefined, 7);   // TypeScript error

// But JavaScript allows them at runtime
addDays(null as any, 7);  // Invalid Date
```

## AI Guidance

### When Helping Users with Error Handling

**Always recommend pre-validation:**
```typescript
// GOOD: Validate before use
if (!isValid(userDate)) {
  throw new Error("Invalid date provided");
}
const result = addDays(userDate, 7);
```

**Avoid relying on error return values alone:**
```typescript
// RISKY: Error checking after the fact
const result = addDays(userDate, 7);
if (!isValid(result)) {
  // Could be error in userDate OR error in calculation
}
```

**For boolean functions, emphasize input validation:**
```typescript
// REQUIRED pattern for boolean functions
if (!isValid(date1) || !isValid(date2)) {
  throw new Error("Invalid dates");
}
const isLater = isAfter(date1, date2);  // Now we can trust this
```

### Recommend Type Guards

```typescript
import { isValid } from "chronia";

function ensureValidDate(date: Date): asserts date is Date {
  if (!isValid(date)) {
    throw new Error("Invalid date");
  }
}

const userDate = new Date(userInput);
ensureValidDate(userDate);
// TypeScript now knows userDate is valid
```

### Error Messages

Suggest informative error messages:

```typescript
import { isValid } from "chronia";

function validateDate(date: Date, fieldName: string): void {
  if (!isValid(date)) {
    throw new Error(
      `Invalid ${fieldName}: ${date}. Expected valid Date object or timestamp.`
    );
  }
}
```

## Error Handling Anti-Patterns

### ❌ Anti-Pattern 1: Catching Exceptions

```typescript
// WRONG: Chronia never throws
try {
  const result = addDays(date, 7);
} catch (error) {
  // This will NEVER execute
}
```

### ❌ Anti-Pattern 2: Truthy/Falsy Checks on Dates

```typescript
// WRONG: Invalid Date is still truthy
const result = addDays(invalid, 7);
if (result) {
  // This executes even for Invalid Date!
}

// CORRECT: Use isValid()
if (isValid(result)) {
  // Only executes for valid dates
}
```

### ❌ Anti-Pattern 3: Relying on Boolean False for Errors

```typescript
// WRONG: Can't distinguish error from valid "false"
const isLater = isAfter(date1, date2);
if (!isLater) {
  // Could be error OR date1 is not after date2
}

// CORRECT: Validate inputs first
if (!isValid(date1) || !isValid(date2)) {
  throw new Error("Invalid dates");
}
const isLater = isAfter(date1, date2);
if (!isLater) {
  // Now we know this is a valid "false" result
}
```

### ❌ Anti-Pattern 4: Ignoring Error Values

```typescript
// WRONG: Using result without checking
const nextMonth = addMonths(userDate, 1);
const formatted = format(nextMonth, "yyyy-MM-dd");
// If userDate was invalid, formatted will be "Invalid Date"

// CORRECT: Validate before use
const nextMonth = addMonths(userDate, 1);
if (!isValid(nextMonth)) {
  return "Unable to calculate next month";
}
const formatted = format(nextMonth, "yyyy-MM-dd");
```

## Rationale for No-Exception Policy

**Benefits:**
1. **Predictable Performance**: No try-catch overhead
2. **Consistent API**: All functions follow same error convention
3. **Composability**: Functions can be chained without exception handling
4. **JavaScript Compatibility**: Aligns with JavaScript's Date behavior

**Comparison with Native Date:**
```typescript
// Native JavaScript Date also returns Invalid Date
const invalid = new Date("not a date");
console.log(invalid);  // Invalid Date
console.log(invalid.getTime());  // NaN

// Chronia follows this pattern
addDays(invalid, 7);  // Invalid Date (consistent)
```

## Testing Error Conditions

```typescript
import { describe, it, expect } from "vitest";
import { addDays, isValid } from "chronia";

describe("addDays error handling", () => {
  it("returns Invalid Date for invalid date input", () => {
    const result = addDays(new Date("invalid"), 7);
    expect(isValid(result)).toBe(false);
  });

  it("returns Invalid Date for NaN amount", () => {
    const result = addDays(new Date(), NaN);
    expect(isValid(result)).toBe(false);
  });

  it("returns Invalid Date for Infinity amount", () => {
    const result = addDays(new Date(), Infinity);
    expect(isValid(result)).toBe(false);
  });
});
```

## Related

- **Input Validation**: See `input-validation.md` for validation helpers
- **Development Principles**: See `development-principles.md` for no-exception policy
- **Validation Function**: See `docs/functions/comparison/validation.md` for `isValid()` usage
