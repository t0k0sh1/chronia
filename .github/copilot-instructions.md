# GitHub Copilot Instructions for Chronia

## Project Overview

Chronia is a TypeScript-first date/time utility library with 70+ functions across 10 categories. This file provides guidance for GitHub Copilot when working with this codebase.

> 📚 **Primary Reference**: See [`CLAUDE.md`](../CLAUDE.md) for detailed project instructions and essential commands.
>
> 📖 **AI Documentation**: Comprehensive AI-focused documentation is available in the [`docs/`](../docs/) directory. Start with [`docs/README.md`](../docs/README.md).

## Core Development Principles

### 1. No-Exceptions Error Handling
- **Never throw exceptions**
- Return standardized error values:
  - `Invalid Date` for Date functions
  - `NaN` for numeric functions
  - `false` for boolean functions
- Always validate inputs before processing

### 2. Immutability
- **Never mutate input parameters**
- Always return new instances
- Use defensive copying

### 3. TypeScript Type Safety
- Strict typing with TypeScript 5.9+
- Accept both `Date` and `number` (timestamps)
- Export comprehensive types from `src/types.ts`

### 4. Validation-First Approach
- Validate all inputs using `_lib/validators.ts`
- Use `isValidDateOrNumber()` for Date/number inputs
- Use `isValidNumber()` for numeric amounts
- Return error values immediately for invalid inputs

### 5. Fractional Amount Truncation
- Use `Math.trunc()` for fractional amounts
- Never round unless explicitly required

## Code Review Guidelines

### Classification

Use these prefixes for review comments:
- `[must]` - Mandatory fixes (violations of core principles, bugs)
- `[recommend]` - Recommended fixes (performance, readability)
- `[nits]` - Minor suggestions (style, minor improvements)

### Key Review Focus

#### Security
- No SQL injection vectors (not applicable for date library)
- No XSS vulnerabilities in format outputs
- Validate all user inputs

#### Chronia-Specific Rules
- `[must]` Functions must never throw exceptions
- `[must]` Functions must never mutate inputs
- `[must]` All inputs must be validated before processing
- `[must]` Fractional amounts must use `Math.trunc()`, not `Math.round()`
- `[must]` Error values must match return type (Invalid Date / NaN / false)
- `[recommend]` JSDoc should include examples with edge cases
- `[recommend]` Tests should cover Invalid Date, NaN, Infinity inputs
- `[recommend]` Month-end edge cases should be tested (e.g., Jan 31 + 1 month)

#### Performance
- Avoid unnecessary object creation in loops
- Use early returns for invalid inputs
- Optimize hot paths (millisecond comparisons)

#### Readability
- Follow existing naming conventions (camelCase for functions)
- One function per directory in `src/`
- Comprehensive JSDoc with examples

#### Maintainability
- Functions should have no dependencies on other public functions (except `_lib/`)
- Single responsibility per function
- Shared logic extracted to `_lib/`

#### Testing
- Each function requires corresponding test file in `tests/`
- Test edge cases: Invalid Date, NaN, Infinity, month-end, leap years
- Coverage excludes `src/types.ts`, `src/i18n/`, config files

## Language-Specific Rules

### TypeScript/JavaScript

#### Type Safety
- `[must]` Never use `any` type (use `unknown` if needed)
- `[must]` Export types from `src/types.ts`
- `[recommend]` Use union types (`Date | number`) for dual input support

#### Code Style
- `[must]` Use double quotes for strings
- `[must]` Include semicolons
- `[must]` Follow ESLint configuration in `eslint.config.js`
- `[recommend]` Use `const` over `let` when possible
- `[nits]` Consistent spacing and formatting

#### Error Handling
- `[must]` Never use `try-catch` for Chronia functions
- `[must]` Return error values instead of throwing
- `[must]` Validate inputs before processing

#### Date Handling
- `[must]` Accept both `Date` and `number` (timestamp)
- `[must]` Return new Date instances, never mutate
- `[must]` Use 0-based month indexing (0 = January)
- `[recommend]` Document timezone implications (local timezone by default)

## Function Implementation Template

When implementing new functions, follow this pattern:

```typescript
/**
 * Brief description of what this function does.
 *
 * @param date - The date to process (accepts Date object or timestamp)
 * @param amount - The amount to add/subtract
 * @returns New Date with modification, or Invalid Date if inputs are invalid
 *
 * @example
 * ```typescript
 * addDays(new Date(2024, 0, 15), 7);
 * // Returns: new Date(2024, 0, 22)
 *
 * addDays(new Date("invalid"), 7);
 * // Returns: Invalid Date
 * ```
 */
export function functionName(date: Date | number, amount: number): Date {
  // STEP 1: Validate all inputs first
  if (!isValidDateOrNumber(date) || !isValidNumber(amount)) {
    return new Date(NaN);  // Return error value immediately
  }

  // STEP 2: Process with confidence (inputs are valid)
  const dt = new Date(date);  // Create new instance
  const truncatedAmount = Math.trunc(amount);  // Truncate fractional amounts

  // ... implementation logic ...

  return dt;  // Return new instance
}
```

## Testing Template

