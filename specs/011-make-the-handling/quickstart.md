# Quickstart: clamp Function Validation Refactoring

## Overview
This quickstart validates the refactored `clamp` function that now validates arguments BEFORE converting them, consistent with the `addDays` pattern.

## Prerequisites
- Node.js 18+
- Project dependencies installed (`npm install`)

## Quick Validation Steps

### Step 1: Run Contract Tests
```bash
# Run the validation order contract tests
npm test specs/011-make-the-handling/contracts/validation-order.test.ts
```

**Expected Result**: All tests pass (after implementation)
- ✅ Invalid Date rejected before conversion
- ✅ NaN rejected before conversion
- ✅ Infinity/-Infinity rejected before conversion
- ✅ Valid arguments converted correctly
- ✅ Mixed invalid arguments fail fast

### Step 2: Run Existing clamp Tests
```bash
# Run the existing test suite to ensure no regressions
npm test tests/clamp.test.ts
```

**Expected Result**: All existing tests pass (behavior unchanged)
- ✅ Returns same date when within range
- ✅ Returns min when date < min
- ✅ Returns max when date > max
- ✅ Works with timestamps
- ✅ Works with Date objects
- ✅ Handles invalid inputs correctly

### Step 3: Run Full Test Suite
```bash
# Ensure no regressions across the entire library
npm test
```

**Expected Result**: All 75+ test files pass

### Step 4: Verify Code Quality
```bash
# Run linter to ensure code style compliance
npm run lint

# Build the project to ensure no TypeScript errors
npm run build
```

**Expected Result**: No linting errors, successful build

## Manual Verification

### Test Case 1: Invalid Date Handling
```typescript
import { clamp } from './src/clamp';

const invalidDate = new Date('invalid');
const validMin = new Date(2024, 5, 10);
const validMax = new Date(2024, 5, 20);

const result = clamp(invalidDate, validMin, validMax);

console.log(isNaN(result.getTime())); // Should print: true
```

### Test Case 2: Valid Timestamp Handling
```typescript
import { clamp } from './src/clamp';

const timestamp = Date.now();
const minTimestamp = timestamp - 1000;
const maxTimestamp = timestamp + 1000;

const result = clamp(timestamp, minTimestamp, maxTimestamp);

console.log(result.getTime() === timestamp); // Should print: true
```

### Test Case 3: NaN/Infinity Handling
```typescript
import { clamp } from './src/clamp';

const nanResult = clamp(NaN, 0, 1000);
const infResult = clamp(Infinity, 0, 1000);

console.log(isNaN(nanResult.getTime())); // Should print: true
console.log(isNaN(infResult.getTime())); // Should print: true
```

## Code Inspection

### Verify Validation Order
Open `src/clamp/index.ts` and confirm:

1. **Lines 48-51**: Validation block (BEFORE conversion)
```typescript
// Validate arguments before conversion (consistent with addDays pattern)
if (!isValidDateOrNumber(date) || !isValidDateOrNumber(minDate) || !isValidDateOrNumber(maxDate)) {
  return new Date(NaN);
}
```

2. **Lines 52-55**: Conversion block (AFTER validation)
```typescript
// Convert inputs to Date objects after validation
const dateObj = typeof date === "number" ? new Date(date) : date;
const minDateObj = typeof minDate === "number" ? new Date(minDate) : minDate;
const maxDateObj = typeof maxDate === "number" ? new Date(maxDate) : maxDate;
```

### Compare with addDays Pattern
Open `src/addDays/index.ts` for reference:
```typescript
// addDays: Validate FIRST
if (!isValidDateOrNumber(date) || !isValidNumber(amount))
  return new Date(NaN);

// Convert AFTER validation
const dt = new Date(date);
```

**Verification**: clamp now follows the same pattern ✅

## Success Criteria Checklist

- [ ] Contract tests pass
- [ ] Existing clamp tests pass
- [ ] Full test suite passes
- [ ] No linting errors
- [ ] Build succeeds
- [ ] Validation happens before conversion (code inspection)
- [ ] Uses `isValidDateOrNumber()` from `_lib/validators`
- [ ] Early return on invalid input (no conversion)
- [ ] Consistent with addDays pattern

## Troubleshooting

### Contract Tests Fail
**Issue**: Validation order contract tests are failing
**Solution**: Ensure validation block comes BEFORE conversion block in `src/clamp/index.ts`

### Existing Tests Fail
**Issue**: Regression in existing clamp behavior
**Solution**: The refactoring should not change external behavior. Review the implementation to ensure:
- Same inputs produce same outputs
- Invalid inputs still return Invalid Date
- Valid inputs still produce correct clamp results

### Linting Errors
**Issue**: ESLint reports style violations
**Solution**:
```bash
# Auto-fix most issues
npm run lint -- --fix

# Common issues:
# - Use double quotes for strings
# - Remove unused imports
```

### Build Errors
**Issue**: TypeScript compilation fails
**Solution**:
```bash
# Check TypeScript errors
npx tsc --noEmit

# Common issues:
# - Type mismatches
# - Missing imports from _lib/validators
```

## Performance Validation

### No Performance Regression
The refactoring reorders operations but doesn't add new ones:

**Before**: Convert (3 ops) → Validate (3 checks) = 6 operations
**After**: Validate (3 checks) → Convert (3 ops) = 6 operations

**Impact**: Same complexity (O(1)), potentially faster for invalid inputs (early return)

### Benchmark (Optional)
```bash
# Run performance benchmarks if available
npm test tests/format.bench.ts -- --run
```

## Next Steps

After successful validation:

1. **Commit Changes**:
```bash
git add src/clamp/index.ts specs/011-make-the-handling/
npm run lint && npm run build && npm test
git commit -m "refactor(clamp): validate arguments before conversion

- Align with addDays validation pattern
- Use isValidDateOrNumber() on original arguments
- Validate before convert for consistency

Fixes inconsistent validation order in clamp function.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

2. **Update Documentation** (if needed):
   - README.md already documents clamp behavior
   - No public API changes, so likely no updates needed

3. **Create Pull Request** (if applicable):
```bash
git push -u origin 011-make-the-handling
gh pr create --title "Refactor clamp validation order for consistency" \
  --body "See specs/011-make-the-handling/ for full details"
```

## Support

For issues or questions:
- Review the feature specification: `specs/011-make-the-handling/spec.md`
- Check the implementation plan: `specs/011-make-the-handling/plan.md`
- Review research findings: `specs/011-make-the-handling/research.md`
- Examine data model: `specs/011-make-the-handling/data-model.md`
- Check contract definition: `specs/011-make-the-handling/contracts/validation-order.contract.md`
