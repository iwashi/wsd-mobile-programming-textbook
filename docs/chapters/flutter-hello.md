::: tip 第4部の到達目標
- Flutterのプロジェクトを作り、シミュレータで実行できる
- `StatelessWidget` の構造を、継承の知識を使って読める
- `Column`、`Row`、`Stack`、`Container` で画面を組み立てられる
- 画像、テーマ、文字の装飾を指定できる
:::

ここからはFlutterでアプリを作ります。
第0章で構築した環境（Flutter SDKとiOSシミュレータ）を使い、VS Codeで進めます。

## すべてはWidget

Flutterの画面は、Widgetという部品を組み合わせて作ります。
文字もボタンも余白も配置の指定も、すべてWidgetです。
次のコードは、画面の中央に文字を表示します。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

`import` は、Flutterのライブラリを読み込む命令です。
`runApp` はアプリを起動する関数で、渡されたWidgetを画面に表示します。
`Center` は子を中央に配置するWidget、`Text` は文字を表示するWidgetです。
`child:` は、第19章で学んだ名前付き引数です。

このコードは、`Center` の下に `Text` がぶら下がる木のような構造になっています。
Widgetを入れ子にしてできるこの構造をWidgetツリーと呼びます。

たとえば、アイコンと文字の組を3つ横に並べたバーは、次のようなツリーで表せます。
`Row` は横に、`Column` は縦に並べるWidgetで、第32章で学びます。

```text
Container
└─ Row
   ├─ Column
   │  ├─ Icon（電話）
   │  └─ Text（CALL）
   ├─ Column
   │  ├─ Icon（経路）
   │  └─ Text（ROUTE）
   └─ Column
      ├─ Icon（共有）
      └─ Text（SHARE）
```

自分で作るWidgetには、主に2つの種類があります。

- `StatelessWidget`：内部に状態を持たず、親から受け取った値だけで表示が決まるWidget
- `StatefulWidget`：内部に状態を持ち、状態が変わると表示を更新できるWidget

まず `StatelessWidget` から始めます。
`StatefulWidget` は第35章で扱います。

## プロジェクトを作る

第0章と同じ手順で、新しいプロジェクトを作ります。

作成されたファイルのうち、よく使うものは次の2つです。

- `lib/main.dart`：アプリのコードの本体です。
- `pubspec.yaml`：アプリの設定と、使用するパッケージや画像を記述するファイルです。

## シミュレータで実行する

コマンドパレットから `Flutter: Launch Emulator` を選び、iOSシミュレータを起動します。
`lib/main.dart` を開いた状態で、右上の実行ボタンを押すとアプリがビルドされて起動します。
第0章で確認したカウンターのアプリが表示されます。

## 最小のアプリを書く

テンプレートのコードは使わず、ゼロから書きます。
`lib/main.dart` の中身をすべて消してください。
`test` フォルダのテストは古いコードを対象にしたままエラーになりますが、本書では使わないので削除してかまいません。

エディタで `stless` と入力すると `Flutter Stateless Widget` という候補が現れ、選ぶとクラスのひな形が挿入されます。
長いコードを手で打つと間違えやすいので、入力補完を積極的に使ってください。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Hello Flutter!',
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

`MyApp` は、`StatelessWidget` を基に作った自分のWidgetです。
`build` メソッドが、このWidgetの見た目となるWidgetを返します。
`extends`、`@override`、`super.key` については次の章で説明します。

`textDirection` は文字を書く方向の指定で、`ltr` は左から右（left to right）を意味します。
`rtl` に変えると、右から左に書く言語の表示になります。

### ホットリロード

ファイルを保存すると、シミュレータの表示がすぐに更新されます。
これをホットリロードと呼び、アプリを再起動せずにコードの変更を確認できます。
反映されないときは、ホットリスタートのボタンを押すか、いったん停止して起動し直してください。

### コードの整形

右クリックのメニューから `Format Document` を実行すると、コードが整形されます。
1行に収まらない引数は縦に並び、最後の引数の後ろにカンマ（トレイリングカンマ）が自動で付きます。
1行に収まる引数は、カンマが取り除かれて1行にまとまります。
そのため、整形すると本書のコードとは改行の位置が変わることがありますが、動作は同じです。

エディタの電球のメニューから `Wrap with Center` などを選ぶと、選択中のWidgetを別のWidgetで囲むこともできます。
括弧の対応を崩さずに編集できるので便利です。

## MaterialAppとScaffold

Flutterには、アプリらしい見た目をすぐに作るためのWidgetが用意されています。
`build` の中を次のように書き換えます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Hello First AppBar'),
          backgroundColor: Colors.blue,
        ),
        body: const Text(
          'Body of the app',
          style: TextStyle(fontSize: 50),
        ),
      ),
    );
  }
}
```

- `MaterialApp`：アプリ全体の土台です。Googleのデザイン体系であるMaterial Designに沿った機能を提供します。`home` に最初の画面を指定します。
- `Scaffold`：1つの画面の骨組みです。`appBar` に上部のバーを、`body` に本体部分を指定します。
- `AppBar`：画面上部のバーです。`title` にタイトルを、`backgroundColor` に背景色を指定します。
- `TextStyle`：文字の見た目を指定します。`fontSize` は文字の大きさです。

複雑に見えますが、書き方は第2部と第3部で学んだDartそのものです。
`Text('Body', style: ...)` は、クラスからオブジェクトを作っているにすぎません。
第20章の `Dog()` と同じく、コンストラクタを呼び出して、引数に別のオブジェクトを渡しています。
