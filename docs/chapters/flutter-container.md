`Container` は、子のWidgetを入れる箱のようなWidgetです。
色や大きさ、周囲の余白を指定できます。

## 色と大きさ

`child` に中身を、`color` に背景色を指定します。
大きさを指定しないと、箱は中身に合わせた大きさになります。
`width` と `height` を指定すると、その大きさになります。

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
          body: Container(
            color: Colors.amber,
            width: 300,
            height: 300,
            child: const Text('初めてのコンテナ'),
          ),
        ),
      ),
    );
  }
}
```

`child` にはどんなWidgetも入れられるので、`Container` の中に `Container` を入れて入れ子にすることもできます。

## marginとpadding

余白には2種類あります。

- `margin`：箱の外側の余白です。周囲との間隔を指定します。
- `padding`：箱の内側の余白です。枠と中身の間隔を指定します。

`margin` だけ指定すると箱の位置が動き、`padding` だけ指定すると箱はそのままで文字の位置が動きます。
HTMLのCSSを学んだことがあれば、同じ考え方です。

```dart
Container(
  color: Colors.amber,
  width: 300,
  height: 300,
  margin: const EdgeInsets.all(40),
  padding: const EdgeInsets.only(left: 50),
  child: const Text('初めてのコンテナ'),
)
```

## EdgeInsetsの指定方法

余白は `EdgeInsets` で指定します。
よく使う指定方法は次のとおりです。

| 書き方 | 意味 |
| --- | --- |
| `EdgeInsets.all(40)` | 上下左右すべてに40 |
| `EdgeInsets.only(left: 30, top: 40)` | 指定した辺だけ（他は0） |
| `EdgeInsets.fromLTRB(20, 10, 0, 0)` | 左、上、右、下の順に指定 |
| `EdgeInsets.symmetric(vertical: 8, horizontal: 16)` | 上下と左右をそれぞれ揃えて指定 |

`LTRB` は Left、Top、Right、Bottom の頭文字です。
