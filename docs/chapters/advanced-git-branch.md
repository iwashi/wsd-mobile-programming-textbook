この章は発展の内容で、講義動画では扱いません。

ブランチを使うと、現在のコードに影響を与えずに、新しい機能の開発や修正を進められます。
複数人で開発するときは、ブランチごとにPull Requestを作って変更を確認します。
第2章の `git_practice` のような練習用のリポジトリで試してください。

## ブランチを作る

ブランチは、履歴の枝分かれです。
`git init` の直後から、`main`（環境によっては `master`）という名前のブランチで作業しています。
この章では `main` と表記します。

`git switch -c` で新しいブランチを作り、そこへ切り替えます。

```bash
git switch -c feature/greeting
echo "hello" >> hoge.txt
git add .
git commit -m "挨拶を追加"
```

`git branch` でブランチの一覧を確認できます。
`*` が付いているものが、今いるブランチです。

```bash
git branch
```

```text
* feature/greeting
  main
```

`git switch` で `main` に戻ると、`hoge.txt` から `hello` の行が消えます。
そのコミットは `feature/greeting` にだけあるからです。

```bash
git switch main
cat hoge.txt
```

## マージする

別のブランチの変更を今のブランチに取り込むことを、マージと呼びます。
取り込む先のブランチに移動してから、`git merge` を実行します。

```bash
git merge feature/greeting
```

マージした後のブランチは、`git branch -d feature/greeting` で削除できます。

## 競合を解決する

2つのブランチで同じ箇所を別々に変更すると、Gitはどちらを残すか判断できません。
第1章で説明した競合です。
先ほどのマージをまだ実行していなければ、`main` に別の変更をコミットしてからマージすると、競合を再現できます。

```bash
echo "world" >> hoge.txt
git add .
git commit -m "worldを追加"
git merge feature/greeting
```

```text
Auto-merging hoge.txt
CONFLICT (content): Merge conflict in hoge.txt
Automatic merge failed; fix conflicts and then commit the result.
```

ファイルには、次のように両方の内容が書き込まれています。
`<<<<<<< HEAD` から `=======` までが今のブランチの内容、`=======` から `>>>>>>>` までが取り込もうとしたブランチの内容です。

```text
test
<<<<<<< HEAD
world
=======
hello
>>>>>>> feature/greeting
```

エディタでファイルを正しい内容に書き換え、`<<<<<<<` などの記号の行も消します。
その後で `git add` と `git commit` を実行すると、マージが完了します。

```bash
git add hoge.txt
git commit -m "feature/greetingをマージ"
```

途中でやめたいときは、`git merge --abort` でマージを始める前の状態に戻せます。

## Pull Requestで変更を確認する

Pull Requestは、ブランチの変更を取り込むようにGitHub上で依頼する機能です。
差分を見ながらコメントでやり取りし、確認できたらマージします。
流れは次のとおりです。

1. ブランチを作ってコミットします。
2. ブランチをGitHubへ送ります。
3. Pull Requestを作ります。
4. 差分を確認して、マージします。
5. 手元の `main` に切り替え、`git pull` で取り込みます。

コマンドで書くと次のようになります。
`gh pr create` は、タイトルと説明を対話形式で尋ねます。

```bash
git switch -c feature/profile
git add .
git commit -m "プロフィール画面を追加"
git push -u origin feature/profile
gh pr create
```

`git push` の後でGitHubのリポジトリの画面を開くと、Pull Requestを作るボタンも表示されます。
作成したPull Requestの画面で `Files changed` を開くと差分を確認でき、`Merge pull request` を押すとマージされます。

マージの後は、手元でも `main` を最新にします。

```bash
git switch main
git pull
```
