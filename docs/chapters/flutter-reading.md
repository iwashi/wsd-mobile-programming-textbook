`Flutter: New Project` で作られるカウンターアプリのコードを読みます。
ここまでの知識でほとんどの部分を理解できます。

コードを読むときは `main` から順に処理を追うのが基本です。
このアプリのように小さければ全体を読めますが、数十万行に及ぶ商用のアプリでは、必要な箇所に絞って読むことになります。

コメントを省いた全体は次のとおりです。

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
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: .fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: .center,
          children: [
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## アプリの入口とテーマ

`main` が `runApp` で `MyApp` を起動します。
`MyApp` は `StatelessWidget` で、`build` が `MaterialApp` を返します。

- `title`：アプリの名前です。
- `colorScheme`：第35章で学んだ、基準の色から配色を作る指定です。`deepPurple` を `red` に変えて保存すると、全体の色が変わります。
- `home`：最初の画面として `MyHomePage` を指定しています。タイトルは引数で渡しています。

## MyHomePage

`MyHomePage` は `StatefulWidget` です。
コンストラクタの `required this.title` で受け取った文字列を、フィールド `title` に格納します。
`final` が付いているので、一度決まると変わりません。
`StatefulWidget` のフィールドは、ここにあるように `final` にするのが基本で、変化する値は `State` 側に持たせます。

## _MyHomePageState

`_counter` が状態です。
`_incrementCounter` は、`setState` の中で `_counter` を1増やします。
第36章で学んだとおり、`setState` によって `build` が再度実行され、新しい値が画面に反映されます。

## buildの中身

`Theme.of(context)` は、`MaterialApp` で指定したテーマを取り出す決まった書き方です。
`context` はWidgetツリーの中での自分の位置を表すオブジェクトで、親のWidgetが持つ情報を取得するのに使います。

`AppBar` の `backgroundColor` には、テーマの配色から選んだ色を指定しています。
`headlineMedium` は、テーマで定められた見出し用の文字スタイルです。
`fontSize` の数値を直接書く代わりにテーマのスタイルを使うと、アプリ全体で見た目が揃います。

`widget.title` は、`State` の中から `StatefulWidget` 本体のフィールドを参照する書き方です。
`widget` は `State` クラスが持っているプロパティで、対応するWidgetのオブジェクトを指します。
これにより、`MyApp` で指定した `'Flutter Demo Home Page'` が `AppBar` に表示されます。

`.fromSeed` と `.center` は、型名を省略した書き方です。
`colorScheme` には `ColorScheme` 型を、`mainAxisAlignment` には `MainAxisAlignment` 型を渡すと決まっているので、`ColorScheme.fromSeed` や `MainAxisAlignment.center` の型名を省略できます。
古いバージョンのFlutterで作ったプロジェクトでは、省略せずに書かれています。

`FloatingActionButton` の `tooltip` は、ボタンを長押ししたときに表示される説明です。

## わからない部分をAIに尋ねる

コードの一部を選択して、ChatGPTやClaudeなどのAIツールに説明を頼むこともできます。
Flutterのように広く使われている技術なら、的確な説明を得られることが多いので、コードを読むときに活用してください。

::: tip 第5部のまとめ
- 時間とともに変わる値が状態で、`State` クラスのフィールドに持たせます。
- 状態の変更を `setState` で囲むと `build` が再度実行され、画面が更新されます。
- `onPressed` や `onTap` には、押されたときに実行する関数を渡します。
- `State` からWidget本体のフィールドは `widget` で参照します。
:::
