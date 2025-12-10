# isDate

## Overview

The `isDate` function checks whether a given value is a Date object instance. It performs type checking to determine if a value is a Date, regardless of whether the Date represents a valid or invalid date value.

## Signature

```typescript
function isDate(value: unknown): value is Date;
```

## Parameters

| Parameter | Type      | Description                               |
| --------- | --------- | ----------------------------------------- |
| `value`   | `unknown` | Any value to check for Date instance type |

## Return Value

| Type            | Description                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `value is Date` | Returns `true` if the value is a Date instance, `false` otherwise. Type predicate that narrows the type to `Date` when `true`. |

## Description

The `isDate` function determines whether the provided value is an instance of the Date class. This is a type-checking function, not a validity-checking function. It returns `true` for any Date object, including Invalid Date objects (e.g., `new Date('invalid')`).

### Specification

#### Returns `true` when

- The argument is an instance of the `Date` class, including:
  - Valid Date objects (e.g., `new Date(2025, 0, 1)`)
  - Invalid Date objects (e.g., `new Date('invalid')`, `new Date(NaN)`)
  - Date objects at epoch boundaries (e.g., `new Date(0)`)
  - Date objects at timestamp limits (e.g., `new Date(8640000000000000)`)

#### Returns `false` when

- The argument is a number (including timestamps like `Date.now()`)
- The argument is a string (including date strings like `'2025-01-01'`)
- The argument is `null` or `undefined`
- The argument is `NaN`, `Infinity`, or `-Infinity`
- The argument is a boolean
- The argument is an array
- The argument is a plain object (even if it has Date-like properties)
- The argument is a function
- The argument is a symbol
- The argument is a BigInt

### Behavior Notes

- This function performs **type checking only**, not validity checking
- Returns `true` for Invalid Date objects because they are still Date instances
- To check if a Date is both a Date instance AND valid, use: `isDate(value) && isValid(value)`
- Works as a TypeScript type guard with return type `value is Date`
- Enables type narrowing in TypeScript, allowing safe access to Date methods
- No exceptions are thrown; always returns a boolean
- Does not accept timestamps or date strings; only Date instances return `true`

## Use Cases

- **Type Narrowing**: Use as a type guard to safely narrow `unknown` or union types to Date before accessing Date methods. Enables TypeScript to provide proper type checking and IDE autocompletion for Date-specific operations.
- **Runtime Type Validation**: Validate that a value received from external sources (APIs, user input, JSON parsing) is a Date instance before processing. Essential when working with untyped data where Date instances cannot be guaranteed.
- **Function Parameter Validation**: Guard against incorrect types in functions that specifically require Date objects (not timestamps). Prevents runtime errors from attempting to call Date methods on non-Date values.
- **Filtering Mixed-Type Collections**: Filter arrays or collections to extract only Date instances from mixed-type data. Useful when processing data structures that may contain various types including dates.
- **Distinguishing Dates from Timestamps**: Differentiate between Date objects and numeric timestamps in code that handles both. Allows proper handling based on whether the input is already a Date instance or needs conversion.

## Usage Examples

### Type Narrowing

```typescript
import { isDate } from "chronia";

// Type guard enables safe Date method access
function processValue(value: unknown) {
  if (isDate(value)) {
    // TypeScript knows 'value' is Date here
    console.log(value.getTime());
    console.log(value.toISOString());
  } else {
    console.log("Not a Date instance");
  }
}

// Valid Date object
processValue(new Date(2025, 0, 1)); // Logs: timestamp and ISO string

// Invalid Date object (still a Date instance!)
processValue(new Date("invalid")); // Logs: NaN and 'Invalid Date'

// Timestamp (number) - NOT a Date instance
processValue(Date.now()); // Logs: 'Not a Date instance'

// Date string - NOT a Date instance
processValue("2025-01-01"); // Logs: 'Not a Date instance'
```

### Runtime Type Validation

```typescript
import { isDate, isValid } from "chronia";

// Validate API response data
interface ApiResponse {
  data: unknown;
}

function processApiDate(response: ApiResponse): Date | null {
  const { data } = response;

  // Check if it's a Date instance
  if (!isDate(data)) {
    console.error("Expected Date instance, received:", typeof data);
    return null;
  }

  // Check if it's a valid Date
  if (!isValid(data)) {
    console.error("Received Invalid Date instance");
    return null;
  }

  return data;
}

// Valid Date instance
processApiDate({ data: new Date(2025, 0, 1) }); // Returns: Date object

// Invalid Date instance
processApiDate({ data: new Date("invalid") }); // Returns: null

// Number (not a Date instance)
processApiDate({ data: 1704067200000 }); // Returns: null
```

### Function Parameter Validation

