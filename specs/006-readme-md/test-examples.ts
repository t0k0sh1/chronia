/**
 * Test file for validating README.md code examples
 * This file will be used to ensure all examples compile and run correctly
 */

import {
  // Existing functions from README
  format, parse, addDays, isAfter, min, max, clamp,
  isBefore, isEqual, isAfterOrEqual, isBeforeOrEqual,
  getYear, getMonth, getDay, getHours, getMinutes, getSeconds, getMilliseconds,
  isValid, diffDays, startOfDay,
  // New functions to be added
  compare, now, setTime, getTime, setMilliseconds, isBetween,
  MIN_DATE, MAX_DATE,
  // Types
  Locale, BetweenOption
} from '../../src';

// Test function to validate examples
export function validateExamples(): void {
  console.log('Validating README.md examples...');

  // Test existing examples
  testExistingExamples();

  // Test new function examples
  testNewFunctionExamples();

  console.log('All examples validated successfully!');
}

function testExistingExamples(): void {
  // Quick Start example
  const date = new Date(2024, 0, 15, 14, 30, 0);
  console.assert(format(date, 'yyyy-MM-dd HH:mm:ss') === '2024-01-15 14:30:00');

  // Parse example
  const parsed = parse('2024-01-15', 'yyyy-MM-dd');
  console.assert(parsed instanceof Date);

  // Min/Max/Clamp example
  const date1 = new Date(2024, 0, 15);
  const date2 = new Date(2024, 0, 20);
  const date3 = new Date(2024, 0, 10);

  const earliest = min(date1, date2, date3);
  console.assert(earliest.getTime() === date3.getTime());

  const latest = max(date1, date2, date3);
  console.assert(latest.getTime() === date2.getTime());
}

function testNewFunctionExamples(): void {
  // Test compare function
  const dates = [
    new Date(2024, 0, 20),
    new Date(2024, 0, 15),
    new Date(2024, 0, 10)
  ];
  dates.sort(compare);
  console.assert(dates[0].getDate() === 10);
  console.assert(dates[2].getDate() === 20);

  // Test now function
  const currentTime = now();
  console.assert(currentTime instanceof Date);
  console.assert(currentTime.getTime() > 0);

  // Test setTime and getTime
  const testDate = new Date(2024, 0, 15);
  const timestamp = getTime(testDate);
  const newDate = setTime(new Date(), timestamp);
  console.assert(newDate.getTime() === timestamp);

  // Test setMilliseconds
  const dateWithMs = setMilliseconds(new Date(2024, 0, 15), 123);
  console.assert(dateWithMs.getMilliseconds() === 123);

  // Test isBetween
  const target = new Date(2024, 0, 15);
  const start = new Date(2024, 0, 10);
  const end = new Date(2024, 0, 20);
  console.assert(isBetween(target, start, end) === true);

  // Test constants
  console.assert(MIN_DATE instanceof Date);
  console.assert(MAX_DATE instanceof Date);
  console.assert(MIN_DATE < MAX_DATE);
}

// Run validation if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateExamples();
}