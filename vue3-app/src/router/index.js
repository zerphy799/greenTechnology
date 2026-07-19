import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/summary' },
  { path: '/summary', name: 'summary', component: () => import('../components/sections/SummarySection.vue') },
  { path: '/background', name: 'background', component: () => import('../components/sections/BackgroundSection.vue') },
  { path: '/technology', name: 'technology', component: () => import('../components/sections/TechnologySection.vue') },
  { path: '/process', name: 'process', component: () => import('../components/sections/ProcessSection.vue') },
  { path: '/innovation', name: 'innovation', component: () => import('../components/sections/InnovationSection.vue') },
  { path: '/business', name: 'business', component: () => import('../components/sections/BusinessSection.vue') },
  { path: '/market', name: 'market', component: () => import('../components/sections/MarketSection.vue') },
  { path: '/team', name: 'team', component: () => import('../components/sections/TeamSection.vue') },
  { path: '/finance', name: 'finance', component: () => import('../components/sections/FinanceSection.vue') },
  { path: '/benefit', name: 'benefit', component: () => import('../components/sections/BenefitSection.vue') },
  { path: '/plan', name: 'plan', component: () => import('../components/sections/PlanSection.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
