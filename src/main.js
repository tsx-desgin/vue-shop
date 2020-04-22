import Vue from "vue";
// 调用axios
import axios from "axios";
import VueAxios from "vue-axios"
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Request 和 Response 对象起到了服务器与客户机之间的信息传递作用。
// Request 对象用于接收客户端浏览器提交的数据，
// 而 Response 对象的功能则是将服务器端的数据发送到客户端浏览器。
axios.defaults.baseURL = '/api/';
axios.defaults.timeout=8000;
axios.defaults.headers.appkey='f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM';
// 响应拦截
axios.interceptors.response.use(function (response) {
  const res=response.data;
  if(res.error_code===0){
    return res.data||'';
  }else{
    return Promise.reject(new Error(res.error_msg||'获取失败'));
  }
}, function (error) {
  return Promise.reject(error);
});
// 使用axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
