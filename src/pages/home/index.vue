<template>
<div class="page" ref="page">
<Head></Head>
<Search-bar></Search-bar>
<home-swiper :swiperList="swiperList"></home-swiper>
<home-nav :navList="navList"></home-nav>
<recommend :recList="recList"></recommend>
<sales :saleList="saleList"></sales>
<new-goods :newList="newList"></new-goods>
<!-- 
  infinite-scroll-disabled:是否禁用infinite-scroll true 禁用 false 不禁用
 -->
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" :infinite-scroll-distance="scrollDistance">
  <Goods-list :list="list"></Goods-list>
</div>
<com-footer></com-footer>
<loading :show="showLoading"></loading>
</div>
</template>

<script>
// import Head from "../../components/head"
// 引用无限滚动
import infiniteScroll from 'vue-infinite-scroll'
import Head from "@/components/head"
import comFooter from "@/components/footer";
import loading from "@/components/loading";
import SearchBar from "@/components/searchBAr"
import homeSwiper from "./swiper"
import homeNav from "./IconNav"
import recommend from "./Recommend"
import sales from "./sales"
import newGoods from "./NewGoods"
import GoodsList from "./GoodsList"
import { Storage } from "@/utils/storage";
export default {
  // 调用无限滚动
  directives: {infiniteScroll},
  components:{
    Head,
    comFooter,
    loading,
    SearchBar,
    homeSwiper,
    homeNav,
    recommend,
    sales,
    newGoods,
    GoodsList,
  },
  data(){
    return{
      swiperList:[],
      navList:[],
      recList:[],
      saleList:[],
      newList:[], 
      list:[] ,
      page:1, //为你推荐的页码
      count:8,//每次获取的个数的个数
      totalPage:0,//总页码
      scrollDistance:0,
      showLoading:false,
    }
  },
  async mounted(){
    const footerHeight= document.querySelector(".footer-container").offsetHeight;
    this.$refs.page.style.paddingBottom=footerHeight+'px';
    this.scrollDistance=footerHeight;
    this.showLoading=true;
    await this.getSwiper()
    await this.getNav()
    await this.getRec()
    await this.getSale()
    await this.getNew()
    this.showLoading=false;
  },
  methods:{
    async getSwiper(){
      // 问号的也可以用params,写成对象 /api/swiper?type=1
      // this.axios.get('/api/swiper',{
      //  params:{
      //    type:1
      //    }
      const swiper=Storage.getItem('swiper');
      if(swiper){
        this.swiperList=swiper;
      }else{
        const res=await this.axios.get('api/swiper?type=1');
        const swiperList= res.map(item=>item.img)
        this.swiperList=swiperList;
        Storage.setItem('swiper',swiperList);
      }

    },
    async getNav(){
      const nav=Storage.getItem('nav');
      if(nav){
        this.navList=nav;
      }else{
        const navList=await this.axios.get('api/navigate?type=1');
        this.navList=navList;
        Storage.setItem('nav',navList);
      }
    },
    async getRec(){
      this.recList=await this.axios.get('api/goods/recommend?type=1');
    },
    async getSale(){
      this.saleList=await this.axios.get('api/goods/sales?type=1');
    },
    async getNew(){
      this.newList=await this.axios.get('api/goods/new?type=1');
    },
    async getList(){
      const {goods,total}=await this.axios.get('api/goods_list?type=1',{
        params:{
          page:this.page,
          count:this.count,
        }
      });
      this.list=this.list.concat(goods);
      if(this.page===1){
        this.totalPage=Math.ceil(total/this.count);
      }
      this.page++;
    },
    async loadMore(){
      this.busy=true;
      if(this.page<=this.totalPage||this.totalPage===0){
        await this.getList();
        this.busy=false;
      }
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
  padding-top:$head-h+$search-h ;
}
</style>


