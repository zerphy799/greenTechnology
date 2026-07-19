<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="team">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 08</span>
        <h2 class="section-title">团队介绍</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.team.intro }}</p>
      <h3 style="text-align:center;margin:40px 0 24px;color:var(--accent-dark);font-size:1.15rem">指导教师</h3>
      <div class="advisor-grid">
        <div v-for="a in MOCK.team.advisor" :key="a.name" class="advisor-card" data-reveal-stagger>
          <div class="advisor-avatar">{{ a.name.charAt(0) }}</div>
          <div>
            <h4>{{ a.name }}</h4>
            <div class="advisor-role">{{ a.role }}</div>
            <div class="advisor-title">{{ a.title }} | {{ a.dept }}</div>
            <div class="advisor-desc">{{ a.desc }}</div>
          </div>
        </div>
      </div>
      <h3 style="text-align:center;margin:24px 0 24px;color:var(--accent-dark);font-size:1.15rem">核心成员</h3>
      <div class="team-grid">
        <div v-for="t in MOCK.team.members" :key="t.name" class="team-card" data-reveal-stagger>
          <div class="team-avatar">{{ t.name.charAt(0) }}</div>
          <h4>{{ t.name }}</h4>
          <div class="team-role">{{ t.role }}</div>
          <div class="team-grade">{{ t.grade }} | {{ t.dept }}</div>
          <div class="team-desc">{{ t.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
