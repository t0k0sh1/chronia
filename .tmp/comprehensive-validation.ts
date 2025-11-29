// Comprehensive Validation Report
import { format as chroniaFormat } from '../dist/index.js';
import { format as dateFnsFormat } from 'date-fns';

console.log('=== COMPREHENSIVE PBT VALIDATION REPORT ===\n');
console.log('Testing ALL remaining incompatibilities with date-fns\n');

type Issue = {
  id: number;
  category: string;
  severity: 'Critical' | 'Major' | 'Minor';
  description: string;
  pattern: string;
  date: string;
  expected: string;
  actual: string;
  rootCause: string;
};

const issues: Issue[] = [];
let issueId = 1;

function addIssue(
  category: string,
  severity: 'Critical' | 'Major' | 'Minor',
  description: string,
  pattern: string,
  date: Date,
  expected: string,
  actual: string,
  rootCause: string
): void {
  issues.push({
    id: issueId++,
    category,
    severity,
    description,
    pattern,
    date: isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString(),
    expected,
    actual,
    rootCause,
  });
}

// ============================================================================
// ISSUE 1: Day Period Abbreviation Case (aaa token)
// ============================================================================
console.log('## Testing Day Period Abbreviation (aaa token)\n');
{
  const date = new Date('1970-01-01T00:00:00.000Z');
  const pattern = 'h:mm aaa';

  const expected = dateFnsFormat(date, pattern);
  const actual = chroniaFormat(date, pattern);

  console.log(`Pattern: "${pattern}"`);
  console.log(`Date: ${date.toISOString()}`);
  console.log(`Expected (date-fns): "${expected}"`);
  console.log(`Actual (Chronia): "${actual}"`);

  if (expected !== actual) {
    addIssue(
      'Day Period',
      'Major',
      'Day period abbreviation (aaa) uses wrong case',
      pattern,
      date,
      expected,
      actual,
      'src/i18n/en-US/index.ts defines dayPeriod.abbr as ["AM", "PM"] but should be ["am", "pm"] per date-fns v4'
    );
    console.log('❌ MISMATCH\n');
  } else {
    console.log('✅ PASS\n');
  }
}

// ============================================================================
// ISSUE 2: Invalid Date Handling
// ============================================================================
console.log('## Testing Invalid Date Handling\n');
{
  const invalidDate = new Date(NaN);
  const patterns = ['yyyy-MM-dd', 'MMMMM', 'EEEE', 'GGGG', 'aaaaa', 'aaaa'];

  patterns.forEach(pattern => {
    let dateFnsResult: string;
    let dateFnsThrew = false;

    try {
      dateFnsResult = dateFnsFormat(invalidDate, pattern);
    } catch (error) {
      dateFnsThrew = true;
      dateFnsResult = `[THROWS: ${error instanceof Error ? error.message : String(error)}]`;
    }

    let chroniaResult: string;
    let chroniaThrew = false;

    try {
      chroniaResult = chroniaFormat(invalidDate, pattern);
    } catch (error) {
      chroniaThrew = true;
      chroniaResult = `[THROWS: ${error instanceof Error ? error.message : String(error)}]`;
    }

    console.log(`Pattern: "${pattern}"`);
    console.log(`date-fns: ${dateFnsResult}`);
    console.log(`Chronia: ${chroniaResult}`);

    if (dateFnsThrew !== chroniaThrew || (!dateFnsThrew && dateFnsResult !== chroniaResult)) {
      addIssue(
        'Invalid Date',
        'Critical',
        'Invalid Date handling differs from date-fns',
        pattern,
        invalidDate,
        dateFnsResult,
        chroniaResult,
        'date-fns throws RangeError("Invalid time value") but Chronia returns "Invalid Date" string'
      );
      console.log('❌ MISMATCH\n');
    } else {
      console.log('✅ PASS\n');
    }
  });
}

