// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import api from './request/api';
import fetch from './request/fetch';
import SIdentify from './components/identify/identify';
import VueResource from 'vue-resource';
import store from './store/index';
import confirmbox from './components/confirm/confirm'
import moment from 'moment'


Vue.use(VueResource)
Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);
Vue.use(confirmbox);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$fetch = fetch;
Vue.prototype.$moment = moment;


//路由跳转
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){
  const islogin=JSON.parse(localStorage.getItem('isLogin'));
  if(!islogin){
     alert("请先登录");
     next({
       path:'/login',
       query:{redirected:to.fullPath}
     })
  }
  else{
    next();
  }
}else{
  next();
}
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store:store,
  template: '<App/>'
})


// created(){
//   this.$axios.get('url').then(response=>{
      
//   },response=>{
      
//   })
//   }原生方法

