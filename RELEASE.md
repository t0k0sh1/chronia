## [1.0.5] - 2026-11-11

### Changed

- Build the package with tsdown instead of tsup; the public API, locale data and `exports` paths are unchanged, but the files under `dist/` are now minified and split into different chunks
- Add explicit type annotations to exported constants and objects (required by `isolatedDeclarations`); the resulting public types are unchanged
- Upgrade development tooling: Vitest 5, pnpm 12, TypeScript 7, oxlint and Prettier (replacing ESLint), vite 8 (dev dependencies only)
- Run CI on Node.js 26; Node.js 18 and 20 are verified with a smoke test of the built package (the published library still supports Node.js 18 or higher)

### Fixed

- Add CJS-specific `types` (`.d.cts`) to the `exports` map so TypeScript CommonJS consumers using `moduleResolution: node16` no longer get TS1471/TS1479 errors
- Drop vulnerable development dependencies reported by OSV-Scanner (`vitest` 3.2.4 / GHSA-5xrq-8626-4rwp, `minimatch` via ESLint, `esbuild` 0.27.7 / GHSA-g7r4-m6w7-qqqr, `vite`)

### Removed

- Remove ESLint, typescript-eslint, tsup and `@types/node` from development dependencies
- Remove the unused, skipped validator benchmark (`tests/_lib/validators.bench.ts`)

