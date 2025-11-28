---
name: error-handling-standard
description: Defines the "no exceptions for invalid dates" philosophy and return value patterns for graceful degradation. Use when deciding return values for invalid inputs or choosing between throwing exceptions vs returning safe defaults.
---

## Description

Defines the "no exceptions for invalid dates" philosophy and return value patterns for graceful degradation. This skill specifies which default value each function category should return for invalid inputs, enabling predictable error handling without exceptions.

## When to Use

- When deciding what value to return for invalid date inputs
- When choosing between throwing exceptions vs returning safe defaults
- When designing return values for new function categories
- When writing error messages for rare exception cases (programming errors only)

## Instructions

### Step 1: Identify Function Category

1. Determine the function's category: validation, comparison, transformation, or accessor
2. Select the appropriate default return value for that category

### Step 2: Apply Return Value Pattern

1. **Validation functions** (e.g., `isValid`, `isDate`): Return `false` for invalid inputs
2. **Comparison functions** (e.g., `isBefore`, `isAfter`): Return `false` for invalid inputs
3. **Transformation functions**:
   - Date-returning functions (e.g., `addDays`, `setMonth`): Return `new Date(NaN)` (Invalid Date) for invalid inputs
   - String-returning functions (e.g., `formatDate`): Return empty string `""` or a safe empty value appropriate for the return type
   - Other return types: Return a "safe empty" value appropriate for the return type (e.g., `[]` for arrays, `{}` for objects)
4. **Accessor functions** (e.g., `getYear`, `getMonth`): Return `NaN` for invalid inputs

### Step 3: Never Throw for Invalid Dates

1. NEVER throw exceptions for Invalid Date, NaN, Infinity, or -Infinity inputs
2. Only throw exceptions for programming errors (e.g., invalid option values)

### Step 4: Exception Messages (Rare Cases)

1. When exceptions are necessary (for options/configuration errors), include valid alternatives in the message
2. Format: `"Invalid {param}: expected one of {validOptions}, got {actual}"`

## Tools Required

- **Read**: For reading existing error handling patterns
- **Edit**: For implementing return value logic
- **Grep**: For searching return value patterns across function categories

## Examples

### Example 1: Validation function → Return `false`

**Context**: Validation functions always return `false` for invalid inputs

```typescript
export function isValid(date: Date | number): boolean {
  if (!isValidDateOrNumber(date)) return false; // ← Return false
  return true;
}
```

### Example 2: Comparison function → Return `false`

**Context**: Comparison functions return `false` when any input is invalid

```typescript
export function isBefore(a: Date | number, b: Date | number): boolean {
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false; // ← Return false

  const dtA = new Date(a);
  const dtB = new Date(b);
  return dtA.getTime() < dtB.getTime();
}
```

### Example 3: Transformation function → Return `new Date(NaN)` (Invalid Date)

**Context**: Transformation functions that return Date objects return Invalid Date for invalid inputs

```typescript
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN); // ← Return Invalid Date

  const dt = new Date(date);
  dt.setDate(dt.getDate() + Math.trunc(amount));
  return dt;
}
```

### Example 4: Accessor function → Return `NaN`

**Context**: Accessor functions return NaN for invalid inputs

```typescript
export function getYear(date: Date | number): number {
  if (!isValidDateOrNumber(date)) return NaN; // ← Return NaN

  const dt = new Date(date);
  return dt.getFullYear();
}
```

### Example 5: Transformation function → Return safe empty value for string

**Context**: Transformation functions that return strings return empty string for invalid inputs

```typescript
export function formatDate(date: Date | number, pattern: string): string {
  // Invalid date → return safe default, DON'T throw
  if (!isValidDateOrNumber(date)) return ""; // ← Return empty string

  // Invalid option → throw with clear message
  const validPatterns = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
  if (!validPatterns.includes(pattern)) {
    throw new Error(
      `Invalid pattern: expected one of ${validPatterns.join(", ")}, got "${pattern}"`
    );
  }
  // ... implementation
}
```

### Example 6: Exception for programming errors (NOT for invalid dates)

**Context**: Only throw exceptions for configuration/option errors, never for invalid dates

```typescript
export function formatDate(date: Date | number, pattern: string): string {
  // Invalid date → return default, DON'T throw
  if (!isValidDateOrNumber(date)) return "";

  // Invalid option → throw with clear message
  const validPatterns = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
  if (!validPatterns.includes(pattern)) {
    throw new Error(
      `Invalid pattern: expected one of ${validPatterns.join(", ")}, got "${pattern}"`
    );
  }
  // ...
}
```

## Best Practices

- **Never throw for invalid dates**: Invalid Date, NaN, Infinity → always return safe defaults, never throw
- **Consistent return values by category**: Validation/Comparison→false, Transformation→type-appropriate safe value, Accessor→NaN
- **Type-appropriate defaults**: Choose defaults that make sense for the return type (false, NaN, Invalid Date for dates, "" for strings, etc.)
- **Throw only for programming errors**: Invalid options/configuration can throw with clear messages
- **Include valid alternatives in error messages**: List valid options when throwing for configuration errors
- **Document return behavior**: In JSDoc `@remarks`, explicitly state which invalid inputs return which defaults
- **Enable function composition**: Invalid Date should propagate through chains (e.g., `addDays(new Date(NaN), 5)` → Invalid Date)

## Common Pitfalls

- **Throwing exceptions for invalid dates**: Breaks graceful degradation philosophy; use return values instead
- **Inconsistent return values**: Using different defaults for the same function category (e.g., returning `null` instead of `false` for comparison)
- **Returning `undefined`**: Always return explicit defaults (`false`, `NaN`, Invalid Date), never `undefined`
- **Throwing for both dates and options**: Only throw for programming errors (options), never for invalid date inputs
- **Vague error messages**: When throwing, always list valid alternatives (e.g., "expected one of X, Y, Z")

## Constraints

- **No exceptions for invalid dates**: MUST NOT throw for Invalid Date, NaN, Infinity, -Infinity
- **Category-specific defaults required**: MUST use designated defaults (validation/comparison→false, transformation→type-appropriate safe value, accessor→NaN)
- **Exception messages must include alternatives**: When throwing for options, MUST list valid values
