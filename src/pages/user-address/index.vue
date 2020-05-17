<template>
<div class="page">
    <Head title="我的地址" :back="'/user'"></Head>
    <div class="address-list">
        <div class="address-item" v-for="item of address" :key="item.id">
            <div class="address-info">
                <div class="address-content">
                    <div class="address-name">
                        <span>{{item.name}}</span>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="address-detail">
                        {{item.province}} {{item.city}} {{item.area}} {{item.address}}
                    </div>
                </div>
            </div>
            <div class="address-oprea border-top">
                <div class="default-address">
                    <input type="checkBox" class="checkbox" :checked="item.is_default===1" @click="setDefaultAddress(item.id,item.is_default)">
                    默认地址
                </div>
                <div class="edit-address">
                    <span class="icon" @click="$router.push({name:'UserAddAddress',params:{id:item.id}})">&#xe67c; 编辑</span>
                    <span class="icon">&#xe60d; 删除</span>
                </div>
            </div>
        </div>
    </div>
    <div class="Address" v-if="showAddress" @click="$router.push('/user/add-address?id='+$route.query.id+'&url='+encodeURIComponent($route.query.url))">新增收货地址</div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
const MAX_ADDRESS_NUM=10;
export default {
    components:{
        Head
    },
    data(){
        return{
            address:[],
            showAddress:true
        }
    },
    mounted(){
        document.querySelector('.page').style.height=document.documentElement.offsetHeight+'px'
        this.getUserAddress()
    },
    methods:{
        setDefaultAddress(addressId,isDefault){
            if(isDefault===1){
                return
            }
            this.$showLoading()
            const USER_TOKEN=Token.getToken();
            this.axios.post('shose/address/default',{
                is_default:1,
                id:addressId
                },{
                headers:{
                    token:USER_TOKEN
                }
            }).then(()=>{
                 this.address.forEach(item=>{
                    if(item.id===addressId){
                        item.is_default=1;
                    }else{
                        item.is_default=0;
                    }
                })
                this.$showToast({
                    message:'设置成功',
                })
            }).catch(err=>{
                this.$showToast({
                    message:err.message
                })
            }).finally(()=>{
                this.$hideLoading()
            })
        },
        chooseAddress(id){
            this.$route.query.id=id
            this.$router.push('/order?loginR='+encodeURIComponent(this.$route.query.url)+'&id='+id)
        },
        async getUserAddress(){
            const USER_TOKEN=Token.getToken();
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
//   overflow: hidden;
  .address-list{
      width: 100%;
      background: #eee;
      padding-bottom:.8rem;
      box-sizing: border-box;
      .address-item{
        width: 100%;
        max-height: 2.1rem;
        background: #fff;
        margin-bottom:.2rem ;
        .address-info{
          width: 100%;
          max-height: 1.4rem;
          .address-content{
              width: 100%;
              height: 100%;
              padding: .2rem .4rem;
              box-sizing: border-box;
              color: #666;
              font-size: .28rem;
              .address-name{
                  width: 100%;
                  height: .5rem;
                  @include flex($justify:space-between);
                  .phone{
                      font-weight: bold;
                  }
              }
              .address-detail{
                  width: 100%;
                  line-height: .38rem;
              }
          }
        }
        .address-oprea{
          width: 100%;
          height: .74rem;
          @include flex($justify:space-between);
          font-size: .28rem;
         .default-address{
             margin-left: .4rem;
             color: $color-a;
         }
         .edit-address{
             margin-right: .4rem;
             color: #999;
             .icon{
                 margin-left:.2rem ;
             }
         }
        }
      }
      .checkbox{
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: .3rem;
        height: .3rem;
        background: url(/checkbox.png) no-repeat;
        outline: none;
        background-size: contain;
    }
    .checkbox:checked{
        background: url(/checkbox@selected.png) no-repeat left bottom;
        background-size: contain;
    }
  }
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