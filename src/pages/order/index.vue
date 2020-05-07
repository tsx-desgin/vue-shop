<template>
<div class="page">
    <Head title="确认订单" :back="backUrl"></Head>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
const USER_TOKEN=Token.getToken();
export default {
    components:{
        Head
    },
    data(){
        return{
            backUrl:'',
            goods:[]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
        })//通过next()来渲染
    },
    mounted(){
        this.getUserAddress()
    },
    methods:{
        async getUserAddress(){
            const address=await this.axios.get('shose/address/default',{
                headers:{
                    token:USER_TOKEN
                }
            })
            this.address=address||{};
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  padding-top:$head-h ;
}
</style>