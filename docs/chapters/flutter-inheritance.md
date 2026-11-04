前の章の `class MyApp extends StatelessWidget` の `extends` は、継承という文法です。
Flutterのコードを読むために、ここで説明します。

## 継承とは

継承は、既存のクラスを基にして新しいクラスを作る仕組みです。
基になるクラスを親クラス、新しく作るクラスを子クラスと呼びます。
子クラスは親クラスのフィールドとメソッドを引き継ぎ、独自の機能を追加できます。

たとえば `Animal`（動物）を親クラスにして名前や食べる動作を持たせ、`Human` には話す動作を、`Cat` には鳴く動作を追加するといった使い方をします。

## 継承の書き方

車を表すクラスを作り、それを継承して消防車のクラスを作ります。
DartPadで試してみましょう。

```dart
class Car {
  String color;

  Car(this.color);

  void run() {
    print('$color色の車が走っています');
  }
}

class FireEngine extends Car {
  FireEngine(String color) : super(color);

  void stopFire() {
    print('消火活動をします');
  }
}

void main() {
  Car car = Car('青');
  car.run();

  FireEngine fireEngine = FireEngine('赤');
  fireEngine.run();
  fireEngine.stopFire();
}
```

```text
青色の車が走っています
赤色の車が走っています
消火活動をします
```

`FireEngine` には `run` も `color` も書いていませんが、`Car` から引き継いでいるので使えます。
一方、`Car` のオブジェクトで `car.stopFire()` と書くと、コンパイルエラーになります。

`: super(color)` は、親クラスのコンストラクタを呼び出す書き方です。
引数をそのまま親に渡すだけなら、`FireEngine(super.color);` と短く書くこともできます。

## オーバーライド

親クラスのメソッドを、子クラスで書き換えることもできます。
これをオーバーライドと呼びます。
`@override` は「親のメソッドを書き換えている」という目印です。
付けなくても動きますが、親に存在しない名前を書いたときに警告してもらえるので、必ず付けます。

```dart
class Car {
  String color;

  Car(this.color);

  void run() {
    print('$color色の車が走っています');
  }
}

class FireEngine extends Car {
  FireEngine(super.color);

  @override
  void run() {
    print('$color色の緊急車両が走っています');
  }
}

void main() {
  FireEngine fireEngine = FireEngine('赤');
  fireEngine.run();
}
```

```text
赤色の緊急車両が走っています
```

オーバーライドは、親クラス型の変数でさまざまな子クラスを同じように扱うポリモーフィズムという考え方を支えています。
本書では詳しく扱いませんが、関心があれば調べてみてください。

## StatelessWidgetを読み直す

ここまでの知識で、前の章のコードが読めるようになります。

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello', textDirection: TextDirection.ltr);
  }
}
```

- `class MyApp extends StatelessWidget`：`StatelessWidget` を継承して `MyApp` を作ります。
- `const MyApp({super.key});`：コンストラクタです。名前付き引数 `key` を親クラスに渡します。決まり文句として覚えてかまいません。
- `@override Widget build(...)`：親クラスの `build` メソッドをオーバーライドして、このWidgetの見た目を定義します。

Flutterはこの `build` を呼び出して、画面に表示する内容を受け取ります。
