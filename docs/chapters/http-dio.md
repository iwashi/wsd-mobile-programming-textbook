インターネット上のサービスからデータを取得して、アプリに表示します。
プログラムから呼び出せるように公開された機能をWeb APIと呼びます。

## zipcloud

ここでは、郵便番号から住所を検索できる [zipcloud](https://zipcloud.ibsnet.co.jp/doc/api) というWeb APIを使います。
ブラウザで次のURLにアクセスしてみてください。
末尾の7桁が郵便番号です。

```text
https://zipcloud.ibsnet.co.jp/api/search?zipcode=3591104
```

次のようなデータが返ってきます。

```json
{
  "message": null,
  "results": [
    {
      "address1": "埼玉県",
      "address2": "所沢市",
      "address3": "榎町",
      "kana1": "ｻｲﾀﾏｹﾝ",
      "kana2": "ﾄｺﾛｻﾞﾜｼ",
      "kana3": "ｴﾉｷﾁｮｳ",
      "prefcode": "11",
      "zipcode": "3591104"
    }
  ],
  "status": 200
}
```

この形式をJSONと呼びます。
`{ }` がキーと値の組の集まり、`[ ]` がリストで、Dartのマップとリストによく似ています。
Web APIの多くは、JSONでデータを返します。

## dioを追加する

HTTPリクエストを送るためのパッケージを使います。
第42章と同じ手順で、[pub.dev](https://pub.dev/packages/dio) で `dio` を探して `pubspec.yaml` に追加します。
バージョンは `Installing` のタブで確認してください。

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  dio: ^5.9.0
```

標準的なパッケージとして `http` もありますが、`dio` はサンプルが簡潔なので、ここで採用しました。

## リクエストを送る

`dio.get` にURLを渡すと、リクエストが送信されます。
通信は時間がかかるので、戻り値は `Future` です。
`await` で結果を待つので、`onPressed` の無名関数には `async` を付けます。

```dart
ElevatedButton(
  onPressed: () async {
    final dio = Dio();
    final response = await dio.get(
        'https://zipcloud.ibsnet.co.jp/api/search?zipcode=3591104');
    print(response.data);
  },
  child: const Text('Fetch'),
),
```

ボタンを押すと、`DEBUG CONSOLE` に先ほどのデータが表示されます。

## JSONを解析する

`response.data` は、ここでは1つの長い文字列です。
そのままでは一部の値だけを取り出しにくいので、`dart:convert` の `jsonDecode` でマップに変換します。
変換後はこれまでのマップとリストの知識で値を取り出せます。

```dart
var resJson = jsonDecode(response.data);
print(resJson['results'][0]['address1']);
```

`resJson['results']` がリストで、その0番目の要素がマップです。
そのキー `address1` の値が、都道府県の `埼玉県` です。

## 画面に表示する

取得した値を画面に表示するので、状態が必要です。
`StatelessWidget` で書いていた場合は、クラス名のメニューから `Convert to StatefulWidget` を選ぶと変換できます。
全体は次のようになります。

```dart
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String pref = '';
  String city = '';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HTTPのサンプル',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Webリクエストの練習'),
        ),
        body: Center(
          child: Column(
            children: [
              ElevatedButton(
                onPressed: () async {
                  final dio = Dio();
                  final response = await dio.get(
                      'https://zipcloud.ibsnet.co.jp/api/search?zipcode=3591104');
                  var resJson = jsonDecode(response.data);

                  setState(() {
                    pref = resJson['results'][0]['address1'];
                    city = resJson['results'][0]['address2'];
                  });
                },
                child: const Text('Fetch'),
              ),
              const SizedBox(height: 20),
              Text('都道府県: $pref'),
              Text('市区町村: $city'),
            ],
          ),
        ),
      ),
    );
  }
}
```

`Fetch` を押すと、都道府県と市区町村が表示されます。

## 発展

この例では郵便番号をコードに直接書いています。
第41章の `TextField` と組み合わせて入力された値をURLに埋め込めば、任意の郵便番号を検索できるアプリになります。
第24章の `try-catch` で通信の失敗に備えたり、第33章の `CircularProgressIndicator` で通信中であることを示したりするのもよいでしょう。
Androidでのリリースビルドに必要な権限とHTTP通信の制限は第51章で、APIキーの扱いは第52章で説明します。
