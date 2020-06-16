<template>
<div class="register-wrap">
<div class="ms-register">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="80px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username" >
    <el-input v-model="ruleForm.username" placeholder="5-10位以字母开头"></el-input>
  </el-form-item>
  
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="8-20位，包含字母或数字"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="checkpass">
    <el-input type="password" v-model="ruleForm.checkpass" autocomplete="off" placeholder="请重新输入密码"></el-input>
  </el-form-item>

  <el-form-item label="手机号"   prop="mobilephone" >
    <el-input v-model="ruleForm.mobilephone" placeholder="请输入正确的手机号"></el-input>
  </el-form-item>

  <el-form-item  label="验证码"   prop="validate">
   <el-input v-model="ruleForm.validate"  placeholder="请输入验证码" ></el-input>
    <div class="identifydiv" @click="refreshCode">
     <s-identify :identifyCode="identifyCode"></s-identify>
    </div>
  </el-form-item>

<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>

</div>
</div>
</template>

<style scoped>
.register-wrap{
        position: relative;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
}
.ms-register{
        margin-top:5%;
        width:300px;
        height:400px;
        border-radius: 5px;
        background: #fff;
        padding:50px;
    }
.el-input{
  width:200px;
}
.el-form-item{
  width:500px;
}
.identifydiv{
  margin-top:10px;
  width:112px;
  height:38px;
}
</style>




<script>
export default{
    data(){

        var checkname=(rule,value,callback)=>{
          let pattern=/^[A-Za-z][A-Za-z_0-9]{4,9}$/;
          if(value.length<5||value.length>10){
            callback(new Error("用户名必须在5-10位之间"));
          }else if(!pattern.test(value)){
            callback(new Error("用户名不符合规则"));
          }else{
                let data = {'username':this.ruleForm.username}
                this.$http.post('/dbapi/searchname',data).then((res)=>{
                    if(res.data == 0){
                      callback(new Error("用户名已存在"));
                    }else{
                      callback();
                    }
                })
          }
        }

        var checkpass=(rule,value,callback)=>{
          let pattern=/^(?!^\d+$|^[a-zA-Z]+$)(?:[a-zA-Z\d]{8,20})$/;
          if(value.length<8||value.length>20){
            callback(new Error("长度必须在8-20位之间"));
          }
          else if(!pattern.test(value)){
            callback(new Error("密码至少包含一位数字或字母"));
          }else{
            callback();
          }
          };
        var checkpasssame=(rule,value,callback)=>{
	        if(value!==this.ruleForm.password){
	          callback(new Error("两次输入密码不一致"));
	          }else{
	          callback();
	        }
          };
        var checkmobile=(rule,value,callback)=>{
	        if(/^1[34578]\d{9}$/.test(value) == false){
	          callback(new Error("请输入正确的手机号"));
	          }else{
	          callback();
	        }
	        };
        var checkidentify=(rule,value,callback)=>{
          if(value!==this.identifyCode){
            callback(new Error("验证码错误"));
          }else{
            callback();
          }
        }
          return{
            identifyCodes: "1234567890",
            identifyCode: "",
            lasttime:"",
            ruleForm:
            {
              username:'',
              password:'',
              checkpass:'',
              mobilephone:'',
              validate:'',
            },
            rules:{
            username: [
              {required: true, message: '请输入用户名', trigger: 'blur' },
              {validator:checkname , trigger: 'blur' }
            ],
            password:[
              {required: true,message: '请输入密码',trigger: 'blur'},
              {validator:checkpass , trigger: 'blur'}
            ],
            checkpass:[
              {required: true,message: '确认密码不能为空',trigger: 'blur'},
              {validator:checkpasssame , trigger: 'blur'}
            ],
            mobilephone:[
              {required: true,message: '请输入手机号码',trigger: 'blur'},
	    	      {validator:checkmobile , trigger: 'blur'}
            ],
            validate:[
              { required: true, message: '请输入验证码', trigger: 'blur' },
              {validator:checkidentify , trigger: 'blur'}
            ]
            }
              }
        },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        },
        
      methods:{
        

        resetForm(formName){
        this.$refs[formName].resetFields();
      },

      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },

        refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },

      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
        ];
      }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var nowtime=this.$moment().format('mm');
          if(nowtime-this.lasttime<10&&valid){
            alert("过于频繁注册，请稍后再试!")
          }
          else if (valid) {
            let data = {'username':this.ruleForm.username,'password':this.ruleForm.password,'mobilephone':this.ruleForm.mobilephone}
                this.$http.post('/dbapi/register',data).then((res)=>{
                    if(res.status == 200){
                        alert("注册成功!");
                        this.lasttime=this.$moment().format('mm');
                    }
                })
          }
           else{
            return false;
          }
        });
      },
      }
}

</script>