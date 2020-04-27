<template>
<div class="add-cart icon" :style="style" @click="addTocart">&#xe669;</div>
</template>
<script>
import {Storage} from "@/utils/storage"
export default {
    props:{
        fontSize:{
            type:String,
            default:'.4rem'
        },
        goods:{},
        buyNumber:{
            type:Number,
            default:1          
        }
    },
    computed:{
        style(){
            return{
                fontSize:this.fontSize
            }
        }
    },
    methods:{
        addTocart(){
            if(Object.keys(this.goods).length==0){
                return
            }
            const goods=this.goods;
            const cart=Storage.getItem('cart')||[];
            const index=cart.findIndex(item=>item.id===goods.id)
            if(index==-1){
                const cartData={
                    ...goods,
                    selected:true,
                    buyNumber:this.buyNumber,
                }
                cart.push(cartData)
            }else{
                const buyNumber=cart[index].buyNumber;
                const selected=cart[index].selected
                cart[index]={
                    ...goods,
                    selected:selected,
                    buyNumber:this.buyNumber+buyNumber,
                }
            }
            Storage.setItem('cart',cart)
            alert('添加购物车成功')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.add-cart{
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    text-align: center;
    color: $color-a;
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>