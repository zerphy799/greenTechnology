<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useSystemStore } from './stores/useSystemStore'
import AppHeader from './components/AppHeader.vue'
import './styles/global.css'

const { rawState: state } = useSystemStore()

let metricsTimer = null
let patrolTimer = null

// 初始加载状态
const appLoading = ref(true)

function simulateMetrics() {
  // 每2秒微调实时指标
  const so2Delta = (Math.random() - 0.5) * 1.0
  const tempDelta = (Math.random() - 0.5) * 3
  const noxDelta = (Math.random() - 0.5) * 1.5

  state.metrics.so2.current = Math.max(0, +(state.metrics.so2.current + so2Delta).toFixed(1))
  state.metrics.temp.current = Math.max(0, Math.round(state.metrics.temp.current + tempDelta))

  // 如果没有超标且未应用建议，允许 NOx 微小波动
  if (!state.aiSuggestions[0].applied) {
    state.metrics.nox.current = Math.max(0, +(state.metrics.nox.current + noxDelta).toFixed(1))
    state.metrics.nox.isOver = state.metrics.nox.current > 100
    // 同步更新图表当前数据点
    state.predictionSeries.actualNox[5] = state.metrics.nox.current
  }
}

function aiPatrol() {
  ElNotification({
    title: 'AI 巡检正常',
    message: '物理机理守恒校验通过，钙基吸附剂反应活性无异常衰减，设备运行参数均在优化区间内',
    type: 'info',
    duration: 5000
  })
}

onMounted(() => {
  metricsTimer = setInterval(simulateMetrics, 2000)
  patrolTimer = setInterval(aiPatrol, 15000)
  // 首次延迟5秒触发巡检提示
  setTimeout(aiPatrol, 5000)
  // 初始加载动画
  setTimeout(() => { appLoading.value = false }, 1800)
})

onUnmounted(() => {
  if (metricsTimer) clearInterval(metricsTimer)
  if (patrolTimer) clearInterval(patrolTimer)
})
</script>

<template>
  <!-- 烟气净化加载屏 -->
  <Transition name="loader-fade">
    <div v-if="appLoading" class="flue-gas-loader">
      <div class="loader-ring">
        <div class="loader-core"></div>
        <div class="loader-particles">
          <span class="loader-particle"></span>
          <span class="loader-particle"></span>
          <span class="loader-particle"></span>
          <span class="loader-particle"></span>
          <span class="loader-particle"></span>
          <span class="loader-particle"></span>
        </div>
      </div>
      <div class="loader-label">
        <span class="loader-label-inner">烟气净化系统初始化中</span>
      </div>
    </div>
  </Transition>

  <AppHeader />
  <main class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loader-fade-leave-active {
  transition: opacity 0.6s ease;
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>
