<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="business">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 06</span>
        <h2 class="section-title">商业模式</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.business.intro }}</p>
      <div class="biz-cards" style="margin-top:40px">
        <div v-for="m in MOCK.business.modelDiagram" :key="m.title" class="biz-card" data-reveal-stagger>
          <h4>{{ m.title }}</h4>
          <p>{{ m.desc }}</p>
          <span class="biz-revenue">{{ m.revenue }}</span>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">目标客户</h3>
      <div class="customer-grid">
        <div v-for="c in MOCK.business.customers" :key="c.type" class="customer-card" data-reveal-stagger>
          <div class="cust-type">{{ c.type }}</div>
          <div class="cust-count">{{ c.count }}</div>
          <div class="cust-demand">{{ c.demand }}</div>
          <span class="cust-value">{{ c.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
