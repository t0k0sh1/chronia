# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Test**: `npm test` (uses Vitest)
- **Lint**: `npm run lint` (ESLint with TypeScript)
- **Build**: `npm run build` (builds both ESM and CJS modules)
  - ESM only: `npm run build:esm`
  - CJS only: `npm run build:cjs`
- **Clean**: `npm run clean` (removes dist directory)

## Project Architecture

This is a TypeScript date/time utility library with dual module support (ESM/CJS).

### Core Structure

- **src/index.ts**: Main entry point that re-exports all utilities
- **src/format/**: Date formatting functionality with locale support
- **src/addDays/**: Date arithmetic utilities
- **src/locale/**: Locale-specific formatting data (en-US, ja)
- **src/_lib/**: Internal shared utilities

### Formatting System Architecture

The date formatting system follows a token-based approach:

1. **Tokenization** (`src/_lib/tokenize.ts`): Parses format patterns into tokens using regex
2. **Formatters** (`src/_lib/formatters/`): Token handlers organized by category (year, month, day, etc.)
3. **Localization** (`src/_lib/types.ts`, `src/locale/`): Pluggable locale system via `Localize` interface

### Key Design Patterns

- **Token System**: Format patterns like "yyyy-MM-dd" are tokenized and processed by specific formatters
- **Locale Abstraction**: All text formatting goes through the `Localize` interface for i18n support
- **Modular Functions**: Each utility is in its own directory with index.ts
- **Dual Build**: Separate TypeScript configs for ESM/CJS outputs

### Test Structure

- Uses Vitest with table-driven tests (`it.each`)
- Tests are comprehensive with boundary value testing
- Tests cover both normal and edge cases (leap years, BC dates, etc.)
- Mock localize objects used for testing localization features

### Build Configuration

- **tsconfig.json**: Base TypeScript configuration
- **tsconfig.esm.json**: ESM build configuration
- **tsconfig.cjs.json**: CJS build configuration
- Outputs to `dist/` with separate directories for each module type and type definitions