<template>
<div class="page">
    <Head title="我的"></Head>
    <div class="user-container">
        <div class="user-wrapper">
            <img v-lazy="user.avatar" alt="" class="user-avatar">
            <input type="file" accept="image/*" @change="chooseAvatar">
            <div class="user">
                <div class="nickname" @click="$router.push('/user/userInfo')">{{user.nickname}}<span>lv{{user.level}}</span></div>
                <div class="user-point">积分: <span class="point">{{user.points}}</span></div>
            </div>
            <div class="user-sign icon" @click="$router.push('/user/userSign')">
                &#xe60e; 签到
            </div>
        </div>
        <div class="order-menu-wrapper">
            <div class="order-menu">
                <div class="title">我的订单
                    <span @click="toUserOrder()" class="icon">查看全部 &#xe60c;</span>
                </div>
                <div class="menu-list">
                    <div class="menu-cell" @click="toUserOrder(1)">
                        <span class="icon">&#xe604;</span>
                        待付款
                    </div>
                    <div class="menu-cell" @click="toUserOrder(2)">
                        <span class="icon">&#xe606;</span>
                        待发货
                    </div>
                    <div class="menu-cell" @click="toUserOrder(3)">
                        <span class="icon">&#xe61e;</span>
                        待收货
                    </div>
                    <div class="menu-cell" @click="toUserOrder(4)">
                        <span class="icon">&#xe738;</span>
                        已完成
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="nav-container">
        <div class="nav">
            <div class="nav-cell border-bottom">
                <span class="icon">&#xe60a;</span>
                <div class="text">我的消息</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom">
                <span class="icon">&#xe610;</span>
                <div class="text">我的收藏</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom" @click="$router.push('/user/address')">
                <span class="icon">&#xe609;</span>
                <div class="text">我的地址</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom" @click="$router.push('/user/userTrack')">
                <span class="icon">&#xe6f2;</span>
                <div class="text">我的足迹</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom" @click="$router.push('/user/userCoupon')">
                <span class="icon">&#xe608;</span>
                <div class="text">我的卡券</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom">
                <span class="icon">&#xe6cb;</span>
                <div class="text">我的积分</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom">
                <span class="icon">&#xe62e;</span>
                <div class="text">在线客服</div>
                <span class="icon more">&#xe60c;</span>
            </div>
            <div class="nav-cell border-bottom">
                <span class="icon">&#xe61a;</span>
                <div class="text">退出系统</div>
                <span class="icon more">&#xe60c;</span>
            </div>
        </div>
    </div>
    <com-footer></com-footer>
</div>
</template>
<script>
import Head from "@/components/head"
import comFooter from "@/components/footer";
import {Token} from "../../utils/token"
import {mapState, mapActions} from 'vuex'
export default {
    components:{
        Head,
        comFooter,
    },
    computed:{
        ...mapState(['user'])
    },
    mounted(){
        this.getUser(this.axios)
        document.querySelector('.page').style.height=document.documentElement.offsetHeight+'px';
    },
    methods:{
        toUserOrder(status=-1){
            this.$router.push('/user/order?status='+status)
        },
        ...mapActions(['getUser']),
        chooseAvatar(e){
            const token=Token.getToken()
            if(e.target.files.length>0){
                const file=e.target.files[0];
                const Reg=/image+/.test(file.type);
                if(!Reg){
                    this.$showToast({
                        message:'文件类型不正确,请选择图片',
                    })
                    return;
                }
                const MaxSize=1024*1024*2;
                if(file.size>MaxSize){
                    this.$showToast({
                        message:'图片过大,请重新选择图片',
                    })
                    return;
                }
                let data = new FormData(); //创建form对象
                data.append('image',file)
                this.$showLoading()
                this.axios.post('api/user/avatar',data,{
                    headers:{
                        token,
                        // 通过二进制的方式传递
                        'Content-Type':'multipart/form-data',
                    }
                }).then(res=>{
                    this.user.avatar=res.src;
                }).catch(err=>{
                    this.$showToast({
                        message:err.message,
                    })
                }).finally(()=>{
                    this.$hideLoading()
                })
            }
        },
    }   
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  background: $color-c;
  padding:$head-h .0rem $footer-h;
  box-sizing: border-box;
  .user-container{
    width: 100%;
    height: 3.86rem;
    background: $color-a;
    border-radius: 0 0 50% 50%/0 0 1rem 1rem;
    .user-wrapper{
        width:100%;
        height: 1.8rem;
        padding: 0 .4rem 0 .2rem;
        box-sizing: border-box;
        @include flex;
        color: #fff;
        position: relative;
        input{
            position: absolute;
            left: 0.2rem;
            top:0.3rem;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            opacity: 0;
        }
        .user-avatar{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: .02rem solid #fff;
            background: #e6ecf4;
        }
        .user{
            width: 0;
            flex: 1;
            margin: 0 .4rem;
            height: .9rem;
            @include flex(column,space-around,$align:flex-start);
            .nickname{
                font-size: .32rem;
                @include flex($justify:space-around);
                flex-wrap:nowrap;
                span{
                   width: .5rem;
                   height: .5rem;
                   font-size: .24rem;
                   border-radius: 50%;
                   background: #eecf8b;
                   @include flex;
                   margin-left:.1rem;
                }
            }
            .point{
                font-weight: 600;
            }
        }
        .user-sign{
            font-size: .32rem;
        }
    }
    .order-menu-wrapper{
        width: 100%;
        height: 2.06rem;
        // background: blue;
        padding: 0 .2rem;
        box-sizing: border-box;
        .order-menu{
            width:100%;
            height: 100%;
            background: #fff;
            border-radius: .1rem;
            // box-shadow:h-shadow v-shadow blur spread color inset;,
            /*
              h-shadow:水平阴影的位置,
              v-shadow:垂直阴影的位置,
              blur:模糊距离,
              spread:阴影的大小,
              color:颜色,
              inset:从外层的阴影（开始时）改变阴影内侧阴影
            */ 
            box-shadow:0 .1rem .3rem 0 #f9d8d5;
            padding:.2rem;
            box-sizing: border-box;
            .title{
                width: 100%;
                height: .4rem;
                @include flex($justify:space-between);
                font-size: .28rem;
                color: #333;
                font-weight: 600;
                .icon{
                    color: #999;
                    font-weight: normal;
                }
            }
            .menu-list{
                width: 100%;
                height: 1.2rem;
                @include flex($justify:space-around);
                .menu-cell{
                    width: 25%;
                    height:100%;
                    @include flex(column);
                    font-size: .24rem;
                    color:#666;
                    .icon{
                        color: $color-a;
                        font-size: .4rem;
                        margin-bottom:.1rem ;
                    }
                }
            }
        }
    }
  }
  .nav-container{
        width: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        margin-top:.2rem;
        .nav{
            width:100%;
            height: 100%;
            background: #fff;
            border-radius: .1rem;
            box-shadow:0 0 .3rem 0 #f9d8d5;
            padding: 0 .2rem;
            box-sizing: border-box;
            .nav-cell{
                width: 100%;
                height:.85rem;
                @include flex($justify:space-between);
                .text{
                    width: 0;
                    flex: 1;
                    height: 100%;
                    @include flex($justify:flex-start);
                    margin-left: .2rem;
                }
                .icon{
                    font-size: .32rem;
                    color:$color-a ;
                    &.more{
                        color:#666;
                    }
                }
            }
        }
    }
}
</style>