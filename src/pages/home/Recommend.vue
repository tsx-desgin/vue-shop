<template>
<container title="精品推荐" morePath="/goods-list">
    <template #content>
    <div class="goods-list-container" ref="wrapper">
        <div class="goods-list" ref="Recomend_list" v-if="show">
            <div class="goods-item border" v-for="item of recList"  :key="item.id" >
                <img v-lazy="item.img" alt="" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">¥{{item.price|formatPrice}}</div>
                </div>
            </div>
        </div>
    </div>
    </template>
</container>
</template>
<script>
import BScroll from 'better-scroll';
import {formatPrice} from '@/utils/function'
import container from "./container"
export default {
    props:{
        recList:Array,
    },
    components:{
        container
    },
    watch: {
     recList(newList){
        if(newList.length>0){
            this.$nextTick(() => {
                this.initScroll();
            })
        }
      }
    },
    data(){
        return{
            scroll:null,
            scrollOptions:{
                startX:0,
                click:true,
                scrollX:true,
                scrollY:false,
                eventPassthrough:'vertical' //忽略竖直方向的滚动
            }
        }
    },
    computed:{
        show(){
        return !!this.recList.length;
    },
  },
  filters:{
      formatPrice(price){
        return formatPrice(price)
      }
  },
    methods:{
        initScroll(){
            const goodsListWidth=this.recList.length*2.2;
            this.$refs.Recomend_list.style.width = goodsListWidth+'rem';
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, this.scrollOptions)
              console.log(this.scroll)
            } else {
              this.scroll.refresh()//重新属性Bscroll状态
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list-container{
    width:100%;
    height:3.2rem;
    margin-top: .2rem;
    overflow: hidden;
    .goods-list{
        height: 100%;
        @include flex();
    }
    .goods-item{
        width: 2rem;
        height: 100%;
        margin-right: .2rem;
        border-radius: .1rem;
        overflow: hidden;
        @include flex($direction:column);
        .goods-img{
            width: 100%;
            height:2.08rem;
        }
        .goods-info{
            width:90%;
            height: 0;
            flex: 1;
            margin-bottom: .2rem;
            @include flex($direction:column,$justify:space-between);
            .goods-name{
                width: 100%;
                height: .3rem;
                font-size: .2rem;
                line-height: .3rem;
                color:$color-d;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: 600;
            }
            .goods-price{
                font-weight: 600;
                font-size: .28rem;
                color:$color-a;
                width: 90%;
            }
        }
    }
}
</style>