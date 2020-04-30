<template>
<div>
    <Head :showMenuicon="showMenuicon" :opacity="opacity" :scrollTab="scrollTab" @change="change"></Head>
    <div class="page" ref="page">
        <div style="height:3000px;">
            <div id="goods">
                <gallery :gallery="gallery"></gallery>
            </div>
            <div id="goods" style="height:200px">商品</div>
            <div id="comment" style="height:200px">详情</div>
            <div id="detail">评论</div>
        </div>
    </div>
</div>
</template>
<script>
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
    async mounted(){
        this.getGoods()
        this.initScroll()
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
            scrollTab:'goods'
        }
    },
    methods:{
        change(goods){
            this.scrollTab=goods;
            this.scroll.scrollToElement('#'+goods+'',300,0,50)
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
                    const opacity =y/150;
                    this.opacity=opacity > 1 ? 1 : opacity;
                    if(y>70){
                        this.showMenuicon=false
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
    height: 1000px;
    overflow: hidden;
    background: $color-c;
}
</style>