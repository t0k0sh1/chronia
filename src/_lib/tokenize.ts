// フォーマットパターン文字列をトークン列に分割する共通ユーティリティ
const tokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

/**
 * パターン文字列をトークンごとの配列に分割する
 *
 * 例: "yyyy-MM-dd'T'HH:mm:ss"
 * → ["yyyy", "-", "MM", "-", "dd", "'T'", "HH", ":", "mm", ":", "ss"]
 */
export function tokenize(pattern: string): string[] {
  return pattern.match(tokensRegExp) || [];
}
