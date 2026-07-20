# 智慧烟气治理专家系统 (Smart Flue Gas AI System)

> 钙基危废烟气一体化脱除技术 — AI 驱动的工业烟气治理智能监控平台

[![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.8-409EFF?logo=element)](https://element-plus.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.5-AA344D)](https://echarts.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

---

## 项目概述

本项目为"钙基危废烟气一体化脱除技术"配套的**前端静态演示 Web 系统**，面向评审演示与工业控制大屏场景，提供 AI 驱动的实时烟气监测、多目标预测优化与智能诊断能力。

### 核心功能

| 功能模块 | 说明 |
|----------|------|
| **实时监控大屏** | 4 项核心指标（SO₂/NOx/CO₂/炉温）、AI 多目标预测趋势图、告警列表、AI 优化决策推荐 |
| **AI 智能诊断** | 5 步诊断流程（数据采集 → 模型推理 → 异常检测 → 根因分析 → 生成报告），模态弹窗 + 进度指示 |
| **运行报表分析** | 多目标优化雷达图（传统 vs AI）、交互式滑块联动调参、3 篇支撑论文展示 |
| **历史数据查询** | 10 条模拟历史记录表格、设备节点筛选、CSV 导出、分页 |
| **模拟仿真** | 每 2s 指标微调 + 图表平移动画、每 15s AI 巡检通知、采纳建议后预测曲线下降 |

---

## 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Vue 3 (Composition API) | ^3.4 | SPA 应用骨架 |
| 路由 | Vue Router 4 | ^4.3 | Hash 路由 + 懒加载 |
| UI 库 | Element Plus | ^2.8 | Card/Table/Button/Slider/Dialog/Notification 等 |
| 图标 | @element-plus/icons-vue | ^2.3 | 组件图标集 |
| 图表 | ECharts 5 | ^5.5 | 实时趋势图、雷达图、根因柱状图 |
| 构建 | Vite | ^5.4 | 极速开发与生产打包 |

---

## 项目结构

```
greenTechnology/
├── .gitignore                    # Git 忽略规则
├── README.md                     # 本文件
└── vue3-app/                     # Vue 3 应用根目录
    ├── index.html                # HTML 入口
    ├── package.json              # 依赖与脚本
    ├── vite.config.js            # Vite 配置（端口3000、host）
    └── src/
        ├── main.js               # Vue 挂载入口（Element Plus + Router）
        ├── App.vue               # 根组件（Header + RouterView + 定时器）
        ├── router/
        │   └── index.js          # 路由配置（3 条路由 + Hash 模式）
        ├── stores/
        │   └── useSystemStore.js # 全局响应式状态（指标/预测/建议/告警/诊断）
        ├── styles/
        │   └── global.css        # 全局主题（绿色环保 + 工业属性）
        ├── components/
        │   └── AppHeader.vue     # 顶部导航（Logo + 菜单 + 状态标签 + 时钟）
        └── views/
            ├── DashboardView.vue  # 实时监控大屏（图表 + 告警 + 诊断 + 建议）
            ├── AnalyticsView.vue  # 运行报表（雷达图 + 滑块联动）
            └── HistoryView.vue    # 历史查询（筛选 + 表格 + CSV导出）
```

### 组件依赖与交互关系

```
main.js
  ├── 挂载 Element Plus、Router
  └── App.vue
        ├── AppHeader.vue          ← 读取 useSystemStore 状态标签
        │     └── 路由切换: $router.push()
        ├── RouterView
        │     ├── DashboardView    ← useSystemStore (指标/预测/建议/告警/诊断)
        │     │     ├── ECharts (趋势图)
        │     │     ├── ElDialog (告警归因)
        │     │     ├── ElDialog (AI 诊断进度)
        │     │     └── ElCard (诊断结果 ← 交叉引用告警/建议)
        │     ├── AnalyticsView    ← useSystemStore (radarData)
        │     │     └── ECharts (雷达图) + ElSlider (联动重绘)
        │     └── HistoryView      ← useSystemStore (historyRecords)
        │           └── ElTable + ElPagination + CSV 导出
        └── 全局定时器:
              ├── setInterval 2s: 微调指标 + 图表平移
              └── setInterval 15s: AI 巡检 ElNotification
```

### 数据流

```
useSystemStore (全局响应式状态)
  ├── state.metrics          → DashboardView 指标卡片 + App 定时器微调
  ├── state.predictionSeries → DashboardView ECharts 趋势图
  ├── state.aiSuggestions    → DashboardView AI 决策卡片 + 采纳联动
  ├── state.alarms           → DashboardView 告警列表 + 归因弹窗
  ├── diagnosisStatus        → DashboardView 诊断弹窗 + 诊断结果面板
  ├── radarData              → AnalyticsView 雷达图 + Slider 联动
  └── historyRecords         → HistoryView 表格 + CSV 导出
```

---

## 环境配置

### 前置要求

- **Node.js** >= 18
- **npm** >= 9

### 安装

```bash
cd vue3-app
npm install
```

### 运行

```bash
# 开发模式（热更新，默认 http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 构建产物

`dist/` 目录使用代码分割：

| Chunk | 大小 | 说明 |
|-------|------|------|
| `index-*.js` | ~1 MB | Element Plus + ECharts + Vue 核心 |
| `index-*.css` | ~370 KB | Element Plus + 全局主题 |
| `DashboardView-*.js` | ~13 KB | 监控大屏（懒加载） |
| `AnalyticsView-*.js` | ~4 KB | 运行报表（懒加载） |
| `HistoryView-*.js` | ~4 KB | 历史查询（懒加载） |

---

## 路由架构

| 路径 | 名称 | 组件 | 说明 |
|------|------|------|------|
| `/` | — | — | 重定向到 `/dashboard` |
| `/dashboard` | dashboard | DashboardView | 实时监控大屏（默认页） |
| `/analytics` | analytics | AnalyticsView | 运行报表与多目标优化 |
| `/history` | history | HistoryView | 历史数据查询与导出 |

路由模式为 **Hash**（`createWebHashHistory`），适配静态部署场景。

---

## 设计系统

### 色彩体系 — 高级翡翠薄荷环保风 (Eco-Tech Mint/Emerald)

整体基调为带有轻微绿意的冷灰环保色，告别纯白与纯黑，走高端舒适路线。

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg-deep` | `#C8E3D9` | 页面底层基底 |
| `--bg-panel` | `#E2EFEB` | 面板区域底色 |
| `--bg-card` | `#EDF5F2` | 柔和薄荷绿卡片背景 |
| `--accent-primary` | `#059669` | 翡翠绿主色 — 图表实线、主按钮渐变、指标数值 |
| `--accent-primary-light` | `#10B981` | 翡翠亮绿 — 成功态、辅助高亮、渐变过渡 |
| `--accent-teal` | `#0284C7` | 科技青蓝 — AI 预测虚线、AI 推理徽章、科技点缀 |
| `--accent-danger` | `#E63946` | 告警红 — 超标闪烁、高危徽章 |
| `--accent-warning` | `#FFA840` | 警告橙 — 中危徽章、辅助告警 |
| `--text-primary` | `#064E3B` | 深翡翠绿灰 — 主标题、核心大数字 |
| `--text-secondary` | `#475569` | 深灰 — 次要文本、单位、标签 |
| `--text-muted` | `#64748B` | 浅灰 — 辅助信息 |
| `--border-card` | `#B8D9CC` | 边框 — 卡片分割线 |
| `--border-subtle` | `#D1E5DE` | 淡绿灰 — 图表网格线、细微分割 |
| `--gradient-primary` | `#047857 → #059669` | 主按钮/徽章渐变 |
| `--gradient-header` | `#E8F5F0 → #C8E5DA` | Header 白绿渐变 |
| `--shadow-card` | `0 4px 16px rgba(13,148,136,0.08)` | 微绿投影 |

### 页面背景

- `body`：`linear-gradient(135deg, #D0E8DE 0%, #C0DED2 100%)`
- 叠加细网格科技底纹 + 底部烟气光晕
- Header：`linear-gradient(90deg, #E8F5F0 0%, #C8E5DA 100%)` + `border-bottom: 2px solid #059669`

### 字体

- 中文：`PingFang SC` → `Microsoft YaHei` → `Helvetica Neue` → `Arial`
- 等宽（数值/时钟）：`JetBrains Mono` → `Fira Code` → `Consolas`

---

## 动效系统

| 动画 | 触发方式 | 效果 |
|------|----------|------|
| `aiThinkingPulse` | 持续 | 3 个圆点绿·蓝·绿交替呼吸脉冲（AI Thinking 图标） |
| `scanLine` | 诊断进行中 | 顶部绿→蓝渐变扫描线横移动画 |
| `dataParticleFlow` | 诊断进行中 | 多色数据粒子（绿+蓝）闪烁流动 |
| `stepPulse` | 诊断进行中 | 当前步骤指示器外扩光圈 + 蓝色辅助光晕 |
| `fadeSlideIn` | 卡片入场 | 告警项/诊断结果从下方淡入上滑 |
| `dangerPulse` | 指标超标 | 红色边框阴影呼吸闪烁 |
| `breathe` | 状态绿灯 | 绿色圆点呼吸效果 |
| `highlight-flash` | 交叉引用点击 | 目标建议卡翡翠绿背景渐消 |
| `fade` | 路由切换 | 页面淡入淡出过渡（220ms） |

> **AI 诊断流程**：5 步顺序执行，每步 2.6s，总时长约 13s，确保用户清晰感知完整检测过程。

---

## 开发规范

### 命名约定
- 组件文件：`PascalCase.vue`（如 `DashboardView.vue`）
- 目录：`kebab-case`（如 `vue3-app`）
- 数据属性：驼峰命名（如 `isOver`、`suggestedVal`）

### 状态管理
- 全局状态集中在 `useSystemStore.js`，通过 `reactive` + `readonly` 暴露
- 组件通过 `useSystemStore()` 获取 `rawState` 进行读写
- 所有 Mock 数据硬编码在 Store 中，零外部依赖

### 添加新章节
1. 在 `src/views/` 新建组件
2. 在 `src/router/index.js` 添加路由
3. 在 `AppHeader.vue` 的导航按钮列表中添加菜单项
4. 如需共享数据，在 `useSystemStore.js` 扩展

---

## 常见问题

**Q: 开发服务器端口被占用？**
A: Vite 配置为固定端口 3000。如被占用，先在终端 `npx kill-port 3000` 再启动。

**Q: "历史数据查询" 点击后白屏？**
A: 历史查询使用原生 `<input type="date">`，不依赖 Element Plus 的 dayjs 内部逻辑。如仍有问题，检查浏览器控制台。

**Q: 如何修改模拟数据？**
A: 所有数据集中在 `src/stores/useSystemStore.js`，包括 `state.metrics`、`predictionSeries`、`alarms`、`aiSuggestions`、`diagnosisStatus.results` 和 `historyRecords`。

**Q: 如何更改主题颜色？**
A: 修改 `src/styles/global.css` 中的 `:root` CSS 变量。Header 色系在 `.app-header` 和 `:root` 的 `--industrial-*` 系列。

---

## 许可

本项目仅用于学术演示与评审用途。

[MIT License](https://opensource.org/licenses/MIT)
