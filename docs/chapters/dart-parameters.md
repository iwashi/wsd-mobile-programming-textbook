名前付き引数はFlutterのコードのいたるところで使います。
この章で書き方をしっかり押さえておいてください。

## 位置引数

これまで使ってきた引数は、渡す順番で対応が決まるので位置引数と呼ばれます。
順番を間違えると、エラーにならず結果だけが変わることがあります。

```dart
int subtract(int a, int b) {
  return a - b;
}

void main() {
  print(subtract(10, 3));
  print(subtract(3, 10));
}
```

```text
7
-7
```

## 省略できる位置引数

引数を角括弧で囲むと、呼び出すときに省略できます。
`=` でデフォルト値を指定すると、省略時にはその値が使われます。

```dart
String greet(String name, [String time = 'こんにちは']) {
  return '$time、$nameさん';
}

void main() {
  print(greet('太郎'));
  print(greet('花子', 'おはよう'));
}
```

```text
こんにちは、太郎さん
おはよう、花子さん
```

省略できる位置引数は、複数並べることもできます。
`introduce('次郎', 17, '野球')` のように、前から順に対応します。

```dart
String introduce(String name, [int age = 0, String hobby = '読書']) {
  if (age == 0) {
    return '私は$nameです。趣味は$hobbyです。';
  }
  return '私は$name、$age歳です。趣味は$hobbyです。';
}

void main() {
  print(introduce('太郎'));
  print(introduce('花子', 20));
  print(introduce('次郎', 17, '野球'));
}
```

## 名前付き引数

引数を波括弧で囲むと、名前付き引数になります。
呼び出すときは `名前: 値` の形で指定します。
名前で対応するので順番は自由で、何を渡しているのかが呼び出す側のコードから読み取れます。
省略もできます。

```dart
void drawRectangle({int width = 20, int height = 5, String character = '*'}) {
  for (int i = 0; i < height; i++) {
    print(character * width);
  }
}

void main() {
  drawRectangle(); // すべてデフォルト値
  drawRectangle(width: 10); // widthだけ指定
  drawRectangle(height: 3, character: '#'); // 順番も組み合わせも自由
}
```

`文字列 * 数` は、文字列を指定の回数だけ繰り返した文字列を作ります。

FlutterのWidgetには多くの引数があり、すべての順番を覚えることはできません。
そのためFlutterでは名前付き引数が標準的に使われています。

## 必須の名前付き引数

名前付き引数は基本的に省略可能です。
必ず渡してほしい引数には `required` を付けます。

```dart
void registerUser({
  required String name,
  required String email,
  int age = 0,
}) {
  print('名前: $name');
  print('メール: $email');
  print('年齢: ${age == 0 ? '未設定' : '$age歳'}');
}

void main() {
  registerUser(name: '山田太郎', email: 'taro@example.com');
  registerUser(name: '鈴木花子', email: 'hanako@example.com', age: 25);
}
```

`required` の引数を省略すると、`The named parameter 'email' is required` のようなコンパイルエラーになります。

## 関数を設計するときの考え方

引数の書き方を覚えたところで、関数の分け方の指針を3つ挙げます。

1つの関数には1つの仕事をさせます。
`processUserData` のような名前で検証も整形も保存も行う関数は、どこで何をしているのか読み取りにくく、修正の影響も広がります。
`isValidUserData`、`formatName`、`saveUser` のように分けると、呼び出す回数は増えますが、それぞれが短くなって読みやすくなります。

関数名は内容がわかるように付けます。
`calc` より `calculateTriangleArea` のほうが、何をする関数かがすぐにわかります。
長い名前でも、エディタの入力補完があるので手間にはなりません。

処理の階層を揃えます。
次の例では `getGradeMessage` は点数から判定を得てメッセージを作るという流れだけを担当し、判定そのものは `evaluateGrade` に任せています。

```dart
String evaluateGrade(int score) {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  return 'C';
}

String getGradeMessage(int score) {
  String grade = evaluateGrade(score);
  return '評価は$gradeです';
}

void main() {
  print(getGradeMessage(85));
}
```
