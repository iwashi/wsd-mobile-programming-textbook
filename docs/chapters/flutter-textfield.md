前の章のアプリに、文字の入力と画面間の値の受け渡しを追加します。

## TextFieldで入力を受け取る

`TextField` は文字を入力するWidgetです。
`onChanged` に指定した関数は、入力内容が変わるたびに呼ばれ、引数に現在の文字列が渡されます。
まず `print` で確認します。

```dart
TextField(
  onChanged: (value) {
    print(value);
  },
),
```

入力すると、`DEBUG CONSOLE` に内容が表示されます。

## 入力を画面に反映する

入力された文字を画面に表示するには、フィールドに保存して `Text` で表示します。
第35章で学んだとおり、画面を更新するには `setState` が必要です。

`TextField` は左右いっぱいに広がるので、`Padding` で囲んで余白を付けます。
以下が `screen_a.dart` の `_ScreenAState` の全体です。

```dart
class _ScreenAState extends State<ScreenA> {
  String _inputText = 'ここに値が表示されます';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen A'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(25.0),
            child: TextField(
              onChanged: (value) {
                setState(() {
                  _inputText = value;
                });
              },
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('初期画面に戻る'),
          ),
          const ElevatedButton(
            onPressed: null,
            child: Text('Screen Bに移動'),
          ),
          Text(_inputText),
        ],
      ),
    );
  }
}
```

## 値を受け取る画面を作る

次の画面に値を渡すには、受け取る側のコンストラクタに引数を用意します。
`screen_b.dart` を次のように書きます。

```dart
import 'package:flutter/material.dart';

class ScreenB extends StatelessWidget {
  final String textPassedFromScreenA;

  const ScreenB({super.key, required this.textPassedFromScreenA});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen B'),
      ),
      body: Center(
        child: Text('Screen Aから渡された値: $textPassedFromScreenA'),
      ),
    );
  }
}
```

受け取った値はこの画面で変更しないので、フィールドを `final` にしています。
`required` を付けているので、値を渡さずに `ScreenB` を作るとコンパイルエラーになります。

## 値を渡して移動する

`screen_a.dart` の先頭に `screen_b.dart` のimportを追加し、`Screen Bに移動` のボタンを実装します。
移動先の `ScreenB` を作るときに、現在の入力内容を引数で渡します。

```dart
ElevatedButton(
  onPressed: () {
    Navigator.push(context, MaterialPageRoute(builder: (context) {
      return ScreenB(textPassedFromScreenA: _inputText);
    }));
  },
  child: const Text('Screen Bに移動'),
),
```

Screen Aに入力して `Screen Bに移動` を押すと、Screen Bに入力内容が表示されます。

ここで渡した値は文字列ですが、引数の型を変えれば、数値やリスト、自作のクラスのオブジェクトなども渡せます。
