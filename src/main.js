import Vue from "vue";
// 调用axios
import axios from "axios";
import VueAxios from "vue-axios"
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
