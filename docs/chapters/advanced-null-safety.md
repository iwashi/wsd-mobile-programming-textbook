この章は発展の内容で、講義動画では扱いません。

`null` は「値がない」ことを表します。
第16章、第20章、第24章で少しずつ学んだ内容を踏まえて、`null` かもしれない値の扱い方を整理します。

## nullかもしれない値はどこから来るのか

マップの `[]` は、キーがないと `null` を返すので、結果の型は `int?` のように `?` 付きになります。
そのまま `int` の変数には入れられません。

```dart
void main() {
  Map<String, int> prices = {'リンゴ': 150};

  // int price = prices['リンゴ']; // コンパイルエラー
  int? price = prices['リンゴ'];
  print(price);
}
```

```text
150
```

`int?` は、`int` か `null` のどちらかが入る型です。
`null` の場合を処理するまで、`int` としては使えません。

## null判定で型が絞られる

`if` で `null` でないことを確認すると、その中では `?` のない型として扱えます。
これを型の昇格と呼びます。

```dart
void main() {
  Map<String, int> prices = {'リンゴ': 150};
  int? price = prices['リンゴ'];

  if (price != null) {
    print(price + 10); // ここではint型として計算できる
  }
}
```

```text
160
```

## ?.と??と??=

毎回 `if` を書かなくても済むように、短い書き方が用意されています。

- `?.`：左側が `null` なら何もせず `null` を返し、そうでなければメソッドやプロパティを使います。
- `??`：左側が `null` なら右側の値を使います。
- `??=`：変数が `null` のときだけ代入します。

```dart
void main() {
  Map<String, String> nicknames = {'太郎': 'たろちゃん'};

  String? hanako = nicknames['花子'];
  print(hanako?.length);
  print(hanako ?? 'ニックネームなし');

  hanako ??= 'はなちゃん';
  print(hanako);
}
```

```text
null
ニックネームなし
はなちゃん
```

## 強制的にnullでないと扱う!

値の後ろに `!` を付けると、`null` ではないものとして扱えます。
ただし、実際に `null` だったときは実行時エラーになります。

```dart
void main() {
  Map<String, int> prices = {'リンゴ': 150};

  print(prices['リンゴ']! + 10);
  // print(prices['ブドウ']! + 10); // 実行時エラー
}
```

```text
160
```

コンパイラの指摘を消すためだけに `!` を付けると、コンパイル時に見つかるはずの誤りが実行時エラーに変わります。
`null` にならない理由を説明できるときだけ使い、それ以外は `if` や `??` で処理します。

## フィールドでは型が絞られない

`null` を確認しても、クラスのフィールドでは型が絞られないことがあります。
確認した後で別の処理が値を書き換える可能性を、コンパイラが否定できないからです。
いったんローカル変数に入れると、型が絞られます。

```dart
class Dog {
  String? breed;
}

void main() {
  Dog dog = Dog();
  dog.breed = '柴犬';

  if (dog.breed != null) {
    // print(dog.breed.length); // コンパイルエラー
  }

  String? breed = dog.breed;
  if (breed != null) {
    print(breed.length);
  }
}
```

```text
2
```

## late

`late` を付けると、初期値を宣言時に決めなくても、`?` のない型で変数を宣言できます。
使う前に必ず値を入れる約束をコンパイラに伝える指定で、値を入れる前に読むと実行時エラーになります。

```dart
late String title;

void main() {
  title = 'はじめてのDart';
  print(title);
}
```

```text
はじめてのDart
```

Flutterでは、第47章で学ぶ `initState` で初期化するフィールドによく使います。
宣言の時点では作れないものの、画面を作る `build` より前に必ず値が入るからです。

```dart
class _MyHomePageState extends State<MyHomePage> {
  late String _startedAt;

  @override
  void initState() {
    super.initState();
    _startedAt = DateTime.now().toString();
  }

  // 以下省略
}
```

## int.tryParse

第24章の `int.parse` は、変換できない文字列で例外を発生させました。
`int.tryParse` は、変換できないときに `null` を返します。
ユーザーの入力のように、数字以外が来ることを想定している場合は、こちらのほうが短く書けます。
`double.tryParse` もあります。

```dart
void main() {
  int? age = int.tryParse('abc');
  print(age);

  if (age == null) {
    print('数値を入力してください');
  }

  print(int.tryParse('25') ?? 0);
}
```

```text
null
数値を入力してください
25
```
