<template>
<div class="page">
    <Head title="购物车"></Head>
    <div class="cart-list">
        <!-- 传参 data-goods-id='' -->
        <div class="cart-item  border-bottom" :class="{'cart-del':item.delete}" v-for="item of cart" :data-goods-id="item.id" :key="item.id" @touchstart='touchStart' @touchend='touchEnd'>
            <input type="checkBox" class="checkbox" :checked="item.selected" @click="toggleSelect(item.id)">
            <img class="goods-img" :src="item.img" alt="">
            <div class="goods-desc">
                <div class="goods-name">{{item.name}}</div>
                <div class="goods-price">
                    <span>￥{{item.price}}</span>
                <div class="goods-number-wrapper border">
                    <span :class="{'disabled':item.number===1}" class="left icon" @click="reduceCart(item.id)">&#xe701;</span>
                    <span>{{item.buyNumber}}</span>
                    <span class="opra icon" @click='addCart(item)'>&#xe60b;</span>
                </div>
                </div>
            </div>
            <div class='del icon' @click='delCart(item.id)'>&#xe60d;</div>
        </div>
    </div>
    <div class="count border-top">
        <div>
            <input type="checkbox" class="checkbox" :checked="selectAll" @click="toggleSelectAll">全选
        </div>
        <div class="total">
            合计：<em>￥{{total.toFixed(2)}}</em>
        </div>
        <div class="submit" @click="submitCart">结算({{cartNum}})</div>    
    </div>   
    <com-footer></com-footer>
</div>
</template>
<script>
import Head from "@/components/head"
import comFooter from "@/components/footer";
import {Storage} from "@/utils/storage"
let touchStartX=0;
let touchStartTime=0;
export default {
    components:{
        Head,
        comFooter,
    },
    data(){
        return{
            cart:[],
            selectAll:false,
            total:0,
            cartNum:0
        }
    },
    mounted(){
        const cart=Storage.getItem('cart')||[];
        if(cart.length>0){
            this.cart=cart.map(item=>{
                if(!Reflect.has(item,'cart-del')){
                    item.delete=false;
                }
                return item 
            })
        }
        this.countCart()
    },
    methods:{
        countCart(){
            let selectAll=[];
            let total=0;
            let cartNum=0;
            this.cart.forEach(item=>{
                if(item.selected){
                    total+=item.price*item.buyNumber;
                    cartNum++;
                    selectAll.push(true)
                }
            })
            this.selectAll=selectAll.length>0?selectAll.length===this.cart.length:false;
            this.cartNum=cartNum;
            this.total=total;
        },
        submitCart(){},
        toggleSelectAll(){
            this.cart.forEach(item=>{
                if(item.selected){
                    this.selectAll=true;
                }else{
                    this.selectAll=false;
                }
            })
            this.countCart()
        },
        toggleSelect(goodsId){
            const index=this.cart.findIndex(item=>item.id===goodsId);
            this.cart[index].selected=!this.cart[index].selected;
            this.countCart()
        },
        touchStart(event){
            touchStartX=event.changedTouches[0].clientX;
            touchStartTime=event.timeStamp;
        },
        touchEnd(event){
            const elem=event.currentTarget
            const distance=event.changedTouches[0].clientX-touchStartX;
            const time=event.timeStamp-touchStartTime
            const goodsId=parseInt(elem.dataset.goodsId);
            const index=this.cart.findIndex(item=>item.id===goodsId)
            if(distance<-100 && time<500){//左划 显示删除按钮
                this.cart[index].delete=true;
                this.cart.forEach((item,key)=>{
                    if(index!==key){
                        item.delete=false;
                    }else{
                        item.delete=true; 
                    }
                })
            }
            if(distance>100 &&time<500){
                this.cart[index].delete=false;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    min-height: 100%;
    margin-top:$head-h;
    padding-bottom: $footer-h+.9rem;
}
.cart-list{
    width: 100%;
    padding: .2rem .2rem;
    box-sizing: border-box;
    position: relative;
}
.cart-item{
    width: 100%;
    height: 2.2rem;
    padding-left: .2rem;
    box-sizing: border-box;
    display: flex;
    margin-bottom: .2rem;
    position: relative;
    /* left: -1.6rem; */
    transition: all .3s;
}
.cart-item.cart-del{
    left: -1.6rem;
}
.goods-img{
    width: 2.2rem;
    height: 2.2rem;
    margin-left: .2rem;
    border-radius: .2rem;
}
.goods-desc{
    flex: 1;
    width: 0;
    padding: .2rem;
    /* background-color: #f90; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}
.goods-name{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .32rem;
    font-weight: 700;
    color: #666;
}
.goods-price{
    width: 100%;
    font-size: .36rem;
    font-weight: 700;
    color: #ff5e46;
    margin-top: .7rem;
    display: flex;
    justify-content: space-between;
}
.goods-number-wrapper{
    width: 1.6rem;
    height: .43rem;
    /* border: 1px solid #666; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.cart-list .checkbox{
   display: block;
   margin-top: 1rem;
}
.goods-number-wrapper span{
    // border: 1px solid #666;
    flex: 1;
    height: .43rem;
    line-height: .43rem;
    font-size: .32rem;
    color: #333;
    cursor: pointer;
    user-select: none;
}
.count{
    position: fixed;
    bottom: $footer-h;
    /* overflow: hidden; */
    width: 100%;
    height: .9rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: .23rem;
    font-size: .32rem;
    background-color: #fff;
    z-index: 999;
}
.count .total{
    margin-left: .23rem;
    font-weight: 700;
    color: #ff5e46;
}
.submit{
    position: absolute;
    right: 0;
    background-color: #ff5e46;
    flex: 1;
    height: 100%;
    width: 2.1rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.del{
    position: absolute;
    width: 1.6rem;
    height: 100%;
    background-color: #ff5e46;
    top: 0;
    right: -1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: .32rem;
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
</style>