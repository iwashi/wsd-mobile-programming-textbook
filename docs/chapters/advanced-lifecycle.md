この章は発展の内容で、講義動画では扱いません。

スマートフォンのアプリは、電話の着信や別のアプリへの切り替えで、いつでも中断されます。
第47章で学んだ `initState` と `dispose` は1つのWidgetの一生を表すもので、アプリの中断や復帰では呼ばれません。
アプリ全体の状態の変化を知るには、別の仕組みを使います。

## アプリの状態

アプリの状態は `AppLifecycleState` というenumで表されます。

| 状態 | 意味 | 起きる場面の例 |
| --- | --- | --- |
| `resumed` | 表示されていて、操作を受け付ける | 通常の使用中 |
| `inactive` | 表示されているが、操作を受け付けない | アプリの切り替え画面を開いたとき |
| `hidden` | 表示されていない | `inactive` と `paused` の間 |
| `paused` | 画面の外にあり、バックグラウンドにいる | ホーム画面に戻ったとき |
| `detached` | エンジンは動いているが、画面と結び付いていない | 起動の直前など |

iOSとAndroidでは、ホーム画面に戻ると次の順に状態が変わり、アプリを開き直すと逆の順にたどります。

```text
resumed → inactive → hidden → paused
```

## 状態の変化を受け取る

`AppLifecycleListener` を使うと、状態の変化を受け取れます。
画面に履歴を表示する例で確かめます。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(home: LifecyclePage()));
}

class LifecyclePage extends StatefulWidget {
  const LifecyclePage({super.key});

  @override
  State<LifecyclePage> createState() => _LifecyclePageState();
}

class _LifecyclePageState extends State<LifecyclePage> {
  late final AppLifecycleListener _listener;
  final List<String> _logs = [];

  @override
  void initState() {
    super.initState();
    _listener = AppLifecycleListener(
      onStateChange: _onStateChange,
    );
  }

  @override
  void dispose() {
    _listener.dispose();
    super.dispose();
  }

  void _onStateChange(AppLifecycleState state) {
    setState(() {
      _logs.add(state.name);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('アプリの状態')),
      body: SingleChildScrollView(
        child: Column(
          children: [
            for (final log in _logs) Text(log),
          ],
        ),
      ),
    );
  }
}
```

実行して、iOSシミュレータで `command + shift + H` を押してホーム画面に戻り、アプリを開き直します。
次の履歴が表示されます。

```text
inactive
hidden
paused
hidden
inactive
resumed
```

`AppLifecycleListener` は作成した時点で受け取りを始めるので、`initState` で作成します。
不要になった後も受け取り続けないように、`dispose` で解除します。
第25章の `late` を使っているのは、`build` より前に `initState` で必ず値が入るからです。

`onStateChange` のほかに、`onHide`、`onShow`、`onPause`、`onResume` のように特定の変化だけを受け取る引数もあります。

古いコードでは、同じ目的で `WidgetsBindingObserver` を使っていることがあります。
ネット上のサンプルで `didChangeAppLifecycleState` というメソッドを見かけたら、この仕組みです。

## バックグラウンドに移るときにデータを保存する

バックグラウンドのアプリは、OSによって予告なく終了させられることがあります。
メモリが足りなくなったときなどです。
アプリの切り替え画面から利用者が上にスワイプして終了する場合も、通知が届くとは限りません。
先ほどのアプリを切り替え画面から終了させても、`detached` の履歴を確認する機会はありません。

したがって、「終了するときに保存する」という作りにはできません。
入力中の内容を残すには、バックグラウンドに移る時点で保存しておきます。
次の例は、第47章の `shared_preferences` を使い、入力中のメモを `onHide` で保存します。

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MaterialApp(home: MemoPage()));
}

class MemoPage extends StatefulWidget {
  const MemoPage({super.key});

  @override
  State<MemoPage> createState() => _MemoPageState();
}

class _MemoPageState extends State<MemoPage> {
  late final AppLifecycleListener _listener;
  final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadMemo();
    _listener = AppLifecycleListener(onHide: _saveMemo);
  }

  @override
  void dispose() {
    _listener.dispose();
    _controller.dispose();
    super.dispose();
  }

  Future<void> _loadMemo() async {
    final prefs = await SharedPreferences.getInstance();
    _controller.text = prefs.getString('memo') ?? '';
  }

  Future<void> _saveMemo() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('memo', _controller.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('メモ')),
      body: SafeArea(
        child: TextField(controller: _controller, maxLines: null),
      ),
    );
  }
}
```

`TextEditingController` は、`TextField` の内容を読み書きするためのオブジェクトです。
これも不要になったら `dispose` を呼びます。

`onPause` ではなく `onHide` を使ったのは、`paused` より前に通るので、保存に使える時間を確保しやすいからです。
ただし、保存は非同期処理なので、完了する前にOSがアプリを止める可能性は残ります。
失うと困るデータは、この方法に頼らず、変更のたびに保存します。

## 中断と復帰で考えること

保存以外にも、状態に応じて考えることがあります。

- 動画や音楽：バックグラウンドに移ったら止めるのか、続けるのかを決めます。
- 機密情報の表示：`inactive` では画面が見えたままで、切り替え画面に内容が映ることがあります。銀行アプリのように隠したい場合は、`inactive` で画面を覆います。
- 表示の更新：離れていた間に情報が古くなっているかもしれません。`onResume` で再取得すると最新の内容になります。
- 通信：バックグラウンドに移ると、途中の通信が中断されることがあります。第24章の `try-catch` で失敗に備え、復帰後にやり直せるようにします。

時間の計測には注意が必要です。
`Timer` で1秒ごとに数える作りでは、OSがアプリを止めている間は数が増えません。
開始した時刻を `DateTime.now()` で覚えておき、現在の時刻との差を計算すると、中断をはさんでも正しい時間が得られます。

バックグラウンドでの処理そのものは、OSが厳しく制限しています。
電池の消費を抑えるためです。
Flutterのコードがずっと動き続けることを前提にはできません。
決まった時刻に利用者へ知らせたいときは、第51章の通知を使います。
