import { reactive, readonly } from 'vue'

// 全局响应式状态
const state = reactive({
  systemStatus: {
    physicsModelValid: true,
    aiInferenceLatency: 12,
    controlMode: 'CLOSED_LOOP'
  },
  metrics: {
    so2: { current: 35.4, unit: 'mg/m³', limit: 50 },
    nox: { current: 142.1, unit: 'mg/m³', limit: 100, isOver: true },
    co2: { current: 8.5, unit: '%' },
    temp: { current: 985, unit: '°C' },
    sncrFlow: { current: 120, unit: 'L/h' },
    desulfurizationEff: { current: 96.8, unit: '%' },
    denitrificationEff: { current: 85.2, unit: '%' }
  },
  predictionSeries: {
    timestamps: ['11:00', '11:05', '11:10', '11:15', '11:20', '11:25 (当前)', '11:30 (预测)', '11:35 (预测)', '11:40 (预测)'],
    actualNox: [160, 155, 150, 148, 145, 142.1, null, null, null],
    predictedNox: [null, null, null, null, null, 142.1, 135, 121, 108],
    confidenceUpper: [null, null, null, null, null, 146, 140, 128, 115],
    confidenceLower: [null, null, null, null, null, 138, 128, 114, 101]
  },
  aiSuggestions: [
    {
      id: 101,
      target: 'SNCR 喷氨控制系统',
      currentVal: '120 L/h',
      suggestedVal: '135 L/h',
      reason: '预测未来15分钟 NOx 有超标风险，基于钙基吸附剂动力学模型建议加大喷氨量，可联动调节烟气再循环阀门开度+3%',
      expectedOutcome: 'NOx浓度预计下降15%，将稳定在120mg/m³以下，符合GB 18484排放标准',
      applied: false
    },
    {
      id: 102,
      target: '钙基吸附剂喷射频率',
      currentVal: '每30秒',
      suggestedVal: '每22秒',
      reason: '炉膛温度波动导致SO₂瞬时浓度升高，基于多孔钙基吸附剂反应动力学模型建议缩短喷射间隔',
      expectedOutcome: 'SO₂浓度预计下降至28mg/m³，同时降低吸附剂单耗8%',
      applied: false
    }
  ],
  alarms: [
    {
      id: 201,
      level: 'warning',
      title: 'NOx 浓度超标预警',
      detail: '当前 NOx 浓度 142.1 mg/m³，超过国标限值 100 mg/m³',
      time: '11:25:30',
      rootCauses: [
        { name: '入炉危废热值波动', contribution: 65 },
        { name: 'SNCR 喷氨配比偏差', contribution: 25 },
        { name: '传感器瞬时噪声', contribution: 10 }
      ],
      aiAction: '建议开启烟气再循环阀门 +5%，同时将 SNCR 喷氨量提升至 135 L/h'
    },
    {
      id: 202,
      level: 'info',
      title: '炉膛温度异常波动',
      detail: '炉膛温度在 975-995°C 之间频繁波动，幅度超过 ±10°C',
      time: '11:22:15',
      rootCauses: [
        { name: '入炉废料热值波动', contribution: 55 },
        { name: '补燃风配比偏差', contribution: 30 },
        { name: '温度传感器老化', contribution: 15 }
      ],
      aiAction: '建议调整一二次风配比至 60:40，并开启辅助燃烧器稳压模式'
    },
    {
      id: 203,
      level: 'info',
      title: '钙基吸附剂消耗速率偏高',
      detail: '当前吸附剂消耗速率 85 kg/h，较设计值 72 kg/h 偏高 18%',
      time: '11:18:00',
      rootCauses: [
        { name: '烟气SO₂浓度瞬态升高', contribution: 50 },
        { name: '吸附剂粒径分布偏移', contribution: 35 },
        { name: '喷射系统局部堵塞', contribution: 15 }
      ],
      aiAction: '建议检查喷射管路压差，切换至备用喷射支路，并微调吸附剂粒径分选参数'
    }
  ]
})

// 历史数据（供 HistoryView 使用）
const historyRecords = reactive([
  { id: 1, time: '2026-07-19 11:25:00', so2: 35.4, nox: 142.1, temp: 985, sncrFlow: 120, suggestionApplied: '未采纳' },
  { id: 2, time: '2026-07-19 11:20:00', so2: 34.1, nox: 145.0, temp: 982, sncrFlow: 120, suggestionApplied: '未采纳' },
  { id: 3, time: '2026-07-19 11:15:00', so2: 33.8, nox: 148.0, temp: 978, sncrFlow: 118, suggestionApplied: '已采纳-喷氨' },
  { id: 4, time: '2026-07-19 11:10:00', so2: 36.2, nox: 150.0, temp: 980, sncrFlow: 115, suggestionApplied: '已采纳-风门' },
  { id: 5, time: '2026-07-19 11:05:00', so2: 35.0, nox: 155.0, temp: 976, sncrFlow: 115, suggestionApplied: '未采纳' },
  { id: 6, time: '2026-07-19 11:00:00', so2: 34.5, nox: 160.0, temp: 972, sncrFlow: 115, suggestionApplied: '未采纳' },
  { id: 7, time: '2026-07-19 10:55:00', so2: 37.1, nox: 152.5, temp: 968, sncrFlow: 112, suggestionApplied: '已采纳-吸附剂' },
  { id: 8, time: '2026-07-19 10:50:00', so2: 33.9, nox: 147.8, temp: 970, sncrFlow: 110, suggestionApplied: '未采纳' },
  { id: 9, time: '2026-07-19 10:45:00', so2: 36.8, nox: 158.2, temp: 966, sncrFlow: 110, suggestionApplied: '未采纳' },
  { id: 10, time: '2026-07-19 10:40:00', so2: 35.5, nox: 154.0, temp: 963, sncrFlow: 108, suggestionApplied: '未采纳' }
])

