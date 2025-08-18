# Arch Exam Drill

一級建築士学科対策の練習アプリです。過去問の文面を使わず、オリジナル問題と解説をデータベースに保存します。

## 構成

- **apps/web** - Next.js 14 アプリケーション (App Router)
- **packages/ui** - 共通 UI コンポーネント (任意)
- **packages/db** - Prisma スキーマと SQL マイグレーション
- **data/seed** - 自作問題の JSON データ
- **.github** - CI や Issue/Pull Request テンプレート

Supabase(Postgres) を利用して認証とデータベースを構築し、Vercel に自動デプロイすることを想定しています。

## 開発

```bash
npm install
npm run dev --workspace=apps/web
```

## 主な機能

- Supabase Auth によるログイン
- `/api/questions`, `/api/review`, `/api/session` の API
- SM-2 に基づく簡易 SRS で復習 due を計算
- 解答後に短解説と誤答理由を表示
- ダーク/ライトの自動切り替え

## ライセンス

MIT
