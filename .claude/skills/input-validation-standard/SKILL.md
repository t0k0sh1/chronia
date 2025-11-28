---
name: input-validation-standard
description: Standardizes input validation patterns for type safety and robustness using internal validator utilities. Use when validating function parameters at entry points, handling Date and number inputs, implementing type guards, or writing defensive code for edge cases.
---

## Description

Standardizes input validation patterns for type safety and robustness using internal validator utilities from `src/_lib/validators.ts`. This skill ensures consistent validation across all functions by leveraging shared validator functions and early validation patterns.

## When to Use

- When validating function parameters at entry points before processing
- When handling both Date objects and numeric timestamp inputs
- When implementing type guards for custom validation logic
- When writing defensive code to handle edge cases (Invalid Date, NaN, Infinity)
- When ensuring type safety with `Date | number` parameter patterns

## Instructions

### Step 1: Import Internal Validators

1. Import required validators from `src/_lib/validators.ts`:
   - `isValidDateOrNumber(value)` - For date/timestamp parameters
   - `isValidNumber(value)` - For numeric parameters (amount, count, etc.)
   - `isValidDate(value)` - For Date-only validation (rare)
   - `isDateInstance(value)` - For type checking without validation (rare)

### Step 2: Early Validation Pattern

1. Place validation at the **very beginning** of the function, before any processing
2. Use early return with appropriate default value (see error-handling-standard Skill)
3. Validate **all** inputs that could be invalid (dates, amounts, options)

### Step 3: Validate Date/Timestamp Parameters

1. For `date: Date | number` parameters, use `isValidDateOrNumber(date)`
2. Reject Invalid Date, NaN, Infinity, -Infinity
3. After validation passes, convert to Date if needed: `const dt = new Date(date)`

### Step 4: Validate Numeric Parameters

1. For numeric parameters (amount, count, index), use `isValidNumber(value)`
2. This checks `typeof value === "number" && isFinite(value)`
3. Rejects NaN, Infinity, -Infinity

### Step 5: Handle Multiple Parameters

1. For functions with multiple inputs, validate all before processing
2. Use logical AND (`&&`) to ensure all validations pass
3. Example: `if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return default;`

### Step 6: Type Guards (Advanced)

1. When creating custom validators, use TypeScript type guards: `value is Type`
2. Follow the pattern in `src/_lib/validators.ts` for consistency
3. Combine simple validators with OR/AND logic for complex validations

## Tool Required

- **Read**: For reading `src/_lib/validators.ts` and existing validation patterns
- **Edit**: For implementing validation logic in functions
- **mcp__Serena__find_symbol**: For finding validator function signatures in `src/_lib/validators.ts`
- **mcp__Serena__search_for_pattern**: For finding validation pattern examples across codebase

## Examples

### Example 1: Single date parameter validation

**Context**: Validating a single Date or timestamp input

```typescript
import { isValidDateOrNumber } from "../_lib/validators";

export function getYear(date: Date | number): number {
  // Early validation at function entry
  if (!isValidDateOrNumber(date)) return NaN;

  const dt = new Date(date);
  return dt.getFullYear();
}
```

### Example 2: Multiple date parameters validation

**Context**: Validating multiple date inputs with logical AND

```typescript
import { isValidDateOrNumber } from "../_lib/validators";

export function isBefore(a: Date | number, b: Date | number): boolean {
  // Validate all inputs; fail if ANY is invalid
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;

  const dtA = new Date(a);
  const dtB = new Date(b);
  return dtA.getTime() < dtB.getTime();
}
```

### Example 3: Date and numeric parameter validation

**Context**: Validating both date and numeric (amount) parameters

```typescript
import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

export function addDays(date: Date | number, amount: number): Date {
  // Validate both date AND amount
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  dt.setDate(dt.getDate() + Math.trunc(amount));
  return dt;
}
```

### Example 4: Type guard pattern (internal validator example)

**Context**: Creating a custom validator with TypeScript type guard

```typescript
// From src/_lib/validators.ts

export function isValidDateOrNumber(value: unknown): value is Date | number {
  // Type guard: narrows type to Date | number
  return isValidDate(value) || isValidNumber(value);
}

export function isValidDate(value: unknown): value is Date {
  if (!(value instanceof Date)) return false;
  return !isNaN(value.getTime());
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}
```

### Example 5: Fast path optimization with validation

**Context**: Optimizing common case while maintaining validation

```typescript
import { isValidDateOrNumber } from "../_lib/validators";

export function getTime(date: Date | number): number {
  // Validate first
  if (!isValidDateOrNumber(date)) return NaN;

  // Fast path: avoid unnecessary object creation
  return typeof date === "number" ? date : date.getTime();
}
```

## Best Practices

- **Always use internal validators**: Use `isValidDateOrNumber()` and `isValidNumber()` from `src/_lib/validators.ts` for consistency
- **Validate at entry point**: Place all validation checks at the very beginning before any processing
- **Validate all inputs**: Check every parameter that could be invalid (dates, numbers, options)
- **Fail fast with early return**: Return immediately when validation fails; don't process invalid data
- **Use type guards**: Leverage TypeScript's type narrowing with `value is Type` pattern
- **Combine validators with logic**: Use `&&` for multiple required validations, `||` for alternative valid types
- **Avoid redundant validation**: After `isValidDateOrNumber()` passes, you can safely use the value
- **Document validation behavior**: In JSDoc `@remarks`, state which invalid inputs are rejected

## Common Pitfalls

- **Validating after processing**: Always validate BEFORE any computation or conversion
- **Not validating all parameters**: Check every input that could be invalid (date, amount, options)
- **Creating custom validators**: Prefer existing validators from `src/_lib/validators.ts` over custom logic
- **Forgetting numeric validation**: Numbers need `isValidNumber()` check to reject NaN/Infinity
- **Late conversion to Date**: Validate with `isValidDateOrNumber()` first, then convert with `new Date()`
- **Incomplete validation**: Missing checks for edge cases like Infinity or Invalid Date

## Constraints

- **Internal validators required**: MUST use validators from `src/_lib/validators.ts`, not custom validation logic
- **Early validation mandatory**: Validation MUST occur at function entry point before any processing
- **Type guard pattern**: Custom validators MUST use TypeScript type guard pattern (`value is Type`)
