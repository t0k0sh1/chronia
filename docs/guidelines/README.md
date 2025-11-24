# Chronia Development Guidelines

## Overview

This directory contains comprehensive guidelines for developing the Chronia date/time library. These guidelines ensure consistency, quality, and maintainability across the entire codebase.

All contributors must follow these guidelines when designing, implementing, testing, documenting, and reviewing code.

---

## Guidelines Index

### Function Development

| Guideline                                                   | Purpose                                    | When to Use                                             |
|-------------------------------------------------------------|--------------------------------------------|---------------------------------------------------------|
| [**Function Design**](./function-design.md)                 | Design principles and interface patterns   | When designing new functions or refactoring interfaces  |
| [**Function Implementation**](./function-implementation.md) | Implementation patterns and best practices | When implementing function bodies                       |
| [**Function Testing**](./function-testing.md)               | Testing standards and patterns (TDD + PBT) | When writing tests for functions                        |
| [**Test-Driven Development**](./test-driven-development.md) | TDD methodology and best practices         | When implementing functions with TDD approach           |
| [**Property-Based Testing**](./property-based-testing.md)   | PBT-specific patterns and best practices   | When writing property-based tests with fast-check       |
| [**Function Check**](./function-check.md)                   | Quality checks and CI/CD guidelines        | Before committing code and during code review           |

### Documentation

| Guideline                                                 | Purpose                                     | When to Use                                  |
|-----------------------------------------------------------|---------------------------------------------|----------------------------------------------|
| [**Function Documentation**](./documentation-function.md) | Individual function documentation structure | When documenting individual functions        |
| [**Category Documentation**](./documentation-category.md) | Category README documentation structure     | When creating or updating category overviews |
| [**Markdown Style**](./markdown-style.md)                 | Markdown writing standards and conventions  | When writing or reviewing Markdown files     |

---

## Development Workflow

Follow this workflow when developing new features or modifying existing code:

```text
Phase 1: Design
├─ Read: function-design.md
├─ Create: Function signatures and interfaces
└─ Output: Type-safe function stubs with JSDoc

Phase 2: Implementation & Testing
├─ Read: function-implementation.md, function-testing.md
├─ TDD (Required):
│  ├─ Write tests in tests/
│  ├─ Implement function
│  ├─ Run: pnpm test
│  └─ Verify: pnpm test:coverage
└─ PBT (Required when spec exists):
   ├─ Write tests in .kiro/spec/<spec-name>/
   ├─ Run: pnpm test:pbt
   └─ Verify all properties pass

Phase 3: Quality Check
├─ Read: function-check.md
├─ Run: pnpm lint
├─ Run: pnpm lint:docs
├─ Run: pnpm build
└─ Verify: All checks pass

Phase 4: Documentation
├─ Read: documentation-function.md
├─ Create/update: docs/functions/<category>/<function-name>.md
├─ Read: documentation-category.md
└─ Update: docs/functions/<category>/README.md

Phase 5: Commit & PR
├─ Create git commit
└─ Create pull request
```

---

## Quick Reference

### For New Contributors

**First time contributing?** Read these in order:

1. [Function Design](./function-design.md) - Understand design principles
2. [Function Implementation](./function-implementation.md) - Learn implementation patterns
3. [Function Testing](./function-testing.md) - Master testing approach
4. [Function Check](./function-check.md) - Know quality standards

### For Specific Tasks

**Designing a new function?**
→ [Function Design](./function-design.md)

**Implementing a function?**
→ [Function Implementation](./function-implementation.md) + [Test-Driven Development](./test-driven-development.md)

**Writing TDD tests?**
→ [Test-Driven Development](./test-driven-development.md)

**Writing property-based tests?**
→ [Property-Based Testing](./property-based-testing.md)

**Writing documentation?**
→ [Function Documentation](./documentation-function.md) or [Category Documentation](./documentation-category.md)

**Preparing to commit?**
→ [Function Check](./function-check.md)

---

## Guideline Summaries

### Function Design Guidelines

**Purpose**: Define design principles for function interfaces

**Key Topics**:

- Type flexibility (Date | number pattern)
- Options parameter pattern
- Naming conventions (is/get/add prefixes)
- Error handling philosophy
- Return type standards

**Critical Rules**:

- All date parameters accept `Date | number`
- No exceptions for invalid dates (graceful handling)
- Immutability for transformation functions
- Consistent naming across the library

[→ Read Full Guidelines](./function-design.md)

---

### Function Implementation Guidelines

**Purpose**: Define implementation patterns and best practices

**Key Topics**:

- File structure and organization
- JSDoc documentation requirements
- Input validation patterns
- Performance optimization techniques
- Common patterns by function category

**Critical Rules**:

- Each function in `src/<function-name>/index.ts`
- Comprehensive JSDoc comments required
- Early returns for validation
- No hard-coded values
- Type-safe implementations

[→ Read Full Guidelines](./function-implementation.md)

---

### Function Testing Guidelines

**Purpose**: Define testing standards (TDD and Property-Based Testing)

**Key Topics**:

- Two-phase testing approach (TDD + PBT)
- Test structure and organization
- Coverage requirements
- TDD patterns by function category
- Property-based testing with fast-check

**Critical Rules**:

