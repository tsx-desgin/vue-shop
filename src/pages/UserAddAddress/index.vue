<template>
<div class="page">
    <Head title="我的收货地址" :back="'/user/address?id='+$route.query.id+'&url='+encodeURIComponent($route.query.url)||backUrl"></Head>
    <div class="address">
        <div class="row border-bottom">
            <label class="title">收货人</label>
            <input type="text" class="input" placeholder="请输入收货人姓名">
        </div>
        <div class="row border-bottom">
            <label class="title">联系电话</label>
            <input type="text" class="input" placeholder="请输入收货人手机号码">
        </div>
        <div class="row border-bottom">
            <label class="title">选择地址</label>
            <div class="input region-input">
                地区信息
                <span class="icon">&#xe60c;</span>
            </div>
        </div>
        <div class="row border-bottom">
            <label class="title">详细地址</label>
            <textarea class="textarea" placeholder="街道门牌信息"></textarea>
        </div>
    </div>
</div>
</template>
<script>
import Head from "@/components/head"
// import {Token} from "../../utils/token"
// const USER_TOKEN=Token.getToken();
// const MAX_ADDRESS_NUM=10;
export default {
    components:{
        Head
    },
    data(){
        return{
            backUrl:'',
        }
    },
    computed:{
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
        })//通过next()来渲染
    },
    mounted(){
       
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding: $head-h 0 .9rem;
  box-sizing: border-box;
  background: #fff;
  .address{
      width: 100%;
      .row{
          width: 100%;
          height: 1rem;
          box-sizing: border-box;
          padding: 0 .2rem;
          font-size: .32rem;
          padding: .2rem;
          @include flex;
          .title{
              width: 0;
              flex: 1;
              color: #333;
          }
          .input{
              width: 5.2rem;
              line-height: .4rem;
              font-size: .28rem;
          }
          .region-input{
              @include flex($justify:space-between);
              color: #999;
          }
          .textarea{
              width: 5.2rem;
              font-size: .28rem;
              line-height: .42rem;
              resize: none;
          }
      }
  }
}
</style>