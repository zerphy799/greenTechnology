# 洁净所能 — 钙基危废烟气一体化脱除技术

> 互联网+ 国赛项目展示官网 | Vue 3 前端应用

---

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [环境配置](#环境配置)
- [路由架构](#路由架构)
- [功能模块](#功能模块)
- [Composables 说明](#composables-说明)
- [设计系统](#设计系统)
- [动效系统](#动效系统)
- [构建与部署](#构建与部署)
- [开发规范](#开发规范)
- [常见问题](#常见问题)

---

## 项目概述

本项目是 **"洁净所能——钙基危废烟气一体化脱除技术"** 的官方展示网站，面向互联网+创新创业大赛评审场景。项目以工业固废（电石渣、钢渣等）为原料，制备高效钙基吸附剂，实现危废焚烧烟气中酸性气体与重金属的一体化脱除。

**核心数据：**

| 指标 | 数值 |
|------|------|
| SO₂ 脱除率 | ≥ 95% |
| 重金属脱除率 | ≥ 90% |
| 较传统工艺降本 | ≤ 40% |
| 以废治废原料 | 100% |

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue](https://vuejs.org/) | ^3.4.0 | 前端框架（Composition API） |
| [Vue Router](https://router.vuejs.org/) | ^4.3.0 | Hash 路由管理 |
| [ECharts](https://echarts.apache.org/) | ^5.5.0 | 数据可视化图表 |
| [Vite](https://vitejs.dev/) | ^5.4.0 | 构建工具与开发服务器 |
| [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue) | ^5.0.0 | Vue SFC 编译插件 |

> **无额外 UI 框架依赖** — 所有样式通过原生 CSS 实现，保持零运行时开销和最大定制灵活性。

---

## 项目结构

```
greenTechnology/
├── .gitignore                     # Git 忽略规则
└── vue3-app/                      # Vue 3 应用根目录
    ├── index.html                 # HTML 入口
    ├── package.json               # 项目依赖与脚本
    ├── vite.config.js             # Vite 配置
    ├── public/
    │   └── images/                # 静态图片资源（200+ 张）
    │       ├── banner*.jpg        # 轮播 Banner 图（3 张）
    │       ├── cert*.jpg          # 获奖证书
    │       ├── eval_cert_*.jpeg   # 科技成果鉴定（32 页）
    │       ├── pdf_*.jpeg/png     # 论文/合同扫描件
    │       ├── ppt_chart_*.png    # PPT 图表导出
    │       ├── report_*.jpg       # 检测报告
    │       ├── proof*.jpg         # 应用证明
    │       └── template_*.jpg     # 模板占位图
    └── src/
        ├── main.js                # 应用入口（createApp + mount）
        ├── App.vue                # 根组件（布局骨架 + 路由视图）
        ├── router/
        │   └── index.js           # 路由配置（11 条路由，全部懒加载）
        ├── styles/
        │   └── global.css         # 全局样式（设计令牌 + 组件样式 + 动效 + 响应式）
        ├── composables/           # 组合式函数（业务逻辑抽离）
        │   ├── useData.js         # 数据层（全部 Mock 数据）
        │   ├── useCarousel.js     # Banner 轮播控制
        │   ├── useScrollReveal.js # 滚动揭示 + 数字计数动效
        │   ├── useCharts.js       # ECharts 图表封装
        │   ├── useBackToTop.js    # 返回顶部按钮
        │   └── useLightbox.js     # 全屏灯箱（provide/inject）
        └── components/
            ├── layout/            # 布局组件（全局可见）
            │   ├── HeroBanner.vue   # 主视觉轮播（3 张 CSS 渐变背景）
            │   ├── SiteHeader.vue   # 固定顶部导航栏
            │   ├── SiteFooter.vue   # 页脚
            │   ├── ToolBar.vue      # 浮动工具栏（路演模式 + 打印）
            │   └── LightBox.vue     # 全屏图片灯箱
            └── sections/          # 内容章节组件（路由懒加载）
                ├── SummarySection.vue      # 项目概述
                ├── BackgroundSection.vue   # 项目背景
                ├── TechnologySection.vue   # 产品与技术
                ├── ProcessSection.vue      # 技术路线与工艺
                ├── InnovationSection.vue   # 创新优势
                ├── BusinessSection.vue     # 商业模式
                ├── MarketSection.vue       # 市场策略
                ├── TeamSection.vue         # 团队介绍
                ├── FinanceSection.vue      # 财务分析（含 ECharts）
                ├── BenefitSection.vue      # 社会效益（含雷达图）
                └── PlanSection.vue         # 发展规划（时间线）
```

---

## 环境配置

### 前置要求

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### 安装与运行

```bash
# 1. 进入项目目录
cd vue3-app

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认 http://localhost:3000）
npm run dev

# 4. 生产构建
npm run build

# 5. 预览生产构建
npm run preview
```

### Vite 配置说明

[`vite.config.js`](file:///d:/user/greenTechnology/vue3-app/vite.config.js) 核心配置：

```js
export default defineConfig({
  plugins: [vue()],
  server: { port: 3000, host: true },   // 开发服务器端口 3000，监听所有网络接口
  build: { outDir: 'dist' }              // 构建输出到 dist/
})
```

---

## 路由架构

使用 **Hash 路由**（`createWebHashHistory`），确保静态部署时路径正确。根路径 `/` 自动重定向到 `/summary`。

| 路径 | 组件 | 章节编号 | 说明 |
|------|------|----------|------|
| `/` | — | — | 重定向到 `/summary` |
| `/summary` | SummarySection | Chapter 01 | 项目概述（核心亮点卡片） |
| `/background` | BackgroundSection | Chapter 02 | 项目背景（行业数据 + 痛点 + 政策） |
| `/technology` | TechnologySection | Chapter 03 | 产品与技术（特性卡片 + 参数表格） |
| `/process` | ProcessSection | Chapter 04 | 技术路线（流程 + 专利 + 证书 + 应用证明） |
| `/innovation` | InnovationSection | Chapter 05 | 创新优势（亮点 + 对比表 + 论文折叠面板） |
| `/business` | BusinessSection | Chapter 06 | 商业模式（三位一体 + 目标客户） |
| `/market` | MarketSection | Chapter 07 | 市场策略（三阶段 + 推广渠道） |
| `/team` | TeamSection | Chapter 08 | 团队介绍（导师 + 核心成员） |
| `/finance` | FinanceSection | Chapter 09 | 财务分析（5 张 ECharts 图表） |
| `/benefit` | BenefitSection | Chapter 10 | 社会效益（环境指标 + 雷达图 + SDGs） |
| `/plan` | PlanSection | Chapter 11 | 发展规划（四阶段时间线） |

**路由特性：**
- 所有路由组件使用 `() => import(...)` 动态懒加载
- `scrollBehavior` 确保路由切换后滚动到顶部
- 路由切换时：进度条动画 → fade 过渡 → 重新初始化滚动揭示动效

---

## 功能模块

### 根组件 [`App.vue`](file:///d:/user/greenTechnology/vue3-app/src/App.vue)

整个应用的结构骨架，包含：

```
┌─────────────────────────────┐
│  route-loading-bar          │  ← 路由切换进度条（3px 渐变条）
├─────────────────────────────┤
│  SiteHeader (fixed)         │  ← 固定顶部导航（logo + 11 个导航项）
├─────────────────────────────┤
│  HeroBanner                 │  ← 3 张轮播 Banner（5s 自动切换）
├─────────────────────────────┤
│  hero-stats                 │  ← 4 个关键数据指标卡片
├─────────────────────────────┤
│  <router-view> + transition │  ← 当前路由内容（fade 过渡）
├─────────────────────────────┤
│  SiteFooter                 │  ← 页脚（联系方式 + 相关链接）
├─────────────────────────────┤
│  LightBox                   │  ← 全局图片灯箱（z-index: 9999）
├─────────────────────────────┤
│  .back-to-top               │  ← 返回顶部按钮（滚动 > 500px 显示）
├─────────────────────────────┤
│  ToolBar (fixed)            │  ← 路演模式 + 打印按钮
└─────────────────────────────┘
```

### 布局组件

#### HeroBanner — 主视觉轮播

- **3 张轮播**，每 5 秒自动切换
- **三色 CSS 渐变方案**：蓝色系（工业科技）→ 青绿系（科研创新）→ 金绿系（技术路线）
- 每张背景含独特几何装饰元素（光球、光环、六边形网格、SVG 波形、菱形等）
- 装饰元素带持续动画（浮动、旋转、脉冲）
- 支持鼠标悬停暂停、触摸滑动、圆点导航

#### SiteHeader — 固定导航栏

- 固定在页面顶部（`z-index: 1000`，`position: fixed`）
- 11 个导航项从 `MOCK.nav` 数据驱动生成
- 移动端汉堡菜单（`< 768px` 自动切换）
- 导航项含激活指示器（底部滑动条动画）

#### ToolBar — 浮动工具栏

- **路演模式**：全屏 API（`requestFullscreen`），兼容 Webkit/MS 前缀
- **打印**：调用 `window.print()`，支持专门打印样式
- 固定在左下角（`z-index: 999`）

#### LightBox — 全局灯箱

- 点击带有 `data-lightbox` 属性的图片触发全屏查看
- `provide/inject` 模式管理全局状态
- 支持 ESC 关闭、点击遮罩关闭

### 章节组件

所有章节组件遵循统一模板：

```vue
<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()
</script>

<template>
  <section class="section" id="xxx">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter XX</span>
        <h2 class="section-title">标题</h2>
        <div class="divider"></div>
      </div>
      <!-- 内容区域，使用 data-reveal / data-reveal-stagger 动效 -->
    </div>
  </section>
</template>
```

#### 各章节功能详情

| 章节 | 数据展示方式 | 交互特性 |
|------|-------------|----------|
| **项目概述** | 4 列特性卡片 | `data-reveal-stagger` 序贯入场 |
| **项目背景** | 数据条 + 痛点卡片 + 政策列表 | 趋势标签（↑ 持续增长） |
| **产品与技术** | 4 列特性卡片 + 技术参数表格 | 图标映射（吸附剂/脱除/循环/干法） |
| **技术路线** | 5 步流程 + 工艺流程图 + 专利/证书/证明图片网格 | 灯箱查看、图片加载失败兜底 |
| **创新优势** | 4 列亮点 + 8 行对比表 + 论文折叠面板 | 折叠面板（点击展开/收起） |
| **商业模式** | 3 列业务卡片 + 4 列客户卡片 | 收入标签高亮 |
| **市场策略** | 3 阶段阶段卡片 + 4 列渠道 | 阶段标签 |
| **团队介绍** | 2 列导师 + 3 列成员（头像取首字） | 成员信息卡片 |
| **财务分析** | 4 个指标卡片 + 5 张 ECharts 图表 | 图表类型：柱状图、环形图、雷达图、玫瑰图 |
| **社会效益** | 4 个环境指标 + 雷达对比图 + 5 SDGs 卡片 | 雷达图（本项目 vs 传统工艺） |
| **发展规划** | 4 阶段时间线 | 时间线节点脉冲动画 |

---

## Composables 说明

### `useData()`

**职责：** 提供全部模拟数据，是整个应用的数据层。

返回 `{ MOCK }` 对象，包含 15 个顶级模块：

| 字段 | 说明 |
|------|------|
| `config` | 项目元信息（名称、团队、学校） |
| `nav` | 11 个导航项定义 |
| `summary` | 项目概述数据 |
| `background` | 行业数据 + 痛点 + 政策 |
| `technology` | 技术特性 + 参数表格 |
| `process` | 流程步骤 + 专利/证书/证明详情 |
| `innovation` | 创新亮点 + 对比表 + 论文列表 |
| `business` | 商业模式 + 目标客户 |
| `market` | 阶段策略 + 推广渠道 |
| `team` | 导师 + 核心成员 |
| `finance` | 财务预测 + 收入/成本构成 + 融资用途 |
| `benefit` | 环境效益 + SDGs 目标 |
| `plan` | 四阶段发展时间线 |
| `banners` | 3 张轮播图文案数据 |
| `footer` | 页脚联系方式 + 链接 |

### `useCarousel(bannerSelector)`

**职责：** 控制 Hero Banner 的轮播行为。

- **自动播放**：每 5 秒切换到下一张
- **手动控制**：前进/后退按钮 + 圆点指示器
- **触摸支持**：左右滑动切换（阈值 40px）
- **悬停暂停**：`mouseenter` 暂停，`mouseleave` 恢复
- **生命周期管理**：`onUnmounted` 自动清理定时器和事件

### `useScrollReveal()` + `useCountUp()`

**职责：** 页面滚动入场动效系统。

- **`useScrollReveal`**：使用 `IntersectionObserver` 监测 `[data-reveal]` 元素，进入视口时添加 `reveal-visible` 类触发 CSS 过渡
  - `data-reveal="up"` — 向上滑入
  - `data-reveal="left"` — 从左滑入
  - `data-reveal="right"` — 从右滑入
  - `data-reveal="scale"` — 缩放弹入
  - `data-reveal-stagger` — 序贯子元素（各延迟 100ms）
- **`useCountUp`**：对 `[data-count-up]` 元素做 `easeOutExpo` 数字滚动计数（1600ms）
- **安全兜底**：500ms 后仍未揭示的元素自动显示

### `useCharts()`

**职责：** ECharts 图表系统封装。

提供 6 个图表渲染函数，均支持自动 `resize` 和 `dispose` 清理：

| 函数 | 图表 ID | 图表类型 | 数据来源 |
|------|---------|----------|----------|
| `renderFinance()` | `chart-finance` | 柱状图 + 折线图 | `MOCK.finance.revenueForecast` |
| `renderRevenuePie()` | `chart-revenue-pie` | 环形图 | `MOCK.finance.revenueBreakdown` |
| `renderCostPie()` | `chart-cost-pie` | 环形图 | `MOCK.finance.costBreakdown` |
| `renderMarketTrend()` | `chart-market-trend` | 柱状图 + 折线（双 Y 轴） | `MOCK.finance.revenueForecast` |
| `renderFundingPie()` | `chart-funding-pie` | 玫瑰图 | `MOCK.finance.funding.usage` |
| `renderEnvRadar()` | `chart-env-radar` | 雷达图 | `MOCK.benefit.environmentalData` |

### `useBackToTop()`

**职责：** 管理返回顶部按钮的显示与点击行为。

- 滚动 > 500px 时显示（`class="visible"`）
- 点击触发 `scrollTo({ top: 0, behavior: 'smooth' })`
- 带 150ms 防抖优化

### `useLightbox()`

**职责：** 全局图片灯箱状态管理。

- **`useLightboxProvide()`**：在 `LightBox.vue` 中 provide 全局状态
- **`useLightboxInject()`**：供其他组件 inject 使用（预留接口）
- 打开时锁定 `body` 滚动（`overflow: hidden`）
- 关闭后延迟 300ms 清空图片地址（等待 CSS 过渡完成）

---

## 设计系统

所有设计令牌定义在 [`global.css`](file:///d:/user/greenTechnology/vue3-app/src/styles/global.css) 的 `:root` 中：

### 配色方案

```
深林绿（primary）    #1A5C3E    — 稳重专业，主色调
海洋蓝（accent）     #0D8C99    — 互补层次，强调色
暖金色（warm）       #C4823D    — CTA 悬停等高光
薄荷白（accent-pale） #EDFAF7   — 浅色底纹
```

### 备选主题

通过 `[data-theme="emerald"]` 一键切换为深翠色方案。

### CSS 变量概览

| 类别 | 变量 | 说明 |
|------|------|------|
| 颜色 | `--primary`, `--primary-dark`, `--primary-light` | 主色系 |
| 颜色 | `--accent`, `--accent-dark`, `--accent-light`, `--accent-pale` | 强调色系 |
| 颜色 | `--warm`, `--warm-light` | 暖色点缀 |
| 背景 | `--bg`, `--bg-alt`, `--bg-card` | 页面背景层次 |
| 文字 | `--text`, `--text-secondary`, `--text-muted` | 文字层级 |
| 边框 | `--border` | 边框颜色 |
| 阴影 | `--shadow`, `--shadow-lg` | 卡片阴影 |
| 圆角 | `--radius` (16px), `--radius-sm` (12px) | 圆角规格 |
| 布局 | `--header-h` (70px), `--max-width` (1280px) | 布局参数 |
| 字体 | `--font-cn`, `--font-en` | 中英文字体栈 |
| 动效 | `--transition` | 统一过渡函数 |

### Z-Index 层级体系

| 层级 | 用途 |
|------|------|
| `auto` | 普通文档流内容 |
| `1 ~ 3` | Banner 轮播元素 |
| `10` | hero-stats 数据条 |
| `999` | 浮动工具栏 + 返回顶部 |
| `1000` | 固定导航栏 |
| `1001` | 路由加载进度条 |
| `9999` | 全屏灯箱 |

---

## 动效系统

所有动效通过 CSS 实现，零 JavaScript 动画库依赖。

| 动效 | 触发方式 | 实现 |
|------|----------|------|
| 滚动揭示 | `IntersectionObserver` + `data-reveal` 属性 | CSS transition + `reveal-visible` |
| 数字计数 | `IntersectionObserver` + `data-count-up` | `requestAnimationFrame` + easeOutExpo |
| Banner 内容入场 | 轮播切换到 active | `@keyframes bannerContentIn` (0.8s) |
| Hero Stats 入场 | 页面加载 | `@keyframes statPopIn` + 序贯延迟 |
| 卡片悬浮 | `:hover` | `translateY(-6px)` + 阴影提升 |
| 3D 卡片光晕 | `:hover` + `mousemove` | `radial-gradient` 跟踪鼠标位置 |
| 导航指示器 | `:hover` / `.router-link-active` | `::after` 伪元素滑动条 |
| 按钮波纹 | `:active` | `::after` 圆形扩散 |
| Banner 圆形浮动 | 持续 | `@keyframes floatCircle` |
| Banner 光球脉冲 | 持续 | `@keyframes orbPulse` |
| Banner 光环旋转 | 持续 | `@keyframes spinSlow` (25s 一圈) |
| 时间线节点脉冲 | 持续 | `@keyframes timelinePulse` |
| 分割线闪光 | 持续 | `@keyframes dividerShimmer` |
| 背景漂浮粒子 | 持续 | `@keyframes particleFloat` |

**无障碍：** 所有动效在 `prefers-reduced-motion: reduce` 下自动禁用。

---

## 构建与部署

### 开发模式

```bash
npm run dev
# → http://localhost:3000
# 支持 HMR（热模块替换），修改代码后无需手动刷新
```

### 生产构建

```bash
npm run build
# 输出到 dist/ 目录
# 包含代码分割、CSS 提取、资源哈希化
```

构建产物的 chunk 分割策略：

| Chunk | 内容 | 大小 |
|-------|------|------|
| `index-*.js` | Vue 运行时 + 应用主逻辑 | ~120 KB |
| `useCharts-*.js` | ECharts 图表库 | ~1040 KB |
| `index-*.css` | 全局样式 + scoped 样式 | ~38 KB |
| 各 Section chunks | 懒加载的页面组件 | 1-5 KB each |

### 预览构建

```bash
npm run preview
# 本地预览生产构建效果
```

### 部署到 GitHub Pages

```bash
# 确保 vite.config.js 中 base 配置正确（如需要）
npm run build
# 将 dist/ 目录内容部署到 GitHub Pages
```

---

## 开发规范

### 组件命名

- **布局组件**：`PascalCase`，如 `SiteHeader.vue`、`HeroBanner.vue`
- **章节组件**：`PascalCase`，如 `SummarySection.vue`、`FinanceSection.vue`
- **Composables**：`camelCase`，以 `use` 前缀，如 `useData.js`、`useCarousel.js`

### 数据流向

```
useData.js (Mock 数据)
    ↓
Section.vue (通过 useData() 获取)
    ↓
Template (v-for / v-if / {{ }} 渲染)
```

- 数据源统一在 `useData.js` 中管理
- 组件不直接修改数据，仅做展示
- 需要添加新页面时：创建 `*Section.vue` → 在 `router/index.js` 添加路由 → 在 `useData.js` 添加数据 → 在 `MOCK.nav` 添加导航项

### CSS 规范

- 全局样式在 `global.css` 中，按功能分段（Z-Index / 设计令牌 / 动效 / 组件 / 响应式 / 打印）
- 组件级样式使用 Vue `<style scoped>`，如 HeroBanner 的背景渐变和动画
- 优先使用 CSS 变量（`var(--xxx)`）而非硬编码颜色
- 响应式断点：`1024px`（平板）、`768px`（手机）

### 添加新章节步骤

1. 创建 `src/components/sections/NewSection.vue`
2. 在 `src/router/index.js` 的 `routes` 数组中添加路由
3. 在 `src/composables/useData.js` 中添加对应的 `MOCK.newSection` 数据
4. 在 `MOCK.nav` 数组中添加导航项
5. 在 `App.vue` 中无需修改（`<router-view>` 自动处理）

### 图片资源管理

- 所有图片放在 `public/images/` 下
- 在数据中引用路径：`./images/xxx.jpg`（相对于 `public/`）
- 大图或非核心图使用 `data-lightbox` 属性实现点击放大
- Section 组件中应提供图片加载失败的兜底处理

---

## 常见问题

### Q: 开发服务器启动后端口被占用？

```bash
# 修改 vite.config.js 中的 server.port 配置
# 或杀死占用进程后重启
```

### Q: 图片无法显示？

确保图片文件在 `public/images/` 目录下，引用路径以 `./images/` 开头。部分章节组件（如 ProcessSection）有图片加载失败兜底逻辑。

### Q: 轮播图不切换？

检查 `HeroBanner.vue` 中 `useCarousel('.hero-banner')` 的初始化。确保页面中存在 `.hero-banner` 元素且包含至少 2 个 `.banner-slide`。

### Q: ECharts 图表不渲染？

检查 `useCharts()` 是否在 `onMounted` 中调用，且 DOM 容器 ID 与 `render*` 函数的参数一致。FinanceSection 和 BenefitSection 需要在组件挂载后才调用图表初始化。

### Q: 构建后页面空白？

本项目使用 **Hash 路由**（URL 中带 `#`），无需服务端配置。如果切换到 History 模式，需配置服务端 fallback。

### Q: 如何更换轮播背景图？

编辑 `HeroBanner.vue` 中 scoped 样式部分的 `.banner-bg-1`、`.banner-bg-2`、`.banner-bg-3` 的 `background` 属性。如需使用真实图片，将背景图放入 `public/images/banner/` 并通过 `background-image: url(...)` 引用。

---

## 项目元信息

| 字段 | 值 |
|------|------|
| 项目名称 | clean-energy-vue3 |
| 版本 | 1.0.0 |
| 许可证 | 私有 |
| 构建工具 | Vite 5.4 |
| 最低 Node.js | 18.x |
| 仓库地址 | https://github.com/zerphy799/greenTechnology |
