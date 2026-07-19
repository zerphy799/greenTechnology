<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import HeroBanner from './components/layout/HeroBanner.vue'
import ToolBar from './components/layout/ToolBar.vue'
import LightBox from './components/layout/LightBox.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import { useBackToTop } from './composables/useBackToTop'
import { useScrollReveal, useCountUp } from './composables/useScrollReveal'
import './styles/global.css'

useBackToTop()
const { refresh: refreshReveal } = useScrollReveal()
const { refresh: refreshCountUp } = useCountUp()

// 路由加载进度条 + 路由切换时重新初始化动效
const router = useRouter()
onMounted(function () {
  var bar = document.getElementById('routeLoadingBar')
  if (!bar) return

  router.beforeEach(function (to, from, next) {
    bar.classList.add('active')
    bar.classList.remove('done')
    next()
  })

  router.afterEach(function () {
    bar.classList.add('done')
    setTimeout(function () {
      bar.classList.remove('active', 'done')
      // 等待 Vue transition 完成后重新初始化动效引擎
      setTimeout(function () {
        refreshReveal()
        refreshCountUp()
      }, 180)
    }, 350)
  })

  // 初始化背景粒子
  initParticles()
})

function initParticles() {
  var count = 18
  var body = document.body
  var container = document.createElement('div')
  container.className = 'bg-particles'
  body.appendChild(container)

  for (var i = 0; i < count; i++) {
    var dot = document.createElement('div')
    dot.className = 'bg-particle'
    var size = Math.random() * 5 + 2
    dot.style.width = size + 'px'
    dot.style.height = size + 'px'
    dot.style.left = Math.random() * 100 + '%'
    dot.style.animationDuration = (Math.random() * 18 + 14) + 's'
    dot.style.animationDelay = (Math.random() * 15) + 's'
    container.appendChild(dot)
  }
}
</script>

<template>
  <!-- 路由加载进度条 -->
  <div class="route-loading-bar" id="routeLoadingBar"></div>

  <!-- 固定顶部导航 -->
  <SiteHeader />

  <!-- Hero Banner 轮播 -->
  <HeroBanner />

  <!-- 关键指标数据条 -->
  <div class="container" style="position:relative;z-index:10;">
    <div class="hero-stats">
      <div class="hero-stat"><div class="stat-value" data-count-up>≥95%</div><div class="stat-label">酸性气体脱除率</div></div>
      <div class="hero-stat"><div class="stat-value" data-count-up>≥90%</div><div class="stat-label">重金属脱除率</div></div>
      <div class="hero-stat"><div class="stat-value" data-count-up>≤40%</div><div class="stat-label">较传统工艺降本</div></div>
      <div class="hero-stat"><div class="stat-value" data-count-up>100%</div><div class="stat-label">以废治废原料</div></div>
    </div>
  </div>

  <!-- 路由视图：当前章节内容（带过渡动画） -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- 页脚 -->
  <SiteFooter />

  <!-- 全屏灯箱 -->
  <LightBox />

  <!-- 返回顶部 -->
  <button class="back-to-top" aria-label="返回顶部">&#9650;</button>

  <!-- 浮动工具栏 -->
  <ToolBar />
</template>
