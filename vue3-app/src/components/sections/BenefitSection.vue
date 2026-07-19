<script setup>
import { onMounted } from 'vue'
import { useData } from '../../composables/useData'
import { useCharts } from '../../composables/useCharts'

const { MOCK } = useData()
const { renderEnvRadar } = useCharts()

onMounted(function () {
  renderEnvRadar('chart-env-radar')
})
</script>

<template>
  <section class="section" id="benefit">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 10</span>
        <h2 class="section-title">社会效益与环保价值</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.benefit.intro }}</p>
      <div class="env-highlights" style="margin-top:36px">
        <div v-for="h in MOCK.benefit.highlights" :key="h.title" class="env-highlight" data-reveal-stagger>
          <div class="env-value">{{ h.value }}</div>
          <div class="env-label">{{ h.title }}</div>
          <div class="env-desc">{{ h.desc }}</div>
        </div>
      </div>
      <h3 style="text-align:center;margin:32px 0 20px;color:var(--primary-dark);font-size:1.15rem">环保效益对比（本项目 vs 传统工艺）</h3>
      <div class="chart-full" style="max-width:700px;margin:0 auto">
        <div class="chart-container" id="chart-env-radar" style="height:420px"></div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.15rem">联合国可持续发展目标（SDGs）贡献</h3>
      <div class="sdg-grid">
        <div v-for="s in MOCK.benefit.sdgGoals" :key="s.goal" class="sdg-card" data-reveal-stagger>
          <div class="sdg-icon">{{ s.goal }}</div>
          <h5>{{ s.title }}</h5>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
