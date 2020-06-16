import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
    //定义状态
    state:{
        currentUser:null,//当前用户
        isLogin:false,//是否已登录
        token:''//保存token
    },
    getters:{
        currentUser:state=>state.currentUser,
        isLogin:state=>state.isLogin,

    },
    mutations:{
        userStatus(state,user){
        if(user){
            state.currentUser=user;
            state.isLogin=true;
            localStorage.setItem('userName',state.currentUser);
            localStorage.setItem('isLogin',state.isLogin);
        }else if(user==null){
            //退出则清空
            localStorage.setItem('userName',null);
            localStorage.setItem('isLogin',false);
            state.currentUser=null;
            state.isLogin=false;
            state.token='';
        }
    }
    },
    actions:{
        setUser({commit},user){
            commit('userStatus',user)
        }
    }
})

export default store