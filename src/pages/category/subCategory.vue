<template>
<div class="subCategory-container">
    <!--path :to="'/goodsList/'+item.cat_id" -->
    <!--name :to="{name:'goodsList',params:{cid:item.cat_id}}" -->
    <router-link tag="div" :to="{name:'goodsList',query:{cid:item.cat_id,cname:item.cat_name}}" class="subCategory-item" v-for="item of content" :key="item.cat_id">
        <img :src="item.img" alt="">
        <span>{{item.cat_name}}</span>
    </router-link>
</div>
</template>
<script>
export default {
    props:{
        content:Array
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.subCategory-container{
    width: 100%;
    @include flex($justify:flex-start);
    flex-wrap: wrap;
    padding: 0 .2rem;
    .subCategory-item{
        width: 33.33%;
        height: 1.2rem;
        margin-top:.7rem ;
        @include flex(column);
        color: $color-d;
        img{
            width: 1.1rem;
            height: .8rem;
            margin-bottom: .1rem;
        }
    }
}
</style>