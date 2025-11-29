// Day of year formatting test
import { format as dateFnsFormat } from 'date-fns';
import { format as chroniaFormat } from '../dist/index.js';

const date = new Date('1970-01-01T00:00:00.000Z');

const patterns = ['D', 'DD', 'DDD'];

console.log('=== Day of Year Test ===\n');
console.log(`Date: ${date.toISOString()}\n`);

patterns.forEach(pattern => {
  try {
    const dateFnsResult = dateFnsFormat(date, pattern);
    const chroniaResult = chroniaFormat(date, pattern);
    const match = dateFnsResult === chroniaResult ? '✓' : '✗';

    console.log(`Pattern: "${pattern}"`);
    console.log(`  date-fns: "${dateFnsResult}"`);
    console.log(`  Chronia:  "${chroniaResult}"`);
    console.log(`  ${match}\n`);
  } catch (e) {
    console.log(`Pattern: "${pattern}"`);
    console.log(`  ERROR: ${e.message}\n`);
  }
});