- TDD (Phase 1) always required in `tests/`
- PBT (Phase 2) required when spec exists in `.kiro/spec/`
- 100% coverage target for new code
- Test all input types (Date and number)
- Test edge cases and invalid inputs

**Commands**:

```bash
# TDD Testing
pnpm test                 # Run all TDD tests
pnpm test:coverage        # Run with coverage report

# Property-Based Testing
pnpm test:pbt            # Run all PBT tests
```

[→ Read Full Guidelines](./function-testing.md)

---

### Test-Driven Development Guidelines

**Purpose**: Define TDD methodology and best practices for implementation

**Key Topics**:

- Red-Green-Refactor cycle
- Test structure and organization (Arrange-Act-Assert)
- Test categories (happy path, edge cases, invalid inputs, options)
- Test patterns by function category
- Coverage requirements (100% target)

**Critical Rules**:

- Write tests before implementation (Red-Green-Refactor)
- Tests in `tests/` directory
- 100% coverage target for all code
- Test both Date objects and timestamps
- Test all edge cases and invalid inputs
- Ensure test isolation (no shared state)

**Test Categories**:

1. **Happy Path**: Normal, expected usage
2. **Edge Cases**: Boundaries, special dates, corner cases
3. **Invalid Inputs**: Graceful error handling
4. **Options**: Configurable behavior testing

**Commands**:

```bash
pnpm test                 # Run all TDD tests
pnpm test --watch         # Watch mode
pnpm test:coverage        # With coverage report
```

[→ Read Full Guidelines](./test-driven-development.md)

---

### Property-Based Testing Guidelines

**Purpose**: Define standards for property-based testing with fast-check

**Key Topics**:

- PBT validation strategies
- Arbitraries and property design
- Common property patterns (invariants, round-trip, idempotence)
- Edge case handling in PBT
- Root cause analysis for failures

**Critical Rules**:

- PBT required when specification exists in `.kiro/spec/`
- Test files in `.kiro/spec/<spec-name>/<function-name>.pbt.test.ts`
- Map tests to specification requirements
- Compare against reference implementations
- Use appropriate arbitraries for input generation

**Key Validation Strategies**:

1. Native JavaScript API comparison
2. date-fns reference library comparison
3. Mathematical properties verification
4. Specification-defined invariants

**Commands**:

```bash
pnpm test:pbt            # Run all property-based tests
pnpm test:pbt <spec>     # Run tests for specific spec
```

[→ Read Full Guidelines](./property-based-testing.md)

---

### Function Check Guidelines

**Purpose**: Define quality checks and CI/CD processes

**Key Topics**:

- Pre-commit checklist
- Automated checks (lint, test, build)
- Regression testing
- Common issues and fixes
- Quality metrics

**Critical Rules**:

- All checks must pass before commit
- ESLint with no errors
- All tests passing
- Build succeeds (includes TypeScript compilation)
- Documentation linting passes

**Commands**:

```bash
pnpm lint                # Code linting
pnpm lint:docs           # Documentation linting
pnpm test                # Run tests
pnpm build               # Build and verify TypeScript
```

[→ Read Full Guidelines](./function-check.md)

---

### Function Documentation Guidelines

**Purpose**: Define structure for individual function documentation

**Key Topics**:

- 8-section documentation structure
- Writing standards and style
- Code example requirements
- JSDoc to documentation mapping

**Sections**:

1. Title
2. Overview
3. Signature
4. Parameters
5. Return Value
6. Description (with Specification and Behavior Notes)
7. Use Cases
8. Usage Examples

**Critical Rules**:

- Documentation must match implementation exactly
- All code examples must be runnable
- Use inline code formatting for technical terms
- Include both Date and number examples

[→ Read Full Guidelines](./documentation-function.md)

---

### Category Documentation Guidelines

**Purpose**: Define structure for category README files

**Key Topics**:

- 11-section documentation structure
- Available functions table
- Common features across category
- Use case guide and patterns

**Sections**:

1. Title
2. Overview
3. Available Functions
4. Common Features
5. Choosing the Right Function
6. Use Case Guide
7. Common Patterns
8. Performance Considerations
9. Type Definitions
10. Error Handling
11. See Also

**Critical Rules**:

- Update when adding/removing functions
- Link all functions to their documentation
- Include comprehensive use case guide
- Provide practical code examples

[→ Read Full Guidelines](./documentation-category.md)

---

## Compliance

### Mandatory Guidelines

All contributions must comply with these guidelines. Code that does not follow these standards will not be accepted.

### Guideline Updates

Guidelines are living documents and may be updated to reflect:

- New best practices discovered
- Community feedback
- Lessons learned from code reviews
- Changes in technology or dependencies

When guidelines are updated, existing code is not required to be retroactively updated unless it's being modified for other reasons.

---

## Additional Resources

### Project Configuration

- **CLAUDE.md**: AI-assisted development workflows
- **package.json**: Available pnpm commands
- **.eslintrc**: Linting configuration

### Related Documentation

- **docs/functions/**: Function documentation
- **tests/**: Test examples
- **.kiro/spec/**: Specifications and property-based tests

---

## Getting Help

If you have questions about these guidelines:

1. **Check the specific guideline** for detailed information
2. **Review existing code** for examples
3. **Ask in pull request reviews** for clarification
4. **Propose guideline improvements** via issues

---

## License

These guidelines are part of the Chronia project and are licensed under the MIT License.
