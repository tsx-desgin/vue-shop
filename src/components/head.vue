<template>
<div class="head">
    <span class="icon back" v-if="back" @click="toBack"></span>
    <span class="title">{{title}}</span>
</div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'QianQian左右鞋包',
        },
        back:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        toBack(){}
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.head{
    width: 100%;
    height: .88rem;
    background: #ff5e46;
    position: relative;
    text-align: center;
    line-height: .88rem;
    color: #fff;
    font-size: .36rem;
    .back{
        display: block;
        width: 1rem;
        height: 100%;
        position: absolute;
        left: .2rem;
        top: 0;
        font-size: .4rem;
        text-align: left;
    }
}
</style>
