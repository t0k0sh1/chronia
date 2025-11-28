---
name: coding-standards
description: Enforces TypeScript coding standards and architectural patterns for the Chronia date/time library. Use when designing function signatures, implementing new functions, reviewing code for consistency, or creating JSDoc documentation for public APIs.
allowed-tools: Read,Edit,Write,Grep,Glob,mcp__Serena__find_symbol,mcp__Serena__get_symbols_overview
---

## Description

Enforces TypeScript coding standards and architectural patterns for the Chronia date/time library. This skill ensures consistency, type safety, and maintainability across the entire codebase through strict adherence to established design principles and implementation patterns.

## When to Use

- When designing new function signatures before implementation (pre-implementation phase)
- When implementing new functions following the project's modular structure
- When reviewing code for consistency, maintainability, and adherence to project standards
- When creating or updating JSDoc documentation for public APIs
- When refactoring existing code to align with architectural patterns

## Instructions

### Phase 1: Type Safety and Signatures

1. **Define explicit types**: Use TypeScript strict mode with explicit type annotations for all parameters and return values. NEVER use `any` type.
2. **Date type flexibility**: All date parameters MUST be typed as `Date | number` to support both Date objects and numeric timestamps.
3. **Options pattern**: Consolidate all optional parameters into a single `options?: OptionsType` object as the last parameter.
4. **Type definitions**: Define all option interfaces in `src/types.ts` with comprehensive JSDoc comments.

### Phase 2: File Structure and Organization

1. **Modular structure**: Implement each function in its own directory following the pattern `src/<function-name>/index.ts`.
2. **Clear boundaries**: Ensure each module has a single, well-defined responsibility with minimal coupling.
3. **Exports**: Export functions from the module's `index.ts` and re-export from the library's main `src/index.ts`.

### Phase 3: Naming and Documentation

1. **Naming conventions**: Use camelCase for function names, `is` prefix for boolean predicates, `get` prefix for accessors.
2. **JSDoc requirements**: Include Summary, Detailed Description, `@param`, `@returns`, `@example`, and `@remarks` sections.
3. **Parameter names**: Use descriptive single-word names (`date`, `a`/`b` for comparisons, `start`/`end` for ranges, `options` for configuration).

### Phase 4: Implementation Patterns

1. **Default values**: Use nullish coalescing (`??`) for sensible defaults that match the most common use case.
2. **Early returns**: Validate inputs early and return immediately to minimize unnecessary computation.
3. **Immutability**: Always return new Date objects; never mutate input parameters.
4. **Performance**: Provide fast paths for common cases (e.g., millisecond precision comparisons).

### Phase 5: Code Quality

1. **Single responsibility**: Keep functions focused on one clear purpose.
2. **Interface segregation**: Design minimal, focused interfaces that don't force consumers to depend on unused functionality.
3. **Meaningful names**: Use descriptive variable and function names that clearly communicate intent.
4. **Avoid duplication**: Extract common logic to internal utilities in `src/_lib/`.

## Tools Required

- **Read**: For reading existing source files to understand patterns
- **Edit**: For modifying existing function implementations
- **Write**: For creating new function files following the template
- **Grep**: For searching type definitions and finding usage patterns
- **Glob**: For locating files matching the `src/*/index.ts` pattern
- **mcp__Serena__find_symbol**: For finding type definitions and function signatures
- **mcp__Serena__get_symbols_overview**: For understanding file structure before editing

## Examples

### Example 1: Type-safe function signature with Date flexibility

**Context**: Designing a new comparison function

```typescript
// Good: Flexible date types with options pattern
export function isBefore(
  a: Date | number,
  b: Date | number,
  options?: ComparisonOptions
): boolean {
  const unit = options?.unit ?? "millisecond";
  // Implementation
}

// Type definition in src/types.ts
export type ComparisonOptions = {
  /**
   * The unit of comparison.
   * @default "millisecond"
   */
  unit?: TimeUnit;
};
```

### Example 2: Modular file structure

**Context**: Implementing a new function

```typescript
// src/addDays/index.ts
import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Add the specified number of days to the given date.
 *
 * @param date - The base date as a Date object or timestamp
 * @param amount - The number of days to add
 * @returns A new Date object with the days added
 *
 * @example
 * ```typescript
 * addDays(new Date(2025, 0, 1), 5);
 * // Returns: 2025-01-06
 * ```
 *
 * @remarks
 * If the date or amount is invalid, an Invalid Date is returned.
 */
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  dt.setDate(dt.getDate() + Math.trunc(amount));
  return dt;
}
```

