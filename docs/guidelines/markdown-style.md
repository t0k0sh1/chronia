# Markdown Style Guide

## Overview

This guide defines best practices for writing Markdown in the Chronia project. Following these guidelines ensures consistency, maintainability, and compatibility with GitHub Pages rendering.

---

## Core Principles

### HTMLタグの使用禁止

**Do NOT use HTML tags in Markdown documentation.**

GitHub Pages uses Jekyll for static site generation, which may not render HTML elements consistently across different themes and configurations. To ensure proper rendering and maintain consistency, all documentation must use standard Markdown syntax only.

**禁止される例**:

```markdown
<!-- ❌ BAD: HTML table -->
<table>
<tr>
<td width="50%">
**Section 1**
- Item 1
- Item 2
</td>
<td width="50%">
**Section 2**
- Item 3
- Item 4
</td>
</tr>
</table>

<!-- ❌ BAD: HTML for styling -->
<div style="color: red;">Warning message</div>

<!-- ❌ BAD: HTML for layout -->
<center>Centered text</center>
```

**推奨される代替**:

```markdown
<!-- ✅ GOOD: Standard Markdown -->
### Section 1
- Item 1
- Item 2

### Section 2
- Item 3
- Item 4

<!-- ✅ GOOD: Blockquote for emphasis -->
> **Warning**: Important message

<!-- ✅ GOOD: Standard Markdown for emphasis -->
**Centered concept** (Markdown doesn't support centering, and that's okay)
```

---

## 推奨される代替パターン

### Multi-column Layouts

HTMLテーブルで段組レイアウトを実現する代わりに、見出しレベルと箇条書きリストを使用してください。

**❌ 避けるべきパターン**:

```markdown
<table>
<tr>
<td>Column 1 content</td>
<td>Column 2 content</td>
<td>Column 3 content</td>
</tr>
</table>
```

**✅ 推奨パターン**:

```markdown
### Column 1 Title
Content for column 1

### Column 2 Title
Content for column 2

### Column 3 Title
Content for column 3
```

または、簡潔にリスト形式で:

```markdown
- **Column 1**: Content for column 1
- **Column 2**: Content for column 2
- **Column 3**: Content for column 3
```

### Tables

データ構造を表現する場合は、標準のMarkdownテーブル構文を使用してください。

**✅ 推奨パターン**:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Emphasis and Styling

強調やスタイリングには標準のMarkdown記法を使用してください。

**✅ 推奨パターン**:

```markdown
**Bold text**
*Italic text*
`Code`
> Blockquote for important notes
```

### Links and Images

リンクと画像には標準のMarkdown記法を使用してください。

**✅ 推奨パターン**:

```markdown
[Link text](https://example.com)
![Alt text](image.png)
```

---

## Markdown構文のベストプラクティス

### Headings

見出しレベルを適切に使用し、階層構造を明確にしてください。

```markdown
# H1: Document Title (page title only)
## H2: Major Sections
### H3: Subsections
#### H4: Minor Subsections
```

**Rules**:

- H1は文書のタイトル専用（1つのファイルに1つのみ）
- 見出しレベルを飛ばさない（H2の次はH3、H3の次はH4）
- 見出しの前後に空行を追加

### Lists

リストは一貫性を持って記述してください。

```markdown
<!-- Unordered lists -->
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2

<!-- Ordered lists -->
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
```

**Rules**:

- ネストされたリストは2スペースまたは4スペースでインデント
- リスト項目間に空行を入れない（同じレベルの場合）
- 異なるリストタイプ間には空行を入れる

### Code Blocks

コードブロックには言語識別子を指定してください。

````markdown
```typescript
function example(): void {
  console.log('Hello, Chronia!');
}
```
````

**Rules**:

- 言語識別子を必ず指定（`typescript`, `javascript`, `bash`, etc.）
- インラインコードには単一のバッククォート: `` `code` ``
- コードブロックの前後に空行を追加

### Blockquotes

重要な情報や注意事項にはブロッククォートを使用してください。

```markdown
> **Note**: This is an important note.

> **Warning**: This is a warning message.
```

### Horizontal Rules

セクション区切りには水平線を使用できます。

```markdown
---
```

**Rules**:

- 3つ以上のハイフン、アスタリスク、アンダースコアが使用可能
- 前後に空行を追加
- プロジェクト全体で一貫した記号を使用（Chroniaでは `---` を推奨）

---

## GitHub Flavored Markdown (GFM) Features

### Table Syntax

GFMのテーブル構文を使用してください。

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Rules**:

- ヘッダー行とデータ行の間に区切り行（`|---|---|---|`）を追加
- セルの幅は自動調整されるため、手動で揃える必要はない
- パイプ文字（`|`）をエスケープする場合は `\|` を使用

### Task Lists

タスクリストはGFMでサポートされています。

```markdown
- [ ] Incomplete task
- [x] Completed task
```

### Strikethrough

取り消し線にはチルダを使用してください。

```markdown
~~Strikethrough text~~
```

---

## 文書構造のガイドライン

### File Organization

- 各Markdownファイルは1つの明確なトピックに焦点を当てる
- ファイル名はkebab-caseを使用（例: `markdown-style.md`）
- READMEファイルはディレクトリの概要を提供

### Internal Links

内部リンクには相対パスを使用してください。

```markdown
[Function Documentation Guidelines](./documentation-function.md)
[Validation Functions](../functions/validations/)
```

### External Links

外部リンクには絶対URLを使用してください。

```markdown
[GitHub Repository](https://github.com/t0k0sh1/chronia)
```

---

## Quality Checks

### Linting

すべてのMarkdownファイルはlintingを通過する必要があります。

```bash
pnpm lint:docs
```

このコマンドはMarkdownlintを実行し、構文エラーとスタイル違反をチェックします。

### Common Lint Errors to Avoid

- HTMLタグの使用
- 不適切な見出し階層
- 行末の空白文字
- 連続した空行
- コードブロックの言語識別子の欠落

---

## 例外

以下の場合のみ、HTMLの使用が許可される場合があります:

1. **絶対に必要な場合のみ**: 標準Markdownでは表現できない特殊な要件
2. **承認が必要**: プロジェクトメンテナーの明示的な承認が必要
3. **文書化が必要**: なぜHTMLが必要なのかを文書化

**Note**: 現在のところ、Chroniaプロジェクトでは例外は認められていません。すべての文書は標準Markdown記法で記述する必要があります。

---

## See Also

- [Function Documentation Guidelines](./documentation-function.md) - Individual function documentation structure
- [Category Documentation Guidelines](./documentation-category.md) - Category README structure
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/) - Official GFM specification
- [Markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) - Linting rules reference

---

## Maintenance

- Review this guide periodically as Markdown standards evolve
- Update examples when new patterns emerge
- Ensure all contributors are familiar with these guidelines
- Keep linting rules in sync with this guide
