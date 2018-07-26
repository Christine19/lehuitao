import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入首页组件
import index from './component/index.vue'
// 引入ui框架需要的模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载模块
import VueLazyload from 'vue-lazyload';
// 使用ui中间件
Vue.use(ElementUI);

// 使用路由中间件
Vue.use(VueRouter);
// 使用懒加载中间件
Vue.use(VueLazyload);
// 实例化
const router = new VueRouter({
  routes:[
    {
      path:'/',
      component:index
    },{
    path:'/index',
    component:index
  }]
})
// 挂载点

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render:h=>h(App),
  router
})
