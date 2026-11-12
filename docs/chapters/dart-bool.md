`bool` は、`true`（真）か `false`（偽）のどちらかだけを取る型です。
`isActive` のように、状態を表す変数によく使います。

```dart
void main() {
  bool isActive = true;
  bool isCompleted = false;
  var isReady = true;

  print(isActive);
  print(isCompleted);
  print(isReady.runtimeType);
}
```

```text
true
false
bool
```

`変数.runtimeType` と書くと、その値の型を調べられます。

## 比較演算子

2つの値を比較すると、結果は `bool` 型になります。

| 演算子 | 意味 |
| --- | --- |
| `==` | 等しい |
| `!=` | 等しくない |
| `>` | より大きい |
| `<` | より小さい |
| `>=` | 以上 |
| `<=` | 以下 |

```dart
void main() {
  int a = 10;
  int b = 5;

  print(a == b);
  print(a != b);
  print(a > b);
  print(a <= b);
  print('apple' == 'apple');
}
```

```text
false
true
true
false
true
```

`=` は代入、`==` は比較です。
書き間違えやすいので注意してください。

## 論理演算子

複数の条件を組み合わせるときは、論理演算子を使います。

| 演算子 | 名前 | 結果が `true` になる条件 |
| --- | --- | --- |
| `&&` | AND（かつ） | 左右の両方が `true` |
| `\|\|` | OR（または） | 左右の少なくとも一方が `true` |
| `!` | NOT（否定） | 値が `false` |

```dart
void main() {
  bool isSunny = true;
  bool isWarm = false;
  bool hasUmbrella = true;

  print(isSunny && isWarm); // 片方がfalseなのでfalse
  print(isSunny || isWarm); // 片方がtrueなのでtrue
  print(!isSunny); // 反転してfalse
  print(!isSunny || hasUmbrella); // 右がtrueなのでtrue
}
```

```text
false
true
false
true
```

## 三項演算子

`条件 ? Aの値 : Bの値` と書くと、条件が `true` ならA、`false` ならBの値になります。
条件に応じて値を選ぶときに便利です。

```dart
void main() {
  int score = 85;
  bool isPassing = score >= 60;

  String result = isPassing ? '合格' : '不合格';
  print(result);
}
```

```text
合格
```

`score` を50に変えると `不合格` になります。

三項演算子は続けて書くこともできますが、読みにくくなります。
条件が複数あるときは、第13章で学ぶ `if` 文を使うほうがよいでしょう。

## bool型の注意点

言語によっては1を真として扱うものもありますが、Dartの条件には `bool` 型しか使えません。
`int` 型の変数に `true` を入れることも、`bool` 型の変数に1を入れることもできません。

## 変数の名前の付け方

Dartの変数名には、キャメルケースを使います。
先頭を小文字にし、単語の区切りを大文字にする書き方です（`userName`、`totalPrice` など）。
大文字の部分がラクダのこぶのように見えることが名前の由来です。

次のような名前は使えません。

```text
user-name   ハイフンは使えない
user name   スペースは使えない
1stName     数字で始められない
class       Dartが予約している語は使えない
```

先頭のアンダースコアには特別な意味があります（`_count` など）。
第24章で説明するとおり、宣言されたファイルの外からは使えなくなります。

読みやすい名前を付けるコツは3つあります。

- 目的がわかる名前にする。`x` より `age`、`f` より `isFinished` のほうが意味が伝わります。
- むやみに略さない。`usr` や `cnt` より `user` や `count` のほうが読みやすく、今のエディタなら入力補完もあります。
- 文脈に合わせて具体的にする。`data` や `number` より `productName` や `studentCount` のほうがよい名前です。

`bool` 型の変数は、質問の形にすると読みやすくなります。
`isLoggedIn`（ログイン済みか）、`hasPermission`（権限を持っているか）、`canEdit`（編集できるか）のように、`is`、`has`、`can` で始める名前がよく使われます。
