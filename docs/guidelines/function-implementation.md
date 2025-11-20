# Function Implementation Guidelines

## Purpose

This document defines the implementation patterns and best practices for writing function code in the Chronia library. Following these guidelines ensures high-quality, performant, and maintainable code.

Use this guideline when implementing functions after the design phase.

## File Structure

### Directory Organization

Each function MUST be implemented in its own directory under `src/`.

**Rule**: Functions should be organized as `src/<function-name>/index.ts`.

**Rationale**: This structure enables:

- Clear module boundaries
- Easy code navigation
- Simplified testing organization
- Better tree-shaking in bundlers

**Directory Structure**:

```text
src/
├── isValid/
│   └── index.ts
├── isBefore/
│   └── index.ts
├── isAfter/
│   └── index.ts
├── now/
│   └── index.ts
└── format/
    └── index.ts
```

---

### File Template

```typescript
// src/<function-name>/index.ts

import { isValidDateOrNumber } from "../_lib/validators";
import { YourOptionsType } from "../types";

/**
 * [Function description]
 *
 * [Detailed explanation]
 *
 * @param paramName - Parameter description
 * @param options - Optional configuration
 * @returns Return value description
 *
 * @example
 * ```typescript
 * // Example usage
 * ```
 */
export function functionName(
  param: Date | number,
  options?: YourOptionsType
): ReturnType {
  // Validation
  if (!isValidDateOrNumber(param)) return defaultValue;

  // Implementation
  // ...
}
```

---

## Implementation Patterns

### Input Validation

All functions MUST validate date inputs early and handle invalid values gracefully.

**Pattern**:

```typescript
export function functionName(date: Date | number): ReturnType {
  // Early validation for fast-fail
  if (!isValidDateOrNumber(date)) return false; // or throw, or return Invalid Date

  // Convert to Date if needed
  const dt = new Date(date);

  // Implementation
  // ...
}
```

**Invalid Values to Handle**:

- Invalid Date objects
- `NaN`
- `Infinity`
- `-Infinity`

**Example**:

```typescript
export function addDays(date: Date | number, amount: number): Date {
  // Validate date input
  if (!isValidDateOrNumber(date)) return new Date(NaN);

  // Validate amount input
  if (!isFinite(amount)) return new Date(NaN);

  const result = new Date(date);
  result.setDate(result.getDate() + Math.floor(amount));
  return result;
}
```

---

### Common Implementation Patterns by Function Category

#### Comparison Functions

```typescript
export function isXxx(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions
): boolean {
  // Validate both inputs
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;

  const dtA = new Date(a);
  const dtB = new Date(b);

  const unit = options?.unit ?? "millisecond";

  // Fast path for millisecond precision
  if (unit === "millisecond") {
    return dtA.getTime() OPERATOR dtB.getTime();
  }

  // Unit-based comparison
  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() OPERATOR bTruncated.getTime();
}
```

---

#### Transformation Functions

```typescript
export function addXxx(
  date: Date | number,
  amount: number
): Date {
  // Validate inputs
  if (!isValidDateOrNumber(date)) return new Date(NaN);
  if (!isFinite(amount)) return new Date(NaN);

  const result = new Date(date);
  // Perform transformation
  // ...
  return result;
}
```

**Key Points**:
- Always return a new Date object (immutability)
- Validate both date and amount parameters
- Use Math.floor() for fractional amounts

---

#### Accessor Functions

```typescript
export function getXxx(date: Date | number): number {
  // Validate input
  if (!isValidDateOrNumber(date)) return NaN;

  const dt = new Date(date);
  return dt.getXxx();
}
```

**Key Points**:
- Return NaN for invalid inputs
- Leverage native Date methods when possible
- Keep implementation simple and focused

---

#### Validation Functions

```typescript
export function isXxx(value: unknown): value is ExpectedType {
  // Type guard pattern
  // Return boolean indicating validity
}
```

**Key Points**:
- Use TypeScript type guards
- No exceptions thrown
- Clear boolean logic

---

## Performance Considerations

### Early Returns

Use early returns for validation and simple cases to minimize unnecessary computation.

