# Technology Stack

## Core Technologies

### TypeScript 5.9+
**Purpose:** Primary development language

**Configuration Highlights:**
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Declaration files generated

**Usage:**
```typescript
// Full type safety for library consumers
import { addDays, Locale } from "chronia";

const result: Date = addDays(new Date(), 7);
const locale: Locale = { /* ... */ };
```

### Node.js LTS (18+)
**Supported Versions:** 18.x, 20.x, 22.x, 24.x

**Policy:**
- Support LTS releases (even-numbered major versions)
- Continue EOL LTS support while dependencies allow
- CI tests against all supported versions

**Compatibility:** Works in browser environments (uses standard Date API).

## Build Tools

### tsup
**Purpose:** Zero-config TypeScript bundler

**Features:**
- Dual ESM/CJS output
- DTS (declaration) generation
- Minification
- Tree-shaking support

**Configuration:**
```typescript
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  splitting: false,
  sourcemap: false,
  clean: true
});
```

**Build Command:** `npm run build`

### TypeDoc
**Purpose:** API documentation generation

**Configuration:**
```json
{
  "entryPoints": ["src/index.ts"],
  "out": "site",
  "exclude": ["src/_lib/**/*"]
}
```

**Output:** Static HTML documentation in `site/`

**Generation:** `npm run docs` (TypeDoc script)

## Testing

### Vitest
**Purpose:** Fast unit testing framework

**Features:**
- ESM-first design
- TypeScript support
- Coverage reporting (V8)
- Watch mode

**Test Pattern:**
```typescript
import { describe, it, expect } from "vitest";
import { addDays } from "../src/addDays";

describe("addDays", () => {
  it("adds days to a date", () => {
    const result = addDays(new Date(2024, 0, 1), 7);
    expect(result).toEqual(new Date(2024, 0, 8));
  });
});
```

**Commands:**
- `npm test`: Run all tests
- `npx vitest`: Watch mode
- `npx vitest run --coverage`: Coverage report

**Coverage Config:**
- Excludes: `src/types.ts`, `src/i18n/`, config files
- Target: High coverage (>90%)

## Code Quality

### ESLint
**Purpose:** Code linting and style enforcement

**Key Rules:**
- Double quotes for strings
- Semicolons required
- TypeScript-specific rules via `@typescript-eslint`

**Configuration:**
```javascript
// eslint.config.js
export default [
  {
    files: ["src/**/*.ts"],
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  }
];
```

**Lint Command:** `npm run lint`

**Scope:** Only `src/**/*.ts` (tests excluded)

## Package Management

### npm
**Lock File:** `package-lock.json`

**Key Scripts:**
```json
{
  "build": "tsup",
  "clean": "rimraf dist",
  "docs": "typedoc",
  "test": "vitest tests/",
  "lint": "eslint ./src",
  "prepublishOnly": "npm run clean && npm run build"
}
```

### Dependencies

**Production:** None (zero runtime dependencies)

**Development:**
- `typescript` ^5.9.2
- `tsup` ^8.5.0
- `vitest` ^3.2.4
- `@vitest/coverage-v8` ^3.2.4
- `eslint` ^9.35.0
- `@typescript-eslint/*` ^8.42.0
- `typedoc` ^0.28.12
- `rimraf` ^6.0.1

## CI/CD

### GitHub Actions
**Workflow:** `.github/workflows/ci.yaml`

**Jobs:**
- Lint code
- Run tests on Node 18.x, 20.x, 22.x, 24.x
- Generate coverage report
- Upload to Codecov
- Build package

**PR Requirements:**
- All tests pass
- Linting passes
- Coverage maintained

## Build Output

### Dual Module Format
```
dist/
├── index.js      # ESM (for modern bundlers)
├── index.cjs     # CommonJS (for Node.js)
├── index.d.ts    # TypeScript declarations (ESM)
└── index.d.cts   # TypeScript declarations (CJS)
```

**Tree-Shaking:** ESM format enables dead code elimination.

**Compatibility:** CJS ensures compatibility with older Node.js/bundlers.

## Versioning

### Semantic Versioning (SemVer)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes (backward-compatible)

**Current Stage:** v1.0.0 (stable API)

**Pre-1.0:** v0.x.x (beta, breaking changes allowed)

## Publishing

**Registry:** npm (public)

**Publish Process:**
1. `npm run clean` - Remove old build
2. `npm run build` - Build ESM/CJS
3. `npm publish` - Publish to npm

**Included Files:**
- `dist/` - Build output
- `README.md`
- `LICENSE`

**package.json Exports:**
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "types": "./dist/index.d.ts",
  "sideEffects": false
}
```

## Development Workflow

1. **Install dependencies:** `npm install`
2. **Write code:** Add/modify functions in `src/`
3. **Write tests:** Add tests in `tests/`
4. **Lint:** `npm run lint`
5. **Test:** `npm test`
6. **Build:** `npm run build`
7. **Generate docs:** `npm run docs` (optional)

## Performance Targets

- **Bundle size:** <50KB minified
- **Tree-shaking:** Individual function imports
- **Zero dependencies:** No runtime overhead
- **Fast tests:** <1s for full test suite

## Related

- **Project Structure**: See `project-structure.md`
- **Development Principles**: See `development-principles.md`
