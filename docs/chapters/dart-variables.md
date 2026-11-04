変数は、値を入れておく名前付きの箱です。
箱には入れられるものの種類が決まっていて、これを型と呼びます。

## 変数の宣言

変数は `型 名前 = 値;` の形で宣言します。

```dart
void main() {
  int age = 25;
  String name = '太郎';

  print(age);
  print(name);
}
```

`int` は整数の型、`String` は文字列の型です。

プログラムの `=` は、数学の「等しい」ではなく、右の値を左の変数に入れる（代入する）という意味です。
宣言と同時に最初の値を入れることを初期化と呼びます。
宣言と代入を分けることもできます。

```dart
void main() {
  int count;
  count = 5;
  print(count);
}
```

## 型推論とdynamic

`var` を使うと、右辺の値からDartが型を判断してくれます。
これを型推論と呼びます。
次の `age` は `int` 型、`name` は `String` 型になります。

```dart
void main() {
  var age = 25;
  var name = '太郎';

  print(age);
  print(name);
}
```

`dynamic` を使うと、型の異なる値をあとから代入できるようになります。

```dart
void main() {
  dynamic value = 25;
  value = '太郎';
  print(value);
}
```

ただし `dynamic` は特別な事情がない限り避けます。
型が決まっていると誤りをコンパイル時に見つけられるので、安全で保守しやすいプログラムになるからです。

## 変数を使う理由

変数を使うと、値に名前を付けて何度も使い回せます。
同じ値を10か所で使っていても、変数の宣言を1か所変えるだけで全体に反映できます。

計算の途中結果に名前を付けると、何をしているかも読み取りやすくなります。
次の2つは同じ計算ですが、下のほうが円の面積を求めていることがすぐにわかります。

```dart
void main() {
  print(3.14159 * 5.0 * 5.0);

  double pi = 3.14159;
  double radius = 5.0;
  double area = pi * radius * radius;
  print(area);
}
```

## int型

`int` は整数を扱う型で、負の値も入れられます。
基本的な四則演算ができます。

```dart
void main() {
  int a = 10;
  int b = 3;

  print(a + b); // 足し算
  print(a - b); // 引き算
  print(a * b); // 掛け算
  print(a / b); // 割り算
  print(a ~/ b); // 整数の割り算（商）
  print(a % b); // 割り算のあまり
}
```

```text
13
7
30
3.3333333333333335
3
1
```

`/` の結果は小数になります。
整数の商が欲しいときは `~/`、あまりが欲しいときは `%` を使います。

変数の値を1増やす操作はよく使うので、短い書き方が用意されています。
1増やすことをインクリメント、1減らすことをデクリメントと呼びます。

```dart
void main() {
  int count = 0;

  count = count + 1; // 右辺を計算してからcountに入れる
  print(count);

  count++; // 上と同じ意味
  print(count);

  count--; // 1減らす
  print(count);
}
```

```text
1
2
1
```

## double型

`double` は小数を含む数を扱う型です。
四則演算は `int` と同じように書けます。
`round`、`floor`、`ceil` を使うと、小数を整数に丸められます。

```dart
void main() {
  double value = 3.7;

  print(value.round()); // 四捨五入
  print(value.floor()); // 切り捨て
  print(value.ceil()); // 切り上げ
}
```

```text
4
3
4
```

`value.round()` は、`value` に対して `round` という処理を呼び出す書き方です。
結果を変数に入れてから表示しても同じです。

```dart
void main() {
  double value = 3.7;

  var result = value.round();
  print(result);
}
```

### 小数の計算誤差

小数の計算には、わずかな誤差が出ることがあります。

```dart
void main() {
  print(0.1 + 0.2);
}
```

```text
0.30000000000000004
```

コンピュータは小数を2進数で近似して持っているため、0.1のような値を正確には表せません。
お金の計算のように誤差が許されない場合は、整数に直して計算するなどの工夫が必要です。

## 文字列と数値の変換

ユーザーの入力は、数字であっても文字列として受け取ることがよくあります。
計算に使うには数値へ変換します。
`int.parse` と `double.parse` は文字列を数値に、`toString` は数値を文字列に変換します。

```dart
void main() {
  String ageString = '25';
  int age = int.parse(ageString);
  print(age + 1);

  String heightString = '170.5';
  double height = double.parse(heightString);
  print(height + 0.5);

  int value = 456;
  String text = value.toString();
  print(text + '円');
}
```

```text
26
171
456円
```

`height + 0.5` は `double` 型なので、`171.0` と表示されそうに見えます。
DartPadでは、DartをJavaScriptに変換して実行する都合で、小数部が0の `double` は `171` のように表示されます。
Flutterアプリを含むWeb以外の環境では `171.0` と表示されます。
どちらも型は `double` で、表示だけが異なります。
本書のDartPad向けの出力例は、DartPadの表示に合わせています。
