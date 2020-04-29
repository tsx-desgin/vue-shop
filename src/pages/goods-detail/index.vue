<template>
<div>
    <Head></Head>
</div>
</template>
<script>
import Head from "./header"
export default {
    components:{
        Head
    },
    props:{
        id:Number,
    },
    mounted(){
        this.getGoods()
    },
    data(){
        return{
            comment:{},
            gallery:{},
            goods:{},
        }
    },
    methods:{
        getGoods(){
            this.axios.get(`api/goods?goods_id=${this.id}`).then(result=>{
                const {comment:commentList,commentTotal,gallery,goods}=result
                this.comment={
                    list:commentList,
                    count:commentTotal,
                }
                this.gallery=gallery,
                this.goods=goods
                console.log(commentList,commentTotal,gallery,goods)
                
            }).catch(err=>{
                this.$router.push('/notfind')
                console.log(err)
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
</style>