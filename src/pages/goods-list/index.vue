<template>
<div class="page">
    <Head :title="cname||商品列表" :back="backUrl"></Head>
    <div class="sort-container border-bottom">
        <div class="sort-item" :class="{active:sortField==='goods_id'}" @click="sortField='goods_id'">
            综合
        </div>
        <div class="sort-item" :class="{active:sortField==='sale_num'}" @click="sortField='sale_num'">
            最热
        </div>
        <div class="sort-item" :class="{active:sortField==='is_new'}" @click="sortField='is_new'">
            新品
        </div>
        <div class="sort-item" :class="{active:sortField==='goods_price'}" @click="sortField='goods_price'">
            价格
            <span class="icon">&#xe630;</span>
        </div>
    </div>
    <list :list="list"></list>
</div>
</template>
<script>
import Head from "@/components/head"
import list from "./list"
export default {
    components:{
        Head,
        list,
    },
    props:{
        cid:Number,
        cname:String,
    },
    mounted(){
        this.getList();
    },
    watch:{
        sortField(){
            this.resetData();
            this.getList();
        }
    },
    data(){
        return{
            backUrl:'',
            sortField:'goods_id',
            list:[] ,
            page:1, //为你推荐的页码
            count:8,//每次获取的个数的个数
            totalPage:0,//总页码
            busy:false,
            scrollDistance:0,
        }
    },
    methods:{
        resetData(){
            this.list=[];
            this.busy=false;
            this.totalPage=0;
            this.page=1;
        },
        async getList(){
        const {goods,total}=await this.axios.get('api/goods_list?type=1',{
            params:{
            page:this.page,
            count:this.count,
            cat_id:this.cid,
            sortField:this.sortField,
            }
        });
        this.list=this.list.concat(goods);
        if(this.page===1){
            this.totalPage=Math.ceil(total/this.count);
        }
        this.page++;
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