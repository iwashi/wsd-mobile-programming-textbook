// 目次の唯一の定義。サイドバー、トップページ、章ヘッダーの番号はここから作る。
export interface Chapter {
  slug: string
  title: string
}

export interface Part {
  title: string
  chapters: Chapter[]
}

export const parts: Part[] = [
  {
    title: '第0部 開発環境の構築',
    chapters: [
      { slug: 'flutter-setup', title: 'Flutterの開発環境を構築する' },
    ],
  },
  {
    title: '第1部 GitとGitHub',
    chapters: [
      { slug: 'git-basics', title: 'Gitとは何か' },
      { slug: 'git-practice', title: 'ローカルリポジトリを操作する' },
      { slug: 'github', title: 'GitHubを使う準備をする' },
      { slug: 'advanced-git-branch', title: '発展：ブランチとPull Request' },
    ],
  },
  {
    title: '第2部 Dartの基本',
    chapters: [
      { slug: 'dart-first', title: 'DartPadではじめてのプログラム' },
      { slug: 'dart-print', title: 'printと実行順序' },
      { slug: 'dart-errors', title: 'エラーメッセージの読み方' },
      { slug: 'dart-variables', title: '変数と数値型' },
      { slug: 'dart-string', title: '文字列' },
      { slug: 'dart-bool', title: 'bool型と変数の名前' },
      { slug: 'dart-operators', title: '計算と演算子' },
      { slug: 'dart-if', title: '条件分岐' },
      { slug: 'advanced-enum-switch', title: '発展：enumとswitch' },
      { slug: 'dart-loop', title: '繰り返し' },
      { slug: 'dart-list', title: 'リスト' },
      { slug: 'dart-map', title: 'マップ' },
    ],
  },
  {
    title: '第3部 関数とクラス',
    chapters: [
      { slug: 'dart-function', title: '関数の基礎' },
      { slug: 'dart-scope', title: '変数のスコープ' },
      { slug: 'dart-parameters', title: 'さまざまな引数' },
      { slug: 'dart-class', title: 'クラスとオブジェクト' },
      { slug: 'dart-method', title: 'メソッド' },
      { slug: 'dart-constructor', title: 'コンストラクタ' },
      { slug: 'dart-getter-setter', title: 'getterとsetter' },
      { slug: 'dart-exception', title: 'エラー処理' },
      { slug: 'advanced-null-safety', title: '発展：null安全を使いこなす' },
    ],
  },
  {
    title: '第4部 Flutterで画面を作る',
    chapters: [
      { slug: 'flutter-hello', title: 'はじめてのFlutterアプリ' },
      { slug: 'flutter-inheritance', title: 'Widgetの土台になる継承' },
      { slug: 'advanced-class', title: '発展：クラスの設計を広げる' },
      { slug: 'flutter-image', title: '画像を表示する' },
      { slug: 'flutter-safearea', title: 'SafeAreaとlintの警告' },
      { slug: 'flutter-container', title: 'Container' },
      { slug: 'flutter-layout', title: 'ColumnとRowで並べる' },
      { slug: 'flutter-stack', title: 'Stackとジェネリクス' },
      { slug: 'flutter-style', title: 'テーマと文字の装飾' },
    ],
  },
  {
    title: '第5部 状態と操作',
    chapters: [
      { slug: 'flutter-state', title: 'StatefulWidgetとsetState' },
      { slug: 'flutter-input', title: 'タップを受け取るWidget' },
      { slug: 'advanced-functions', title: '発展：関数を値として扱う' },
      { slug: 'advanced-collections', title: '発展：Setとコレクションの便利な書き方' },
      { slug: 'flutter-reading', title: 'サンプルアプリのコードを読む' },
    ],
  },
  {
    title: '第6部 複数の画面と外部パッケージ',
    chapters: [
      { slug: 'flutter-navigator', title: '画面を移動する' },
      { slug: 'flutter-textfield', title: '入力を受け取り次の画面へ渡す' },
      { slug: 'flutter-package', title: '外部パッケージを使う' },
    ],
  },
  {
    title: '第7部 非同期処理と通信',
    chapters: [
      { slug: 'async-concept', title: '非同期処理の考え方' },
      { slug: 'async-await', title: 'asyncとawait' },
      { slug: 'navigator-result', title: 'popで値を返す' },
      { slug: 'http-dio', title: 'Web APIからデータを取得する' },
      { slug: 'persistence', title: '状態を永続化する' },
    ],
  },
  {
    title: '第8部 アプリとして仕上げる',
    chapters: [
      { slug: 'advanced-screen', title: '発展：画面と端末の違いに対応する' },
      { slug: 'advanced-lifecycle', title: '発展：アプリのライフサイクル' },
      { slug: 'advanced-packages', title: '発展：パッケージを管理する' },
      { slug: 'advanced-device', title: '発展：権限と端末の機能' },
      { slug: 'advanced-security', title: '発展：データ保存とセキュリティ' },
      { slug: 'advanced-release', title: '発展：実機での実行とストア配布' },
    ],
  },
]

export const chapterList = parts.flatMap((part) => part.chapters)

// 第0部の章を第0章とするので、章番号は0から数える
export const chapterNumber = (slug: string): number =>
  chapterList.findIndex((chapter) => chapter.slug === slug)
