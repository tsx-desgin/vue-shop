<template>
<div class="Recomend-container">
    <div class="title">
        <span>精品推荐</span>
        <span class="icon more">更多 &#xe63c;</span>
    </div>
    <div class="goods-list-container">
        <div class="goods-list" ref="Recomend_list" v-if="show">
            <div class="goods-item" v-for="item of recList"  :key="item.id" >
                <img :src="item.img" alt="" class="goods-img">
                <div class="goods-info">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">{{item.price}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
// import BScroll from 'better-scroll';
export default {
    props:{
        recList:Array,
    },
     mounted() {
      this.$nextTick(() => {
        this.initScroll();
      })
    },
    computed:{
    show(){
      return !!this.recList.length;
    },
    data(){
        return{
            scroll:null,
            scrllOptions:{
                startX:0,
            }
        }
    }
  },
    methods:{
        initScroll(){
            const goodsListWidth=this.recList.length*2.2;
            this.$refs.Recomend_list.style.width = goodsListWidth+'rem';
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.wrapper, {})
              this.scroll.on('touchend', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                  this.loadData()
                }
              })
            } else {
              this.scroll.refresh()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.Recomend-container{
    @include container(4.1rem);
    .title{
        width:100%;
        @include flex($justify:space-between);
        height: .32rem;
        font-size: .32rem;
        font-weight:700;
        border-left: .06rem solid $color-a;
        text-indent: .2rem;
        color: $color-b;
        .more{
            font-size: .24rem;
            color: $color-d;
            font-weight:400;
        }
    }
    .goods-list-container{
        width:100%;
        height:3.2rem;
        margin-top: .2rem;
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
        }
    }
}
</style>