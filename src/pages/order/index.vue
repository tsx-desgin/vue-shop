<template>
<div class="page">
    <Head title="确认订单" :back="'/cart'"></Head>
    <Address :address="address"></Address>
    <div class="goods-constainer">
        <div class="goods-item" v-for="item of goods" :key="item.id">
            <img :src="item.img" alt="" class="goods-img">
            <div class="goods-desc">
                <div class="name">{{item.name}}</div>
                <div class="price">¥{{item.price}}</div>
                <div class="buyNumber">x{{item.buyNumber}}</div>
                <div class=" shaky">7天无理由退款</div>
            </div>
        </div>
    </div>
    <div class="coupon-container">
        <div class="coupon-item" v-for="item of coupon" :key="item.id" @click="choose(item.id)">
            <span class="icon">&#xe601;</span>
            <div class="coupon-content">
                使用¥{{item.money}}元优惠券
            </div>
            <span class="icon">{{item.selected?'&#xe621;':'&#xe635;'}}</span>
        </div>
    </div>
    <div class="order-submit border-top">
        <div class="order-count">
            共{{cartNum}}件商品&nbsp;
            <span> 合计:<em>{{payment.toFixed(2)}}元</em></span>
        </div>
        <div class="submitOrder" @click="submitOrder">提交订单</div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import Address from "./address"
import {Token} from "../../utils/token"
import {Storage} from "../../utils/storage"
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
            selectCouponId:0,
            total:0,
            cartNum:0,
            payment:0,
        }
    },
    watch:{
        async addressId(){
            if(this.addressId!=0){
                this.$showLoading()
                await this.getUserAddress()
                this.$hideLoading()
            }
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
        async submitOrder(){
            const token = Token.getToken()
            if(token===''){
                this.$router.push('/login?url='+encodeURIComponent(this.$route.query.url||'/order'))
            }
            const address = Storage.getItem('address')||{};
            if(Object.keys(address).length==0){
                this.$showToast({
                    message:'请选择收货地址'
                })
                return
            }

            if(this.goods.length===0){
                this.$showToast({
                    message:'请选择商品'
                })
                return
            }
            const data={

            }
            data.address_id=address.id;
            data.goods=[];
            this.goods.forEach(item=>{
                data.goods.push({
                    goods_id:item.id,
                    count:item.buyNumber,
                })
            })
            if(this.coupon.length>0){
                const selectCoupon=this.coupon.filter(item=>item.selected)
                if(selectCoupon.length>0){
                    data.coupon_id=selectCoupon[0].id;
                }
            }
            this.$showLoading()
            await this.axios.post('shose/order',data,{
                headers:{
                    token
                }
            }).then(res=>{
                if(res.pass){
                    // 清空购物车中已经购买成功的商品
                    const cartAll = Storage.getItem('cart');
                    // const coupon =Storage.getItem('coupon')
                    const cart =cartAll.filter(item=>{
                       const index= this.goods.findIndex(val=>val.id==item.id)
                       return index===-1
                    })
                    if(cart.length>0){
                        Storage.setItem('cart',cart);
                    }else{
                        Storage.deleteItem('cart')
                    }
                    // 清除已经使用的
                    // const couponselect=coupon.filter(item=>item.selected==false)
                    // if(couponselect.length>0){
                    //     Storage.setItem('coupon',couponselect)
                    // }else{
                    //     Storage.setItem('coupon',[])
                    // }
                    Storage.deleteItem('coupon')
                    this.$router.replace('/order/pay?id='+res.order_id)
                }
            }).catch((err)=>{
                this.$showToast({
                    message:err.message,
                    callback:()=>{
                        this.$router.replace('/cart')
                    }
                })
            }).finally(()=>{
                this.$hideLoading()
            })
        },
        choose(couponId){
            // const index=this.coupon.findIndex(item=>item.id===couponId);
            // if(index>-1){
            //     this.coupon[index].selected=!this.coupon[index].selected
            // }
            if(this.selectCouponId!=0&&this.selectCouponId!=couponId){
                this.payment=this.total;
            }
            this.selectCouponId=couponId
            this.coupon.forEach(item => {
                if(item.id===couponId){
                    const currentSelect=!item.selected
                    const money=parseFloat(item.money)
                    item.selected=currentSelect
                    if(currentSelect){
                        this.payment-=money
                    }else{
                        this.payment+=money
                    }
                }else{
                    item.selected=false
                }
            });
        },
        initCart(){
            const cartAll=Storage.getItem('cart');
            let total=0;
            let cartNum=0;
            let cart=[];
            // let payment=0;
            cartAll.map(item=>{
                if(item.selected){
                    total+=item.buyNumber*item.price;
                    cartNum++;
                    cart.push(item)
                }    
            })
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
            this.total=total
            this.cartNum=cartNum
            this.payment=total
            // console.log('11',this.goods)
        },
        async getUserAddress(){
            const USER_TOKEN=Token.getToken();
            const UserAddress=Storage.getItem('address');
            if(Object.keys(UserAddress).length>0){
                if(UserAddress.id!=undefined&&UserAddress.id!=this.addressId){
                    // console.log(this.$route.query.id)
                    this.address=await this.axios.get('shose/address/default',{
                        headers:{
                            token:USER_TOKEN
                        },
                        params:{
                            id:this.addressId
                        }
                    })
                    Storage.setItem('address',this.address);
                }else{
                    this.address=UserAddress;
                }
                return
            }
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
            const USER_TOKEN=Token.getToken();
            const UserCoupon=Storage.getItem('coupon')||[]
            let Coupon=UserCoupon.filter(item=>{
                return item!=null;
            });
            console.log(Coupon)
            Storage.setItem('coupon',Coupon)
            if(Coupon.length>0){
                this.coupon=Coupon.filter(item=>item.is_use===0&&item.expires_time*1000>Date.now()&&item!=null)
                return
            }
            console.log(Coupon.length)
            const coupon=await this.axios.get('shose/coupon/get',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res=>res.coupon)
            console.log(coupon)
            this.coupon=coupon.map(item=>{
                if(item.is_use===0&&item.expires_time*1000>Date.now()){
                    item.selected=false;
                    return item
                }
            })
            this.coupon=this.coupon.filter(item=>{
                return item!=null;
            })
            Storage.setItem('coupon',this.coupon)
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
  .coupon-container{
      width: 100%;
      margin-top:.2rem ;
      z-index: 1000;
      .coupon-item{
          width: 100%;
          height: .76rem;
          background: #fff;
          border-radius: .38rem;
          margin-top:.2rem ;
          @include flex;
          padding: .2rem;
          box-sizing: border-box;
        //   z-index: 999;
          .icon{
              color: $color-a;
              font-size: .38rem;
          }
          .coupon-content{
              width: 0;
              flex:1;
              margin-left:.2rem ;
              font-size: .24rem;
              color: #999;
          }
      }
  }
  .order-submit{
      width: 100%;
      height: .9rem;
      position: fixed;
      background: #fff;
      left: 0;
      bottom: 0;
      @include flex;
      .order-count{
          width: 0;
          flex: 1;
          height: 100%;
          font-size: .24rem;
          color:#999;
          @include flex($justify:flex-end);
          span{
              margin-left:.1rem;
              font-size: .28rem;
              color: #333;
              em{
                  color: #ff0036;
                  font-size: .3rem;
              }
          }
      }
      .submitOrder{
          width: 1.5rem;
          height: .7rem;
          background: $color-a;
          color:#fff;
          border-radius:.35rem;
          @include flex;
          font-size: .28rem;
          margin:0 .2rem ;
      }
  }
}
</style>