<template>
    <div class="state-wrap">
        <div class="ms-all">
        <div class="ms-state">
        <div class="ms-select">
            <el-radio-group v-model="selectpoint" @change="showdate()">
            <el-radio-button label="companylog">企业登录</el-radio-button>
            <el-radio-button label="companyres">企业注册</el-radio-button>
            </el-radio-group>
        </div>

        <div class="ms-log" v-show="showlog">
        <el-form :model="logForm" status-icon :rules="logrules" ref="logForm" label-width="0px" class="demo-ruleForm">
            <div v-if="errorInfo">
                <span>{{errInfo}}</span>
            </div>
            <el-form-item prop="mobilephone">
                <el-input v-model="logForm.mobilephone" placeholder="企业手机号" ></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="logForm.password"></el-input>
            </el-form-item>

            <el-form-item  prop="validate">
                <el-input v-model="logForm.validate" class="validate-code" placeholder="验证码" ></el-input>
                <div class="code" @click="refreshCode">
                    <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
            </el-form-item>
                
            <div class="state-btn">
                <el-button type="primary" @click="submitlogForm('logForm')">企业登录</el-button>
            </div>
            </el-form>
            </div>

<div class="ms-register" v-show="showregister">
<el-form :model="registerForm" status-icon :rules="registerrules" ref="registerForm" label-position="left" label-width="80px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="mobilephone" >
    <el-input v-model="registerForm.mobilephone" placeholder="请输入手机号"></el-input>
  </el-form-item>
  
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="8-20位，包含字母或数字"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="checkpass">
    <el-input type="password" v-model="registerForm.checkpass" autocomplete="off" placeholder="请重新输入密码"></el-input>
  </el-form-item>


<el-form-item>
    <el-button type="primary" @click="submitregisterForm('registerForm')">注册</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>

</el-form>

</div>

        </div>
        </div>
    </div>    
</template>

<style scoped>
    .state-wrap{
        position: relative;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .ms-all{
        width:400px;
        height:500px;
        display:flex;
        justify-content:center;
        margin-top:40px;
    }
    .ms-select{
        margin-bottom:20px;
        display:flex;
        justify-content:center;
    }
    .ms-state{
        width:300px;
        height:300px;
        border-radius: 5px;
        background: #fff; 
        padding:50px;
    }
    .state-btn{
        text-align: center;
    }
    .state-btn button{
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
        data() {
            var checkmobile=(rule,value,callback)=>{//验证登录手机号
	        if(/^1[34578]\d{9}$/.test(value) == false){
	          callback(new Error("请输入正确的手机号"));
	          }else{
	          callback();
	        }
	        };
            var checkregistermobile=(rule,value,callback)=>{//验证注册手机号
	        if(/^1[34578]\d{9}$/.test(value) == false){
	          callback(new Error("请输入正确的手机号"));
	          }else{
                let data = {mobilephone:this.registerForm.mobilephone}
                this.$http.post('/dbapi/searchmobilephone',data).then((res)=>{
                    if(res.data == 0){
                      callback(new Error("该手机号已被注册"));
                    }else{
                      callback();
                    }
                })
              }
	        };
            var checkidentify=(rule,value,callback)=>{
          if(value!==this.identifyCode){
            callback(new Error("验证码错误"));
          }else{
            callback();
          }
        };
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
	        if(value!==this.registerForm.password){
	          callback(new Error("两次输入密码不一致"));
	          }else{
	          callback();
	        }
          };
            return {
                selectpoint:'companylog',
                showlog:true,
                showregister:false,
                identifyCodes: "1234567890",
                identifyCode: "",
                errorInfo : false,
                logForm: {
                    mobilephone: '',
                    password: '',
                    validate: ''                    
                },
                registerForm:{
                    mobilephone:'',
                    password:'',
                    checkpass:'',
                    validate:'',
                },
                logrules: {
                    mobilephone: [
                        {required: true, message: '请输入企业手机号', trigger: 'blur' },
                        {validator:checkmobile,trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    validate: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator:checkidentify, trigger: 'blur'}
                    ]
                },
                registerrules:{
                    mobilephone: [
                        { required: true, message: '请输入企业手机号', trigger: 'blur' },
                        { validator:checkregistermobile,trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator:checkpass,trigger: 'blur' }
                    ],
                    checkpass:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator:checkpasssame,trigger: 'blur' }
                    ],
                    validate: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { validator:checkidentify, trigger: 'blur'}
                    ]
                },
            }
        },
        mounted() {
            this.identifylogCode = "";
            this.makeCode(this.identifylogCodes, 4);
        },

        methods: {
        randomNum(min, max) {//生成随机数
        return Math.floor(Math.random() * (max - min) + min);
        },
 
        refreshCode() {//刷新验证码
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
            showdate(){//点击切换表单
                this.selectpoint=='companylog'?(this.showlog=true,this.showregister=false):
                (this.showlog=false,this.showregister=true)
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

        submitlogForm(logForm) {//登录
        this.$refs[logForm].validate((valid) => {
          if (valid) {
            let data = {'mobilephone':this.logForm.mobilephone,'password':this.logForm.password}
                this.$http.post('/dbapi/companylogin',data).then((res)=>{
                    if(res.data==-1){
                    alert("手机号或密码错误");
                    }
                    else if(res.status == 200){
                        this.$store.dispatch('setUser',res.data)
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
      },
      submitregisterForm(logForm) {//注册
        this.$refs[logForm].validate((valid) => {
          if (valid) {
            let data = {mobilephone:this.registerForm.mobilephone,password:this.registerForm.password}
                this.$http.post('/dbapi/companyregister',data).then((res)=>{
                    if(res.status == 200){
                        alert("注册成功,即将返回首页");
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