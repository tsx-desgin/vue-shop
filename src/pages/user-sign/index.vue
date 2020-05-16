<template>
<div class="page">
    <Head title="签到" back="/user"></Head>
    <div class="sign-week-container border-bottom">
        <div class="sign-week">
            <div class="sign-days" v-for="item of signDays" :key="item.day">
                <div class="week" :class="{active:item.isDays}">{{item.week}}</div>
                <div class="day" :class="{active:item.hasData,today:item.isDays}">{{item.day}}</div>
            </div>
        </div>
    </div>
    <div class="user-level-container" v-show="show">
        <div class="user-level-wrapper">
            <div class="user-level-text">
                <span>已经连续签到<em class="serial-sign">{{userLevel.serial_sign}}</em>天</span>
                <span class="icon" v-if="canSign" @click="sign">&#xe60e;</span>
            </div>
            <div class="user-level-progress">
                <div class="user-level-point">
                    <span>{{userLevel.level_points}}</span>
                    <span>{{userLevel.next_level_points}}</span>
                </div>
                <div class="user-points" ref="points">
                    {{userLevel.points}}
                </div>
                <progress class="mypro" :max="userLevel.next_level_points" :value="userLevel.points"></progress>
                <div class="user-level-point">
                    <span>lv{{userLevel.level}}</span>
                    <span>lv{{userLevel.next_level}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
import {Token} from "../../utils/token"
export default {
    components:{
        Head
    },
    data(){
        return{
            signDays:[],
            userLevel:{},
            canSign:true,
            // points:30,
        }
    },
    watch:{
        'userLevel.points' (val){
            if(Object.keys(this.userLevel).length>0){
                const total = this.userLevel.next_level_points;
                const per=(val/total)*100;
                console.log(per)
                this.$refs.points.style.left = per+'%';
                if(per>=10){
                    this.$refs.points.style.display='block'
                }else{
                    this.$refs.points.style.display='none'
                }
            }
        }
    },
    computed:{
        show(){
            return !!Object.keys(this.userLevel).length
        }
    },
    mounted(){
        this.getUserSign()
    },
    methods:{
        async getUserSign(){
            const token = Token.getToken()
            const res = await this.axios.get('shose/user/sign',{
                headers:{
                    token
                }
            })
            const today=new Date().getDate()
            const signDays=res.list.map(item=>{
                item.day=parseInt(item.day)
                item.isDays=false;
                if(today===item.day){
                    item.isDays=true
                    this.canSign=!item.hasData
                }
                return item;
            })
            this.signDays=signDays;
            this.userLevel=res.user;
            console.log(signDays,res)
        },
        sign(){
            const token =Token.getToken()
            this.$showLoading();
            this.axios.post('shose/user/sign',{},{
                headers:{
                    token
                }
            }).then(()=>{
                  this.$showToast({
                    message:'签到成功',
                    callback:()=>{
                        this.getUserSign()
                    }
                })
            }).catch(err=>{
                this.$showToast({
                    message:err.message
                })
            }).finally(()=>{
                this.$hideLoading()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  padding-top:$head-h;
  .sign-week-container{
      width: 100%;
      height: .88rem;
      background:#fff;
      margin-top:.2rem;
      .sign-week{
          width: 100%;
          height: 100%;
          padding: 0 .6rem;
          box-sizing: border-box;
          @include flex;
          .sign-days{
              width: 14.285%;
              height: 100%;
              @include flex(column,space-between);
              color: #999;
              .week{
                  width:100%;
                  height: 50%;
                  @include flex;
                  font-size: .3rem;
                  &.active{
                      color: #333;
                  }
              }
               .day{
                  width:.4rem;
                  height: .4rem;
                  @include flex;
                  font-size: .26rem;
                  color:#666;
                  border-radius: 50%;
                  @include flex;
                   &.active{
                      color: #fff;
                      background: $color-a;
                        &.today{
                          color: #fff;
                        }
                  }
                   &.today{
                    color: #333;
                  }
              }
          }
      }
  }
  .user-level-container{
      width: 100%;
      margin-top:.6rem ;
      padding: 0 .4rem;
      height: 2.54rem;
      box-sizing: border-box;
     .user-level-wrapper{
         width: 100%;
         height: 100%;
         background:$color-a;
         border-radius: .1rem;
         color:#fff;
         padding: 0 .2rem;
         box-sizing: border-box;
         .user-level-text{
             width: 100%;
             height: 1rem;
             @include flex($justify:space-between);
             font-size: .3rem;
             .serial-sign{
                 font-size: .45rem;
                 margin:0 .1rem ;
             }
             .icon{
                 font-size: .4rem;
             }
         }
         .user-level-progress{
             width: 100%;
             height: 1.5rem;
             @include flex(column);
             position: relative;
             .user-level-point{
                 width: 100%;
                 @include flex($justify:space-between);
                 height: .5rem;
                 font-size: .32rem;
             }
             .user-points{
                 font-size: .24rem;
                 padding: 0 .2rem;
                 height: .4rem;
                 background: #eecf8b;
                 @include flex;
                 border-radius: .06rem;
                 position: absolute;
                 left: 0;
                 top: 0.2rem;
                 line-height: .4rem;
                 transform: translateX(-50%);
                 &::after{
                     content: '';
                     position: absolute;
                     width: 0;
                     height: 0;
                     bottom: -.2rem;
                     border-width:.1rem;
                     border-style: solid;
                     border-top-color:#eecf8b ;
                     border-right-color:transparent;
                     border-bottom-color:transparent ;
                     border-left-color:transparent;
                     left: 50%;
                     transform: translateX(-50%);
                 }
             }
         }
     }
  }
//   进度条
  .mypro{
        background: #ffffff;
        width: 100%;
        height: .1rem;
        margin: .2rem 0;
        border-radius: .05rem;
        appearance: none;
        -webkit-appearance: none;
    }
    ::-ms-fill{
        background: #eecf8b;
        border-radius: .05rem;
    }
    ::-moz-progress-bar{
        background:  #eecf8b;
        border-radius: .05rem;
    }
    ::-webkit-progress-bar{
        background: #ffffff;
        border-radius: .05rem;
    }
    ::-webkit-progress-value{
        background:  #eecf8b;
        border-radius: .05rem;
    }
}
</style>