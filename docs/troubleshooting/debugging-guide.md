# Debugging Guide

## Overview

This guide provides systematic approaches to debugging date/time issues when using Chronia.

## Debugging Checklist

When encountering issues, check these items in order:

1. ✅ **Input Validation**: Are all inputs valid dates/numbers?
2. ✅ **Return Value Check**: Did the function return an error value?
3. ✅ **Type Correctness**: Are types matching expectations (Date vs number)?
4. ✅ **Month Indexing**: Are you using 0-based months (0-11)?
5. ✅ **Timezone Awareness**: Is timezone causing unexpected behavior?
6. ✅ **Format Tokens**: Are format tokens correct (M vs m)?
7. ✅ **Boundary Conditions**: Are boundary semantics understood?
8. ✅ **Immutability**: Are you expecting mutation vs. new instances?

## Systematic Debugging Approach

### Step 1: Validate Inputs

Always start by checking input validity.

```typescript
import { isValid } from "chronia";

const date = new Date(userInput);
const amount = userAmount;

console.log("Date valid?", isValid(date));
console.log("Amount valid?", Number.isFinite(amount));

if (!isValid(date)) {
  console.error("Invalid date:", userInput);
}

if (!Number.isFinite(amount)) {
  console.error("Invalid amount:", userAmount);
}
```

### Step 2: Check Return Values

Verify function results before using them.

```typescript
import { addMonths, isValid } from "chronia";

const result = addMonths(date, 3);

console.log("Result:", result);
console.log("Result valid?", isValid(result));
console.log("Result timestamp:", result.getTime());

if (!isValid(result)) {
  console.error("Function returned Invalid Date");
  console.error("Input date:", date);
  console.error("Input amount:", 3);
}
```

### Step 3: Inspect Intermediate Values

Log all intermediate steps.

```typescript
import { addDays, addMonths, format } from "chronia";

const start = new Date(2024, 0, 31);
console.log("Start:", format(start, "yyyy-MM-dd"));

const step1 = addMonths(start, 1);
console.log("After +1 month:", format(step1, "yyyy-MM-dd"));
// Feb 29, 2024 (month-end adjustment)

const step2 = addDays(step1, 1);
console.log("After +1 day:", format(step2, "yyyy-MM-dd"));
// Mar 1, 2024
```

### Step 4: Isolate the Problem

Test functions individually.

```typescript
import { addMonths, isValid } from "chronia";

// Test with known-good input
const knownGood = new Date(2024, 0, 15);
const result1 = addMonths(knownGood, 1);
console.log("Known good:", isValid(result1), result1);

// Test with problematic input
const problematic = userDate;
const result2 = addMonths(problematic, 1);
console.log("Problematic:", isValid(result2), result2);
```

## Common Debugging Scenarios

### Scenario 1: Invalid Date Results

**Symptom:** Function returns Invalid Date.

**Debugging Steps:**

```typescript
import { addDays, isValid } from "chronia";

const result = addDays(date, amount);

if (!isValid(result)) {
  // Check input date
  console.log("Input date:", date);
  console.log("Input date valid?", isValid(date));
  console.log("Input date timestamp:", date.getTime());
  
  // Check input amount
  console.log("Amount:", amount);
  console.log("Amount type:", typeof amount);
  console.log("Amount is finite?", Number.isFinite(amount));
  
  // Check for NaN/Infinity
  if (isNaN(amount)) {
    console.error("Amount is NaN");
  }
  if (amount === Infinity || amount === -Infinity) {
    console.error("Amount is Infinity");
  }
}
```

### Scenario 2: Unexpected Date Values

**Symptom:** Date is valid but value is unexpected.

**Debugging Steps:**

```typescript
import { format, getYear, getMonth, getDay } from "chronia";

const date = /* unexpected date */;

console.log("Formatted:", format(date, "yyyy-MM-dd HH:mm:ss"));
console.log("Year:", getYear(date));
console.log("Month:", getMonth(date), "(0-based)");
console.log("Day:", getDay(date));
console.log("Timestamp:", date.getTime());
console.log("ISO String:", date.toISOString());
console.log("Local String:", date.toString());

// Check timezone offset
console.log("Timezone offset (minutes):", date.getTimezoneOffset());
```

### Scenario 3: Format/Parse Failures

**Symptom:** `parse()` returns Invalid Date.

**Debugging Steps:**

```typescript
import { parse, isValid, format } from "chronia";

const input = "2024-06-15";
const pattern = "yyyy-MM-dd";

const result = parse(input, pattern);

if (!isValid(result)) {
  console.error("Parse failed");
  console.log("Input:", input);
  console.log("Pattern:", pattern);
  console.log("Input length:", input.length);
  console.log("Pattern length:", pattern.length);
  
  // Try formatting a known date with same pattern
  const test = new Date(2024, 5, 15);
  console.log("Test format:", format(test, pattern));
  // Compare with input to find differences
}
```

