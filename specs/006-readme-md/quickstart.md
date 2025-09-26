# Quickstart: Validating README.md Updates

## Setup
```bash
# Ensure you're on the feature branch
git checkout 006-readme-md

# Install dependencies
npm install
```

## Validation Steps

### 1. Verify New Functions are Documented

Check that all new functions are present in README.md:
```bash
# Check for new function documentation
grep -E "### (compare|now|setTime|getTime|setMilliseconds|isBetween|constants)" README.md

# Expected: Each function should have its own section or be clearly documented
```

### 2. Test Example Code

Extract and test the new function examples:
```typescript
// Test compare function example
import { compare } from 'chronia';

const date1 = new Date(2024, 0, 15);
const date2 = new Date(2024, 0, 20);
const date3 = new Date(2024, 0, 10);

const dates = [date2, date1, date3];
dates.sort(compare);
console.log(dates); // Should be in chronological order

// Test now function example
import { now } from 'chronia';

const currentTime = now();
console.log(currentTime instanceof Date); // Should be true
console.log(currentTime.getTime() > 0); // Should be true

// Test setTime/getTime example
import { setTime, getTime } from 'chronia';

const date = new Date(2024, 0, 15);
const timestamp = getTime(date);
const newDate = setTime(new Date(), timestamp);
console.log(newDate.getTime() === timestamp); // Should be true

// Test isBetween example
import { isBetween } from 'chronia';

const testDate = new Date(2024, 0, 15);
const start = new Date(2024, 0, 10);
const end = new Date(2024, 0, 20);
console.log(isBetween(testDate, start, end)); // Should be true

// Test constants example
import { MIN_DATE, MAX_DATE } from 'chronia';

console.log(MIN_DATE instanceof Date); // Should be true
console.log(MAX_DATE instanceof Date); // Should be true
console.log(MIN_DATE < MAX_DATE); // Should be true
```

### 3. Verify Import Statements

Ensure all import examples are accurate:
```bash
# Extract all import statements from README
grep "import.*from 'chronia'" README.md

# Each import should only reference actual exports
```

### 4. Check Bundle Size Update

Verify bundle size information is current:
```bash
# Check actual bundle size
ls -lh dist/*.js dist/*.cjs

# Compare with README claims
grep -A 2 "Bundle Size" README.md

# Sizes should match (approximately 21KB)
```

### 5. Validate Section Structure

Ensure proper organization:
```bash
# Check for required sections
grep "^##" README.md | grep -E "(Quick Start|Core Functions|Date Comparison|Constants|Bundle Size)"

# Each should be present
```

### 6. Test TypeScript Examples

Create a test file with TypeScript examples:
```typescript
// test-readme-examples.ts
import {
  compare, now, setTime, getTime, setMilliseconds,
  isBetween, MIN_DATE, MAX_DATE, format, addDays
} from 'chronia';

// Test all examples compile without errors
const date: Date = now();
const timestamp: number = getTime(date);
const comparison: number = compare(date, timestamp);
const between: boolean = isBetween(date, MIN_DATE, MAX_DATE);

// Verify types are correctly documented
type ValidateTypes = {
  compare: (a: Date | number, b: Date | number, order?: 'ASC' | 'DESC') => number;
  now: () => Date;
  setTime: (date: Date | number, timestamp: number) => Date;
  getTime: (date: Date | number) => number;
};
```

Compile and verify:
```bash
npx tsc test-readme-examples.ts --noEmit
```

### 7. Cross-Reference with API Docs

Ensure consistency with generated documentation:
```bash
# Generate fresh API docs
npx typedoc

# Open docs/index.html and verify:
# - All new functions are present
# - Signatures match README
# - Examples are consistent
```

### 8. Final Validation

Run the contract tests:
```bash
# Run documentation validation tests
npm test -- specs/006-readme-md/contracts/documentation-validation.ts
```

## Success Criteria

✅ All 7 new functions are documented
✅ All code examples execute without errors
✅ Import statements are accurate
✅ Bundle size is updated (21KB)
✅ Section structure is logical
✅ TypeScript examples compile
✅ Consistency with API documentation
✅ Contract tests pass

## Troubleshooting

If validation fails:
1. Check for typos in function names
2. Verify import paths are correct
3. Ensure examples use current API
4. Update bundle size metrics
5. Run prettier for consistent formatting

## Completion

Once all validations pass:
1. Stage changes: `git add README.md`
2. Commit: `git commit -m "docs: update README.md with new functions and current metrics"`
3. Push: `git push origin 006-readme-md`
4. Create PR for review