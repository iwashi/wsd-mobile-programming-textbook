この章は発展の内容で、講義動画では扱いません。

決まった選択肢のどれかを表すときは `enum` を、値に応じて処理を分けるときは `switch` を使います。

## enum

信号の色を文字列で `'red'` のように持つと、`'rad'` と書き間違えてもコンパイルエラーになりません。
`enum` で選択肢を定義すると、定義にない値を書いた時点でコンパイルエラーになります。

```dart
enum Signal { red, yellow, green }

void main() {
  Signal signal = Signal.red;

  print(signal);
  print(signal.name);
  print(signal == Signal.red);
  print(Signal.values);
}
```

```text
Signal.red
red
true
[Signal.red, Signal.yellow, Signal.green]
```

`name` は選択肢の名前を文字列で返し、`values` はすべての選択肢をリストで返します。
リストは第16章で学びます。
Flutterでも `TextDirection.ltr` や `Brightness.dark` のように、多くの指定に `enum` が使われています。

## switch文

1つの値を複数の候補と比べるときは、`else if` を重ねるより `switch` のほうが読みやすくなります。
`case` に候補を書き、一致したものだけを実行します。

```dart
enum Signal { red, yellow, green }

void main() {
  Signal signal = Signal.yellow;

  switch (signal) {
    case Signal.red:
      print('止まれ');
    case Signal.yellow:
      print('注意');
    case Signal.green:
      print('進め');
  }
}
```

```text
注意
```

`enum` に対する `switch` では、選択肢をすべて書かないとコンパイルエラーになります。
あとで `enum` に選択肢を追加したとき、処理を書き忘れた場所をコンパイラが教えてくれます。

`int` や `String` のように候補を書き切れない型では、`default` にその他の場合を書きます。

```dart
void main() {
  String command = 'stop';

  switch (command) {
    case 'start':
      print('開始します');
    case 'stop':
      print('停止します');
    default:
      print('不明なコマンドです');
  }
}
```

```text
停止します
```

## switch式

`switch` は、値を返す式としても書けます。
条件に応じて変数の値を決めるときに便利です。
`_` は、ほかのどれにも当てはまらない場合を表します。

```dart
enum Signal { red, yellow, green }

void main() {
  Signal signal = Signal.green;

  String message = switch (signal) {
    Signal.red => '止まれ',
    Signal.yellow => '注意',
    Signal.green => '進め',
  };
  print(message);

  int score = 75;
  String grade = switch (score) {
    >= 80 => 'A',
    >= 60 => 'B',
    _ => 'C',
  };
  print(grade);
}
```

```text
進め
B
```

式なので、第32章で学ぶFlutterの `Container` のように、引数の中にも直接書けます。

```dart
Container(
  color: switch (signal) {
    Signal.red => Colors.red,
    Signal.yellow => Colors.yellow,
    Signal.green => Colors.green,
  },
)
```
