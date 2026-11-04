この章は発展の内容で、講義動画では扱いません。

これまではシミュレータでアプリを動かしてきました。
自分のスマートフォンで動かし、他の人に使ってもらうまでには、いくつかの手順があります。
全体の流れは次のとおりです。

1. 実機で動かす
2. アプリの名前、バージョン、アイコンを決める
3. リリースビルドを作る
4. テスターに配布する
5. ストアに申請して公開する

ストアの画面や規約は頻繁に変わるので、この章では流れをつかむことを目標にします。
実際に公開するときは、[iOSの公式手順](https://docs.flutter.dev/deployment/ios) と [Androidの公式手順](https://docs.flutter.dev/deployment/android) を確認してください。

## 3つのビルドモード

Flutterには3つのビルドモードがあります。

| モード | 用途 | 特徴 |
| --- | --- | --- |
| debug | 開発 | ホットリロードが使えます。動作は遅めです。 |
| profile | 性能の計測 | releaseに近い速度で動き、計測用のツールを接続できます。 |
| release | 配布 | 動作が速くサイズも小さくなります。デバッグの機能は取り除かれます。 |

シミュレータで動かせるのはdebugモードだけです。
実機で実行するときは `--release` を付けると、配布するものに近い状態を確かめられます。

```bash
flutter run --release
```

debugモードで動作が遅くても、releaseモードでは問題ないことがあります。
性能はprofileモードやreleaseモードで、実機を使って判断します。

## 実機で実行する

シミュレータでは分からないことがあります。
カメラやプッシュ通知の動作、実際の処理速度、指で操作したときの押しやすさなどです。

iPhoneで実行する手順は次のとおりです。
Apple Accountがあれば、費用はかかりません。

1. iPhoneをMacにUSBケーブルで接続し、表示されたダイアログで `Trust`（信頼）を選びます。
2. `open ios/Runner.xcworkspace` でXcodeを開きます。
3. 左側の `Runner` を選び、`Signing & Capabilities` の `Team` に自分のApple Accountを指定します。
4. `Bundle Identifier` を他と重ならないものに変更します。Bundle IDについては次の節で説明します。
5. iPhoneの設定の `Privacy & Security` で `Developer Mode` をオンにして、再起動します。
6. VS Codeの実行先をiPhoneに切り替えて実行します。

最初は、アプリを起動できないというエラーになります。
iPhoneの設定の `General`、`VPN & Device Management` で、自分の開発者証明書を信頼すると起動できるようになります。

無料のアカウントでは、インストールしたアプリは7日程度で起動できなくなるので、もう一度インストールし直します。
また、プッシュ通知のように有料の登録が必要な機能もあります。

Androidの実機では、まず `flutter doctor` の `Android toolchain` を解消する必要があります。
端末の `設定` の `デバイス情報` で `ビルド番号` を7回タップすると `開発者向けオプション` が現れるので、その中の `USBデバッグ` をオンにして接続します。

## 名前とバージョンを決める

アプリを識別するIDは、iOSではBundle ID、AndroidではアプリケーションIDと呼びます。
テンプレートでは `com.example.myApp` のような仮の値が入っています。
世界中で重複しないように、自分が管理するドメインを逆にした形式（`jp.example.memo` など）で決めます。
ストアに登録した後は変更できないので、公開前に確定させます。

ホーム画面に表示される名前は、次の場所で指定します。

- iOS：`ios/Runner/Info.plist` の `CFBundleDisplayName`
- Android：`android/app/src/main/AndroidManifest.xml` の `android:label`

バージョンは `pubspec.yaml` の `version` で指定します。

```yaml
version: 1.0.0+1
```

`+` の前が利用者に見えるバージョンです。
`+` の後はビルド番号で、ストアへアップロードするたびに増やす必要があります。

## アイコンを設定する

アイコンは、OSごとに複数のサイズの画像を用意する必要があります。
[flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons) を使うと、1枚の画像から自動で生成できます。

1024×1024ピクセルのPNG画像を `assets/icon/icon.png` に置き、パッケージを追加します。

```bash
flutter pub add --dev flutter_launcher_icons
```

`pubspec.yaml` の最上位、つまり `dependencies:` などと同じ階層に設定を追記します。

```yaml
flutter_launcher_icons:
  android: "launcher_icon"
  ios: true
  image_path: "assets/icon/icon.png"
  remove_alpha_ios: true
```

App Storeでは透過のあるアイコンが認められないので、`remove_alpha_ios` で透過を取り除きます。
生成のコマンドを実行します。

```bash
dart run flutter_launcher_icons
```

アプリを起動し直すと、ホーム画面のアイコンが変わります。
起動時に一瞬表示される画面は別の設定です。
[flutter_native_splash](https://pub.dev/packages/flutter_native_splash) などで変更できます。

## リリースビルドを作る

配布するファイルは、`flutter build` で作ります。

iOSでは、次のコマンドで `build/ios/ipa` に `.ipa` ファイルが作られます。
作成には、後で説明するApple Developer Programへの登録が必要です。

```bash
flutter build ipa
```

Androidでは、次のコマンドで `build/app/outputs/bundle/release` に `.aab` ファイルが作られます。

```bash
flutter build appbundle
```

Androidのストアに提出するファイルには、自分の鍵で署名します。
この鍵は `keytool` で作成し、パスワードと一緒に `android/key.properties` に記載します。
手順は公式ドキュメントにあります。
鍵のファイルと `key.properties` は第52章のAPIキーと同様に秘密の情報なので、Gitの管理対象に含めません。

リリースビルドでは、開発中に問題にならなかったことが表面化します。
実機で `flutter run --release` を実行し、次の点を確認します。

- 第51章のAndroidの `INTERNET` 権限を `main` の設定に追加したか
- iOSの `Info.plist` に、使う機能の説明文を入れたか
- 接続先が開発用のサーバーのままになっていないか
- 第52章のように、APIキーが正しく渡されているか
- 第48章のように、小さな画面や大きな文字で崩れないか

## テスターに配布する

ストアで一般に公開する前に、限られた人に使ってもらう仕組みがあります。

- iOS：TestFlightを使います。App Store Connectにアップロードしたビルドを、招待したテスターがインストールできます。
- Android：Google Playのテストトラックを使います。少人数ですぐに配布できる内部テストや、より広いクローズドテストがあります。

## ストアで公開する

どちらのストアでも、開発者の登録、アプリの情報の入力、審査という順に進みます。

App Storeの流れは次のとおりです。

1. [Apple Developer Program](https://developer.apple.com/programs/) に登録します。年会費がかかります。
2. App Store Connectでアプリを登録します。
3. `.ipa` ファイルをアップロードします。
4. 説明文、スクリーンショット、プライバシーポリシーのURL、収集するデータの申告などを入力します。
5. 審査に提出します。指摘を受けたら、修正して再度提出します。

Google Playの流れは次のとおりです。

1. [Google Play Console](https://play.google.com/console) に登録します。初回に登録料がかかり、本人確認も必要です。
2. アプリを作成し、`.aab` ファイルをアップロードします。
3. 説明文、スクリーンショット、データセーフティ（収集するデータの申告）、コンテンツのレーティングなどを入力します。
4. テストを経て、本番の公開を申請します。

Google Playでは、2023年11月13日より後に作成した個人のアカウントには、追加の要件があります。
本番の公開を申請する前に、12人以上のテスターが14日間続けて参加するクローズドテストを実施する必要があります。
公開までの期間を見積もるときは、この日数も含めます。

費用や条件は変更されることがあるので、登録の前に各ストアの案内を確認してください。

公開した後も作業は続きます。
OSの更新への対応、ストアの要件の変更への対応、利用者からの不具合の報告への対応などです。
更新するときは、`pubspec.yaml` のビルド番号を増やしてビルドし、同じ流れで提出します。

::: tip 第8部のまとめ
- 端末の違いには、`MediaQuery`、`LayoutBuilder`、`Expanded` で対応し、大きさを数値で固定しすぎないようにします。
- 文字サイズの変更とスクリーンリーダーで使えることを確認します。
- アプリはいつでも中断されて終了させられるので、バックグラウンドに移るときや変更のたびに保存します。
- パッケージは `flutter pub add` で追加し、アプリでは `pubspec.lock` もコミットし、ライセンスを確認します。
- カメラや位置情報の権限は、理由が伝わる場面で求め、拒否された場合も動くようにします。
- 秘密のキーはアプリに入れず、機密情報は `shared_preferences` に保存しません。
- シミュレータはdebugモードのみです。配布の前に実機でリリースビルドを確認します。
:::
