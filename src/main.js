import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入首页组件
import index from './component/index.vue'
// 使用路由中间件
Vue.use(VueRouter);
// 实例化
const router = new VueRouter({
  routes:[{
    path:'/index',
    component:index
  }]
})
// 挂载点

Vue.config.productionTip = false

new Vue({
  el:"#app",
  router,
 render: h=>h(App)
})
