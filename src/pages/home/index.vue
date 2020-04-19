<template>
<div>
<Head></Head>
<Search-bar></Search-bar>
<home-swiper></home-swiper>
</div>
</template>

<script>
// import Head from "../../components/head"
import Head from "@/components/head"
import SearchBar from "@/components/searchBAr"
import homeSwiper from "./swiper"
export default {
  components:{
    Head,
    SearchBar,
    homeSwiper,
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";

</style>


