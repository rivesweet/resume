<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <div v-if="errorInfo">
                    <span>{{errInfo}}</span>
                </div>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名" ></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>

                <el-form-item  prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码" ></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:14px;line-height:30px;color:#999;cursor: pointer;float:right;" @click="handleCommand()">注册</p>  
            </el-form>
        </div>
    </div>    
</template>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
    }
    .ms-login{
        margin-top:5%;
        width:300px;
        height:240px;
        border-radius: 5px;
        background: #fff;
        padding:50px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code {
        width: 112px;
        height: 35px;
        border: 1px solid #ccc;
        float: right;
        border-radius: 2px;
    }
    .validate-code {
        width: 136px;
        float: left;
    }
</style>


<script>
    export default {
        name: 'login',
        data() {
            var checkidentify=(rule,value,callback)=>{
          if(value!==this.identifyCode){
            callback(new Error("验证码错误"));
          }else{
            callback();
          }
        }
            return {
                identifyCodes: "1234567890",
                identifyCode: "",
                errorInfo : false,
                ruleForm: {
                    username: '',
                    password: '',
                    validate: ''                    
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    validate: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator:checkidentify, trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },

        methods: {

            handleCommand() {
                this.$router.push('/register');
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
          if (valid) {
            let data = {'username':this.ruleForm.username,'password':this.ruleForm.password}
                this.$http.post('/dbapi/login',data).then((res)=>{
                   // console.log(res);
                    if(res.data!=0){
                    alert("用户名或密码错误");
                    }
                    else if(res.data==0&&res.status == 200){
                        this.$store.dispatch('setUser',this.ruleForm.username)
                        alert("登录成功,即将返回首页");
                        this.$router.push({
                        path:'/home'
                        })
                    }
                })
          }
           else{
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
    }
</script>