// Detailed PBT Validation Script
// This script tests each failing case individually to identify specific incompatibilities

import { format } from '../src/index.js';
import { format as dateFnsFormat } from 'date-fns';
import { enUS, ja } from 'date-fns/locale';

console.log('=== PBT VALIDATION REPORT ===\n');

const issues: Array<{
  category: string;
  test: string;
  date: Date;
  pattern: string;
  expected: string;
  actual: string;
  error?: string;
}> = [];

function testCase(
  category: string,
  test: string,
  date: Date,
  pattern: string,
  locale?: 'en-US' | 'ja'
): void {
  try {
    const dateFnsLocale = locale === 'ja' ? ja : enUS;
    const expected = dateFnsFormat(date, pattern, { locale: dateFnsLocale });
    const actual = format(date, pattern, locale ? { locale } : undefined);

    if (expected !== actual) {
      issues.push({ category, test, date, pattern, expected, actual });
      console.log(`❌ FAIL: ${test}`);
      console.log(`   Date: ${isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString()}`);
      console.log(`   Pattern: "${pattern}"`);
      console.log(`   Expected (date-fns): "${expected}"`);
      console.log(`   Actual (Chronia): "${actual}"`);
      console.log();
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    issues.push({ category, test, date, pattern, expected: 'N/A', actual: 'N/A', error: errorMsg });
    console.log(`❌ ERROR: ${test}`);
    console.log(`   Date: ${isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString()}`);
    console.log(`   Pattern: "${pattern}"`);
    console.log(`   Error: ${errorMsg}`);
    console.log();
  }
}

// Category 1: Protected Tokens (D, DD, DDD)
console.log('## Category 1: Protected Tokens\n');
const testDate = new Date('1970-01-01T00:00:00.000Z');

// Note: date-fns throws errors for these tokens, but we need to handle them gracefully
console.log('⚠️  SKIPPED: date-fns throws errors for D/DD/DDD tokens');
console.log('   These are protected tokens in date-fns v2+');
console.log('   Decision needed: Should Chronia throw errors or provide backward compatibility?\n');

// Category 2: Invalid Date Handling
console.log('## Category 2: Invalid Date Handling\n');
const invalidDate = new Date(NaN);

try {
  const dfnsResult = dateFnsFormat(invalidDate, 'yyyy-MM-dd');
  console.log(`date-fns result: "${dfnsResult}"`);
} catch (error) {
  console.log('date-fns throws error for Invalid Date');
}

try {
  const chroniaResult = format(invalidDate, 'yyyy-MM-dd');
  console.log(`Chronia result: "${chroniaResult}"`);
} catch (error) {
  console.log('Chronia throws error for Invalid Date');
}
console.log();

testCase('Invalid Date', 'MMMMM (narrow month)', invalidDate, 'MMMMM', 'en-US');
testCase('Invalid Date', 'EEEE (wide weekday)', invalidDate, 'EEEE', 'en-US');
testCase('Invalid Date', 'GGGG (wide era)', invalidDate, 'GGGG', 'en-US');
testCase('Invalid Date', 'aaaaa (narrow day period)', invalidDate, 'aaaaa', 'en-US');
testCase('Invalid Date', 'aaaa (wide day period)', invalidDate, 'aaaa', 'en-US');

// Category 3: Day Period Abbreviation (aaa)
console.log('## Category 3: Day Period Abbreviation\n');
testCase('Day Period', 'aaa (abbreviated)', new Date('1970-01-01T00:00:00.000Z'), 'h:mm aaa', 'en-US');
testCase('Day Period', 'aaa (abbreviated)', new Date('1970-01-01T12:00:00.000Z'), 'h:mm aaa', 'en-US');

// Category 4: Extreme Dates
console.log('## Category 4: Extreme Dates\n');
const extremeDate1 = new Date('-271821-04-20T14:41:00.999Z');
testCase('Extreme Date', 'Very old BC date', extremeDate1, 'yyyy-MM-dd HH:mm', 'en-US');

const extremeDate2 = new Date('+275760-09-12T15:00:00.000Z');
testCase('Extreme Date', 'Very far future date', extremeDate2, 'yyyy-MM-dd HH:mm', 'en-US');

// Category 5: Escaped Quotes
console.log('## Category 5: Escaped Quotes\n');
testCase('Escaped Quotes', "Pattern with 'quoted' text", testDate, "yyyy 'year'", 'en-US');
testCase('Escaped Quotes', "Pattern with ''escaped'' quotes", testDate, "yyyy ''year''", 'en-US');

// Summary
console.log('\n=== SUMMARY ===\n');
console.log(`Total issues found: ${issues.length}`);

const byCategory = issues.reduce((acc, issue) => {
  acc[issue.category] = (acc[issue.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\nIssues by Category:');
Object.entries(byCategory).forEach(([category, count]) => {
  console.log(`  ${category}: ${count}`);
});

console.log('\n=== END OF REPORT ===');
