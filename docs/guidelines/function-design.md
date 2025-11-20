# Function Design Guidelines

## Purpose

This document defines the design principles and patterns for designing functions in the Chronia library. Following these guidelines ensures consistency, reliability, and ease of use across the entire API surface.

Use this guideline when planning the interface and behavior of new functions before implementation.

## Core Design Principles

### 1. Date Type Flexibility

All functions that accept date parameters MUST support both Date objects and numeric timestamps.

**Rule**: Date parameters should be typed as `Date | number`.

**Rationale**: This flexibility allows users to work with dates in their preferred format without constant conversion, improving developer experience and code readability.

**Example**:

```typescript
// Good: Accepts both types
export function isValid(date: Date | number): boolean {
  // Implementation
}

// Usage
isValid(new Date(2025, 0, 1));  // Date object
isValid(1704067200000);          // Timestamp
```

**Bad**:

```typescript
// Bad: Forces users to convert
export function isValid(date: Date): boolean {
  // Implementation
}

// Forces conversion
isValid(new Date(1704067200000));  // Unnecessary conversion
```

---

### 2. Options Parameter Pattern

Functions with configurable behavior MUST consolidate all optional parameters into a single `options` object.

**Rule**: Use `options?: OptionsType` as the last parameter for any optional configuration.

**Rationale**: This pattern provides better extensibility, clearer API surface, and easier backward compatibility when adding new options.

**Example**:

```typescript
// Good: Options consolidated
export function isBefore(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions
): boolean {
  const unit = options?.unit ?? "millisecond";
  // Implementation
}

// Usage
isBefore(date1, date2);
isBefore(date1, date2, { unit: "day" });
```

**Bad**:

```typescript
// Bad: Multiple optional parameters
export function isBefore(
  a: Date | number,
  b: Date | number,
  unit?: TimeUnit,
  strict?: boolean
): boolean {
  // Implementation
}

// Confusing usage
isBefore(date1, date2, undefined, true);  // What does true mean?
```

---

### 3. Error Handling Philosophy

Functions SHOULD NOT throw exceptions for invalid dates. Instead, return appropriate default values.

**Guidelines**:

| Function Type | Invalid Input Behavior | Return Value |
| --------------- | ------------------------ | -------------- |
| Validation functions (e.g., `isValid`) | Return `false` | `boolean` |
| Comparison functions (e.g., `isBefore`) | Return `false` | `boolean` |
| Transformation functions (e.g., `addDays`) | Return Invalid Date | `Date` |
| Accessor functions (e.g., `getYear`) | Return `NaN` | `number` |

**Rationale**: Graceful degradation prevents unexpected crashes and makes the library easier to use in production environments.

**Example**:

```typescript
// Comparison function
export function isBefore(a: Date | number, b: Date | number): boolean {
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;
  // ...
}

// Transformation function
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date)) return new Date(NaN);
  // ...
}
```

---

### 4. Type Definitions

Options types MUST be defined in `src/types.ts` and exported for public use.

**Rule**: All option interfaces should be documented with JSDoc comments.

**Example**:

```typescript
// src/types.ts

/**
 * Options for configuring date comparison functions with unit granularity.
 */
export type ComparisonOptions = {
  /**
   * The unit of comparison.
   * @default "millisecond"
   */
  unit?: TimeUnit;
};
```

**Rationale**: Centralized type definitions improve discoverability and ensure consistency across the library.

---

### 5. Default Values

Optional parameters MUST have sensible defaults that match the most common use case.

**Pattern**:

```typescript
export function functionName(
  date: Date | number,
  options?: FunctionOptions
): ReturnType {
  // Use nullish coalescing for defaults
  const unit = options?.unit ?? "millisecond";
  const someFlag = options?.someFlag ?? true;

  // Implementation
}
```

**Common Defaults**:

- `unit`: `"millisecond"` (most precise)
- `bounds`: `"()"` (exclusive boundaries)
- `order`: `"ASC"` (ascending order)

**Rationale**: Good defaults minimize configuration while supporting advanced use cases.

---

## Naming Conventions

### Function Names

- Use camelCase
- Use descriptive, verb-based names for actions (e.g., `addDays`, `formatDate`)
- Use `is` prefix for boolean predicates (e.g., `isValid`, `isBefore`)
- Use `get` prefix for accessor functions (e.g., `getYear`, `getMonth`)

**Examples**:

```typescript
// Good
isValid(date)
isBefore(a, b)
addDays(date, 5)
getYear(date)
formatDate(date, pattern)

// Bad
valid(date)          // Missing 'is' prefix
before(a, b)         // Missing 'is' prefix
daysAdd(date, 5)     // Verb should come first
yearOf(date)         // Use 'get' prefix
toFormat(date, pat)  // Unclear
```

---

### Parameter Names

- Use descriptive single-word names when possible
- For date parameters: `date`, `a`/`b` (for comparisons), `start`/`end` (for ranges)
- For numeric parameters: `amount`, `value`, `count`
- For options: always use `options`

---

## Design Patterns by Function Category

### Comparison Functions

**Signature Pattern**:

```typescript
export function isXxx(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions
): boolean
```

**Design Considerations**:
- Support unit-based granularity via options
- Return `false` for invalid inputs
- Provide fast path for millisecond precision

---

### Transformation Functions

**Signature Pattern**:

```typescript
export function addXxx(
  date: Date | number,
  amount: number
): Date
```

**Design Considerations**:
- Return new Date object (immutability)
- Return Invalid Date for invalid inputs
- Support negative amounts for subtraction-like behavior

---

### Accessor Functions

**Signature Pattern**:

```typescript
export function getXxx(date: Date | number): number
```

**Design Considerations**:
- Return `NaN` for invalid inputs
- Use native Date methods when possible
- No options needed (single responsibility)

---

### Validation Functions

**Signature Pattern**:

```typescript
export function isXxx(value: unknown): value is ExpectedType
```

**Design Considerations**:
- Use TypeScript type guards when applicable
- Return boolean
- No exceptions thrown

---

## Versioning and Breaking Changes

When modifying existing functions:

1. **Adding optional parameters**: Safe (use options object)
2. **Changing default behavior**: Breaking change (requires major version)
3. **Adding new options**: Safe (must have sensible defaults)
4. **Removing options**: Breaking change
5. **Changing return type**: Breaking change

**Best Practice**: Always add new behavior via options with safe defaults.

---

## See Also

- [Function Implementation Guidelines](./function-implementation.md) - Guidelines for implementing functions
- [Function Testing Guidelines](./function-testing.md) - Guidelines for testing functions
- [Function Check Guidelines](./function-check.md) - Guidelines for quality checks
- [Function Documentation Guidelines](./documentation-function.md) - Guidelines for documenting functions
- [Category README Documentation Guidelines](./documentation-category.md) - Guidelines for category documentation
