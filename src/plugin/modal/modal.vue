<template>
<transition name="fade">
    <div class="container" v-if="visiable">
        <div class="modal">
            <div class="modal-title" v-if="title!==''">{{title}}</div>
            <div class="modal-content" v-if="content!==''">{{content}}</div>
            <div class="modal-btn border-top">
                <div @click="cancel" class="btn border-right">{{btn[1]}}</div>
                <div @click="confirm" class="btn">{{btn[0]}}</div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    data(){
        return{
            visiable:false,
            title:'',
            content:'',
            btn:['确认','取消']
        }
    },
    methods:{
        cancel(){
            this.visiable=false;
            const result={
                confirm:false,
                cancel:true,
            }
            this.$emit('modal',result)
        },
        confirm(){
            this.visiable=false;
            const result={
                confirm:true,
                cancel:false,
            }
            this.$emit('modal',result)
        },
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
        width: 40%;
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
            font-weight: 500;
        }
        .modal-content{
            width: 100%;
            height: auto;
            margin: .2rem 0;
            text-align: center;
            line-height: .35rem;
            font-size:.28rem ;
            font-weight: 400;
        }
        .modal-btn{
            width: 100%;
            height: .45rem;
            @include flex($justify:space-between);
            .btn{
                width: 50%;
                height: 100%;
                @include flex();
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active{
    transition: opacity .5s;;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>