```typescript
import { describe, it, expect } from "vitest";
import { functionName, isValid } from "../src";

describe("functionName", () => {
  it("handles basic case", () => {
    const result = functionName(new Date(2024, 0, 15), 7);
    expect(result).toEqual(new Date(2024, 0, 22));
  });

  it("returns Invalid Date for invalid date input", () => {
    const result = functionName(new Date("invalid"), 7);
    expect(isValid(result)).toBe(false);
  });

  it("returns Invalid Date for NaN amount", () => {
    const result = functionName(new Date(), NaN);
    expect(isValid(result)).toBe(false);
  });

  it("returns Invalid Date for Infinity amount", () => {
    const result = functionName(new Date(), Infinity);
    expect(isValid(result)).toBe(false);
  });

  it("truncates fractional amounts", () => {
    const result = functionName(new Date(2024, 0, 1), 1.9);
    expect(result).toEqual(new Date(2024, 0, 2)); // Truncated to 1
  });

  it("accepts timestamp input", () => {
    const timestamp = Date.now();
    const result = functionName(timestamp, 1);
    expect(isValid(result)).toBe(true);
  });

  it("never mutates input", () => {
    const input = new Date(2024, 0, 15);
    const original = new Date(input);
    functionName(input, 7);
    expect(input).toEqual(original); // Input unchanged
  });
});
```

## Common Pitfalls to Catch

### Invalid Date Handling
```typescript
// ❌ BAD: Truthy check
if (date) {
  // This executes even for Invalid Date!
}

// ✅ GOOD: Use isValid()
import { isValid } from "chronia";
if (isValid(date)) {
  // Safe to use
}
```

### Month Indexing
```typescript
// ❌ BAD: 1-based month
new Date(2024, 1, 15);  // This is February 15, not January 15!

// ✅ GOOD: 0-based month
new Date(2024, 0, 15);  // January 15
```

### Format Token Confusion
```typescript
// ❌ BAD: Using 'm' for month
format(date, "yyyy-mm-dd");  // mm = minutes, not month!

// ✅ GOOD: Using 'M' for month
format(date, "yyyy-MM-dd");  // MM = month
```

### Mutation
```typescript
// ❌ BAD: Mutating input
export function badFunction(date: Date): Date {
  date.setDate(date.getDate() + 1);  // Mutates input!
  return date;
}

// ✅ GOOD: Return new instance
export function goodFunction(date: Date): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}
```

### Exception Throwing
```typescript
// ❌ BAD: Throwing exceptions
export function badFunction(date: Date): Date {
  if (!isValid(date)) {
    throw new Error("Invalid date");  // Don't do this!
  }
  // ...
}

// ✅ GOOD: Return error value
export function goodFunction(date: Date): Date {
  if (!isValid(date)) {
    return new Date(NaN);  // Return Invalid Date
  }
  // ...
}
```

## Documentation References

### Essential Reading
1. **[CLAUDE.md](../CLAUDE.md)** - Comprehensive instructions for Claude Code
2. **[docs/README.md](../docs/README.md)** - AI documentation overview
3. **[docs/guidelines/development-principles.md](../docs/guidelines/development-principles.md)** - Core philosophy

### Quick Links by Topic
- **Error Handling**: [docs/guidelines/error-handling.md](../docs/guidelines/error-handling.md)
- **Input Validation**: [docs/guidelines/input-validation.md](../docs/guidelines/input-validation.md)
- **Common Use Cases**: [docs/guidelines/common-use-cases.md](../docs/guidelines/common-use-cases.md)
- **Common Pitfalls**: [docs/troubleshooting/common-pitfalls.md](../docs/troubleshooting/common-pitfalls.md)
- **Debugging Guide**: [docs/troubleshooting/debugging-guide.md](../docs/troubleshooting/debugging-guide.md)

### Function Categories
- **Arithmetic**: [docs/functions/arithmetic/](../docs/functions/arithmetic/)
- **Comparison**: [docs/functions/comparison/](../docs/functions/comparison/)
- **Difference**: [docs/functions/difference/](../docs/functions/difference/)
- **Getter**: [docs/functions/getter/](../docs/functions/getter/)
- **Setter**: [docs/functions/setter/](../docs/functions/setter/)
- **Boundary**: [docs/functions/boundary/](../docs/functions/boundary/)
- **Truncation**: [docs/functions/truncation/](../docs/functions/truncation/)
- **Formatting**: [docs/functions/formatting/](../docs/functions/formatting/)
- **Utility**: [docs/functions/utility/](../docs/functions/utility/)
- **Constants**: [docs/functions/constants/](../docs/functions/constants/)

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Write code**: Add/modify functions in `src/`
3. **Write tests**: Add tests in `tests/`
4. **Lint**: `npm run lint`
5. **Test**: `npm test`
6. **Build**: `npm run build`
7. **Generate docs**: `npm run docs` (optional)

## Node.js Version Support

- Minimum: Node.js 18 LTS
- CI tests: 18.x, 20.x, 22.x, 24.x
- EOL LTS versions supported while dependencies allow

## Versioning

- Follows Semantic Versioning (SemVer)
- Current stage: v1.0.0 (stable API)
- Breaking changes only in MAJOR versions

---

**For GitHub Copilot**: Use this file in conjunction with [`CLAUDE.md`](../CLAUDE.md) and the [`docs/`](../docs/) directory to provide accurate, context-aware suggestions for Chronia development.
