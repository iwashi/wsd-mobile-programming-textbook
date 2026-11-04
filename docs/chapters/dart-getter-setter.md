ゲッターとセッターは、フィールドに直接触らせず、メソッドを経由してアクセスさせるための仕組みです。
不正な値が入るのを防ぎ、壊れにくいプログラムを作るために使います。

## プライベートフィールド

名前の先頭にアンダースコアを付けると、プライベートになります。
プライベートなフィールドは、そのクラスを定義したファイルの外からはアクセスできません。

Dartの可視性はクラスではなくファイル（ライブラリ）の単位です。
そのため、同じファイルの中で試すとアクセスできてしまいますが、Flutterアプリのようにファイルを分けて開発すると効果があります。

## ゲッターとセッターの書き方

`get` で値を読み出す処理を、`set` で値を書き込む処理を定義します。
呼び出す側は丸括弧を付けず、フィールドのように書けます。

```dart
class Temperature {
  double _celsius;

  Temperature(this._celsius);

  double get celsius {
    return _celsius;
  }

  set celsius(double value) {
    if (value < -273.15) {
      print('絶対零度より低い温度は設定できません');
      return;
    }
    _celsius = value;
  }
}

void main() {
  Temperature temperature = Temperature(25.0);
  print(temperature.celsius); // getが呼ばれる

  temperature.celsius = 100.0; // setが呼ばれる
  print(temperature.celsius);

  temperature.celsius = -500.0; // 検証で弾かれる
  print(temperature.celsius);
}
```

```text
25
100
絶対零度より低い温度は設定できません
100
```

`temperature.celsius = 100.0` はフィールドへの代入に見えますが、実際には `set` の処理が実行されます。
そこで値を検証できるので、`-500.0` のような不正な値を拒否できます。

## 計算で求めるプロパティ

ゲッターは、フィールドをそのまま返すだけでなく、計算した結果を返すこともできます。
華氏の値を別のフィールドに持つと摂氏とずれるおそれがありますが、摂氏から計算するようにすれば、常に一貫した値になります。
`=>` は、処理が1つの式だけのときに使える短い書き方です。

```dart
class Temperature {
  double _celsius;

  Temperature(this._celsius);

  double get celsius => _celsius;

  double get fahrenheit => _celsius * 9 / 5 + 32;

  set fahrenheit(double value) {
    _celsius = (value - 32) * 5 / 9;
  }
}

void main() {
  Temperature temperature = Temperature(100.0);
  print(temperature.fahrenheit);

  temperature.fahrenheit = 32.0;
  print(temperature.celsius);
}
```

```text
212
0
```

## カプセル化

クラスの内部データをプライベートにして、公開したメソッドやゲッターを通してだけ操作させる設計をカプセル化と呼びます。
JavaやC#など、他のオブジェクト指向言語でも共通の考え方です。

カプセル化には次の利点があります。

- 不正な値が設定されるのを防げます。
- クラスの内部を変更しても、公開部分が同じなら利用側のコードを直さずに済みます。
- 思わぬ場所から値が変更されて、離れた処理が壊れるという問題（副作用）を防げます。

たとえば第21章の銀行口座は、次のように書くことで残高を外から直接変更できなくなります。
ゲッターだけを定義してセッターを定義しなければ、読み取り専用になります。

```dart
class BankAccount {
  int _balance = 0;

  int get balance => _balance;

  void deposit(int amount) {
    if (amount > 0) {
      _balance += amount;
    }
  }
}

void main() {
  BankAccount account = BankAccount();
  account.deposit(1000);
  print(account.balance);
}
```

小さなプログラムで常に必要になるものではありません。
Flutterの学習を進めるうえでは、こうした考え方があることと、`_` で始まる名前がプライベートであることを押さえておきましょう。
