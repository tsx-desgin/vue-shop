<template>
    <container title="新品优选" morePath="/goods-list">
        <template #content>
            <div class="goods-list">
                <div class="goods-item border" v-for="item of list"  :key="item.id" >
                <img v-lazy="item.img" alt="" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">¥{{item.price|formatPrice}}</div>
                    <Cart font-size=".28rem" :goods="item"></Cart>
                </div>
            </div>
            </div>
        </template>
    </container>
</template>
<script>
import Cart from "@/components/cartBtn"
import container from './container'
import {filters} from '@/utils/mixins'
export default {
    props:{
        newList:Array,
    },
    data(){
        return{
            list:[],
        }
    },
    watch:{
        newList(){
            this.list=this.newList.slice(0,3);
        }
    },
    // 混入插件的使用
    mixins:[filters],
    components:{
        container,
        Cart,
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
    height: 3.2rem;
    margin-top:.2rem ;
    @include flex($justify:space-between);
}
.goods-item{
    width: 2.2rem;
    height: 100%;
    border-radius: .1rem;
    overflow: hidden;
    @include flex($direction:column);
    .goods-img{
        width: 100%;
        height:2.1rem;
    }
    .goods-info{
        width:90%;
        height: 0;
        flex: 1;
        margin-bottom: .2rem;
        @include flex($direction:column,$justify:space-between);
        .goods-name{
            width: 100%;
            height: .3rem;
            font-size: .2rem;
            line-height: .3rem;
            color:$color-d;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 600;
        }
        .goods-price{
            font-weight: 600;
            font-size: .28rem;
            color:$color-a;
            width: 90%;
        }
    }
}
</style>