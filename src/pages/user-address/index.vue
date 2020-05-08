<template>
<div class="page">
    <Head title="编辑地址" :back="$route.query!==''?'/order?loginR='+encodeURIComponent($route.query.url)+'':backUrl"></Head>
    <div class="Address" v-if="showAddress" @click="$router.push('/user/add-address?id='+$route.query.id+'&url='+encodeURIComponent($route.query.url))">新增收货地址</div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
const USER_TOKEN=Token.getToken();
const MAX_ADDRESS_NUM=10;
export default {
    components:{
        Head
    },
    data(){
        return{
            backUrl:'',
            addressId:0,
            address:[],
            showAddress:true
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
            vm.addressId=to.query.id;
        })//通过next()来渲染
    },
    mounted(){
        this.getUserAddress()
    },
    methods:{
        async getUserAddress(){
            this.address=await this.axios.get('shose/address',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res=>res.address)
            this.showAddress=(MAX_ADDRESS_NUM-this.address.length)>0
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding: $head-h .2rem .9rem;
  box-sizing: border-box;
  background: #fff;
  .Address{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: .9rem;
      background: $color-a;
      color: #fff;
      @include flex;
      font-size: .32rem;
      z-index: 999;
  }
}
</style>