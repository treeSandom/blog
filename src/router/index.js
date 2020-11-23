import Vue from "vue";
import VueRouter from "vue-router";

//懒加载导入
const Blogs=()=>import("../views/blogs/Blogs.vue");
const Detail=()=>import("../views/detail/Detail.vue");


Vue.use(VueRouter);

const routes = [
  {
      path:"/",
      redirect:"/show"
  },
  {
      path:"/show",
      component:Blogs
  },
  {
      path:"/detail/:sase",
      component:Detail
  },
];

const router = new VueRouter({
  routes
});

export default router;
