import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueResource from 'vue-resource';
import axios from 'axios';
import qs from "qs";
// import URL from "http://localhost:8080/"

// import $ from 'jquery';

import '@/assets/iconfont/iconfont.css';

//导入全局组件ShowBlogs

import ShowBlogs from "./components/ShowBlogs.vue";
import blogDetail from "./components/blogDetail.vue";

//挂载全局

Vue.component("show-blog",ShowBlogs);
Vue.component("blog-detail",blogDetail);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
// Vue.prototype.URL = URL;

Vue.config.productionTip = false;

Vue.use(VueResource);
// Vue.use($);

//自定义指令实现标题颜色随机生成
Vue.directive('rainbow',{
  bind(el){
    el.style.color="#"+Math.random().toString(16).slice(2,8)
  }
})
//自定义svg颜色随机生成
Vue.directive('rainbows',{
  bind(el){
    el.style.fill="#"+Math.random().toString(16).slice(2,8)
  }
})
//自定义过滤器大写英文标题
Vue.filter("to-uppercase",function(value){
  return value.toUpperCase();
})
//自定义过滤器缩略文章内容
Vue.filter("snippet",function(value){
  return value.slice(0,100)+"...";
})
//自定义过滤器缩略文章内容
Vue.filter("snippets",function(value){
  return value.slice(0,10);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
