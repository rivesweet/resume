import { MessageBox } from 'element-ui'; 

function showconfirm(sendcon){//提示框
      return MessageBox.confirm(sendcon,'提示',{
           confirmButtonText:'确定',
           cancelButtonText:'取消',
           type:'warning'
       })
    }

function showalert(sendcon){
    return MessageBox.alert(sendcon,'提示',{
        confirmButtonText:'确定'
    })
}

function showuserinfor(sendcon){
    return MessageBox.alert(sendcon,'用户信息',{
        confirmButtonText:'确定'
    })
}


    export default { 
        install: function (Vue) {
          Vue.prototype.global_confirm = (sendcon) => showconfirm(sendcon);
          Vue.prototype.global_route = (sendcon) => showalert(sendcon);
          Vue.prototype.global_userinfor = (sendcon) => showuserinfor(sendcon)
        }
      }