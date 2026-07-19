<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="summary">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 01</span>
        <h2 class="section-title">项目概述</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.summary.heroDesc }}</p>
      <div class="card-grid col4" style="margin-top:40px">
        <div class="card" data-reveal-stagger>
          <div class="card-icon red">🔬</div>
          <h3>多孔钙基吸附剂</h3>
          <p>比表面积≥80m²/g，孔隙率≥55%，以电石渣/钢渣为原料</p>
        </div>
        <div class="card" data-reveal-stagger>
          <div class="card-icon gold">⚡</div>
          <h3>一体化脱除</h3>
          <p>同一反应器同步脱酸脱重金属，系统压降低、能耗低</p>
        </div>
        <div class="card" data-reveal-stagger>
          <div class="card-icon green">♻️</div>
          <h3>以废治废</h3>
          <p>原料100%来自工业固废，产物可作建材，全链条资源化</p>
        </div>
        <div class="card" data-reveal-stagger>
          <div class="card-icon blue">💧</div>
          <h3>干法零排水</h3>
          <p>全程无水参与，零废水排放，彻底消除二次污染</p>
        </div>
      </div>
    </div>
  </section>
</template>
