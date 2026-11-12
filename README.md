# モバイルプログラミング テキスト

早稲田大学「モバイルプログラミング」の講義テキストです。
開発環境の構築と、Git、Dart、Flutterを全55章（第0章から第54章）で扱います。
題名に「発展」と付いた章は、講義動画で扱わない内容です。

## 開発

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## 公開

`main` にpushすると、GitHub ActionsがGitHub Pagesへ公開します。
公開先は `/wsd-mobile-programming-textbook/` 以下なので、`npm run dev` の確認も同じパスで開きます。

## 構成

- `docs/chapters/`：各章の原稿です。
- `docs/.vitepress/chapters.mts`：目次の定義です。章を追加するときはここにも追記します。
- `docs/.vitepress/theme/`：早稲田カラーのテーマです。

## 原稿の書き方

- 一文ごとに改行します。段落の区切りは空行です。
- 絵文字と太字は使いません。
- 章番号を参照している箇所があるので、章の順序を変えるときは「第N章」の表記も直します。
