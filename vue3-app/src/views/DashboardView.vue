<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { Cpu, Warning, TrendCharts, MagicStick } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { useSystemStore } from '../stores/useSystemStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const { rawState: state, diagnosisStatus, runDiagnosis, applySuggestion } = useSystemStore()

// ========== ECharts: 暗黑工业风 AI 预测图 ==========
const chartRef = ref(null)
let chartInstance = null

function buildChartOption() {
  const ts = state.predictionSeries.timestamps
  const actual = state.predictionSeries.actualNox
  const predicted = state.predictionSeries.predictedNox
  const upper = state.predictionSeries.confidenceUpper
  const lower = state.predictionSeries.confidenceLower

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: 'rgba(5,150,105,0.2)',
      textStyle: { color: '#064E3B', fontSize: 12 },
      formatter: function (params) {
        let tip = '<div style="font-weight:700;margin-bottom:6px;">' + params[0].axisValue + '</div>'
        params.forEach(function (p) {
          if (p.value == null) return
          if (p.seriesName === '95% 置信区间' || p.seriesName === '置信下界') return
          tip += '<div style="display:flex;align-items:center;gap:6px;margin:3px 0;">'
            + '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + p.color + ';"></span>'
            + p.seriesName + ': <strong>' + p.value + ' mg/m³</strong>'
            + '</div>'
        })
        return tip
      }
    },
    legend: {
      data: ['实际测值', 'AI 预测趋势', '95% 置信区间'],
      bottom: 0,
      textStyle: { color: '#475569', fontSize: 11 },
      itemWidth: 16,
      itemHeight: 2
    },
    grid: { left: '3%', right: '4%', bottom: '14%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category', data: ts, boundaryGap: false,
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#475569', fontSize: 10 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value', name: 'mg/m³',
      min: 70,
      nameTextStyle: { color: '#475569' },
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#475569' },
      splitLine: { lineStyle: { color: '#D1E5DE', type: 'dashed' } }
    },
    series: [
      {
        name: '实际测值', type: 'line', data: actual, smooth: true,
        lineStyle: { color: '#059669', width: 2.5 },
        itemStyle: { color: '#059669' },
        symbol: 'circle', symbolSize: 5,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(16,185,129,0.1)' },
            { offset: 1, color: 'rgba(16,185,129,0)' }
          ])
        },
        markArea: {
          silent: true,
          label: { show: true, position: 'insideTop', color: '#475569', fontSize: 10, distance: 6 },
          data: [
            [
              { xAxis: '11:25 (当前)', itemStyle: { color: 'rgba(5,150,105,0.04)' } },
              { xAxis: '11:40 (预测)', label: { formatter: '预测区间' } }
            ]
          ]
        }
      },
      {
        name: 'AI 预测趋势', type: 'line', data: predicted, smooth: true,
        lineStyle: { color: '#0284C7', width: 2.5, type: 'dashed' },
        itemStyle: { color: '#0284C7' },
        symbol: 'diamond', symbolSize: 7
      },
      {
        name: '95% 置信区间', type: 'line', data: upper, smooth: true,
        lineStyle: { color: 'transparent', width: 0 },
        symbol: 'none',
        areaStyle: { color: 'rgba(16,185,129,0.1)' },
        stack: 'confidence', silent: true
      },
      {
        name: '置信下界', type: 'line', data: lower, smooth: true,
        lineStyle: { color: 'transparent', width: 0 },
        symbol: 'none',
        areaStyle: { color: 'transparent' },
        stack: 'confidence', silent: true
      }
    ]
  }
}

function initChart() {
  if (!chartRef.value) return
  if (chartInstance) chartInstance.dispose()
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(buildChartOption())
}

function resizeChart() { if (chartInstance) chartInstance.resize() }

watch(() => state.predictionSeries.predictedNox[6], () => {
  if (chartInstance) chartInstance.setOption(buildChartOption())
})

let chartUpdateTimer = null
function updateChartCurrentPoint() {
  if (!chartInstance) return
  chartInstance.setOption({ series: [
    { data: state.predictionSeries.actualNox },
    { data: state.predictionSeries.predictedNox },
    { data: state.predictionSeries.confidenceUpper },
    { data: state.predictionSeries.confidenceLower }
  ]})
}

