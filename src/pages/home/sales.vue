<template>
<container title="特惠清仓" morePath="/goods-list">
    <template #content v-if="show">
    <swiper  :options="swiperOptions" class="swiper-container" v-if="show">
        <!-- 加入：key -->
        <swiper-slide v-for="(item,index) of pages" :key="index" class="swiper-page">
            <router-link tag="div" :to="`/goodsDetail/${val.id}`" class="swiper-goods border" v-for="val of item" :key="val.id">
                <img v-lazy="val.img" alt="" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{val.name}}</div>
                    <div class="goods-price">¥{{val.price|formatPrice}}</div>
                    <cart font-size=".28rem" :goods="val"></cart>
                </div>
            </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    </template>
</container>
</template>
<script>
import {filters} from '@/utils/mixins'
import container from "./container"
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import cart from "@/components/cartBtn";
export default {
    props:{
        saleList:Array
    },
    components:{
        container,
        Swiper,
        SwiperSlide,
        cart,
    },
    mixins:[filters],
    computed:{
        show(){
            return this.saleList.length;
        }
    },
    watch:{
        saleList(newVal){
            const pages=[];
            newVal.forEach((item,index) => {
                let page=Math.floor(index/2);
                if(!pages[page]){
                    pages[page]=[];
                }
                pages[page].push(item);
            });
            this.pages=pages;
        }
    },
    data(){
        return{
            pages:[],
            swiperOptions:{
                pagination: {
                    el: '.swiper-pagination'
                }
            },
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swiper-container{
    width: 100%;
    height: 4.4rem;
    margin-top: .2rem;
    .swiper-page{
        width: 100%;
        height: 4rem;
        @include flex($justify:space-between);
        .swiper-goods{
            width: 3.44rem;
            height: 100%;
            border-radius: .2rem;
            overflow: hidden;
            @include flex($direction:column);
        }
        .goods-img{
            width: 100%;
            height: 2.66rem;
        }
        .goods-info{
            width:90%;
            height: 0;
            flex: 1;
            margin-bottom: .2rem;
            @include flex($direction:column,$justify:space-between,$align:flex-start);
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
    /deep/.swiper-pagination-bullet-active{
        background: $color-a;
    }
    /deep/.swiper-pagination-bullets{
        bottom: 0rem;
    }
    
}
</style>