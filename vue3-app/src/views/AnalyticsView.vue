<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import { useSystemStore } from '../stores/useSystemStore'
import { TrendCharts, Cpu } from '@element-plus/icons-vue'

const { radarData, diagnosisStatus } = useSystemStore()

const radarRef = ref(null)
let chartInstance = null
const sliderValue = ref(50)

function buildRadarOption(weight) {
  const trad = radarData.traditional
  const ai = radarData.aiOptimized
  const t = weight / 100

  const deSo2Ai = Math.round(ai.deso2 - t * 5)
  const deNoxAi = Math.round(ai.denox - t * 4)
  const deCo2Ai = Math.round(ai.deco2 - t * 3)
  const energyAi = Math.round(ai.energy + (1 - t) * 8)
  const costAi = Math.round(ai.cost + (1 - t) * 10)

  return {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: 'rgba(5,150,105,0.2)',
      textStyle: { color: '#064E3B', fontSize: 12 }
    },
    legend: {
      data: ['传统人工经验控制', 'AI 物理驱动优化'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 }
    },
    radar: {
      center: ['50%', '46%'],
      radius: '60%',
      indicator: [
        { name: '脱硫效率', max: 100 },
        { name: '脱硝效率', max: 100 },
        { name: '捕碳效率', max: 100 },
        { name: '系统能耗(反向)', max: 100 },
        { name: '运行成本(反向)', max: 100 }
      ],
      axisName: { color: '#475569', fontSize: 11 },
      splitArea: {
        areaStyle: { color: ['rgba(5,150,105,0.05)', 'rgba(5,150,105,0.02)'] }
      },
      axisLine: { lineStyle: { color: '#D1E5DE' } },
      splitLine: { lineStyle: { color: '#D1E5DE' } }
    },
    series: [
      {
        name: '传统人工经验控制',
        type: 'radar',
        data: [{ value: [trad.deso2, trad.denox, trad.deco2, trad.energy, trad.cost], name: '传统人工经验控制' }],
        areaStyle: { color: 'rgba(71,85,105,0.1)' },
        lineStyle: { color: '#475569', width: 2 },
        itemStyle: { color: '#475569' },
        symbol: 'circle', symbolSize: 5
      },
      {
        name: 'AI 物理驱动优化',
        type: 'radar',
        data: [{ value: [deSo2Ai, deNoxAi, deCo2Ai, energyAi, costAi], name: 'AI 物理驱动优化' }],
        areaStyle: { color: 'rgba(16,185,129,0.15)' },
        lineStyle: { color: '#059669', width: 2.5 },
        itemStyle: { color: '#059669' },
        symbol: 'diamond', symbolSize: 6,
        animationDuration: 600,
        animationEasing: 'cubicInOut'
      }
    ]
  }
}

function initRadar() {
  if (!radarRef.value) return
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(radarRef.value)
  chartInstance.setOption(buildRadarOption(sliderValue.value))
}

function updateRadar(val) {
  if (!chartInstance) return
  chartInstance.setOption(buildRadarOption(val), true)
}

function handleSliderChange(val) {
  sliderValue.value = val
  updateRadar(val)
}

function resizeRadar() {
  if (chartInstance) chartInstance.resize()
}

onMounted(() => {
  nextTick(initRadar)
  window.addEventListener('resize', resizeRadar)
})

onUnmounted(() => {
  if (chartInstance) chartInstance.dispose()
  window.removeEventListener('resize', resizeRadar)
})
</script>

<template>
  <div class="app-page">
    <!-- ========== 雷达图 + 滑块 ========== -->
    <el-card style="margin-bottom:20px;">
      <template #header>
        <span style="display:flex;align-items:center;gap:8px;">
          <el-icon :size="18" color="#059669"><TrendCharts /></el-icon>
          多目标优化对比 — 传统控制 vs AI 驱动优化
        </span>
      </template>
      <div ref="radarRef" class="chart-box radar"></div>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <template #header>
        <span>调整优化权重</span>
      </template>
      <div style="padding:10px 0;">
        <el-slider
          v-model="sliderValue"
          :min="0"
          :max="100"
          :step="1"
          show-input
          :format-tooltip="(val) => val + '%'"
          @change="handleSliderChange"
        />
        <div class="slider-labels">
          <span style="color:var(--accent-teal);">⚡ 侧重节能降本</span>
          <span style="color:var(--accent-primary);">🌿 侧重超低排放</span>
        </div>
      </div>
    </el-card>

    <!-- ========== AI 诊断结果（从 Dashboard 迁移） ========== -->
    <el-card v-if="diagnosisStatus.status === 'completed'" style="margin-bottom:20px;">
      <template #header>
        <div class="ai-section-header">
          <span class="ai-section-title">
            <el-icon :size="18" color="#059669"><Cpu /></el-icon>
            AI 智能诊断报告
          </span>
          <span class="ai-section-badge">
            基于物理机理 + 贝叶斯因果推断
          </span>
        </div>
      </template>
      <div
        v-for="(result, idx) in diagnosisStatus.results"
        :key="result.id"
        class="diag-result-card"
        :style="{ animationDelay: (idx * 0.12) + 's' }"
      >
        <div class="diag-header">
          <span class="diag-level-badge" :class="result.level">{{ result.levelText }}</span>
          <span class="diag-title">{{ result.title }}</span>
        </div>
        <div class="diag-desc">{{ result.description }}</div>
        <div class="diag-meta">
          <span>📍 影响范围: {{ result.affectedScope }}</span>
          <span>📊 置信度: {{ result.probability }}</span>
        </div>
        <div class="diag-suggestion">{{ result.suggestion }}</div>
      </div>
    </el-card>

    <!-- ========== 论文支撑 ========== -->
    <el-card>
      <template #header>
        <span>支撑论文</span>
      </template>
      <div class="phase-cards">
        <div class="phase-card">
          <div class="phase-label">01</div>
          <div class="phase-title">钙基吸附剂协同脱除</div>
          <div class="phase-desc">Wang et al. "CaO-based sorbent for simultaneous removal of SO₂ and heavy metals." Chemical Engineering Journal, 2025</div>
        </div>
        <div class="phase-card">
          <div class="phase-label">02</div>
          <div class="phase-title">CaO-MnOx 机理研究</div>
          <div class="phase-desc">Li et al. "Mechanistic study on synergistic removal of HCl and Hg⁰ over CaO-MnOx composite." ES&T, 2024</div>
        </div>
        <div class="phase-card">
          <div class="phase-label">03</div>
          <div class="phase-title">电石渣资源化利用</div>
          <div class="phase-desc">Zhang et al. "Resource utilization of carbide slag for flue gas purification: A review." J. Hazard. Mater., 2025</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
