<template>
<div class="container icon" @click="editAddress">
    <span class="icon">&#xe755;</span>
    <div class="address">
        <div v-if="showAddress" class="address-detail">
            <div class="name">{{address.name}} <span>{{address.phone}}</span></div>
            <div class="address-content">{{addressContent}}</div>
            <span class="title">收货不便时,可选择暂存服务</span>
        </div>
        <div v-else class="empty"><span class="icon">&#xe60b;</span> 添加收货地址</div>
    </div>
    <span class="icon right">&#xe60c;</span>
</div>
</template>
<script>
export default {
    props:{
        address:Object,
    },
    computed:{
        showAddress(){
            if(Reflect.has(this.address,'address')){
                return !!this.address.address.length
            }else{
                return !!Object.keys(this.address).length
            }
        },
        addressContent(){
            if(Object.keys(this.address).length==0){
                return
            }
            return `${this.address.province}${this.address.city}${this.address.area}${this.address.address}`
        }
    },
    methods:{
        editAddress(){
            const id = this.address.id||0;
            const url=encodeURIComponent('/order')
            this.$router.push(`/order/address?id=${id}&url=${url}`)
            console.log('11',this.$route)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    width: 100%;
    height: 2rem;
    margin-top: .2rem;
    background: #fff;
    border-radius:.2rem ;
    padding: .2rem;
    box-sizing: border-box;
    @include flex;
    .icon{
        font-size:.64rem;
        color: $color-a;
        &.right{
            color:#cfcfcf;
            font-size:.32rem ;
        }
    }
    .address{
        width:0;
        flex: 1;
        height: 100%;
        .address-detail{
            width: 100%;
            height: 100%;
            font-size: .24rem;
            @include flex(column,$justify:space-around,$align:flex-start);
            .name{
                font-size: .3rem;
                line-height: .6rem;
                span{
                    font-size: .24rem;
                    color:#999;
                    margin-left: .2rem;
                }
            }
            .address-content{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                line-height: .28rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .title{
                width: 100%;
                font-size: .24rem;
                color: #ff0036;
                line-height: .28rem;
            }
        }
        .empty{
            width: 100%;
            height: 100%;
            @include flex;
            .icon{
                margin-right:.1rem ;
            }
        }
    }
}
</style>