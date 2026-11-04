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

たとえば `runApp(MyApp());` と書くと、次のような指摘が表示されます。

```text
Use 'const' with the constructor to improve performance.
```

`const` を付けると、同じWidgetを作り直さずに再利用できるので、性能がよくなるという指摘です。
実際のアプリ開発では、この種の指摘には従うのが基本です。

## lintの警告を消す

学習中は、`const` の指摘が多く出て、大事なエラーが目立ちにくくなることがあります。
その場合は、`pubspec.yaml` の次の行の先頭に `#` を付けてコメントアウトすると、警告を止められます。

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  # flutter_lints: ^4.0.0
```

バージョンの数字はプロジェクトによって異なります。
また、プログラムの動作は変わりません。
`const` を付けないことによる性能の差は、小さなアプリならほとんど問題になりません。
