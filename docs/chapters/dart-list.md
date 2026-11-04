30人分の点数を扱うのに、`score1`、`score2` と変数を30個宣言するのは現実的ではありません。
リストを使うと、複数の値を順番に並べて1つの変数で管理できます。

## リストの作成とアクセス

リストは角括弧で作ります。
`List<int>` は整数のリスト、`List<String>` は文字列のリストを表します。
`var` を使えば型は推論されます。

```dart
void main() {
  List<int> scores = [85, 72, 98, 65, 88];
  List<String> names = ['田中', '鈴木', '佐藤'];
  List<String> empty = [];
  var fruits = ['リンゴ', 'バナナ', 'オレンジ'];

  print(scores);
  print(names);
  print(empty);
  print(fruits);
}
```

宣言した型と違う値は入れられません。
`List<String>` に数値を入れるとコンパイルエラーになります。

要素は、`リスト[インデックス]` で取り出します。
インデックスは0から数える位置の番号です。
間違えやすいので、特に注意してください。

```dart
void main() {
  List<String> fruits = ['リンゴ', 'バナナ', 'オレンジ'];

  print(fruits[0]); // 先頭の要素
  print(fruits[2]); // 3番目の要素

  fruits[1] = 'メロン'; // 要素を置き換える
  print(fruits);
}
```

```text
リンゴ
オレンジ
[リンゴ, メロン, オレンジ]
```

## 長さとよく使うプロパティ

`length` で要素の数を取得できます。
最後の要素のインデックスは、要素数から1を引いた値です。

```dart
void main() {
  List<int> numbers = [3, 5, 7, 9];

  print(numbers.length); // 要素数
  print(numbers[numbers.length - 1]); // 最後の要素
  print(numbers.isEmpty); // 空かどうか
  print(numbers.isNotEmpty); // 空でないかどうか
  print(numbers.first); // 先頭の要素
  print(numbers.last); // 最後の要素
}
```

```text
4
9
false
true
3
9
```

範囲外のインデックスを指定すると、実行時エラーになります。
たとえば `numbers[numbers.length]` は存在しない要素を指すので、`RangeError` が発生します。

## 要素を追加する

```dart
void main() {
  List<String> todoList = ['宿題をする', '部屋を掃除する'];

  todoList.add('買い物に行く'); // 末尾に追加
  print(todoList);

  todoList.insert(1, '洗濯をする'); // 指定の位置に挿入
  print(todoList);

  todoList.addAll(['料理をする', '寝る']); // 別のリストをまとめて追加
  print(todoList);
}
```

```text
[宿題をする, 部屋を掃除する, 買い物に行く]
[宿題をする, 洗濯をする, 部屋を掃除する, 買い物に行く]
[宿題をする, 洗濯をする, 部屋を掃除する, 買い物に行く, 料理をする, 寝る]
```

## 要素を削除する

```dart
void main() {
  var colors = ['赤', '青', '緑', '青'];
  colors.remove('青'); // 値を指定して、最初に見つかった1つを削除
  colors.remove('紫'); // 存在しない値は何も起きない
  print(colors);

  var animals = ['犬', '猫', '鳥', '魚'];
  animals.removeAt(1); // インデックスを指定して削除
  print(animals);

  animals.removeLast(); // 最後の要素を削除
  print(animals);

  animals.clear(); // すべて削除
  print(animals);
}
```

```text
[赤, 緑, 青]
[犬, 鳥, 魚]
[犬, 鳥]
[]
```

## リストを繰り返し処理する

`length` と `for` を組み合わせると、全要素を順に処理できます。
人が読む表示では1番目から数えるほうが自然なので、`i + 1` と書いています。

```dart
void main() {
  List<int> scores = [85, 72, 98];

  for (int i = 0; i < scores.length; i++) {
    print('${i + 1}番目の点数: ${scores[i]}');
  }
}
```

```text
1番目の点数: 85
2番目の点数: 72
3番目の点数: 98
```

インデックスが不要なら、`for-in` を使うともっと簡単に書けます。
リストの先頭から順に要素を取り出して、変数に入れてくれます。

```dart
void main() {
  List<String> fruits = ['リンゴ', 'バナナ', 'オレンジ'];

  for (String fruit in fruits) {
    print(fruit);
  }
}
```

## リストの中のリスト

リストの要素に別のリストを入れることもできます。
表のようなデータを表現できますが、深くネストすると読みにくくなるので、ほどほどにしましょう。

```dart
void main() {
  List<List<int>> allScores = [
    [80, 90],
    [70, 85, 60],
  ];

  print(allScores[1][0]); // 2つ目のリストの先頭

  for (int i = 0; i < allScores.length; i++) {
    for (int j = 0; j < allScores[i].length; j++) {
      print('${i + 1}人目の${j + 1}科目め: ${allScores[i][j]}');
    }
  }
}
```
