カウンターアプリを終了して起動し直すと、数字は0に戻ります。
ToDoアプリなら、起動するたびに内容が消えていては使えません。
アプリを終了しても状態が残るように保存することを、永続化と呼びます。

## 永続化の方法

永続化は、どこに保存するかと、どんな形式で保存するかで分類できます。

保存場所は、大きく2つに分けられます。

- デバイス上：スマートフォンのストレージに保存します。手軽ですが、機種を変更すると移行の工夫が必要です。
- クラウド上：インターネット上のサーバーに保存します。どの端末からでも同じデータにアクセスできます。大規模なサービスではこちらが主流です。

保存の形式にも、いくつかの種類があります。

- キーと値の組：Dartのマップのように、キーに値を対応させて保存します。
- データベース：大量のデータの検索や更新に適した仕組みです。SQLで操作するリレーショナルデータベースなどがあります。

ここでは、もっとも手軽な、デバイス上にキーと値の組で保存する方法を学びます。

## shared_preferences

[shared_preferences](https://pub.dev/packages/shared_preferences) は、キーと値の組をデバイスに保存する定番のパッケージです。
`pubspec.yaml` に追加します。

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  shared_preferences: ^2.5.3
```

`flutter pub get` がSDKのバージョンとの不整合で失敗することがあります。
その場合はエラーメッセージを読み、指示に従ってパッケージのバージョンを調整します。

基本の使い方は次のとおりです。
`SharedPreferences.getInstance` でオブジェクトを取得し、`setInt` で書き込み、`getInt` で読み出します。

```dart
final SharedPreferences prefs = await SharedPreferences.getInstance();

// 書き込み
await prefs.setInt('counter', 10);

// 読み出し（キーが存在しないとnullが返る）
final int? counter = prefs.getInt('counter');
```

## カウンターを永続化する

テンプレートのカウンターアプリの `_MyHomePageState` を書き換えます。
`lib/main.dart` の先頭にimportを追加してください。

```dart
import 'package:shared_preferences/shared_preferences.dart';
```

ボタンを押したときに値を保存し、起動したときに値を読み出します。

```dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _renderCounterValue();
  }

  void _renderCounterValue() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter = prefs.getInt('counter') ?? 0;
    });
  }

  void _incrementCounter() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      _counter++;
      prefs.setInt('counter', _counter);
    });
  }

  // buildメソッドは変更しない
}
```

## initStateとライフサイクル

`StatefulWidget` の状態オブジェクトは、作成されてから破棄されるまでにいくつかの段階を通ります。
これをライフサイクルと呼びます。
主な流れは次のとおりです。

1. `createState`：状態オブジェクトが作られます。
2. `initState`：初期化のために1回だけ呼ばれます。
3. `build`：画面が構築されます。`setState` のたびに再度呼ばれます。
4. `dispose`：破棄されるときに呼ばれます。

起動時に一度だけ行いたい処理は、`initState` をオーバーライドして書きます。
ここで保存した値を読み出します。
最初に `super.initState()` を呼び出すのが決まりです。

`getInt` は、一度も保存していないと `null` を返します。
第21章で学んだ `??` を使い、その場合は0としています。

`initState` 自体には `async` を付けられないので、読み出しの処理は別のメソッドに分けています。

## 動作を確認する

ボタンを何回か押した後、アプリを終了して起動し直します。
iOSシミュレータでは、`command + shift + H` を2回押すとアプリの切り替え画面が開き、上にスワイプすると終了できます。
もう一度アプリを開いて、数字が残っていれば成功です。

`shared_preferences` は、`int` のほかに `String`、`bool`、`double`、`List<String>` を保存できます。
ただし、保存先は暗号化されていないので、パスワードなどの機密情報は保存しません。
理由と代わりの方法は、発展の第53章で説明します。

AIコーディングは、講義動画「6_13 AIコーディング」で学びます。

::: tip 第7部のまとめ
- 時間のかかる処理は非同期処理にして、待っている間もアプリを操作できるようにします。
- `await` は `Future` の完了を待って値を取り出し、使う関数には `async` を付けます。
- `Navigator.push` の戻り値を `await` で待つと、`pop` で返された値を受け取れます。
- Web APIの結果はJSONで受け取り、マップとリストとして値を取り出します。
- 起動時に一度だけ行う処理は `initState` に書きます。
:::
