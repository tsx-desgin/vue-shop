<template>
    <container title="为你推荐">
        <template #content>
            <div class="goods-list">
                <router-link tag="div" :to="`/goodsDetail/${item.id}`" class="goods-item border" v-for="(item,index) of list"  :key="index" >
                <img v-lazy="item.img" alt="" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">¥{{item.price|formatPrice}}</div>
                    <Cart font-size=".3rem" :goods="item"></Cart>
                </div>
                </router-link>
            </div>
        </template>
    </container>
</template>
<script>
import container from './container'
import {filters} from '@/utils/mixins'
import Cart from "@/components/cartBtn"
export default {
    props:{
        list:Array,
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
    height: auto;
    margin-top:.2rem ;
    @include flex($justify:space-between);
    flex-wrap: wrap;
}
.goods-item{
    width: 3.44rem;
    height: 4rem;
    border-radius: .1rem;
    margin-bottom:.2rem ;
    overflow: hidden;
    @include flex($direction:column);
    .goods-img{
        width: 100%;
        height:2.66rem;
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