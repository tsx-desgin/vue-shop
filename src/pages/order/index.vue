<template>
<div class="page">
    <Head title="确认订单" :back="backUrl"></Head>
    <Address :address="address"></Address>
</div>
</template>
<script>
import Head from "@/components/head"
import Address from "./address"
import {Token} from "../../utils/token"
import {Storage} from "../../utils/storage"
const USER_TOKEN=Token.getToken();
export default {
    components:{
        Head,
        Address,
    },
    data(){
        return{
            address:{},
            backUrl:'',
            goods:[],
            coupon:[]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
        })//通过next()来渲染
    },
    mounted(){
        this.initCart()
        this.getUserAddress()
        this.getUserCoupon()
    },
    methods:{
        initCart(){
            const cart=Storage.getItem('cart');
            if(cart.length===0){
                this.$showToast({
                    message:'至少选择一件商品',
                    callback:()=>{
                        this.$router.push('/cart')
                    }
                })
                return
            }
            this.goods=cart
        },
        async getUserAddress(){
            const address=await this.axios.get('shose/address/default',{
                headers:{
                    token:USER_TOKEN
                }
            })
            this.address=address||{};
        },
        async getUserCoupon(){
            const coupon=await this.axios.get('shose/coupon/get',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res=>res.coupon)
            this.coupon=coupon.filter(item=>{
                if(item.is_use===1){
                    return false
                }else{
                    return item.expires_time*1000>Date.now()
                }
            })
            console.log(this.coupon)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding: $head-h .2rem 0;
  box-sizing: border-box;
  background: #f2f2f2;
}
</style>