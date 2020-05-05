<template>
<div class="container">
    <Head :showMenuicon="showMenuicon" :opacity="opacity" :scrollTab="scrollTab" @change="change"></Head>
    <div class="page" ref="page">
        <div style="height:6500px">
            <div id="goods">
                <gallery :gallery="gallery"></gallery>
            </div>
            <div id="goods" class="goods">
                <div class="price">
                    <span class="real_price">￥{{goods.goods_price}}</span>
                    <span class="market_price">价格: ￥{{goods.market_price}}</span>
                </div>
                <div class="goods-name">
                    {{goods.goods_name}}
                </div>
                <div class="module">
                    <span>快递：0.00</span>
                    <span>月销量：{{goods.sale_num}}件</span>
                    <span>湖南长沙</span>
                </div>
            </div>
            <div class="coupon" @click="getCoupon">优惠<span class="icon youhui">&#xe605;</span> 领取优惠券<span class="icon">领取 &#xe60c;</span></div>
            <div id="comment">
                <div class="title">
                    <span>商家评论（{{comment.count}}）</span>
                    <span class="more icon">查看更多 &#xe60c;</span>
                </div>
                <ul class="content-container">
                    <li class='item' v-for="item of comment.list" :key="item.id">
                        <div class="head">
                            <span class="icon">&#xe618;</span>
                            <span class="name">  {{item.username}}</span>
                        </div>
                        <div class="content">
                            {{item.content}}
                        </div>
                    </li>
                </ul>
            </div>
            <div id="detail">
                <div class="title">
                    <div class="cell"><hr></div>
                    <span>详情</span>
                </div>
                <div class="img">
                    <div class="banner" v-for="item of goods.content" :key="item">
                        <img :src="item" alt="" srcset="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-left">
            <div class="footer-ceil" @click="$router.push('/')">
                <span class="icon">&#xe62b;</span>
                店铺
            </div>
            <div class="footer-ceil">
                <span class="icon">&#xe62d;</span>
                客服
            </div>
            <div class="footer-ceil" :class="{colect:is_Colect}" @click="colect">
                <span class="icon">{{is_Colect?'&#xe628;':'&#xe60f;'}}</span>
                {{is_Colect?'已收藏':'收藏'}}
            </div>
        </div>
        <div class="footer-right border-top">
            <div class="cart">加入购物车</div>
            <div class="buy">立即购买</div>
        </div>
    </div>
