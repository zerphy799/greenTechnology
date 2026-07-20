<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSystemStore } from '../stores/useSystemStore'

const { state } = useSystemStore()
const router = useRouter()
const route = useRoute()

const currentTime = ref('')
let clockTimer = null

function updateClock() {
  const now = new Date()
  const y = now.getFullYear()
  const mo = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${y}-${mo}-${d} ${h}:${mi}:${s}`
}

function navTo(path) { router.push(path) }
function isActive(path) { return route.path === path }

const navItems = [
  { path: '/dashboard', label: '实时监控大屏' },
  { path: '/analytics', label: '运行报表分析' },
  { path: '/history', label: '历史数据查询' }
]

const isModelNormal = true

onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<template>
  <header class="app-header">
    <div class="header-inner">

      <!-- 左侧 Logo -->
      <router-link to="/dashboard" class="header-logo">
        <span class="logo-icon">净</span>
        <span>
          智慧烟气治理专家系统
          <div style="font-size:0.6rem;opacity:0.4;font-weight:400;letter-spacing:0.04em;line-height:1.3;">
            Industrial Flue Gas AI System
          </div>
        </span>
      </router-link>

      <!-- 中间导航 -->
      <nav class="header-nav">
        <button
          v-for="item in navItems"
          :key="item.path"
          class="nav-btn"
          :class="{ active: isActive(item.path) }"
          @click="navTo(item.path)"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- 右侧状态 -->
      <div class="header-status">
        <span class="status-tag">
          <span class="status-dot" :class="isModelNormal ? 'green' : 'red'"></span>
          {{ isModelNormal ? '● 物理守恒模型: 正常' : '物理守恒模型: 异常' }}
        </span>
        <span class="status-tag">
          <span class="chip-icon">&#x2302;</span>
          推理延迟: {{ state.systemStatus.aiInferenceLatency }}ms
        </span>
        <span class="header-clock">{{ currentTime }}</span>
      </div>

    </div>
  </header>
</template>
