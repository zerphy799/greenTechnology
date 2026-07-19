<script setup>
import { onMounted } from 'vue'
import { useData } from '../../composables/useData'
import { useCarousel } from '../../composables/useCarousel'

const { MOCK } = useData()
const { init } = useCarousel('.hero-banner')

onMounted(function () {
  init()
})
</script>

<template>
  <section class="hero-banner" id="heroBanner">
    <!-- Slide 1: 工业清洁科技 - 蓝色系 -->
    <div class="banner-slide active">
      <div class="banner-bg banner-bg-1">
        <div class="bg-shape bg-circle-1"></div>
        <div class="bg-shape bg-circle-2"></div>
        <div class="bg-shape bg-ring-1"></div>
        <div class="bg-line bg-line-1"></div>
        <div class="bg-line bg-line-2"></div>
        <div class="bg-dots"></div>
      </div>
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <span class="banner-badge">核心技术</span>
        <h2>{{ MOCK.banners[0].title }}</h2>
        <p>{{ MOCK.banners[0].subtitle }}</p>
        <router-link to="/technology" class="btn-cta">探索核心技术</router-link>
      </div>
    </div>

    <!-- Slide 2: 科研创新 - 青绿系 -->
    <div class="banner-slide">
      <div class="banner-bg banner-bg-2">
        <div class="bg-shape bg-orb-1"></div>
        <div class="bg-shape bg-orb-2"></div>
        <div class="bg-shape bg-orb-3"></div>
        <div class="bg-hex-grid"></div>
      </div>
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <span class="banner-badge">创新优势</span>
        <h2>{{ MOCK.banners[1].title }}</h2>
        <p>{{ MOCK.banners[1].subtitle }}</p>
        <router-link to="/innovation" class="btn-cta">查看创新优势</router-link>
      </div>
    </div>

    <!-- Slide 3: 技术路线 - 金绿系 -->
    <div class="banner-slide">
      <div class="banner-bg banner-bg-3">
        <div class="bg-wave"></div>
        <div class="bg-shape bg-diamond-1"></div>
        <div class="bg-shape bg-diamond-2"></div>
        <div class="bg-flow-line"></div>
      </div>
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <span class="banner-badge">技术路线</span>
        <h2>{{ MOCK.banners[2].title }}</h2>
        <p>{{ MOCK.banners[2].subtitle }}</p>
        <router-link to="/process" class="btn-cta">了解技术路线</router-link>
      </div>
    </div>

    <button class="banner-prev" aria-label="上一页">&#10094;</button>
    <button class="banner-next" aria-label="下一页">&#10095;</button>
    <div class="banner-dots">
      <button class="banner-dot active" v-for="(b, idx) in MOCK.banners" :key="idx"></button>
    </div>
  </section>
</template>

<style scoped>
/* ====== 底色 + 几何装饰元素 ====== */
.banner-bg-1 {
  background: linear-gradient(160deg, #0a1a3a 0%, #0d2847 20%, #0e3a5c 42%, #0c4a6e 65%, #0b3d5c 85%, #0a1a3a 100%);
}
.banner-bg-2 {
  background: linear-gradient(150deg, #061a1a 0%, #0a2e28 25%, #0d3d32 48%, #0f4a3a 70%, #0c352c 88%, #061a1a 100%);
}
.banner-bg-3 {
  background: linear-gradient(145deg, #1a180a 0%, #2a240d 22%, #3a3210 45%, #2e3a14 62%, #1a2e10 80%, #1a180a 100%);
}

/* ---- Slide 1 几何圆 + 光环 ---- */
.bg-circle-1 {
  width: 420px; height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56,178,232,0.12) 0%, rgba(56,178,232,0.02) 55%, transparent 70%);
  top: -80px; right: -60px;
  animation: floatCircle 8s ease-in-out infinite;
}
.bg-circle-2 {
  width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100,200,255,0.10) 0%, transparent 60%);
  bottom: -60px; left: 10%;
  animation: floatCircle 10s ease-in-out infinite reverse;
}
.bg-ring-1 {
  width: 200px; height: 200px;
  border-radius: 50%;
  border: 1.5px solid rgba(56,178,232,0.15);
  top: 25%; left: 60%;
  animation: spinSlow 25s linear infinite;
}
.bg-line-1 {
  position: absolute; width: 2px; height: 180px;
  background: linear-gradient(180deg, transparent, rgba(56,178,232,0.12), transparent);
  top: 10%; right: 28%;
  transform: rotate(25deg);
}
.bg-line-2 {
  position: absolute; width: 1px; height: 120px;
  background: linear-gradient(180deg, transparent, rgba(100,200,255,0.10), transparent);
  bottom: 20%; left: 72%;
  transform: rotate(-15deg);
}
.bg-dots {
  position: absolute; top: 15%; left: 8%;
  width: 80px; height: 80px;
  background-image: radial-gradient(circle, rgba(56,178,232,0.15) 1.5px, transparent 1.5px);
  background-size: 16px 16px;
}