</div>
</template>
<script>
import {Token} from "@/utils/token"
import gallery from './gallery'
import Head from "./header"
import BScroll from 'better-scroll';
export default {
    components:{
        Head,
        gallery,
    },
    props:{
        id:Number,
    },
    mounted(){
        this.getGoods()
        this.initScroll()
        this.initColect()
        Token.delToken()
    },
    data(){
        return{
            scrollOptions: {
                click: true,
                // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
                probeType: 3,
                startY: 0,
                scrollbar: false,//滚动条
                scrollX:false,
                scrollY:true,
                listenScroll:true,
            },
            comment:{},
            gallery:[],
            goods:{},
            scroll:null,
            showMenuicon:true,
            show:true,
            opacity:0,
            scrollTab:'goods',
            is_Colect:false,
        }
    },
    methods:{
        getCoupon(){

        },
        async initColect(){
            // 判断是否登录
        },
        colect(){
            // 判断是否登录
            const token=Token.getToken();
            if(token===''){
                const url=encodeURIComponent('/goodsDetail/'+this.id)
                this.$router.push('/login?url='+url+'')
            }
            // 没有登录则跳转至登录页面
            // 若已登录，则判断是收藏还是取消收藏
        },
        change(goods){
            this.scrollTab=goods;
            this.scroll.scrollToElement('#'+goods+'')
        },
        initScroll(){
             this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.page, this.scrollOptions)
                    } else {
                    this.scroll.refresh() // 重新属性BScroll状态
                }
                this.scroll.on('scroll',positon=>{
                    const y=Math.abs(positon.y);
                    const opacity =y/100;
                    this.opacity=opacity > 1 ? 1 : opacity;
                    // console.log(y)
                    if(y>70){
                        this.showMenuicon=false
                        this.scrollTab='comment';
                        if(y>130){
                            this.scrollTab='detail';
                        }
                    }else{
                        this.showMenuicon=true
                    }
                });
                // this.scroll.scrollToElement('#detail',300,0,50)
            })
        },
        getGoods(){
            this.axios.get(`api/goods?goods_id=${this.id}`).then(result=>{
                const {comment:commentList,commentTotal,gallery,goods}=result
                this.comment={
                    list:commentList,
                    count:commentTotal,
                }
                this.gallery=gallery,
                this.goods=goods
                console.log(commentList,commentTotal,gallery,goods)
                
            }).catch(err=>{
                this.$router.push('/notfind')
                console.log(err)
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 4000px;
    overflow: hidden;
    background: $color-c;
    z-index: 1000;
    .goods{
        width: 100%;
        height: auto;
        padding: 0 .2rem .2rem .2rem;
        box-sizing: border-box;
        background:#fff;
        .price{
            width: 100%;
            height: 1.12rem;
            @include flex($direction:column,$align:flex-start,$justify:space-around);
            .real_price{
                color: #ff0036;
                font-size: .48rem;
            }
            .market_price{
                font-size: .24rem;
                color: #888;
                text-decoration: line-through;
            }
        }
        .goods-name{
            line-height: .4rem;
            overflow: hidden;
        }
        .module{
            font-size: .24rem;
            color: $color-f;
            @include flex($justify:space-between);
            line-height: .6rem;
        }
    }
    .coupon{
        width: 100%;
        line-height: .8rem;
        background: #fff;
        margin-top:.2rem ;
        @include flex($justify:space-between);
        padding:0 .24rem;
        box-sizing: border-box;
        .icon{
            color: $color-f;
        }
        .youhui{
            color: #ff0036;
        }
    }
    #comment{
        width: 100%;
        height: auto;
        background: #fff;
        margin-top:.2rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        .title{
            line-height: .8rem;
            height: .8rem;
            @include flex($justify:space-between);
        }
        .more{
            color: #ff0036;
        }
        .content-container{
            width: 100%;
            height: .8rem;
            overflow: hidden;
            .item .head{
                color: $color-a;
                font-size: .24rem;
                line-height: .32rem;
            }
            .name{
                color: $color-f;
            }
        }
        .content{
            @include flex($justify:flex-start);
            width: 100%;
            line-height: .5rem;
        }
    }
    #detail{
        width: 100%;
        position: relative;
        .title{
            // display: block;
            position: relative;
            width: 100%;
            height: .36rem;
            color: $color-f;
            text-align: center;
            margin: 0 0 .2rem;
            padding: 0 2.25rem;
            box-sizing: border-box;
            line-height: .36rem;
            margin-top:.2rem;
            z-index: 1000;
            @include flex;
            // top: .2rem;
        }
        .cell{
            width: 100%;
            height: .2rem;
            border-width: .2rem;
            position: absolute;
            top: .1rem;
            z-index: 900;
            padding: 0 2.25rem;
            box-sizing: border-box;
            // background: chocolate;
        }
        .img{
            width: 100%;
            img{
                width: 100%;
                height: 13rem;
            }
        }
    }
}
.footer{
    width: 100%;
    height: 1rem;
    background: #fff; 
    position: fixed;
    bottom: 0;
    left: 0;
    @include flex;   
    .footer-left{
        width: 50%;
        height: 100%;
        @include flex($justify:space-around);
        color: $color-f;
        .footer-ceil{
            width: 33.33%;
            height: 100%;
            @include flex(column);
            font-size:.24rem;
            .icon{
                margin-bottom:.1rem ;
                font-size:.3rem;
            }
            &.colect{
                color: #ff0036;
            }
        }
    }
    .footer-right{
        width: 50%;
        height: 100%;
        @include flex;
        .cart,.buy{
            width: 50%;
            height: 100%;
            color: #fff;
            @include flex;
            background: #ff9500;
            font-size: .3rem;
        }
        .buy{
            background: #ff0036;
        }
    }    
}
</style>