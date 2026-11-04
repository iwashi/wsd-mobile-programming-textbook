<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { chapterList, chapterNumber } from '../chapters.mts'

const { page } = useData()

const slug = computed(() => page.value.relativePath.replace(/^chapters\//, '').replace(/\.md$/, ''))
const chapter = computed(() => chapterList.find((item) => item.slug === slug.value))
const number = computed(() => String(chapterNumber(slug.value)).padStart(2, '0'))
</script>

<template>
  <header v-if="chapter" class="chapter-header">
    <p class="chapter-number">Chapter {{ number }}</p>
    <h1 class="chapter-title">{{ chapter.title }}</h1>
  </header>
</template>
