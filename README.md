# Chronia

![Chronia](./docs/logo.png)

![npm version](https://badge.fury.io/js/chronia.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/t0k0sh1/chronia/ci.yaml)
![snyk](https://snyk.io/test/github/t0k0sh1/chronia/badge.svg)
![Node Current](https://img.shields.io/node/v/chronia)
![NPM Downloads](https://img.shields.io/npm/dm/chronia)
[![codecov](https://codecov.io/gh/t0k0sh1/chronia/graph/badge.svg?token=679LKV16RZ)](https://codecov.io/gh/t0k0sh1/chronia)

A modern, lightweight TypeScript date/time utility library with comprehensive formatting, parsing, and manipulation capabilities.

## Overview

Chronia is a modern date and time utility library for JavaScript and TypeScript.
It offers a simple, consistent, and functional API that makes working with dates and times more predictable than the native `Date` object.

### Key Features

- 🚀 **TypeScript-first** – Strict typings with TypeScript 5.9+
- 📦 **Lightweight** – ESM/CJS dual modules, fully tree-shakable
- 🌍 **Internationalization** – Built-in locale support (English, Japanese)
- 📅 **Comprehensive Utilities** – Formatting, parsing, arithmetic, comparison, ranges, differences
- 🎯 **Consistent API** – Unified support for `Date` objects and timestamps
- ✅ **Safe Error Handling** – No exceptions; standardized values (`Invalid Date`, `NaN`, `false`)
- ⚡ **Well-tested** – 2100+ automated test cases ensure reliability

## Installation

Chronia requires **Node.js v18 or higher**.

```bash
# Using pnpm (recommended)
pnpm add chronia

# Using npm
npm install chronia

# Using yarn
yarn add chronia
```

## Quick Start

```typescript
import { now, format, addDays, isAfter } from "chronia";

// Get the current time
const current = now();

// Format dates
console.log(format(current, "yyyy-MM-dd HH:mm:ss"));

// Date arithmetic
const nextWeek = addDays(current, 7);

// Comparison
console.log(isAfter(nextWeek, current)); // true
```

## Function Categories

Chronia provides 74 functions organized into 10 categories:

> 📚 **For AI Agents**: Detailed documentation optimized for AI comprehension is available in the [`docs/`](docs/) directory. See [`docs/README.md`](docs/README.md) for a complete guide.

### 1. Arithmetic (14 functions)

Add or subtract time units from dates.

**Addition:**

- `addYears` - Add years to a date
- `addMonths` - Add months to a date
- `addDays` - Add days to a date
- `addHours` - Add hours to a date
- `addMinutes` - Add minutes to a date
- `addSeconds` - Add seconds to a date
- `addMilliseconds` - Add milliseconds to a date

**Subtraction:**

- `subYears` - Subtract years from a date
- `subMonths` - Subtract months from a date
- `subDays` - Subtract days from a date
- `subHours` - Subtract hours from a date
- `subMinutes` - Subtract minutes from a date
- `subSeconds` - Subtract seconds from a date
- `subMilliseconds` - Subtract milliseconds from a date

📖 _Detailed documentation_: [Addition](docs/functions/arithmetic/addition.md) | [Subtraction](docs/functions/arithmetic/subtraction.md)

### 2. Comparison (18 functions)

Compare dates and check for equality or relative ordering.

**Relational:**

- `isAfter` - Check if a date is after another
- `isAfterOrEqual` - Check if a date is after or equal to another
- `isBefore` - Check if a date is before another
- `isBeforeOrEqual` - Check if a date is before or equal to another
- `isBetween` - Check if a date is within a range
- `compare` - Compare two dates for sorting

**Equality:**

- `isEqual` - Check if two dates are exactly equal
- `isSameYear` - Check if dates are in the same year
- `isSameMonth` - Check if dates are in the same month
- `isSameDay` - Check if dates are on the same day
- `isSameHour` - Check if dates are in the same hour
- `isSameMinute` - Check if dates are in the same minute
- `isSameSecond` - Check if dates are in the same second

**Current Time Comparison:**

- `isFuture` - Check if a date is in the future relative to current time
- `isPast` - Check if a date is in the past relative to current time

**Validation:**

- `isDate` - Check if a value is a Date object instance
- `isValid` - Check if a date is valid
- `isExists` - Check if year, month, and day represent an existing date

📖 _Detailed documentation_: [Relational](docs/functions/comparison/relational.md) | [Equality](docs/functions/comparison/equality.md) | [Current Time Comparison & Validation](docs/functions/validations/)

### 3. Difference (7 functions)

Calculate the difference between two dates in specific units.

- `diffYears` - Calculate the difference in years
- `diffMonths` - Calculate the difference in months
- `diffDays` - Calculate the difference in days
- `diffHours` - Calculate the difference in hours
- `diffMinutes` - Calculate the difference in minutes
- `diffSeconds` - Calculate the difference in seconds
- `diffMilliseconds` - Calculate the difference in milliseconds

📖 _Detailed documentation_: [Calculations](docs/functions/difference/calculations.md)

### 4. Getter (8 functions)

Extract specific components from dates.

- `getYear` - Get the year
- `getMonth` - Get the month (0-11)
- `getDay` - Get the day of the month
- `getHours` - Get the hours
- `getMinutes` - Get the minutes
- `getSeconds` - Get the seconds
- `getMilliseconds` - Get the milliseconds
- `getTime` - Get the Unix timestamp

📖 _Detailed documentation_: [Extraction](docs/functions/getter/extraction.md)

### 5. Setter (8 functions)

Set specific components of dates.

- `setYear` - Set the year
- `setMonth` - Set the month
- `setDay` - Set the day of the month
- `setHours` - Set the hours
- `setMinutes` - Set the minutes
- `setSeconds` - Set the seconds
- `setMilliseconds` - Set the milliseconds
- `setTime` - Set the date from Unix timestamp

📖 _Detailed documentation_: [Modification](docs/functions/setter/modification.md)

### 6. Boundary (6 functions)

Get the start or end of a time period.

- `startOfYear` - Get the start of the year
- `endOfYear` - Get the end of the year
- `startOfMonth` - Get the start of the month
- `endOfMonth` - Get the end of the month
- `startOfDay` - Get the start of the day
- `endOfDay` - Get the end of the day

📖 _Detailed documentation_: [Periods](docs/functions/boundary/periods.md)

### 7. Truncation (7 functions)

Zero out time components below a specified unit.

- `truncYear` - Truncate to year (zero out month, day, time)
- `truncMonth` - Truncate to month (zero out day, time)
- `truncDay` - Truncate to day (zero out time)
- `truncHour` - Truncate to hour (zero out minutes, seconds, ms)
- `truncMinute` - Truncate to minute (zero out seconds, ms)
- `truncSecond` - Truncate to second (zero out milliseconds)
- `truncMillisecond` - Truncate to millisecond

📖 _Detailed documentation_: [Units](docs/functions/truncation/units.md)

### 8. Formatting (2 functions)

Convert between dates and strings.

- `format` - Format a date to a string
- `parse` - Parse a string to a date

📖 _Detailed documentation_: [Conversion](docs/functions/formatting/conversion.md)

### 9. Utility (4 functions)

Miscellaneous helper functions.

- `now` - Get the current date and time
- `min` - Get the earliest date from multiple dates
- `max` - Get the latest date from multiple dates
- `clamp` - Clamp a date within a range

📖 _Detailed documentation_: [Helpers](docs/functions/utility/helpers.md)

### 10. Constants & Types

Exported constants and TypeScript type definitions.

- `constants` - Library constants
- `Interval` - Type for date intervals
- `Locale` - Type for locale configuration
- `TimeUnit` - Type for time units
- `BoundsType` - Type for boundary options
- `BetweenOption` - Type for between operation options
- `CompareOptions` - Type for compare function options

📖 _Detailed documentation_: [Types](docs/functions/constants/types.md)

## Core Functions

### Current Time

```typescript
import { now } from "chronia";

const current = now(); // Equivalent to new Date(), but more semantic
```

### Formatting & Parsing

```typescript
import { format, parse } from "chronia";

const date = new Date(2024, 0, 15);

format(date, "yyyy-MM-dd HH:mm:ss"); // "2024-01-15 00:00:00"
parse("2024-01-15", "yyyy-MM-dd"); // Date object
```

Supports standard Unicode tokens. See [API Reference](https://t0k0sh1.github.io/chronia/site/) for full list.

### Date Arithmetic

```typescript
import { addDays, subMonths } from "chronia";

addDays(new Date(), 7); // +7 days
subMonths(Date.now(), 3); // -3 months (timestamp input also supported)
```

### Comparison

```typescript
import { isAfter, compare } from "chronia";

isAfter(new Date(2025, 0, 1), new Date(2024, 0, 1)); // true

const dates = [new Date(2024, 0, 10), new Date(2024, 0, 20)];
dates.sort(compare); // ascending order (default)
dates.sort((a, b) => compare(a, b, { order: "DESC" })); // descending order
```

### Ranges & Differences

```typescript
import { isBetween, diffDays } from "chronia";

isBetween(new Date(2024, 0, 15), new Date(2024, 0, 10), new Date(2024, 0, 20)); // true
diffDays(new Date(2024, 6, 20), new Date(2024, 0, 15)); // ~186
```

### Utilities

```typescript
import { startOfMonth, getYear, isValid } from "chronia";

startOfMonth(new Date(2024, 5, 15)); // 2024-06-01
getYear(Date.now()); // 2024
isValid(new Date("invalid")); // false
```

⸻

👉 For full API docs and more examples, see the [TypeDoc documentation](https://t0k0sh1.github.io/chronia/site/).

## Error Handling Policy

- This library **does not use exceptions** for error reporting
- Errors are always indicated by the return value:
  - **Date**: `Invalid Date`
  - **number**: `NaN`
  - **boolean**: `false` (Note: may also indicate a valid negative result; check input validity when needed)
- Use the `isValid` function to detect invalid values for `Date` and `number` results
- This ensures consistent and predictable error handling across all APIs

Example: `isAfter(date1, date2)` returns `false` if `date1` is **before** `date2` (valid),
but also `false` if either input is invalid (error).
Use `isValid()` to distinguish these cases.

## Node.js Version Support Policy

- Support is limited to **LTS releases (even-numbered major versions)** (e.g., v18, v20, v22, v24, ...).
- For LTS versions that have reached end-of-life (EOL), support will continue **as long as the following conditions are not met**:
  - Updates to dependencies become impossible
  - Changes in the Node.js core make it impossible to maintain compatibility
- CI tests must include the latest LTS release, and older LTS releases will be tested as far as reasonably possible

## Versioning and Backward Compatibility Policy

- This library follows **Semantic Versioning (SemVer)**

  - **MAJOR** version (e.g., 1.x → 2.0): Introduced when backward-incompatible changes are made
  - **MINOR** version (e.g., 1.1 → 1.2): Introduced when new features are added while maintaining backward compatibility
  - **PATCH** version (e.g., 1.1.0 → 1.1.1): Introduced for bug fixes or improvements that do not break backward compatibility

- The fundamental policy is to maintain backward compatibility, and **only MAJOR version updates may include breaking changes**
- Any breaking changes must be explicitly documented in the release notes and changelog
- The official release of this library starts from **v1.0.0**
  - Versions in the **0.x.x range are considered beta releases** and do not strictly follow the above rules

## AI Documentation

Chronia includes comprehensive documentation specifically designed for AI agents (Claude, GitHub Copilot, etc.) to help them understand and correctly implement the library.

### Documentation Structure

The [`docs/`](docs/) directory contains three main sections:

1. **[Function Categories](docs/functions/)** - Detailed documentation for all 74 functions

   - Complete function signatures with examples
   - AI guidance for recommending appropriate functions
   - Common pitfalls and edge cases
   - Cross-references to related functions

2. **[Guidelines](docs/guidelines/)** - Development principles and technical specifications

   - [Development Principles](docs/guidelines/development-principles.md) - Core philosophy and design patterns
   - [Error Handling](docs/guidelines/error-handling.md) - No-exceptions policy and error patterns
   - [Input Validation](docs/guidelines/input-validation.md) - Validation strategies
   - [Common Use Cases](docs/guidelines/common-use-cases.md) - Practical implementation patterns
   - [Project Structure](docs/guidelines/project-structure.md) - Codebase organization
   - [Tech Stack](docs/guidelines/tech-stack.md) - Tools and technologies

3. **[Troubleshooting](docs/troubleshooting/)** - Debugging and problem-solving guides
   - [Common Pitfalls](docs/troubleshooting/common-pitfalls.md) - 20 common mistakes and solutions
   - [Debugging Guide](docs/troubleshooting/debugging-guide.md) - Systematic debugging approach

### For AI Agents

Start with [`docs/README.md`](docs/README.md) for a complete navigation guide. The documentation includes:

- Function-specific examples and patterns
- AI response guidance for helping users
- Cross-references between related functions
- Common user questions mapped to documentation sections

### For Developers Using AI Assistants

Reference the [`docs/`](docs/) directory when asking AI assistants for help with Chronia. The structured documentation helps AI provide more accurate and context-aware responses.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes with clear commits
4. Add tests for any new functionality
5. Run checks locally:
   - `pnpm lint` – ensure code style and quality
   - `pnpm test` – ensure all tests pass
   - `pnpm build` – ensure the project builds successfully
6. Push your branch and open a pull request with a clear description

## For Maintainers: Release Process

This project uses automated release management through Claude Code slash commands and GitHub Actions.

### Prerequisites

Before running release commands, ensure you have:

1. **GitHub CLI (gh)** installed and authenticated:

   ```bash
   # macOS
   brew install gh

   # Linux/Windows - see https://github.com/cli/cli#installation

   # Authenticate
   gh auth login
   ```

2. **Trusted Publishing** configured on npmjs:

   - This project uses OIDC trusted publishing (no NPM_TOKEN required)
   - Configure trusted publishing on npmjs: <https://docs.npmjs.com/generating-provenance-statements#using-third-party-package-publishing-tools>
   - Add GitHub Actions as a trusted publisher for the `chronia` package
   - Required settings: Repository `t0k0sh1/chronia`, Workflow file `.github/workflows/publish.yml`

3. **Clean working directory** on the `main` branch:

   ```bash
   git checkout main
   git pull origin main
   git status  # Should show no uncommitted changes
   ```

### Release Workflow

The complete release process consists of three steps:

#### Step 1: Prepare Release (`/release:prepare`)

This command automates release preparation by:

- Creating a release branch (`release/vX.Y.Z`)
- Updating `package.json` version
- Generating CHANGELOG.md entry from commit history
- Running validation checks (lint, test, build)
- Creating a pull request

**Usage:**

```bash
/release:prepare
```

You will be prompted to select a version type:

- **major** - Breaking changes (e.g., 1.5.0 → 2.0.0)
- **minor** - New features (e.g., 1.5.0 → 1.6.0)
- **patch** - Bug fixes (e.g., 1.5.0 → 1.5.1)

**What happens:**

1. Creates branch `release/vX.Y.Z`
2. Updates `package.json` with new version
3. Parses git commit history since last release tag
4. Classifies commits by Conventional Commits format:
   - `feat:` → CHANGELOG "Added" section
   - `fix:` → CHANGELOG "Fixed" section
   - `docs:` → CHANGELOG "Changed" section
5. Updates CHANGELOG.md with new version section
6. Runs validation: `pnpm lint`, `pnpm lint:docs`, `pnpm build`, `pnpm test`
7. Commits changes: `chore(release): prepare vX.Y.Z`
8. Pushes branch and creates PR

**After running:**

1. Review the pull request
2. Merge the PR into `main`
3. Proceed to Step 2

#### Step 2: Publish Release (`/release:publish`)

This command creates the GitHub release after verifying the version is unpublished:

- Checks npmjs registry to prevent duplicate releases
- Creates git tag (`vX.Y.Z`)
- Creates GitHub release with CHANGELOG notes
- Triggers automatic npm publishing (via GitHub Actions)

**Usage:**

```bash
/release:publish
```

**What happens:**

1. Reads version from `package.json`
2. Checks if version exists on npmjs (using `pnpm view chronia@X.Y.Z`)
3. If version already published → **Error**: "リリース準備ブランチの作成を忘れている可能性があります"
4. If version unpublished → Prompts for confirmation
5. Creates git tag: `vX.Y.Z`
6. Extracts CHANGELOG entry for this version
7. Creates GitHub release with CHANGELOG as release notes
8. GitHub Actions automatically publishes to npmjs

##### Optional: Pre-release

To create a pre-release (beta, alpha, etc.):

```bash
/release:publish --pre-release
```

This marks the GitHub release as "pre-release" and the npm Publish Workflow will skip it.

#### Step 3: Automatic npm Publishing

Once the GitHub release is created, the npm Publish Workflow automatically:

- Installs dependencies
- Builds the package
- Publishes to npmjs with provenance metadata

**Monitoring:**

- Check workflow status: <https://github.com/t0k0sh1/chronia/actions>
- Verify npm publication: <https://www.npmjs.com/package/chronia>

### Configuration

Release behavior can be customized in `.kiro/settings/release.json`:

```json
{
  "branchPrefix": "release/",
  "tagPrefix": "v",
  "changelog": {
    "format": "keep-a-changelog",
    "includedTypes": ["feat", "fix", "docs"],
    "sections": {
      "feat": "Added",
      "fix": "Fixed",
      "docs": "Changed"
    }
  }
}
```

**Options:**

- `branchPrefix` - Release branch name prefix (default: `"release/"`)
- `tagPrefix` - Git tag prefix (default: `"v"`)
- `changelog.includedTypes` - Commit types included in CHANGELOG (default: `["feat", "fix", "docs"]`)
- `changelog.sections` - Mapping of commit types to CHANGELOG sections

### Troubleshooting

#### Error: "Branch release/vX.Y.Z already exists"

**Cause:** A previous release preparation was interrupted or the branch was not deleted after merging.

**Solution:**

```bash
git branch -D release/vX.Y.Z  # Delete local branch
git push --delete origin release/vX.Y.Z  # Delete remote branch (if exists)
```

Then run `/release:prepare` again.

#### Error: "Version X.Y.Z is already published on npm"

**Cause:** The version in `package.json` matches a version already released on npmjs. This typically means you forgot to run `/release:prepare` or the release PR was not merged.

**Solution:**

1. Check published versions: `pnpm view chronia versions`
2. Run `/release:prepare` to create a new release branch with incremented version
3. Merge the release PR
4. Run `/release:publish` again

#### Error: "Tag vX.Y.Z already exists"

**Cause:** A git tag with the same version already exists, possibly from a previous failed release attempt.

**Solution:**

```bash
git tag -d vX.Y.Z  # Delete local tag
git push --delete origin vX.Y.Z  # Delete remote tag
```

Then run `/release:publish` again.

#### Error: "Validation failed" during `/release:prepare`

**Cause:** Code quality checks (lint, test, build) failed.

**Solution:**

1. Review the error output to identify the failing check
2. Fix the issues on the `main` branch
3. Delete the release branch:

   ```bash
   git checkout main
   git branch -D release/vX.Y.Z
   ```

4. Run `/release:prepare` again after fixes are merged

#### Error: "Failed to create PR" or "Failed to create GitHub release"

**Cause:** GitHub CLI authentication issue or network problem.

**Solution:**

1. Verify GitHub CLI authentication:

   ```bash
   gh auth status
   gh auth login  # If not authenticated
   ```

2. Check network connectivity
3. For PR creation failure: Create PR manually at `https://github.com/t0k0sh1/chronia/pull/new/release/vX.Y.Z`
4. For release creation failure: The tag was created, so you can create the release manually via GitHub UI or by running `/release:publish` again

#### npm Publish Workflow Failed

**Cause:** Build failure, trusted publishing authentication issue, or npmjs service issue.

**Solution:**

1. Check workflow logs: <https://github.com/t0k0sh1/chronia/actions>
2. If authentication failed:
   - Verify trusted publishing is configured on npmjs for the `chronia` package
   - Ensure the repository and workflow file paths match exactly
   - Check that the workflow has `id-token: write` permission
3. Re-trigger the workflow by editing the GitHub release (triggers re-run)
4. Alternatively, publish manually with a token:

   ```bash
   pnpm build
   npm publish --access public
   ```

### CHANGELOG Update Guidelines

When using the `function-docs-writer` agent to document new functions or modifications, the agent will prompt you to update CHANGELOG.md:

- **New functions** → Add to `## [Unreleased]` → `### Added` section
- **Modified behavior** → Add to `## [Unreleased]` → `### Changed` section
- **Bug fixes** → Add to `## [Unreleased]` → `### Fixed` section

Format:

```markdown
## [Unreleased]

### Added
- `functionName` - Brief description
```

The `/release:prepare` command will automatically convert the `[Unreleased]` section to a versioned section (e.g., `[1.6.0] - 2024-12-01`).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Takashi Yamashina](https://github.com/t0k0sh1)
