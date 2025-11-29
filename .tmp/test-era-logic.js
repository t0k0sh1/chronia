// Era判定ロジックの検証
import { format as dateFnsFormat } from 'date-fns';
import { format as chroniaFormat } from '../dist/index.js';
import { enUS as dateFnsEnUS } from 'date-fns/locale/en-US';
import { enUS as chroniaEnUS } from '../src/i18n/en-US/index.ts';

const testCases = [
  { year: 2024, desc: '西暦2024年' },
  { year: 1, desc: '西暦1年' },
  { year: 0, desc: '西暦0年（紀元前1年）' },
  { year: -1, desc: '紀元前2年' },
  { year: -100, desc: '紀元前101年' },
];

console.log('=== Era判定ロジックの検証 ===\n');

testCases.forEach(({ year, desc }) => {
  const date = new Date(0);
  date.setFullYear(year);

  const rawYear = date.getFullYear();
  const chroniaEra = rawYear > 0 ? 1 : 0;  // Chroniaのロジック

  console.log(`${desc}:`);
  console.log(`  date.getFullYear() = ${rawYear}`);
  console.log(`  Chronia era判定 (rawYear > 0 ? 1 : 0) = ${chroniaEra} (${chroniaEra === 1 ? 'AD' : 'BC'})`);

  // 実際の出力を確認
  const tokens = ['G', 'GGGG', 'GGGGG'];
  tokens.forEach(token => {
    const dateFnsResult = dateFnsFormat(date, token, { locale: dateFnsEnUS });
    const chroniaResult = chroniaFormat(date, token, chroniaEnUS);
    const match = dateFnsResult === chroniaResult ? '✓' : '✗';

    console.log(`  ${token}: date-fns="${dateFnsResult}" | Chronia="${chroniaResult}" | ${match}`);
  });

  console.log('');
});
