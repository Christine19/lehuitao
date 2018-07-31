import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入首页组件
import index from './component/index.vue'
// 引入商品详情页组件
import goodsInfo from './component/goods/goodsInfo'
// 引入购物车组件
import cart from './component/cart';
//引入订单详情页组件
import payOrder from './component/payOrder';
//引入登录页组件
import login from './component/login.vue';
// 引入ui框架需要的模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载模块
import VueLazyload from 'vue-lazyload';
// 引入iview ui插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入vuex库
import Vuex from 'vuex';
// 引入管理时间的库
import moment from "moment";
// 引入模块
import axios from "axios";
// 定义一个基地址,这样axios在每次使用的时候都会自行去拼接那个地址
axios.defaults.baseURL="http://47.106.148.205:8899";
// 设置带上cookie
axios.defaults.withCredentials = true;
// 把axios挂载在vue的原型中,这样所有的组件都可以共享
Vue.prototype.axios=axios;
// 使用ui中间件
Vue.use(ElementUI);
//使用vuex
Vue.use(Vuex);
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
  },{
    path:'/cart',
    component:cart
  },{
    path:'/payOrder',
    component:payOrder
  },
  {
    path:'/login',
    component:login
  }]
})
// 判断数据是否存在
let buylist=JSON.parse(window.localStorage.getItem('buylist'))||{};
// 实例化一个vuex的仓库
const store = new Vuex.Store({
  // 状态
  state: {
    // 数量
    // count: 0
    buylist,
    //是否登录 默认为false
    isLogin:false,
    // 记录从哪来时的路由
    frompath:''
  },
  getters:{
    Count(state){
      let num = 0;
      // 遍历对象
      for (const key in state.buylist) {
       num += parseInt(state.buylist[key]);
      }
      console.log(num);
      return num;
    }
  },
  // 修改数据必须要通过这种方式
  mutations: {
    // 自动的会把仓库中的state传入到mutations触发的方法中
    // 可以通过state点出内部的数据
    // info的格式是{goodId:xx,goodNum.xx}
    buygoods(state,info) {
      if(state.buylist[info.goodId]){
        //如果有值的话,直接累加值;
        // 解决字符串
        let oldNum=parseInt(state.buylist[info.goodId]);
        oldNum+=parseInt(info.goodNum);
        // 重新赋值
        state.buylist[info.goodId]+=oldNum;
      }else{
        //如果没值的话,直接赋值
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buylist,info.goodId,parseInt(info.goodNum));
      }
    },
    // 直接更新 某个id对应的数值
    // {goodId:xx,goodNum:xxx}
    updategoods(state,info){
      state.buylist[info.goodId]=info.goodNum;
    },
    //根据id删(除数据
    delgoodById(state,id){
      //坑点,需要告诉vue我们删除了这个属性,需要用vue的方法,不能用简单的对象的方法
      Vue.delete(state.buylist, id);
    },
    //增加修改登录状态的方法
    changeLogin(state,login){
      state.isLogin=login;
    },
    //修改来时的路由
    remfromPath(state,path){
      state.frompath=path;
    }
  }
})
// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // if(to.path!="/index"){
  //   // 如果要去的路由不是首页的话,则跳转到首页;
  //   // 从哪来没关系,到哪去有关系
  //   //如果写的是来的地方不是首页的话,跳转到 首页,则会出现无限调用的情况;
  //   next('/index');
  // }else{
  //   // 如果要去的路由是首页的话,则什么事也不干;
  //   next();
  // }
  // 通过导航守卫的from.path 获取来时的路由
  store.commit('remfromPath',from.path);
  // 去订单支付页
  if(to.path=="/payOrder"){
  //判断是否登录
  axios.get("site/account/islogin").then((response)=>{
    console.log(response);
    if(response.data.code=="nologin"){
        //未登录,去登录页;
        // this.$router.push('/login');
        next('/login');
    }else{
        //登录了,啥也不用干;已经在订单页
        next();
    }
}).catch((err)=>{
    console.log(err);
}) 
  }else{
    // 如果去的不是订单支付页,则可以继续访问
    next();
  }
})
// 注册一个全局过滤器
Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY-MM-DD");
});


// 挂载点

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render:h=>h(App),
  // 挂载路由
  router,
  // 挂载仓库
  store
})
// 注册逻辑,让数据常驻
// 在页面刷新和关闭之前,把数据存起来
window.onbeforeunload=function(){
  window.localStorage.setItem('buylist',JSON.stringify(store.state.buylist));
}
