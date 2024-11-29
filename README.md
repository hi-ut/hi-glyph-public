オープンソース漢字字形管理システムhi-glyph

## 注意

**このプロジェクトは開発中のため、バグが多数存在します。**

**Since this project is still under development, it contains numerous bugs.**

## 開発

### ライブラリーのインストール

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 環境関数の設定

[例示ファイル](./.env.example)の`.env.example`を`.env`にコピーして、内容を記入

DB接続関係は[Prisma](https://www.prisma.io/)のドキュメントに参考

```bash
npx prisma db push
```

### 開発サーバの起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開くとサイトを閲覧できる。

## デプロイ

セルフホストはpm2との併用がおすすめです。詳細はこのうち更新いたします。

現在では[Vercel Platform](https://vercel.com/)のみテストしております。
Netlifyでも大丈夫のはずです。

## ライセンス

[MIT License](./LICENSE)
