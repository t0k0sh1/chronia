# Repository Guidelines

## Project Structure & Module Organization
Chronia’s TypeScript modules live in `src/`, with one folder per exported helper (`src/addDays/`) and shared code in `src/_lib/` plus locales in `src/i18n/`. Tests mirror the structure in `tests/`, and `dist/` holds the `tsup` build. Agent-facing docs sit in `docs/` (`docs/functions/**` mirrors the README categories); update the matching file whenever behavior or signatures move.

## Build, Test, and Development Commands
- `pnpm install` – set up dependencies (Node 18+ is required).
- `pnpm build` – run `tsup` to emit ESM/CJS bundles and types into `dist/`.
- `pnpm clean` – remove `dist/` before a fresh build; `pnpm prepublishOnly` chains clean+build for release prep.
- `pnpm test` – execute the Vitest suite in `tests/` (default watch mode during local dev).
- `pnpm test:pbt` – run the property-based tests under `.kiro/spec/**/*.pbt.test.ts` for fuzz coverage.
- `pnpm test:coverage` – produce V8 coverage artifacts consumed by Codecov.
- `pnpm lint` / `pnpm lint:docs` – enforce TypeScript lint rules (`eslint.config.js`) and Markdown style (`docs/**`, `README.md`).

## Coding Style & Naming Conventions
Follow the strict TypeScript settings from `tsconfig.json` and avoid implicit `any`. Public helpers accept `Date` objects or timestamps and should stay pure. Use lower camelCase for exported functions (`addDays`, `isSameMonth`) and PascalCase only for types in `src/types.ts`. ESLint enforces double quotes and mandatory semicolons; run it before committing. New APIs must be wired through `src/index.ts` and documented under `docs/functions/`.

## Testing Guidelines
Vitest is the canonical test runner. Place deterministic unit tests in `tests/`, naming files `<feature>.test.ts`, and cover invalid dates, timezone boundaries, and leap years explicitly. Prefer property-based specs in `.kiro/spec` for range-heavy algorithms and run `pnpm test:pbt` when touching them. Keep coverage near the Codecov badge baseline; add focused tests before opening a PR if it dips.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (e.g., `fix: normalize truncSecond rollover`, `docs: expand comparison guide`). Use the `<type>: <imperative>` pattern and reference issues or PR numbers inline when relevant (`Merge pull request #23 …`). Pull requests should include: a concise summary, justification for the change, links to tracked issues, and the commands used for validation (`pnpm lint && pnpm test`). Update documentation and changelog entries when behavior changes, and include screenshots/gifs for documentation-visible updates.
