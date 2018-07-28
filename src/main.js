import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入首页组件
import index from './component/index.vue'
// 引入商品详情页组件
import goodsInfo from './component/goods/goodsInfo'
// 引入ui框架需要的模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载模块
import VueLazyload from 'vue-lazyload';
// 引入iview ui插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入管理时间的库
import moment from "moment";
// 引入模块
import axios from "axios";
// 定义一个基地址,这样axios在每次使用的时候都会自行去拼接那个地址
axios.defaults.baseURL="http://47.106.148.205:8899";
// 把axios挂载在vue的原型中,这样所有的组件都可以共享
Vue.prototype.axios=axios;
// 使用ui中间件
Vue.use(ElementUI);
//使用iview;
Vue.use(iView);
// 使用路由中间件
Vue.use(VueRouter);
// 使用懒加载中间件
Vue.use(VueLazyload,{
  loading:require('./assets/img/01.gif')
});
// 实例化
const router = new VueRouter({
  routes:[
    {
      path:'/',
      component:index
    },{
    path:'/index',
    component:index
  },
  {
    path:'/goodsInfo/:id',
    component:goodsInfo
  }]
})
// 注册一个全局过滤器
Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY-MM-DD");
})

// 挂载点

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render:h=>h(App),
  router
})
