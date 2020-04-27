<template>
<transition>
    <div class="container" v-if="visiable">
        <div class="modal">
            <div class="modal-title" v-if="title!==''">{{title}}</div>
            <div class="modal-content" v-if="content!==''">{{content}}</div>
            <div class="modal-btn">
                <div @click="cancel" class="btn">{{btn.cancel}}</div>
                <div @click="confirm" class="btn">{{btn.confirm}}</div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    data(){
        return{
            visiable:true,
            title:'',
            content:'',
            btn:{
                confirm:'确定',
                cancel:'取消',
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal{
        width: 50%;
        height: auto;
        background: #fff;
        color: $color-a;
        border-radius: .2rem;
        .modal-title{
            width: 100%;
            height: .4rem;
            text-align: center;
            line-height: .4rem;
            font-size:.4rem ;
            font-weight: 600;
        }
        .modal-content{
            width: 100%;
            height: .35rem;
            text-align: center;
            line-height: .35rem;
            font-size:.4rem ;
            font-weight: 400;
        }
        .modal-btn{
            width: 100%;
            height: .45rem;
            @include flex($justify:space-between);
            .btn{
                width: 28%;
                height: 100%;
                @include flex();
            }
        }
    }
}
</style>