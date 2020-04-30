<template>
<div class="header-container">
    <div v-if="showMenuicon" class="icon-header">
        <span class="icon cell">&#xe9c9;</span>
        <span class="icon cell">&#xe669;</span>
    </div>
    <div v-else class="menu-header border-bottom" :style="`opacity:${opacity};`">
        <span class="icon cell">&#xe9c9;</span>
        <div class="header-tab">
            <div :class="{active:scrollTab==='goods'}" @click="change('goods')">商品</div>
            <div :class="{active:scrollTab==='comment'}" @click="change('comment')">评价</div>
            <div :class="{active:scrollTab==='detail'}" @click="change('detail')">详情</div>
        </div>
        <span class="icon cell">&#xe669;</span>
    </div>
</div>
</template>
<script>
export default {
    props:{
        showMenuicon:{
            type:Boolean,
            default:false
        },
        opacity:{
            type:Number,
            default:1
        },
        scrollTab:{
            type:String,
            default:'goods'
        }
    },
    methods:{
        change(goods){
            this.$emit('change',goods)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
    width: 100%;
    height: .88rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .icon-header{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        @include flex($justify:space-between);
        background: linear-gradient(rgba(0,0,0,.15),transparent);
        .cell{
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            color: #fff;
            background: #87888c;
            opacity: .3;
            @include flex;
            font-size: .4rem;
        }
    }
    .menu-header{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        @include flex($justify:space-between);
        background: #fff;
        color: $color-d;
        .cell{
            width: .6rem;
            height: .6rem;
            opacity: .3;
            @include flex;
            font-size: .4rem;
        }
        .header-tab{
            width: 0;
            flex: 1;
            height: 100%;
            @include flex;
            padding: 0 .4rem;
            box-sizing: border-box;
            div{
                width: 33.33%;
                height: 100%; 
                @include flex;
                border-bottom: 1px solid #fff;
                box-sizing: border-box;
                &.active{
                    color: #ff0036;
                    border-bottom: 2px solid #ff0036;
                }
            }
        }
    }
}
</style>