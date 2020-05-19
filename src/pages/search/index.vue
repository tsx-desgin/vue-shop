<template>
<div>
    <search-head :query="keyword" @search="search"></search-head>
    <div class="search-history" v-if="history.length>0">
        <div class="menu">
            <span>最近搜索</span>
            <a href="javascript:" class="icon" @click="clearHistory">&#xe60d;</a>
        </div>
        <div class="history">
            <div class="history-item" v-for="item of history" :key="item" @click="search(item)">
                {{item}}
            </div>
        </div>
    </div>
    <div class="search-history" >
        <div class="menu">
            <span>热门搜索</span>
        </div>
        <div class="history">
            <div class="history-item" :class="{active:index<3}" v-for="(item,index) of hotSearch " :key="item" @click="search(item)">
                {{item}}
            </div>
        </div>
    </div>
</div>
</template>
<script>
import searchHead from "./head";
import SearchHistory from '../../utils/searchHistory'
export default {
    components:{
        searchHead
    },
    data(){
        return{
            history:[],
            hotSearch:[],
            keyword:''
        }
    },
    mounted(){
        this.history=SearchHistory.getHistory()
        console.log(this.history)
        this.getHotSearch()
        this.keyword=this.$route.query.t
        if(this.keyword==undefined){
            this.keyword=''
        }
    },
    methods:{
        async search(keyword){
            SearchHistory.setHistory(keyword)
             if(keyword===''){
                return;
            }
            this.$showLoading()
            const res= await this.axios.get('shose/search/quick',{
                params:{
                    keyword:keyword
                }
            }).finally(()=>this.$hideLoading())
            if(res.list.length>0){
               this.$router.push('/search-list?t='+keyword)
            }else{
                this.$router.push('/notfind')
            }
        },
        async getHotSearch(){
            const res=await this.axios.get('shose/search/hot').then(res=>res.list);
            this.hotSearch=res
            console.log(res)
        },
        clearHistory(){
            SearchHistory.clearHistory()
            this.history=[]
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.search-history{
    width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    margin-top: .2rem;
    .menu{
        width: 100%;
        height: .6rem;
        @include flex($justify:space-between);
        font-size: .24rem;
        a{
            color: $color-a;
            font-size: .3rem;
        }
    }
    .history{
        width: 100%;
        margin-top:.2rem ;
        @include flex($justify:flex-start);
        flex-wrap: wrap;
        .history-item{
            color: #5d78ab;
            font-size: .24rem;
            border: .06px solid #5d78ab;
            padding: 0 .2rem;
            line-height: .56rem;
            height: .56rem;
            margin: .13333rem .13333rem .16rem 0;
            max-width: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            &.active{
                color: #e4007f;
                border-color: #f7add6;
            }
        }
    }
}
</style>