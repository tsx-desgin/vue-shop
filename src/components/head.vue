<template>
<div class="head">
    <span class="icon back" v-if="back" @click="toBack">&#xe9c9;</span>
    <span class="title">{{title}}</span>
</div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'QianQian左右鞋包',
        },
        back:{
            type:String,
            default:'',
        }
    },
    computed:{
        showBack(){
            return this.back!=='';
        }
    },
    methods:{
        toBack(){
            if(this.back===''){
                this.$router.push('/');
            }else{
                this.$router.push(this.back);
            }
            // if(window.history.length<2){
            //     this.$router.push('/')
            // }else{
            //     this.$router.back()
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.head{
    width: 100%;
    height: .88rem;
    background: #ff5e46;
    position: relative;
    text-align: center;
    line-height: .88rem;
    color: #fff;
    font-size: .36rem;
    position: fixed;
    left: 0;
    top:0;
    z-index: 999;
    .back{
        display: block;
        width: 1rem;
        height: 100%;
        position: absolute;
        left: .2rem;
        top: 0;
        font-size: .4rem;
        text-align: left;
    }
}
</style>
