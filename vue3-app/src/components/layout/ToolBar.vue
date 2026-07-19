<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isFullscreen = ref(false)

function updateFullscreenState() {
  isFullscreen.value = !!document.fullscreenElement
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    var el = document.documentElement
    if (el.requestFullscreen) { el.requestFullscreen() }
    else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen() }
    else if (el.msRequestFullscreen) { el.msRequestFullscreen() }
  }
}

function print() {
  window.print()
}

onMounted(function () {
  document.addEventListener('fullscreenchange', updateFullscreenState)
  document.addEventListener('webkitfullscreenchange', updateFullscreenState)
})

onUnmounted(function () {
  document.removeEventListener('fullscreenchange', updateFullscreenState)
  document.removeEventListener('webkitfullscreenchange', updateFullscreenState)
})
</script>

<template>
  <div class="toolbar">
    <button class="tool-btn btn-fullscreen" aria-label="全屏路演模式" title="全屏路演模式" @click="toggleFullscreen">
      &#9974;<span class="fullscreen-label">{{ isFullscreen ? '退出路演' : '路演模式' }}</span>
    </button>
    <button class="tool-btn btn-print" aria-label="打印" title="打印页面" @click="print">&#9113;</button>
  </div>
</template>
