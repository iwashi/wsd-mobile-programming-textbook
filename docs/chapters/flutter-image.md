画像を表示するには `Image` というWidgetを使います。
画像の取得元によって2つの方法があります。

## インターネット上の画像を表示する

`Image.network` にURLを渡すと、その画像をダウンロードして表示します。
Webページの画像のURLは、ブラウザで画像を右クリックして `画像アドレスをコピー` を選ぶと取得できます。

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
        appBar: AppBar(title: const Text('画像の表示')),
        body: Image.network('https://picsum.photos/250?image=9'),
      ),
    );
  }
}
```

`Image.network` は、第22章で学んだ名前付きコンストラクタです。

## アプリに同梱した画像を表示する

`Image.network` は手軽ですが、通信できないと表示できず、画像が大きいと表示にも時間がかかります。
常に使う画像は、アプリ自体に同梱するのが基本です。
同梱するファイルをアセットと呼びます。

手順は3つです。

1つ目に、プロジェクト直下に `images` フォルダを作り、画像ファイルを入れます。
ここでは `images/logo.webp` とします。

2つ目に、`pubspec.yaml` に画像の場所を書きます。
テンプレートにはコメントの形で例が書かれているので、`assets:` の部分のコメントを外して編集します。
VS Codeでは、行を選んで `command + /` を押すとコメントの有無を切り替えられます。

```yaml
flutter:
  uses-material-design: true

  assets:
    - images/logo.webp
```

`pubspec.yaml` はYAMLという形式のファイルで、インデントが階層構造を表します。
ずれると正しく読み込まれないので注意してください。

`pubspec.yaml` を保存すると、VS Codeが依存関係を更新する `flutter pub get` を自動で実行します。
実行されないときは、右上に表示されるボタンから実行するか、ターミナルでこのコマンドを実行します。

3つ目に、`Image.asset` で画像を指定します。

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
        appBar: AppBar(title: const Text('画像の表示')),
        body: Image.asset('images/logo.webp'),
      ),
    );
  }
}
```

画像が表示されないときは、まずファイル名の綴りを確認してください。
`pubspec.yaml` とコードの両方で、ファイル名が正しい必要があります。
ファイル名を直しても反映されないときは、いったんアプリを停止してから起動し直します。

## デバッグ用の表示を消す

開発中のアプリの右上には、`DEBUG` という帯が表示されます。
`MaterialApp` の引数で消すことができます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Text('DEBUGの帯が消えます'),
      ),
    ),
  );
}
```