// ============================================================================
// ISSUE 3: Escaped Quotes (double quote handling)
// ============================================================================
console.log('## Testing Escaped Quotes\n');
{
  const date = new Date('1970-01-01T00:00:00.000Z');
  const patterns = [
    "'It''s' yyyy",
    "'Today''s date:' MMMM dd, yyyy",
    "'''quoted''' yyyy",
    "''''",
  ];

  patterns.forEach(pattern => {
    let dateFnsResult: string;
    try {
      dateFnsResult = dateFnsFormat(date, pattern);
    } catch (error) {
      dateFnsResult = `[ERROR: ${error instanceof Error ? error.message : String(error)}]`;
    }

    let chroniaResult: string;
    try {
      chroniaResult = chroniaFormat(date, pattern);
    } catch (error) {
      chroniaResult = `[ERROR: ${error instanceof Error ? error.message : String(error)}]`;
    }

    console.log(`Pattern: "${pattern}"`);
    console.log(`Expected (date-fns): "${dateFnsResult}"`);
    console.log(`Actual (Chronia): "${chroniaResult}"`);

    if (dateFnsResult !== chroniaResult) {
      addIssue(
        'Escaped Quotes',
        'Major',
        'Double quote escaping differs from date-fns',
        pattern,
        date,
        dateFnsResult,
        chroniaResult,
        "Double quotes ('') should produce a single quote (') in output"
      );
      console.log('❌ MISMATCH\n');
    } else {
      console.log('✅ PASS\n');
    }
  });
}

// ============================================================================
// ISSUE 4: Extreme Dates (very old/far future dates)
// ============================================================================
console.log('## Testing Extreme Dates\n');
{
  const extremeDates = [
    new Date('-271821-04-20T00:00:00.000Z'), // Min safe date
    new Date('+275760-09-13T00:00:00.000Z'), // Max safe date
  ];

  extremeDates.forEach(date => {
    const pattern = 'yyyy-MM-dd HH:mm';

    let dateFnsResult: string;
    try {
      dateFnsResult = dateFnsFormat(date, pattern);
    } catch (error) {
      dateFnsResult = `[ERROR: ${error instanceof Error ? error.message : String(error)}]`;
    }

    let chroniaResult: string;
    try {
      chroniaResult = chroniaFormat(date, pattern);
    } catch (error) {
      chroniaResult = `[ERROR: ${error instanceof Error ? error.message : String(error)}]`;
    }

    console.log(`Date: ${date.toISOString()}`);
    console.log(`Pattern: "${pattern}"`);
    console.log(`Expected (date-fns): "${dateFnsResult}"`);
    console.log(`Actual (Chronia): "${chroniaResult}"`);

    if (dateFnsResult !== chroniaResult) {
      addIssue(
        'Extreme Dates',
        'Minor',
        'Extreme date handling differs from date-fns',
        pattern,
        date,
        dateFnsResult,
        chroniaResult,
        'Date outside safe range may throw error in date-fns but not in Chronia'
      );
      console.log('❌ MISMATCH\n');
    } else {
      console.log('✅ PASS\n');
    }
  });
}

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('SUMMARY REPORT');
console.log('='.repeat(80) + '\n');

console.log(`Total Issues Found: ${issues.length}\n`);

// Group by category
const byCategory = issues.reduce((acc, issue) => {
  acc[issue.category] = (acc[issue.category] || []).concat(issue);
  return acc;
}, {} as Record<string, Issue[]>);

console.log('Issues by Category:');
Object.entries(byCategory).forEach(([category, categoryIssues]) => {
  console.log(`  ${category}: ${categoryIssues.length}`);
});

console.log('\n' + '-'.repeat(80) + '\n');

// Group by severity
const bySeverity = issues.reduce((acc, issue) => {
  acc[issue.severity] = (acc[issue.severity] || []).concat(issue);
  return acc;
}, {} as Record<string, Issue[]>);

console.log('Issues by Severity:');
Object.entries(bySeverity).forEach(([severity, severityIssues]) => {
  console.log(`  ${severity}: ${severityIssues.length}`);
});

console.log('\n' + '-'.repeat(80) + '\n');

// Detailed Issue List
console.log('DETAILED ISSUE LIST:\n');
issues.forEach(issue => {
  console.log(`[${issue.id}] ${issue.severity.toUpperCase()}: ${issue.description}`);
  console.log(`    Category: ${issue.category}`);
  console.log(`    Pattern: "${issue.pattern}"`);
  console.log(`    Date: ${issue.date}`);
  console.log(`    Expected: "${issue.expected}"`);
  console.log(`    Actual: "${issue.actual}"`);
  console.log(`    Root Cause: ${issue.rootCause}`);
  console.log();
});

console.log('='.repeat(80));
console.log('END OF REPORT');
console.log('='.repeat(80));
