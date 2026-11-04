::: tip 第3部の到達目標
- 処理を関数に分け、引数と戻り値を設計できる
- 変数のスコープを説明できる
- 名前付き引数を読み書きできる
- クラスを定義し、フィールド、メソッド、コンストラクタを使える
- `try-catch` で例外に対処できる
:::

複数の生徒の平均点を求めるプログラムを、そのまま書き並べると次のようになります。

```dart
void main() {
  List<int> taroScores = [80, 90, 70];
  int taroSum = 0;
  for (int score in taroScores) {
    taroSum += score;
  }
  print(taroSum / taroScores.length);

  List<int> hanakoScores = [85, 75, 95];
  int hanakoSum = 0;
  for (int score in hanakoScores) {
    hanakoSum += score;
  }
  print(hanakoSum / hanakoScores.length);
}
```

生徒が増えるたびに同じ処理をコピーすることになり、計算方法を修正するときはすべての箇所を直す必要があります。
一連の処理に名前を付けてまとめたものが、関数です。

## 関数を使う利点

カレーの作り方には、野菜を切る、肉を炒める、煮込むといった工程があります。
それでも「カレーを作る」の一言で通じるのは、工程全体に名前が付いているからです。
関数も同じように処理に名前を付けます。

- 再利用：一度定義すれば、何度でも呼び出せます。
- 読みやすさ：名前を見れば何をする処理なのかがわかります。
- 保守のしやすさ：修正は定義の1か所で済みます。
- 誤りの減少：同じコードを何度も書かないので、一部だけ修正し忘れるといったミスが減ります。

## 関数の定義と呼び出し

関数は次の形で定義します。

```text
戻り値の型 関数名(引数) {
  処理
}
```

`print` も `main` も関数です。
`main` を定義して `print` を呼び出す形を、これまでずっと書いてきました。

もっとも単純な例から見ていきます。
定義するだけでは実行されないので、`関数名()` の形で呼び出します。
`void` は、戻り値がないことを表します。

```dart
void showGreeting() {
  print('こんにちは');
  print('プログラミングを楽しみましょう');
}

void main() {
  showGreeting();
}
```

プログラムは必ず `main` から始まり、`showGreeting()` の行で関数の中身が実行され、終わると呼び出した場所に戻ります。

関数の名前はキャメルケースで書きます。
処理を表すので、`show`、`calculate`、`check` のように動詞で始めるとわかりやすくなります。

丸括弧の付け忘れには注意してください。
`showGreeting;` と書いても関数は実行されません。

トップレベルの関数は、`main` の下に定義してもかまいません。
Dartは呼び出す前の定義を必須としていないからです。

```dart
void main() {
  showMenu();
}

void showMenu() {
  printLine();
  print('1. 開始');
  print('2. 終了');
  printLine();
}

void printLine() {
  print('----------');
}
```

この例のように、関数の中から別の関数を呼び出すこともできます。
`main` が `showMenu` を呼び、`showMenu` が `printLine` を呼びます。

関数の中に関数を定義することもできます。
ただし、その関数は定義したブロックの中からしか呼び出せません。

## 引数

関数に渡す値を引数と呼びます。
定義の丸括弧の中に、受け取る変数の型と名前を書きます。

```dart
void greet(String name) {
  print('こんにちは、$nameさん');
}

void main() {
  greet('太郎');
  greet('花子');
}
```

```text
こんにちは、太郎さん
こんにちは、花子さん
```

`greet('太郎')` と呼び出すと、`'太郎'` が変数 `name` に入って処理が実行されます。
引数はカンマで区切っていくつでも受け取れ、型が異なっていてもかまいません。

```dart
void introduce(String name, int age) {
  print('私の名前は$nameです。年齢は$age歳です。');
}

void main() {
  introduce('山田太郎', 20);
  introduce('鈴木花子', 18);
}
```

## 戻り値

関数の処理結果を呼び出し元に返すには、`return` を使います。
返す値を戻り値と呼び、その型を関数名の前に書きます。

```dart
int add(int a, int b) {
  return a + b;
}

void main() {
  int result = add(5, 3);
  print('5 + 3 = $result');
}
```

```text
5 + 3 = 8
```

`add(5, 3)` を呼び出すと、`a` に5、`b` に3が入り、`return` によって8が返ります。
その8が変数 `result` に入ります。
`int` のほかに、`double` や `String` など好きな型を返せます。

`return` が実行されるとその時点で関数は終わるので、条件に応じて異なる値を返すこともできます。

```dart
double calculateAverage(int a, int b, int c) {
  return (a + b + c) / 3;
}

String getGrade(int score) {
  if (score >= 80) {
    return 'A';
  } else if (score >= 60) {
    return 'B';
  } else {
    return 'C';
  }
}

void main() {
  print(calculateAverage(80, 90, 85));
  print(getGrade(75));
}
```

```text
85
B
```

戻り値は、変数に入れずにそのまま別の関数に渡すこともできます。
この例の `print(getGrade(75))` がそうです。

## 関数を組み合わせる

関数を組み合わせると、複雑な処理も見通しよく書けます。
次のプログラムは、身長と体重からBMIを計算し、判定結果を表示します。
計算と判定と表示がそれぞれ関数に分かれているので、どこで何をしているかが明確です。

```dart
double calculateBmi(double weight, double height) {
  return weight / (height * height);
}

String getBmiCategory(double bmi) {
  if (bmi < 18.5) {
    return '低体重';
  } else if (bmi < 25) {
    return '普通体重';
  } else {
    return '肥満';
  }
}

void printBmiResult(double weight, double height) {
  double bmi = calculateBmi(weight, height);
  print('BMI: ${bmi.toStringAsFixed(1)}');
  print('判定: ${getBmiCategory(bmi)}');
}

void main() {
  printBmiResult(65.0, 1.70);
}
```

```text
BMI: 22.5
判定: 普通体重
```

## よくある間違い

- 戻り値の型と違う値を返す：`int` 型の関数が文字列を返そうとするとコンパイルエラーになります。
- `return` を書き忘れる：戻り値の型を書いたのに値を返さないとコンパイルエラーになります。
- 引数の数が合わない：定義と異なる数の引数を渡すとコンパイルエラーになります。
