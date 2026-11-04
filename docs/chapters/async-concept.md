::: tip 第7部の到達目標
- 同期処理と非同期処理の違いを説明できる
- `async`、`await`、`Future` で非同期処理を書ける
- Web APIからJSONを取得して画面に表示できる
- `shared_preferences` で値を端末に保存できる
:::

Webからのデータ取得のように時間のかかる処理を、アプリを止めずに実行する方法を学びます。
第7部はこれまでより難しい内容ですが、実際に書いて動かすうちに理解できるようになります。

## 手元でDartを実行する

DartPadでは非同期処理の一部の機能が動かないので、この部では手元の環境でDartを実行します。

VS Codeのコマンドパレットから `Dart: New Project` を選び、`Console Application` を選びます。
保存先と名前を指定するとプロジェクトが作成され、`bin` フォルダの中に実行の起点となるファイルができます。
そのファイルを次のように書き換えて、右上のボタンから実行してください。

```dart
void task1() {
  print('Task 1');
}

void task2() {
  print('Task 2');
}

void task3() {
  print('Task 3');
}

void doSomeTasks() {
  task1();
  task2();
  task3();
}

void main() {
  doSomeTasks();
}
```

```text
Task 1
Task 2
Task 3
```

出力は `DEBUG CONSOLE` に表示されます。

## 同期処理と非同期処理

これまでのプログラムは、前の処理が終わってから次の処理に進みました。
これを同期処理と呼びます。

これに対して非同期処理では、時間のかかる処理の完了を待たずに、次の処理を始めます。
完了した処理の結果は、準備ができたときに受け取ります。

## なぜ非同期処理が必要なのか

処理にかかる時間は、種類によって大きく異なります。
プログラマーの間でよく引用される代表的な値は、次のとおりです。

| 処理 | 時間 |
| --- | --- |
| CPUのキャッシュの参照（L1） | 0.5ナノ秒 |
| メインメモリの参照 | 100ナノ秒 |
| カリフォルニアとオランダの間でのパケットの往復 | 150,000,000ナノ秒（150ミリ秒） |

ネットワーク越しの通信は、CPU内部の処理に比べて桁違いに時間がかかります。
もし通信を同期処理で行うと、結果が返るまで次の処理に進めず、その間アプリは操作を受け付けなくなり、固まったように見えます。

コーヒーショップの注文にたとえると理解しやすいでしょう。
客はレジで注文して代金を払ったら、飲み物が完成するまでスマートフォンを見るなど別のことをして待てます。
店員は注文を受けたら飲み物を作り、完成したら客を呼びます。
これが非同期処理です。
もし同期処理の世界なら、客は飲み物ができるまでレジの前で一切何もできません。

## 同期のスリープ

時間のかかる処理を手軽に再現するために、スリープを使います。
`Duration` は時間の長さを表すクラスです。
`dart:io` の `sleep` は、指定した時間だけプログラムの実行を止めます。

```dart
import 'dart:io';

void task1() {
  print('Task 1');
}

void task2() {
  Duration threeSeconds = Duration(seconds: 3);
  sleep(threeSeconds);
  print('Task 2');
}

void task3() {
  print('Task 3');
}

void main() {
  task1();
  task2();
  task3();
}
```

`Task 1` が表示され、3秒止まった後に `Task 2` と `Task 3` が表示されます。

## Future.delayedで非同期にする

`Future.delayed` を使うと、指定の時間が経った後で実行する処理を予約できます。
第1引数に待ち時間を、第2引数に実行する無名関数を渡します。

```dart
void task1() {
  print('Task 1');
}

void task2() {
  Duration threeSeconds = Duration(seconds: 3);
  Future.delayed(threeSeconds, () {
    print('Task 2');
  });
}

void task3() {
  print('Task 3');
}

void main() {
  task1();
  task2();
  task3();
}
```

```text
Task 1
Task 3
Task 2
```

`task2` は処理を予約したらすぐに終わるので、先に `Task 3` が表示され、3秒後に `Task 2` が表示されます。
これまで書いてきた `onPressed` も「ボタンが押されたら実行する処理」を登録するものなので、考え方は似ています。

## 結果を次の処理に渡せない問題

`task2` の結果を `task3` で使いたいとします。
素直に書くと次のようになりますが、うまくいきません。

```dart
void task1() {
  print('Task 1');
}

String task2() {
  String result = '';
  Duration threeSeconds = Duration(seconds: 3);
  Future.delayed(threeSeconds, () {
    result = 'Task 2の結果';
    print('Task 2');
  });
  return result;
}

void task3(String previousResult) {
  print('Task 3: $previousResult');
}

void main() {
  task1();
  String result = task2();
  task3(result);
}
```

```text
Task 1
Task 3: 
Task 2
```

`task2` は3秒待たずに空の `result` を返すので、`task3` には空文字列が渡ります。
`task3` の呼び出しを `Future.delayed` の無名関数の中に移せば結果を受け取れますが、この方法では非同期処理が続くたびに関数の中に関数を書くことになります。
このように待った後の処理を渡す関数をコールバックと呼びますが、ネストが深くなって読みにくくなることが問題です。

次の章では、この問題を解決する `async` と `await` を学びます。
