複雑なアプリでは、すべてを自分で書くのではなく、他の人が作ったコードをパッケージとして取り込んで使います。

## pub.dev

[pub.dev](https://pub.dev/) は、DartとFlutterのパッケージが集まる公式のサイトです。
必要な機能を検索し、見つけたパッケージを自分のアプリに組み込みます。

ここでは例として、英単語の一覧を提供する [english_words](https://pub.dev/packages/english_words) を使います。

パッケージのページには、次の情報が書かれています。

- `Readme`：パッケージの説明と基本的な使い方
- `Installing`：プロジェクトへの追加方法
- `Example`：サンプルコード
- 右側の `Repository`：GitHubなどにあるソースコードへのリンク

選ぶときの目安になるのが、右上の3つの数字です。

- `likes`：ユーザーからの評価の数
- `pub points`：ドキュメントや静的解析などの品質チェックの点数
- `downloads`：ダウンロード数

これらの数字が高ければ、よく使われていて品質も一定以上と判断する材料になります。
ただし数字だけで安全や品質が保証されるわけではないので、説明やソースコードも確認して総合的に判断します。

## パッケージを追加する

`Installing` のタブに、`pubspec.yaml` に書く内容が示されています。
`pubspec.yaml` の `dependencies:` の下に、次のように追記します。
インデントを揃えてください。
バージョンは、`Installing` のタブに表示されているものを使います。

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  english_words: ^4.0.0
```

保存すると、`flutter pub get` が実行され、パッケージがダウンロードされます。

`dependencies` はアプリの動作に必要なパッケージ、`dev_dependencies` はテストなど開発時にだけ使うパッケージを書く場所です。
`^` の意味や、コマンドで追加する方法、ライセンスの確認については、発展の第50章で説明します。

## パッケージを使う

`lib/main.dart` の先頭にimportを追加します。

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
```

`english_words` には、英単語を集めた `nouns` というリストが用意されています。
中身を確認したいときは、エディタで `nouns` を右クリックして `Go to Definition` を選ぶと、定義された場所へ移動できます。
パッケージのコードも、Dartで書かれた普通のコードです。

テンプレートのカウンターアプリの、数字を表示している `Text` を次のように書き換えると、0番目の単語が表示されます。

```dart
Text(
  nouns[0],
  style: Theme.of(context).textTheme.headlineMedium,
),
```

## ランダムに表示する

乱数の機能は、Dart標準の `dart:math` にあります。
`Random().nextInt(n)` は、0以上n未満の整数をランダムに返します。
`n` にリストの長さを渡すと、インデックスとして使える値が得られます。

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';
import 'dart:math';
```

```dart
Text(
  nouns[Random().nextInt(nouns.length)],
  style: Theme.of(context).textTheme.headlineMedium,
),
```

`build` の中で乱数を使っているので、`build` が実行されるたびに単語が変わります。
ホットリスタートだけでなく、ホットリロードのときや、右下のボタンを押したときも変わります。
ボタンを押すと `setState` によって `build` が再度実行されるからです。
`build` はFlutterの都合で何度も実行されるので、1度だけ決めたい値は `build` の中で作らず、フィールドに持たせます。

`english_words` は一例にすぎません。
公開されているパッケージの多くは、pub.devで探してドキュメントを読み、`pubspec.yaml` に追加してimportするという同じ流れで使えます。

::: tip 第6部のまとめ
- `Navigator.push` で画面を積み、`Navigator.pop` で取り除きます。
- `TextField` の `onChanged` で入力内容を受け取ります。
- 次の画面へは、コンストラクタの引数で値を渡します。
- パッケージは `pubspec.yaml` に追加してimportします。
:::
