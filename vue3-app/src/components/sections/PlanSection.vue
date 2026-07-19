<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="plan">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 11</span>
        <h2 class="section-title">发展规划</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.plan.intro }}</p>
      <div class="timeline" style="margin-top:40px">
        <div v-for="t in MOCK.plan.timeline" :key="t.year" class="timeline-item" data-reveal="up">
          <div class="timeline-year">{{ t.year }}</div>
          <div class="timeline-title">{{ t.title }}</div>
          <ul class="timeline-milestones">
            <li v-for="(m, mi) in t.milestones" :key="mi">{{ m }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
