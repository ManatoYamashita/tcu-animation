# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

東京都市大学のアニメーション制作集団「都市大アニメーション」の公式Webサイト。Astroベースの静的サイトジェネレーターで構築されたブログ機能付きポートフォリオサイト。

## 技術スタック

- **フレームワーク**: Astro v4.16.5 (静的サイト生成)
- **スタイリング**: Tailwind CSS v3.4.3
- **アニメーション**: GSAP v3.12.7
- **コンテンツ**: MDX (Markdown + JSX)
- **型安全性**: TypeScript (strict mode)
- **CI/CD**: GitHub Actions → FTP自動デプロイ

## 開発コマンド

```bash
# 開発サーバー起動 (ホストネットワーク公開)
npm run dev

# 型チェック + ビルド
npm run build

# プレビューサーバー
npm run preview

# 型チェックのみ
npx astro check
```

## アーキテクチャ

### コンテンツ管理システム (Astro Content Collections)

ブログ記事は**Content Collections API**で型安全に管理されている:

- **定義場所**: `src/content/config.ts`
- **記事保存先**: `src/content/blog/*.md`
- **スキーマ**: Zodで厳密に型定義
  - `title`, `description`, `pubDate` (必須)
  - `updatedDate`, `heroImage`, `tags` (任意)

### ルーティング構造

```
/                    # トップページ (index.astro)
/about               # アバウトページ
/blog                # ブログ一覧
/blog/[slug]         # 個別記事 (動的ルーティング)
/tags                # タグ一覧
/tags/[tag]          # タグフィルタ記事一覧
```

### コンポーネント設計

- **レイアウト**: `src/layouts/BlogPost.astro` - 記事テンプレート
- **共通コンポーネント**: `src/components/`
  - `BaseHead.astro` - SEOメタタグ・OGP管理
  - `Header.astro` / `Footer.astro` - サイト構造
  - `Hero.astro` - トップページヒーローセクション
  - `RecentPublications.astro` - 最新記事表示
  - `YouTubeEmbed.astro` - YouTube埋め込み
  - `ThemeIcon.astro` - ダークモード切替

### グローバル設定

`src/consts.ts`でサイト全体の定数を一元管理:

```typescript
SITE_TITLE       // サイトタイトル
SITE_DESCRIPTION // SEO説明文
SITE_URL         // 本番URL (OGP用)
```

## 重要な開発ルール

### コンテンツ更新フロー

1. `src/content/blog/` に新規Markdownファイル作成
2. 必須フロントマター記述:
   ```yaml
   ---
   title: 記事タイトル
   description: 記事説明
   pubDate: 2024-01-01
   heroImage: /blog-assets/image.jpg (任意)
   tags: ["タグ1", "タグ2"] (任意)
   ---
   ```
3. `main`ブランチにpushで自動ビルド・デプロイ

### 画像管理

- **ブログ画像**: `/public/blog-assets/` 配下に記事ごとのサブディレクトリ作成
- **公開画像パス**: `/blog-assets/...` (publicディレクトリはルートから参照)

### コーディング規約

- **インデント**: スペース2つ
- **ファイル命名**: パスカルケース (コンポーネント), kebab-case (ページ)
- **コメント**: 日本語
- **Tailwindクラス**: 可読性のため適宜改行・整理
- **TypeScript**: strict mode必須 (`tsconfig.json`)

### Syntax Highlightテーマ

`astro.config.mjs`で設定:
- ライトモード: `poimandres`
- ダークモード: `catppuccin-latte`

## CI/CD パイプライン

`.github/workflows/deployment.yml`でmainブランチpush時に自動実行:

1. Node.js 18セットアップ
2. `npm install`
3. `npm run build` (astro check含む)
4. `dist/`をFTPサーバーへデプロイ

**機密情報**: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`はGitHub Secretsで管理。

## サイト設定

- **本番URL**: https://tcu-animation.jp
- **Sitemap**: 自動生成 (404ページ除外)
- **RSS**: `@astrojs/rss`で生成
- **Analytics**: Partytown経由でGoogle Analytics統合 (`PUBLIC_GOOGLE_ANALYTICS_ID`環境変数)

## トラブルシューティング

### ビルドエラー時

```bash
# 型エラーの詳細確認
npx astro check

# キャッシュクリア後再ビルド
rm -rf dist/ .astro/ node_modules/.astro/
npm run build
```

### Content Collections型エラー

`src/content/config.ts`のスキーマとMarkdownフロントマターの一致を確認。必須フィールド不足が主原因。
