第42章では、`push` するときに次の画面へ値を渡しました。
この章では逆に、`pop` で前の画面へ値を返します。
`await` を使って受け取ります。

## 2つの画面を用意する

新しいプロジェクトの `lib` の下に `screens` フォルダを作り、`screen1.dart` と `screen2.dart` を作成します。
ここまでの復習なので、順に書いていきましょう。

`lib/main.dart` は次のとおりです。
`flutter_application_7` は自分のプロジェクト名に置き換えてください。

```dart
import 'package:flutter/material.dart';
import 'package:flutter_application_7/screens/screen1.dart';

void main() {
  runApp(
    const MaterialApp(
      title: 'popで値を返す',
      home: Screen1(),
    ),
  );
}
```

## popで値を返す

`lib/screens/screen2.dart` は次のとおりです。
`Navigator.pop` の第2引数に渡した値が、前の画面に返ります。
ここでは文字列を返していますが、数値やリスト、自作のクラスのオブジェクトなども返せます。

```dart
import 'package:flutter/material.dart';

class Screen2 extends StatelessWidget {
  const Screen2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen 2'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context, 'hoge');
          },
          child: const Text('To Screen1'),
        ),
      ),
    );
  }
}
```

## awaitで値を受け取る

`Navigator.push` の戻り値は `Future` です。
移動先の画面が閉じたときに、`pop` で渡された値が得られます。
`await` を使うので、`onPressed` の無名関数に `async` を付けます。

```dart
import 'package:flutter/material.dart';
import 'package:flutter_application_7/screens/screen2.dart';

class Screen1 extends StatelessWidget {
  const Screen1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Screen 1'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            String? data = await Navigator.push(context,
                MaterialPageRoute(builder: (context) {
              return const Screen2();
            }));
            print(data);
          },
          child: const Text('To Screen2'),
        ),
      ),
    );
  }
}
```

Screen 2へ移動し、`To Screen1` を押して戻ると、`DEBUG CONSOLE` に `hoge` と表示されます。

変数の型を `String?` にしているのは、値が返らない場合があるからです。
`AppBar` の戻るボタンで戻ると値が渡されず、結果は `null` になります。
