# Quickstart: now関数の実装

## 概要
現在の日時を取得するnow()関数をchroniaライブラリに追加します。

## 前提条件
- chroniaプロジェクトがローカルにセットアップ済み
- Node.js 18+ がインストール済み
- npm/パッケージマネージャが利用可能

## 実装手順

### 1. 関数実装の作成
```bash
# 新しいディレクトリの作成
mkdir src/now

# 実装ファイルの作成
touch src/now/index.ts
```

### 2. 基本実装
`src/now/index.ts` に以下を実装：

```typescript
/**
 * Get the current date and time.
 *
 * Returns a new Date object representing the current moment.
 *
 * @returns Current date and time as Date object
 *
 * @example
 * ```typescript
 * import { now } from 'chronia';
 *
 * const currentTime = now();
 * console.log(currentTime); // 2025-01-21T10:30:45.123Z
 *
 * // 他の関数との組み合わせ
 * const tomorrow = addDays(now(), 1);
 * const oneHourAgo = subHours(now(), 1);
 * ```
 */
export function now(): Date {
  return new Date();
}
```

### 3. エクスポート追加
`src/index.ts` に関数を追加：

```typescript
export { now } from './now';
```

### 4. テスト実装
`tests/now.test.ts` を作成：

```typescript
import { describe, it, expect } from 'vitest';
import { now } from '../src/now';

describe('now', () => {
  it('returns a Date object', () => {
    const result = now();
    expect(result instanceof Date).toBe(true);
  });

  it('returns a valid date', () => {
    const result = now();
    expect(isNaN(result.getTime())).toBe(false);
  });

  it('returns current time within reasonable range', () => {
    const before = new Date();
    const result = now();
    const after = new Date();

    expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
```

### 5. 検証
```bash
# テスト実行
npm test -- tests/now.test.ts

# リント実行
npm run lint

# ビルド実行
npm run build

# ドキュメント生成
npx typedoc
```

## 期待される結果

### 機能テスト
- ✅ now()を呼び出すと現在時刻のDateオブジェクトが返される
- ✅ 複数回呼び出すと異なる（または同じ）時刻が返される
- ✅ 他のchronia関数と組み合わせて使用できる

### パフォーマンステスト
- ✅ 実行時間 < 1ms
- ✅ メモリ使用量最小限
- ✅ 外部依存なし

### 統合テスト
- ✅ ESM/CJS両形式でビルド成功
- ✅ TypeScript型定義が正しく生成される
- ✅ ドキュメントが正しく生成される

## トラブルシューティング

### よくある問題

**Q**: テストが間欠的に失敗する
**A**: 時刻の境界条件（ミリ秒の境界）で失敗する可能性があります。テストの時刻範囲チェックを調整してください。

**Q**: 型エラーが発生する
**A**: tsconfig.jsonの設定とES2020ターゲットの設定を確認してください。

## 検証チェックリスト

- [ ] 関数が実装されている
- [ ] テストが全て通る
- [ ] リントエラーがない
- [ ] ビルドが成功する
- [ ] ドキュメントが生成される
- [ ] 他のchronia関数との統合が動作する

## 次のステップ
この実装が完了したら、パフォーマンステストとドキュメントの更新を行い、最終的なリリース準備を進めます。