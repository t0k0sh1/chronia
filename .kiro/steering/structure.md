# Chronia Project Structure

This document describes the architectural patterns, naming conventions, and development guidelines for the Chronia date/time utility library.

---

## 📁 Directory Structure

```
chronia/
├── src/                          # Source code
│   ├── {functionName}/          # Each function in its own directory
│   │   └── index.ts             # Function implementation
│   ├── _lib/                    # Internal utilities (not exported)
│   │   ├── formatters/          # Date formatting handlers
│   │   │   ├── index.ts        # Token-to-formatter mapping
│   │   │   └── tokens/         # Individual token formatters
│   │   │       ├── index.ts    # Token exports
│   │   │       ├── year.ts     # formatYear()
│   │   │       ├── month.ts    # formatMonth()
│   │   │       └── ... (12 token formatters)
│   │   ├── parsers/             # Date parsing handlers (mirrors formatters)
│   │   │   ├── index.ts
│   │   │   └── tokens/
│   │   ├── tokenize.ts         # Pattern tokenization logic
│   │   ├── truncateToUnit.ts   # Time unit truncation
│   │   └── validators.ts       # Input validation helpers
│   ├── i18n/                    # Internationalization
│   │   ├── en-US/
│   │   │   └── index.ts        # English locale
│   │   └── ja/
│   │       └── index.ts        # Japanese locale
│   ├── types.ts                 # TypeScript type definitions
│   ├── constants.ts             # Constants (MIN_DATE, MAX_DATE)
│   └── index.ts                 # Public API exports
├── tests/                       # Test files (mirrors src/ structure)
│   ├── {functionName}.test.ts  # Function tests
│   ├── _lib/                   # Internal library tests
│   └── contract/               # API contract tests
├── docs/                        # Documentation
│   ├── functions/              # Function category docs
│   ├── guidelines/             # Development principles
│   └── troubleshooting/        # Common issues
├── dist/                        # Build output (ESM + CJS)
├── coverage/                    # Test coverage reports
└── [config files]              # eslint, tsconfig, tsup, vitest, etc.
```

### Key Architectural Decisions

- **Function-per-directory**: Each function lives in `src/{functionName}/index.ts` for clear modularity
- **Internal library separation**: `_lib/` prefix clearly marks internal-only code (not exported to users)
- **Symmetric design**: `formatters/` and `parsers/` mirror each other's structure
- **Token-based architecture**: Individual tokens (y, M, d, H, etc.) have dedicated modules

---

## 🏷️ Naming Conventions

### File Naming

| Type | Pattern | Examples |
|------|---------|----------|
| **Function implementation** | `camelCase/index.ts` | `addDays/index.ts`, `format/index.ts`, `isBetween/index.ts` |
| **Test files** | `{functionName}.test.ts` | `addDays.test.ts`, `format.test.ts` |
| **Internal utilities** | `camelCase.ts` | `validators.ts`, `tokenize.ts`, `truncateToUnit.ts` |
| **Config files** | `kebab-case` or `camelCase` | `eslint.config.js`, `tsup.config.ts`, `vitest.config.ts` |

### Code Naming

| Element | Convention | Examples |
|---------|-----------|----------|
| **Functions** | `camelCase` | `addDays()`, `isValidDateOrNumber()`, `formatYear()` |
| **Constants** | `UPPER_SNAKE_CASE` | `MIN_DATE`, `MAX_DATE` |
| **Types** | `PascalCase` | `Locale`, `Interval`, `TimeUnit`, `BoundsType` |
| **Classes** | Not used | This library is purely functional |

### Test File Patterns

- **Location**: `tests/` directory (mirrors `src/` structure)
- **Naming**: `{functionName}.test.ts`
- **Contract tests**: `tests/contract/` subdirectory
- **Benchmark tests**: `.bench.ts` suffix (e.g., `validators.bench.ts`)

---

## 🎯 Design Patterns & Principles

### ⭐ Functional Programming Approach

Chronia is **100% functional** with **zero classes**. Every function follows these principles:

