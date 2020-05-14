import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);
// state 存放状态
// mutations state成员操作
// getters 加工state成员给外界
// actions 异步操作
// modules 模块化状态管理
// vue components =>((dispatch)actions=>(commit)mutations=>(Mutate)state)(vuex)=>(Render)vue components  依次循环
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
