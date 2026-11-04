## SafeArea

前の章のコードから `appBar` を消すと、画像が画面の左上に移動し、時計や電波の表示と重なります。
OSがステータスバーなどに使う領域まで、アプリが描画しているからです。

全画面を使いたいアプリではこの動きが役に立ちますが、多くのアプリでは重ならないほうが使いやすくなります。
`SafeArea` で囲むと、子のWidgetをOSの領域を避けた範囲に収められます。

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
      home: SafeArea(
        child: Scaffold(
          body: Image.asset('images/logo.webp'),
        ),
      ),
    );
  }
}
```

`Scaffold` にカーソルを合わせて `command + .` を押し、`Wrap with widget...` を選ぶと、既存のWidgetを別のWidgetで囲めます。
`SafeArea` のように、子を1つ持つWidgetは `child` で受け取ります。

## lintの警告を読む

エディタで、コードの下に青い波線が表示されることがあります。
これはlintと呼ばれる機能による指摘で、プログラムを実行せずにコードの書き方を調べ、改善点を教えてくれます。

たとえばFlutterのプロジェクトで `print` を使うと、次のような指摘が表示されます。

```text
Don't invoke 'print' in production code.
```

配布するアプリのコードに `print` を残さないように、という指摘です。
実際のアプリ開発では、この種の指摘には従うのが基本です。

## lintの警告を消す

本書では動作の確認に `print` を使うので、学習中はこの指摘が多く出て、大事なエラーが目立ちにくくなることがあります。
その場合は、プロジェクト直下の `analysis_options.yaml` にある `# avoid_print: false` の先頭の `#` を消すと、この指摘だけを止められます。

```yaml
linter:
  rules:
    avoid_print: false
```

`avoid_print` は、この指摘の規則の名前です。
インデントは変えないでください。
lintの設定を変えても、プログラムの動作は変わりません。

## constを付ける理由

本書のコードでは、`const Text('Hello')` のように多くのWidgetに `const` を付けています。
`const` を付けると、同じWidgetを作り直さずに再利用できるので、性能がよくなります。
付けなくても動きますし、性能の差は、小さなアプリならほとんど問題になりません。

古いバージョンのFlutterで作ったプロジェクトでは、`const` を付けられる箇所に `Use 'const' with the constructor to improve performance.` という指摘が表示されることがあります。
