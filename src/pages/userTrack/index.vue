<template>
<div class="page">
    <Head title="我的足迹" back='/user'></Head>
    <div class="time-container">
        <div class="history-time-container border-bottom">
            <div class="history-time">
                <div class="history-time-cell" v-for="(item,index) of time" :key="item.day">
                    <div class="week">{{item.week}}</div>
                    <div class="day" @click="changeTime" :data-index="index" :data-time="item.time" :class="{active:item.active===1}">{{item.day}}</div>
                    <div class="dist icon" :class="{active:item.number>0}">&#xe611;</div>
                </div>
            </div>
          <div class="show-btn icon" v-html="showIcon" @click="showList=!showList"></div>
        </div>
    </div>
    <div class="histoty-list-container" v-show="showList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div v-for="(item,index) of history" :key="index" class="history-item">
            <div class="time">{{item.time}}</div>
            <div class="goods-list">
                <div class="goods-cell" v-for="val of item.list" :key="val.id">
                    <img :src="val.img" alt="">
                    <span class="goods-price">¥{{val.price|formatPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
import infiniteScroll from 'vue-infinite-scroll'
import { dateFormat } from "../../utils/function";
import {filters} from "../../utils/mixins"
export default {
     // 调用无限滚动
    directives: {infiniteScroll},
    components:{
        Head
    },
    mixins:[filters],
    data(){
        return{
            time:[],
            showList:true,
            busy:false,
            page:1,
            hasMore:true,
            list:[],
            postTime:0,
        }
    },
    computed:{
        showIcon(){
            return this.showList?'&#xe614;':'&#xe62c;'
        },
        history(){
            const res=[]
            this.list.forEach(item=>{
               let index=res.findIndex(val=>
                   item.day===val.day)
                const goods={
                    id:item.goods_id,
                    img:item.goods_img,
                    price:item.price,
                }
                console.log(index)
                if(index>-1){
                    res[index].list.push(goods)
                }else{
                    const time=item.day.toString();
                    const y = time.substr(0,4);
                    const m = time.substr(4,2);
                    const d = time.substr(-2);
                    console.log(y,m,d) 
                    res.unshift({
                        day:item.day,
                        time:dateFormat('Y年M月d日',new Date(`${y}-${m}-${d}`)),
                        list:[goods]
                    })
                }
            })
            // console.log(res)
            return res
        }
    },
    mounted(){
        document.querySelector('.page').style.height=document.documentElement.offsetHeight+'px'
        this.getHistoryTime()
    },
    methods:{
        changeTime(e){
            // console.log(e)
            this.postTime =parseInt(e.target.dataset.time);
            const currentIndex=parseInt(e.target.dataset.index);
            this.time.forEach((item,index)=>{
                if(currentIndex===index){
                    item.active=1
                }else{
                    item.active=0
                }
            })
            this.list=[];
            this.busy=false;
            this.page=1;
            this.hasMore=true;
            this.loadMore()
        },
        async getHistoryTime(){
            const token =Token.getToken()
            const time = await this.axios.get('shose/history/time',{
                headers:{
                    token
                }
            })
            this.time=time;
            // console.log(time)
        },
        async loadMore(){
            this.busy=true;
            if(this.hasMore){
                const token =Token.getToken()
                const res = await this.axios.get('shose/history/get',{
                    params:{
                        page:this.page,
                        time:this.postTime,
                    },
                    headers:{
                        token
                    }
                })
                this.page=parseInt(res.page)+1;
                if(res.list.length>0){
                    this.list=this.list.concat(res.list)
                    this.busy=false
                }else{
                    this.hasMore=false
                }
                // console.log(res)
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
  background: $color-c;
  padding-top:$head-h +.88rem+.4rem;
  box-sizing: border-box;
  .time-container{
      width: 100%;
      position: fixed;
      top: .88rem;
      left: 0;
  }
  .history-time-container{
      width: 100%;
      height: .88rem;
      background:#fff;
      padding:.2rem 0;
      position: relative;
      .show-btn{
          position: absolute;
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          border: 1px solid #fcfcfc;
          background: #fff;
          @include flex;
          right: .25rem;
          line-height: .5rem;
          box-sizing: border-box;
      }
      .history-time{
          width: 100%;
          height: 100%;
          padding: 0 .6rem;
          box-sizing: border-box;
          @include flex;
          .history-time-cell{
              position: relative;
              width: 14.285%;
              height: 100%;
              @include flex(column,space-between);
              color: #999;
              .week{
                  width:100%;
                  height: 50%;
                  @include flex;
                  font-size: .3rem;
              }
               .day{
                  width:.4rem;
                  height: .4rem;
                  @include flex;
                  font-size: .26rem;
                  color:#333;
                  border-radius: 50%;
                   &.active{
                      color: #fff;
                      background: $color-a;
                    }
               }
          }
      }
    .dist{
        color: #fff;
        position: absolute;
        bottom: -.26rem;
        &.active{
            color: $color-a;
        }
    }
  }
  .histoty-list-container{
    width: 100%;
    padding: .2rem;
    // background: #fff;
    box-sizing: border-box;
    .time{
        width: 100%;
        line-height: .6rem;
        font-size: .26rem;
        color:#666;
    }
    .goods-list{
        width: 100%;
        @include flex($justify:flex-start);
        flex-wrap: wrap;
        .goods-cell{
            width: 2.23rem;
            height: 2.6rem;
            margin-left: .2rem;
            background: #fff;
            margin-bottom:.2rem ;
            @include flex(column,$align:flex-start);
            &:nth-child(3n+1){
                margin-left:0 ;
            }
            img{
                width: 100%;
                height: 2rem;
            }
            .goods-price{
                color:$color-a;
                text-indent: .2rem;
                line-height: .6rem;
                font-size: .28rem;
                font-weight: bold;
            }
        }
    }
  }
}
</style>