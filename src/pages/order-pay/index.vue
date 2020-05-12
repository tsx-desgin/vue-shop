<template>
<div class="page" v-if="show">
    <Head title="订单支付" :back="'/'"></Head>
    <div class="order-status">
        <span class="icon">&#xe603;</span>
        <span>买家{{order.statusInfo}}</span>
        <span>您的包裹已蓄势待发~</span>
    </div>
    <div class="order-total">
        实付款:<span>¥ {{order.totalPrice}}</span>
    </div>
    <div class="order-address">
        <div class="row">
            <span>收货人: </span>
            <p>{{order.address.name}}</p>
        </div>
        <div class="row">
            <span>手机号: </span>
            <p>{{order.address.phone}}</p>
        </div>
        <div class="row">
            <span>收货地址: </span>
            <p>{{order.address.province}} {{order.address.city}} {{order.address.area}} {{order.address.address}}</p>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from '../../utils/token'
import {getOrderStatus,formatPrice} from '../../utils/function'
export default {
    components:{
        Head
    },
    data(){
        return{
            orderId:0,
            order:{}
        }
    },
    computed:{
        show(){
            return !!Object.keys(this.order).length
        }
    },
    mounted(){
        this.orderId=parseInt(this.$route.query.id)
        if(Object.keys(this.order).length==0){
            this.getOrder()
        }
    },
    methods:{
        async getOrder(){
            const token= Token.getToken()
            const order=await this.axios.get('shose/order',{
                params:{
                    id:this.orderId
                },
                headers:{
                    token
                }
            }).then(res=>res.order)
            order.statusInfo=getOrderStatus(order.status)
            order.totalPrice=formatPrice(order.total_price)
            console.log(order)
            this.order=order
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding-top: $head-h;
  box-sizing: border-box;
  background: #f2f2f2;
  .order-status{
      width: 100%;
      height: 3.3rem;
      background: $color-a;
      @include flex(column);
      color:#fff;
      font-size: .36rem;
      line-height: 1.3em;
      .icon{
          font-size: 1rem;
          margin-bottom: .4rem;
      }
  }
  .order-total{
      width: 100%;
      height: 1rem;
      font-size: .32rem;
      @include flex;
      color:#333;
      span{
          color:$color-a;
      }
   }
   .order-address{
       width: 100%;
       padding: 0 .4rem;
       box-sizing: border-box;
       color:#666;
       font-size: .28rem;
       .row{
           width: 100%;
           margin-bottom: .2rem;
           @include flex;
           span{
               width: 1.3rem;
               height: 100%;
           }
           p{
               width: 0;
               height: 100%;
               flex: 1;
           }
       }
   }
}
</style>