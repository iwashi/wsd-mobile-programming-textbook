::: tip 第5部の到達目標
- `StatefulWidget` と `setState` で、状態に応じて画面を更新できる
- ボタンやタップの操作を受け取れる
- テンプレートのカウンターアプリのコードを読んで説明できる
:::

テンプレートのカウンターアプリでは、ボタンを押すと数字が増えます。
このように時間とともに変わる値を状態（ステート）と呼び、状態に応じて表示を変えるWidgetを `StatefulWidget` と呼びます。

## StatefulWidgetの骨格

新しいプロジェクトを作り、`lib/main.dart` の中身を消して、次のように書きます。
`stful` と入力して `Flutter Stateful Widget` を選ぶと、ひな形が挿入されます。
クラス名のカーソルが複数箇所で点滅している状態で `MyApp` と入力すれば、まとめて変更できます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
```

クラスが2つあります。
`MyApp` はWidget本体で、`createState` で状態のオブジェクトを作ります。
`_MyAppState` はその状態を管理するクラスで、ここにフィールドと `build` を書きます。
ここは決まった形なので、最初は `_MyAppState` の中身だけに注目すれば十分です。

`Placeholder` は、作成中の場所を示す、バツ印の付いた仮のWidgetです。

## ボタンを配置する

文字とボタンを縦に並べます。
`ElevatedButton` はボタンのWidgetで、`child` にボタンの表示内容を、`onPressed` に押されたときの処理を指定します。
`onPressed` が `null` のとき、ボタンはグレーで押せない表示になります。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Button Flutter アプリ'),
        ),
        body: const Center(
          child: Column(
            children: [
              Text('ここの値が更新されます'),
              ElevatedButton(
                onPressed: null,
                child: Text('ボタン'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

## ボタンが押されたときの処理

`onPressed` には関数を渡します。
名前のない関数をその場に書く方法と、メソッドを定義してその名前を渡す方法があります。
名前のない関数は、無名関数と呼ばれます。

```dart
ElevatedButton(
  onPressed: () {
    print('ボタンが押されました');
  },
  child: const Text('ボタン'),
)
```

```dart
// _MyAppStateの中に定義する
void _onMyButtonPressed() {
  print('あるメソッドでボタンが押されました');
}
```

```dart
ElevatedButton(
  onPressed: _onMyButtonPressed,
  child: const Text('ボタン'),
)
```

メソッドの名前を渡すときは、丸括弧を付けません。
`_onMyButtonPressed()` と書くと、メソッドそのものではなく、メソッドを呼び出した結果を渡すことになります。
このメソッドの戻り値は `void` なので、コンパイルエラーになります。

`print` の出力は、アプリの画面ではなく、VS Codeの `DEBUG CONSOLE` タブに表示されます。
同じ内容が続くと、まとめられて左に回数が表示されます。

## setStateで画面を更新する

ボタンを押したら画面の文字が変わるようにします。
文字列をフィールドに持たせ、`Text` はフィールドの値を表示するようにします。

ところが、ボタンの処理でフィールドの値を変えるだけでは、画面は変わりません。
値が変わったことがFlutterに伝わらず、`build` が再び実行されないからです。
状態を変更する処理は `setState` で囲みます。
`setState` の引数は無名関数です。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _message = 'ここの値が更新されます';
  int _counter = 0;

  void _onMyButtonPressed() {
    setState(() {
      _counter++;
      _message = 'ボタンが押された！ $_counter回目';
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Button Flutter アプリ'),
        ),
        body: Center(
          child: Column(
            children: [
              Text(_message),
              ElevatedButton(
                onPressed: _onMyButtonPressed,
                child: const Text('ボタン'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

`setState` を呼ぶと、Flutterが `build` を実行し直し、新しい値で画面を描き直します。
画面の表示を変えるには `setState` が必須です。
ここで詰まることが多いので、しっかり覚えてください。

ホットリロードは状態を保持します。
初期値を変更しても反映されないときや、最初の状態に戻したいときは、ホットリスタートを使います。
