<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { Check, Lightning, Cpu, Warning, TrendCharts, MagicStick } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { useSystemStore } from '../stores/useSystemStore'

const { rawState: state, diagnosisStatus, runDiagnosis, applySuggestion } = useSystemStore()

// ========== Chart ==========
const chartRef = ref(null)
let chartInstance = null

function buildChartOption() {
  const ts = state.predictionSeries.timestamps
  const actual = state.predictionSeries.actualNox
  const predicted = state.predictionSeries.predictedNox
  const upper = state.predictionSeries.confidenceUpper
  const lower = state.predictionSeries.confidenceLower

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#C8DDD2',
      textStyle: { color: '#172720', fontSize: 12 }
    },
    legend: {
      data: ['实际测值', 'AI 预测趋势', '95% 置信区间'],
      bottom: 0,
      textStyle: { color: '#738C80', fontSize: 11 },
      itemWidth: 16,
      itemHeight: 2
    },
    grid: { left: '3%', right: '4%', bottom: '14%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category', data: ts, boundaryGap: false,
      axisLine: { lineStyle: { color: '#C8DDD2' } },
      axisLabel: { color: '#738C80', fontSize: 11 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value', name: 'mg/m³',
      nameTextStyle: { color: '#738C80' },
      axisLine: { lineStyle: { color: '#C8DDD2' } },
      axisLabel: { color: '#738C80' },
      splitLine: { lineStyle: { color: '#E2EFE8', type: 'dashed' } },
      min: 70
    },
    series: [
      {
        name: '实际测值', type: 'line', data: actual, smooth: true,
        lineStyle: { color: '#175A3A', width: 2.5 },
        itemStyle: { color: '#175A3A' }, symbol: 'circle', symbolSize: 6
      },
      {
        name: 'AI 预测趋势', type: 'line', data: predicted, smooth: true,
        lineStyle: { color: '#0B808C', width: 2.5, type: 'dashed' },
        itemStyle: { color: '#0B808C' }, symbol: 'diamond', symbolSize: 8
      },
      {
        name: '95% 置信区间', type: 'line', data: upper, smooth: true,
        lineStyle: { color: 'transparent', width: 0 }, symbol: 'none',
        areaStyle: { color: 'rgba(11,128,140,0.15)' }, stack: 'confidence', silent: true
      },
      {
        name: '置信下界', type: 'line', data: lower, smooth: true,
        lineStyle: { color: 'transparent', width: 0 }, symbol: 'none',
        areaStyle: { color: 'transparent' }, stack: 'confidence', silent: true
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

// ========== AI Diagnosis Dialog ==========
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
  // 诊断完成时提示
  if (diagnosisStatus.status === 'completed') {
    ElMessage({ message: 'AI 智能诊断已完成，共发现 ' + diagnosisStatus.results.length + ' 项问题', type: 'success' })
  }
}

// 交叉引用 — 跳转到对应告警
function scrollToAlarm(alarmId) {
  diagDialogVisible.value = false
  const alarm = state.alarms.find(a => a.id === alarmId)
  if (alarm) openAlarmDetail(alarm)
}

// 交叉引用 — 高亮对应建议
function scrollToSuggestion(sugId) {
  diagDialogVisible.value = false
  setTimeout(() => {
    const el = document.getElementById('suggestion-' + sugId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('highlight-flash')
      setTimeout(() => el.classList.remove('highlight-flash'), 2000)
    }
  }, 400)
}

// AI建议排序
const suggestionSortBy = ref('priority')
const sortedSuggestions = computed(() => {
  const list = [...state.aiSuggestions]
  if (suggestionSortBy.value === 'priority') {
    // ID 101 优先（NOx超标）
    return list.sort((a, b) => {
      if (a.applied && !b.applied) return 1
      if (!a.applied && b.applied) return -1
      return a.id - b.id
    })
  }
  return list
})

// 获取建议优先级
function getSugPriority(sug) {
  if (sug.id === 101) return 'high'
  return 'mid'
}

// ========== Lifecycle ==========
onMounted(() => {
  nextTick(() => {
    initChart()
    chartUpdateTimer = setInterval(updateChartCurrentPoint, 2000)
  })
  window.addEventListener('resize', resizeChart)
})
onUnmounted(() => {
  if (chartInstance) chartInstance.dispose()
  if (chartUpdateTimer) clearInterval(chartUpdateTimer)
  window.removeEventListener('resize', resizeChart)
})
</script>

<template>
  <div>
    <!-- ========== 顶端指标卡片 ========== -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">SO₂ 浓度</div>
        <div class="metric-value">{{ state.metrics.so2.current }}</div>
        <div class="metric-unit">{{ state.metrics.so2.unit }}</div>
        <div class="metric-limit">限值 {{ state.metrics.so2.limit }} mg/m³</div>
      </div>
      <div class="metric-card" :class="{ 'over-limit': state.metrics.nox.isOver }">
        <div class="metric-label">NOx 浓度</div>
        <div class="metric-value">{{ state.metrics.nox.current.toFixed(1) }}</div>
        <div class="metric-unit">{{ state.metrics.nox.unit }}</div>
        <div class="metric-limit">
          限值 {{ state.metrics.nox.limit }} mg/m³
          <span v-if="state.metrics.nox.isOver" class="over">⚠ 超标</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-label">CO₂ 浓度</div>
        <div class="metric-value">{{ state.metrics.co2.current }}</div>
        <div class="metric-unit">{{ state.metrics.co2.unit }}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">炉膛温度</div>
        <div class="metric-value">{{ state.metrics.temp.current }}</div>
        <div class="metric-unit">{{ state.metrics.temp.unit }}</div>
      </div>
    </div>

    <!-- ========== 主图表 + 告警面板 ========== -->
    <div class="dashboard-grid">
      <el-card>
        <template #header>
          <div class="ai-section-header">
            <span class="ai-section-title">
              <el-icon :size="18" color="#175A3A"><TrendCharts /></el-icon>
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
        <div ref="chartRef" class="chart-box"></div>
      </el-card>

      <!-- 告警列表 -->
      <el-card>
        <template #header>
          <div class="ai-section-header">
            <span class="ai-section-title">
              <el-icon :size="18" color="#DC3D55"><Warning /></el-icon>
              AI 预警与诊断
            </span>
            <el-button class="ai-diag-btn" size="small" :icon="Cpu" @click="openDiagnosis">
              开启AI智能诊断
            </el-button>
            <span v-if="diagnosisStatus.status === 'completed'" class="ai-section-badge" style="background:var(--accent-primary-pale);color:var(--accent-success);border-color:var(--accent-primary-light);">
              诊断完成 · {{ diagnosisStatus.results.length }}项问题
            </span>
          </div>
        </template>
        <div style="max-height:340px;overflow-y:auto;">
          <div
            v-for="(alarm, idx) in state.alarms"
            :key="alarm.id"
            class="alarm-item"
            :class="alarm.level"
            :style="{ animationDelay: (idx * 0.08) + 's' }"
            @click="openAlarmDetail(alarm)"
          >
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="alarm-level-tag" :class="alarm.level">{{ alarm.level === 'warning' ? '高危' : '中危' }}</span>
                <span class="alarm-title">{{ alarm.title }}</span>
              </div>
              <div style="font-size:0.76rem;color:var(--text-muted);margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ alarm.detail }}</div>
            </div>
            <span class="alarm-time" style="flex-shrink:0;margin-left:12px;">{{ alarm.time }}</span>
          </div>
        </div>
      </el-card>
    </div>

    <!-- ========== AI 优化决策推荐面板（卡片式） ========== -->
    <el-card style="margin-bottom:20px;">
      <template #header>
        <div class="ai-section-header">
          <span class="ai-section-title">
            <el-icon :size="18" color="#0B808C"><MagicStick /></el-icon>
            AI 优化决策推荐
          </span>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">排序:</span>
            <el-radio-group v-model="suggestionSortBy" size="small">
              <el-radio-button label="priority">按优先级</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </template>
      <div>
        <div
          v-for="sug in sortedSuggestions"
          :key="sug.id"
          :id="'suggestion-' + sug.id"
          class="ai-suggestion-card"
          :class="{ applied: sug.applied }"
        >
          <div class="sug-header">
            <div class="sug-header-left">
              <span class="sug-priority" :class="getSugPriority(sug)">
                {{ getSugPriority(sug) === 'high' ? '优先处理' : '建议优化' }}
              </span>
              <span class="sug-name">{{ sug.target }}</span>
            </div>
            <span class="sug-status" :style="{ color: sug.applied ? 'var(--accent-success)' : 'var(--text-muted)' }">
              {{ sug.applied ? '✓ 已执行' : '待处理' }}
            </span>
          </div>
          <div class="sug-body">
            当前值：<strong>{{ sug.currentVal }}</strong> → 建议值：<strong style="color:var(--accent-teal);">{{ sug.suggestedVal }}</strong>
            <br/>原因：{{ sug.reason }}
          </div>
          <div class="sug-outcome">预期效果：{{ sug.expectedOutcome }}</div>
          <div class="sug-actions">
            <el-button
              type="primary"
              size="small"
              :loading="applyingId === sug.id"
              :disabled="sug.applied"
              :icon="Check"
              @click="handleApply(sug)"
            >
              {{ sug.applied ? '已采纳' : '一指挥采纳并下发指令' }}
            </el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- ========== AI 诊断结果展示（诊断完成后显示） ========== -->
    <el-card v-if="diagnosisStatus.status === 'completed'" style="margin-bottom:20px;">
      <template #header>
        <div class="ai-section-header">
          <span class="ai-section-title">
            <el-icon :size="18" color="#175A3A"><Cpu /></el-icon>
            AI 智能诊断报告
          </span>
          <span class="ai-section-badge" style="background:var(--accent-primary-pale);color:var(--accent-success);border-color:var(--accent-primary-light);">
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
        <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
          <span
            v-if="result.relatedAlarmId"
            class="diag-cross-ref"
            @click="scrollToAlarm(result.relatedAlarmId)"
          >
            🔗 关联告警 #{{ result.relatedAlarmId }}
          </span>
          <span
            v-if="result.relatedSuggestionId"
            class="diag-cross-ref"
            @click="scrollToSuggestion(result.relatedSuggestionId)"
          >
            🔗 关联优化建议 #{{ result.relatedSuggestionId }}
          </span>
        </div>
      </div>
    </el-card>

    <!-- ========== AI 诊断弹窗 ========== -->
    <el-dialog
      v-model="diagDialogVisible"
      title="AI 智能诊断"
      width="560px"
      destroy-on-close
      :close-on-click-modal="false"
      @closed="handleDiagClosed"
    >
      <div style="padding:8px 0;">
        <!-- 进度条 -->
        <el-progress
          :percentage="diagnosisStatus.progress"
          :stroke-width="6"
          :color="diagnosisStatus.status === 'completed' ? '#288550' : '#0B808C'"
          style="margin-bottom:20px;"
        />

        <!-- 步骤列表 -->
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
              <Cpu style="animation: pulse 0.8s ease-in-out infinite;" />
            </span>
            <span v-else>{{ step.id }}</span>
          </div>
          <div class="step-body">
            <div class="step-label">{{ step.label }}</div>
            <div class="step-detail">{{ step.detail }}</div>
          </div>
        </div>

        <!-- 完成状态 -->
        <div v-if="diagnosisStatus.status === 'completed'" style="text-align:center;padding:16px 0;margin-top:8px;">
          <div style="font-size:2.5rem;margin-bottom:8px;">✅</div>
          <div style="font-size:1rem;font-weight:700;color:var(--accent-success);">诊断完成</div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
            共检测到 {{ diagnosisStatus.results.length }} 项问题，详情已在下方展示
          </div>
        </div>
      </div>

      <template #footer>
        <el-button v-if="diagnosisStatus.status === 'completed'" type="primary" @click="diagDialogVisible = false">
          查看诊断结果
        </el-button>
      </template>
    </el-dialog>

    <!-- ========== 告警详情弹窗 ========== -->
    <el-dialog
      v-model="alarmDialogVisible"
      :title="'AI 根因归因分析 — ' + (selectedAlarm?.title || '')"
      width="600px"
      destroy-on-close
    >
      <div v-if="selectedAlarm" style="padding:8px 0;">
        <p style="color:var(--text-secondary);margin-bottom:20px;font-size:0.9rem;">
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
        <div style="margin-top:20px;padding:14px 18px;background:var(--accent-teal-pale);border:1px solid var(--accent-teal);border-radius:var(--radius-sm);">
          <div style="color:var(--accent-teal);font-weight:700;margin-bottom:6px;">💡 AI 建议动作</div>
          <div style="color:var(--text-secondary);font-size:0.88rem;line-height:1.7;">{{ selectedAlarm.aiAction }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style>
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}
.highlight-flash {
  animation: highlightPulse 2s ease-in-out !important;
}
@keyframes highlightPulse {
  0%   { background: rgba(11,128,140,0.15); }
  100% { background: transparent; }
}
</style>