// ========== AI Suggestion Apply ==========
const applyingId = ref(null)
function handleApply(suggestion) {
  if (suggestion.applied) return
  applyingId.value = suggestion.id
  setTimeout(() => {
    applySuggestion(suggestion.id, ElNotification)
    applyingId.value = null
  }, 1200)
}

// ========== Alarm Dialog ==========
const alarmDialogVisible = ref(false)
const selectedAlarm = ref(null)
function openAlarmDetail(alarm) {
  selectedAlarm.value = alarm
  alarmDialogVisible.value = true
}

// ========== AI Diagnosis ==========
const diagDialogVisible = ref(false)
let diagStarted = false
async function openDiagnosis() {
  diagDialogVisible.value = true
  if (!diagStarted && diagnosisStatus.status === 'idle') {
    diagStarted = true
    await runDiagnosis()
  }
}
function handleDiagClosed() {
  if (diagnosisStatus.status === 'completed') {
    ElMessage({ message: 'AI 智能诊断已完成，共发现 ' + diagnosisStatus.results.length + ' 项问题，请前往「运行报表」查看详情', type: 'success' })
  }
}
function goToDiagnosisResults() {
  diagDialogVisible.value = false
  router.push('/analytics')
}

// ========== Suggestions sorted ==========
const suggestionSortBy = ref('priority')
const sortedSuggestions = computed(() => {
  const list = [...state.aiSuggestions]
  return list.sort((a, b) => {
    if (a.applied && !b.applied) return 1
    if (!a.applied && b.applied) return -1
    return a.id - b.id
  })
})
function getSugClass(sug) {
  if (sug.applied) return 'done'
  return sug.id === 101 ? 'urgent' : 'optimize'
}
function getSugLabel(sug) {
  if (sug.applied) return '已采纳'
  return sug.id === 101 ? '优先处理' : '建议优化'
}
function getSugIcon(sug) {
  if (sug.applied) return '✓'
  return sug.id === 101 ? '⚠' : '↑'
}

// ========== Number animation for metrics ==========
const displaySo2 = ref(state.metrics.so2.current)
const displayNox = ref(state.metrics.nox.current)
const displayCo2 = ref(state.metrics.co2.current)
const displayTemp = ref(state.metrics.temp.current)
let metricTimer = null
function updateDisplayMetrics() {
  const d = 0.3
  displaySo2.value = Number((state.metrics.so2.current + (Math.random() - 0.5) * d).toFixed(1))
  displayNox.value = Number((state.metrics.nox.current + (Math.random() - 0.5) * d * 2).toFixed(1))
  displayCo2.value = Number((state.metrics.co2.current + (Math.random() - 0.5) * d * 0.5).toFixed(1))
  displayTemp.value = Math.round(state.metrics.temp.current + (Math.random() - 0.5) * 2)
}

// ========== Lifecycle ==========
onMounted(() => {
  displaySo2.value = state.metrics.so2.current
  displayNox.value = state.metrics.nox.current
  displayCo2.value = state.metrics.co2.current
  displayTemp.value = state.metrics.temp.current
  nextTick(() => {
    initChart()
    chartUpdateTimer = setInterval(updateChartCurrentPoint, 2000)
  })
  metricTimer = setInterval(updateDisplayMetrics, 2000)
  window.addEventListener('resize', resizeChart)
})
onUnmounted(() => {
  if (chartInstance) chartInstance.dispose()
  if (chartUpdateTimer) clearInterval(chartUpdateTimer)
  if (metricTimer) clearInterval(metricTimer)
  window.removeEventListener('resize', resizeChart)
})
</script>