### Example 3: JSDoc with comprehensive documentation

**Context**: Documenting a validation function

```typescript
/**
 * Check if the given value is a valid Date or timestamp.
 *
 * This function checks if a Date object is valid (not Invalid Date) or if a
 * timestamp is a finite number. It returns false for Invalid Date, NaN,
 * Infinity, and -Infinity values.
 *
 * @param date - The Date object or timestamp to validate
 * @returns True if the date is valid, false otherwise
 *
 * @example
 * ```typescript
 * // Valid Date object
 * isValid(new Date(2025, 0, 1));  // Returns: true
 *
 * // Invalid Date
 * isValid(new Date("invalid"));   // Returns: false
 *
 * // Valid timestamp
 * isValid(Date.now());             // Returns: true
 * ```
 *
 * @remarks
 * - No exceptions are thrown; invalid values return false
 * - Accepts both Date objects and numeric timestamps
 * - Uses the same validation logic as other library functions for consistency
 */
export function isValid(date: Date | number): boolean {
  return isValidDateOrNumber(date);
}
```

### Example 4: Performance-optimized implementation

**Context**: Implementing a comparison function with fast path

```typescript
export function isBefore(
  a: Date | number,
  b: Date | number,
  options: ComparisonOptions = {},
): boolean {
  // Validate inputs early
  if (!isValidDateOrNumber(a) || !isValidDateOrNumber(b)) return false;

  const unit = options?.unit ?? "millisecond";

  // Fast path for millisecond precision (most common case)
  if (unit === "millisecond") {
    return compareDateTimes(a, b) === -1;
  }

  // Slower path for unit-based comparison
  const dtA = new Date(a);
  const dtB = new Date(b);
  const aTruncated = truncateToUnit(dtA, unit);
  const bTruncated = truncateToUnit(dtB, unit);
  return aTruncated.getTime() < bTruncated.getTime();
}
```

### Example 5: Type definitions in src/types.ts

**Context**: Defining option types with JSDoc

```typescript
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

/**
 * Time units supported by the library.
 */
export type TimeUnit =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond";
```

## Best Practices

- **Type safety first**: Always use explicit types and avoid `any`. Leverage TypeScript's type system to catch errors at compile time.
- **Date flexibility**: Accept both `Date | number` for all date parameters to improve developer experience and reduce conversion overhead.
- **Options pattern consistency**: Use a single options object for all optional parameters to enable future extensibility without breaking changes.
- **Sensible defaults**: Choose defaults that match the most common use case (e.g., `unit: "millisecond"`, `bounds: "()"`, `order: "ASC"`).
- **Early validation**: Validate inputs at the start of functions to fail fast and minimize wasted computation.
- **Immutability**: Always return new objects; never mutate input parameters to prevent side effects.
- **Performance optimization**: Provide fast paths for common scenarios (e.g., millisecond precision) while supporting advanced use cases.
- **Single responsibility**: Keep functions focused on one clear purpose to improve testability and maintainability.
- **Comprehensive JSDoc**: Document all public APIs with summary, parameters, return values, examples, and remarks.
- **Extract common logic**: Move shared validation and utility code to `src/_lib/` to reduce duplication and improve consistency.

## Common Pitfalls

- **Using `any` type**: This defeats TypeScript's type safety. Always use explicit types or generic constraints.
- **Multiple optional parameters**: Instead of `function foo(a, b?, c?, d?)`, use `function foo(a, options?)` for better extensibility.
- **Forcing Date-only parameters**: Always accept `Date | number` to avoid forcing unnecessary conversions.
- **Mutating input parameters**: Never modify input Date objects directly; always create and return new instances.
- **Missing JSDoc documentation**: Public APIs without comprehensive documentation are difficult to use and maintain.
- **Skipping validation**: Not validating inputs (Invalid Date, NaN, Infinity) leads to unexpected runtime errors.
- **Over-engineering**: Keep functions simple and focused; don't add features that aren't needed yet.
- **Inconsistent naming**: Not following the `is`/`get` prefix conventions reduces API discoverability.

## Constraints

- **TypeScript strict mode required**: All code MUST compile with `strict: true` in tsconfig.json.
- **No runtime dependencies**: The library must remain dependency-free for minimal bundle size.
- **No exceptions for invalid dates**: Functions MUST return appropriate default values (false, NaN, Invalid Date) instead of throwing.
- **Modular structure enforced**: Each function MUST reside in `src/<function-name>/index.ts` with no exceptions.
- **Breaking changes require major version**: Changing default behavior, removing options, or changing return types requires a major version bump.
