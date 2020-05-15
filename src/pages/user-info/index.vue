<template>
<div class="page">
    <Head title="用户信息" back="/user"></Head>
    <div class="user-Info" v-if="this.user!=null">
        <div class="avatar">
            <img v-lazy="user.avatar" alt="" class="user-avatar">
            <input type="file" accept="image/*" @change="chooseAvatar">
            <div class="content">点击头像可切换头像</div>
        </div>
        <div class="row border-bottom">
            <label>账号:</label>
            <div class="row-content">
                {{user.username}}
            </div>
        </div>
        <div class="row border-bottom">
            <label>昵称:</label>
            <div class="row-content">
                <input type="text" placeholder="请输入昵称" v-model.trim="user.nickname">
            </div>
        </div>
        <div class="row border-bottom">
            <label>性别:</label>
            <div class="row-content">
                <label><input type="radio" value="0"  v-model="user.sex" class="radio">隐藏</label>
                <label><input type="radio" value="1"  v-model="user.sex" class="radio">男</label>
                <label><input type="radio" value="2"  v-model="user.sex" class="radio">女</label>
            </div>
        </div>
        <div class="row border-bottom">
            <label>生日:</label>
            <div class="row-content" @click="chooseBorn">
                {{user.born||'请选择'}}
            </div>
        </div>
         <div class="row border-bottom">
            <label>级别:</label>
            <div class="row-content">
                lv{{user.level}}
            </div>
        </div>
        <div class="row border-bottom">
            <label>积分:</label>
            <div class="row-content">
                {{user.points}}
            </div>
        </div>
        <div class="save-btn">
           <div class="submit" @click="save">保存</div>
        </div>
    </div>
    <div class="empty" v-else>
        <span class="icon">&#xe6b0;</span>
        <div class="content">对不起,加载失败,请<router-link to="/user" class="href">点击此处</router-link>重新加载</div>
    </div>
    <awesome-picker
        ref="picker"
        type="date"
        @confirm="handlePickerConfirm">
    </awesome-picker>
</div>
</template>
<script>
import Head from '../../components/head'
import { mapState ,mapActions} from 'vuex'
import {Token} from "../../utils/token"
export default {
    components:{
        Head,
    },
    computed:{
        ...mapState(['user']),
        reset(){
            return this.$store.getters.reset;
        }
    },
    mounted(){
        this.getUser
        console.log(this.user)
    },
    methods:{
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
        chooseBorn(){
            this.$refs.picker.show();
        },
        handlePickerConfirm(data){
            this.user.born=`${data[0].value} ${data[1].value} ${data[2].value}`
        },
        save(){
            const token=Token.getToken()
            if(this.user.nickname===''){
                this.$showToast({
                    message:'昵称不能为空'
                })
                return
            }
            if(this.user.born===''){
                this.$showToast({
                    message:'生日不能为空'
                })
                return
            }
            const data=new FormData()
            data.append('nickname',this.user.nickname)
            data.append('sex',this.user.sex)
            data.append('born',this.user.born)
            this.$showLoading()
            this.axios.post('shose/user/update',data,{
                headers:{
                    token
                }
            }).then(()=>{
                this.$showToast({
                    message:'保存成功',
                    callback:()=>{
                        this.$router.push('/user')
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
  background: $color-c;
  padding-top:$head-h;
  .user-Info{
      width: 100%;
      background: #fff;
      .avatar{
          width: 100%;
          height: 3rem;
          background: #fff;
          position: relative;
          @include flex;
          .img{
              width: 1.5rem;
              height: 1.5rem;
              border: 1px solid #fff;
              border-radius: 50%;
          }
          input{
              position: absolute;
              width: 1.5rem;
              height: 1.5rem;
              border-radius:50%;
              opacity: 0;
          }
          .content{
              position: absolute;
              bottom: 0;
              color:$color-a;
          }
      }
      .row{
          width: 100%;
          height: .9rem;
          padding: 0 .2rem;
          box-sizing: border-box;
          @include flex;
          .row-content{
              width: 0;
              flex: 1;
              height: 100%;
              margin-left: .2rem;
              @include flex($justify:flex-end);
              input{
                  text-align: right;
              }
          }
      }
  }
  .radio{
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: .3rem;
    height: .3rem;
    background: url(/radio@.png) no-repeat;
    outline: none;
    background-size: contain;
  }
  .radio:checked{
    background: url(/radio@checked.png) no-repeat left bottom;
    background-size: contain;
  }
  .save-btn{
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
    .empty{
        width: 100%;
        height: 5rem;
        background: cornsilk;
        @include flex;
        .icon{
            color:$color-a;
            font-size: .8rem;
        }
        .href{
          color: $color-a;
         }
    }
}
</style>