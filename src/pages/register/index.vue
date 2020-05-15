<template>
<div class="page">
    <Head title="注册" :back="`/login?url=${encodeURIComponent(loginR)}`"></Head>
    <div class="content" ref="content">
        <div class="login-container">
            <div class="login-content">
                <div class="login-input">
                    <span>昵称</span>
                    <input type="text" v-model.trim="nickname" placeholder="请输入昵称">
                </div>
                <div class="login-input border-bottom">
                    <span>账号</span>
                    <input type="text" v-model.trim="username" placeholder="请输入账号">
                </div>
                <div class="login-input">
                    <span>密码</span>
                    <input type="password" v-model.trim="userpwd" placeholder="请输入密码">
                </div>
                <div class="login-input">
                    <span>确认密码</span>
                    <input type="password" v-model.trim="confirmPwd" placeholder="请输入确认密码">
                </div>
            </div>
            <div class="login-btn">
                <div class="submit" @click="register">注册</div>
            </div>
            <div class="login-desc">
                <router-link :to="`/login?url=${encodeURIComponent(loginR)}`">去登录</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Head from "@/components/head"
import registerValidate from "../../validate/register"
import {validate} from '../../utils/function'
export default {
    components:{
        Head
    },
    data(){
        return{
            backUrl:'',
            username:'',
            userpwd:'',
            nickname:'',
            confirmPwd:'',
            loginR:'',
            
        }
    },
     mounted(){
        document.querySelector('.page').style.height=document.documentElement.offsetHeight-44+'px';
        this.loginR = this.$route.query.url||'/';
    },
    methods:{
        register(){
            const data={
                username:this.username,
                password:this.userpwd,
                confirmPwd:this.confirmPwd,
                nickname:this.nickname,
            }
            const res=validate(data,registerValidate);
            if(res.error!=0){
                this.$showToast({
                    message:res.message
                })
                return
            }
            this.axios.post('shose/user/register',data).then(()=>{
                this.$router.push(`/login?url=${encodeURIComponent(this.loginR)}`)
            }).catch(err=>{
                this.$showToast({
                    message:err.message
                })
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
//   min-height: 100%;
  background: $color-c;
  padding-top:$head-h ;
}
.login-container{
    width: 100%;
    padding: .4rem 0;
    box-sizing: border-box;
    .login-content{
        width: 100%;
        background: #fff;
        .login-input{
            width: 100%;
            height: 1rem;
            @include flex;
            span{
                width: 1.5rem;
                height: 100%;
                line-height: 1rem;
                text-indent: .2rem;
            }
            input{
                flex:1;
                height: 100%;
            }
        }
    }
    .login-btn{
        width: 100%;
        height: 1rem;
        color: #fff;
        font-size:.32rem ;
        background: $color-a;
        margin-top: .4rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        border-radius:.1rem ;
            .submit{
                width: 100%;
                height: 100%;
                @include flex;
            }
    }
    .login-desc{
        line-height: 1rem;
        text-align: right;
        font-size: .28rem;
        color: $color-a;
        padding-right:.2rem ;
    }
}
</style>
