この章は発展の内容で、講義動画では扱いません。

シミュレータで整って見える画面でも、別の端末では崩れることがあります。
画面の大きさ、持つ向き、文字サイズの設定が、利用者ごとに異なるからです。
この章では、端末の違いを受け止める画面の作り方を学びます。

## 論理ピクセル

`Container` の `width: 100` は、画面の物理的なピクセル数を指定しているわけではありません。
Flutterの大きさの単位は論理ピクセルです。
高精細な画面では、1論理ピクセルを複数の物理ピクセルで描くので、精細さの異なる端末でも見た目の大きさがおおむね揃います。

ただし、論理ピクセルで数えた画面の幅そのものは端末ごとに異なります。
小さなスマートフォンとタブレットでは、大きく違います。
そのため、幅300のWidgetは、スマートフォンでは画面の大部分を占めても、タブレットでは一部しか占めません。

## MediaQueryで画面の情報を読む

`MediaQuery` を使うと、アプリが表示されている領域の情報を読み取れます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: ScreenInfoPage());
  }
}

class ScreenInfoPage extends StatelessWidget {
  const ScreenInfoPage({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final orientation = MediaQuery.orientationOf(context);
    final padding = MediaQuery.paddingOf(context);
    final ratio = MediaQuery.devicePixelRatioOf(context);

    return Scaffold(
      appBar: AppBar(title: const Text('画面の情報')),
      body: Column(
        children: [
          Text('幅: ${size.width}'),
          Text('高さ: ${size.height}'),
          Text('向き: ${orientation.name}'),
          Text('上の余白: ${padding.top}'),
          Text('1論理ピクセルあたりの物理ピクセル: $ratio'),
        ],
      ),
    );
  }
}
```

第40章と同じように、画面を `MaterialApp` とは別のクラスに分けています。
`MediaQuery` の情報は `runApp` の時点で用意されるので、`MaterialApp` を作っている `MyApp` の `context` からでも読めます。
それでも画面を分けておくと、`Navigator` のように `MaterialApp` の下でしか使えない機能も、同じ `context` で使えます。

主なメソッドは次のとおりです。

| メソッド | 得られる情報 |
| --- | --- |
| `MediaQuery.sizeOf` | アプリの表示領域の幅と高さ |
| `MediaQuery.orientationOf` | 縦向き（`portrait`）か横向き（`landscape`）か |
| `MediaQuery.paddingOf` | ノッチやステータスバーで隠れる範囲 |
| `MediaQuery.viewInsetsOf` | キーボードなどで覆われている範囲 |
| `MediaQuery.textScalerOf` | 利用者が設定した文字サイズの倍率 |

`MediaQuery.of(context).size` という書き方もよく見かけます。
この書き方では、キーボードの開閉のように大きさと関係のない変化でも `build` が再度実行されます。
`sizeOf` のように必要な値だけを読むと、その値が変わったときにだけ再度実行されます。

第30章の `SafeArea` も、`paddingOf` で読める値を使ってOSの領域を避けています。
余白を避けるだけなら、自分で値を読まずに `SafeArea` を使います。

## 固定の大きさが引き起こすはみ出し

幅や高さを数値で固定すると、画面に収まらない端末が出てきます。
次の `Row` は、幅の合計が500なので、一般的なスマートフォンの縦向きでははみ出します。

```dart
Row(
  children: [
    Container(width: 250, height: 100, color: Colors.amber),
    Container(width: 250, height: 100, color: Colors.green),
  ],
)
```

はみ出した箇所には、黄色と黒の縞模様が表示されます。
`DEBUG CONSOLE` には `A RenderFlex overflowed by ... pixels` というエラーが表示されます。

`Expanded` で子を囲むと、数値の代わりに、残りの幅を分け合う割合を指定できます。
`flex` の比率で分けられるので、次の例では左右が2対1になります。

```dart
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(height: 100, color: Colors.amber),
    ),
    Expanded(
      child: Container(height: 100, color: Colors.green),
    ),
  ],
)
```

`Expanded` は `Column` の中でも使えます。その場合は残りの高さを分け合います。

横向きにすると、今度は高さが足りなくなります。
内容が画面より長くなる可能性があるなら、`SingleChildScrollView` で囲んでスクロールできるようにします。

```dart
SingleChildScrollView(
  child: Column(
    children: [
      Container(height: 300, color: Colors.amber),
      Container(height: 300, color: Colors.green),
    ],
  ),
)
```

`SingleChildScrollView` の中では高さが無制限になるので、その中の `Column` の子に `Expanded` は使えません。

iOSシミュレータでは、`command + ←` または `command + →` で端末を回転できます。

## 幅に応じて画面の構成を変える

割合で伸縮させるだけでは足りない場合があります。
たとえば、タブレットで項目を縦1列に並べると、横に長いだけの間延びした画面になります。
幅が広いときは、並べ方そのものを変えます。

`LayoutBuilder` は、親から与えられた大きさを `constraints` として受け取り、それに応じたWidgetを返します。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: ResponsivePage()));
}

class ResponsivePage extends StatelessWidget {
  const ResponsivePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('幅に応じた配置')),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final menu = Container(color: Colors.amber);
          final detail = Container(color: Colors.green);

          if (constraints.maxWidth >= 600) {
            return Row(
              children: [
                Expanded(child: menu),
                Expanded(flex: 2, child: detail),
              ],
            );
          }
          return Column(
            children: [
              Expanded(child: menu),
              Expanded(flex: 2, child: detail),
            ],
          );
        },
      ),
    );
  }
}
```

