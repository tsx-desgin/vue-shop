<template>
<div>
    <swiper  :options="swiperOptions" class="swiper-container" v-if="show">
      <!-- 加入：key -->
    <swiper-slide v-for="item of gallery" :key="item">
         <img :data-src="item" class="swiper-lazy swiper-img">
         <div class="swiper-lazy-preloader"></div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>
<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  props:{
    gallery:Array,
  },
  computed:{
    show(){
      return !!this.gallery.length;
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data(){
    return{
      swiperOptions:{
          pagination: {
            el: '.swiper-pagination',
            type:'fraction',
          },
          loop:true,
          lazy: {
          loadPrevNext: true,
        },
        },
      }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
// viewpoint width，视窗宽度，1vw=视窗宽度的1% vw
// 	viewpoint height，视窗高度，1vh=视窗高度的1% vh 不兼容
/*
   正方形
  .swiper-container{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    .swiper-img{
        width: 100%;
    }
*/ 
.swiper-container{
    width: 100%;
    height: 100vw;
    .swiper-img{
        width: 100%;
        height: 100%;
    }
    /deep/.swiper-pagination-fraction{
        width: .75rem;
        height: .4rem;
        z-index: 999;
        position: absolute;
        bottom: .2rem;
        left: 85%;
        background-color: rgba(100,100,100,.6);
        border-radius: .2rem;
        @include flex();
        color: #fff;
        box-sizing: border-box;
        font-size:.24rem;
    }
}
</style>