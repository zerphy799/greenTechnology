import { ref, onUnmounted } from 'vue'

export function useCarousel(bannerSelector) {
  let bannerEl = null
  let slides = []
  let dots = []
  let prevBtn = null
  let nextBtn = null
  let total = 0
  const INTERVAL = 5000
  let timer = null
  let touchStartX = 0

  const currentSlide = ref(0)

  function goTo(idx) {
    slides.forEach(function (s) { s.classList.remove('active') })
    dots.forEach(function (d) { d.classList.remove('active') })
    currentSlide.value = ((idx % total) + total) % total
    slides[currentSlide.value].classList.add('active')
    if (dots[currentSlide.value]) dots[currentSlide.value].classList.add('active')
  }

  function next() { goTo(currentSlide.value + 1) }
  function prev() { goTo(currentSlide.value - 1) }

  function startAuto() {
    stopAuto()
    timer = setInterval(next, INTERVAL)
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function init() {
    bannerEl = typeof bannerSelector === 'string'
      ? document.querySelector(bannerSelector)
      : bannerSelector

    if (!bannerEl) return

    slides = bannerEl.querySelectorAll('.banner-slide')
    if (slides.length < 2) return
    dots = bannerEl.querySelectorAll('.banner-dot')
    prevBtn = bannerEl.querySelector('.banner-prev')
    nextBtn = bannerEl.querySelector('.banner-next')
    total = slides.length

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto() })
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto() })

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startAuto() })
    })

    bannerEl.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX
      stopAuto()
    })
    bannerEl.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX
      if (Math.abs(dx) > 40) { dx > 0 ? prev() : next() }
      startAuto()
    })

    goTo(0)
    startAuto()
    bannerEl.addEventListener('mouseenter', stopAuto)
    bannerEl.addEventListener('mouseleave', startAuto)
  }

  function destroy() {
    stopAuto()
    if (bannerEl) {
      bannerEl.removeEventListener('mouseenter', stopAuto)
      bannerEl.removeEventListener('mouseleave', startAuto)
    }
  }

  onUnmounted(() => destroy())

  return { currentSlide, goTo, next, prev, startAuto, stopAuto, init }
}
