<template>
<div class="page">
    <Head title="我的收货地址" :back="'/order/address?id='+$route.query.id+'&url='+encodeURIComponent($route.query.url)||backUrl"></Head>
    <div class="address">
        <div class="row border-bottom">
            <label class="title">收货人</label>
            <input type="text" class="input" placeholder="请输入收货人姓名" v-model="name">
        </div>
        <div class="row border-bottom">
            <label class="title">联系电话</label>
            <input type="text" class="input" placeholder="请输入收货人手机号码" v-model="phone">
        </div>
        <div class="row border-bottom">
            <label class="title">选择地址</label>
            <div class="input region-input" @click="showAddress=true">
                {{region}}
                <span class="icon">&#xe60c;</span>
            </div>
        </div>
        <div class="row border-bottom">
            <label class="title">详细地址</label>
            <textarea class="textarea" placeholder="街道门牌信息" v-model="address"></textarea>
        </div>
        <div class="row border-bottom">
            <label class="title">设置为默认地址</label>
            <div class="switch-container">
                <input type="checkbox" id="user-switch" v-model="isDefault">
                <label for="user-switch"></label>
            </div>
        </div>
    </div>
    <div class="choose-region" v-if="showAddress">
        <div class="mask" @click="showAddress=false"></div>
        <!-- 
            @province 点省所要触发的事件
            @city 点市所要触发的事件
            @area 点区所要触发的事件
            @selected 总的点到最后所要触发的事件
         -->
        <v-distpicker :province="province" :city="city" :area="area" type="mobile"  @selected="selectAddress"></v-distpicker>
    </div>
      <div class="login-btn">
            <div class="submit" @click="save">保存</div>
      </div>
</div>
</template>
<script>
import Head from "@/components/head"
import VDistpicker from 'v-distpicker'
import addressValidate from '../../validate/address'
import {validate} from '../../utils/function'
import {Token} from "../../utils/token"
export default {
    components:{
        Head,
        VDistpicker
    },
    data(){
        return{
            backUrl:'',
            showAddress:'',
            province:'',
            city:'',
            area:'',
            name:'',
            // region:'',
            phone:'',
            address:'',
            isDefault:true,
        }
    },
    computed:{
        region(){
            if(this.province===''){
                return '地区信息'
            }else{
                return `${this.province} ${this.city} ${this.area}`
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
        // 通过 `vm` 访问组件实例
            vm.backUrl=from.path;
        })//通过next()来渲染
    },
    mounted(){
        console.log(this.$route)
    },
    methods:{
        selectAddress(data){
           this.province=data.province.value;
           this.city=data.city.value;
           this.area=data.area.value;
           this.showAddress=false
        //    console.log(this.province,this.city,this.area)
       },
       save(){
            const data={
                name:this.name,
                phone:this.phone,
                province:this.province,
                city:this.city,
                area:this.area,
                address:this.address,
                is_default:this.isDefault?1:0
            }
            console.log(data)
            const res=validate(data,addressValidate);
            if(res.error!==0){
                this.$showToast({
                    message:res.message,
                })
                return
            }
            this.$showLoading()
            const USER_TOKEN=Token.getToken();
            this.axios.post('shose/address/add',data,{
                headers:{
                    token:USER_TOKEN
                }
            }).then(()=>{
                this.$router.push(`/order?loginR=${encodeURIComponent(this.$route.query.url)}`)
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
  .choose-region{
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba($color: #000000, $alpha: .3);
      }
      /deep/.distpicker-address-wrapper{
        width: 100%;
        height: 50%;
        position: absolute;
        left: 0;
        top: 50%;
        background: #fff;
        overflow: auto;
      }
      /deep/.address-container{
          margin-top:.68rem ;
      }
      /deep/.address-header{
          position: fixed;
          width: 100%;
          /deep/ul li.active{
              border-bottom:.06rem solid #ff0036;
              color: $color-a;
              box-sizing: border-box;
          }
      }
  }
    .switch-container{
      height: .5rem;
      width: 1rem;
      display: inline-block;
      overflow: hidden;
    }
    .switch-container input{
      display: none
    }
    .switch-container label{
      display: block;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,.25);
      cursor: pointer;
      border-radius: .5rem;
      transition: all .4s ease;
    }
    .switch-container label:before{
      content:'';
      display: block;
      border-radius: .5rem;
      height: .42rem;
      width: .42rem;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
      transition: all .4s ease;
      background-color: #fff;
      position: relative;
      right: -2px;
      top: 2px;
    }
    .switch-container input:checked~label:before{
      right: -.5rem;
      background-color: #fff;
    }

    .switch-container input:checked~label{
      background-color: #ff5e46;
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
}
</style>