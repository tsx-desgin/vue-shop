<template>
<div class="head-container">
    <div class="icon back" @click="$router.replace('/')">&#xe9c9;</div>
    <div class="input-bar">
        <input type="text" v-model.trim="keyword" placeholder="请输入关键字">
        <span class="icon clear" v-show="keyword!=''" @click="keyword=''">&#xe625;</span>
    </div>
    <span class="search-btn" @click="search()">搜索</span>
    <ul class="quick-search" v-show="keyword!=''">
        <li class="quick-item border-bottom" v-for="item of quickSearch" :key="item" @click="search(item)">{{item}}</li>
    </ul>
</div>
</template>
<script>
export default {
    props:{
        query:String,
    },
    data(){
        return{
            keyword:'',
            quickSearch:[],
        }
    },
    watch:{
        keyword(){
            this.getQuickSearch()
        },
        query(val){
            if(val!=''){
                this.keyword=val
            }
        }
    },
    methods: {
        search(keyword =null){
            if(keyword===null){
                keyword=this.keyword;
            }
            this.$emit('search',keyword);
        },
        getQuickSearch(){
            if(this.keyword===''){
                this.quickSearch=[];
                return;
            }
            this.axios.get('shose/search/quick',{
                params:{
                    keyword:this.keyword
                }
            }).then(res=>this.quickSearch=res.list)
        }  
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.head-container{
    width: 100%;
    height:.88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include flex;
    position: relative;
    .back{
        width: .8rem;
        height: 100%;
        font-size: .4rem;
        @include flex($justify:flex-start)
    }
    .input-bar{
        width: 0;
        flex: 1;
        height: .6rem;
        border:1px solid #dfe0e1;
        border-radius: .3rem;
        background: #f3f4f5;
        font-size: .2rem;
        @include flex($justify:flex-start);
        input{
            width: 80%;
            height: 100%;
            font-size: .24rem;
            border-radius: .3rem;
            text-indent: .2rem;
            background: #f3f4f5;
        }
        .clear{
            width: 20%;
            height: 100%;
            @include flex;
            color:#3b63a5;
            font-weight: bold;
            border-radius: .3rem;
        }
    }
    .search-btn{
        width: 1rem;
        height: 100%;
        font-size: .28rem;
        @include flex($justify:flex-end);
    }
    .quick-search{
        width: 100%;
        height: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top: .88rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        .quick-item{
            width: 100%;
            height: 1rem;
            @include flex($justify:flex-start);
            font-size: .24rem;
        }
    }
}
</style>