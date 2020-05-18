<template>
<div class="page">
    <Head title="我的卡券" back="/user"></Head>
    <div class="coupon-list">
        <div class="coupon-item" :class="'coupon-bg'+item.status" v-for="item of coupon" :key="item.id">
            <div class="coupon-info">
                <div class="coupon-title">
                    <div class="coupon-money">
                        ¥<span class="money">{{item.couponMoney}}</span>
                    </div>
                    <div class="desc">优惠券</div>
                </div>
                <div class="coupon-time icon">{{item.startTime}} &#xe701; {{item.endTime}}</div>
            </div>
            <div class="coupon-status">
                <div class="satus-text">{{item.statusText}}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
import {dateFormat} from "../../utils/function"
export default {
    components:{
        Head
    },
    data(){
        return{
            coupon:[]
        }
    },
    mounted(){
        document.querySelector('.page').style.height=document.documentElement.offsetHeight+'px';
        this.getUserCoupon()
    },
    methods:{
        async getUserCoupon(){
            const token = Token.getToken()
            const coupon = await this.axios.get('shose/coupon/get',{
                headers:{
                    token
                }
            }).then(res=>res.coupon)
            const statusOptions=['','优惠抵扣','已经失效','已经使用']
            this.coupon=coupon.map(item=>{
                let status = 1;
                if(item.is_use===1){
                    status=3;
                }else{
                    if(Date.now()>item.expires_time*1000){
                        status=2
                    }else{
                        status=1
                    }
                }
                item.status=status;
                item.couponMoney=parseInt(item.money)
                item.statusText=statusOptions[status];
                item.startTime=dateFormat('Y.MM.dd',new Date(item.get_time*1000))
                item.endTime=dateFormat('Y.MM.dd',new Date(item.expires_time*1000))
                return item;
            })
            const arr=[]
            const arr1=this.coupon.filter(item=>item.is_use===1);
            const arr2=this.coupon.filter(item=>item.is_use===0)
            arr.push(...arr2,...arr1)
            this.coupon=arr;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  background: $color-c;
  padding-top:$head-h;
  box-sizing: border-box;
  .coupon-list{
      width: 100%;
      @include flex(column,$justify:flex-start);
      background: #fff;
      .coupon-item{
          width: 5.8rem;
          height: 2.34rem;
          margin-top: .2rem;
          @include flex;
          .coupon-info{
              padding-left:.2rem ;
              box-sizing: border-box;
              width:3.4rem;
              height: 100%;
              color: $color-a;
              @include flex(column);
              .coupon-title{
                  width: 2.4rem;
                  height: .7rem;
                  @include flex($justify:center,$align:baseline);
                  .coupon-money{
                      font-size: .48rem;
                      .money{
                          font-size: .72rem;
                          font-weight: bold;
                      }
                  }
                  .desc{
                      font-size: .32rem;
                      margin-left: .3rem;
                  }
              }
              .coupon-time{
                  width: 3rem;
                  font-size: .2rem;
                  margin-top:.4rem ;
                  text-align: center;
              }
          }
          .coupon-status{
              width: 2.4rem;
              height: 100%;
              @include flex;
              .satus-text{
                  width: 1rem;
                  font-size: .4rem;
                  text-align: right;
                  margin-left:.2rem ;
                  font-weight: 600;
                  line-height: 1.2em; 
              }
          }
          &.coupon-bg1{
              background-image: url('/coupon1.png');
              background-size: 5.8rem 2.34rem;
              .coupon-status{
                  color: $color-a;
              }
          }
           &.coupon-bg2{
              background-image: url('/coupon2.png');
              background-size: 5.8rem 2.34rem;
              .coupon-status{
                  color: #999;
              }
          }
           &.coupon-bg3{
              background-image: url('/coupon1.png');
              background-size: 5.8rem 2.34rem;
              opacity: .8;
              .coupon-status{
                  color: $color-a;
              }
          }
      }
  }
}
</style>