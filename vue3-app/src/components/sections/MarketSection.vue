<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()

const channelIcons = ['🎪', '🤝', '🏆', '📋']
const channelColors = ['red', 'gold', 'blue', 'green']
</script>

<template>
  <section class="section" id="market">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 07</span>
        <h2 class="section-title">市场营销策略</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.market.intro }}</p>
      <div class="phase-cards" style="margin-top:40px">
        <div v-for="s in MOCK.market.stages" :key="s.phase" class="phase-card" data-reveal-stagger>
          <span class="phase-label">{{ s.phase }}</span>
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
          <div class="phase-target">{{ s.target }}</div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">推广渠道</h3>
      <div class="card-grid col4">
        <div v-for="(c, i) in MOCK.market.channels" :key="c.name" class="card" data-reveal-stagger>
          <div class="card-icon" :class="channelColors[i]">{{ channelIcons[i] }}</div>
          <h3>{{ c.name }}</h3>
          <p>{{ c.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
