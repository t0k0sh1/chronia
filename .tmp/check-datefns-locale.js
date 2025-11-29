// date-fns公式のen-USロケール定義を確認
import { enUS } from 'date-fns/locale/en-US';

console.log('=== date-fns en-US Locale Definition ===\n');

// eraの定義を確認
if (enUS.localize && enUS.localize.era) {
  console.log('Era localize function exists');

  // AD/CE era
  console.log('\nAD Era:');
  console.log('  narrow:', enUS.localize.era(1, { width: 'narrow' }));
  console.log('  abbreviated:', enUS.localize.era(1, { width: 'abbreviated' }));
  console.log('  wide:', enUS.localize.era(1, { width: 'wide' }));

  // BC/BCE era
  console.log('\nBC Era:');
  console.log('  narrow:', enUS.localize.era(0, { width: 'narrow' }));
  console.log('  abbreviated:', enUS.localize.era(0, { width: 'abbreviated' }));
  console.log('  wide:', enUS.localize.era(0, { width: 'wide' }));
} else {
  console.log('Era localize not found in expected format');
  console.log('\nLocale structure:');
  console.log(JSON.stringify(enUS, null, 2));
}