```typescript
export function isBefore(a: Date | number, b: Date | number): boolean {
  // Early validation
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;

  const dtA = new Date(a);
  const dtB = new Date(b);

  // Fast path for millisecond comparison
  const unit = options?.unit ?? "millisecond";
  if (unit === "millisecond") {
    return dtA.getTime() < dtB.getTime();
  }

  // Slower path for unit-based comparison
  // ...
}
```

---

### Avoid Unnecessary Object Creation

Reuse Date objects when possible, and avoid creating temporary objects in hot paths.

```typescript
// Good: Minimal object creation
export function getTime(date: Date | number): number {
  if (!isValidDateOrNumber(date)) return NaN;
  return typeof date === 'number' ? date : date.getTime();
}

// Bad: Unnecessary conversion
export function getTime(date: Date | number): number {
  const dt = new Date(date);  // Unnecessary if date is already a number
  return dt.getTime();
}
```

---

### Optimize Common Paths

Provide fast paths for the most common use cases.

```typescript
export function compare(a: Date | number, b: Date | number): number {
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return NaN;

  // Fast path: both are numbers
  if (typeof a === 'number' && typeof b === 'number') {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  // Slower path: convert to timestamps
  const timeA = typeof a === 'number' ? a : a.getTime();
  const timeB = typeof b === 'number' ? b : b.getTime();
  return timeA < timeB ? -1 : timeA > timeB ? 1 : 0;
}
```

---

## JSDoc Comments

Every exported function MUST have comprehensive JSDoc comments.

### Required Sections

1. **Summary**: One-line description
2. **Detailed Description**: Multi-paragraph explanation
3. **@param**: All parameters with types and descriptions
4. **@returns**: Return value type and description
5. **@example**: At least one complete usage example
6. **@remarks**: Additional notes (optional but recommended)

### Template

```typescript
/**
 * [One-line summary of what the function does]
 *
 * [Detailed explanation of behavior, edge cases, and important notes]
 *
 * @param paramName - Description of parameter
 * @param options - Optional configuration
 * @param options.optionName - Description of specific option
 * @returns Description of return value
 *
 * @example
 * ```typescript
 * // Example usage
 * const result = functionName(new Date(), { option: value });
 * // Returns: expectedResult
 * ```
 *
 * @remarks
 * - Important note 1
 * - Important note 2
 */
```

### Example

```typescript
/**
 * Checks if a Date object or timestamp is valid.
 *
 * This function determines whether the provided Date object or timestamp
 * represents a valid date/time value. It returns false for Invalid Date,
 * NaN, Infinity, and -Infinity, ensuring safe handling of edge cases.
 *
 * @param date - A Date object or numeric timestamp to validate
 * @returns Returns true if the date is valid, false otherwise
 *
 * @example
 * ```typescript
 * import { isValid } from 'chronia';
 *
 * // Valid Date object
 * isValid(new Date(2025, 0, 1));  // Returns: true
 *
 * // Invalid Date object
 * isValid(new Date('invalid'));   // Returns: false
 *
 * // Valid timestamp
 * isValid(1704067200000);          // Returns: true
 *
 * // Invalid values
 * isValid(NaN);                    // Returns: false
 * isValid(Infinity);               // Returns: false
 * ```
 *
 * @remarks
 * - No exceptions are thrown; invalid values return false
 * - Uses the same validation logic as other Chronia functions for consistency
 * - Performance-optimized for high-frequency validation scenarios
 */
export function isValid(date: Date | number): boolean {
  if (typeof date === 'number') {
    return isFinite(date);
  }
  return date instanceof Date && isFinite(date.getTime());
}
```

---

## Code Quality

### Consistent Style

- Use TypeScript strict mode
- Follow project ESLint configuration
- Use meaningful variable names
- Keep functions focused and single-purpose

### Error Messages

When errors must be thrown (rare cases), provide clear, actionable messages:

```typescript
// Good
throw new Error('Invalid unit: expected one of year, month, day, hour, minute, second, millisecond');

// Bad
throw new Error('Invalid unit');
```

---

## See Also

- [Function Design Guidelines](./function-design.md) - Guidelines for designing functions
- [Function Testing Guidelines](./function-testing.md) - Guidelines for testing functions
- [Function Check Guidelines](./function-check.md) - Guidelines for quality checks
- [Function Documentation Guidelines](./documentation-function.md) - Guidelines for documenting functions
