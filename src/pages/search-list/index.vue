<template>
<div class="page">
    <div class="header">
        <span class="icon back" @click="$router.push('/search')">&#xe9c9;</span>
        <div class="input" @click="$router.push('/search?t='+keyword)">{{keyword}}</div>
        <span class="icon home" @click="$router.push('/')">&#xe619;</span>
    </div>
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
import infiniteScroll from 'vue-infinite-scroll'
import list from "./list"
export default {
     // 调用无限滚动
    directives: {infiniteScroll},
    components:{
        list,
    },
    data(){
        return{
            keyword:'',
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
    mounted(){
        this.keyword=this.$route.query.t;
    },
    methods:{
         sortGoodslist(goods_sortField){
            this.$showLoading()
            this.sortField=goods_sortField;
            this.resetData();
            this.$hideLoading()
            // this.getList();
            // console.log(this.list)
            // this.loadMore();
        },
        resetData(){
            this.list=[];
            this.busy=false;
            this.totalPage=0;
            this.page=1;
            if(this.sortField!=='goods_price'){
                this.sortType='';
            }else{
                if(this.sortType==''){
                    this.sortType='asc';
                }else{
                    this.sortType=this.sortType==='asc'?'desc':'asc'
                }
            }
        },
       async getList(){
            this.$showLoading()
            const {goods,total}=await this.axios.get('api/goods_list?type=1',{
                params:{
                    page:this.page,
                    count:this.count,
                    sortField:this.sortField,
                    keyword:this.keyword,
                    sortType:this.sortType,
                }
            });
            this.$hideLoading()
            this.list=this.list.concat(goods);
            console.log(this.list)
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
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    margin-top:$head-h+.88rem;
}
.header{
    width: 100%;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    position: fixed;
    background: #fff;
    z-index: 1000;
    top: 0;
    left: 0;
    @include flex;
    .back,.home{
      width: .8rem;
      height: 100%;
      font-size: .4rem;
      @include flex($justify:flex-start);
    }
    .home{
        @include flex($justify:flex-end);
    }
    .input{
        width: 0;
        flex: 1;
        height: .6rem;
        border:1px solid #dfe0e1;
        background: #f3f4f5;
        font-size: .2rem;
        padding-left:.2rem ;
        box-sizing: border-box;
        @include flex($justify:flex-start);
    }
}
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
</style>