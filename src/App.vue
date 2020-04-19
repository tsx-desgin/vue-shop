<template>
  <div id="app">

    <router-view />
  </div>
</template>
<script>
// 统一单位 rem 自适应
document.addEventListener('DOMContentLoaded',()=>{
  const html=document.querySelector('html');
  const fontSize=window.innerWidth/7.5;
  html.style.fontSize=fontSize+'px';
})
</script>
<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/border.scss";
@import "./assets/scss/icon.scss";
</style>>

