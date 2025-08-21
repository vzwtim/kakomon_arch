# Arch Exam Drill

一級建築士学科対策の練習アプリです。過去問や第三者サイトの文面は利用せず、すべて自作の問題と解説のみを扱う方針です。

## セットアップ

- Node.js 20
- pnpm または npm

```bash
pnpm install
```

## 開発コマンド

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## 環境変数 (.env.local)

`apps/web/.env.example` を `.env.local` にコピーして値を設定してください。

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
DATABASE_URL=postgresql://...
```

## 構成

- **apps/web** - Next.js 14 を用いた Web アプリケーション (App Router)
- **packages/ui** - 共通 UI コンポーネント (任意)
- **packages/db** - Prisma スキーマと SQL マイグレーション
- **data/seed** - 自作問題の JSON データ
- **.github** - CI や Issue/Pull Request テンプレート

Supabase(Postgres) を利用して認証とデータベースを構築し、Vercel に自動デプロイすることを想定しています。

## ライセンス

本リポジトリのコードは MIT ライセンスで提供します。問題データは自作に限り、外部の文面を含めないでください。
