import modalCmp from "./modal.vue";

const modal={
    install(Vue){
        const ModalConstrol=Vue.extend(modalCmp);
        const vm=new ModalConstrol();
        vm.$mount(document.createElement("div"));
        document.body.appendChild(vm.$el);

        Vue.prototype.$showModal=function({title='',content='',btn=['确认','取消'],success=null}){
            if(title===''&&content==''){
                return
            }
            vm.visiable=true;
            vm.title=title;
            vm.content=content;
            vm.btn=btn;
            vm.$off('modal');
            vm.$on('modal',function(result){
                success && success(result)
            })
        }
    }
}
export default modal