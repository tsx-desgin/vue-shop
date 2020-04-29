<template>
<div class="header-container">
    <div v-if="showMenuicon" class="icon-header">
        <span class="icon cell">&#xe9c9;</span>
        <span class="icon cell">&#xe669;</span>
    </div>
    <div v-else></div>
</div>
</template>
<script>
export default {
    props:{
        showMenuicon:{
            type:Boolean,
            default:true
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
    .icon-header{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        @include flex($justify:space-between);
        .cell{
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            color: #fff;
            background: #87888c;
            opacity: .3;
            @include flex
        }
    }
}
</style>