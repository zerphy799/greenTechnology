import { ref, provide, inject } from 'vue'

export function useLightboxProvide() {
  const isOpen = ref(false)
  const imageSrc = ref('')
  const imageAlt = ref('')

  function open(src, alt) {
    imageSrc.value = src
    imageAlt.value = alt || ''
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    document.body.style.overflow = ''
    setTimeout(function () {
      imageSrc.value = ''
      imageAlt.value = ''
    }, 300)
  }

  provide('lightbox', { isOpen, imageSrc, imageAlt, open, close })

  return { isOpen, imageSrc, imageAlt, open, close }
}

export function useLightboxInject() {
  return inject('lightbox')
}
