<template>
<div class="goods-list">
    <div class="goods-item" v-for="item of list" :key="item.id">
        <img :src="item.img" alt="" class="goods-img">
            <div class="goods-desc">
                <div class="goods-name">
                        {{item.name}}
                </div>
                <div class="goods-price">￥{{item.price |formatPrice}}
                        <span class="mare">￥{{item.market_price|formatPrice}}</span>
                </div>
                <div class="sale">{{item.sale_num}}人购买</div>
                <div class="add-cart icon">&#xe669;</div>
            </div>
    </div>
</div>
</template>
<script>
import {filters} from '@/utils/mixins'
export default {
    props:{
        list:Array,
    },
    // 混入插件的使用
    mixins:[filters],
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
    width: 100%;
    padding: .2rem .2rem;
    box-sizing: border-box;
}
.goods-item{
    width: 100%;
    height: 2.2rem;
    padding-left: .2rem;
    box-sizing: border-box;
    display: flex;
    margin-bottom: .2rem;
}
.goods-img{
    width: 2.2rem;
    height: 2.2rem;
    margin-left: .2rem;
}
.goods-desc{
    flex: 1;
    width: 0;
    padding: .2rem;
    /* background-color: #f90; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}
.goods-name{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .32rem;
    font-weight: 700;
    color: #333;
}
.goods-price{
    width: 100%;
    font-size: .36rem;
    font-weight: 700;
    color: #ff5e46;
    margin-top: .7rem;
}
.mare{
    color: #999;
    text-decoration: line-through;
    font-size: .2rem;
}
.sale{
   color: #999;
   font-size: .28rem; 
}
.add-cart{
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    text-align: center;
    font-size: .4rem;
    color: #ff5e46;
    position: absolute;
    right: 0;
    bottom: 0;
}
.number{
    position: absolute;
    right: 30px;
}
.number .num{
    position: absolute;
    right: 0;
    top: -.2rem;
    display: block;
    font-size: .2rem;
    width: .2rem;
    height: .2rem;
    border-radius: .1rem;
    background-color: #ff5e46;
    color: #fff;
    text-align: center;
    
}
</style>