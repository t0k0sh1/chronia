# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Chronia is a TypeScript-first date/time utility library providing 70+ functions across 10 categories (arithmetic, comparison, difference, getter, setter, boundary, truncation, formatting, and utilities). The library follows a no-exceptions error handling policy, returning `Invalid Date`, `NaN`, or `false` for errors.

## Essential Commands

### Development Workflow
```bash
# Install dependencies
npm install

# Lint code (enforces double quotes and semicolons)
npm run lint

# Build ESM/CJS dual modules with minification
npm run build

# Run all tests
npm test

# Run all tests with coverage report
npx vitest run --coverage

# Run tests in watch mode
npx vitest

# Run a single test file
npx vitest tests/addDays.test.ts

# Clean build artifacts
npm run clean
```

### CI/CD
- CI tests run on Node.js 18.x, 20.x, 22.x, 24.x
- All PRs must pass linting, build, and test coverage checks
- Coverage reports are uploaded to Codecov

## Architecture & Code Organization

### Directory Structure
```
src/
  ├── {functionName}/index.ts    # Each function in its own directory
  ├── _lib/                      # Internal utilities (not exported)
  │   ├── formatters/            # Date formatting token handlers
  │   │   └── tokens/            # Individual token formatters (y, M, d, etc.)
  │   ├── parsers/               # Date parsing token handlers
  │   │   └── tokens/            # Individual token parsers
  │   ├── tokenize.ts            # Format pattern tokenization
  │   ├── truncateToUnit.ts      # Time unit truncation logic
  │   └── validators.ts          # Input validation helpers
  ├── i18n/                      # Locale definitions (en-US, ja)
  ├── types.ts                   # TypeScript type definitions
  ├── constants.ts               # MIN_DATE, MAX_DATE constants
  └── index.ts                   # Public API exports
```

### Core Patterns

**Function Structure**: Each function follows a consistent pattern:
1. Validate inputs using `isValidDateOrNumber()` or `isValidNumber()`
2. Return error values (`new Date(NaN)`, `NaN`, or `false`) for invalid inputs
3. Accept both `Date` objects and numeric timestamps
4. Return new instances (never mutate inputs)
5. Include comprehensive JSDoc with examples

**Example Function Pattern**:
```typescript
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  const dt = new Date(date);
  const daysToAdd = Math.trunc(amount);
  dt.setDate(dt.getDate() + daysToAdd);
  return dt;
}
```

**Format/Parse Token System**:
- `src/_lib/formatters/index.ts` maps tokens (y, M, d, H, etc.) to formatter functions
- `src/_lib/parsers/index.ts` maps tokens to parser functions
- Each token has its own implementation in `tokens/` subdirectories
- Supports Unicode date field symbols (e.g., yyyy, MM, dd, HH, mm, ss)
- Locale support via `Locale` type for month names, weekdays, day periods, eras

## Testing Strategy

- **Location**: `tests/` directory mirrors `src/` structure
- **Contract Tests**: `tests/contract/` for validating API contracts
- **Coverage**: Excludes `src/types.ts`, `src/i18n/`, and config files
- **Test Pattern**: Each function has a dedicated test file (e.g., `addDays.test.ts`)

## TypeScript Configuration

- **Target**: ES2020 with ESNext modules
- **Build**: Uses tsup for dual ESM/CJS output with DTS generation
- **Type Exports**: Core types exported from `src/types.ts` (Locale, Interval, TimeUnit, etc.)

## Code Style Requirements

- Double quotes for strings
- Semicolons required
- ESLint configuration in `eslint.config.js`
- Only `src/**/*.ts` files are linted (tests excluded)

## Important Implementation Details

**Error Handling Policy**:
- Never throw exceptions
- Return standardized error values:
  - Date functions: `new Date(NaN)` (Invalid Date)
  - Numeric functions: `NaN`
  - Boolean functions: `false`
- Use `isValid()` to detect invalid Date/number results

**Input Validation**:
- All public functions validate inputs via `_lib/validators.ts`
- `isValidDateOrNumber(value)`: Checks for valid Date objects or finite numbers
- `isValidNumber(value)`: Checks for finite numbers (excludes NaN, ±Infinity)

**Date Arithmetic**:
- Fractional amounts are truncated using `Math.trunc()` (not rounded)
- Month/year arithmetic handles edge cases (e.g., Jan 31 + 1 month = Feb 28/29)

**Format/Parse Consistency**:
- Format and parse functions use the same token syntax
- Tokenization logic shared in `_lib/tokenize.ts`

## Node.js Version Support

- Minimum: Node.js 18 LTS
- CI tests: 18.x, 20.x, 22.x, 24.x
- EOL LTS versions supported until dependencies or core changes force drop

## Versioning

- Follows Semantic Versioning (SemVer)
- Current stage: v1.0.0 (stable API)
- Breaking changes only in MAJOR versions
