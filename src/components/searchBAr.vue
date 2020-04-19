<template>
<div class="container">
    <div class="search">
        <span class="icon">&#xe612;</span>
        {{placeHolder}}
    </div>
</div>
</template>

<script>
export default {
    props:{
        placeHolder:{
            type:String,
            default:'搜索商品名称'
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    width: 100%;
    height: .88rem;
    padding: .15rem .4rem;
    box-sizing: border-box;
    background: $color-a;
    margin-top:-1px ;
    .search{
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: .3rem;
        text-align: center;
        line-height: .58rem;
        color: #b2b2b2;
        font-size: .26rem;
    }
}
</style>
