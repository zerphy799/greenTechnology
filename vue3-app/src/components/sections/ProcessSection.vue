<script setup>
import { useData } from '../../composables/useData'
const { MOCK } = useData()

function onPatentImgError(e) {
  e.target.outerHTML = '<div style="height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-radius:12px;font-size:3rem">&#128220;</div>'
}
function onCertImgError(e) {
  e.target.outerHTML = '<div style="height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-radius:12px;font-size:3rem">&#127942;</div>'
}
function onProofImgError(e) {
  e.target.outerHTML = '<div style="height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-radius:12px;font-size:3rem">&#128196;</div>'
}
function onEvalImgError(e) {
  e.target.outerHTML = '<div style="height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-radius:12px;font-size:3rem">&#128218;</div>'
}
</script>

<template>
  <section class="section" id="process">
    <div class="container">
      <div class="section-header" data-reveal="up">
        <span class="section-label">Chapter 04</span>
        <h2 class="section-title">技术路线与工艺</h2>
        <div class="divider"></div>
      </div>
      <p class="section-desc" data-reveal="up">{{ MOCK.process.intro }}</p>
      <div class="process-steps" data-reveal>
        <div v-for="s in MOCK.process.processSteps" :key="s.step" class="process-step" data-reveal-stagger>
          <div class="step-num">{{ s.step }}</div>
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
        </div>
      </div>
      <div class="image-showcase">
        <img
          :src="MOCK.process.processImage.src"
          :alt="MOCK.process.processImage.alt"
          :data-lightbox="MOCK.process.processImage.src"
          :data-alt="MOCK.process.processImage.alt"
          @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'"
        />
        <div class="image-caption">{{ MOCK.process.processImage.caption }}</div>
        <div style="display:none;padding:40px;background:var(--bg-alt);border-radius:var(--radius);text-align:center;color:var(--text-muted)">
          工艺流程图（图片路径：./images/process_flow.jpg）
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">核心专利</h3>
      <div class="cert-grid" data-reveal>
        <div
          v-for="p in MOCK.process.patents"
          :key="p.id"
          class="cert-card"
          data-reveal-stagger
          :data-lightbox="p.src"
          :data-alt="p.title"
        >
          <img :src="p.src" :alt="p.title" @error="onPatentImgError" />
          <div class="cert-info">
            <div class="cert-title">{{ p.title }}</div>
            <div class="cert-num">{{ p.number }}</div>
          </div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">获奖证书</h3>
      <div class="cert-grid" data-reveal>
        <div
          v-for="c in MOCK.process.certificates"
          :key="c.id"
          class="cert-card"
          data-reveal-stagger
          :data-lightbox="c.src"
          :data-alt="c.title"
        >
          <img :src="c.src" :alt="c.title" @error="onCertImgError" />
          <div class="cert-info">
            <div class="cert-title">{{ c.title }}</div>
          </div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">应用证明</h3>
      <div class="cert-grid" data-reveal>
        <div
          v-for="p in MOCK.process.proofs"
          :key="p.id"
          class="cert-card"
          data-reveal-stagger
          :data-lightbox="p.src"
          :data-alt="p.title"
        >
          <img :src="p.src" :alt="p.title" @error="onProofImgError" />
          <div class="cert-info">
            <div class="cert-title">{{ p.title }}</div>
          </div>
        </div>
      </div>
      <h3 style="text-align:center;margin:48px 0 24px;color:var(--primary-dark);font-size:1.3rem">科学技术成果鉴定</h3>
      <div class="cert-grid" data-reveal>
        <div
          v-for="e in MOCK.process.evaluations"
          :key="e.id"
          class="cert-card"
          data-reveal-stagger
          :data-lightbox="e.src"
          :data-alt="e.title"
        >
          <img :src="e.src" :alt="e.title" @error="onEvalImgError" />
          <div class="cert-info">
            <div class="cert-title">{{ e.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
