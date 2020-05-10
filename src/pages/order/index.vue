<template>
<div class="page">
    <Head title="确认订单" :back="'/cart'"></Head>
    <Address :address="address"></Address>
    <div class="goods-constainer">
        <div class="goods-item" v-for="item of goods" :key="item.id">
            <img :src="item.img" alt="" class="goods-img">
            <div class="goods-desc">
                <div class="name">{{item.name}}</div>
                <div class="price">{{item.price}}</div>
                <div class="buyNumber">x{{item.buyNumber}}</div>
            </div>
        </div>
    </div>
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
            coupon:[],
            addressId:0,
            loadAddress:false,
        }
    },
    watch:{
        async addressId(){
            this.$showLoading()
            await this.getUserAddress()
            this.$hideLoading()
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm=>{
    //     // 通过 `vm` 访问组件实例
    //         vm.backUrl=from.path;
    //     })//通过next()来渲染
    // },
    async mounted(){
        this.addressId=this.$route.query.id||0
        this.initCart()
        this.$showLoading()
        const address=Storage.getItem('address')||{};
        if(Object.keys(address).length==0||this.addressId==0){
            await this.getUserAddress()
        }
        // if(this.addressId==0&&Object.keys(address).length==0){
        //     await this.getUserAddress()
        // }
        await this.getUserCoupon()
        this.$hideLoading()
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
            console.log('11',this.goods)
        },
        async getUserAddress(){
            const address=await this.axios.get('shose/address/default',{
                headers:{
                    token:USER_TOKEN
                },
                params:{
                    id:this.addressId
                }
            })
            this.address=address||{};
            Storage.setItem('address',this.address);
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
  padding: $head-h .2rem 0.9rem;
  box-sizing: border-box;
  background: #f2f2f2;
  .goods-constainer{
      width: 100%;
      background: #fff;
      padding: .2rem;
      box-sizing: border-box;
      border-radius: .1rem;
      margin-top:.2rem ;
      .goods-item{
          width: 100%;
          height: 1.8rem;
          @include flex;
          margin-bottom:.2rem;
          .goods-img{
              width: 1.8rem;
              height: 1.8rem;
          }
          .goods-desc{
              width:0;
              flex: 1;
              margin-left:.2rem ;
           }
      }
  }
}
</style>