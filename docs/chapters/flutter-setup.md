::: tip 第0部の到達目標
- VS CodeとFlutter SDKをインストールできる
- `flutter doctor` の結果を読み、環境の状態を確認できる
- iOSシミュレータを起動し、Flutterのサンプルアプリを実行できる
:::

この章では、本書で使う開発環境を構築します。
手順は公式ドキュメントの [Install Flutter](https://docs.flutter.dev/install) と [Set up iOS development](https://docs.flutter.dev/platform-integration/ios/setup) に沿っています。
詳細は講義で説明します。
Flutterの手順は更新されることがあるので、本書と画面が異なるときは公式ドキュメントを優先してください。

本書はmacOSでiOSシミュレータを使って進めます。
iOSアプリのビルドにはXcodeが必要で、XcodeはmacOSでしか動かないためです。

::: warning Intel搭載のMacを使う場合
Intel搭載のMacのサポートは非推奨になっており、将来のリリースではApple Siliconが必要になります。
:::

環境を構築する順序は次のとおりです。

1. コマンドラインツールとVS Codeを入れる
2. VS CodeからFlutter SDKを入れる
3. XcodeとiOSシミュレータを入れる
4. 全体を確認する
5. サンプルアプリを起動する

## コマンドラインツールとVS Codeを入れる

ターミナルで次のコマンドを実行し、Xcodeコマンドラインツールをインストールします。
ダイアログが表示されたら `Install` を押し、完了したら `Done` を押します。
すでにインストールされている場合は、その旨のメッセージが表示されるので次へ進んでください。

```bash
xcode-select --install
```

このツールにはGitが含まれており、第1部でも使います。

次に、[Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview) をインストールします。

## Flutter SDKを入れる

SDKは、そのプラットフォーム向けの開発に必要な道具一式のことです。
Flutter SDKには、Flutterのライブラリと `flutter` コマンドのほか、Dartの実行環境も含まれています。
公式ドキュメントが推奨している、VS Codeの拡張機能からインストールする方法を使います。

まず、拡張機能を入れます。
VS Codeで `command + shift + X` を押して `Extensions` を開き、`Flutter` を検索して `Install` を押します。
Dartの拡張機能も一緒にインストールされます。

次に、拡張機能からSDKをダウンロードします。

1. `command + shift + P` を押してコマンドパレットを開き、`Flutter: New Project` を選びます。
2. SDKの場所を尋ねられたら、`Download SDK` を選びます。
3. 保存先のフォルダを選び、`Clone Flutter` を押します。ダウンロードには数分かかります。
4. 完了の通知が出たら、`Add SDK to PATH` を押します。
5. Google Analyticsについての通知が出たら、内容を確認して選びます。
6. 開いているターミナルをすべて閉じて開き直し、VS Codeも再起動します。

PATHは、コマンドを実行するときにプログラムを探す場所の一覧です。
SDKの場所をここに追加すると、ターミナルから `flutter` コマンドを実行できるようになります。
ターミナルとVS Codeを開き直すのは、起動済みのものには変更後のPATHが反映されないためです。

ダウンロードが止まったように見えるときは、`Cancel` を押して最初からやり直します。
プロジェクトはこの章の最後に作るので、この時点でプロジェクトの種類を尋ねられた場合は `esc` キーで閉じてかまいません。

インストールできたら、ターミナルで次のコマンドを実行します。

```bash
flutter doctor
```

`flutter doctor` は、開発環境の状態を項目ごとに診断するコマンドです。
`[✓]` は問題なし、`[!]` は確認が必要な項目、`[✗]` は使えない項目を表します。
この時点では `Flutter` の項目に `[✓]` が付いていれば十分です。
`Xcode` の項目はこのあとの手順で解消します。

## XcodeとiOSシミュレータを入れる

[Xcode](https://developer.apple.com/xcode/) の最新版をインストールします。
ダウンロードに時間がかかるので、余裕のあるときに進めてください。

インストールできたら、ターミナルで次のコマンドを順に実行します。
`sudo` は管理者権限で実行する命令で、Macのログインパスワードを尋ねられます。
入力中の文字は画面に表示されませんが、そのまま入力して `return` キーを押してください。

まず、コマンドラインから使うXcodeを指定し、初回起動時の処理を済ませます。

```bash
sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
```

次に、ライセンスを読んで同意します。

```bash
sudo xcodebuild -license
```

最後に、iOSのプラットフォームとシミュレータをダウンロードします。

```bash
xcodebuild -downloadPlatform iOS
```

続いて、[CocoaPodsのインストールガイド](https://guides.cocoapods.org/using/getting-started.html#installation) に従ってCocoaPodsをインストールします。
CocoaPodsは、ネイティブのコードを含むパッケージをiOSアプリに組み込むために使うツールです。
第42章で外部パッケージを使うときに関わってきます。

## 全体を確認する

もう一度 `flutter doctor` を実行します。

```bash
flutter doctor
```

次のように、`Flutter` と `Xcode` の項目に `[✓]` が付いていれば準備は完了です。
実際の出力はバージョンや環境によって異なります。

```text
[✓] Flutter
[!] Android toolchain - develop for Android devices
[✓] Xcode - develop for iOS and macOS
[✓] Chrome - develop for the web
```

本書ではAndroid向けのビルドをしないので、`Android toolchain` の項目は `[!]` や `[✗]` のままでかまいません。
`Chrome` など、使わない項目についても同じです。

次に、シミュレータを起動します。
Xcodeのバージョンによってコマンドが異なります。

Xcode 27以降の場合は、次のコマンドを実行します。

```bash
open -a DeviceHub
```

Xcode 26以前の場合は、次のコマンドを実行します。

```bash
open -a Simulator
```

シミュレータが起動したら、Flutterから見えているデバイスの一覧を表示します。

```bash
flutter devices
```

一覧にiOSのシミュレータが表示されれば、Flutterアプリを実行できる状態です。

## サンプルアプリを起動する

最後に、Flutterが用意しているサンプルアプリを実際に動かします。
ここまでの診断に問題がなくても、アプリのビルドで初めて見つかる問題もあるので、起動まで確認してください。
シミュレータは起動したままにしておきます。

まず、プロジェクトを作ります。

1. VS Codeで `command + shift + P` を押してコマンドパレットを開き、`Flutter: New Project` を選びます。
2. テンプレートを尋ねられたら、`Application` を選びます。
3. プロジェクトを保存する場所を選び、`Select a folder to create the project in` を押します。プロジェクト用のフォルダは自動で作られるので、自分で作る必要はありません。
4. プロジェクト名に `my_app` と入力し、`return` キーを押します。名前には小文字と下線を使います。

プロジェクトが作成されるとVS Codeで開かれるので、次に実行先を確認します。
VS Codeのウィンドウ下部のステータスバーに、実行先のデバイス名が表示されています。
iOSシミュレータ以外が表示されているときは、デバイス名を押して一覧から選び直してください。
`No Devices` と表示されているときは、シミュレータが起動していません。

`lib/main.dart` を開き、`F5` キーを押すか、メニューの `Run` から `Start Debugging` を選びます。
初回のビルドには時間がかかります。

シミュレータにカウンターのアプリが表示され、右下の `+` ボタンを押して画面の数字が増えれば、環境構築は完了です。

確認できたら、`shift + F5` を押してアプリを停止します。
第26章では新しいプロジェクトを作るので、このプロジェクトは消してもかまいません。

うまく起動しないときは、まずエラーメッセージを読みます。
シミュレータのバージョンが足りないというエラーが出たら、メッセージに従ってXcodeの設定画面の `Components`（バージョンによっては `Platforms`）からダウンロードしてください。
それでも解決しないときは、[公式のトラブルシューティング](https://docs.flutter.dev/install/troubleshoot) を確認してください。

第2部と第3部はブラウザ上のDartPadで進めるので、環境を使うのは第1部のGitと、第26章以降のFlutterです。
