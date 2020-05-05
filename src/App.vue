<template>
  <div id="app">

    <router-view />
  </div>
</template>
<script>
// 统一单位 rem 自适应
// document.addEventListener('DOMContentLoaded',()=>{
//   const html=document.querySelector('html');
//   const fontSize=window.innerWidth/7.5;
//   html.style.fontSize=fontSize+'px';
// })
(function(doc, win) {
var docEl = doc.documentElement,
resizeEvt = ' orientationchange' in window ? ' orientationchange' : ' resize',
recalc = function() {
var clientwidth = docEl.clientwidth;
if (!clientwidth) return;
docEl.style.fontsize = clientwidth / 7.5 + 'px';
};
if ( !doc.addEventlistener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener( ' DOMContentLoaded',recalc, false);
})(document, window);

</script>
<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/border.scss";
@import "./assets/scss/icon.scss";
</style>

