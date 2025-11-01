# Technical Specification

## Overview

Chronia is a **TypeScript-first date/time utility library** designed for modern JavaScript applications. The library provides 70+ carefully crafted functions across 10 categories, emphasizing type safety, predictable error handling, and zero runtime dependencies. Built with a security-first mindset and optimized for bundle size, Chronia serves as a lightweight, tree-shakable alternative to heavyweight date libraries.

**Core Philosophy:**
- **Zero Dependencies**: No runtime dependencies for maximum security and minimal attack surface
- **No-Exception Policy**: Predictable error handling without thrown exceptions
- **Tree-Shakable**: Optimal bundle size with full ESM/CJS dual module support
- **Type Safety**: Comprehensive TypeScript support with strict mode enabled

---

## 1. Programming Language & Framework

### TypeScript Configuration

**Version**: TypeScript 5.9.2 (`devDependencies: "^5.9.2"`)

**Compiler Settings** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationDir": "./dist/types",
    "outDir": "./dist"
  }
}
```

**Key Features:**
- **Strict Mode**: Enabled for maximum type safety
- **Target**: ES2020 (modern runtime support)
- **Module System**: ESNext during development, ESM/CJS for distribution
- **Declaration Files**: Auto-generated `.d.ts` files in `dist/types/`

### Build Toolchain

**Primary Build Tool**: [tsup](https://tsup.egoist.dev/) v8.5.0

**Build Configuration** (`tsup.config.ts`):
```typescript
{
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  treeshake: true,
  sourcemap: false,
  clean: true,
  outDir: "dist"
}
```

**Output Structure:**
- **ESM**: `dist/index.js` (ES Modules)
- **CJS**: `dist/index.cjs` (CommonJS)
- **Types**: `dist/index.d.ts` (TypeScript declarations)

**Module Configuration** (`package.json`):
```json
{
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

**<¯ Emphasis: Tree-Shakable & Dual Module Support**
- `"sideEffects": false` enables aggressive tree-shaking in bundlers
- Dual ESM/CJS output ensures compatibility with all modern toolchains
- Minification reduces bundle size for production deployments

---

## 2. Library & Middleware Selection

### Runtime Dependencies

**<¯ Zero-Dependency Policy**

Chronia has **ZERO runtime dependencies**. This architectural decision provides:

 **Security Benefits:**
- Minimal attack surface (no transitive dependency vulnerabilities)
- No supply chain risks from third-party packages
- Easier security audits

 **Performance Benefits:**
- Smaller bundle size
- Faster installation
- No unnecessary code in production

 **Maintenance Benefits:**
- No dependency version conflicts
- Simplified upgrades
- Full control over codebase

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.9.2 | TypeScript compiler |
| `tsup` | ^8.5.0 | Build bundler (ESM/CJS dual output + minification) |
| `vitest` | ^3.2.4 | Testing framework (Vite-powered, fast) |
| `@vitest/coverage-v8` | ^3.2.4 | Code coverage provider (V8 engine) |
| `eslint` | ^9.35.0 | Code quality linter |
| `@typescript-eslint/parser` | ^8.42.0 | TypeScript parser for ESLint |
| `@typescript-eslint/eslint-plugin` | ^8.42.0 | TypeScript-specific linting rules |
| `typescript-eslint` | ^8.42.0 | TypeScript-ESLint integration |
| `@types/node` | ^24.3.1 | Node.js type definitions |
| `rimraf` | ^6.0.1 | Cross-platform directory cleanup |
| `typedoc` | ^0.28.12 | API documentation generator (currently unused) |

**Tool Selection Rationale:**

- **Vitest**: Chosen over Jest for faster execution, native ESM support, and Vite integration
- **tsup**: Chosen over Rollup/Webpack for simplicity and optimized TypeScript bundling
- **ESLint 9.x**: Latest version with flat config format
- **V8 Coverage**: Faster and more accurate than Istanbul-based coverage

---

## 3. Technical Constraints

### Node.js Version Requirements

**Minimum Version**: Node.js 18.x LTS

**`package.json` Engines:**
```json
{
  "engines": {
    "node": ">=18"
  }
}
```

**CI Test Matrix**: 18.x, 20.x, 22.x, 24.x

**Rationale:**
- Node.js 18 is the oldest supported LTS version
- Covers all active and maintenance LTS releases
- Drops EOL versions to leverage modern JavaScript features

### Browser Compatibility

**Target**: ES2020-compatible browsers

**Supported Browsers** (minimum versions):
- Chrome 80+
- Firefox 74+
- Safari 13.1+
- Edge 80+

**JavaScript API Constraints:**
Chronia relies exclusively on the standard `Date` object, which has inherent limitations:

```javascript
MIN_DATE: -8,640,000,000,000,000 ms (271821 BC)
MAX_DATE: +8,640,000,000,000,000 ms (275760 AD)
```

All functions return `new Date(NaN)` (Invalid Date) when operations exceed these bounds.

### Platform Constraints

**Cross-Platform Support:**
- Node.js environments (server-side)
- Browser environments (client-side)
- Bundler-based builds (Webpack, Rollup, Vite, esbuild)

**Timezone Behavior:**
- Default: Local timezone of the executing environment
- No built-in timezone conversion (uses system timezone)
- Future roadmap includes IANA timezone database support

**Locale Support:**
- Built-in locales: `en-US`, `ja`
- Extensible via `Locale` type for custom locales

---

## 4. CI/CD & Testing Strategy

### CI/CD Pipeline

**Configuration**: `.github/workflows/ci.yaml`

**Triggers:**
- `push` to `main` branch
- `pull_request` targeting `main` branch

**Execution Environment:**
- **OS**: Ubuntu Latest
- **Node.js Matrix**: 18.x, 20.x, 22.x, 24.x

**Pipeline Steps:**

1. **Security Scan** (`socketdev/action@v1`)
   - Dependency firewall check before installation
   - Detects malicious packages and supply chain attacks

2. **Checkout** (`actions/checkout@v4`)
   - Fetch repository code

3. **Node.js Setup** (`actions/setup-node@v4`)
   - Install Node.js with npm cache

4. **Install Dependencies**
   ```bash
   sfw npm install  # Socket Firewall wrapper
   ```

5. **Lint**
   ```bash
   npm run lint
   ```

6. **Build**
   ```bash
   npm run build --if-present
   ```

7. **Test & Coverage**
   ```bash
   npx vitest run --coverage
   ```

8. **Upload Coverage** (`codecov/codecov-action@v5`)
   - Upload `coverage/coverage-final.json` to Codecov
   - Uses `CODECOV_TOKEN` secret

### Testing Framework: Vitest

**Configuration** (`vitest.config.ts`):
```typescript
{
  test: {
    exclude: ["./docs/**", "./specs/**", "./node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "**/specs/**", "**/docs/**", "**/dist/**", "**/tests/**",
        "**/node_modules/**", "**/vitest.config.ts", "**/eslint.config.js",
        "**/tsup.config.ts", "**/src/types.ts", "**/src/i18n/**"
      ]
    }
  }
}
```

**Test Suite Statistics:**
- **Test Files**: 96 files
- **Total Test Lines**: 11,019 lines
- **Test Categories**:
  - Unit tests: `tests/*.test.ts` (one per function)
  - Contract tests: `tests/contract/` (API contract validation)
  - Internal library tests: `tests/_lib/` (formatter/parser/validator tests)

**Test Commands:**
```bash
npm test                              # Run all tests
npx vitest run --coverage             # Run with coverage report
npx vitest                            # Watch mode
npx vitest tests/addDays.test.ts      # Run single test file
```

**Coverage Requirements:**
- All PRs must include coverage reports
- Codecov integration for trend tracking
- Excludes type definitions and locale data from coverage

### Code Quality Standards

**ESLint Configuration** (`eslint.config.js`):

```javascript
{
  parser: "@typescript-eslint/parser",
  files: ["src/**/*.ts"],
  ignores: ["dist/", "node_modules/", "tests/", "specs/", "coverage/"],
  rules: {
    "semi": ["error", "always"],        // Semicolons required
    "quotes": ["error", "double"]       // Double quotes enforced
  }
}
```

**Enforced Style Rules:**
- **Semicolons**: Required at end of statements
- **Quotes**: Double quotes for all strings
- **Target**: Only `src/**/*.ts` (tests excluded from linting)

**Lint Command:**
```bash
npm run lint  # Run ESLint on source code
```

### Build Process

**Scripts** (`package.json`):
```json
{
  "scripts": {
    "build": "tsup",
    "clean": "rimraf dist",
    "prepublishOnly": "npm run clean && npm run build"
  }
}
```

**Build Flow:**
1. **Clean**: Remove previous `dist/` directory
2. **Compile**: TypeScript ’ JavaScript (ESM + CJS)
3. **Generate Types**: Create `.d.ts` declaration files
4. **Minify**: Reduce bundle size
5. **Tree-shake**: Remove unused exports

**Published Files** (`.npmignore` / `package.json` files):
- `dist/` (built artifacts)
- `README.md`
- `LICENSE`
- All source files excluded from npm package

---

## 5. Security & Operations

### <¯ Security-First Approach

Chronia implements multiple layers of security:

#### 1. Socket Firewall Integration

**Tool**: [Socket.dev](https://socket.dev/)

**Integration Point**: CI/CD pipeline

```yaml
- uses: socketdev/action@v1
  with:
    mode: firewall
- run: sfw npm install  # Socket Firewall wrapper
```

**Protection:**
- Scans all dependencies for known vulnerabilities
- Detects supply chain attacks
- Blocks malicious package installations
- Runs on every PR and push to main

#### 2. Snyk Vulnerability Scanning

**Tool**: [Snyk](https://snyk.io/)

**Badge**: Displayed in README.md
```
https://snyk.io/test/github/t0k0sh1/chronia/badge.svg
```

**Coverage:**
- Continuous vulnerability monitoring
- Automated security alerts
- Dependency upgrade recommendations

#### 3. <¯ Zero-Dependency Attack Surface Minimization

**No Runtime Dependencies = Minimal Attack Surface**

- Zero transitive dependency vulnerabilities
- No supply chain compromise risk
- 100% control over codebase security
- Simplified security audits

### Error Handling Strategy

### <¯ No-Exception Policy

Chronia **never throws exceptions**. All error conditions return standardized error values:

**Error Return Values:**

| Function Type | Error Return Value | Detection Method |
|---------------|-------------------|------------------|
| Date functions | `new Date(NaN)` (Invalid Date) | `isValid(result) === false` |
| Numeric functions | `NaN` | `isNaN(result) === true` |
| Boolean functions | `false` | Direct check |

**Example:**
```typescript
import { addDays, isValid } from "chronia";

const result = addDays("invalid", 5);
// Returns: Invalid Date (not thrown exception)

if (!isValid(result)) {
  // Handle error gracefully
}
```

**Benefits:**
- Predictable error handling
- No try-catch required
- Easier testing
- Better performance (no exception stack traces)

**Input Validation** (`src/_lib/validators.ts`):
- `isValidDate(value)`: Checks for valid Date objects
- `isValidNumber(value)`: Checks for finite numbers (excludes NaN, ±Infinity)
- `isValidDateOrNumber(value)`: Accepts both Date objects and numeric timestamps

### Publishing & Release Process

**Registry**: [npmjs.com](https://www.npmjs.com/)

**Package Name**: `chronia`

**Current Version**: v0.1.10 (pre-stable, breaking changes possible)

**Versioning Strategy**: [Semantic Versioning (SemVer)](https://semver.org/)
- v0.x.x: Pre-stable (breaking changes allowed)
- v1.0.0+: Stable API (breaking changes only in MAJOR versions)

**Release Flow:**

1. **Code Changes**
2. **Run Tests**: `npm test`
3. **Run Lint**: `npm run lint`
4. **Build**: `npm run build`
5. **Update Version**: Edit `package.json`
6. **Update Changelog**: Edit `CHANGELOG.md`
7. **Git Commit & Push**
8. **CI/CD Pass Verification**
9. **Publish**: `npm publish`
   - Triggers `prepublishOnly` script automatically:
     ```bash
     npm run clean && npm run build
     ```
   - Ensures fresh build before every publish

**Publish Configuration** (`package.json`):
```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

### Monitoring & Observability

**README Badges:**
- npm version
- TypeScript version badge
- MIT License badge
- GitHub Actions workflow status
- Snyk security scan status
- Node.js version badge
- npm downloads counter
- Codecov coverage percentage

**Logging & Diagnostics:**
- No built-in logging (library design)
- Error detection via `isValid()` function
- Users handle error logging in application code

---

## 6. Architecture & Code Organization

### Directory Structure

```
chronia/
   src/                          # Source code
      {functionName}/           # One directory per function
         index.ts              # Function implementation
      _lib/                     # Internal utilities (not exported)
         formatters/           # Date formatting token handlers
            index.ts          # Token dispatcher
            tokens/           # Individual token formatters (y, M, d, H, etc.)
         parsers/              # Date parsing token handlers
            index.ts          # Token dispatcher
            tokens/           # Individual token parsers
         tokenize.ts           # Format pattern tokenization
         truncateToUnit.ts     # Time unit truncation logic
         validators.ts         # Input validation helpers
      i18n/                     # Locale definitions
         en-US/                # English (US) locale
         ja/                   # Japanese locale
      types.ts                  # TypeScript type definitions
      constants.ts              # MIN_DATE, MAX_DATE constants
      index.ts                  # Public API exports
   tests/                        # Test suite (96 files, 11,019 lines)
      contract/                 # API contract tests
      _lib/                     # Internal library tests
      *.test.ts                 # Per-function unit tests
   docs/                         # AI-friendly documentation
      functions/                # Function category documentation
      guidelines/               # Development guidelines
      troubleshooting/          # Troubleshooting guides
   dist/                         # Build output (git-ignored)
      index.js                  # ESM bundle
      index.cjs                 # CJS bundle
      index.d.ts                # TypeScript declarations
   coverage/                     # Coverage reports (git-ignored)
   .github/workflows/ci.yaml     # CI/CD pipeline
   package.json                  # Project metadata
   tsconfig.json                 # TypeScript config
   tsup.config.ts                # Build config
   vitest.config.ts              # Test config
   eslint.config.js              # Lint config
   CLAUDE.md                     # AI agent instructions
   CHANGELOG.md                  # Version history
   README.md                     # Main documentation
```

### Function Categories

Chronia provides **70+ functions** across **10 categories**:

| Category | Examples | Count |
|----------|----------|-------|
| **Arithmetic** | `addYears`, `addMonths`, `addDays`, `subDays` | 10+ |
| **Comparison** | `isAfter`, `isBefore`, `isEqual`, `isBetween` | 10+ |
| **Difference** | `diffYears`, `diffMonths`, `diffDays`, `diffHours` | 8+ |
| **Getter** | `getYear`, `getMonth`, `getDay`, `getHours` | 10+ |
| **Setter** | `setYear`, `setMonth`, `setDay`, `setHours` | 10+ |
| **Boundary** | `startOfYear`, `startOfDay`, `endOfMonth` | 10+ |
| **Truncation** | `truncYear`, `truncDay`, `truncHour` | 5+ |
| **Formatting** | `format`, `parse` | 2 |
| **Utility** | `now`, `min`, `max`, `clamp`, `isValid` | 5+ |
| **Constants** | `MIN_DATE`, `MAX_DATE` | 2 |

### Type System

**Core Types** (`src/types.ts`):

```typescript
// Locale definition for i18n
export interface Locale {
  months: string[];
  monthsShort: string[];
  weekdays: string[];
  weekdaysShort: string[];
  dayPeriods: { am: string; pm: string };
  eras: { bc: string; ad: string };
}

// Time unit enum
export type TimeUnit = "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond";

// Interval with boundary types
export interface Interval {
  start: Date | number;
  end: Date | number;
}

export type BoundsType = "()" | "[]" | "[)" | "(]";

// Formatter/Parser function types
export type Formatter = (date: Date, locale: Locale) => string;
export type Parser = (value: string, components: DateComponents) => void;

export interface ParseResult {
  date: Date;
  remainingInput: string;
}

export interface DateComponents {
  year?: number;
  month?: number;
  day?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  // ... additional fields
}
```

### Token-Based Format/Parse System

**Format Tokens** (`src/_lib/formatters/`):

Supports Unicode date field symbols:
- `yyyy`, `yy` - Year (4-digit, 2-digit)
- `MMMM`, `MMM`, `MM`, `M` - Month (name, short, padded, numeric)
- `dd`, `d` - Day (padded, numeric)
- `HH`, `H` - Hours (24h, padded/numeric)
- `mm`, `m` - Minutes
- `ss`, `s` - Seconds
- `SSS`, `SS`, `S` - Milliseconds
- `a` - AM/PM
- `EEEE`, `EEE` - Weekday (full, short)
- `G` - Era (BC/AD)

**Example:**
```typescript
import { format } from "chronia";
import { enUS } from "chronia/i18n/en-US";

const date = new Date(2025, 0, 15, 14, 30);
format(date, "yyyy-MM-dd HH:mm:ss", enUS);
// "2025-01-15 14:30:00"
```

**Parser Tokens** (`src/_lib/parsers/`):

Uses same token syntax for bidirectional conversion:
```typescript
import { parse } from "chronia";

const result = parse("2025-01-15 14:30:00", "yyyy-MM-dd HH:mm:ss");
// Date object: 2025-01-15T14:30:00
```

---

## 7. Coding Standards

### Style Enforcement

**Semicolons**: Required (`"semi": ["error", "always"]`)
**Quotes**: Double quotes only (`"quotes": ["error", "double"]`)

**Example:**
```typescript
//  Correct
export function addDays(date: Date, amount: number): Date {
  return new Date(date);
}

// L Incorrect (missing semicolons, single quotes)
export function addDays(date: Date, amount: number): Date {
  return new Date(date)
}
```

### Design Principles

**1. Immutability**
- All functions return **new instances**
- Never mutate input parameters

```typescript
const original = new Date(2025, 0, 1);
const modified = addDays(original, 5);
// original unchanged, modified is new Date
```

**2. Input Validation**
- Every public function validates inputs
- Uses `isValidDateOrNumber()` or `isValidNumber()`
- Returns error values (not exceptions) for invalid inputs

```typescript
export function addDays(date: Date | number, amount: number): Date {
  if (!isValidDateOrNumber(date) || !isValidNumber(amount))
    return new Date(NaN);  // Error return

  // ... implementation
}
```

**3. Fractional Truncation**
- Use `Math.trunc()` (not `Math.round()`)
- Truncate fractional amounts, don't round

```typescript
addDays(date, 5.7);  // Adds 5 days (not 6)
```

**4. JSDoc Documentation**
- All public functions include comprehensive JSDoc
- Include `@param`, `@returns`, `@example` tags

```typescript
/**
 * Adds the specified number of days to a date.
 *
 * @param date - The date to add days to
 * @param amount - Number of days to add (fractional amounts truncated)
 * @returns New date with days added, or Invalid Date on error
 *
 * @example
 * addDays(new Date(2025, 0, 1), 5)  // 2025-01-06
 */
export function addDays(date: Date | number, amount: number): Date {
  // ...
}
```

### Performance Optimization

**Tree-Shaking**:
- `"sideEffects": false` in `package.json`
- Each function in separate directory (`src/{functionName}/index.ts`)
- Bundlers can eliminate unused functions

**Minification**:
- Enabled in tsup build
- Reduces production bundle size

**Zero Dependencies**:
- No external code to bundle
- Faster installation
- Smaller node_modules

---

## 8. Future Technical Roadmap

### Planned Expansions

#### 1. Additional Locale Support

**Target Locales:**
- Chinese (Simplified): `zh-CN`
- Chinese (Traditional): `zh-TW`
- Korean: `ko`
- French: `fr`
- German: `de`
- Spanish: `es`

**Implementation:**
- Add locale definitions in `src/i18n/{locale}/`
- Follow existing `en-US` and `ja` structure
- Provide month names, weekdays, day periods, eras

#### 2. Timezone Support

**Goal**: IANA timezone database integration

**Planned Features:**
- Convert between timezones
- Parse/format with timezone awareness
- Support for `America/New_York`, `Europe/London`, `Asia/Tokyo`, etc.

**Challenges:**
- Maintaining zero-dependency policy (may require optional peer dependency)
- Bundle size impact (timezone data is large)
- Browser vs Node.js compatibility

**Potential Approach:**
- Separate package: `@chronia/timezone`
- Leverages native `Intl.DateTimeFormat` where available
- Falls back to lightweight timezone data

#### 3. Alternative Runtime Support

**Target Runtimes:**
- [Deno](https://deno.land/) 1.x+
- [Bun](https://bun.sh/) 1.x+

**Requirements:**
- Test on Deno/Bun in CI/CD
- Ensure ESM compatibility
- Verify `Date` API consistency
- Add runtime-specific documentation

**Current Compatibility:**
-  Likely already compatible (uses standard JavaScript)
- = Needs verification testing
- =æ May need separate entry points in `package.json`

### Constraint Maintenance

**No Planned Changes:**
-  Zero-dependency policy will be maintained
-  No-exception error handling will remain
-  TypeScript strict mode stays enabled
-  Node.js 18+ minimum version (until EOL)

**Rationale:**
- Core principles are part of Chronia's identity
- Breaking these would require major version bump (v2.0.0+)
- Current constraints provide competitive advantages

---

## 9. References

### Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `package.json` | Project metadata, scripts, dependencies | `/package.json` |
| `tsconfig.json` | TypeScript compiler options | `/tsconfig.json` |
| `tsup.config.ts` | Build configuration (ESM/CJS/DTS) | `/tsup.config.ts` |
| `vitest.config.ts` | Test framework configuration | `/vitest.config.ts` |
| `eslint.config.js` | Linting rules | `/eslint.config.js` |
| `.github/workflows/ci.yaml` | CI/CD pipeline | `/.github/workflows/ci.yaml` |

### Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| `README.md` | Main user-facing documentation | `/README.md` |
| `CLAUDE.md` | AI agent project instructions | `/CLAUDE.md` |
| `CHANGELOG.md` | Version history | `/CHANGELOG.md` |
| `docs/README.md` | AI-friendly developer docs | `/docs/README.md` |
| `docs/functions/` | Function category documentation | `/docs/functions/` |

### External Links

- **npm Package**: https://www.npmjs.com/package/chronia
- **GitHub Repository**: https://github.com/t0k0sh1/chronia
- **Codecov Dashboard**: https://codecov.io/gh/t0k0sh1/chronia
- **Snyk Security**: https://snyk.io/test/github/t0k0sh1/chronia

---

## Summary

Chronia is a modern, security-focused TypeScript date/time library built on four core principles:

1. **<¯ Zero Dependencies** - No runtime dependencies for maximum security
2. **<¯ No-Exception Error Handling** - Predictable error values instead of thrown exceptions
3. **<¯ Tree-Shakable & Dual Module** - Optimal bundle size with ESM/CJS support
4. **<¯ Security-First Approach** - Socket Firewall, Snyk scanning, minimal attack surface

With 70+ functions, comprehensive TypeScript support, and rigorous CI/CD testing across Node.js 18-24, Chronia provides a lightweight, reliable alternative to heavyweight date libraries. The project maintains strict code quality standards while planning future expansions for additional locales, timezone support, and alternative runtime compatibility.
