<template>
<div class="page">
    <Head title="我的订单" back="/user"></Head>
    <div class="tab border-bottom">
        <div class="tab-wrapper">
            <div class="tab-cell">
                <span class="tab-text" :class="{active:status===-1}">全部</span>
            </div>
             <div class="tab-cell">
                <span class="tab-text" :class="{active:status===1}">待付款</span>
            </div>
             <div class="tab-cell">
                <span class="tab-text" :class="{active:status===2}">待发货</span>
            </div>
             <div class="tab-cell">
                <span class="tab-text" :class="{active:status===3}">待收货</span>
            </div>
             <div class="tab-cell">
                <span class="tab-text" :class="{active:status===4}">已完成</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
// import {Token} from "../../utils/token"
export default {
    components:{
        Head
    },
    data(){
        return{
            status:-1
        }
    },
    mounted(){
        this.status = parseInt(this.$route.query.status || -1)
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  margin-top: $head-h;
  .tab{
      width: 100%;
      height: .8rem;
      background: #ffffff;
      .tab-wrapper{
         width: 100%;
         height: 100%;
         padding: 0 .2rem;
         box-sizing: border-box;
         @include flex;
         .tab-cell{
            width: 20%;
            height: 100%;
            @include flex;
            .tab-text{
                height: 100%;
                border-bottom:2px solid #fff;
                font-size: .32rem;
                color: #333;
                @include flex;
                box-sizing: border-box;
                &.active{
                  border-bottom:2px solid $color-a;
                }
            }
         }
      }
  }
}
</style>