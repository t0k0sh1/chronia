# Research: Moving Validators Test Code

**Feature**: 008-moving-validators-s | **Date**: 2025-09-27

## Current State Analysis

### Existing Test File Location
**Path**: `src/_lib/validators.test.ts`
**Size**: 281 lines
**Import Pattern**: `import { isValidDate, isValidNumber, isValidDateOrNumber } from "./validators";`

### Current File Structure
```
src/
├── _lib/
│   ├── validators.ts          # Source file
│   └── validators.test.ts     # Test file (to be moved)
└── other functions...

tests/
├── _lib/
│   ├── formatters/           # Existing test subdirectory
│   ├── parsers/              # Existing test subdirectory
│   └── truncateToUnit.test.ts # Example of _lib test file
└── other test files...
```

### Test File Content Analysis
- **Test Framework**: Vitest with describe/it structure
- **Test Coverage**: Comprehensive coverage of all three validator functions:
  - `isValidDate`: Tests for valid/invalid Date instances
  - `isValidNumber`: Tests for finite/infinite number validation
  - `isValidDateOrNumber`: Tests for combined validation logic
- **Test Cases**: 48 total test cases covering edge cases and boundary conditions
- **Dependencies**: Standard Vitest imports (`describe`, `it`, `expect`)

## Target Structure Analysis

### Established Pattern in tests/_lib/
**Decision**: Follow existing pattern where `tests/_lib/` mirrors `src/_lib/` structure
**Rationale**:
- Other `_lib` test files already exist in `tests/_lib/` (e.g., `truncateToUnit.test.ts`)
- Maintains consistency with existing test organization
- Follows the standard pattern established in the codebase

**Target Path**: `tests/_lib/validators.test.ts`

### Import Path Requirements
**Current Import**: `from "./validators"` (relative to same directory)
**Required Import**: `from "../../src/_lib/validators"` (relative from tests to src)

**Rationale**: The moved test file will need to reference the source file two directories up

## Migration Strategy

### Approach Selection
**Decision**: Simple file move with import path update
**Rationale**:
- Test logic requires no changes (all assertions remain identical)
- Only the import path needs modification
- Maintains all existing test functionality
- Zero risk to test coverage or quality

**Alternatives Considered**:
1. **Copy and delete**: More steps, higher risk of errors
   - **Rejected**: Unnecessary complexity for simple reorganization
2. **Create new file with copy/paste**: Manual content transfer
   - **Rejected**: Risk of missing content or introducing errors

### Import Path Strategy
**Decision**: Update single import statement to relative path
**Rationale**:
- Only one import statement needs modification
- Clear, straightforward relative path resolution
- Follows TypeScript/Node.js module resolution standards

### Validation Strategy
**Decision**: Run test suite before and after move to verify functionality
**Rationale**:
- Ensures no tests are broken during the move
- Confirms test runner correctly discovers the moved file
- Validates that all 48 test cases continue to pass

## Risk Assessment

### Low Risk Factors
- ✅ Simple file move operation
- ✅ Well-established target directory structure
- ✅ Single import statement to update
- ✅ No changes required to test logic
- ✅ Existing precedent with other `_lib` test files

### Mitigation Strategies
- ✅ Run full test suite before move to establish baseline
- ✅ Verify file move completed successfully
- ✅ Run test suite after move to confirm functionality
- ✅ Check test coverage metrics remain unchanged

## Dependencies and Prerequisites

### Test Runner Configuration
**Analysis**: Vitest automatically discovers test files in the `tests/` directory
**Impact**: No configuration changes required

### Build System Impact
**Analysis**: No build configuration references the specific test file location
**Impact**: No build system changes required

### CI/CD Impact
**Analysis**: Test running commands use pattern matching (`npm test`)
**Impact**: No CI/CD configuration changes required

## Technical Decisions

### Directory Structure
**Decision**: Use `tests/_lib/validators.test.ts`
**Rationale**: Matches existing pattern for other `_lib` test files

### File Naming
**Decision**: Keep existing filename `validators.test.ts`
**Rationale**: Follows established naming convention in tests directory

### Import Updates
**Decision**: Single import statement update to `"../../src/_lib/validators"`
**Rationale**: Correct relative path from new location to source file

## Next Steps for Phase 1

1. **Data Model**: Define entities involved in the file move operation
2. **Contracts**: Create validation tests to ensure move completed correctly
3. **Quickstart**: Document step-by-step validation process
4. **Agent Update**: Update CLAUDE.md if needed (already contains test organization guidelines)