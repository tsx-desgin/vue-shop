<template>
<transition name="fade">
<div class="loading-container" v-if="show">
    <div class="mask" v-if="mask"></div>
    <img src="./1.svg" alt="" class="loading-img" >
</div>
</transition>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            mask:false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.loading-container{
    width:100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    @include flex;
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        opacity: .3;
        background: rgba($color: #000000, $alpha: .3);
    }
    .loading-img{
        position: absolute;
        width: 20%;
        z-index: 999;
    }
}
.fade-enter-active,
.fade-leave-active{
    transition: opacity .5s;;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>
