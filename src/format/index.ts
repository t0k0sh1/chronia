import { tokenize } from "../_lib/tokenize";
import { formatters } from "../_lib/formatters";
import { Localize } from "../_lib/types";

export function format(
  date: Date,
  pattern: string,
  localize?: Localize,
): string {
  const tokens = tokenize(pattern);
  let result = "";

  for (const token of tokens) {
    const handler = formatters[token[0]];
    if (handler) {
      result += handler(date, token, localize);
    } else {
      // リテラル文字（'...'）や記号
      result += token.replace(/''/g, "'").replace(/^'|'$/g, "");
    }
  }

  return result;
}
