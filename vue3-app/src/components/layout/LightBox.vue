<script setup>
import { onMounted } from 'vue'
import { useLightboxProvide } from '../../composables/useLightbox'

const { isOpen, imageSrc, imageAlt, open, close } = useLightboxProvide()

onMounted(function () {
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]')
    if (!trigger) return
    var src = trigger.getAttribute('data-lightbox')
    var alt = trigger.getAttribute('data-alt') || ''
    open(src, alt)
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen.value) {
      close()
    }
  })
})
</script>

<template>
  <div class="lightbox-overlay" id="lightbox" :class="{ active: isOpen }" @click.self="close">
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="关闭" @click="close">&times;</button>
      <img class="lightbox-img" :src="imageSrc" :alt="imageAlt" />
      <p class="lightbox-caption">{{ imageAlt }}</p>
    </div>
  </div>
</template>
