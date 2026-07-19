<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="background">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 02</span>
        <h2 class="section-title">项目背景与市场分析</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.background.intro }}</p>
      <div class="data-strip" style="margin-top:36px">
        <div v-for="d in MOCK.background.industryData" :key="d.label" class="data-item" data-reveal-stagger>
          <div class="data-value">{{ d.value }}</div>
          <div class="data-label">{{ d.label }}</div>
          <div class="data-trend" :class="d.trend">{{ d.trend === 'up' ? '↑ 持续增长' : '' }}</div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">行业痛点</h3>
      <div class="pain-grid">
        <div v-for="p in MOCK.background.painPoints" :key="p.title" class="pain-card" data-reveal-stagger>
          <h4>{{ p.title }}</h4>
          <p>{{ p.desc }}</p>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">政策支持</h3>
      <div class="policy-list">
        <div v-for="(p, i) in MOCK.background.policy" :key="i" class="policy-item" data-reveal-stagger>{{ p }}</div>
      </div>
    </div>
  </section>
</template>
