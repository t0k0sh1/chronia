# Chronia Project Overview

## Project Purpose
A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.

## Tech Stack
- **Language**: TypeScript 5.9+ (strict mode)
- **Build**: tsup (ES modules + CommonJS)
- **Testing**: Vitest + fast-check (property-based testing)
- **Linting**: ESLint with TypeScript support
- **Documentation**: Markdown with markdownlint
- **Package Manager**: pnpm 10.23.0

## Project Structure

```text
chronia/
├── src/              # Source code
│   ├── _lib/        # Internal utilities (tree-shakable)
│   ├── i18n/        # Localization data
│   ├── types.ts     # Type definitions
│   └── index.ts     # Public exports
├── tests/           # TDD tests (Vitest)
├── .kiro/specs/     # Specification-driven development
├── docs/            # Documentation
│   └── guidelines/  # Development guidelines
├── dist/            # Build output
└── package.json
```

## Core Commands
- `pnpm build` - Build project
- `pnpm test` - Run unit tests
- `pnpm test:pbt` - Run property-based tests
- `pnpm test:coverage` - Test with coverage
- `pnpm lint` - Lint code
- `pnpm lint:docs` - Lint Markdown

## Development Workflow
1. Design phase: Function interface design (function-interface-designer agent)
2. Implementation phase: Code implementation + TDD tests (function-implementer agent)
3. Documentation phase: Function docs (function-docs-writer agent)
4. Review phase: Code quality check (code-reviewer agent)
5. Validation phase: PBT tests (pbt-spec-validator agent)
6. Commit phase: Git commit + PR (commit-pr-validator agent)

## Key Guidelines
- **Function Design**: docs/guidelines/function-design.md
- **Implementation**: docs/guidelines/function-implementation.md
- **Testing**: docs/guidelines/function-testing.md
- **Documentation**: docs/guidelines/documentation-function.md

## Coding Standards
- TypeScript strict mode required
- No exceptions thrown (graceful defaults)
- Type-safe interfaces preferred
- Comprehensive test coverage required
- All code changes require documentation
