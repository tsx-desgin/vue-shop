<template>
<div>
    <Head title="分类" :back="backUrl" class="header"></Head>
    <search-bar class="search"></search-bar>
    <div class="content">
        <div class="content-left">
            <category :content="category"></category>
        </div>
        <div class="content-right">
            <sub-category :content="subCategory"></sub-category>
        </div>
    </div>
    <com-footer ref="footer" class="footer"></com-footer>
</div>
</template>
<script>
import Head from "@/components/head"
import comFooter from "@/components/footer";
import SearchBar from "@/components/searchBAr"
import category from "./category";
import subCategory from "./subCategory";
export default {
    components:{
        Head,
        SearchBar,
        comFooter,
        category,
        subCategory,
    },
    data(){
        return{
            backUrl:'',
            category:[],//一级分类
            subCategory:[],//子分类
            catId:0,
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
            const category=await this.axios.get('api/goods_category?type=1');
            if(category.length>0){
                this.getsubCategory(category[0].cat_id)
                this.category=category;
            }
        },
        // 获取子分类
        async getsubCategory(catId){
            this.subCategory=await this.axios.get('api/goods_category?type=1&cat_id='+catId);
        },
    },
    // 导航守卫
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path
        })//通过next()来渲染
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.content{
    width:100%;
    background: forestgreen;
    margin-top: $head-h+$search-h;
}
</style>