この章は発展の内容で、講義動画では扱いません。

カメラや位置情報は、スマートフォンならではの機能です。
一方で、写真や居場所は利用者の個人情報に直結するので、アプリが勝手に使えないようになっています。
この章では、利用者の許可である権限の扱いを学び、代表的な機能の使い方を確認します。

本書はiOSシミュレータで進めていますが、この章の内容はOSごとに異なるので、Androidの設定も併記します。
パッケージの追加には第50章の `flutter pub add` を使います。
機能を追加した後は、ホットリスタートではなくアプリを起動し直します。

## 権限の仕組み

カメラや位置情報を使うには、2つの段階があります。

1つ目は、使用する権限をアプリの設定ファイルに書くことです。
iOSでは `ios/Runner/Info.plist` に、Androidでは `android/app/src/main/AndroidManifest.xml` に書きます。
iOSでは、利用目的を説明する文を指定する必要があります。
この文は許可を求めるダイアログに表示されます。

2つ目は、実行中に利用者の許可を得ることです。
OSがダイアログを表示し、利用者が許可か拒否かを選びます。

| 機能 | iOSの `Info.plist` | Androidの `AndroidManifest.xml` |
| --- | --- | --- |
| カメラ | `NSCameraUsageDescription` | `android.permission.CAMERA`（パッケージによっては不要） |
| 写真の選択 | `NSPhotoLibraryUsageDescription` | 多くの場合は不要 |
| 位置情報 | `NSLocationWhenInUseUsageDescription` | `android.permission.ACCESS_COARSE_LOCATION`、`ACCESS_FINE_LOCATION` |
| 通知 | 不要 | `android.permission.POST_NOTIFICATIONS` |

iOSでは、説明文を書かずに保護された機能を使おうとすると、その時点でアプリが強制終了します。
権限を追加した機能でアプリが落ちるときは、まずこの設定を確認します。

権限は次の方針で扱います。

- 必要な機能だけを求める：使わない権限を求めると、利用者の信頼を失い、ストアの審査でも問われます。
- 使う直前に求める：起動直後ではなく、カメラのボタンを押したときなら、なぜ必要なのかが利用者に伝わります。
- 拒否された場合も動かす：写真を撮れなければ文章だけで投稿できるようにするなど、他の機能は使えるようにします。

拒否された権限のダイアログは、繰り返し表示できるとは限りません。
iOSでは、一度拒否されると、次からはダイアログが表示されません。
その場合は説明を表示して、OSの設定画面を開いてもらいます。

## カメラで写真を撮る

