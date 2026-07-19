<script setup>
import { ref } from 'vue'
import { useData } from '../../composables/useData'

const { MOCK } = useData()
const mobileMenuOpen = ref(false)
const navMenu = ref(null)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <router-link to="/summary" class="header-logo">
        <span class="logo-icon">净</span>洁净所能
      </router-link>
      <nav class="nav-menu" id="navMenu" :class="{ active: mobileMenuOpen }" ref="navMenu">
        <router-link
          v-for="item in MOCK.nav"
          :key="item.id"
          :to="'/' + item.id"
          class="nav-link"
        >{{ item.label }}</router-link>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="菜单" @click="toggleMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>
