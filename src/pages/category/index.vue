<template>
<div>
    <Head title="分类" :back="backUrl" class="header"></Head>
    <search-bar class="search"></search-bar>
    <div class="content">
        <div class="content-left">
            <category :content="category" @change="loadSubCategory"></category>
        </div>
        <div class="content-right">
            <sub-category :content="subCategory"></sub-category>
        </div>
    </div>
    <com-footer ref="footer" class="footer"></com-footer>
    <loading :show="showLoading"></loading>
</div>
</template>
<script>
import Head from "@/components/head"
import comFooter from "@/components/footer";
import SearchBar from "@/components/searchBAr"
import loading from "@/components/loading";
import category from "./category";
import subCategory from "./subCategory";
export default {
    components:{
        Head,
        SearchBar,
        comFooter,
        category,
        subCategory,
        loading,
    },
    data(){
        return{
            backUrl:'',
            category:[],//一级分类
            subCategory:[],//子分类
            catId:0,
            showLoading:false,
        }
    },
    mounted(){
        this.getCategory()
        const wh=document.documentElement.offsetHeight;
        const head_h=document.querySelector('.header').offsetHeight;
        const search_h=document.querySelector('.search').offsetHeight;
        const footer_h=document.querySelector('.footer').offsetHeight;
        const contentCon_h=wh-head_h-search_h-footer_h+'px';
        document.querySelector('.content').style.height=contentCon_h;
    },
    methods:{
        // 获取一级分类
        async getCategory(){
            this.$showLoading()
            const category=await this.axios.get('api/goods_category?type=1');
            this.$hideLoading()
            if(category.length>0){
                this.getsubCategory(category[0].cat_id)
                this.category=category;
            }
        },
        // 获取子分类
        async getsubCategory(catId){
            this.$showLoading()
            this.subCategory=await this.axios.get('api/goods_category?type=1&cat_id='+catId);
            this.$hideLoading();
        },
        async loadSubCategory(catId){
             await this.getsubCategory(catId)
        }
    },
    // 导航守卫
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
        })//通过next()来渲染
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.content{
    width:100%;
    margin-top: $head-h+$search-h;
    @include flex;
    .content-left{
        width: 2rem;
        height: 100%;
        background: $color-c;
    }
    .content-right{
        width: 0;
        flex: 1;
        height: 100%;
    }
}
</style>