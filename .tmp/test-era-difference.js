// date-fnsとChroniaのEraフォーマット差異を調査
import { format as dateFnsFormat } from 'date-fns';
import { format as chroniaFormat } from '../dist/index.js';

const testDates = [
  new Date('1970-01-01T00:00:00.000Z'),  // AD
  new Date('0000-01-01T00:00:00.000Z'),  // 1 BC
  new Date('-000100-01-01T00:00:00.000Z'), // 101 BC
];

const eraTokens = [
  'G',      // Abbreviated (1-3 G's)
  'GG',     // Abbreviated
  'GGG',    // Abbreviated
  'GGGG',   // Wide
  'GGGGG',  // Narrow
];

console.log('=== Era Format Comparison ===\n');

testDates.forEach((date, idx) => {
  console.log(`Date ${idx + 1}: ${date.toISOString()}`);
  console.log('─'.repeat(60));

  eraTokens.forEach(token => {
    try {
      const dateFnsResult = dateFnsFormat(date, token);
      const chroniaResult = chroniaFormat(date, token);
      const match = dateFnsResult === chroniaResult ? '✓' : '✗';

      console.log(`${token.padEnd(6)} | date-fns: "${dateFnsResult.padEnd(15)}" | Chronia: "${chroniaResult.padEnd(15)}" | ${match}`);
    } catch (e) {
      console.log(`${token.padEnd(6)} | ERROR: ${e.message}`);
    }
  });

  console.log('');
});

// 詳細な比較: en-USロケールのera定義を確認
console.log('\n=== Expected en-US Era Values ===');
const adDate = new Date('2024-01-01');
const bcDate = new Date('-000100-01-01'); // 101 BC

console.log('\nAD Era (Anno Domini):');
console.log(`  Narrow (GGGGG): "${dateFnsFormat(adDate, 'GGGGG')}"`);
console.log(`  Abbr (G/GG/GGG): "${dateFnsFormat(adDate, 'G')}"`);
console.log(`  Wide (GGGG): "${dateFnsFormat(adDate, 'GGGG')}"`);

console.log('\nBC Era (Before Christ):');
console.log(`  Narrow (GGGGG): "${dateFnsFormat(bcDate, 'GGGGG')}"`);
console.log(`  Abbr (G/GG/GGG): "${dateFnsFormat(bcDate, 'G')}"`);
console.log(`  Wide (GGGG): "${dateFnsFormat(bcDate, 'GGGG')}"`);
