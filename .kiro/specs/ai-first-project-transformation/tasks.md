# Implementation Plan

- [ ] 1. Rename existing docs directory to site directory
  - Rename the existing `docs/` directory to `site/` to preserve generated TypeDoc documentation
  - Update `typedoc.json` configuration to output to `site/` directory instead of `docs/`
  - Update any GitHub Pages or deployment configurations to serve from `site/` directory
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2. Create AI-focused docs directory structure
  - Create new `docs/` directory with subdirectories for function-categories, guidelines, and troubleshooting
  - Create function category subdirectories (arithmetic, comparison, difference, getter, setter, boundary, truncation, formatting, utility, constants)
  - Create placeholder markdown files for each subcategory within function directories
  - _Requirements: 2.1, 2.2_

- [ ] 3. Create function category documentation files
- [ ] 3.1 Create arithmetic function documentation
  - Write `docs/function-categories/arithmetic/addition.md` covering addDays, addHours, addMinutes, addSeconds, addMilliseconds, addMonths, addYears
  - Write `docs/function-categories/arithmetic/subtraction.md` covering subDays, subHours, subMinutes, subSeconds, subMilliseconds, subMonths, subYears
  - Include function signatures, usage patterns, AI guidance, and common pitfalls for each file
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 3.2 Create comparison function documentation
  - Write `docs/function-categories/comparison/relational.md` covering isAfter, isAfterOrEqual, isBefore, isBeforeOrEqual, isBetween, compare
  - Write `docs/function-categories/comparison/equality.md` covering isEqual, isSameYear, isSameMonth, isSameDay, isSameHour, isSameMinute, isSameSecond
  - Write `docs/function-categories/comparison/validation.md` covering isValid function
  - Include function signatures, usage patterns, AI guidance, and common pitfalls for each file
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 3.3 Create remaining function category documentation
  - Write `docs/function-categories/difference/calculations.md` covering diffYears, diffMonths, diffDays, diffHours, diffMinutes, diffSeconds, diffMilliseconds
  - Write `docs/function-categories/getter/extraction.md` covering getYear, getMonth, getDay, getHours, getMinutes, getSeconds, getMilliseconds, getTime
  - Write `docs/function-categories/setter/modification.md` covering setYear, setMonth, setDay, setHours, setMinutes, setSeconds, setMilliseconds, setTime
  - Write `docs/function-categories/boundary/periods.md` covering startOfYear, endOfYear, startOfMonth, endOfMonth, startOfDay, endOfDay
  - Write `docs/function-categories/truncation/units.md` covering truncYear, truncMonth, truncDay, truncHour, truncMinute, truncSecond, truncMillisecond
  - Write `docs/function-categories/formatting/conversion.md` covering format and parse functions
  - Write `docs/function-categories/utility/helpers.md` covering now, min, max, clamp functions
  - Write `docs/function-categories/constants/types.md` covering constants and TypeScript type definitions
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 4. Create guidelines documentation
- [ ] 4.1 Create core development guidelines
  - Write `docs/guidelines/development-principles.md` with core development principles including directory structure for new functions, TypeScript type safety with JavaScript compatibility, no-exception error handling policy, focus on high-frequency functions only, performance and robustness priorities, options parameter patterns
  - Write `docs/guidelines/project-structure.md` with project structure and organization including directory layout, file naming conventions, module organization, and architectural patterns
  - Write `docs/guidelines/tech-stack.md` with technology stack explanation including TypeScript 5.9+, Node.js LTS support, Vitest for testing, tsup for building, ESLint for linting, TypeDoc for documentation generation
  - _Requirements: 2.4_

- [ ] 4.2 Create implementation guidelines
  - Write `docs/guidelines/error-handling.md` with error handling patterns including no-exception policy, standardized error values (Invalid Date, NaN, false), input validation approaches
  - Write `docs/guidelines/input-validation.md` with input validation approaches using _lib/validators.ts, isValidDateOrNumber and isValidNumber patterns
  - Write `docs/guidelines/common-use-cases.md` with typical usage scenarios including date arithmetic, formatting/parsing, comparisons, and boundary operations
  - _Requirements: 2.4_

- [ ] 5. Create troubleshooting documentation
  - Write `docs/troubleshooting/common-pitfalls.md` with frequent mistakes including timezone handling, month indexing (0-11), leap year edge cases, invalid date propagation, and their solutions
  - Write `docs/troubleshooting/debugging-guide.md` with debugging date/time issues including how to identify invalid dates, understanding error return values, testing with edge cases, and validation strategies
  - _Requirements: 2.4_

- [ ] 6. Create docs overview file
  - Write `docs/README.md` as AI documentation overview explaining the purpose and structure of the AI-focused documentation
  - Include navigation links to all major sections and guidelines for AI agents
  - _Requirements: 2.1_

- [ ] 7. Enhance README.md with AI-friendly content
  - Add links from each of the 10 function category sections in README.md to corresponding documentation files in the docs directory
  - Add AI-specific metadata and context while maintaining existing human-readable content
  - Update existing TypeDoc documentation links to point to site/ directory instead of docs/
  - Reference the location of additional AI documentation resources
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 8. Update GitHub Copilot instructions
  - Update `.github/copilot-instructions.md` with comprehensive project-specific guidance including document overview and prerequisites, library overview with main features, technology stack overview, project structure, architecture guidelines, directory and file naming conventions, implementation guide with coding best practices, anti-patterns and common mistakes, code review guidelines
  - Add cross-references to relevant docs/ files for detailed information where applicable
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 9. Create AGENTS.md reference file
  - Write `AGENTS.md` as a simple reference file that points to CLAUDE.md for AI-specific guidance
  - Keep the content minimal and focused only on referencing existing Claude documentation
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 10. Validate and test documentation
- [ ] 10.1 Validate internal links and cross-references
  - Verify all internal links in docs/ directory resolve correctly
  - Check that README.md links to docs/ files work properly
  - Validate cross-references between AI documentation files
  - _Requirements: 2.1, 3.5_

- [ ] 10.2 Test build process integration
  - Ensure TypeDoc continues to generate site/ content correctly
  - Verify no broken links in generated documentation
  - Test that deployment processes handle site/ directory correctly
  - _Requirements: 1.2, 1.3_