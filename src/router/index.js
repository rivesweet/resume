import Vue from 'vue'
import Router from 'vue-router'
//home页面
import Posters from '@/components/index/home-posters'
import Search from '@/components/index/search'
import Companys from '@/components/index/companys'
//求职页面
import society from '@/components/details/society'
import jobs from '@/components/details/jobs'
//登录页面
import Login from '@/components/login/login'
//注册页面
import register from '@/components/register/register'
//个人中心页面
import personal from '@/components/personal/personal'
//资讯页面
import information from '@/components/news/news'
//企业登录页面
import companystate from '@/components/company/companystate'
//企业中心
import companycenter from '@/components/company/companycenter'
//管理中心
import admin from '@/components/admin/admin'

Vue.use(Router)

// 解决element-ui点击同一个路由报错：NavigationDuplicated
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    
      {
      path: '/home',
      name: 'home',
      components: {
        search:Search,
        posters:Posters,
        companys:Companys
      }
    },{
      path:'/',
      redirect:'/home'
    },
    {
      path:'/details',
      name:'details',
      components:{
        society:society,
        jobs:jobs,
      }
    },
    {
      path:'/information',
      name:'information',
      components:{
        information:information,
      }
    },
    {
      path:'/login',
      name:'login',
      components:{
        login:Login
      }
    },
    {
      path:'/register',
      name:'register',
      components:{
        register:register
      }
    },
    {
      path:'/personal',
      name:'personal',
      meta:{
        requireAuth:true,//需要登录
      },
      components:{
        personal:personal
      }
    },
    {
      path:'/companystate',
      name:'companystate',
      components:{
        companystate:companystate
      }
    },
    {
      path:'/companycenter',
      name:'companycenter',
      components:{
        companycenter:companycenter
      }
    },
    {
      path:'/admin',
      name:'admin',
      components:{
        admin:admin
      }
    },
  ]
})

Router.push