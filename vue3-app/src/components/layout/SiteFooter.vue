<script setup>
import { useData } from '../../composables/useData'

const { MOCK } = useData()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>洁净所能</h4>
        <p>钙基危废烟气一体化脱除技术<br>以废治废 · 洁净所能 · 守护蓝天</p>
      </div>
      <div class="footer-col">
        <h4>联系方式</h4>
        <p>邮箱：{{ MOCK.footer.contact.email }}<br>电话：{{ MOCK.footer.contact.phone }}<br>地址：{{ MOCK.footer.contact.address }}</p>
      </div>
      <div class="footer-col">
        <h4>相关链接</h4>
        <a v-for="link in MOCK.footer.links" :key="link.label" :href="link.url">{{ link.label }}</a><br>
      </div>
    </div>
    <div class="footer-bottom">{{ MOCK.footer.copyright }}</div>
  </footer>
</template>
