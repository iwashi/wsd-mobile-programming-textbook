import { defineConfig } from 'vitepress'
import { parts } from './chapters.mts'

export default defineConfig({
  lang: 'ja',
  title: 'モバイルプログラミング',
  description: 'GitとDartの基礎からFlutterによるモバイルアプリ開発までを学ぶ、早稲田大学の講義テキスト',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ],
  cleanUrls: true,
  lastUpdated: false,
  appearance: true,
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => {
      // 原稿は一文一行で書いているので、段落内の改行を空白として出力しない
      md.renderer.rules.softbreak = () => ''
    },
    container: {
      tipLabel: 'ヒント',
      warningLabel: '注意',
      dangerLabel: '注意',
      infoLabel: '補足',
      detailsLabel: '詳細',
    },
  },
  themeConfig: {
    siteTitle: 'モバイルプログラミング',
    nav: [],
    outline: false,
    aside: false,
    sidebar: {
      '/': parts.map((part) => ({
        text: part.title,
        items: part.chapters.map((chapter) => ({
          text: chapter.title,
          link: `/chapters/${chapter.slug}`,
        })),
      })),
    },
    docFooter: { prev: '前の章', next: '次の章' },
    darkModeSwitchLabel: '外観',
    lightModeSwitchTitle: 'ライトモードに切り替え',
    darkModeSwitchTitle: 'ダークモードに切り替え',
    sidebarMenuLabel: '目次',
    returnToTopLabel: 'ページ上部へ',
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // 日本語は空白で区切られないため、単語単位に分割して索引を作る
            // この関数は文字列化してブラウザへ渡されるので、外側の変数を参照できない
            tokenize: (text: string) =>
              [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(text)]
                .filter((segment) => segment.isWordLike)
                .map((segment) => segment.segment),
          },
        },
        translations: {
          button: { buttonText: '検索', buttonAriaLabel: '検索' },
          modal: {
            displayDetails: '詳細を表示',
            resetButtonTitle: '検索語を消去',
            backButtonTitle: '閉じる',
            noResultsText: '該当する章はありません',
            footer: {
              selectText: '移動',
              navigateText: '選択',
              closeText: '閉じる',
            },
          },
        },
      },
    },
  },
})
