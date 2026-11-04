::: tip 第6部の到達目標
- `Navigator` で複数の画面を移動できる
- `TextField` の入力を受け取り、次の画面へ値を渡せる
- pub.devで外部パッケージを探して追加できる
:::

ここからの2章で、複数の画面を持つアプリを作ります。
完成するアプリは次のように動きます。

1. 最初の画面（Screen 0）のボタンを押すと、Screen Aに移動します。
2. Screen Aの入力欄に文字を入力すると、画面下部の表示が入力に合わせて変わります。
3. Screen Aのボタンを押すと、入力した文字を持ってScreen Bに移動します。
4. Screen Bは、受け取った文字を表示します。

この章では、画面の移動までを作ります。

## 最初の画面を作る

新しいプロジェクトを作り、`lib/main.dart` を次のように書き換えます。
ここでは `runApp` に `MaterialApp` を直接渡しています。
`MaterialApp` の `title` はアプリの名前、`home` は最初の画面です。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      title: 'Multi Screen App',
      home: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen 0'),
      ),
      body: const Center(
        child: ElevatedButton(
          onPressed: null,
          child: Text('Screen Aに移動'),
        ),
      ),
    );
  }
}
```

## 画面をファイルに分ける

アプリが大きくなると、1つのファイルにすべてを書くと読みにくくなります。
画面ごとにファイルを分けましょう。
`lib` の下に `screens` フォルダを作り、`screen_a.dart` と `screen_b.dart` を作成します。

`screen_a.dart` には次のように書きます。
入力欄（`TextField`）の中身は次の章で実装します。

```dart
import 'package:flutter/material.dart';

class ScreenA extends StatefulWidget {
  const ScreenA({super.key});

  @override
  State<ScreenA> createState() => _ScreenAState();
}

class _ScreenAState extends State<ScreenA> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen A'),
      ),
      body: const Column(
        children: [
          TextField(),
          ElevatedButton(
            onPressed: null,
            child: Text('初期画面に戻る'),
          ),
          ElevatedButton(
            onPressed: null,
            child: Text('Screen Bに移動'),
          ),
          Text('hoge'),
        ],
      ),
    );
  }
}
```

## Navigator.pushで移動する

`lib/main.dart` のボタンに移動の処理を書きます。
`Navigator.push` が画面を移動する命令です。
第1引数に `context` を、第2引数に `MaterialPageRoute` を渡し、その `builder` の関数で移動先のWidgetを返します。
ここは決まった書き方なので、形のまま覚えてください。

```dart
import 'package:flutter/material.dart';
import 'package:flutter_application_5/screens/screen_a.dart';

void main() {
  runApp(
    const MaterialApp(
      title: 'Multi Screen App',
      home: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen 0'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) {
              return const ScreenA();
            }));
          },
          child: const Text('Screen Aに移動'),
        ),
      ),
    );
  }
}
```

2行目の `import` で、別のファイルの `ScreenA` を使えるようにしています。
`flutter_application_5` の部分はプロジェクト名なので、自分のプロジェクト名に置き換えます。
`ScreenA` と入力して候補から選ぶと、エディタがこの行を自動で追加してくれます。

ボタンを押すと、Screen Aに移動します。
`AppBar` の左上に戻るボタンが自動で表示され、押すと前の画面に戻ります。

## Navigator.popで戻る

`Navigator.pop` を呼ぶと、前の画面に戻ります。
Screen Aの `初期画面に戻る` ボタンの処理を書きます。
`body` の `const` を外してください。

```dart
ElevatedButton(
  onPressed: () {
    Navigator.pop(context);
  },
  child: const Text('初期画面に戻る'),
),
```

## 画面遷移とスタック

`push` と `pop` という名前は、第33章で学んだスタックの操作と同じです。
Flutterは画面をスタックとして管理しています。
`push` で画面を積み重ね、`pop` で一番上の画面を取り除くと、その下の画面が現れます。
