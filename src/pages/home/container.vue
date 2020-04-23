<template>
<div class="container">
    <div class="title">
        <span>{{title}}</span>
        <span class="icon more" v-if="show">更多 &#xe63c;</span>
    </div>
    <slot name="content"></slot>
</div>
</template>
<script>
export default {
    props:{
        title:String,
        morePath:String,
    },
    computed:{
        show(){
            if(this.morePath!=undefined){
                return true
            }
             return false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    @include container(auto);
    .title{
        width:100%;
        @include flex($justify:space-between);
        height: .32rem;
        font-size: .32rem;
        font-weight:700;
        border-left: .06rem solid $color-a;
        text-indent: .2rem;
        color: $color-b;
        .more{
            font-size: .24rem;
            color: $color-d;
            font-weight:400;
        }
    }
}    
</style>