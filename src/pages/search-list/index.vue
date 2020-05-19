<template>
<div>
    <div class="header">
        <span class="icon back" @click="$router.push('/search')">&#xe9c9;</span>
        <div class="input" @click="$router.push('/search?t='+keyword)">{{keyword}}</div>
        <span class="icon home" @click="$router.push('/')">&#xe619;</span>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            keyword:''
        }
    },
    mounted(){
        this.keyword=this.$route.query.t;
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header{
    width: 100%;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include flex;
    .back,.home{
      width: .8rem;
      height: 100%;
      font-size: .4rem;
      @include flex($justify:flex-start);
    }
    .home{
        @include flex($justify:flex-end);
    }
    .input{
        width: 0;
        flex: 1;
        height: .6rem;
        border:1px solid #dfe0e1;
        background: #f3f4f5;
        font-size: .2rem;
        padding-left:.2rem ;
        box-sizing: border-box;
        @include flex($justify:flex-start);
    }
}
</style>