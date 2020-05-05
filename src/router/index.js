import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import category from "../pages/category/index.vue";
import goodsList from "../pages/goods-list/index.vue";
import cart from "../pages/cart/index.vue";
import goodsDetail from "../pages/goods-detail/index.vue";
import notfind from "../pages/goods-nofind/index.vue";
import login from "../pages/login/index.vue";
import register from "../pages/register/index.vue";

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
  },
  {
    path: "/cart",
    name: "cart",
    component: cart
  },
  {
    path: "/notfind",
    name: "notfind",
    component: notfind
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/goodsDetail",
    redirect:'/'  //重定向
  },
  {
    path: "/goodsDetail/:id",
    beforeEnter(to,from,next){
      const id=to.params.id;
      if(!/^\d+$/.test(id)){
        next(from.path)
      }else{
        next()
      }
    },
    props:route=>{
      let id=route.params.id ;
      if(isNaN(id)){
        id=0;
      }
      console.log(id)
      return{
        id:parseInt(id),
      }
    },
    name: "goodsDetail",
    component: goodsDetail
  },
  {
    path: "/goodsList",//必须要带参数
    // props:true,//组件内传值
    // 定义route
    props:route=>{
      let cid=route.query.cid||0;
      let cname=route.query.cname;
      if(isNaN(cid)){
        cid=0
      }
      return{
        cid:parseInt(cid),
        cname,
      }
    },
    name: "goodsList",
    component: goodsList
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 修改router-link-exact-active
  linkExactActiveClass:'active',
});

export default router;
