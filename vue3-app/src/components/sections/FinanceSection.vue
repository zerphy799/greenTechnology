<script setup>
import { onMounted } from 'vue'
import { useData } from '../../composables/useData'
import { useCharts } from '../../composables/useCharts'

const { MOCK } = useData()
const { renderAllFinanceCharts } = useCharts()

onMounted(function () {
  renderAllFinanceCharts()
})
</script>

<template>
  <section class="section" id="finance">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 09</span>
        <h2 class="section-title">财务分析</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.finance.intro }}</p>
      <div class="metrics-grid">
        <div v-for="m in MOCK.finance.keyMetrics" :key="m.label" class="metric-card" data-reveal-stagger>
          <div class="metric-value">{{ m.value }}</div>
          <div class="metric-label">{{ m.label }}</div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 20px;color:var(--primary-dark);font-size:1.15rem">财务预测</h3>
      <div class="chart-full">
        <div class="chart-container" id="chart-finance"></div>
      </div>
      <div class="chart-row" data-reveal="up">
        <div>
          <h4 style="text-align:center;margin-bottom:12px;color:var(--text-secondary)">收入构成</h4>
          <div class="chart-container" id="chart-revenue-pie"></div>
        </div>
        <div>
          <h4 style="text-align:center;margin-bottom:12px;color:var(--text-secondary)">成本构成</h4>
          <div class="chart-container" id="chart-cost-pie"></div>
        </div>
      </div>
      <h3 style="text-align:center;margin:32px 0 20px;color:var(--primary-dark);font-size:1.15rem">市场增长率与营收趋势</h3>
      <div class="chart-full" data-reveal="up">
        <div class="chart-container" id="chart-market-trend"></div>
      </div>
      <h3 style="text-align:center;margin:40px 0 20px;color:var(--primary-dark);font-size:1.15rem">
        融资需求：<span style="color:var(--primary)">{{ MOCK.finance.funding.total }}万元</span>
      </h3>
      <div class="funding-grid">
        <div class="funding-chart">
          <div class="chart-container" id="chart-funding-pie"></div>
        </div>
        <div class="funding-list">
          <div v-for="u in MOCK.finance.funding.usage" :key="u.item" class="funding-item" data-reveal-stagger>
            <span class="fund-name">{{ u.item }}</span>
            <span class="fund-amount">{{ u.amount }}万元</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
