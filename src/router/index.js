import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import category from "../pages/category/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "category",
    component: category
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 修改router-link-exact-active
  linkExactActiveClass:'active',
});

export default router;