1. **Immutability**: Always return new instances, never mutate inputs
2. **Pure functions**: No side effects, deterministic outputs
3. **Composability**: Functions can be safely combined
4. **Validation-first**: Check inputs before processing

### Standard Function Pattern

Every function follows this consistent structure:

```typescript
// src/{functionName}/index.ts

import { isValidDateOrNumber, isValidNumber } from "../_lib/validators";

/**
 * Comprehensive JSDoc with:
 * - Function description
 * - Parameter details
 * - Multiple @example blocks
 * - @remarks section for edge cases and behavior details
 */
export function functionName(param1: Type1, param2: Type2): ReturnType {
  // 1. INPUT VALIDATION (always first)
  if (!isValidDateOrNumber(param1) || !isValidNumber(param2))
    return new Date(NaN); // or NaN, false

  // 2. PREPARE DATA
  const dt = new Date(param1);        // Create new instance
  const amount = Math.trunc(param2);  // Truncate decimals (never round)

  // 3. PERFORM CALCULATION
  dt.setDate(dt.getDate() + amount);

  // 4. RETURN NEW INSTANCE (never mutate original)
  return dt;
}
```

### Key Design Principles

#### 1. **Immutability**
```typescript
// ✅ CORRECT: Return new instance
export function addDays(date: Date, amount: number): Date {
  const dt = new Date(date);  // Create copy
  dt.setDate(dt.getDate() + amount);
  return dt;                   // Return new instance
}

// ❌ WRONG: Mutate input
export function addDays(date: Date, amount: number): Date {
  date.setDate(date.getDate() + amount);  // Mutates input!
  return date;
}
```

#### 2. **Validation First**
```typescript
export function addDays(date: Date | number, amount: number): Date {
  // ALWAYS validate before processing
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);

  // Safe to proceed...
}
```

#### 3. **Truncation (not rounding)**
```typescript
// All fractional amounts are truncated
const amount = Math.trunc(param);  // 5.9 → 5, -5.9 → -5
```

#### 4. **Date/Number flexibility**
```typescript
// All functions accept both Date objects and timestamps
export function addDays(date: Date | number, amount: number): Date {
  // Works with both:
  addDays(new Date(), 5);      // ✅
  addDays(Date.now(), 5);      // ✅
}
```

### Token-Based Architecture

The `format()` and `parse()` functions use a sophisticated token system:

```
src/_lib/
├── formatters/
│   ├── index.ts              # Maps "y" → formatYear, "M" → formatMonth, etc.
│   └── tokens/
│       ├── year.ts           # export function formatYear(date, token, locale)
│       ├── month.ts          # export function formatMonth(date, token, locale)
│       └── ... (one file per token)
└── parsers/                  # Symmetric structure to formatters
```

**Pattern:**
- Each token (y, M, d, H, m, s, etc.) has a dedicated module
- `formatters/index.ts` provides a mapping object: `{ "y": formatYear, "M": formatMonth, ... }`
- Symmetric design between formatters and parsers ensures consistency

---

## 🚨 Error Handling Policy

### ⭐ No-Exception Philosophy

**Chronia never throws exceptions.** Instead, it returns standardized error values:

| Return Type | Error Value | Detection Method |
|------------|-------------|------------------|
| `Date` | `new Date(NaN)` | `isNaN(date.getTime())` or use `isValid()` |
| `number` | `NaN` | `isNaN(value)` |
| `boolean` | `false` | N/A (false can be valid or error) |

### Error Handling Patterns

#### Pattern 1: Invalid Date Return
```typescript
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);  // Invalid Date

  // ... normal processing
}

// Usage:
const result = addDays(invalidDate, 5);
if (isNaN(result.getTime())) {
  // Handle error
}
```

#### Pattern 2: NaN Return
```typescript
export function differenceInDays(date1: Date | number, date2: Date | number): number {
  if (!isValidDateOrNumber(date1) || !isValidDateOrNumber(date2))
    return NaN;  // Error value

  // ... normal processing
}

// Usage:
const diff = differenceInDays(date1, date2);
if (isNaN(diff)) {
  // Handle error
}
```

