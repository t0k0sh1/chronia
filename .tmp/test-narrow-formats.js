// Narrow Month と Narrow Weekday の出力比較
import { format as dateFnsFormat } from 'date-fns';
import { format as chroniaFormat } from '../dist/index.js';
import { enUS as dateFnsEnUS } from 'date-fns/locale/en-US';

console.log('=== Narrow Month (MMMMM) Comparison ===\n');

// 全ての月をテスト
for (let month = 0; month < 12; month++) {
  const date = new Date(2024, month, 15);
  const dateFnsResult = dateFnsFormat(date, 'MMMMM', { locale: dateFnsEnUS });
  const chroniaResult = chroniaFormat(date, 'MMMMM');
  const match = dateFnsResult === chroniaResult ? '✓' : '✗';

  console.log(`${(month + 1).toString().padStart(2)}月: date-fns="${dateFnsResult}" | Chronia="${chroniaResult}" | ${match}`);
}

console.log('\n=== Narrow Weekday (EEEEE) Comparison ===\n');

// 全ての曜日をテスト
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
for (let day = 0; day < 7; day++) {
  // 2024年1月7日は日曜日、そこから日付を調整
  const date = new Date(2024, 0, 7 + day);
  const dateFnsResult = dateFnsFormat(date, 'EEEEE', { locale: dateFnsEnUS });
  const chroniaResult = chroniaFormat(date, 'EEEEE');
  const match = dateFnsResult === chroniaResult ? '✓' : '✗';

  console.log(`${weekdays[day]}: date-fns="${dateFnsResult}" | Chronia="${chroniaResult}" | ${match}`);
}

console.log('\n=== 現在のen-USロケール定義 ===\n');
console.log('Chronia month.narrow:');
console.log('  ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]');

console.log('\nChronia weekday.narrow:');
console.log('  ["S", "M", "T", "W", "T", "F", "S"]');

console.log('\n=== date-fnsの期待値 ===\n');
const months = Array.from({ length: 12 }, (_, i) =>
  dateFnsFormat(new Date(2024, i, 1), 'MMMMM', { locale: dateFnsEnUS })
);
console.log('date-fns month.narrow:');
console.log(`  [${months.map(m => `"${m}"`).join(', ')}]`);

const days = Array.from({ length: 7 }, (_, i) =>
  dateFnsFormat(new Date(2024, 0, 7 + i), 'EEEEE', { locale: dateFnsEnUS })
);
console.log('\ndate-fns weekday.narrow:');
console.log(`  [${days.map(d => `"${d}"`).join(', ')}]`);
