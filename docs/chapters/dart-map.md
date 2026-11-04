生徒の名前と点数を結び付けて管理したいとき、リストを2つ使う方法があります。

```dart
void main() {
  List<String> names = ['田中', '鈴木', '佐藤'];
  List<int> scores = [85, 92, 78];

  int index = names.indexOf('田中');
  print(scores[index]);
}
```

動きますが、名前から番号を調べる手間がかかります。
マップを使うと、名前を指定して直接点数を取り出せます。

## マップとは

マップは、キーと値のペアを管理するデータ構造です。
電話帳で人の名前から電話番号を探したり、辞書で単語から意味を探したりするのと同じ関係です。

キーは重複できません。
同じキーが複数あると、どの値を指すのか決められないからです。
一方、値は重複してもかまいません。

リストとマップは、次のように使い分けます。

- リスト：順序に意味があるデータ、同じ値が複数あるデータ、番号で扱いたいデータ
- マップ：名前やIDなどのキーで値を探したいデータ

## マップの作成とアクセス

マップは波括弧で作り、キーと値をコロンでつなぎます。
`Map<String, int>` は、キーが `String` 型で値が `int` 型のマップです。
値を取り出すときは、リストと同じ角括弧にキーを指定します。

```dart
void main() {
  Map<String, int> fruitPrices = {
    'リンゴ': 150,
    'バナナ': 100,
    'オレンジ': 120,
  };

  print(fruitPrices['リンゴ']);
  print(fruitPrices['バナナ']);
  print(fruitPrices['ブドウ']); // 存在しないキー
  print(fruitPrices); // 全体を表示
}
```

```text
150
100
null
{リンゴ: 150, バナナ: 100, オレンジ: 120}
```

存在しないキーを指定すると、`null` が返ります。
`null` は「値がない」ことを表す特別な値です。

空のマップは次のように作れます。

```dart
void main() {
  Map<String, int> scores = {};
  print(scores);
}
```

## 追加、更新、削除

キーを指定して代入すると、キーがなければ追加され、あれば値が更新されます。
削除には `remove` を使います。

```dart
void main() {
  Map<String, String> capitals = {
    '日本': '東京',
    'アメリカ': 'ワシントンD.C.',
  };

  capitals['フランス'] = 'パリ'; // 追加
  print(capitals);

  capitals['日本'] = 'TOKYO'; // 更新
  print(capitals);

  capitals.remove('アメリカ'); // 削除
  print(capitals);
}
```

```text
{日本: 東京, アメリカ: ワシントンD.C., フランス: パリ}
{日本: TOKYO, アメリカ: ワシントンD.C., フランス: パリ}
{日本: TOKYO, フランス: パリ}
```

## キーの存在確認とプロパティ

`containsKey` で、キーが存在するかどうかを調べられます。

```dart
void main() {
  Map<String, int> productPrices = {
    'ノート': 200,
    'ペン': 100,
    '消しゴム': 80,
  };

  if (productPrices.containsKey('ペン')) {
    print('ペンの価格: ${productPrices['ペン']}円');
  }

  if (!productPrices.containsKey('鉛筆')) {
    print('鉛筆は商品リストにありません');
  }

  print(productPrices.length); // ペアの数
  print(productPrices.isEmpty); // 空かどうか
  print(productPrices.keys); // すべてのキー
  print(productPrices.values); // すべての値
}
```

```text
ペンの価格: 100円
鉛筆は商品リストにありません
3
false
(ノート, ペン, 消しゴム)
(200, 100, 80)
```

## マップを繰り返し処理する

`forEach` を使うと、キーと値の組を順に処理できます。
`keys` と `for-in` を組み合わせても同じことができます。

```dart
void main() {
  Map<String, String> dictionary = {
    'apple': 'リンゴ',
    'book': '本',
    'cat': '猫',
  };

  dictionary.forEach((key, value) {
    print('$key: $value');
  });

  for (String word in dictionary.keys) {
    print('$word: ${dictionary[word]}');
  }
}
```

::: tip 第2部のまとめ
- プログラムは `main` から始まり、基本的に上から順に実行されます。
- エラーは、コンパイルエラーか実行時エラーかを区別し、場所と内容を読んで直します。
- 変数には型があり、`=` は代入、`==` は比較です。
- 条件分岐は `if`、繰り返しは `for` と `while` で書きます。
- 順序で扱う値はリストに、キーで探す値はマップに入れます。
:::