### Scenario 4: Comparison Failures

**Symptom:** Boolean comparison returns unexpected result.

**Debugging Steps:**

```typescript
import { isAfter, isValid, format, diffMilliseconds } from "chronia";

const date1 = /* first date */;
const date2 = /* second date */;

console.log("Date1:", format(date1, "yyyy-MM-dd HH:mm:ss.SSS"));
console.log("Date2:", format(date2, "yyyy-MM-dd HH:mm:ss.SSS"));

console.log("Date1 valid?", isValid(date1));
console.log("Date2 valid?", isValid(date2));

console.log("Date1 timestamp:", date1.getTime());
console.log("Date2 timestamp:", date2.getTime());

const diff = diffMilliseconds(date2, date1);
console.log("Difference (ms):", diff);

const result = isAfter(date1, date2);
console.log("isAfter result:", result);

if (!isValid(date1) || !isValid(date2)) {
  console.error("One or both dates are invalid");
}
```

## Console Logging Patterns

### Pattern 1: Comprehensive Date Logging

```typescript
function logDate(label: string, date: Date): void {
  console.group(label);
  console.log("Valid:", isValid(date));
  console.log("ISO:", date.toISOString());
  console.log("Local:", date.toString());
  console.log("Timestamp:", date.getTime());
  console.log("Formatted:", format(date, "yyyy-MM-dd HH:mm:ss.SSS"));
  console.groupEnd();
}

logDate("Input Date", inputDate);
logDate("Result Date", resultDate);
```

### Pattern 2: Function Call Tracing

```typescript
function traceCall<T>(
  fnName: string,
  fn: () => T,
  ...args: any[]
): T {
  console.group(`${fnName}(${args.map(JSON.stringify).join(", ")})`);
  console.time("Duration");
  
  const result = fn();
  
  console.log("Result:", result);
  console.timeEnd("Duration");
  console.groupEnd();
  
  return result;
}

const result = traceCall(
  "addDays",
  () => addDays(date, 7),
  date,
  7
);
```

### Pattern 3: Validation Pipeline

```typescript
function debugValidation(value: any, label: string): void {
  console.log(`=== ${label} ===`);
  console.log("Value:", value);
  console.log("Type:", typeof value);
  console.log("instanceof Date:", value instanceof Date);
  
  if (value instanceof Date) {
    console.log("isValid:", isValid(value));
    console.log("getTime:", value.getTime());
    console.log("isNaN(getTime):", isNaN(value.getTime()));
  }
  
  if (typeof value === "number") {
    console.log("isFinite:", Number.isFinite(value));
    console.log("isNaN:", isNaN(value));
    console.log("=== Infinity:", value === Infinity);
    console.log("=== -Infinity:", value === -Infinity);
  }
}

debugValidation(userDate, "User Date");
debugValidation(amount, "Amount");
```

## Browser DevTools Tips

### Inspect Date Objects

In browser console:

```javascript
// Inspect date structure
console.dir(date);

// View all date methods
console.log(Object.getOwnPropertyNames(Date.prototype));

// Check prototype chain
console.log(date.__proto__);

// Formatted table view
console.table({
  "ISO": date.toISOString(),
  "Timestamp": date.getTime(),
  "Year": date.getFullYear(),
  "Month": date.getMonth(),
  "Day": date.getDate()
});
```

### Breakpoints

Set conditional breakpoints:

```typescript
import { addDays, isValid } from "chronia";

const result = addDays(date, amount);

// Set breakpoint on next line with condition: !isValid(result)
if (!isValid(result)) {
  debugger;  // Breakpoint triggers only when invalid
}
```

### Performance Profiling

```typescript
console.profile("Date Operations");

for (let i = 0; i < 1000; i++) {
  addDays(new Date(), i);
}

console.profileEnd("Date Operations");
```

## Test-Driven Debugging

### Create Minimal Reproduction

```typescript
import { describe, it, expect } from "vitest";
import { addMonths, isValid } from "chronia";

describe("Bug reproduction", () => {
  it("reproduces the issue", () => {
    const input = new Date(2024, 0, 31);
    const result = addMonths(input, 1);
    
    console.log("Input:", input);
    console.log("Result:", result);
    
    expect(isValid(result)).toBe(true);
    expect(result).toEqual(new Date(2024, 1, 29)); // Feb 29
  });
});
```

### Test Edge Cases

```typescript
describe("Edge cases", () => {
  it("handles Invalid Date input", () => {
    const invalid = new Date("invalid");
    const result = addDays(invalid, 7);
    expect(isValid(result)).toBe(false);
  });

  it("handles NaN amount", () => {
    const result = addDays(new Date(), NaN);
    expect(isValid(result)).toBe(false);
  });

  it("handles Infinity amount", () => {
    const result = addDays(new Date(), Infinity);
    expect(isValid(result)).toBe(false);
  });
});
```

