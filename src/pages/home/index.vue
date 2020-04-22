<template>
<div class="page">
<Head></Head>
<Search-bar></Search-bar>
<home-swiper :swiperList="swiperList"></home-swiper>
<home-nav :navList="navList"></home-nav>
<recommend :recList="recList"></recommend>
<sales :saleList="saleList"></sales>
<new-goods></new-goods>
</div>
</template>

<script>
// import Head from "../../components/head"
import Head from "@/components/head"
import SearchBar from "@/components/searchBAr"
import homeSwiper from "./swiper"
import homeNav from "./IconNav"
import recommend from "./Recommend"
import sales from "./sales"
import newGoods from "./NewGoods"
export default {
  components:{
    Head,
    SearchBar,
    homeSwiper,
    homeNav,
    recommend,
    sales,
    newGoods,
  },
  data(){
    return{
      swiperList:[],
      navList:[],
      recList:[],
      saleList:[],  
    }
  },
  mounted(){
    this.getSwiper()
    this.getNav()
    this.getRec()
    this.getSale()
  },
  methods:{
    async getSwiper(){
      // 问号的也可以用params,写成对象 /api/swiper?type=1
      // this.axios.get('/api/swiper',{
      //  params:{
      //    type:1
      //    }
      const res=await this.axios.get('api/swiper?type=1');
      const swiperList= res.map(item=>item.img)
      this.swiperList=swiperList
    },
    async getNav(){
      this.navList=await this.axios.get('api/navigate?type=1');
    },
    async getRec(){
      this.recList=await this.axios.get('api/goods/recommend?type=1');
    },
    async getSale(){
      this.saleList=await this.axios.get('api/goods/sales?type=1');
      
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  background: $color-c;
}
</style>


