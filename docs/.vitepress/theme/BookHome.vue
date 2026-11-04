<script setup lang="ts">
import { withBase } from 'vitepress'
import { parts, chapterNumber } from '../chapters.mts'

const first = parts[0].chapters[0].slug
const chapterCount = parts.reduce((total, part) => total + part.chapters.length, 0)
</script>

<template>
  <div class="book-home">
    <section class="book-hero">
      <div class="book-cover" aria-hidden="true">
        <p class="book-cover-label">Mobile Programming</p>
        <p class="book-cover-title">モバイル<br />プログラミング</p>
        <p class="book-cover-sub">Git / Dart / Flutter</p>
      </div>
      <div class="book-summary">
        <h1>モバイルプログラミング</h1>
        <p>
          早稲田大学の講義「モバイルプログラミング」のテキストです。開発環境を構築したあと、Gitによるバージョン管理、Dartの文法、Flutterによる画面作りを順に学び、最後は複数の画面を持ち、Web APIと通信し、データを保存するアプリまでを扱います。
        </p>
        <a class="book-start" :href="withBase(`/chapters/${first}`)">最初の章から読む</a>
      </div>
    </section>

    <section class="book-toc">
      <h2>Chapters <small>全{{ chapterCount }}章</small></h2>
      <div v-for="part in parts" :key="part.title" class="book-part">
        <h3>{{ part.title }}</h3>
        <ol>
          <li v-for="chapter in part.chapters" :key="chapter.slug">
            <a :href="withBase(`/chapters/${chapter.slug}`)">
              <span class="book-toc-number">Chapter {{ String(chapterNumber(chapter.slug)).padStart(2, '0') }}</span>
              <span class="book-toc-title">{{ chapter.title }}</span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
