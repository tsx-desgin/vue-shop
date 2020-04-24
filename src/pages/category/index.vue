<template>
<div>
    <Head title="分类" :back="backUrl"></Head>
    <search-bar></search-bar>
    <com-footer></com-footer>
</div>
</template>
<script>
import Head from "@/components/head"
import comFooter from "@/components/footer";
import SearchBar from "@/components/searchBAr"
export default {
    components:{
        Head,
        SearchBar,
        comFooter,
    },
    data(){
        return{
            backUrl:'',
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path
        })//通过next()来渲染
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
</style>