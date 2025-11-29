// Day Period略語の実際の出力を確認
import { format as dateFnsFormat } from 'date-fns';
import { enUS as dateFnsEnUS } from 'date-fns/locale/en-US';

const testDate = new Date('1970-01-01T00:00:00.000Z'); // 9:00 AM JST

console.log('=== Day Period Abbreviation (aaa) ===\n');

const tokens = ['a', 'aa', 'aaa'];

tokens.forEach(token => {
  const result = dateFnsFormat(testDate, `h:mm ${token}`, { locale: dateFnsEnUS });
  console.log(`Token "${token}": ${result}`);
});

console.log('\ndate-fns locale内部値:');
console.log('  narrow:', dateFnsEnUS.localize.dayPeriod(0, { width: 'narrow' }));
console.log('  abbreviated:', dateFnsEnUS.localize.dayPeriod(0, { width: 'abbreviated' }));
console.log('  wide:', dateFnsEnUS.localize.dayPeriod(0, { width: 'wide' }));
