この章は発展の内容で、講義動画では扱いません。

第17章で学んだ関数を、値として扱います。
`onPressed` に関数を渡せるのも、この仕組みがあるからです。

## 関数を変数に入れる

Dartの関数は、数値や文字列と同じ値です。
変数に入れて、その変数から呼び出せます。

```dart
int twice(int x) {
  return x * 2;
}

void main() {
  int Function(int) calculate = twice;
  print(calculate(3));
}
```

```text
6
```

`int Function(int)` は、「`int` を受け取って `int` を返す関数」を表す型です。
`twice` に丸括弧を付けていない点に注意してください。
`twice` は関数そのもの、`twice(3)` は関数を呼び出した結果です。

## 関数を引数に渡す

関数を受け取る関数を、高階関数と呼びます。
次の `repeat` は、何回繰り返すかと、毎回何をするかを受け取ります。

```dart
void repeat(int times, void Function(int) action) {
  for (int i = 0; i < times; i++) {
    action(i);
  }
}

void showNumber(int number) {
  print('$number番目');
}

void main() {
  repeat(2, showNumber);
}
```

```text
0番目
1番目
```

Flutterの `onPressed` も同じ形です。
引数がなく戻り値もない関数を受け取ります。
Flutterでは、この型に `VoidCallback` という別名が付いています。

## 無名関数とアロー関数

一度しか使わない関数は、名前を付けずにその場で書けます。
これを無名関数と呼びます。
`setState` や `onPressed` に渡してきた `() { ... }` が無名関数です。

処理が1つの式だけなら、`=>` を使って短く書けます。
`=> 式` は `{ return 式; }` と同じ意味で、このように書いた関数をアロー関数と呼びます。
`createState() => _MyAppState()` もこの書き方です。

```dart
void repeat(int times, void Function(int) action) {
  for (int i = 0; i < times; i++) {
    action(i);
  }
}

int twice(int x) => x * 2;

void main() {
  repeat(2, (number) {
    print('$number番目');
  });

  repeat(2, (number) => print(twice(number)));
}
```

```text
0番目
1番目
0
2
```

無名関数の引数の型は、渡す先の型から推論されるので省略できます。

## whereとmapでリストを加工する

リストには、関数を受け取るメソッドが用意されています。
`where` は条件に合う要素だけを選び、`map` はすべての要素を変換します。

```dart
void main() {
  List<int> scores = [85, 42, 98, 60];

  List<int> passed = scores.where((score) => score >= 60).toList();
  print(passed);

  List<String> labels = scores.map((score) => '$score点').toList();
  print(labels);

  print(scores.any((score) => score == 100)); // 1つでも当てはまるか
  print(scores.every((score) => score >= 40)); // すべて当てはまるか
}
```

```text
[85, 98, 60]
[85点, 42点, 98点, 60点]
false
true
```

`where` と `map` の結果は `Iterable` という型で、リストそのものではありません。
`List` が必要なときは `toList()` で変換します。

`for` で書くと、結果を入れるリストの準備や `add` が必要です。
`where` と `map` なら、何を選ぶのか、どう変換するのかだけを書けます。
Flutterでは、データのリストをWidgetのリストに変換するときに `map` をよく使います。

```dart
Column(
  children: names.map((name) => Text(name)).toList(),
)
```

## 並べ替えと集計

`sort` は、リスト自体を並べ替えます。
引数の関数で順序を指定でき、`compareTo` は2つの値の大小を比較するメソッドです。
`fold` は、初期値から始めて要素を順に足し込むような集計に使います。

```dart
void main() {
  List<int> scores = [85, 42, 98];

  scores.sort((a, b) => b.compareTo(a)); // 大きい順
  print(scores);

  int total = scores.fold(0, (sum, score) => sum + score);
  print(total);
}
```

```text
[98, 85, 42]
225
```
