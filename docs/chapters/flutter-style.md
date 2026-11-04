## Material Design

Material Designは、Googleが公開しているデザインシステムです。
UIデザインには専門的な知識が必要ですが、Material Designには多くのデザイナーが積み重ねてきたベストプラクティスがまとめられています。
これに沿うことで、まとまりのある見た目のアプリを作りやすくなります。

これまで使ってきた `MaterialApp` は、FlutterでMaterial Designを使うための土台です。
詳しくは [Material Designの公式サイト](https://m3.material.io/) と [MaterialAppのドキュメント](https://api.flutter.dev/flutter/material/MaterialApp-class.html) を参照してください。
使い方に迷ったら、公式ドキュメントのサンプルコードから探すのが確実です。

## テーマで全体の色を変える

`MaterialApp` の `theme` に `ThemeData` を渡すと、アプリ全体の配色を指定できます。
`brightness` に `Brightness.dark` を指定すると、ダークモードになります。

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
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('テーマの例')),
        body: const Text('ダークモードの画面'),
      ),
    );
  }
}
```

配色を1色ずつ指定する代わりに、基準となる色を1つ指定して全体の配色を作ることもできます。
色には相性があるので、組み合わせを自動で整えてくれるこの方法が便利です。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.red),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('テーマの例')),
        body: const Text('赤を基準にした配色'),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: const Icon(Icons.add),
        ),
      ),
    ),
  );
}
```

## TextStyleで文字を装飾する

`Text` の `style` に `TextStyle` を渡すと、文字の見た目を細かく指定できます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: SafeArea(
          child: Text(
            'ボタンが押された',
            style: TextStyle(
              fontSize: 40,
              color: Colors.blue,
              decoration: TextDecoration.lineThrough,
              decorationColor: Colors.red,
              decorationStyle: TextDecorationStyle.dashed,
            ),
          ),
        ),
      ),
    ),
  );
}
```

| 引数 | 意味 |
| --- | --- |
| `fontSize` | 文字の大きさ |
| `color` | 文字の色 |
| `backgroundColor` | 背景の色 |
| `fontWeight` | 文字の太さ（`FontWeight.bold` など） |
| `decoration` | 線の種類 |
| `decorationColor` | 線の色 |
| `decorationStyle` | 線のスタイル（`dashed` で破線など） |

`decoration` には次の値を指定できます。

- `TextDecoration.underline`：下線
- `TextDecoration.overline`：上線
- `TextDecoration.lineThrough`：取り消し線

他にも多くの引数があります。
エディタの入力補完で候補を眺めたり、公式ドキュメントを調べたりして、いろいろ試してみてください。

::: tip 第4部のまとめ
- Flutterの画面はWidgetの組み合わせで、入れ子の構造をWidgetツリーと呼びます。
- `StatelessWidget` を継承し、`build` をオーバーライドして見た目を返します。
- `MaterialApp` がアプリの土台、`Scaffold` が画面の骨組みです。
- 子が1つなら `child`、複数なら `children` で渡します。
- 縦横の配置は `Column` と `Row`、重ねる配置は `Stack` で指定します。
- 余白は `EdgeInsets` で、全体の配色は `ThemeData` で指定します。
:::
