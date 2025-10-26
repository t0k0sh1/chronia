# Validation Function

## Overview

The `isValid` function is the library's primary validation utility for checking whether a date or timestamp represents a valid moment in time. It is essential for error handling and input validation, allowing you to distinguish between genuine invalid inputs and valid negative comparison results.

## Function

### `isValid(date: Date | number): boolean`

Checks if a value is a valid Date object or timestamp.

**Parameters:**
- `date` - A Date object or numeric timestamp to validate

**Returns:**
- `true` if the value represents a valid date/time
- `false` if the value is invalid (Invalid Date, NaN, Infinity, -Infinity)

**Key Behavior:**
- Accepts both Date objects and numeric timestamps
- Returns `true` for all finite numbers, including `0` (Unix epoch) and negative timestamps
- Uses the same validation logic as all other library functions
- Most fundamental validation function in the library

**Examples:**
```typescript
// Valid Date object
isValid(new Date(2025, 0, 1));
// Returns: true

// Valid timestamp
isValid(Date.now());
// Returns: true

// Zero is valid (Unix epoch: 1970-01-01 00:00:00 UTC)
isValid(0);
// Returns: true

// Negative timestamps are valid (dates before 1970)
isValid(-86400000);  // 1969-12-31
// Returns: true

// Invalid Date
isValid(new Date("invalid string"));
// Returns: false

// Invalid numeric values
isValid(NaN);
// Returns: false

isValid(Infinity);
// Returns: false

isValid(-Infinity);
// Returns: false
```

## Usage Patterns

### Input Validation
```typescript
import { isValid } from "chronia";

function processDate(input: Date | number): void {
  if (!isValid(input)) {
    throw new Error("Invalid date input");
  }

  // Safe to proceed with date operations
  const formatted = format(input, "yyyy-MM-dd");
  console.log(formatted);
}
```

### Distinguishing Errors from Valid Negative Results
```typescript
import { isValid, isAfter } from "chronia";

// Problem: isAfter returns false for both errors and valid "not after" cases
const result = isAfter(userDate1, userDate2);
if (!result) {
  // Is this an error or is date1 actually not after date2?
}

// Solution: Validate inputs first
if (!isValid(userDate1) || !isValid(userDate2)) {
  console.error("Invalid date inputs");
  return;
}

const result = isAfter(userDate1, userDate2);
if (!result) {
  // Now we know: date1 is genuinely not after date2
}
```

### Filtering Valid Dates
```typescript
import { isValid } from "chronia";

const dates: (Date | number)[] = [
  new Date(2024, 0, 1),
  new Date("invalid"),
  Date.now(),
  NaN,
  new Date(2024, 11, 31)
];

const validDates = dates.filter(isValid);
// Result: [valid Date, timestamp, valid Date]
```

### API Response Validation
```typescript
import { isValid } from "chronia";

interface ApiResponse {
  createdAt: string;
  updatedAt: string;
}

function parseApiResponse(response: ApiResponse): {
  createdAt: Date;
  updatedAt: Date;
} {
  const createdAt = new Date(response.createdAt);
  const updatedAt = new Date(response.updatedAt);

  if (!isValid(createdAt) || !isValid(updatedAt)) {
    throw new Error("API returned invalid dates");
  }

  return { createdAt, updatedAt };
}
```

### Validating Operation Results
```typescript
import { isValid, addDays, parse } from "chronia";

// Validate result of date arithmetic
const futureDate = addDays(someDate, 30);
if (!isValid(futureDate)) {
  console.error("Date arithmetic produced invalid result");
}

// Validate result of parsing
const parsedDate = parse(userInput, "yyyy-MM-dd");
if (!isValid(parsedDate)) {
  console.error("Failed to parse date");
}
```

### Safe Date Construction
```typescript
import { isValid } from "chronia";

function safeDateFrom(value: unknown): Date | null {
  let candidate: Date | number;

  if (value instanceof Date) {
    candidate = value;
  } else if (typeof value === "number") {
    candidate = value;
  } else if (typeof value === "string") {
    candidate = new Date(value);
  } else {
    return null;
  }

  return isValid(candidate) ? new Date(candidate) : null;
}
```

## AI Guidance

### When to Recommend `isValid`

**Always recommend `isValid` when:**
- Accepting user input (dates from forms, APIs, files)
- Working with parsed dates (from strings)
- After date arithmetic that might fail (e.g., overflow scenarios)
- When boolean comparison results need disambiguation
- Building robust error handling
- Validating before database operations

**Typical patterns to suggest:**
1. **Pre-validation**: Check inputs before operations
2. **Post-validation**: Check operation results
3. **Filtering**: Remove invalid dates from collections
4. **Error handling**: Provide meaningful error messages

### Combination Patterns

**With comparison functions:**
```typescript
import { isValid, isAfter } from "chronia";

// Validate before comparing
if (!isValid(date1) || !isValid(date2)) {
  return { error: "Invalid dates" };
}

if (isAfter(date1, date2)) {
  // Guaranteed: date1 is after date2, not an error
}
```

**With arithmetic functions:**
```typescript
import { isValid, addMonths } from "chronia";

const result = addMonths(startDate, 6);
if (!isValid(result)) {
  // Input was invalid or overflow occurred
  throw new Error("Failed to calculate future date");
}
```