```typescript
import { isDate } from "chronia";

// Function that requires Date instance (not timestamp)
function formatDateObject(date: Date | number | string): string {
  if (!isDate(date)) {
    throw new TypeError("Expected Date instance, use new Date() to create one");
  }

  // Safe to use Date methods here
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Date instance - works
formatDateObject(new Date(2025, 0, 1));
// Returns: 'January 1, 2025'

// Invalid Date instance - still works (but may return 'Invalid Date')
formatDateObject(new Date("invalid"));
// Returns: 'Invalid Date'

// Timestamp - throws TypeError
try {
  formatDateObject(Date.now());
} catch (e) {
  console.error(e.message);
  // Logs: 'Expected Date instance, use new Date() to create one'
}
```

### Filtering Mixed-Type Collections

```typescript
import { isDate } from "chronia";

// Extract only Date instances from mixed array
const mixedValues: unknown[] = [
  new Date(2025, 0, 1),
  "not a date",
  Date.now(),
  new Date("invalid"), // Invalid but still a Date instance
  null,
  { date: new Date() },
];

const dateInstances = mixedValues.filter(isDate);
// Returns: [new Date(2025, 0, 1), new Date('invalid')]

// TypeScript knows dateInstances is Date[]
dateInstances.forEach((date) => {
  console.log(date.getTime()); // Type-safe access to Date methods
});
```

### Distinguishing Dates from Timestamps

```typescript
import { isDate } from "chronia";

// Handle both Date objects and timestamps
function normalizeToDate(input: Date | number): Date {
  if (isDate(input)) {
    // Already a Date instance, return as-is
    return input;
  }

  // It's a timestamp, convert to Date
  return new Date(input);
}

const dateObj = new Date(2025, 0, 1);
const timestamp = Date.now();

normalizeToDate(dateObj); // Returns: same Date instance
normalizeToDate(timestamp); // Returns: new Date(timestamp)
```

### Combining with isValid for Complete Validation

```typescript
import { isDate, isValid } from "chronia";

// Check both type AND validity
function isValidDateInstance(value: unknown): value is Date {
  return isDate(value) && isValid(value);
}

// Valid Date instance
isValidDateInstance(new Date(2025, 0, 1)); // Returns: true

// Invalid Date instance (type check passes, validity fails)
isValidDateInstance(new Date("invalid")); // Returns: false

// Timestamp (type check fails)
isValidDateInstance(Date.now()); // Returns: false

// Use in conditional
function processOnlyValidDates(value: unknown) {
  if (isValidDateInstance(value)) {
    // TypeScript knows 'value' is Date AND it's valid
    console.log(value.toISOString());
  }
}
```

## Common Pitfalls

### Pitfall 1: Assuming `isDate` Checks Validity

**Problem**: Developers may assume `isDate` returns `false` for Invalid Date objects.

```typescript
// INCORRECT: Assuming isDate checks validity
const invalidDate = new Date("invalid");
if (isDate(invalidDate)) {
  // This code runs! isDate returns true for Invalid Date
  console.log(invalidDate.toISOString()); // Error: Invalid Date
}
```

**Solution**: Use `isValid` to check date validity, or combine both checks.

```typescript
// CORRECT: Check both type and validity
const invalidDate = new Date("invalid");
if (isDate(invalidDate) && isValid(invalidDate)) {
  // This code doesn't run because validity check fails
  console.log(invalidDate.toISOString());
}
```

### Pitfall 2: Using with Timestamps

**Problem**: Expecting timestamps to return `true`.

```typescript
// INCORRECT: Timestamps are not Date instances
const timestamp = Date.now();
if (isDate(timestamp)) {
  // This never runs! timestamp is a number, not a Date instance
  console.log(timestamp.getTime());
}
```

**Solution**: Convert timestamps to Date instances first.

```typescript
// CORRECT: Convert timestamp to Date
const timestamp = Date.now();
const date = new Date(timestamp);
if (isDate(date)) {
  // This runs! date is a Date instance
  console.log(date.getTime());
}
```

### Pitfall 3: Date-Like Objects

**Problem**: Assuming objects with Date-like properties are recognized as dates.

```typescript
// INCORRECT: Plain objects are not Date instances
const fakeDateObj = {
  getTime: () => Date.now(),
  toISOString: () => "2025-01-01T00:00:00.000Z",
};

if (isDate(fakeDateObj)) {
  // This never runs! fakeDateObj is not a Date instance
  console.log(fakeDateObj.toISOString());
}
```

**Solution**: Only actual Date instances return `true`. Use duck typing if needed.

```typescript
// CORRECT: Check for specific methods if duck typing is needed
function hasDateMethods(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "getTime" in value &&
    typeof (value as any).getTime === "function"
  );
}

// Or better: ensure you're working with real Date instances
const realDate = new Date("2025-01-01");
if (isDate(realDate)) {
  console.log(realDate.toISOString()); // Works correctly
}
```

## Related Functions

- **[`isValid`](./isValid.md)**: Checks if a Date object or timestamp represents a valid date value. Use `isValid` to verify that a date is not only a Date instance but also has a valid date value.
- **Combined Usage**: For complete date validation, use both functions: `isDate(value) && isValid(value)` to ensure the value is both a Date instance and contains a valid date.