600という値は、Material Designがスマートフォンと大きな画面を分ける目安にしている幅です。

`MediaQuery.sizeOf` と `LayoutBuilder` のどちらも大きさを教えてくれますが、対象が異なります。
`MediaQuery.sizeOf` はアプリの表示領域全体の大きさ、`LayoutBuilder` はそのWidgetが親から与えられた大きさです。
画面の一部に置くWidgetの配置を決めるときは、実際に使える幅が分かる `LayoutBuilder` が適しています。

どちらの値も、端末の機種ではなく、その時点の表示領域を基準に判断できます。
タブレットの画面分割では、タブレットでもアプリの幅が狭くなることがあるので、機種で判定すると判断を誤ります。

## 画面の向きを固定する

向きを固定すると、横向きの対応は不要になります。
`SystemChrome.setPreferredOrientations` に、許可する向きを渡します。

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);
  runApp(const MaterialApp(home: Scaffold()));
}
```

`runApp` より前にFlutterの機能を使うので、最初に `WidgetsFlutterBinding.ensureInitialized` を呼び出します。

固定は、向きに意味があるゲームやカメラなどに限るのが無難です。
タブレットを横向きのスタンドに立てている利用者や、端末を車椅子に固定している利用者にとっては、固定された向きが使えない場合があります。
また、大きな画面の端末では、OSがアプリの向きの指定を無視することがあります。
固定していても、幅の広い表示領域で崩れないようにしておく必要があります。

## 文字サイズの設定に対応する

スマートフォンのOSには、文字サイズを変更する設定があります。
`Text` はこの設定に自動で従うので、たとえば `fontSize: 16` を指定していても、倍率が2なら32相当の大きさで描かれます。
プログラムを書き換える必要はありませんが、大きな文字で崩れない作りにしておく必要があります。

典型的な崩れ方は、高さを固定した箱から文字がはみ出すことです。

```dart
// 文字を大きくすると、箱に収まらなくなる
Container(
  height: 40,
  color: Colors.amber,
  child: const Text('文字サイズを変更しても読める説明文'),
)
```

高さを固定せず、余白だけを指定すると、箱が文字に合わせて広がります。
最低限の高さが必要なら、`constraints` で下限を指定します。

```dart
Container(
  constraints: const BoxConstraints(minHeight: 40),
  padding: const EdgeInsets.all(8),
  color: Colors.amber,
  child: const Text('文字サイズを変更しても読める説明文'),
)
```

文字が増える分だけ縦に伸びるので、先ほどの `SingleChildScrollView` と組み合わせます。

文字サイズの倍率を読み取ったり、上限を設けたりもできます。
`MediaQuery.withClampedTextScaling` で囲むと、その内側の倍率を指定の範囲に収められます。

```dart
MediaQuery.withClampedTextScaling(
  maxScaleFactor: 1.5,
  child: const Text('倍率は1.5倍までに抑えられる'),
)
```

この設定を使う利用者には、大きな文字でなければ読めない人が含まれます。
上限は、どうしても配置が収まらない箇所に限って設けます。
アプリ全体で倍率を1に固定すると、そうした利用者が読めないアプリになります。

iOSシミュレータでは、`Settings` の `Accessibility`、`Display & Text Size`、`Larger Text` の順に開くと変更できます。

## アクセシビリティ

障害の有無や利用している状況にかかわらずアプリを使えるようにすることを、アクセシビリティと呼びます。
文字サイズの対応もその一つです。

目が見えにくい利用者は、画面の内容を音声で読み上げるスクリーンリーダーを使います。
iOSのVoiceOverとAndroidのTalkBackがこれにあたります。
`Text` や `ElevatedButton` のような標準のWidgetは読み上げ用の情報を持っていますが、Flutterが内容を推測できないものは、開発者が説明を与える必要があります。

| 対象 | 説明の与え方 |
| --- | --- |
| アイコンだけのボタン | `IconButton` の `tooltip` |
| 意味のある画像 | `Image` の `semanticLabel` |
| 飾りの画像 | `Image` の `excludeFromSemantics: true` で読み上げから外す |
| 自作の操作部品 | `Semantics` で囲む |

```dart
Column(
  children: [
    IconButton(
      icon: const Icon(Icons.delete),
      tooltip: 'メモを削除',
      onPressed: () {},
    ),
    Image.network(
      'https://picsum.photos/250?image=9',
      semanticLabel: 'パソコンの前に置かれたノート',
    ),
    Semantics(
      label: 'お気に入りに追加',
      button: true,
      child: GestureDetector(
        onTap: () {},
        child: const Icon(Icons.star),
      ),
    ),
  ],
)
```

`tooltip` がないと、読み上げではそのボタンの役割が分かりません。
見た目が同じでも、スクリーンリーダーの利用者には、何のボタンか判別できないままになります。

見た目についても、確認する点があります。

- タップできる部品は、48×48論理ピクセル以上の大きさにします。小さな部品は、狙って押すことが難しいからです。
- 文字と背景のコントラスト比は4.5対1以上を目安にします。
- 色だけで情報を伝えないようにします。エラーを赤色だけで示すと、色の区別が難しい利用者には伝わらないので、文言やアイコンも添えます。

読み上げの情報は、`MaterialApp` に `showSemanticsDebugger: true` を指定すると画面上で確認できます。
実際の読み上げは実機のVoiceOverで確かめます。

詳しくは、公式ドキュメントの [Accessibility](https://docs.flutter.dev/ui/accessibility) と [Adaptive and responsive design](https://docs.flutter.dev/ui/adaptive-responsive) を参照してください。