**With parsing:**
```typescript
import { isValid, parse } from "chronia";

const date = parse(userInput, "yyyy-MM-dd");
if (!isValid(date)) {
  return { error: "Invalid date format. Expected yyyy-MM-dd" };
}
```

## Common Pitfalls

### 1. Forgetting to Validate User Inputs

**❌ No Validation:**
```typescript
function scheduleEvent(dateString: string): void {
  const eventDate = new Date(dateString);
  // BUG: eventDate might be Invalid Date
  const reminder = addDays(eventDate, -1);
  // BUG: reminder is also Invalid Date
  saveToDatabase(reminder);
}
```

**✅ With Validation:**
```typescript
import { isValid, addDays } from "chronia";

function scheduleEvent(dateString: string): void {
  const eventDate = new Date(dateString);

  if (!isValid(eventDate)) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  const reminder = addDays(eventDate, -1);
  saveToDatabase(reminder);
}
```

**AI Guidance:** Always recommend validation for any user-provided input.

### 2. Misunderstanding `false` from Comparison Functions

**❌ Ambiguous Error Handling:**
```typescript
const isNewer = isAfter(newDate, oldDate);
if (!isNewer) {
  // Could mean:
  // 1. newDate is not after oldDate (valid result)
  // 2. One of the dates is invalid (error)
  // We don't know which!
}
```

**✅ Explicit Validation:**
```typescript
import { isValid, isAfter } from "chronia";

if (!isValid(newDate) || !isValid(oldDate)) {
  throw new Error("Invalid date inputs");
}

const isNewer = isAfter(newDate, oldDate);
if (!isNewer) {
  // Now we know: newDate is genuinely not after oldDate
}
```

**AI Guidance:** Explain that boolean functions return `false` for both errors and valid negative results.

### 3. Assuming Zero or Negative Timestamps are Invalid

**❌ Incorrect Validation:**
```typescript
function validateTimestamp(ts: number): boolean {
  return ts > 0;  // WRONG - rejects valid dates before 1970
}
```

**✅ Correct Validation:**
```typescript
import { isValid } from "chronia";

function validateTimestamp(ts: number): boolean {
  return isValid(ts);  // Accepts any finite number
}
```

**AI Guidance:** Clarify that `isValid` accepts all finite numbers, including zero and negatives.

### 4. Not Validating After Arithmetic

**❌ Assuming Arithmetic Always Succeeds:**
```typescript
const nextYear = addYears(someDate, 1);
// If someDate was invalid, nextYear is also invalid
// But we proceed as if it's valid...
saveToDatabase(nextYear);  // Stores Invalid Date!
```

**✅ Validate Results:**
```typescript
import { isValid, addYears } from "chronia";

const nextYear = addYears(someDate, 1);
if (!isValid(nextYear)) {
  throw new Error("Failed to calculate next year");
}
saveToDatabase(nextYear);
```

**AI Guidance:** Recommend validating results of operations, especially when inputs come from external sources.

### 5. Using `isNaN()` Instead of `isValid()`

**❌ JavaScript's `isNaN()` (Incorrect):**
```typescript
const date = new Date("invalid");
if (!isNaN(date)) {  // WRONG - checks if date is a number, not if it's valid
  // This branch executes even for Invalid Date!
}
```

**✅ Using `isValid()`:**
```typescript
import { isValid } from "chronia";

const date = new Date("invalid");
if (!isValid(date)) {
  console.error("Invalid date");
}
```

**AI Guidance:** Always recommend `isValid()` over JavaScript's built-in `isNaN()` for date validation.

## Implementation Details

`isValid` internally uses the `isValidDateOrNumber` validator, which:
1. Checks if the value is a Date object with valid timestamp
2. Checks if the value is a finite number (excludes NaN, ±Infinity)

```typescript
// Conceptual implementation
export function isValid(date: Date | number): boolean {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  return typeof date === "number" && isFinite(date);
}
```

## Performance Considerations

- **Very lightweight**: Simple type and finiteness checks
- **No overhead**: Direct validation logic, no auxiliary operations
- **Use liberally**: Performance cost is negligible; prioritize robustness

## Error Handling Philosophy

Chronia follows a **no-exceptions** error handling policy:
- Functions return standardized error values (Invalid Date, NaN, false)
- `isValid` is the tool to distinguish errors from valid results
- This approach ensures predictable behavior and safe error handling

**Best Practice:**
```typescript
import { isValid, someOperation } from "chronia";

// Always validate when error vs. valid result is ambiguous
if (!isValid(input)) {
  // Handle error
}

const result = someOperation(input);
// Now result can be used with confidence
```

## Related Functions

All Chronia functions use the same validation logic as `isValid`:
- **Comparison**: `isAfter`, `isBefore`, `isEqual`, `isSame*` (return `false` for invalid inputs)
- **Arithmetic**: `add*`, `sub*` (return Invalid Date for invalid inputs)
- **Difference**: `diff*` (return `NaN` for invalid inputs)
- **Getter/Setter**: `get*`, `set*` (return NaN or Invalid Date for invalid inputs)
- **Formatting**: `format`, `parse` (return Invalid Date for invalid inputs)
