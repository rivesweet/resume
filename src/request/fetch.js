//封装axios
import axios from 'axios'
import { Message } from 'element-ui';
import qs from 'qs';

//http request 拦截器
axios.interceptors.request.use(
    config => {
      // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      }
      // if(token){
      //   config.params = {'token':token}
      // }
      return config;
    },
    error => {
      return Promise.reject(err);
    }
  );
  
  
  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      if(response.data.errCode ==2){
        router.push({
          path:"/login",
          query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        })
      }
      return response;
    },
    error => {
      return Promise.reject(error)
    }
  )
  

export default{
    post(url,data){//post请求
        return new Promise((resolve,reject) => {
        axios.post(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
         })
        },
    get(url,params){//get请求
        return new Promise((resolve,reject) => {
            axios.get(url,{
              params:params
            })
            .then(response => {
              resolve(response.data);
            })
            .catch(err => {
              reject(err)
            })
          })
        }
    }
