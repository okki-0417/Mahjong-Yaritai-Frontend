# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

「麻雀ヤリタイ」(Mahjong Yaritai) - Next.js 15 + React 18 + TypeScript で構築された日本の麻雀コミュニティプラットフォームです。麻雀問題の解決、投票、コメント、学習機能に焦点を当てたアプリケーションです。

## 開発コマンド

### 基本開発

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# 型チェック
npm run typecheck

# リンティング
npm run lint
npm run lint:fix

# コードフォーマット
npm run format

# OpenAPI仕様からAPIクライアント生成
npm run gen-client
```

### 環境セットアップ

```bash
# 環境変数の設定
cp .env.local .env

# Gitフック設定（コミット時に自動でESLint & Prettierを実行）
git config core.hooksPath .githooks
chmod +x .githooks/*
```

## アーキテクチャ概要

### アプリケーション構造

- **Next.js App Router**: Next.js 15 の App Router パターンを使用
- **機能ベースアーキテクチャ**: 各機能はページディレクトリ内にコロケーション
- **Context ベース状態管理**: 機能固有のプロバイダーと React Context API を使用
- **型安全な API 統合**: OpenAPI 仕様から自動生成される Zodios クライアント

### 主要ディレクトリ

- `src/app/` - Next.js App Router のページと機能固有コンポーネント
  - 各ページディレクトリ内に関連コンポーネント、コンテキスト、スキーマを配置
  - 例: `app/what-to-discard-problems/components/`, `app/auth/components/`
- `src/components/` - アプリ全体で共有されるUIコンポーネント
- `src/zodios/` - 自動生成されたAPIクライアント
- `src/lib/api/` - SSR/CSR用のAPIクライアントラッパー
- `src/context-providers/` - グローバルコンテキストプロバイダー

### 状態管理パターン

階層型 Context プロバイダーパターンを使用：

1. **グローバル認証コンテキスト** (`AuthStateContextProvider`) - アプリ全体をラップ
2. **機能固有のコンテキスト** - 各機能が独自のコンテキストプロバイダーを持つ
3. **サーバーサイドデータ取得** - 初期データに非同期サーバーコンポーネントを使用

### API統合

- **生成されたクライアント**: `src/zodios/api.ts` - `../api/swagger/v1/swagger.yaml` から自動生成
- **サーバーサイドAPI**: `src/lib/api/server.ts` - Cookie処理付きSSR用
- **クライアントサイドAPI**: `src/lib/api/client.ts` - 認証情報付きCSR用
- **型安全性**: Zodスキーマバリデーションによる完全なTypeScriptカバレッジ

### コンポーネントアーキテクチャ

- **ハイブリッドレンダリング**: データ取得にサーバーコンポーネント、インタラクティビティにクライアントコンポーネント
- **UIフレームワーク**: Chakra UI 2.x + Tailwind CSS 4.x
- **日本語**: すべてのUIテキストとメタデータが日本語

### 主要機能

1. **what-to-discard-problems** - 投票、コメント、問題解決を含むコア機能（現在スキーマベースバリデーション使用）
2. **認証システム** - Google OAuth によるセッション管理でのログイン/ログアウト
3. **ユーザープロフィール** - ユーザー管理とプロフィール編集
4. **学習モジュール** - 教育コンテンツ

## 開発パターン

### APIクライアントの使用

```typescript
// サーバーサイド（サーバーコンポーネント内）
import createApiPageClient from "@/src/lib/api/server";
const apiPageClient = await createApiPageClient();

// クライアントサイド（クライアントコンポーネント内）
import { apiClient } from "@/src/lib/api/client";
```

### コンテキストプロバイダーパターン

各機能は以下のパターンに従う：

- `app/[feature]/context-providers/` - コンテキストプロバイダー
- プロバイダーは機能ページまたはグローバルで構成

### ファイル構成（コロケーション）

- **ページレベル**: `app/[feature]/page.tsx`
- **コンポーネント**: `app/[feature]/components/`
- **サブ機能**: `app/[feature]/[sub-feature]/components/`
- **コンテキスト**: `app/[feature]/context-providers/`
- **スキーマ**: `app/[feature]/schema/`
- **ドキュメント**: `app/[feature]/CLAUDE.md`

サーバー/クライアントコンポーネント：
- サーバーコンポーネント: 'use client' ディレクティブなし
- クライアントコンポーネント: 'use client' で開始
- 共有型: `src/zodios/api.ts` 内で自動生成

## 重要な技術詳細

### Sentry統合

- `next.config.mjs` でエラー監視を設定
- クライアントとサーバー両方の自動エラートラッキング
- CI環境でソースマップをアップロード

### TypeScript設定

- Strictモード無効だが包括的な型チェック
- パスエイリアス: `@/*` がリポジトリルートにマップ
- モダンなESNextターゲットとlib設定

### スタイリングシステム

- カスタムテーマ付き Chakra UI
- モダン機能付き Tailwind CSS 4.x
- `src/styles/globals.css` のグローバルスタイル
- Next.js設定でパッケージインポートを最適化

### API生成

バックエンドAPIが変更されたら、クライアントを再生成：

```bash
npm run gen-client
```

これにより `../api/swagger/v1/swagger.yaml` のOpenAPI仕様から `src/zodios/api.ts` が更新されます。

### テスト

現在、テストフレームワークは設定されていません。重要なコンポーネントにはJestまたはVitestでのテスト実装を検討してください。

### 開発ワークフロー

1. プリコミットフックがステージングファイルで自動的にESLintとPrettierを実行
2. コミット前に `npm run typecheck` でTypeScript型を検証
3. バックエンドAPIは `http://localhost:3001` で動作している必要がある（`.env`で設定）

### 現在のアーキテクチャメモ

- `what-to-discard-problems` 機能は複雑なフォームバリデーションにカスタムZodスキーマバリデーションを使用
- 複数のコンテキストプロバイダーをよりクリーンなアーキテクチャに統合中
- 認証フローはサーバーサイドコールバック処理でGoogle OAuthを使用

## 機能別ドキュメント

各機能の詳細な実装ガイドは `docs/features/` ディレクトリに集約されています：

### 実装済み機能

- **[何切る問題](docs/features/what-to-discard-problems/CLAUDE.md)** - 問題作成・投票・コメント・いいね機能
  - [投票機能](docs/features/what-to-discard-problems/votes/CLAUDE.md)
  - [コメント機能](docs/features/what-to-discard-problems/comments/CLAUDE.md)
  - [いいね機能](docs/features/what-to-discard-problems/likes/CLAUDE.md)
- **[認証](docs/features/auth/CLAUDE.md)** - メールトークン認証・Google OAuth・LINE認証

### ドキュメント作成ガイド

新しい機能のドキュメントを作成する際は、**[ドキュメント作成ガイド](docs/DOCUMENTATION_GUIDE.md)** を参照してください。

### 今後追加予定

- `docs/features/learning/CLAUDE.md` - 学習・クイズ機能
- `docs/features/me/CLAUDE.md` - プロフィール管理・退会処理
- `docs/features/users/CLAUDE.md` - ユーザー表示・フォロー機能
- `docs/features/terms/CLAUDE.md` - 利用規約・プライバシーポリシー