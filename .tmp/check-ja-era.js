// date-fns日本語ロケールのEra定義を確認
import { ja } from 'date-fns/locale/ja';
import { format } from 'date-fns';

console.log('=== date-fns ja Locale Era Definition ===\n');

// AD era
const adDate = new Date('2024-01-01');
console.log('AD Era (西暦):');
console.log('  narrow (GGGGG):', ja.localize.era(1, { width: 'narrow' }));
console.log('  abbreviated (G/GG/GGG):', ja.localize.era(1, { width: 'abbreviated' }));
console.log('  wide (GGGG):', ja.localize.era(1, { width: 'wide' }));

console.log('\nAD Era 実際の出力:');
console.log('  format(adDate, "GGGGG", {locale: ja}):', format(adDate, 'GGGGG', { locale: ja }));
console.log('  format(adDate, "G", {locale: ja}):', format(adDate, 'G', { locale: ja }));
console.log('  format(adDate, "GGGG", {locale: ja}):', format(adDate, 'GGGG', { locale: ja }));

// BC era
const bcDate = new Date('-000100-01-01');
console.log('\nBC Era (紀元前):');
console.log('  narrow (GGGGG):', ja.localize.era(0, { width: 'narrow' }));
console.log('  abbreviated (G/GG/GGG):', ja.localize.era(0, { width: 'abbreviated' }));
console.log('  wide (GGGG):', ja.localize.era(0, { width: 'wide' }));

console.log('\nBC Era 実際の出力:');
console.log('  format(bcDate, "GGGGG", {locale: ja}):', format(bcDate, 'GGGGG', { locale: ja }));
console.log('  format(bcDate, "G", {locale: ja}):', format(bcDate, 'G', { locale: ja }));
console.log('  format(bcDate, "GGGG", {locale: ja}):', format(bcDate, 'GGGG', { locale: ja }));
