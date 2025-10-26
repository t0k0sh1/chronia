# Development Principles

## Core Philosophy

Chronia follows a focused, TypeScript-first approach with emphasis on reliability, simplicity, and performance.

## Key Principles

### 1. No-Exceptions Error Handling

**Policy:** Never throw exceptions. Return standardized error values.

**Error Values by Return Type:**
- **Date functions**: Return `Invalid Date` (`new Date(NaN)`)
- **Numeric functions**: Return `NaN`
- **Boolean functions**: Return `false`

**Rationale:**
- Predictable error handling
- No try-catch overhead
- Consistent API surface

**Implementation Pattern:**
```typescript
export function someFunction(date: Date | number): Date {
  if (!isValidDateOrNumber(date)) {
    return new Date(NaN);  // NOT throw new Error()
  }
  // ... normal logic
}
```

### 2. TypeScript Type Safety with JavaScript Compatibility

**Dual Goals:**
- Strong TypeScript typing for type safety
- Full JavaScript compatibility

**Patterns:**
- Export comprehensive TypeScript types
- Runtime behavior works without types
- Accept both `Date` and `number` (timestamps)

```typescript
// TypeScript users get full type safety
const result: Date = addDays(new Date(), 7);

// JavaScript users get runtime validation
const result = addDays(new Date(), 7);  // Also works
```

### 3. Immutability

**Principle:** Never mutate input parameters.

```typescript
// ALWAYS return new instances
export function addDays(date: Date | number, amount: number): Date {
  const dt = new Date(date);
  dt.setDate(dt.getDate() + Math.trunc(amount));
  return dt;  // New instance, input unchanged
}
```

### 4. High-Frequency Functions Only

**Focus:** Include only commonly-needed date/time operations.

**In Scope:**
- Basic arithmetic (add/sub years, months, days, hours, etc.)
- Common comparisons (before, after, equal, between)
- Essential formatting/parsing
- Standard getters/setters

**Out of Scope:**
- Complex calendar calculations (e.g., business days, holidays)
- Timezone conversion utilities
- Duration/interval arithmetic beyond basic diff
- Specialized locale support beyond month/weekday names

### 5. Fractional Amount Truncation

**Principle:** Truncate fractional amounts toward zero using `Math.trunc()`.

```typescript
addDays(date, 1.9);   // Adds 1 day (not 2)
addDays(date, -1.9);  // Adds -1 day (not -2)
```

**Rationale:**
- Predictable behavior
- No surprising rounding
- Consistent with integer semantics

### 6. Options Parameter Pattern

**Guideline:** Use object parameter for optional configurations.

```typescript
// Recommended pattern
function compare(
  date1: Date | number,
  date2: Date | number,
  options: CompareOptions = { order: "ASC" }
): number;

// NOT multiple optional parameters
function compare(
  date1: Date | number,
  date2: Date | number,
  order?: "ASC" | "DESC",
  unit?: TimeUnit,
  ...  // Avoid this pattern
): number;
```

**Benefits:**
- Extensible without breaking changes
- Named parameters for clarity
- Easy to add new options

### 7. Function Organization

**Directory Structure:**
```
src/
  addDays/
    index.ts       # Function implementation
  addMonths/
    index.ts
  _lib/            # Internal utilities (not exported)
    validators.ts
    truncateToUnit.ts
    formatters/
    parsers/
```

**Naming Conventions:**
- One function per directory
- Directory name = function name
- Export from `src/index.ts`

### 8. Validation-First Approach

**Pattern:** Validate all inputs before processing.

```typescript
export function addDays(date: Date | number, amount: number): Date {
  // ALWAYS validate first
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  // Then process
  const dt = new Date(date);
  // ...
}
```

**Validators:**
- `isValidDateOrNumber(value)`: Checks Date or finite number
- `isValidNumber(value)`: Checks finite number (not NaN/±Infinity)

### 9. Performance Priorities

**Guidelines:**
- Avoid unnecessary object creation
- Use early returns for invalid inputs
- Optimize hot paths (millisecond comparisons)
- Accept minor overhead for clarity and safety

**Example:**
```typescript
// Fast path for common case
if (unit === "millisecond") {
  return dtA.getTime() > dtB.getTime();
}
// Slower path for unit-based comparison
const aTruncated = truncateToUnit(dtA, unit);
// ...
```

### 10. Local Timezone by Default

**Principle:** All operations use local timezone unless explicitly stated.

**Rationale:**
- Matches JavaScript Date behavior
- Most common use case
- UTC operations available via native Date methods

**Guidance for AI:**
- Warn users about timezone implications
- Suggest UTC operations for server-side/cross-timezone scenarios
- Recommend explicit timezone handling for critical applications

## Implementation Checklist

When adding a new function:

- [ ] Validates inputs using `_lib/validators.ts`
- [ ] Returns standardized error values (no exceptions)
- [ ] Accepts both `Date` and `number` (timestamp)
- [ ] Returns new instance (never mutates input)
- [ ] Truncates fractional amounts with `Math.trunc()`
- [ ] Uses options object for optional parameters (if >1 option)
- [ ] Includes comprehensive JSDoc with examples
- [ ] Has corresponding test file in `tests/`
- [ ] Exported from `src/index.ts`
- [ ] Follows existing naming conventions

## Related

- **Error Handling**: See `error-handling.md`
- **Input Validation**: See `input-validation.md`
- **Project Structure**: See `project-structure.md`
