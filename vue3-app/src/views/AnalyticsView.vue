<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import { useSystemStore } from '../stores/useSystemStore'
import { TrendCharts } from '@element-plus/icons-vue'

const { radarData } = useSystemStore()

const radarRef = ref(null)
let chartInstance = null
const sliderValue = ref(50)

function buildRadarOption(weight) {
  // weight: 0=侧重节能降本, 100=侧重超低排放
  // 当滑块变化时，AI优化曲线重新计算
  const trad = radarData.traditional
  const ai = radarData.aiOptimized

  // 节能降本权重越高，越偏向传统(能耗/成本更低)
  // 超低排放权重越高，AI脱除效率更高
  const t = weight / 100 // 0~1

  const deSo2Ai = Math.round(ai.deso2 - t * 5)
  const deNoxAi = Math.round(ai.denox - t * 4)
  const deCo2Ai = Math.round(ai.deco2 - t * 3)
  const energyAi = Math.round(ai.energy + (1 - t) * 8)  // 节能权重高时能耗更低
  const costAi = Math.round(ai.cost + (1 - t) * 10)      // 节能权重高时成本更低

  return {
    tooltip: {},
    legend: {
      data: ['传统人工经验控制', 'AI 物理驱动优化'],
      bottom: 0,
      textStyle: { color: '#7F948B', fontSize: 12 }
    },
    radar: {
      center: ['50%', '48%'],
      radius: '62%',
      indicator: [
        { name: '脱硫效率', max: 100 },
        { name: '脱硝效率', max: 100 },
        { name: '捕碳效率', max: 100 },
        { name: '系统能耗(反向)', max: 100 },
        { name: '运行成本(反向)', max: 100 }
      ],
      axisName: { color: '#7F948B', fontSize: 11 },
      splitArea: {
        areaStyle: { color: ['rgba(26,92,62,0.04)', 'rgba(26,92,62,0.02)'] }
      },
      axisLine: { lineStyle: { color: '#D4E8DC' } },
      splitLine: { lineStyle: { color: '#D4E8DC' } }
    },
    series: [
      {
        name: '传统人工经验控制',
        type: 'radar',
        data: [{ value: [trad.deso2, trad.denox, trad.deco2, trad.energy, trad.cost], name: '传统人工经验控制' }],
        areaStyle: { color: 'rgba(127,148,139,0.12)' },
        lineStyle: { color: '#7F948B', width: 2 },
        itemStyle: { color: '#7F948B' },
        symbol: 'circle',
        symbolSize: 5
      },
      {
        name: 'AI 物理驱动优化',
        type: 'radar',
        data: [{ value: [deSo2Ai, deNoxAi, deCo2Ai, energyAi, costAi], name: 'AI 物理驱动优化' }],
        areaStyle: { color: 'rgba(26,92,62,0.18)' },
        lineStyle: { color: '#1A5C3E', width: 2.5 },
        itemStyle: { color: '#1A5C3E' },
        symbol: 'diamond',
        symbolSize: 6,
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
  <div>
    <el-card style="margin-bottom:20px;">
      <template #header>
        <span style="display:flex;align-items:center;gap:8px;">
          <el-icon :size="18" color="#4CC9F0"><TrendCharts /></el-icon>
          多目标优化对比 — 传统控制 vs AI 驱动优化
        </span>
      </template>
      <div ref="radarRef" class="chart-box radar"></div>
    </el-card>

    <el-card>
      <template #header>
        <span>🎛 AI 优化权重调优</span>
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
          <span style="color:var(--accent-primary);">⚡ 侧重节能降本</span>
          <span style="color:var(--accent-teal);">🌿 侧重超低排放</span>
        </div>
      </div>
    </el-card>

    <!-- 论文支撑说明 -->
    <el-card style="margin-top:20px;">
      <template #header>
        <span>📚 技术论文支撑</span>
      </template>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;">
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
