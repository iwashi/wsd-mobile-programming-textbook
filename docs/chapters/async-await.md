`async` と `await` を使うと、非同期処理を同期処理のように上から下へ書けます。

## Future

`Future` は「将来に値が得られる」ことを表す型です。
`Future<String>` なら、処理が終わると `String` の値が得られます。
第34章で学んだジェネリクスの書き方です。

## asyncとawaitの書き方

前の章の `task2` と `main` を書き換えます。

```dart
void task1() {
  print('Task 1');
}

Future<String> task2() async {
  Duration threeSeconds = Duration(seconds: 3);
  String result = '';

  await Future.delayed(threeSeconds, () {
    result = 'Task 2の結果';
    print('Task 2');
  });

  return result;
}

void task3(String previousResult) {
  print('Task 3: $previousResult');
}

void main() async {
  task1();
  String result = await task2();
  task3(result);
}
```

```text
Task 1
Task 2
Task 3: Task 2の結果
```

変更点は3つです。

1つ目に、関数の丸括弧の後ろに `async` を付けました。
`await` を使う関数には `async` が必要です。

2つ目に、`async` の関数の戻り値の型を `Future<String>` にしました。
`return` するのは `String` ですが、呼び出した側がすぐに受け取るのは `Future` です。

3つ目に、`Future` の前に `await` を付けました。
`await` は、その処理が終わるのを待ち、`Future` の中の値を取り出します。
`task2` の結果を `String` の変数で受けられるのは、この働きによります。
`main` でも `await` を使うので、`main` にも `async` を付けています。

## awaitはアプリを止めない

`await` は「待つ」という意味ですが、前の章の `sleep` とは違います。
`sleep` はプログラム全体を止めますが、`await` で止まるのはその関数の続きだけです。
待っている間も他の処理は進むので、Flutterアプリの画面は操作できる状態のままです。

`Future.delayed` を入れ子にする必要もなく、処理の順に上から読めるコードになります。
Flutterでも、次の章の画面遷移や、その次の章の通信でこの書き方を使います。
