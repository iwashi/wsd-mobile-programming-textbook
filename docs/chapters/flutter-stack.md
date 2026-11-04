Widgetを重ねて表示する `Stack` というWidgetがあります。
同じ名前のデータ構造にスタックがあり、第40章の画面遷移の仕組みにも関わるので、先にこちらを説明します。

## データ構造のスタック

スタックは、データを積み重ねて管理する基本的なデータ構造です。
机に積んだ本は、上から順に取るのが簡単です。
同じように、スタックでは最後に入れたものから順に取り出します。
この性質をLIFO（Last In, First Out）と呼びます。

スタックに積む操作をプッシュ、取り出す操作をポップと呼びます。
一方、レジの行列のように、最初に入れたものから順に取り出す構造はキューと呼ばれます。
こちらの性質はFIFO（First In, First Out）と呼びます。

スタックは、これまで学んだリストで実装できます。

```dart
class Stack {
  final List<int> _stack = [];

  void push(int element) {
    _stack.add(element);
  }

  int pop() {
    if (_stack.isEmpty) {
      throw Exception('スタックが空です');
    }
    return _stack.removeLast();
  }

  int peek() {
    if (_stack.isEmpty) {
      throw Exception('スタックが空です');
    }
    return _stack.last;
  }
}

void main() {
  Stack stack = Stack();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  print(stack.pop());
  print(stack.peek());
}
```

```text
3
2
```

1、2、3の順に積んだので、`pop` は最後に積んだ3を返します。
`peek` は、取り出さずに一番上の値を見るメソッドで、ここでは2を返します。
`removeLast` は、リストの最後の要素を削除して、その値を返します。

## ジェネリクス

上の `Stack` は `int` しか扱えません。
しかしスタックの仕組みは、値の型に関係なく同じです。
文字列用に同じクラスをもう1つ書くのは無駄です。

ジェネリクスを使うと、型を引数のように受け取るクラスを作れます。
クラス名の後ろに `<T>` と書き、`int` だった部分を `T` に置き換えます。
`T` は仮の型を表す名前で、Typeの頭文字としてよく使われます。

```dart
class Stack<T> {
  final List<T> _stack = [];

  void push(T element) {
    _stack.add(element);
  }

  T pop() {
    if (_stack.isEmpty) {
      throw Exception('スタックが空です');
    }
    return _stack.removeLast();
  }
}

void main() {
  Stack<String> names = Stack<String>();
  names.push('hoge1');
  names.push('hoge2');
  print(names.pop());

  Stack<int> numbers = Stack<int>();
  numbers.push(1);
  numbers.push(2);
  print(numbers.pop());
}
```

```text
hoge2
2
```

実は、これまで使ってきた `List<int>` や `Map<String, int>` もジェネリクスです。
第35章で学ぶ `State<MyApp>` も同じ書き方です。

## StackでWidgetを重ねる

Flutterの `Stack` は、ここまでのデータ構造とは別のもので、取り出す順序の決まりはありません。
`children` に渡したWidgetを、先頭のものから順に下から重ねて表示します。
後ろに書いたものほど手前に表示されるので、大きいものを先に置きます。

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
      home: Scaffold(
        body: SafeArea(
          child: Stack(
            children: [
              Container(width: 300, height: 300, color: Colors.amber),
              Container(width: 200, height: 200, color: Colors.blue),
              Container(width: 100, height: 100, color: Colors.red),
              const CircularProgressIndicator(),
            ],
          ),
        ),
      ),
    );
  }
}
```

画像の上に文字を重ねるといった表現に使います。

## CircularProgressIndicator

上のコードの最後の `CircularProgressIndicator` は、回転する円を表示するWidgetです。
通信の待ち時間など、処理中であることを伝える場面でよく使います。
第7部で学ぶ非同期処理と組み合わせると効果的です。