## Common Error Messages

### "Invalid Date"

**Meaning:** Date object has NaN timestamp.

**Causes:**
- Invalid date string passed to constructor
- Chronia function returned error value
- Arithmetic overflow

**Debug:**
```typescript
console.log(date.getTime());  // NaN
console.log(isValid(date));   // false
```

### "NaN"

**Meaning:** Numeric operation failed.

**Causes:**
- Invalid date inputs to diff* functions
- Invalid numeric inputs

**Debug:**
```typescript
console.log(isNaN(result));           // true
console.log(Number.isFinite(result)); // false
```

### TypeScript Errors

#### "Argument of type 'X' is not assignable to parameter of type 'Date | number'"

**Cause:** Passing wrong type to function.

**Fix:**
```typescript
// WRONG
addDays("2024-01-15", 7);  // String not accepted

// CORRECT
addDays(new Date("2024-01-15"), 7);
```

#### "Cannot find name 'isValid'"

**Cause:** Not imported.

**Fix:**
```typescript
import { isValid } from "chronia";
```

## Debugging Helpers

### Create Debugging Wrappers

```typescript
import { isValid } from "chronia";

function debugAddDays(date: Date, amount: number): Date {
  console.group("addDays");
  
  console.log("Input date:", date, isValid(date));
  console.log("Amount:", amount, Number.isFinite(amount));
  
  const result = addDays(date, amount);
  
  console.log("Result:", result, isValid(result));
  console.groupEnd();
  
  return result;
}
```

### Validation Assertions

```typescript
function assertValid(date: Date, label: string): asserts date is Date {
  if (!isValid(date)) {
    console.error(`${label} is invalid:`, date);
    throw new Error(`${label} must be valid Date`);
  }
}

// Usage
assertValid(userDate, "User Date");
const result = addDays(userDate, 7);  // TypeScript knows userDate is valid
```

### Debug Mode Flag

```typescript
const DEBUG = process.env.NODE_ENV === "development";

function debugLog(...args: any[]): void {
  if (DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}

// Usage
debugLog("Adding days:", date, amount);
const result = addDays(date, amount);
debugLog("Result:", result);
```

## Stack Traces

### Reading Stack Traces

When errors occur, check:

1. **Line number**: Where error originated
2. **Function name**: Which function failed
3. **Call chain**: How you got there

```typescript
try {
  const date = new Date("invalid");
  if (!isValid(date)) {
    throw new Error("Invalid date");
  }
} catch (error) {
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
}
```

### Custom Error Messages

```typescript
import { isValid } from "chronia";

function validateDateWithContext(
  date: Date,
  fieldName: string,
  source: string
): void {
  if (!isValid(date)) {
    throw new Error(
      `Invalid ${fieldName} from ${source}: ${date}\n` +
      `Timestamp: ${date.getTime()}\n` +
      `Type: ${typeof date}`
    );
  }
}

// Usage
validateDateWithContext(userDate, "start date", "user input");
```

## Performance Debugging

### Identify Bottlenecks

```typescript
console.time("Operation");

// Your code here
for (let i = 0; i < 10000; i++) {
  addDays(new Date(), i);
}

console.timeEnd("Operation");
```

### Compare Approaches

```typescript
console.time("Approach 1");
for (let i = 0; i < 10000; i++) {
  isAfter(dates[i], new Date());  // Creates new Date each iteration
}
console.timeEnd("Approach 1");

console.time("Approach 2");
const now = new Date();
for (let i = 0; i < 10000; i++) {
  isAfter(dates[i], now);  // Reuses same Date
}
console.timeEnd("Approach 2");
```

## Getting Help

### Information to Provide

When reporting issues, include:

1. **Chronia version**: `package.json` version
2. **Environment**: Node.js version, browser, OS
3. **Minimal reproduction**: Smallest code that shows issue
4. **Expected vs. actual**: What you expected and what happened
5. **Inputs**: Example inputs that cause issue
6. **Validation results**: `isValid()` checks

### Example Issue Report

```markdown
**Version:** Chronia 1.0.0
**Environment:** Node.js 20.x, macOS
**Issue:** addMonths returns unexpected date

**Code:**
```typescript
const date = new Date(2024, 0, 31);
const result = addMonths(date, 1);
console.log(result); // Feb 29, 2024
```

**Expected:** Feb 31, 2024 (or error)
**Actual:** Feb 29, 2024

**Validation:**
- Input valid: true
- Result valid: true

**Question:** Is this month-end adjustment intended behavior?
```

## Related

- **Common Pitfalls**: See `common-pitfalls.md` for common mistakes
- **Error Handling**: See `error-handling.md` for error patterns
- **Input Validation**: See `input-validation.md` for validation strategies
