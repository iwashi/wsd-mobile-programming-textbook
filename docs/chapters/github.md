GitHubは、リモートリポジトリをホストするサービスです。
リポジトリの置き場所になるだけでなく、開発者同士がコードについてやり取りするための機能も備えています。

この章では、ターミナルからGitHubを操作できるように設定します。

## アカウントを作る

アカウントがない場合は、[github.com](https://github.com/) にアクセスしてサインアップします。
画面の指示に従ってメールアドレスの確認などを済ませ、サインインできる状態にしてください。

ユーザー名は学生のあいだだけでなく、就職後も使い続けることがあります。
少し考えてから決めるとよいでしょう。

## 認証方法としてのSSH

リポジトリを手元に複製したり変更を送ったりするとき、GitHubは操作している人が正しいアカウントの持ち主かを確認します。
ターミナルから接続する場合の認証方法には、主にHTTPSとSSHの2つがあります。
ここではSSHを使います。

SSHでは、対になった2つの鍵を使います。
公開鍵はGitHubに登録し、秘密鍵は自分のパソコンの `~/.ssh` に置きます。
秘密鍵を持っていることで本人だと確認されるので、秘密鍵は他の人に渡したり、リポジトリに入れたりしないでください。

設定には、GitHubの公式コマンドラインツールであるGitHub CLI（`gh` コマンド）を使います。

## Homebrewを入れる

Homebrewは、macOSでさまざまなツールをインストールするためのパッケージマネージャーです。
すでに入っている場合、この節は飛ばしてください。

[Homebrewの公式サイト](https://brew.sh/) に表示されているインストールコマンドをコピーして、ターミナルで実行します。
インストールが終わると、最後に `Next steps` という見出しで追加のコマンドが表示されます。
これは `brew` コマンドをどこからでも実行できるように設定するものなので、表示されたものをそのまま実行してください。

## GitHub CLIを入れる

`brew` で GitHub CLI をインストールします。

```bash
brew install gh
```

`which` は、コマンドの場所を表示するコマンドです。
次のように実行してパスが表示されれば、インストールできています。

```bash
which gh
```

## GitHubにログインする

次のコマンドでログインを始めます。

```bash
gh auth login
```

対話形式でいくつか質問されるので、次のように答えます。

| 質問の内容 | 選ぶもの |
| --- | --- |
| 接続先 | GitHub.com |
| 操作に使うプロトコル | SSH |
| SSH鍵を新しく作るか | Yes |
| 鍵のパスフレーズ | 空のままEnterでもよい |
| 鍵のタイトル | 任意 |
| 認証方法 | Login with a web browser |

ブラウザが開いたら、ターミナルに表示されたコードを入力します。
GitHub CLIの認可を確認する画面で `Authorize` を押すと、ブラウザ側の設定は完了です。

SSH鍵がすでにある環境では、質問の内容が少し異なる場合があります。

## 接続を確認する

最後に、次のコマンドでGitHubとのSSH接続を確認します。

```bash
ssh -T git@github.com
```

初回は接続先を信頼するか聞かれることがあるので、内容を確認して `yes` と答えます。
自分のユーザー名を含む、次のようなメッセージが表示されれば設定は完了です。

```text
Hi iwashi! You've successfully authenticated, but GitHub does not provide shell access.
```

## GitHubのリポジトリを手元に複製する

GitHubの右上の `+` から `New repository` を選ぶと、新しいリポジトリを作れます。
`Repository name` に名前を入れ、公開範囲を `Public` か `Private` から選びます。
`Add README` を有効にして `Create repository` を押すと、ファイルが1つ入ったリポジトリができます。

リポジトリの画面で `Code` ボタンを押し、`SSH` タブに表示されたURLをコピーします。
`git clone` に続けてそのURLを指定すると、リポジトリが手元に複製されます。

```bash
git clone git@github.com:ユーザー名/リポジトリ名.git
```

複製したディレクトリの中でファイルを編集し、前の章と同じ手順でコミットします。
`git push` を実行すると、コミットがGitHubへ送られて反映されます。

```bash
git add .
git commit -m "READMEを更新"
git push
```

`git push` は、手元のコミットをGitHubへ送ります。
逆に、GitHub側の変更を手元に取り込むには `git pull` を使います。

```bash
git pull
```

別のパソコンやGitHubの画面で変更を加えたとき、手元に取り込まずに `git push` すると、拒否されます。
手元に新しいコミットがなければ、`git pull` を実行してから、もう一度 `git push` します。

手元にも新しいコミットがあると、履歴が枝分かれしているので、`git pull` は `Need to specify how to reconcile divergent branches` というエラーで止まります。
その場合は `--no-rebase` を付けて実行すると、両方の変更がマージされます。
`--no-edit` を付けると、マージのコミットメッセージの編集を省略できます。
マージについては、次の章で説明します。

```bash
git pull --no-rebase --no-edit
git push
```

同じ箇所を変更していて競合したときも、次の章で説明する手順で解決します。

## 手元のプロジェクトをGitHubへ送る

Flutterのプロジェクトのように、すでに手元にあるものをGitHubへ送ることもできます。
プロジェクトのディレクトリに移動し、リポジトリにして最初のコミットを作ります。
Flutterのプロジェクトには `.gitignore` が入っているので、そのまま `git add .` を実行できます。

```bash
cd プロジェクトのディレクトリ
git init
git add .
git commit -m "最初のコミット"
```

続いて、送り先のリポジトリをGitHubの画面で作ります。
前の節と同じように、右上の `+` から `New repository` を選び、`Repository name` に名前を入れて、公開範囲を選びます。
課題として提出するときは、公開範囲の指示に従ってください。

ただし、今回は `Add README` を有効にせず、空のまま `Create repository` を押します。
READMEを入れて作るとGitHub側に手元の履歴とつながらないコミットができ、最初の `git push` が拒否されるからです。

作成後の画面で `SSH` を選ぶと、リポジトリのURLが表示されます。
このURLを接続先として登録してから、コミットを送ります。
`origin` は接続先に付ける名前で、この名前を使うのが慣例です。
`-u` を付けて一度送ると、次からは `git push` だけで送れます。
ブランチ名が `master` のときは、`main` を `master` に置き換えてください。

```bash
git remote add origin git@github.com:ユーザー名/リポジトリ名.git
git push -u origin main
```

共同作業で使うブランチとPull Requestは、次の章で説明します。

::: tip 第1部のまとめ
- Gitは変更の履歴を記録し、`git add` と `git commit` の2段階でコミットを作ります。
- `git status` で状態を、`git diff` で差分を、`git log` で履歴を確認します。
- 取り消しには、状況に応じて `git restore`、`git reset --hard`、`git revert` を使い分けます。
- 秘密の情報や生成物は `.gitignore` で管理対象から外します。
- GitHubとは `git clone`、`git push`、`git pull` でやり取りします。
:::
