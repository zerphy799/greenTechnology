<script setup>
import { ref } from 'vue'
import { useData } from '../../composables/useData'
const { MOCK } = useData()

const highlightIcons = ['🧪', '⚙️', '🔬', '🔄']
const highlightColors = ['red', 'gold', 'blue', 'green']

// 论文折叠面板状态
const activePaperIndex = ref(-1)
function togglePaper(i) {
  activePaperIndex.value = activePaperIndex.value === i ? -1 : i
}
</script>

<template>
  <section class="section" id="innovation">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 05</span>
        <h2 class="section-title">创新优势</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.innovation.intro }}</p>
      <div class="card-grid col4" style="margin-top:40px">
        <div v-for="(h, i) in MOCK.innovation.highlights" :key="h.title" class="card" data-reveal-stagger>
          <div class="card-icon" :class="highlightColors[i]">{{ highlightIcons[i] }}</div>
          <h3>{{ h.title }}</h3>
          <p>{{ h.desc }}</p>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">与传统工艺对比</h3>
      <div style="overflow-x:auto" data-reveal="up">
        <table class="compare-table">
          <thead>
            <tr>
              <th v-for="(h, i) in MOCK.innovation.comparison.headers" :key="i" :class="{ 'highlight-col': i > 0 }">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in MOCK.innovation.comparison.rows" :key="ri">
              <td v-for="(cell, ci) in row" :key="ci" :class="{ 'highlight-col': ci === 1 }">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">代表性论文</h3>
      <div class="accordion">
        <div
          v-for="(paper, i) in MOCK.innovation.papers"
          :key="i"
          class="accordion-item"
          :class="{ active: activePaperIndex === i }"
        >
          <div class="accordion-header" @click="togglePaper(i)">论文 {{ i + 1 }}</div>
          <div class="accordion-body">
            <div class="accordion-content">{{ paper }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
