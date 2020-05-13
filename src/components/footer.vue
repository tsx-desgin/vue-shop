<template>
<div class="footer-container border-top">
    <router-link to="/" tag="div" class="footer-nav">
        <span class="icon">&#xe656;</span>
        <span>首页</span>
    </router-link>
    <!-- 
        <router-link>组件支持用户在具有路由功能的应用中点击导航。通过to属性指定目标地址，默认渲染为带有正确连接的<a>标签，
            可以通过配置tag属性生成别的标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的css类名
             tag 包装
     -->
    <router-link to="/category" tag="div" class="footer-nav">
        <span class="icon">&#xe602;</span>
        <span>分类</span>
    </router-link>
    <router-link to="/cart" tag="div" class="footer-nav">
        <span class="icon">&#xe669;</span>
        <span>购物车</span>
    </router-link>
    <router-link to="/user" tag="div" class="footer-nav">
        <span class="icon">&#xe651;</span>
        <span>我的</span>
    </router-link>
</div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.footer-container{
    width: 100%;
    height: $footer-h;
    background: #fff;
    position: fixed;
    bottom: 0;
    z-index: 999;
    @include flex;
    .footer-nav{
        width: 25%;
        height: 100%;
        @include flex($direction:column);
        font-size: .2rem;
        color: $color-d;
        .icon{
            font-size: .4rem;
            margin-bottom: .1rem;
        }
        // Router点击切换样式
        &.active{
            color: $color-a;
        }
    }
}
</style>