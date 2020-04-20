<template>
<div>
<Head></Head>
<Search-bar></Search-bar>
<home-swiper :swiperList="swiperList"></home-swiper>
</div>
</template>

<script>
// import Head from "../../components/head"
import Head from "@/components/head"
import SearchBar from "@/components/searchBAr"
import homeSwiper from "./swiper"
export default {
  components:{
    Head,
    SearchBar,
    homeSwiper,
  },
  data(){
    return{
      swiperList:[
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a4aa0cbfad7de34618c4bebdbdeee4e1.jpg?w=2452&h=920",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f401f49278099001dd8441c8f906d9ea.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
          "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ff21ffde85c613d276ccc11ad0d080a9.jpg?thumb=1&w=1226&h=460&f=webp&q=90"
      ]  
    }
  },
  mounted(){
    this.getSwiper()
  },
  methods:{
    getSwiper(){
     this.axios.get('/api/swiper').then(res=>{
       console.log(res)
     })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";

</style>


