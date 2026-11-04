この章は発展の内容で、講義動画では扱いません。

第3部と前の章で学んだクラスと継承に、よく使う機能を加えます。
最後に、Flutterで継承より合成を使う理由を説明します。

## static

`static` を付けたフィールドやメソッドは、オブジェクトではなくクラスに属します。
オブジェクトを作らず、`クラス名.名前` で使います。
Flutterの `Colors.blue` や `Icons.add` も、この形です。

```dart
class Tax {
  static const double rate = 0.1;

  static int addTax(int price) {
    return (price * (1 + rate)).round();
  }
}

void main() {
  print(Tax.rate);
  print(Tax.addTax(1000));
}
```

```text
0.1
1100
```

## 抽象クラス

`abstract` を付けたクラスは、オブジェクトを直接作れません。
処理を書かないメソッドを宣言でき、子クラスに実装を義務付けます。
親クラスの型で、さまざまな子クラスを同じように扱えます。
前の章で名前だけ紹介したポリモーフィズムです。

```dart
abstract class Shape {
  double area();
}

class Square extends Shape {
  double side;

  Square(this.side);

  @override
  double area() => side * side;
}

class Circle extends Shape {
  double radius;

  Circle(this.radius);

  @override
  double area() => 3.14 * radius * radius;
}

void main() {
  List<Shape> shapes = [Square(2), Circle(1)];

  for (Shape shape in shapes) {
    print(shape.area());
  }
}
```

```text
4
3.14
```

`StatelessWidget` も抽象クラスです。
`build` を実装しないとコンパイルエラーになるのは、このためです。

## mixin

Dartの `extends` で継承できる親クラスは1つだけです。
`mixin` を使うと、親子関係のないクラスに機能を追加できます。
`with` で取り込みます。

```dart
mixin CanSwim {
  void swim() {
    print('泳ぎます');
  }
}

class Animal {}

class Fish extends Animal with CanSwim {}

class Boat with CanSwim {}

void main() {
  Fish().swim();
  Boat().swim();
}
```

```text
泳ぎます
泳ぎます
```

Flutterでは、アニメーションで使う `SingleTickerProviderStateMixin` などを `with` で取り込むコードを見かけます。

## 継承と合成

あるクラスに別のクラスのオブジェクトを持たせて機能を組み立てることを、合成と呼びます。
`FireEngine` は `Car` の一種なので継承が自然ですが、`Car` は `Engine` の一種ではなく、`Engine` を持つものです。

```dart
class Engine {
  void start() {
    print('エンジンを始動します');
  }
}

class Car {
  final Engine engine;

  Car(this.engine);

  void run() {
    engine.start();
    print('走ります');
  }
}

void main() {
  Car(Engine()).run();
}
```

```text
エンジンを始動します
走ります
```

継承では、親クラスの変更が子クラスに影響します。
親が公開しているものをすべて引き継ぐので、親子の結び付きも強くなります。
合成なら、持っているオブジェクトの公開された機能だけを使うので、結び付きを弱くできます。

Flutterでは合成が基本です。
独自の見出しを作るときに `Text` を継承する必要はなく、`StatelessWidget` の `build` で `Text` を返します。
`child` でWidgetを入れ子にしてきたのも、Widgetの合成です。

```dart
class SectionTitle extends StatelessWidget {
  const SectionTitle({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(title),
    );
  }
}
```

継承するのは、`StatelessWidget` や `StatefulWidget` のように、Flutterが継承して使うように用意しているクラスが中心です。
