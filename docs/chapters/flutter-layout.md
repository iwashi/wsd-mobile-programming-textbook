複数のWidgetを並べるには、`Column` と `Row` を使います。

## ColumnとRow

`Scaffold` の `body` に渡せるWidgetは1つだけです。
`Container` を2つ続けて書くと、エラーになります。
複数のWidgetを置きたいときは、`Column`（縦に並べる）や `Row`（横に並べる）で束ねます。

子が複数あるので、引数は `child` ではなく `children` になり、Widgetのリストを渡します。

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
          body: Column(
            children: [
              Container(
                width: 100,
                height: 100,
                color: Colors.amber,
                child: const Text('1つ目のコンテナ'),
              ),
              Container(
                width: 100,
                height: 100,
                color: Colors.green,
                child: const Text('2つ目のコンテナ'),
              ),
              Container(
                width: 100,
                height: 100,
                color: Colors.grey,
                child: const Text('3つ目のコンテナ'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

`Column` を `Row` に書き換えるだけで、横並びになります。

## SizedBoxで間隔を空ける

子の間に一定の隙間を入れたいときは、`SizedBox` を挟みます。
指定した大きさの空の箱として働きます。
`Column` の中では `height` を、`Row` の中では `width` を指定します。

```dart
Column(
  children: [
    Container(width: 100, height: 100, color: Colors.amber),
    const SizedBox(height: 20),
    Container(width: 100, height: 100, color: Colors.green),
    const SizedBox(height: 5),
    Container(width: 100, height: 100, color: Colors.grey),
  ],
)
```

`Row` の中で `height` だけを指定しても、横の間隔は空きません。
並べる方向を意識して指定してください。

## 主軸と交差軸の配置

`Column` と `Row` の中の配置は、2つの軸で指定します。

- `mainAxisAlignment`：並べる方向（主軸）の配置です。`Column` では縦、`Row` では横を指します。
- `crossAxisAlignment`：主軸と直交する方向（交差軸）の配置です。`Column` では横、`Row` では縦を指します。

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  crossAxisAlignment: CrossAxisAlignment.end,
  children: [
    Container(width: 100, height: 100, color: Colors.amber),
    Container(width: 500, height: 100, color: Colors.green),
    Container(width: 100, height: 100, color: Colors.grey),
  ],
)
```

`MainAxisAlignment` の主な値は次のとおりです。

| 値 | 配置 |
| --- | --- |
| `start` | 先頭に寄せる（デフォルト） |
| `center` | 中央に寄せる |
| `end` | 末尾に寄せる |
| `spaceBetween` | 両端に寄せて、間を等間隔にする |
| `spaceEvenly` | 両端も含めてすべての間隔を等しくする |

`CrossAxisAlignment` の主な値には、`center`（デフォルト）、`start`、`end`、`stretch`（交差軸いっぱいに広げる）があります。
交差軸の配置の違いは、幅の異なる子を並べると確認できます。

値を順に変えて、保存するたびに表示がどう変わるかを試してください。

## Widgetで囲んで調整する

余白や中央寄せは、専用のWidgetで囲むことでも指定できます。
`command + .` のメニューから `Wrap with Padding` や `Wrap with Center` を選ぶと、すぐに囲めます。

```dart
Center(
  child: Padding(
    padding: const EdgeInsets.only(left: 20),
    child: Column(
      children: [
        Container(width: 100, height: 100, color: Colors.amber),
        Container(width: 100, height: 100, color: Colors.green),
      ],
    ),
  ),
)
```

`Padding` は子の周囲に余白を作るWidgetで、`Container` の `padding` と同じく `EdgeInsets` で指定します。
`Center` は子を中央に配置します。
ただしこの例では、子の `Container` は左右の中央に寄るだけで、上下は上端に並びます。
`Column` は、指定がなければ縦方向に使える高さいっぱいまで広がるからです。
上下にも中央に寄せるには、`Column` に `mainAxisAlignment: MainAxisAlignment.center` を指定します。
