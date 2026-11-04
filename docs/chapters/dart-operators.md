## 算術演算子

計算に使う記号を算術演算子と呼びます。
掛け算は `*` で書きます。

| 演算子 | 意味 | 例 | 結果 |
| --- | --- | --- | --- |
| `+` | 足し算 | `15 + 4` | `19` |
| `-` | 引き算 | `15 - 4` | `11` |
| `*` | 掛け算 | `15 * 4` | `60` |
| `/` | 割り算 | `15 / 4` | `3.75` |
| `~/` | 整数の割り算 | `15 ~/ 4` | `3` |
| `%` | あまり | `15 % 4` | `3` |

`/` の結果は、整数どうしの計算でも常に `double` 型になります。

```dart
void main() {
  int a = 15;
  int b = 4;

  var result = a / b;
  print(result);
  print(result.runtimeType);
}
```

```text
3.75
double
```

あまりを求める `%` は、偶数か奇数かの判定や、一定間隔での処理などに使います。

## 複合代入演算子

変数の現在の値を使って計算し、その結果を同じ変数に入れる操作には、短い書き方があります。

```dart
void main() {
  int money = 1000;

  money += 500; // money = money + 500 と同じ
  print(money);

  money -= 200; // money = money - 200 と同じ
  print(money);

  money *= 2; // money = money * 2 と同じ
  print(money);

  money ~/= 4; // money = money ~/ 4 と同じ
  print(money);
}
```

```text
1500
1300
2600
650
```

`+=` は文字列の連結にも使えます。

```dart
void main() {
  String message = 'こんにちは';
  message += '、世界！';
  print(message);
}
```

## 定数を作るconstとfinal

一度決めたら変えない値には、`const` か `final` を付けます。
値が途中で書き換えられないと保証されるので、プログラムが安全になります。
どちらも、再代入しようとするとコンパイルエラーになります。

- `const`：コンパイル時に値が決まっている定数に使います。
- `final`：実行時に一度だけ値が決まるものに使います。

```dart
void main() {
  const double pi = 3.14159;

  // 現在時刻は実行するまで決まらないのでconstにはできない
  final DateTime startedAt = DateTime.now();

  print(pi);
  print(startedAt);
}
```

たとえばサーバーから受け取るユーザーIDは、アプリの実行時まで値が決まりません。
このように「実行時に決まり、その後は変わらない」値には `final` を使います。

## 演算の優先順位

演算の順序は算数と同じです。
掛け算や割り算は足し算や引き算より先に計算され、括弧で囲んだ部分は最初に計算されます。

```dart
void main() {
  print(2 + 3 * 4);
  print((2 + 3) * 4);
}
```

```text
14
20
```

優先順位を変える必要がなくても、読みやすくするために括弧を付けることがあります。
長い式は、途中結果に名前を付けて段階的に計算すると、さらに読みやすくなります。

```dart
void main() {
  int price = 1000;
  int quantity = 3;
  int discount = 500;
  double taxRate = 0.1;

  int subtotal = price * quantity - discount;
  double total = subtotal * (1 + taxRate);
  print(total);
}
```
