<template>
<div>
    <span class='icon'>&#xe6b0;</span>
    <br>
    404<br>
    页面没找到/或者已经下架!!!!
</div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
div{
    width: 100%;
    height: 10rem;
    @include flex(column);
    color:$color-a;
    font-size: .4rem;
    font-weight: 700;
    background: blueviolet;
}
.icon{
    font-size:1rem ;
}
</style>