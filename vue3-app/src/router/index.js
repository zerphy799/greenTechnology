import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { label: '实时监控大屏' } },
  { path: '/analytics', name: 'analytics', component: () => import('../views/AnalyticsView.vue'), meta: { label: '运行报表分析' } },
  { path: '/history', name: 'history', component: () => import('../views/HistoryView.vue'), meta: { label: '历史数据查询' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
