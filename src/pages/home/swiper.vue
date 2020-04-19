<template>
  <swiper  :options="swiperOptions" class="swiper-container">
      <!-- 加入：key -->
    <swiper-slide v-for="item of swiperList" :key="item">
        <img :src="item" alt="" class="swiper-img">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    components: {
    Swiper,
    SwiperSlide
  },
  data(){
    return{
      swiperOptions:{
          pagination: {
            el: '.swiper-pagination'
          },
          loop:true,
        },
      swiperList:[
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a4aa0cbfad7de34618c4bebdbdeee4e1.jpg?w=2452&h=920",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f401f49278099001dd8441c8f906d9ea.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ff21ffde85c613d276ccc11ad0d080a9.jpg?thumb=1&w=1226&h=460&f=webp&q=90"
      ]  
      }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swiper-container{
    width: 100%;
    height: 3rem;
    margin-top: -1px;
    .swiper-img{
        width: 100%;
        height: 100%;
    }
    /deep/.swiper-pagination-bullet-active{
        background: #fff;
    }
}
</style>
