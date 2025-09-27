# Quickstart: Moving Validators Test Code

**Feature**: 008-moving-validators-s | **Date**: 2025-09-27

## Overview

This quickstart guide validates the successful move of validator test files from the source directory to the standard tests directory structure. The goal is to reorganize `src/_lib/validators.test.ts` to `tests/_lib/validators.test.ts` while maintaining all test functionality.

## Prerequisites

- Node.js 18+ installed
- Chronia library source code
- Vitest testing framework

## Validation Steps

### Step 1: Verify Current State
```bash
# Navigate to project directory
cd /path/to/chronia

# Verify current test file exists in source directory
ls -la src/_lib/validators.test.ts

# Run existing tests to establish baseline
npm test src/_lib/validators.test.ts
```

**Expected Result**:
- Test file exists in `src/_lib/` directory
- All validator tests pass (48 test cases)

### Step 2: Run Contract Tests (Pre-Implementation)
```bash
# Run the new contract tests - these should FAIL initially
npm test -- specs/008-moving-validators-s/contracts/
```

**Expected Result**:
- ❌ File move validation test should FAIL (file still in source location)
- ❌ Test functionality preservation test should FAIL (import paths not updated)

### Step 3: Execute the File Move
```bash
# Create target directory if it doesn't exist
mkdir -p tests/_lib

# Move the test file (this is the implementation step)
mv src/_lib/validators.test.ts tests/_lib/validators.test.ts

# Update import path in the moved file
sed -i 's|from "./validators"|from "../../src/_lib/validators"|g' tests/_lib/validators.test.ts
```

### Step 4: Verify Implementation
```bash
# Verify file has been moved
ls -la tests/_lib/validators.test.ts
ls -la src/_lib/validators.test.ts  # Should not exist

# Run moved tests to ensure they work
npm test tests/_lib/validators.test.ts

# Run contract tests to ensure they now pass
npm test -- specs/008-moving-validators-s/contracts/
```

**Expected Result**:
- ✅ File exists in new location (`tests/_lib/validators.test.ts`)
- ✅ File no longer exists in old location (`src/_lib/validators.test.ts`)
- ✅ All validator tests continue to pass
- ✅ Contract tests now pass

### Step 5: Full Integration Testing
```bash
# Run full test suite to ensure no regressions
npm test

# Verify test discovery and coverage
npm test -- --coverage
```

**Expected Result**:
- ✅ All tests pass
- ✅ Test coverage includes validator tests
- ✅ No regressions in other tests

### Step 6: Final Validation
```bash
# Verify directory structure follows pattern
ls -la tests/_lib/

# Check import path in moved file
head -5 tests/_lib/validators.test.ts
```

**Expected Result**:
- ✅ Test file in correct location
- ✅ Import path updated to `from "../../src/_lib/validators"`
- ✅ File follows naming convention

## Verification Checklist

### File System Validation
- [ ] Source test file removed from `src/_lib/validators.test.ts`
- [ ] Target test file exists at `tests/_lib/validators.test.ts`
- [ ] Target directory follows established pattern
- [ ] File permissions allow execution

### Content Validation
- [ ] Import statement updated to `from "../../src/_lib/validators"`
- [ ] All test content preserved (281 lines approximately)
- [ ] No changes to test logic or assertions
- [ ] File encoding and format preserved

### Functional Validation
- [ ] All 48 validator test cases continue to pass
- [ ] Test runner automatically discovers moved tests
- [ ] Import resolution works correctly
- [ ] No errors in test execution

### Integration Validation
- [ ] Full test suite passes without regressions
- [ ] Test coverage metrics maintained
- [ ] Contract tests pass after implementation
- [ ] Build process unaffected

## Success Criteria

The file move is successful when:

1. **File Location**: Test file moved from `src/_lib/` to `tests/_lib/`
2. **Import Resolution**: Updated import path resolves correctly
3. **Test Functionality**: All 48 test cases continue to pass
4. **Integration**: No impact on other tests or build processes
5. **Pattern Compliance**: Follows established test directory structure

## Rollback Plan

If issues are discovered:

1. **Move file back to original location**:
   ```bash
   mv tests/_lib/validators.test.ts src/_lib/validators.test.ts
   ```

2. **Restore original import path**:
   ```bash
   sed -i 's|from "../../src/_lib/validators"|from "./validators"|g' src/_lib/validators.test.ts
   ```

3. **Verify rollback success**:
   ```bash
   npm test src/_lib/validators.test.ts
   ```

## Next Steps

After successful validation:

1. Update any documentation that references test file locations
2. Consider applying similar organization to other misplaced test files
3. Update development guidelines to prevent future test file misplacement
4. Document the improved test structure in project documentation

## Common Issues and Solutions

### Import Resolution Errors
- **Issue**: Module not found errors
- **Solution**: Verify relative path calculation (`../../src/_lib/validators`)

### Test Discovery Issues
- **Issue**: Tests not found by runner
- **Solution**: Ensure file in `tests/` directory with `.test.ts` extension

### Permission Issues
- **Issue**: Cannot read/write files
- **Solution**: Check file permissions and directory access rights