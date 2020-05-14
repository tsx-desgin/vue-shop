<template>
<div class="page">
    <Head title="用户信息" back="/user"></Head>
    {{user}}{{reset}}
</div>
</template>
<script>
import Head from '../../components/head'
import { mapState ,mapActions} from 'vuex'
export default {
    components:{
        Head
    },
    computed:{
        ...mapState(['user']),
        reset(){
            return this.$store.getters.reset;
        }
    },
    mounted(){
        this.getUser
    },
    methods:{
        ...mapActions(['getUser']),
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
}
</style>