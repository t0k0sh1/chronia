# Technology Stack

## Architecture

**Library Architecture** - Pure TypeScript utility library with no external runtime dependencies. Function-per-file modular design for optimal tree-shaking. All functions are stateless and side-effect-free.

## Core Technologies

- **Language**: TypeScript 5.9+ (strict mode)
- **Runtime**: Node.js 18+ (LTS releases only)
- **Build Tool**: tsup (esbuild-based bundler)
- **Module Formats**: ESM (primary) + CJS (CommonJS) dual output

## Key Libraries

- **Vitest** - Testing framework with coverage tracking (2100+ test cases)
- **TypeDoc** - API documentation generation
- **tsup** - Zero-config TypeScript bundler with minification/treeshaking

## Development Standards

### Type Safety
- **Strict Mode** - `strict: true` in tsconfig (no implicit any, strict null checks)
- **Explicit Return Types** - All exported functions have explicit return type annotations
- **No `any`** - `any` type is prohibited; use `unknown` or specific types
- **Input Validation** - All public functions validate inputs via `_lib/validators.ts`

### Code Quality
- **ESLint** - TypeScript-specific rules with `@typescript-eslint/eslint-plugin`
- **Function Organization** - One function per file in `src/{functionName}/index.ts`
- **No Side Effects** - `"sideEffects": false` in package.json for bundler optimization
- **Immutability** - All functions return new Date instances (never mutate inputs)

### Testing
- **Vitest** - Unit tests with `vitest` runner
- **Coverage** - Tracked with `@vitest/coverage-v8`
- **Test Location** - Mirror source structure: `tests/{functionName}.test.ts`
- **Edge Cases** - Comprehensive tests for Invalid Date, NaN, Infinity, fractional inputs

## Development Environment

### Required Tools
- Node.js 18+ (LTS)
- pnpm (preferred package manager)

### Common Commands
```bash
# Dev: pnpm test (watch mode)
# Build: pnpm build (tsup → dist/)
# Test: pnpm test (vitest)
# Lint: pnpm lint (eslint)
# Clean: pnpm clean (rimraf dist)
```

## Key Technical Decisions

### Error Handling
- **No Exceptions** - Functions never throw; errors indicated by return values
  - Date functions → `Invalid Date`
  - Number functions → `NaN`
  - Boolean functions → `false`
- **Validation First** - All inputs validated before processing via `isValidDateOrNumber()`, `isValidNumber()`

### Input Flexibility
- **Date | number** - Most functions accept both Date objects and timestamps
- **Locale Support** - Optional `Locale` parameter for i18n (month names, weekdays, eras, day periods)

### Module Strategy
- **Tree-shakable Exports** - Each function in separate file with individual export
- **Single Entry Point** - `src/index.ts` re-exports all public APIs
- **Internal Utilities** - Prefixed with `_lib/` (not exported, internal use only)

### Tokenization Pattern
- **Format/Parse Symmetry** - Same token syntax for `format()` and `parse()` (Unicode tokens)
- **Token Handlers** - Isolated in `_lib/formatters/tokens/` and `_lib/parsers/tokens/`
- **Locale Injection** - Formatters/parsers accept optional `Locale` for i18n

---
_Generated from codebase: 2025-11-20_