// 雷达图优化数据
const radarData = reactive({
  traditional: { deso2: 82, denox: 75, deco2: 60, energy: 70, cost: 65 },
  aiOptimized: { deso2: 96, denox: 90, deco2: 78, energy: 55, cost: 48 }
})

// AI诊断状态
const diagnosisStatus = reactive({
  status: 'idle', // 'idle' | 'running' | 'completed'
  progress: 0,
  currentStep: '',
  steps: [
    { id: 1, label: '数据采集', detail: '读取CEMS/PLC实时数据流' },
    { id: 2, label: '模型推理', detail: '钙基吸附剂动力学模型前向计算' },
    { id: 3, label: '异常检测', detail: '多变量统计过程控制(MSPC)异常筛查' },
    { id: 4, label: '根因分析', detail: '贝叶斯网络因果推断归因' },
    { id: 5, label: '生成报告', detail: '输出诊断结论与优化建议' }
  ],
  results: [
    {
      id: 'diag-01',
      level: 'high',
      levelText: '高危',
      title: 'SNCR喷氨系统响应滞后',
      description: '喷氨调节阀PID参数偏保守，当NOx瞬时升高时无法快速跟踪，导致排放窗口期超标风险',
      affectedScope: '1#焚烧线 SNCR反应区、烟囱CEMS监测点',
      probability: '92%',
      suggestion: '建议将PID比例增益Kp从0.8调整至1.2，积分时间Ti从60s缩短至35s，并开启前馈补偿通道',
      relatedAlarmId: 201,
      relatedSuggestionId: 101
    },
    {
      id: 'diag-02',
      level: 'mid',
      levelText: '中危',
      title: '吸附剂喷射管路局部磨损',
      description: '3#喷射支路压差持续升高，管壁可能形成钙基结垢层，影响吸附剂喷射均匀性',
      affectedScope: '1#焚烧线 吸附剂喷射系统 3#支路',
      probability: '78%',
      suggestion: '建议切换至备用喷射支路，对3#支路进行在线脉冲清洗，并将喷射压力从0.35MPa提升至0.40MPa',
      relatedAlarmId: 203,
      relatedSuggestionId: 102
    },
    {
      id: 'diag-03',
      level: 'low',
      levelText: '低危',
      title: 'CEMS分析仪零点漂移',
      description: 'SO₂分析仪近24h零点漂移量为+1.2ppm，虽在允许范围内但呈上升趋势',
      affectedScope: '烟囱CEMS监测站 SO₂分析模块',
      probability: '65%',
      suggestion: '建议在下一轮巡检时执行自动零点校准，并延长校准周期至每8小时一次',
      relatedAlarmId: null,
      relatedSuggestionId: null
    }
  ]
})

// 触发AI诊断流程
async function runDiagnosis() {
  if (diagnosisStatus.status === 'running') return
  diagnosisStatus.status = 'running'
  diagnosisStatus.progress = 0

  for (let i = 0; i < diagnosisStatus.steps.length; i++) {
    diagnosisStatus.currentStep = diagnosisStatus.steps[i].label
    diagnosisStatus.progress = ((i + 1) / diagnosisStatus.steps.length) * 100
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700))
  }

  diagnosisStatus.status = 'completed'
  diagnosisStatus.currentStep = '诊断完成'
}

// 一指挥采纳
function applySuggestion(id, ElNotification) {
  const suggestion = state.aiSuggestions.find(s => s.id === id)
  if (!suggestion) return

  suggestion.applied = true

  if (id === 101) {
    state.metrics.sncrFlow.current = 135
    // 预测曲线陡峭下降
    state.predictionSeries.predictedNox = [null, null, null, null, null, 142.1, 122, 105, 88]
    state.predictionSeries.confidenceUpper = [null, null, null, null, null, 146, 128, 112, 95]
    state.predictionSeries.confidenceLower = [null, null, null, null, null, 138, 116, 98, 81]
    // NOx 风险解除
    state.metrics.nox.isOver = false
    state.metrics.nox.current = 130.5
  }

  if (id === 102) {
    state.metrics.so2.current = 28.0
    state.predictionSeries.actualNox[5] = 138.0
  }

  if (ElNotification) {
    ElNotification({
      title: 'PLC 指令已下发',
      message: `${suggestion.target}已调整至 ${suggestion.suggestedVal}`,
      type: 'success',
      duration: 4000
    })
  }
}

export function useSystemStore() {
  return {
    state: readonly(state),
    rawState: state,
    historyRecords,
    radarData,
    diagnosisStatus,
    runDiagnosis,
    applySuggestion
  }
}