<template>
  <div class="dashboard-container">
    <!-- ========== 核心实时指标 ========== -->
    <div class="dashboard-metrics">
      <div class="metrics-grid">

        <!-- SO₂ — 达标 -->
        <div class="metric-card">
          <div class="metric-label">
            <span class="metric-icon">
              <svg viewBox="0 0 28 28" fill="currentColor"><circle cx="14" cy="9" r="3.5" opacity="0.7"/><circle cx="21" cy="18" r="2" opacity="0.6"/><circle cx="7" cy="18" r="2" opacity="0.6"/><line x1="14" y1="12" x2="19" y2="16.5" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><line x1="14" y1="12" x2="9" y2="16.5" stroke="currentColor" stroke-width="1.2" opacity="0.5"/></svg>
            </span>
            SO₂ 浓度
          </div>
          <div>
            <span class="metric-value">{{ displaySo2 }}</span>
            <span class="metric-unit">{{ state.metrics.so2.unit }}</span>
          </div>
          <el-tooltip content="GB 18484-2020 危险废物焚烧污染控制标准" placement="top">
            <div class="metric-limit" style="cursor:help;">限值 {{ state.metrics.so2.limit }} mg/m³</div>
          </el-tooltip>
        </div>

        <!-- NOx — 超标 -->
        <div class="metric-card" :class="{ 'over-limit': state.metrics.nox.isOver }">
          <div class="metric-label">
            <span class="metric-icon">
              <svg viewBox="0 0 28 28" fill="currentColor"><circle cx="12" cy="9" r="3.5" opacity="0.7"/><circle cx="20" cy="18" r="2" opacity="0.6"/><circle cx="8" cy="22" r="1.8" opacity="0.5"/><line x1="12" y1="12" x2="17" y2="16" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><line x1="12" y1="12" x2="10" y2="20" stroke="currentColor" stroke-width="1.2" opacity="0.4"/></svg>
            </span>
            NOx 浓度
          </div>
          <div>
            <span class="metric-value">{{ displayNox }}</span>
            <span class="metric-unit">{{ state.metrics.nox.unit }}</span>
          </div>
          <el-tooltip content="GB 18484-2020 · NOx 排放浓度限值 100 mg/m³（1小时均值）" placement="top">
            <div class="metric-limit" style="cursor:help;">
              限值 {{ state.metrics.nox.limit }} mg/m³
              <span v-if="state.metrics.nox.isOver" class="over">⚠ 超标</span>
            </div>
          </el-tooltip>
        </div>

        <!-- CO₂ -->
        <div class="metric-card">
          <div class="metric-label">
            <span class="metric-icon">
              <svg viewBox="0 0 28 28" fill="currentColor"><circle cx="14" cy="8" r="3.5" opacity="0.7"/><circle cx="22" cy="18" r="2" opacity="0.6"/><circle cx="6" cy="18" r="2" opacity="0.6"/><line x1="14" y1="11" x2="20" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="14" y1="11" x2="8" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.5"/></svg>
            </span>
            CO₂ 浓度
          </div>
          <div>
            <span class="metric-value">{{ displayCo2 }}</span>
            <span class="metric-unit">{{ state.metrics.co2.unit }}</span>
          </div>
          <el-tooltip content="碳排放连续监测 · 参考 IPCC 国家温室气体清单指南" placement="top">
            <div class="metric-limit" style="cursor:help;">碳排放监测中</div>
          </el-tooltip>
        </div>

        <!-- 炉膛温度 -->
        <div class="metric-card">
          <div class="metric-label">
            <span class="metric-icon">
              <svg viewBox="0 0 28 28" fill="currentColor"><path d="M14 22 Q11 17 10 13 Q9 9 12 6 Q13.5 7.5 14 6 Q14.5 7.5 16 6 Q19 9 18 13 Q17 17 14 22Z" opacity="0.4"/><path d="M12.5 22 Q12 18 12.5 16 Q13 14 14 11 Q15 14 15.5 16 Q16 18 15.5 22Z" opacity="0.6"/><path d="M13.5 23.5 Q13 22 14 20.5 Q15 22 14.5 23.5Z"/></svg>
            </span>
            炉膛温度
          </div>
          <div>
            <span class="metric-value">{{ displayTemp }}</span>
            <span class="metric-unit">{{ state.metrics.temp.unit }}</span>
          </div>
          <el-tooltip content="GB 18484-2020 · 炉膛温度需保持 ≥ 850°C（二燃室 ≥ 1100°C）" placement="top">
            <div class="metric-limit" style="cursor:help;">燃烧状态正常</div>
          </el-tooltip>
        </div>

      </div>
    </div>

    <!-- ========== 图表 + 告警 ========== -->
    <div class="dashboard-middle">
      <!-- AI 预测折线图 -->
      <el-card>
        <template #header>
          <div class="ai-section-header">
            <span class="ai-section-title">
              <span style="font-size:1.1rem;">🧠</span>
              AI 多目标预测趋势 — NOx 浓度
            </span>
            <span class="ai-section-badge">
              <div class="ai-thinking-icon">
                <span class="ai-thinking-dot"></span>
                <span class="ai-thinking-dot"></span>
                <span class="ai-thinking-dot"></span>
              </div>
              AI 实时推理中
            </span>
          </div>
        </template>
        <div class="dashboard-chart-wrapper">
          <div ref="chartRef" class="chart-box"></div>
        </div>
      </el-card>

      <!-- AI 预警与诊断 -->
      <el-card>
        <template #header>
          <div class="ai-section-header">
            <span class="ai-section-title">
              <el-icon :size="16" color="#E63946"><Warning /></el-icon>
              AI 预警与诊断
            </span>
            <el-button class="ai-diag-btn" size="small" :icon="Cpu" @click="openDiagnosis">
              开启AI智能诊断
            </el-button>
          </div>
        </template>
        <div class="dashboard-alarm-scroll">
          <div
            v-for="(alarm, idx) in state.alarms"
            :key="alarm.id"
            class="alarm-item"
            :class="alarm.level"
            :style="{ animationDelay: (idx * 0.08) + 's' }"
            @click="openAlarmDetail(alarm)"
          >
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="font-size:0.9rem;">{{ alarm.level === 'warning' ? '🔴' : '🟠' }}</span>
                <span class="alarm-level-tag" :class="alarm.level">
                  {{ alarm.level === 'warning' ? '高危' : '中危' }}
                </span>
                <span class="alarm-title">{{ alarm.title }}</span>
              </div>
              <div style="font-size:0.72rem;color:var(--text-muted);margin-top:3px;opacity:0.7;">
                {{ alarm.detail }}
              </div>
            </div>
            <span class="alarm-time" style="flex-shrink:0;margin-left:8px;">{{ alarm.time }}</span>
          </div>
          <div
            v-if="diagnosisStatus.status === 'completed'"
            style="margin-top:10px;padding:12px 14px;background:var(--accent-primary-dim);border:1px solid rgba(5,150,105,0.25);border-radius:var(--radius-sm);cursor:pointer;transition:all var(--transition);"
            @click="goToDiagnosisResults"
          >
            <div style="font-size:0.83rem;font-weight:700;color:var(--accent-primary-light);">
              ✅ 诊断完成 · 发现 {{ diagnosisStatus.results.length }} 项问题
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:3px;">
              点击前往「运行报表」查看完整诊断报告 →
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- ========== AI 优化决策推荐 — 四段式 ========== -->
    <el-card style="flex-shrink:0;max-height:36%;overflow-y:auto;">
      <template #header>
        <div class="ai-section-header">
          <span class="ai-section-title">
            <el-icon :size="16" color="#059669"><MagicStick /></el-icon>
            AI 优化决策推荐
          </span>
          <el-radio-group v-model="suggestionSortBy" size="small">
            <el-radio-button label="priority">按优先级</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <div
        v-for="sug in sortedSuggestions"
        :key="sug.id"
        class="ai-suggestion-card"
        :class="{ applied: sug.applied }"
      >
        <!-- 标签胶囊 -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <span class="sug-priority-tag" :class="getSugClass(sug)">
            {{ getSugIcon(sug) }} {{ getSugLabel(sug) }}
          </span>
          <span style="font-size:0.7rem;color:var(--text-muted);">
            {{ sug.applied ? '✓ 已执行' : '⏳ 待处理' }}
          </span>
        </div>

        <!-- 四段式内容 -->
        <div class="sug-section">
          <span class="sug-section-label">设备名称</span>
          <div class="sug-section-content" style="font-weight:700;color:var(--text-primary);">{{ sug.target }}</div>
        </div>
        <div class="sug-section">
          <span class="sug-section-label">优化数值</span>
          <div class="sug-section-content">
            当前 <span style="color:var(--text-muted);">{{ sug.currentVal }}</span>
            &nbsp;→&nbsp;
            建议 <span class="value-contrast">{{ sug.suggestedVal }}</span>
          </div>
        </div>
        <div class="sug-section">
          <span class="sug-section-label">优化原因</span>
          <div class="sug-section-content" style="opacity:0.75;">{{ sug.reason }}</div>
        </div>
        <div class="sug-section" style="border-bottom:none;">
          <span class="sug-section-label">预期效果</span>
          <div class="sug-section-content">
            <span class="effect-highlight">{{ sug.expectedOutcome }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="sug-actions">
          <el-button
            v-if="!sug.applied"
            type="primary"
            size="small"
            :loading="applyingId === sug.id"
            @click="handleApply(sug)"
          >
            一键指挥采纳并下发指令
          </el-button>
          <span v-else class="sug-priority-tag done" style="font-size:0.78rem;padding:6px 16px;">
            ✓ 已采纳
          </span>
        </div>
      </div>
    </el-card>

    <!-- ========== AI 诊断弹窗 ========== -->
    <el-dialog
      v-model="diagDialogVisible"
      title="AI 智能诊断"
      width="480px"
      destroy-on-close
      :close-on-click-modal="false"
      @closed="handleDiagClosed"
    >
      <div style="padding:8px 0;">
        <el-progress
          :percentage="diagnosisStatus.progress"
          :stroke-width="6"
          :color="diagnosisStatus.status === 'completed' ? '#10B981' : '#059669'"
          style="margin-bottom:18px;"
        />
        <div
          v-for="(step, idx) in diagnosisStatus.steps"
          :key="step.id"
          class="diagnosis-step"
          :class="{
            active: diagnosisStatus.status === 'running' && idx === Math.floor(diagnosisStatus.progress / (100 / diagnosisStatus.steps.length)),
            done: diagnosisStatus.status === 'running' && idx < Math.floor(diagnosisStatus.progress / (100 / diagnosisStatus.steps.length)),
            waiting: diagnosisStatus.status === 'idle' || (diagnosisStatus.status === 'running' && idx > Math.floor(diagnosisStatus.progress / (100 / diagnosisStatus.steps.length)))
          }"
        >
          <div class="step-indicator">
            <span v-if="diagnosisStatus.status === 'running' && idx < Math.floor(diagnosisStatus.progress / (100 / diagnosisStatus.steps.length))">✓</span>
            <span v-else-if="diagnosisStatus.status === 'running' && idx === Math.floor(diagnosisStatus.progress / (100 / diagnosisStatus.steps.length))">
              <el-icon :size="16"><Cpu /></el-icon>
            </span>
            <span v-else>{{ step.id }}</span>
          </div>
          <div class="step-body">
            <div class="step-label">{{ step.label }}</div>
            <div class="step-detail">{{ step.detail }}</div>
          </div>
        </div>
        <div v-if="diagnosisStatus.status === 'completed'" style="text-align:center;padding:12px 0;">
          <div style="font-size:2.2rem;margin-bottom:6px;">✅</div>
          <div style="font-size:1rem;font-weight:700;color:var(--accent-success);">诊断完成</div>
          <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
            共检测到 {{ diagnosisStatus.results.length }} 项问题
          </div>
        </div>
      </div>
      <template #footer>
        <el-button v-if="diagnosisStatus.status === 'completed'" type="primary" @click="goToDiagnosisResults">
          前往「运行报表」查看详情
        </el-button>
      </template>
    </el-dialog>

    <!-- ========== 告警详情弹窗 ========== -->
    <el-dialog
      v-model="alarmDialogVisible"
      :title="'AI 根因归因分析 — ' + (selectedAlarm?.title || '')"
      width="560px"
      destroy-on-close
    >
      <div v-if="selectedAlarm" style="padding:8px 0;">
        <p style="color:var(--text-secondary);margin-bottom:18px;font-size:0.86rem;line-height:1.7;">
          {{ selectedAlarm.detail }}
        </p>
        <div
          v-for="(rc, idx) in selectedAlarm.rootCauses"
          :key="idx"
          class="root-cause-bar"
        >
          <span class="rc-label">{{ rc.name }}</span>
          <div class="rc-track">
            <div class="rc-fill" :style="{ width: rc.contribution + '%' }"></div>
          </div>
          <span class="rc-pct">{{ rc.contribution }}%</span>
        </div>
        <div style="margin-top:18px;padding:12px 16px;background:var(--accent-primary-dim);border:1px solid rgba(5,150,105,0.25);border-radius:var(--radius-sm);">
          <div style="color:var(--accent-primary-light);font-weight:700;margin-bottom:5px;">💡 AI 建议动作</div>
          <div style="color:var(--text-secondary);font-size:0.83rem;line-height:1.7;">{{ selectedAlarm.aiAction }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
