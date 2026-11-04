import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ChapterHeader from './ChapterHeader.vue'
import BookHome from './BookHome.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ChapterHeader),
    }),
  enhanceApp({ app }) {
    app.component('BookHome', BookHome)
  },
}
