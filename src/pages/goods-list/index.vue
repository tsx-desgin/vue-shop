<template>
<div class="page">
    <Head :title="cname||商品列表" :back="backUrl"></Head>
    <div class="sort-container border-bottom">
        <div class="sort-item" :class="{active:sortField==='goods_id'}" @click="sortGoodslist('goods_id')">
            综合
        </div>
        <div class="sort-item" :class="{active:sortField==='sale_num'}" @click="sortGoodslist('sale_num')">
            最热
        </div>
        <div class="sort-item" :class="{active:sortField==='is_new'}" @click="sortGoodslist('is_new')">
            新品
        </div>
        <div class="sort-item" :class="{active:sortField==='goods_price'}" @click="sortGoodslist('goods_price')">
            价格
            <span class="icon">&#xe630;</span>
        </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" :infinite-scroll-distance="scrollDistance">
    <list :list="list"></list>
    </div>
</div>
</template>
<script>
// 引用无限滚动
import infiniteScroll from 'vue-infinite-scroll'
import Head from "@/components/head"
import list from "./list"
export default {
    // 调用无限滚动
  directives: {infiniteScroll},
    components:{
        Head,
        list,
    },
    props:{
        cid:Number,
        cname:String,
    },
    mounted(){
        this.catId=this.cid
    },
    data(){
        return{
            backUrl:'',
            sortField:'goods_id',
            sortType:'',
            list:[] ,
            page:1, //为你推荐的页码
            count:8,//每次获取的个数的个数
            totalPage:0,//总页码
            busy:false,
            scrollDistance:0,
            pid:0,
            catId:0,
        }
    },
    methods:{
        sortGoodslist(goods_sortField){
            this.sortField=goods_sortField;
            this.resetData();
            this.getList();
        },
        resetData(){
            this.list=[];
            this.busy=false;
            this.totalPage=0;
            this.page=1;
            if(this.sortField!=='goods_price'){
                if(this.sortType==''){
                    this.sortType='asc'
                }
            }else{
                this.sortType=this.sortType==='asc'?'desc':'asc'
            }
        },
        async getCidByCname(){
            if(this.cname!==''&&this.cid===0){
                if(this.catId>0||this.pid>0){
                    return
                }
                const res = await this.axios.get('api/category/cid',{params:{name:this.cname}})
                if(res.parent){
                    this.pid=res.cat_id;
                }else{
                    this.cat_id=res.cat_id
                }
            }
        },
        async getList(){
        this.$showLoading()
        const {goods,total}=await this.axios.get('api/goods_list?type=1',{
            params:{
            page:this.page,
            count:this.count,
            cat_id:this.catId, //一级分类id
            sortField:this.sortField,
            pid:this.pid, //二级分类id
            sortType:this.sortType,
            }
        });
        this.$hideLoading()
        this.list=this.list.concat(goods);
        if(this.page===1){
            this.totalPage=Math.ceil(total/this.count);
        }
        this.page++;
        },
        async loadMore(){
        await this.getCidByCname()
        this.busy=true;
        if(this.page<=this.totalPage||this.totalPage===0){
            await this.getList();
            this.busy=false;
        }
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
.page{
    width: 100%;
    margin-top:$head-h+.8rem;
    .sort-container{
    width: 100%;
    position: fixed;
    top: $head-h;
    left: 0;
    height: .8rem;
    @include flex;
    background: #fff;
    z-index: 999;
    .sort-item{
        width: 25%;
        height: 100%;
        @include flex;
        font-size: .32rem;
        color: $color-d;
        &.active{
            color: $color-a;
        }
    }
}
}
</style>