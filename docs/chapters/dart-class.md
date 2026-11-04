## 変数を並べる方法の限界

犬の情報をプログラムで扱うとします。
変数だけで書くと、次のようになります。

```dart
void main() {
  String dogName = 'ポチ';
  int dogAge = 3;
  String dogBreed = '柴犬';

  String dog2Name = 'ハチ';
  int dog2Age = 5;
  String dog2Breed = '秋田犬';

  print('$dogName $dogAge $dogBreed');
  print('$dog2Name $dog2Age $dog2Breed');
}
```

犬が100匹に増えると、変数は300個必要です。
どの変数がどの犬の情報なのかもわかりにくくなりますし、全頭を処理しようとすると変数を1つずつ書き並べるしかありません。

現実の犬には、名前や年齢などの属性と、吠える、走るといった行動があります。
この属性と行動をひとまとめにしてプログラムで表現する考え方が、オブジェクト指向プログラミングです。

## クラスとオブジェクト

クラスは設計図です。
たこ焼きの型があれば同じ形のたこ焼きをいくつでも焼けるように、クラスがあれば同じ構造のデータをいくつでも作れます。
クラスから作られた実体をオブジェクト、またはインスタンスと呼びます。

クラスは `class` というキーワードで定義します。
クラスが持つ変数をフィールドと呼びます。

```dart
class Dog {
  String name = '';
  int age = 0;
  String breed = '';
}
```

Dartでは、値を入れないまま `String name;` と書くことはできません。
`String` 型の変数は `null` を持てないので、デフォルト値を指定します。

クラス名はパスカルケースで書きます。
`BankAccount`、`GameCharacter` のように、先頭も単語の区切りも大文字にします。
先頭を小文字にする変数名のキャメルケースと区別してください。
また `Data` や `Thing` のようなあいまいな名前は避け、`StudentData` のように何を表すのかがわかる名前を付けます。

## オブジェクトを作る

クラス名に丸括弧を付けて呼び出すと、オブジェクトが作られます。
`オブジェクト.フィールド名` の形で、フィールドに読み書きできます。
この `.` をドット記法と呼びます。

```dart
class Dog {
  String name = '';
  int age = 0;
  String breed = '';
}

void main() {
  Dog myDog = Dog();
  myDog.name = 'ポチ';
  myDog.age = 3;
  myDog.breed = '柴犬';

  print('名前: ${myDog.name}');
  print('年齢: ${myDog.age}');
  print('犬種: ${myDog.breed}');
}
```

```text
名前: ポチ
年齢: 3
犬種: 柴犬
```

## 複数のオブジェクトとリスト

1つのクラスから、独立したオブジェクトをいくつでも作れます。
リストに入れると、まとめて処理できます。
`List<Dog>` は `Dog` のオブジェクトを入れるリストです。

```dart
class Dog {
  String name = '';
  int age = 0;
}

void main() {
  Dog pochi = Dog();
  pochi.name = 'ポチ';
  pochi.age = 3;

  Dog hachi = Dog();
  hachi.name = 'ハチ';
  hachi.age = 5;

  List<Dog> dogs = [pochi, hachi];

  for (Dog dog in dogs) {
    print('${dog.name}は${dog.age}歳です');
  }
}
```

## カスケード記法

同じオブジェクトに続けて操作するときは、`..` を使うと簡潔に書けます。
これをカスケード記法と呼びます。

```dart
class Dog {
  String name = '';
  int age = 0;
}

void main() {
  Dog dog = Dog()
    ..name = 'ポチ'
    ..age = 3;

  print(dog.name);
  print(dog.age);
}
```

## nullを許容するフィールド

値がないことを表す `null` は、多くのプログラムで不具合の原因になってきました。
そのためDartの変数は、基本的に `null` を入れられません。
型の後ろに `?` を付けたときだけ `null` を許します。

```dart
class Dog {
  String name = '不明';
  String? breed; // nullを許容するので初期値がなくてもよい
}

void main() {
  Dog dog = Dog();
  print(dog.breed);

  // ??は左側がnullのとき右側の値を使う
  print(dog.breed ?? '犬種不明');
}
```

```text
null
犬種不明
```

## オブジェクトの比較

名前も年齢も同じ2つのオブジェクトを `==` で比較すると、結果は `false` になります。

```dart
class Dog {
  String name = '';
}

void main() {
  Dog dog1 = Dog();
  dog1.name = 'ポチ';

  Dog dog2 = Dog();
  dog2.name = 'ポチ';

  Dog dog3 = dog1;

  print(dog1 == dog2);
  print(dog1 == dog3);
  print(dog1.name == dog2.name);
}
```

```text
false
true
true
```

`==` は標準では、中身ではなく同じオブジェクトかどうかを比較します。
`dog1` と `dog2` はメモリ上の別の場所に作られた別物なので `false` です。
`dog3` には `dog1` と同じオブジェクトが入っているので `true` になります。
中身を比べたいときは、フィールドどうしを比較してください。
