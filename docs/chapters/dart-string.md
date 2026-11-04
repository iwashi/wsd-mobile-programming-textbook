`String` は文字列を扱う型です。
連結と埋め込みは第6章で学んだとおりです。

```dart
void main() {
  String lastName = '田中';
  String firstName = '太郎';
  int age = 25;

  print(lastName + firstName);
  print('$lastName$firstNameさんは$age歳です');
  print('5年後には${age + 5}歳になります');
}
```

```text
田中太郎
田中太郎さんは25歳です
5年後には30歳になります
```

## 複数行の文字列

クォーテーションを3つ続けて囲むと、改行を含む文字列をそのまま書けます。

```dart
void main() {
  String message = '''
これは
複数行の
文字列です''';
  print(message);
}
```

## 文字列を操作するメソッド

文字列には、長さを調べたり一部を取り出したりする機能が用意されています。

```dart
void main() {
  String text = 'Hello World';

  print(text.length); // 文字数
  print(text.isEmpty); // 空かどうか
  print(text.isNotEmpty); // 空でないかどうか
  print(text.toUpperCase()); // すべて大文字に
  print(text.toLowerCase()); // すべて小文字に
  print(text.substring(0, 5)); // 0番目から5番目の手前までを取り出す
  print(text.contains('World')); // 含まれているかどうか
  print(text.indexOf('o')); // 最初に現れる位置
  print(text.startsWith('Hello')); // 指定の文字列で始まるかどうか
  print(text.endsWith('World')); // 指定の文字列で終わるかどうか
  print(text.split(' ')); // 指定の文字列で分割する
}
```

```text
11
false
true
HELLO WORLD
hello world
Hello
true
4
true
true
[Hello, World]
```

`indexOf` の結果が4になるのは、位置を0から数えるからです。
`H` が0番目、`e` が1番目と数えると、`o` は4番目です。
プログラミングでは位置を0から数えることがほとんどなので、覚えておいてください。

`split` の結果の `[Hello, World]` はリストと呼ばれるもので、第15章で学びます。
