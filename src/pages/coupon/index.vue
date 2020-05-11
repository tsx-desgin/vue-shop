<template>
<div class="page">
    <Head title="优惠券" :back="backUrl"></Head>
    <div class="user-point">
        <div class="title">当前积分</div>
        <div class="point">{{point}}</div>
    </div>
    <div class="coupon-list">
        <div v-for="item of coupon" :key="item.id" class="coupon-item">
            <div class="coupon-money">
                ¥<span class="money">{{item.money|formatPrice}}</span>
            </div>
            <div class="coupon-desc">
                <div class="coupon-name">{{item.money|formatPrice}}元优惠券</div>
                <div class="coupon-time">有效期到{{item.time|handlerTime}}</div>
                <div class="coupon-condition">{{item.limit_total>0?`订单满${item.limit_total}元可用`:'无门槛使用'}}</div>
                <div class="coupon-points" v-show="item.points>0">{{item.points}}积分</div>
            </div>
            <div class="exchange" :class="{'not-exchange':!item.canExchange}" @click="exchange(item.id)">{{item.text}}</div>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
import {filters} from '@/utils/mixins'
import {dateFormat,formatPrice} from '@/utils/function'
import {Storage} from '@/utils/storage'
const USER_TOKEN=Token.getToken();
export default { 
    components:{
        Head
    },
    data(){
        return{
            backUrl:'',
            coupon:[],
            point:0
        }
    },
    // 混入插件的使用
    mixins:[filters],
    filters:{
        handlerTime(day){
            const time=Date.now()+day*24*3600*1000
            return dateFormat('YYYY.MM.dd',new Date(time))
        }
    },
    async mounted(){
        this.backUrl=this.$route.query.url||'/';
        await this.getUserPointes()
        await this.getCoupon()
    },
    methods:{
        exchange(id){
            const index=this.coupon.findIndex(item=>item.id===id);
            const coupon=this.coupon[index];
            if(coupon.points>0 && coupon.points>this.point){
                this.$showToast('积分不足')
                return
            }
            this.$showLoading()
            this.axios.post('shose/coupon/get',{
                coupon_id:id,
            },{
                headers:{
                    token:USER_TOKEN
                }
            }).then(()=>{
                this.$showToast({
                    message:'领取成功'
                })
                Storage.deleteItem('coupon')
            }).catch(err=>{
                this.$showToast({
                    message:err.message||'兑换失败'
                })
            }).finally(()=>{
                this.$hideLoading()
            })
        },
        async getCoupon(){
            const coupon= await this.axios.get('shose/coupon');
            this.coupon=coupon.map(item=>{
                if(item.is_use===1){
                    let text='';
                    let canExchange=true
                    item.limit_total=formatPrice(item.limit_total);
                    if(item.points===0){
                        text='立即领取'
                    }else{
                        if(item.points>this.point){
                            text='积分不足'
                            canExchange=false;
                        }else{
                            text='立即兑换'
                            canExchange=true;
                        }
                    }
                    item.text=text;
                    item.canExchange=canExchange;
                    return item
                }
            })
        },
        async getUserPointes(){
            this.point=await this.axios.get('shose/user-points',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res=>res.points)
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
    .user-point{
        width: 100%;
        height: 1.6rem;
        .title{
            width: 100%;
            line-height: .7rem;
            text-align: center;
            color: $color-d;
            font-size:.32rem ;
        }
        .point{
            width: 100%;
            line-height: .9rem;
            text-align: center;
            color: $color-a;
            font-size:.84rem ;
            font-weight: 700;
        }
    }
    .coupon-list{
        width: 100%;
        height:auto;
        padding: 0 .2rem;
        box-sizing: border-box;
        margin-top:.9rem;
        .coupon-item{
            width: 100%;
            height: 1.4rem;
            margin-bottom: .2rem;
            box-sizing: border-box;
            @include flex;
            position: relative;
            .exchange{
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                width: 1.4rem;
                height: .58rem;
                @include flex;
                box-sizing: border-box;
                border:1px solid $color-a;
                border-radius:.3rem ;
                font-size:.26rem ;
                font-weight: 600;
                color: $color-a;
                &.not-exchange{
                    color: #999;
                    border:1px solid #999;
                }
            }
            .coupon-money{
                width: 2.3rem;
                height: 100%;
                background:$color-a;
                color: #ffffff;
                @include flex($align:baseline);
                line-height: 1.4rem;
                font-size: .5rem;
                .money{
                    font-size: .84rem;
                    // font-weight: 700;
                }
            }
            .coupon-desc{
                width: 0;
                height: 100%;
                flex: 1;
                margin-left: .2rem;
                @include flex(column,$justify:space-around,$align:flex-start);
                font-size:.28rem;
                color: #333333;
                .coupon-points{
                    color: $color-a;
                }
            }
        }
    }
}
</style>