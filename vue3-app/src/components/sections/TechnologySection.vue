<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()

const iconMap = { adsorbent: 'red', removal: 'gold', recycle: 'green', dry: 'blue' }
const emojiMap = { adsorbent: '🧪', removal: '⚡', recycle: '♻️', dry: '💧' }
</script>

<template>
  <section class="section" id="technology">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 03</span>
        <h2 class="section-title">产品与技术</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.technology.intro }}</p>
      <div class="card-grid col4" style="margin-top:40px">
        <div v-for="f in MOCK.technology.features" :key="f.title" class="card" data-reveal-stagger>
          <div class="card-icon" :class="iconMap[f.icon] || 'red'">{{ emojiMap[f.icon] || '' }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
      <table class="param-table" style="margin-top:48px" data-reveal="up">
        <thead>
          <tr>
            <th>技术指标</th>
            <th>本项目参数</th>
            <th>国家标准 / 国际对标</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in MOCK.technology.techParams" :key="p.name">
            <td>{{ p.name }}</td>
            <td class="param-value">{{ p.value }}</td>
            <td>{{ p.standard }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
