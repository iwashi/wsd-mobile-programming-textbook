この章では、新しいリポジトリを作り、コミットを2つ作ってから1つ前の状態へ戻します。
変更の取り消し方と、Gitで管理しないファイルの指定方法も学びます。
ターミナルを開いて、順にコマンドを実行してください。

## リポジトリを作る

最初に、Gitの設定をします。
`user.name` と `user.email` は、コミットの作者として記録する名前とメールアドレスです。
設定しなくても動く場合はありますが、作者が正しく記録されず、警告も表示されます。
`init.defaultBranch` は、新しいリポジトリの最初のブランチの名前です。
macOSのGitでは、設定しないと `master` になるので、GitHubに合わせて `main` にします。
`--global` を付けると、このパソコンのすべてのリポジトリに適用されます。

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
git config --global init.defaultBranch main
```

名前とメールアドレスは自分のものに置き換えてください。

次に、作業用のディレクトリを作り、その中に移動します。
`git init` を実行すると、そのディレクトリがGitのリポジトリになります。
この時点では、コミットが1つもない空のリポジトリです。

```bash
mkdir git_practice
cd git_practice
git init
```

## 最初のコミットを作る

`echo` は文字列を出力するコマンドで、`>` を付けるとその出力をファイルに書き込みます。
次のコマンドで `test` と書かれた `hoge.txt` ができます。

```bash
echo "test" > hoge.txt
```

今の状態は `git status` で確認できます。

```bash
git status
```

```text
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hoge.txt

nothing added to commit but untracked files present (use "git add" to track)
```

`Untracked files` は、Gitがまだ管理していないファイルの一覧です。
`On branch main` は、今いるブランチの名前です。
`init.defaultBranch` を設定する前に作ったリポジトリでは、`master` と表示されます。
ブランチについては第5章で説明します。
`git status` は、次に何をすればよいかも表示してくれるので、迷ったらまず実行してください。

コミットは2段階で作ります。
`git add` で、次のコミットに含める変更をステージ（インデックスとも呼びます）という場所に登録します。
`git commit` は、ステージの内容をコミットとして記録します。
2段階に分かれているので、編集した変更のうち一部のファイルだけをコミットできます。

```bash
git add hoge.txt
git commit -m "1st commit"
```

`-m` に続けて書いた文字列がコミットメッセージです。
`-m` を付けずに実行するとメッセージ入力用のエディタが起動するので、慣れるまでは `-m` を付けるとよいでしょう。

記録されたコミットは `git log` で確認できます。

```bash
git log
```

## 差分を確認して2つ目のコミットを作る

ファイルに1行追加します。
`>>` は、ファイルの末尾に追記する記号です。
`cat` でファイルの中身を表示すると、2行になっていることを確認できます。

```bash
echo "second test" >> hoge.txt
cat hoge.txt
```

```text
test
second test
```

`git diff` を実行すると、まだステージしていない変更が表示されます。
今はステージの内容が直前のコミットと同じなので、直前のコミットからの変更が表示されます。

```bash
git diff
```

```diff
--- a/hoge.txt
+++ b/hoge.txt
@@ -1 +1,2 @@
 test
+second test
```

先頭に `+` が付いた行が、追加された行です。
確認できたらコミットします。
今回は `git add .` を使います。
ファイル名の代わりに `.` を指定すると、現在のディレクトリ以下の変更をすべて追加できます。

なお、`git add` の後では、変更はステージ済みなので `git diff` には表示されません。
ステージ済みの変更を見るときは `git diff --staged` を使います。

```bash
git add .
git commit -m "2nd commit"
```

`git log` の出力は情報量が多いので、全体を手早く眺めたいときは `--oneline` を付けます。

```bash
git log --oneline
```

```text
3d0a2b1 2nd commit
8fc6e47 1st commit
```

先頭に表示されるのはコミットIDの短縮形です。
IDの値は環境ごとに異なります。

## コミットする前の変更を取り消す

コミットしていない編集を取り消して、ファイルを直前の状態に戻すには `git restore` を使います。
試しに1行追加してから取り消します。

```bash
echo "mistake" >> hoge.txt
git restore hoge.txt
cat hoge.txt
```

```text
test
second test
```

取り消した編集は元に戻せないので、ファイル名を確認してから実行してください。

## 1つ前のコミットへ戻す

2つ目のコミットが不要だったとして、1つ目のコミットの状態へ戻します。
`git reset --hard` に、戻りたいコミットのIDを指定します。

```bash
git reset --hard 8fc6
```

`8fc6` の部分には、自分の `git log --oneline` に表示されたIDを使ってください。
本来のIDは40桁ですが、1つのコミットを特定できる長さがあれば先頭の数桁だけで指定できます。

ファイルの中身を見ると、追記した行がなくなっています。

```bash
cat hoge.txt
```

```text
test
```

::: warning
`git reset --hard` は、コミットしていない変更も消してファイルを指定の状態に戻します。
残したい変更がないことを確認してから実行してください。
また、履歴からコミットをなくすので、GitHubへ送ったコミットには使わないでください。
手元とGitHubの履歴が食い違い、そのままでは `git push` できなくなります。
:::

## コミットを打ち消すコミットを作る

履歴を残したまま変更を取り消すには、`git revert` を使います。
指定したコミットと逆の変更を、新しいコミットとして記録します。
`HEAD` は、今の最新のコミットを指す名前です。
`--no-edit` を付けると、メッセージの編集を省略できます。

```bash
echo "third test" >> hoge.txt
git add .
git commit -m "3rd commit"
git revert HEAD --no-edit
git log --oneline
```

```text
ecb5ecc Revert "3rd commit"
ec45f01 3rd commit
8fc6e47 1st commit
```

`3rd commit` の履歴は残ったまま、ファイルの中身はその前の状態に戻ります。
GitHubへ送ったコミットを取り消すときは、`git reset --hard` ではなくこちらを使います。

## Gitで管理しないファイルを指定する

ビルドで生成されるファイルや、APIキーのような秘密の情報は、リポジトリに入れません。
生成物は実行すれば作り直せますし、秘密の情報をGitHubへ送ると、他の人に見られるおそれがあるからです。
`.gitignore` というファイルに名前を書くと、そのファイルはGitの管理対象から外れます。

```bash
echo "secret" > .env
echo ".env" > .gitignore
git status
```

```text
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

`.env` が一覧に表示されず、`git add .` でも追加されなくなります。
`.gitignore` 自体はコミットします。
Flutterのプロジェクトには、よくある生成物を指定した `.gitignore` が最初から入っています。

すでにコミットしたファイルは、`.gitignore` に書いても管理対象から外れません。
その場合は `git rm --cached ファイル名` を実行してからコミットします。
ただし過去のコミットには内容が残るので、GitHubへ送ってしまったAPIキーは、発行元で無効にして作り直してください。

## コマンドのまとめ

| コマンド | 役割 |
| --- | --- |
| `git init` | リポジトリを作る |
| `git status` | 今の状態を見る |
| `git add` | 変更をステージに登録する |
| `git commit -m` | ステージの内容でコミットを作る |
| `git log` | 履歴を見る |
| `git diff` | まだステージしていない変更を見る |
| `git diff --staged` | ステージ済みの変更を見る |
| `git restore` | コミットしていない編集を取り消す |
| `git reset --hard` | 指定したコミットの状態へ戻す |
| `git revert` | 指定したコミットを打ち消すコミットを作る |
