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
    <div class="order-goods">
        <div class="flag">
            <span class="icon" @click="showGoods=!showGoods">
                {{showGoods?'&#xe617;':'&#xe613;'}}
            </span>
        </div>
        <div class="goods-constainer" v-show="showGoods">
            <div class="goods-item" v-for="item of order.goods" :key="item.goods_id">
                <img :src="item.goods_img" alt="" class="goods-img">
                <div class="goods-desc">
                    <div class="name">{{item.goods_name}}</div>
                    <div class="price">¥{{item.goods_price}}</div>
                    <div class="buyNumber">x{{item.buy_number}}</div>
                    <div class=" shaky">7天无理由退款</div>
                </div>
            </div>
       </div>
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
    <div class="choose-pay" v-if="order.status<=1">
        <div class="pay-cell" :class="{active:payType===1}" @click="payType=1">
            <img :src="weipay" alt="">
        </div>
        <div class="pay-cell" :class="{active:payType===2}" @click="payType=2">
            <img :src="alipay" alt="">
        </div>
    </div>
    <div class="opration">
        <span class="opration-btn" v-if="order.status<=1">支付订单</span>
        <span class="opration-btn" v-else>查看订单</span>
        <router-link to="/" class="opration-btn">返回首页</router-link>
    </div>
    <div class="pay-type" v-if="order.status<=1">
        <img :src="payType==1?weichat:ali" alt="">
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
            order:{},
            weipay:'/weipay.svg',
            alipay:'/alipay.svg',
            payType:1,
            showGoods:false,
            weichat:'/weichat.png',
            ali:'/ali.jpg',
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
  padding: $head-h 0;
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
   .choose-pay{
       width: 100%;
       height: 1rem;
       margin-top:.4rem ;
       @include flex; 
       .pay-cell{
           width: 40%;
           height: 100%;
           @include flex; 
           border: 1px solid #f2f2f2;
           box-sizing: border-box;
           border-radius:.1rem ;
           img{
               width:.8rem;
               height: .8rem;
           }
           &.active{
               border: 1px solid $color-a;
           }
       }
   }
   .opration{
       width: 100%;
       height: .6rem;
       margin-top: 1rem;
       @include flex($justify:space-around);
       padding: 0 .8rem;
       box-sizing: border-box;
       .opration-btn{
           width:1.56rem;
           height: 100%;
           box-sizing: border-box;
           border-radius: .3rem;
           border:1px solid $color-a;
           color: $color-a;
           @include flex
       }
   }
   .order-goods{
       width: 100%;
       padding: 0 .4rem;
       box-sizing: border-box;
       margin-top:.6rem ;
       .flag{
           width: 100%;
           height: .6rem;
           @include flex($justify:flex-end);
           .icon{
               font-size:.6rem;
           }
       }
   }
   .goods-constainer{
      width: 100%;
      background: #fff;
      padding: .2rem;
      box-sizing: border-box;
      border-radius: .1rem;
      margin:.2rem 0;
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
              height: 90%;
              @include flex(column,$justify:space-between,$align:flex-start);
              font-size:.24rem ;
              color: $color-d;
              .name,.price{
                 color:#333;
              }
              .shaky{
                  background: rgb(255, 241, 235);
                  white-space: nowrap;
                  line-height: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  font-size: .24rem;
                  color:#ff5000 ;
              }
           }
      }
  }
  .pay-type{
      width: 100%;
      padding: .2rem;
      box-sizing: border-box;
      @include flex;
      img{
          width: 70%;
      }
  }
}
</style>