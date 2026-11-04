変数には、参照できる範囲が決まっています。
この範囲をスコープと呼びます。

## ローカル変数

関数の中で宣言した変数をローカル変数と呼びます。
ローカル変数は、宣言した関数の中でしか使えません。

```dart
void anotherFunction() {
  // print(x); // エラー: xはここからは見えない
}

void main() {
  int x = 10;
  print(x);
  anotherFunction();
}
```

`x` は `main` のローカル変数なので、`anotherFunction` からは参照できません。
コメントを外すと `Undefined name 'x'` というエラーになります。

## トップレベル変数

関数の外で宣言した変数はトップレベル変数と呼ばれ、ファイルのどこからでも参照できます。
他の言語ではグローバル変数とも呼ばれます。

```dart
String appName = 'マイ電卓';
int counter = 0;

void showAppInfo() {
  print('アプリ名: $appName');
  print('カウンター: $counter');
}

void incrementCounter() {
  counter++;
}

void main() {
  showAppInfo();
  incrementCounter();
  incrementCounter();
  showAppInfo();
}
```

```text
アプリ名: マイ電卓
カウンター: 0
アプリ名: マイ電卓
カウンター: 2
```

どこからでも使えるので一見便利ですが、多用は避けます。
どこからでも値を変えられるということは、値がおかしくなったときに、原因の候補がプログラム全体に広がるからです。

## ブロックスコープ

`if` や `for` の波括弧の中で宣言した変数も、そのブロックの中でしか使えません。

```dart
void main() {
  int x = 10;

  if (x > 5) {
    int y = 20;
    print(x + y); // xもyも使える
  }

  // print(y); // エラー: yはifブロックの外からは見えない

  for (int i = 0; i < 3; i++) {
    print(i);
  }

  // print(i); // エラー: iはforの外からは見えない
}
```

ブロックの外側で宣言された `x` は内側から使えますが、逆はできません。

## 引数のスコープ

引数は、その関数の中でだけ使えるローカル変数です。

```dart
void greet(String name) {
  print('こんにちは、$nameさん');
}

void farewell() {
  // print(name); // エラー: greetの引数nameはここからは見えない
  print('さようなら');
}

void main() {
  greet('太郎');
  farewell();
}
```

## スコープは狭くする

変数はできるだけ狭いスコープで宣言します。
その変数を変更できる場所が限られるので、プログラムが壊れにくくなり、読むときに考える範囲も狭くなります。
トップレベル変数を使うのは、本当に必要なときだけにしましょう。
