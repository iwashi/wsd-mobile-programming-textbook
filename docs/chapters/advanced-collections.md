この章は発展の内容で、講義動画では扱いません。

リストとマップに加えて、もう1つのコレクションである `Set` と、コレクションを組み立てる書き方を学びます。
`final` を付けたリストの中身を変更できる理由も、ここで説明します。

## Set

`Set` は、重複しない値の集まりです。
波括弧で作り、同じ値を追加しても1つしか残りません。
順番ではなく、ある値が含まれているかどうかを調べたいときに向いています。

```dart
void main() {
  Set<String> tags = {'Flutter', 'Dart'};

  tags.add('Flutter'); // すでにあるので増えない
  tags.add('Git');

  print(tags);
  print(tags.length);
  print(tags.contains('Dart'));

  // リストの重複を取り除く
  List<int> numbers = [1, 2, 2, 3, 3];
  print(numbers.toSet().toList());
}
```

```text
{Flutter, Dart, Git}
3
true
[1, 2, 3]
```

空の `{}` は `Map` として扱われるので、空の `Set` は `Set<String> tags = {};` のように型を明示して作ります。

## コレクションの中のifとfor

リストの中に `if` と `for` を書くと、条件や繰り返しで要素を決められます。

```dart
void main() {
  bool isLoggedIn = true;
  List<String> items = ['ノート', 'ペン'];

  List<String> menu = [
    'ホーム',
    if (isLoggedIn) 'マイページ',
    for (String item in items) '$itemを見る',
  ];

  print(menu);
}
```

```text
[ホーム, マイページ, ノートを見る, ペンを見る]
```

Flutterの `children` でよく使う書き方です。
前の章の `map` と同じことを、`for` でも書けます。

```dart
Column(
  children: [
    const Text('メンバー'),
    if (names.isEmpty) const Text('まだいません'),
    for (String name in names) Text(name),
  ],
)
```

## スプレッド演算子

`...` を使うと、別のリストの要素をその場に展開できます。

```dart
void main() {
  List<int> first = [1, 2];
  List<int> all = [0, ...first, 3];
  print(all);
}
```

```text
[0, 1, 2, 3]
```

## 変数はオブジェクトを指している

クラスやリストの変数は、オブジェクトそのものではなく、オブジェクトの場所を指しています。
そのため、代入してもコピーは作られず、2つの変数が同じリストを指します。

```dart
void main() {
  List<int> a = [1, 2];
  List<int> b = a;

  b.add(3);
  print(a); // aからも変更が見える

  List<int> c = [...a]; // 新しいリストを作る
  c.add(4);
  print(a);
  print(c);
}
```

```text
[1, 2, 3]
[1, 2, 3]
[1, 2, 3, 4]
```

別のリストとして扱いたいときは、`[...a]` のように新しいリストを作ります。

## finalとconstの違い

第12章で学んだ `final` は、変数への再代入を禁止します。
変数が指しているリストの中身の変更は禁止しません。
第34章の `final List<int> _stack = [];` に `add` できたのはこのためです。

`const` のリストは、中身も変更できません。

```dart
void main() {
  final List<int> finalList = [1, 2];
  finalList.add(3); // 中身は変更できる
  // finalList = [4]; // コンパイルエラー: 再代入はできない
  print(finalList);

  const List<int> constList = [1, 2];
  // constList.add(3); // 実行時エラー: 中身も変更できない
  print(constList);
}
```

```text
[1, 2, 3]
[1, 2]
```

Flutterの `const Text('Hello')` も同じ考え方です。
コンパイル時に内容が決まるWidgetを `const` にすると、同じオブジェクトを使い回せます。
`const` を付けた式の内側は、すべてコンパイル時に決まる値でなければなりません。
そのため、次のコードはコンパイルエラーになります。

```dart
const Column(
  children: [
    Text('固定の文字'),
    Text(_message), // フィールドの値はコンパイル時に決まらない
  ],
)
```

`Invalid constant value` というエラーが出たら、外側の `const` を外し、変わらない部分にだけ `const` を付けます。
第41章で `body` の `const` を外すのも、`onPressed` に無名関数を渡すからです。
