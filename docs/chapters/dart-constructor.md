オブジェクトを作ってからフィールドを1つずつ設定するのは手間がかかります。
コンストラクタを使うと、オブジェクトを作るときに初期値をまとめて渡せます。

## 基本のコンストラクタ

コンストラクタは、クラスと同じ名前の特別なメソッドです。
引数に `this.フィールド名` と書くと、渡された値がそのフィールドに入ります。

```dart
class Person {
  String name;
  int age;

  Person(this.name, this.age);

  void introduce() {
    print('こんにちは、$nameです。$age歳です。');
  }
}

void main() {
  Person taro = Person('田中太郎', 25);
  Person hanako = Person('佐藤花子', 30);

  taro.introduce();
  hanako.introduce();
}
```

```text
こんにちは、田中太郎です。25歳です。
こんにちは、佐藤花子です。30歳です。
```

`Person('田中太郎', 25)` と書くと、`'田中太郎'` が `name` に、`25` が `age` に入ります。
コンストラクタが値を必ず設定するので、フィールドにデフォルト値を書く必要がなくなります。

## 名前付きコンストラクタ

作り方を複数用意したいときは、`クラス名.名前` の形で別のコンストラクタを定義できます。
次の `Rectangle` は、幅と高さを指定する方法のほかに、正方形として作る方法とデフォルトの大きさで作る方法を持っています。
コロンの後ろに書いた部分は初期化リストと呼ばれ、フィールドを初期化します。

```dart
class Rectangle {
  double width;
  double height;

  Rectangle(this.width, this.height);

  Rectangle.square(double side)
      : width = side,
        height = side;

  Rectangle.defaultSize()
      : width = 10,
        height = 10;

  double getArea() {
    return width * height;
  }
}

void main() {
  print(Rectangle(3, 4).getArea());
  print(Rectangle.square(5).getArea());
  print(Rectangle.defaultSize().getArea());
}
```

```text
12
25
100
```

## 名前付き引数を受け取るコンストラクタ

コンストラクタでも、第19章で学んだ名前付き引数を使えます。
FlutterのWidgetのコンストラクタは、ほとんどがこの形です。

```dart
class Student {
  String name;
  int grade;
  String school;

  Student(this.name, {this.grade = 1, this.school = '未設定'});

  void showProfile() {
    print('$name $grade年生 $school');
  }
}

void main() {
  Student('高橋次郎', grade: 2, school: '早稲田中学校').showProfile();
  Student('伊藤三郎', grade: 3).showProfile();
  Student('渡辺四郎').showProfile();
}
```

`required` を付ければ必須にできます。
`const MyApp({super.key});` のようなFlutterのコードも、この書き方の一種です。

## コンストラクタの中で処理をする

コンストラクタに波括弧を続けると、オブジェクトを作るときに実行する処理を書けます。
次の銀行口座のクラスでは、口座の作成時に取引履歴へ1行記録します。

```dart
class BankAccount {
  String accountNumber;
  String ownerName;
  int balance = 0;
  List<String> history = [];

  BankAccount(this.accountNumber, this.ownerName) {
    history.add('口座を開設しました');
  }

  void deposit(int amount) {
    balance += amount;
    history.add('$amount円を入金しました。残高は$balance円です');
  }
}

void main() {
  BankAccount account = BankAccount('123456789', '田中太郎');
  account.deposit(10000);

  for (String record in account.history) {
    print(record);
  }
}
```

```text
口座を開設しました
10000円を入金しました。残高は10000円です
```

Flutterのコードを読むうえでは、基本のコンストラクタ、名前付き引数、名前付きコンストラクタの3つを押さえておけば十分です。
