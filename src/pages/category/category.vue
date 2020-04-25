<template>
<ul class="category-container">
    <li v-for="item of content" :key="item.cat_id" :class="{active:item.cat_id===catId}" class="category_item" @click="changeCategory(item.cat_id)">
        <div class="category_name">{{item.cat_name}}</div>
    </li>
</ul>
</template>
<script>
export default {
    props:{
        content:Array,
    },
    watch:{
        content(newList){
            const catId=newList.length>0?newList[0].cat_id:0;
            this.catId=catId;
        }
    },
    data(){
        return{
            catId:0,
        }
    },
    methods:{
        changeCategory(catId){
            this.catId=catId;
            this.$emit('change',catId)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.category-container{
    width: 100%;
    height: auto;
    .category_item{
        width: 100%;
        height: .9rem;
        padding: .2rem;
        padding-right: 0;
        box-sizing: border-box;
        color: $color_d;
        font-size: .32rem;
        .category_name{
                width: 100%;
                height: 100%;
                @include flex;
                border-left: .06rem solid transparent;
                box-sizing: border-box;
        }
        &.active{
            background: #fff;
            .category_name{
                border-left: .06rem solid $color_a;
                box-sizing: border-box;
            }
        }
    }
}
</style>