#### Pattern 3: False Return
```typescript
export function isBefore(date1: Date | number, date2: Date | number): boolean {
  if (!isValidDateOrNumber(date1) || !isValidDateOrNumber(date2))
    return false;  // Error value (also valid result)

  // ... normal processing
}
```

### Validation Strategy

All validation uses `src/_lib/validators.ts`:

```typescript
/**
 * Checks if value is a valid Date object or finite number
 */
export function isValidDateOrNumber(value: unknown): boolean {
  if (typeof value === "number")
    return isFinite(value);
  if (value instanceof Date)
    return !isNaN(value.getTime());
  return false;
}

/**
 * Checks if value is a finite number (excludes NaN, ±Infinity)
 */
export function isValidNumber(value: unknown): boolean {
  return typeof value === "number" && isFinite(value);
}
```

**Key Points:**
- ✅ Accepts: `new Date(2025, 0, 1)`, `Date.now()`, `1735689600000`
- ❌ Rejects: `new Date("invalid")`, `NaN`, `Infinity`, `-Infinity`, `"2025-01-01"`

---

## 📦 Import/Export Conventions

### Module Export Pattern

Each function exports only the function itself (types are in `types.ts`):

```typescript
// src/addDays/index.ts
export function addDays(date: Date | number, amount: number): Date {
  // ...
}
// Single export: only the function
```

### Main Index Aggregation

The root `src/index.ts` re-exports all public APIs:

```typescript
// src/index.ts

// Re-export all 70+ functions
export * from "./addDays";
export * from "./addHours";
export * from "./addMinutes";
// ... (all functions)

// Explicitly export types
export type {
  Interval,
  Locale,
  TimeUnit,
  BoundsType,
  BetweenOption,
  CompareOptions,
  ComparisonOptions,
} from "./types";
```

**Pattern:**
- `export *` for functions (automatic re-export)
- `export type { ... }` for types (explicit, TypeScript best practice)
- Tree-shaking enabled via `package.json`: `"sideEffects": false`

### Internal vs Public API

```typescript
// INTERNAL API (_lib/):
// - Prefixed with underscore
// - NOT exported from src/index.ts
// - Can be tested via tests/_lib/
// - Used only within src/

// PUBLIC API:
// - No underscore prefix
// - Re-exported from src/index.ts
// - Documented with JSDoc
// - Stable API (SemVer)
```

---

## 🧪 Testing Patterns

### Test File Organization

```
tests/
├── addDays.test.ts           # Tests src/addDays/index.ts
├── format.test.ts            # Tests src/format/index.ts
├── _lib/
│   └── validators.test.ts    # Tests src/_lib/validators.ts
└── contract/
    └── compare-options.test.ts  # API contract tests
```

### Data-Driven Test Pattern

Chronia uses **table-driven tests** with Vitest's `it.each()`:

```typescript
// tests/addDays.test.ts
import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

describe("addDays", () => {
  it.each([
    // --- Valid Cases ---
    {
      date: new Date(2025, 0, 1),
      amount: 5,
      expected: new Date(2025, 0, 6),
      desc: "adds positive days",
    },
    {
      date: new Date(2025, 0, 15),
      amount: -10,
      expected: new Date(2025, 0, 5),
      desc: "subtracts negative days",
    },
    {
      date: new Date(2025, 0, 31),
      amount: 1,
      expected: new Date(2025, 1, 1),
      desc: "rolls over to next month",
    },

    // --- Invalid Cases ---
    {
      date: new Date("invalid"),
      amount: 5,
      expected: new Date(NaN),
      desc: "returns Invalid Date when base is invalid",
    },
    {
      date: new Date(2025, 0, 1),
      amount: NaN,
      expected: new Date(NaN),
      desc: "returns Invalid Date when amount is NaN",
    },
  ])("$desc", ({ date, amount, expected }) => {
    const result = addDays(date, amount);

    // Handle Invalid Date comparison
    if (isNaN(expected.getTime())) {
      expect(isNaN(result.getTime())).toBe(true);
    } else {
      expect(result.getTime()).toBe(expected.getTime());
    }
  });
});
```

