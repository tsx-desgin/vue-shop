<template>
<div class="page">
    <Head title="选择地址" :back="$route.query!==''?'/order?loginR='+encodeURIComponent($route.query.url)+'':backUrl"></Head>
    <div class="address-list">
        <div class="address">
            <div class="address-item border-bottom" :class="{selected:item.selected}" v-for="item of address" :key="item.id" @click="chooseAddress(item.id)">
                <div class="address-content">
                    <div class="address-name">
                        <span>收货人:&nbsp;{{item.name}}</span>
                        <span>{{item.phone}}</span>
                    </div>
                <div class="address-detail">
                    收货地址:&nbsp;{{item.detail}}
                </div>
                </div>
                <span class="icon">&#xe607;</span>
            </div>
        </div>
    </div>
    <div class="Address" v-if="showAddress" @click="$router.push('/user/add-address?url='+encodeURIComponent($route.query.url))">新增收货地址</div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
const USER_TOKEN=Token.getToken();
const MAX_ADDRESS_NUM=15;
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
        document.querySelector('.page').style.height=document.documentElement.offsetHeight-176+'px'
        this.getUserAddress()
    },
    methods:{
        chooseAddress(id){
            this.$route.query.id=id
            this.$router.push('/order?loginR='+encodeURIComponent(this.$route.query.url)+'&id='+id)
        },
        async getUserAddress(){
            this.address=await this.axios.get('shose/address',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res=>{
                res.address.map(item=>{
                    item.detail=`${item.province}${item.city}${item.area}${item.address}`;
                    item.selected=item.id==this.addressId;
                })
                return res.address
            })
            this.showAddress=(MAX_ADDRESS_NUM-this.address.length)>0
            console.log(this.address,this.addressId)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
//   height: 100%;
  padding: $head-h 0 .9rem;
  box-sizing: border-box;
  background: #eee;
  overflow: hidden;
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
  .address-list{
      width: 100%;
      margin-top:.2rem ;
      .address-item{
          width: 100%;
          height: 1.76rem;
          background: #fff;
          padding: .4rem .32rem;
          box-sizing: border-box;
          @include flex;
          .address-content{
              width: 0;
              flex: 1;
              color: #666;
              height: 100%;
              font-size:.24rem;
              .address-name{
                  font-size:.32rem ;
                  height: .42rem;
                  margin-bottom:.2rem ;
                  @include flex($justify:space-between)
              }
              .address-detail{
                line-height: .35rem;
              }
          }
          .icon{
              font-size: .4rem;
              color: #fff;
              @include flex;
              width: .5rem;
              height: 100%;
          }
          &.selected{
              background: #5e6b85;
              .address-content{
                width: 0;
                flex: 1;
                height: 100%;
                color: #ffffff;
              }
          }
      }
  }
}
</style>