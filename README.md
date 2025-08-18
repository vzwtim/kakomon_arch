# Arch Exam Drill

一級建築士学科対策の練習アプリです。過去問の文面を使わず、オリジナル問題と解説をデータベースに保存します。

## 構成

- **apps/web** - Next.js 14 を用いた Web アプリケーション (App Router)
- **packages/ui** - 共通 UI コンポーネント (任意)
- **packages/db** - Prisma スキーマと SQL マイグレーション
- **data/seed** - 自作問題の JSON データ
- **.github** - CI や Issue/Pull Request テンプレート

Supabase(Postgres) を利用して認証とデータベースを構築し、Vercel に自動デプロイすることを想定しています。

## ライセンス

MIT