/* ---- Slide 2 光球 + 六边形网格 ---- */
.bg-orb-1 {
  width: 350px; height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(77,212,201,0.18) 0%, rgba(77,212,201,0.04) 45%, transparent 70%);
  top: -60px; left: -40px;
  animation: orbPulse 7s ease-in-out infinite;
}
.bg-orb-2 {
  width: 260px; height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle at 60% 60%, rgba(13,180,107,0.16) 0%, rgba(13,180,107,0.02) 50%, transparent 70%);
  bottom: -40px; right: 10%;
  animation: orbPulse 9s ease-in-out infinite reverse;
}
.bg-orb-3 {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  top: 40%; left: 48%;
  animation: orbPulse 5s ease-in-out infinite;
}
.bg-hex-grid {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,0 60,15 60,37 30,52 0,37 0,15' fill='none' stroke='rgba(77,212,201,0.06)' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 60px 52px;
  opacity: 0.6;
}

/* ---- Slide 3 波形 + 菱形 ---- */
.bg-wave {
  position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
  background: url("data:image/svg+xml,%3Csvg width='1440' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 L1440,320 L0,320 Z' fill='rgba(196,180,60,0.06)'/%3E%3Cpath d='M0,200 C300,120 600,280 900,200 C1200,120 1350,260 1440,220 L1440,320 L0,320 Z' fill='rgba(196,180,60,0.04)'/%3E%3C/svg%3E") repeat-x;
  background-size: 100% auto;
  background-position: bottom;
}
.bg-diamond-1 {
  width: 100px; height: 100px;
  background: linear-gradient(135deg, rgba(196,180,60,0.12), rgba(196,130,40,0.06));
  transform: rotate(45deg);
  top: 20%; right: 15%;
  animation: floatDiamond 9s ease-in-out infinite;
}
.bg-diamond-2 {
  width: 60px; height: 60px;
  background: linear-gradient(135deg, rgba(196,180,60,0.10), rgba(196,130,40,0.04));
  transform: rotate(45deg);
  bottom: 30%; left: 20%;
  animation: floatDiamond 7s ease-in-out infinite reverse;
}
.bg-flow-line {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(108deg, transparent 0%, transparent 44%, rgba(196,180,60,0.04) 45%, rgba(196,180,60,0.04) 46%, transparent 47%, transparent 100%),
              linear-gradient(162deg, transparent 0%, transparent 64%, rgba(196,130,40,0.03) 65%, rgba(196,130,40,0.03) 66%, transparent 67%, transparent 100%);
}

/* ====== 共享几何元素样式 ====== */
.bg-shape { position: absolute; pointer-events: none; }

/* ====== 动画 ====== */
@keyframes floatCircle {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(15px, -20px) scale(1.06); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes orbPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
@keyframes floatDiamond {
  0%, 100% { transform: rotate(45deg) translate(0, 0); }
  50% { transform: rotate(45deg) translate(10px, -12px); }
}
</style>
