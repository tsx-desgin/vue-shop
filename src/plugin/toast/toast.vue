<template>
<transition name="fade">
    <div class="toast-container" v-if="visible">
        <div class="mask" v-if="mask"></div>
        <div class="toast">{{message}}</div>
    </div>
</transition>
</template>
<script>
export default {
    data(){
        return{
            visible:false,
            message:'',
            mask:false,
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.toast-container{
    width:100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    @include flex;
    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        opacity: .3;
        background: rgba($color: #000000, $alpha: .8);
    }
    .loading-img{
        position: absolute;
        width: 20%;
        z-index: 999;
    }
}
.toast{
    padding: .4rem .1rem;
    color: #fff;
    font-size: .28rem;
    text-align: center;
    background: rgba($color: #000000, $alpha: .7);
    border-radius: .1rem;
    text-align: center;
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%,-50%);
    .fade-enter-active,
    .fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter,fade-leave-to{
        opacity: 0;
    }
}
</style>