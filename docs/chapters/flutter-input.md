`ElevatedButton` のほかにも、タップを受け取る方法があります。

## FloatingActionButton

`FloatingActionButton` は、画面の右下に浮かんで表示されるボタンです。
テンプレートのカウンターアプリの「+」ボタンがこれにあたります。
`Scaffold` の引数 `floatingActionButton` に指定します。

`onPressed` は `ElevatedButton` と同じです。
無名関数を書いてもよいですし、すでに定義したメソッドの名前を渡してもかまいません。
`child` には、機能を表すアイコンを置くのが一般的です。

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
  int _counter = 0;

  void _onMyButtonPressed() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('FABの例')),
        body: Center(
          child: Text('$_counter回押されました'),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _onMyButtonPressed,
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```

`Icons` には数多くのアイコンが用意されています。
`Icons.search` なら虫眼鏡、`Icons.desk` なら机のアイコンです。
ユーザーはアイコンから機能を推測するので、動作と一致するものを選びます。
「+」のボタンを押して検索が始まるとユーザーは戸惑います。

## GestureDetector

ボタン以外のWidgetをタップできるようにするには、`GestureDetector` で囲みます。
タップされたときの処理を `onTap` に指定します。
次のコードでは、文字列をタップするたびに表示が更新されます。

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
  String _message = 'ここをタップしてください';
  int _counter = 0;

  void _onMyButtonPressed() {
    setState(() {
      _counter++;
      _message = 'タップされました $_counter回目';
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('GestureDetectorの例')),
        body: Center(
          child: GestureDetector(
            onTap: _onMyButtonPressed,
            child: Text(_message),
          ),
        ),
      ),
    );
  }
}
```

`GestureDetector` には `onTap` のほかに、`onDoubleTap`（ダブルタップ）や `onLongPress`（長押し）なども用意されています。
