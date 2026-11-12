前の章ではフィールドで属性を表しました。
吠える、食べるといった行動は、メソッドで表します。
メソッドはクラスの中に定義した関数です。

## メソッドの定義と呼び出し

書き方は関数と同じで、クラスの中に書く点だけが違います。
メソッドの中からは、同じオブジェクトのフィールドをそのまま参照できます。
呼び出すときは `オブジェクト.メソッド名()` と書きます。

```dart
class Dog {
  String name = '';
  int age = 0;

  void bark() {
    print('ワン！');
  }

  void introduce() {
    print('こんにちは、僕の名前は$nameです。$age歳です。');
  }
}

void main() {
  Dog pochi = Dog();
  pochi.name = 'ポチ';
  pochi.age = 3;

  pochi.bark();
  pochi.introduce();
}
```

```text
ワン！
こんにちは、僕の名前はポチです。3歳です。
```

## 引数と戻り値

関数と同じように、メソッドにも引数と戻り値を指定できます。

```dart
class Dog {
  String name = '';
  int age = 0;

  void greet(String friendName) {
    print('$nameが$friendNameに挨拶しました');
  }

  void barkTimes(int times) {
    for (int i = 0; i < times; i++) {
      print('ワン！');
    }
  }

  int getHumanAge() {
    return age * 7;
  }

  bool isAdult() {
    return age >= 2;
  }
}

void main() {
  Dog pochi = Dog();
  pochi.name = 'ポチ';
  pochi.age = 3;

  pochi.greet('ハチ');
  pochi.barkTimes(2);
  print(pochi.getHumanAge());
  print(pochi.isAdult());
}
```

```text
ポチがハチに挨拶しました
ワン！
ワン！
21
true
```

## メソッドで値を検証する

メソッドを通して値を変更するようにすると、不正な操作を防げます。
次の銀行口座のクラスでは、入金額が正の数かどうかと、残高が足りるかどうかを確認しています。

```dart
class BankAccount {
  String owner = '';
  int balance = 0;

  void deposit(int amount) {
    if (amount <= 0) {
      print('入金額は1円以上にしてください');
      return;
    }
    balance += amount;
  }

  void withdraw(int amount) {
    if (amount > balance) {
      print('残高が不足しています');
      return;
    }
    balance -= amount;
  }
}

void main() {
  BankAccount account = BankAccount();
  account.owner = '山田';

  account.deposit(10000);
  account.withdraw(3000);
  account.withdraw(50000);

  print('残高: ${account.balance}円');
}
```

```text
残高が不足しています
残高: 7000円
```

ただしこのクラスでは、`account.balance = -100;` と書けばメソッドを通さずに値を変更できてしまいます。
フィールドへの直接のアクセスを制限する方法は、第24章で学びます。