### Test Coverage Requirements

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/src/types.ts",      // Type definitions (no runtime code)
        "**/src/i18n/**",       // Locale data (static objects)
        "**/tests/**",          // Test files themselves
        "**/*.config.{js,ts}",  // Config files
        "**/dist/**",           // Build output
      ],
    },
  },
});
```

**Coverage Philosophy:**
- Valid inputs: Multiple cases
- Invalid inputs: All rejection paths
- Edge cases: Boundary dates, rollovers, leap years
- Performance: Benchmark tests for critical paths

---

## 📋 Development Rules

### Code Style Requirements

```javascript
// eslint.config.js
export default [
  {
    files: ["src/**/*.ts"],  // Only lint src/ (tests excluded)
    rules: {
      semi: ["error", "always"],        // ✅ Required: semicolons
      quotes: ["error", "double"],      // ✅ Required: double quotes
    },
  },
];
```

**Enforced:**
- ✅ Double quotes: `"string"` not `'string'`
- ✅ Semicolons: Always at statement end
- ✅ Applies to: `src/**/*.ts` only (tests can be more flexible)

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",           // Modern JS features
    "module": "esnext",           // ESM modules
    "strict": true,               // All strict checks enabled
    "declaration": true,          // Generate .d.ts files
    "declarationMap": true,       // Source maps for types
    "skipLibCheck": true,         // Faster builds
    "esModuleInterop": true,      // CommonJS compatibility
    "forceConsistentCasingInFileNames": true
  }
}
```

### Build Configuration

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],    // Dual module output
  dts: true,                 // Generate TypeScript declarations
  minify: true,              // Minify output
  treeshake: true,           // Remove unused code
  target: "es2020",
  clean: true,               // Clean dist/ before build
});
```

**Output:**
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript types)

### CI/CD Requirements

```yaml
# .github/workflows/ci.yaml (simplified)
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x, 24.x]  # All LTS versions

steps:
  - run: npm install
  - run: npm run lint          # ✅ Must pass
  - run: npm run build         # ✅ Must succeed
  - run: npx vitest run --coverage  # ✅ Generate coverage
  - name: Upload to Codecov    # Coverage reporting
```

**Required Checks:**
1. ✅ ESLint passes (no errors)
2. ✅ Build succeeds (ESM + CJS)
3. ✅ All tests pass
4. ✅ Coverage uploaded to Codecov

**Node.js Support:**
- Minimum: Node.js 18 LTS
- Tested: 18.x, 20.x, 22.x, 24.x
- EOL versions dropped when dependencies require it

### Versioning

- **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`
  - `MAJOR`: Breaking changes (e.g., function signature changes)
  - `MINOR`: New features (backward-compatible)
  - `PATCH`: Bug fixes (backward-compatible)
- **Current**: v1.0.0+ (stable API)
- **Pre-1.0**: v0.x.x considered beta (breaking changes allowed in MINOR)

---

## 📊 Quick Reference

| Aspect | Value |
|--------|-------|
| **Total Functions** | 70+ across 10 categories |
| **TypeScript Files** | 105 in `src/` |
| **Test Cases** | 1700+ automated tests |
| **Node.js Support** | 18.x, 20.x, 22.x, 24.x (LTS) |
| **Locales** | 2 (en-US, ja) |
| **Package Format** | ESM + CJS dual modules |
| **Bundle Size** | Optimized with tree-shaking |
| **Code Style** | Double quotes, semicolons required |
| **Error Policy** | No exceptions, return error values |
| **Design Pattern** | 100% functional, immutable |

---

## 🔗 Related Documentation

- **CLAUDE.md**: Claude Code guidance for this project
- **README.md**: Public API documentation
- **docs/**: Detailed function category guides
- **CHANGELOG.md**: Version history and migration guides

---

*Last Updated: 2025-11-01*
*This is a living document. Update as the project evolves.*
