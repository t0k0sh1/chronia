# Function Check Guidelines

## Purpose

This document defines the quality assurance processes and checklists for functions in the Chronia library. These checks ensure code quality, prevent regressions, and maintain consistency across the codebase.

Use this guideline before committing code and as part of the CI/CD pipeline.

## Pre-Commit Checklist

Before submitting a new or modified function, verify all items:

### Design Compliance

- [ ] Function accepts `Date | number` for date parameters
- [ ] Optional configuration uses `options?: OptionsType` pattern
- [ ] Function follows naming conventions (is/get/add prefix)
- [ ] Error handling follows library philosophy (no exceptions for invalid dates)
- [ ] Return types match function category guidelines

### Implementation Quality

- [ ] Function is in `src/<function-name>/index.ts`
- [ ] Options type is defined in `src/types.ts` (if applicable)
- [ ] Input validation is implemented
- [ ] Invalid inputs are handled gracefully (no exceptions)
- [ ] Performance optimizations are applied where appropriate
- [ ] No unnecessary object creation in hot paths
- [ ] Early returns are used for validation

### Documentation

- [ ] Comprehensive JSDoc comments are present
- [ ] Function documentation exists in `docs/functions/<category>/<function-name>.md`
- [ ] Category README.md is updated (if function is new or behavior changed)
- [ ] Examples in JSDoc are runnable and accurate
- [ ] All parameters and return values are documented

### Testing

- [ ] Test coverage includes happy path tests
- [ ] Test coverage includes edge cases
- [ ] Test coverage includes invalid input tests
- [ ] Test coverage includes type variation tests (Date and number)
- [ ] Test coverage includes options variations (if applicable)
- [ ] All tests pass
- [ ] Coverage meets minimum targets (100% for new code)

### Code Quality

- [ ] ESLint passes with no errors
- [ ] ESLint passes with no warnings (or warnings are justified)
- [ ] TypeScript compilation succeeds (via build)
- [ ] Code follows project style guide
- [ ] Documentation linting passes

---

## Automated Checks

### Linting

**Check code quality**:

```bash
pnpm lint
```

**Check documentation**:

```bash
pnpm lint:docs
```

**Common ESLint Rules**:
- No unused variables
- Consistent formatting (handled by Prettier)
- No any types without justification
- Prefer const over let
- No console.log statements

---

### Testing

Run the complete test suite:

```bash
pnpm test
```

**Run specific test file**:

```bash
pnpm test <function-name>
```

**Test Requirements**:
- All tests must pass
- Test coverage should be comprehensive
- Include happy path, edge cases, and invalid inputs

---

### Build Verification

Ensure the build succeeds (also verifies TypeScript compilation):

```bash
pnpm build
```

**Verify**:
- No build errors
- No TypeScript errors
- Output files are generated in `dist/`
- TypeScript declarations (.d.ts) are generated
- Bundle size is reasonable

---

## Regression Testing

### After Modifying Existing Functions

When modifying an existing function, ensure:

1. **All existing tests still pass**
   ```bash
   pnpm test
   ```

2. **Documentation reflects changes**
   - Update function documentation
   - Update category README if behavior changed
   - Update JSDoc comments

3. **Breaking changes are identified**
   - Review function signature changes
   - Review return value changes
   - Review error handling changes
   - Update CHANGELOG.md if breaking

---

### Cross-Function Impact

Check if changes affect related functions:

```bash
# Run all tests to catch cross-function issues
pnpm test

# Search for usages in test files
grep -r "functionName" tests/
```

---

## CI/CD Pipeline Checks

The following checks run automatically on pull requests:

### 1. Linting
- ESLint must pass with no errors
- Prettier formatting must be consistent

### 2. Type Checking
- TypeScript compilation must succeed
- No type errors allowed

### 3. Testing
- All tests must pass
- Coverage must meet thresholds
- No failing or skipped tests

### 4. Build
- Build must succeed
- No warnings during build

### 5. Documentation
- Documentation files must exist for new functions
- Markdown files must be valid
- Links must not be broken

---

## Manual Verification

### Code Review Checklist

When reviewing code (or self-reviewing):

#### Correctness
- [ ] Logic is correct and handles all cases
- [ ] Edge cases are properly handled
- [ ] Timezone handling is appropriate
- [ ] Date arithmetic is correct (month boundaries, leap years)

#### Performance
- [ ] No unnecessary Date object creation
- [ ] Fast paths exist for common cases
- [ ] No redundant computations

#### Maintainability
- [ ] Code is readable and well-organized
- [ ] Variable names are descriptive
- [ ] Complex logic has explanatory comments
- [ ] No code duplication

#### API Design
- [ ] Function signature is intuitive
- [ ] Parameters are in logical order
- [ ] Options are extensible
- [ ] Naming is consistent with library conventions

---

## Common Issues and Fixes

### Issue: Tests failing

**Check**:
```bash
pnpm test
```

**Fix**:
- Review test failure messages
- Fix implementation to match expected behavior
- Update tests if requirements have changed
- Ensure all edge cases are covered

---

### Issue: ESLint errors

**Check**:
```bash
pnpm lint
```

**Fix**:
```bash
pnpm lint:fix
```

For errors that can't be auto-fixed:
- Review the ESLint error message
- Fix manually according to the rule
- Add ESLint disable comment ONLY if absolutely necessary with justification

---

### Issue: Build failures

**Check**:
```bash
pnpm build
```

**Fix**:
- Review build error messages (including TypeScript errors)
- Add explicit type annotations if needed
- Fix type mismatches
- Check for import/export issues
- Verify all dependencies are installed
- Check for circular dependencies
- Use proper type guards
- Avoid `any` types

---

## Quality Metrics

Track these metrics over time:

### Test Coverage
- Target: Comprehensive coverage for all new code
- Ensure all code paths are tested (happy path, edge cases, error conditions)
- Use TDD approach to drive implementation

### Code Complexity
- Cyclomatic complexity: Max 10 per function
- File length: Max 300 lines
- Function length: Max 50 lines

### Build Size
- Monitor bundle size impact of new functions
- Ensure tree-shaking works correctly
- Check for unintended dependency increases

---

## Checklist for New Functions (Summary)

Quick reference checklist for new functions:

**Design**:
- [ ] `Date | number` parameters
- [ ] `options?: OptionsType` pattern
- [ ] Correct naming (is/get/add prefix)
- [ ] Graceful error handling

**Implementation**:
- [ ] `src/<function-name>/index.ts`
- [ ] Input validation
- [ ] Performance optimized
- [ ] JSDoc comments

**Documentation**:
- [ ] `docs/functions/<category>/<function-name>.md`
- [ ] Category README updated
- [ ] Examples are runnable

**Testing**:
- [ ] Happy path tests
- [ ] Edge case tests
- [ ] Invalid input tests
- [ ] 100% coverage

**Quality**:
- [ ] ESLint passes
- [ ] TypeScript compiles
- [ ] All tests pass
- [ ] Build succeeds

---

## See Also

- [Function Design Guidelines](./function-design.md) - Guidelines for designing functions
- [Function Implementation Guidelines](./function-implementation.md) - Guidelines for implementing functions
- [Function Testing Guidelines](./function-testing.md) - Guidelines for testing functions
- [Function Documentation Guidelines](./documentation-function.md) - Guidelines for documenting functions
