# Research: now関数の実装

## 技術調査結果

### JavaScript/TypeScript での現在時刻取得

**Decision**: `new Date()` コンストラクタを使用
**Rationale**:
- 標準的で最もシンプルな実装
- ブラウザ・Node.js両環境でサポート
- 既存のchronia関数群との一貫性
- パフォーマンスが最適

**Alternatives considered**:
- `Date.now()`: number型の戻り値、Dateオブジェクトが必要
- `performance.now()`: 相対時刻のみ、絶対時刻には不向き

### ライブラリ統合パターン

**Decision**: `src/now/index.ts` + エクスポート追加パターン
**Rationale**:
- 既存のchronia関数と同様の構造
- モジュラー設計の維持
- 個別テストファイルでの検証可能

**Alternatives considered**:
- utils内への組み込み: 他の関数との構造不一致
- グローバル定義: モジュラー設計に反する

### テスト戦略

**Decision**: 現在時刻の相対的検証 + 型検証
**Rationale**:
- 実行時の現在時刻は予測不可能
- 呼び出し前後の時刻範囲での検証が現実的
- 型安全性の確保が重要

**Test patterns**:
- 実行時刻範囲の検証（before <= result <= after）
- Date型の検証
- Invalid Dateでないことの確認
- 連続呼び出し時の時刻進行確認

### パフォーマンス考慮事項

**Decision**: 最小限の実装、追加の最適化なし
**Rationale**:
- `new Date()`は既に高度に最適化済み
- 追加の複雑性は不要
- メモリ使用量は無視できるレベル

## 実装方針

1. **単純性**: 1行の実装 `return new Date()`
2. **一貫性**: 既存のchronia APIパターンに従う
3. **テスタビリティ**: 時刻の相対的検証でテスト可能
4. **文書化**: JSDocでの明確な説明

## 依存関係

- **内部**: chroniaライブラリの既存構造のみ
- **外部**: なし（標準のDateオブジェクトのみ使用）