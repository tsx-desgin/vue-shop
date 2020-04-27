import modalCmp from "./modal.vue";

const modal={
    install(Vue){
        const ModalConstrol=Vue.extend(modalCmp);
        const vm=new ModalConstrol();
        vm.$mount(document.createElement("div"));
        document.body.appendChild(vm.$el);

    }
}
export default modal