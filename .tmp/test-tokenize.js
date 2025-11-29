// tokenizeの動作確認
import { tokenize } from '../src/_lib/tokenize.ts';

const patterns = [
  "''''",
  "'''quoted'''",
  "''",
  "'text'",
  "yyyy-MM-dd",
];

patterns.forEach(pattern => {
  const tokens = tokenize(pattern);
  console.log(`Pattern: "${pattern}"`);
  console.log(`Tokens: [${tokens.map(t => `"${t}"`).join(', ')}]`);
  console.log('');
});
