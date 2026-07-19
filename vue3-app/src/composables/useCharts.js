import { onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useData } from './useData'

export function useCharts() {
  const { MOCK } = useData()
  const instances = {}

  const COLORS = {
    primary: '#1A5C3E',
    primaryDark: '#0F3B27',
    accent: '#0D8C99',
    accentLight: '#4DD4C9',
    blue: '#2C8A5C',
    green: '#4DA88C',
    orange: '#E17055',
    purple: '#6C5CE7',
    teal: '#086B78'
  }

  function initChart(domId, option) {
    var dom = document.getElementById(domId)
    if (!dom) return null
    if (instances[domId]) {
      instances[domId].dispose()
    }
    var chart = echarts.init(dom)
    chart.setOption(option)
    instances[domId] = chart
    return chart
  }

  function renderFinance(domId) {
    var data = MOCK.finance.revenueForecast
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: COLORS.accent,
        textStyle: { color: '#333' }
      },
      legend: {
        data: ['营业收入', '总成本', '净利润'],
        bottom: 0,
        textStyle: { color: '#666', fontSize: 12 }
      },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: data.map(function (d) { return d.year + '年' }),
        axisLine: { lineStyle: { color: '#ccc' } },
        axisLabel: { color: '#666' }
      },
      yAxis: {
        type: 'value',
        name: '万元',
        axisLine: { lineStyle: { color: '#ccc' } },
        axisLabel: { color: '#666' },
        splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }
      },
      series: [
        {
          name: '营业收入',
          type: 'bar',
          data: data.map(function (d) { return d.revenue }),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS.accent },
              { offset: 1, color: COLORS.accentLight }
            ])
          },
          barWidth: '30%',
          label: { show: true, position: 'top', color: COLORS.accent, fontSize: 10 }
        },
        {
          name: '总成本',
          type: 'bar',
          data: data.map(function (d) { return d.cost }),
          itemStyle: { color: '#BDBDBD' },
          barWidth: '30%',
          label: { show: true, position: 'top', color: '#999', fontSize: 10 }
        },
        {
          name: '净利润',
          type: 'line',
          data: data.map(function (d) { return d.profit }),
          lineStyle: { color: COLORS.primary, width: 3 },
          itemStyle: { color: COLORS.primary },
          symbol: 'circle',
          symbolSize: 8,
          label: { show: true, color: COLORS.primary, fontSize: 10, fontWeight: 'bold' }
        }
      ]
    }
    return initChart(domId, option)
  }

  function renderRevenuePie(domId) {
    var data = MOCK.finance.revenueBreakdown
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        textStyle: { color: '#666', fontSize: 11 }
      },
      series: [{
        name: '收入构成',
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 10,
          color: '#666'
        },
        data: data.map(function (d, i) {
          var colors = [COLORS.accent, COLORS.primary, COLORS.blue, COLORS.green]
          return { value: d.value, name: d.name, itemStyle: { color: colors[i] } }
        })
      }]
    }
    return initChart(domId, option)
  }

  function renderCostPie(domId) {
    var data = MOCK.finance.costBreakdown
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        textStyle: { color: '#666', fontSize: 11 }
      },
      series: [{
        name: '成本构成',
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['38%', '50%'],
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 10,
          color: '#666'
        },
        data: data.map(function (d, i) {
          var colors = ['#E17055', '#2C8A5C', '#4DA88C', '#6C5CE7', '#0D8C99', '#BDBDBD']
          return { value: d.value, name: d.name, itemStyle: { color: colors[i] } }
        })
      }]
    }
    return initChart(domId, option)
  }

  function renderEnvRadar(domId) {
    var data = MOCK.benefit.environmentalData
    var option = {
      tooltip: {},
      legend: {
        data: ['本项目', '传统工艺'],
        bottom: 0,
        textStyle: { color: '#666', fontSize: 12 }
      },
      radar: {
        center: ['50%', '52%'],
        radius: '65%',
        indicator: data.labels.map(function (l) {
          return { name: l, max: 100 }
        }),
        axisName: { color: '#666', fontSize: 11 },
        splitArea: {
          areaStyle: { color: ['rgba(13,140,153,0.05)', 'rgba(13,140,153,0.1)'] }
        }
      },
      series: [{
        name: '环保效益对比',
        type: 'radar',
        data: [
          {
            value: data.project,
            name: '本项目',
            areaStyle: { color: 'rgba(26,92,62,0.2)' },
            lineStyle: { color: COLORS.primary, width: 2 },
            itemStyle: { color: COLORS.primary }
          },
          {
            value: data.traditional,
            name: '传统工艺',
            areaStyle: { color: 'rgba(189,189,189,0.25)' },
            lineStyle: { color: '#9E9E9E', width: 2 },
            itemStyle: { color: '#9E9E9E' }
          }
        ]
      }]
    }
    return initChart(domId, option)
  }

  function renderMarketTrend(domId) {
    var data = MOCK.finance.revenueForecast
    var option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: COLORS.accent,
        textStyle: { color: '#333' }
      },
      grid: { left: '3%', right: '8%', bottom: '10%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: data.map(function (d) { return d.year + '年' }),
        axisLine: { lineStyle: { color: '#ccc' } },
        axisLabel: { color: '#666' }
      },
      yAxis: [
        {
          type: 'value',
          name: '万元',
          axisLabel: { color: '#666' },
          splitLine: { lineStyle: { color: '#f0f0f0', type: 'dashed' } }
        },
        {
          type: 'value',
          name: '%',
          axisLabel: { color: '#666', formatter: '{value}%' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '营业收入',
          type: 'bar',
          data: data.map(function (d) { return d.revenue }),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: COLORS.accent },
              { offset: 1, color: COLORS.accentLight }
            ])
          },
          barWidth: '35%',
          barGap: '30%'
        },
        {
          name: '年增长率',
          type: 'line',
          yAxisIndex: 1,
          data: [null, 300, 133, 79, 70],
          lineStyle: { color: COLORS.primary, width: 2.5, type: 'dashed' },
          itemStyle: { color: COLORS.primary },
          symbol: 'diamond',
          symbolSize: 10,
          label: { show: true, formatter: '{c}%', color: COLORS.primary, fontSize: 10 }
        }
      ]
    }
    return initChart(domId, option)
  }

  function renderFundingPie(domId) {
    var data = MOCK.finance.funding.usage
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}万元'
      },
      series: [{
        name: '融资用途',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: {
          formatter: '{b}\n{d}%',
          fontSize: 11,
          color: '#666'
        },
        data: data.map(function (d, i) {
          var colors = [COLORS.accent, COLORS.primary, COLORS.blue, COLORS.green, COLORS.orange]
          return { value: d.amount, name: d.item, itemStyle: { color: colors[i] } }
        })
      }]
    }
    return initChart(domId, option)
  }

  function renderAllFinanceCharts() {
    nextTick(function () {
      renderFinance('chart-finance')
      renderRevenuePie('chart-revenue-pie')
      renderCostPie('chart-cost-pie')
      renderMarketTrend('chart-market-trend')
      renderFundingPie('chart-funding-pie')
    })
  }

  function resizeAll() {
    for (var key in instances) {
      if (instances.hasOwnProperty(key)) {
        instances[key].resize()
      }
    }
  }

  function disposeAll() {
    for (var key in instances) {
      if (instances.hasOwnProperty(key)) {
        instances[key].dispose()
        delete instances[key]
      }
    }
  }

  onUnmounted(function () {
    disposeAll()
  })

  return {
    renderFinance,
    renderRevenuePie,
    renderCostPie,
    renderEnvRadar,
    renderMarketTrend,
    renderFundingPie,
    renderAllFinanceCharts,
    resizeAll,
    disposeAll
  }
}