[image_picker](https://pub.dev/packages/image_picker) は、OSの標準のカメラと写真の選択画面を呼び出すパッケージです。

```bash
flutter pub add image_picker
```

`ios/Runner/Info.plist` の `<dict>` の直下に、次を追記します。
Androidでは、このパッケージのために追加する設定はありません。

```xml
<key>NSCameraUsageDescription</key>
<string>投稿に添付する写真の撮影に使います</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>投稿に添付する写真の選択に使います</string>
```

```dart
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(const MaterialApp(home: PhotoPage()));
}

class PhotoPage extends StatefulWidget {
  const PhotoPage({super.key});

  @override
  State<PhotoPage> createState() => _PhotoPageState();
}

class _PhotoPageState extends State<PhotoPage> {
  XFile? _photo;

  Future<void> _pick(ImageSource source) async {
    final XFile? photo = await ImagePicker().pickImage(source: source);
    if (photo == null) {
      return; // 利用者がキャンセルした
    }
    setState(() {
      _photo = photo;
    });
  }

  @override
  Widget build(BuildContext context) {
    final XFile? photo = _photo;

    return Scaffold(
      appBar: AppBar(title: const Text('写真')),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () => _pick(ImageSource.camera),
            child: const Text('撮影する'),
          ),
          ElevatedButton(
            onPressed: () => _pick(ImageSource.gallery),
            child: const Text('写真を選ぶ'),
          ),
          if (photo != null)
            Expanded(child: Image.file(File(photo.path))),
        ],
      ),
    );
  }
}
```

`pickImage` は、利用者がキャンセルすると `null` を返します。
第25章で学んだように、`null` の場合を処理してから使います。

iOSシミュレータにはカメラがないので、`ImageSource.camera` は失敗します。
シミュレータでは写真の選択を試し、撮影は第53章の実機で確認します。
撮影画面そのものを自作したいときは、[camera](https://pub.dev/packages/camera) パッケージを使います。

## 位置情報を取得する

[geolocator](https://pub.dev/packages/geolocator) は、位置情報を取得するパッケージです。

```bash
flutter pub add geolocator
```

iOSの `Info.plist` に利用目的を追記します。

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>現在地の近くのお店を表示するために使います</string>
```

Androidの `AndroidManifest.xml` では、`<manifest>` の直下に権限を追記します。

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

位置情報の取得には、端末の位置情報サービスが有効であることと、アプリが許可されていることの両方が必要です。
順に確認します。

```dart
import 'package:geolocator/geolocator.dart';

Future<Position?> determinePosition() async {
  // 端末の位置情報サービスが有効か
  if (!await Geolocator.isLocationServiceEnabled()) {
    return null;
  }

  // まだ尋ねていなければ、ダイアログを表示する
  LocationPermission permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }

  // 拒否されていれば、取得を諦める
  if (permission == LocationPermission.denied ||
      permission == LocationPermission.deniedForever) {
    return null;
  }

  return Geolocator.getCurrentPosition();
}
```

`deniedForever` は、ダイアログをもう表示できない状態です。
この場合は `Geolocator.openAppSettings()` でアプリの設定画面を開けるので、理由を説明した上で案内します。

取得した `Position` の `latitude` が緯度、`longitude` が経度です。

```dart
final Position? position = await determinePosition();
if (position != null) {
  print('${position.latitude}, ${position.longitude}');
}
```

iOSシミュレータには実際の現在地がないので、メニューの `Features`、`Location` から擬似的な場所を選びます。

利用者は、正確な位置ではなくおおよその位置だけを許可することもできます。
また、アプリを閉じている間も位置を取得するには、別の権限が必要で、ストアの審査でも厳しく確認されます。
本当に必要な場合に限ります。

## 通知を送る

スマートフォンの通知には、送り方の異なる2種類があります。

- ローカル通知：アプリ自身が端末内で予約や表示をします。リマインダーのように、通信がなくても送れます。
- プッシュ通知：サーバーから端末へ送ります。新着メッセージのように、端末の外で起きたことを知らせるときに使います。

プッシュ通知は、自分のサーバーが直接端末へ送るのではありません。
サーバーからAppleのAPNsやGoogleのFCMというサービスを経由して届きます。
Flutterでは [firebase_messaging](https://pub.dev/packages/firebase_messaging) を使うのが一般的です。
iOSで使うには、第53章で説明する有料のApple Developer Programへの登録が必要です。

ここでは、手元で試せるローカル通知を [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) で表示します。

```bash
flutter pub add flutter_local_notifications
```

iOSでは `Info.plist` への追記は要りませんが、`ios/Runner/AppDelegate.swift` の `didFinishLaunchingWithOptions` に次の行を追加します。

```swift
UNUserNotificationCenter.current().delegate = self as? UNUserNotificationCenterDelegate
```

Androidでは、このパッケージのReadmeに従ってビルドの設定を変更する必要があります。

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

final FlutterLocalNotificationsPlugin notifications =
    FlutterLocalNotificationsPlugin();

Future<void> initNotifications() async {
  const settings = InitializationSettings(
    android: AndroidInitializationSettings('@mipmap/ic_launcher'),
    iOS: DarwinInitializationSettings(),
  );
  await notifications.initialize(settings: settings);

  // Android 13以降で許可を求める（他のOSでは何もしない）
  await notifications
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.requestNotificationsPermission();
}

Future<void> showReminder() async {
  const details = NotificationDetails(
    android: AndroidNotificationDetails('reminder', 'リマインダー'),
    iOS: DarwinNotificationDetails(),
  );
  await notifications.show(
    id: 0,
    title: '提出期限',
    body: 'レポートの提出期限は明日です',
    notificationDetails: details,
  );
}
```

iOSでは、`initNotifications` を呼んだ時点で許可を求めるダイアログが表示されます。
実際のアプリでは、通知を使う機能を有効にする場面で呼ぶと、なぜ許可が必要なのかが伝わります。

通知を受け取るかどうかは、利用者が後からOSの設定で変更できます。
通知がオフでもアプリの他の機能が動くようにしておきます。

このパッケージは、バージョンが変わると呼び出し方も変わることがあります。
書いたとおりに動かないときは、第50章の方法で使っているバージョンを確認し、そのバージョンのReadmeを読みます。

## AndroidのINTERNET権限

第46章では、設定を変更せずに通信ができました。
iOSでは、インターネットへの通信に権限は不要です。

Androidでは、`android.permission.INTERNET` という権限が必要です。
ダイアログで尋ねることはなく、書いておくだけで有効になります。
ここに、Androidでよくある落とし穴があります。
Flutterのプロジェクトでは、この権限はデバッグ用と計測用の設定ファイルにだけ書かれていて、リリース用には書かれていません。
そのため、開発中は通信できていたアプリが、リリースビルドにしたとたんに通信できなくなることがあります。

通信するアプリでは、`android/app/src/main/AndroidManifest.xml` に追記します。

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
    <application>
        <!-- 以下省略 -->
    </application>
</manifest>
```

## HTTP通信の制限

第46章のURLは `https://` で始まっていました。
HTTPSの通信は暗号化されているので、途中の経路で内容を読まれたり書き換えられたりするのを防げます。
一方、`http://` で始まるHTTPの通信は暗号化されません。
公衆無線LANなどで通信を見られると、内容がそのまま読めてしまいます。

そのため、OSはHTTPの通信を標準で制限しています。

- iOS：App Transport Security（ATS）という仕組みで制限します。
- Android：Android 9以降は、標準でHTTPの通信を禁止します。

この制限が直接適用されるのは、OSの機能を通した通信です。
たとえばWebページをアプリ内に表示する [webview_flutter](https://pub.dev/packages/webview_flutter) で `http://` のページを開こうとすると、読み込みに失敗します。

`dio` や `http` パッケージ、`Image.network` は、標準ではOSの通信機能を使わず、Dartの通信機能を使います。
そのため、OSの設定が適用されず、`http://` の通信が成功することがあります。
これは安全であることを意味しません。
暗号化されていないことに変わりはないので、成功する場合でも、接続先には `https://` を使います。

どうしてもHTTPが必要なときは、対象を絞って例外を設定できます。
たとえば、開発用のサーバーに接続するときです。
iOSでは `Info.plist` に、対象のドメインを指定します。

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>dev.example.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

Androidでは、ネットワークセキュリティ設定というファイルで指定します。
`android/app/src/debug/res/xml/network_security_config.xml` に作成し、デバッグ用の `AndroidManifest.xml` から参照すると、リリースビルドには影響しません。

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">dev.example.com</domain>
    </domain-config>
</network-security-config>
```

```xml
<application android:networkSecurityConfig="@xml/network_security_config">
```

iOSの `NSAllowsArbitraryLoads` やAndroidの `base-config` で、すべての接続先を許可する方法もありますが、リリースするアプリでは使いません。
ストアの審査でも、理由を問われることがあります。
