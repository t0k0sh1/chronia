// エスケープ引用符のテスト
import { format as dateFnsFormat } from 'date-fns';
import { format as chroniaFormat } from '../dist/index.js';

const date = new Date('1970-01-01T00:00:00.000Z');

const patterns = [
  "''''",           // 4つの引用符
  "'''quoted'''",   // 引用符で囲まれたquoted
  "''",             // 2つの引用符
  "'text'",         // 通常のリテラル
  "'''text''' yyyy", // 複合パターン
];

console.log('=== Escaped Quotes Test ===\n');

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
