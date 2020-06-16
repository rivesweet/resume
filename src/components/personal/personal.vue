<template>

<div class="personalpage">
<div class="myinf">

   <div class="personalbutton" >
    <el-radio-group v-model="selectpoint" @change="showdate()">
      <el-radio-button label="myinfor">个人简历</el-radio-button>
      <el-radio-button label="mynote" >投递过的简历</el-radio-button>
      <el-radio-button label="modpass">修改密码</el-radio-button>
    </el-radio-group>
   </div>


  <div class='mymessform' v-show="showmess">
  <el-form :model="mymesForm" status-icon :rules="mymesFormrules" ref="mymesForm" label-position="left" label-width="80px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="mymesForm.username" :disabled="true"></el-input>
  </el-form-item>
  
  <el-form-item label="手机号" prop="mobilephone">
    <el-input  v-model="mymesForm.mobilephone" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="年龄" prop="age">
    <el-input  v-model="mymesForm.age" autocomplete="off" ></el-input>
  </el-form-item>

  <el-form-item label="学历" prop="education">
      <el-select v-model="mymesForm.education" placeholder="请选择学历"  style="width: 300px;">
      <el-option label="初中" value="初中"></el-option>
      <el-option label="高中" value="高中"></el-option>
      <el-option label="大专" value="大专"></el-option>
      <el-option label="本科" value="本科"></el-option>
      <el-option label="硕士/博士" value="硕士/博士"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="真实姓名" prop="usertruename">
    <el-input  v-model="mymesForm.usertruename"></el-input>
  </el-form-item>

  <el-form-item label="期望职位"   prop="personalidea" placeholder="建议以逗号分隔">
    <el-input  v-model="mymesForm.personalidea"></el-input>
  </el-form-item>

  <el-form-item label="期望地点"   prop="ideaplace" placeholder="建议以逗号分隔">
  <el-input  v-model="mymesForm.ideaplace"></el-input>
  </el-form-item>

  <el-form-item label="工作/实习经历"   prop="experience">
  <el-input type="textarea" :rows="4"  v-model="mymesForm.experience"></el-input>
  </el-form-item>

  <el-form-item label="个人简介"   prop="personaldetail">
  <el-input type="textarea" :rows="4"  v-model="mymesForm.personaldetail"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="success" @click="submitForm('mymesForm')" class="submitbutton">保存</el-button>
  </el-form-item>

</el-form>
</div>

<div v-show="shownote">
 <el-table :data="mysendjobs" height='425' >
<el-table-column v-for="item in mysendjobstype" :label="item.propsname"
     :property="item.props" :key="item.props" width='150'>
    <template slot-scope="scope">
    <span style="center">{{ scope.row[scope.column.property] }}</span>
    </template>
    </el-table-column>
  
 <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="resumechat(scope.row)" type="text" size="small">与企业交流</el-button>
      </template>
    </el-table-column>
</el-table>
</div>



<div class="modpassform"  v-show="showmodp">
<el-form :model="modpassForm" status-icon :rules="modpassrules" ref="modpassForm" label-position="left" label-width="80px" class="demo-ruleForm">
  <el-form-item label="原密码" prop="oldpassword" >
    <el-input type="password" v-model="modpassForm.oldpassword"></el-input>
  </el-form-item>
  
  <el-form-item label="新密码" prop="newpassword">
    <el-input  type="password" v-model="modpassForm.newpassword" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="comfirmpass">
    <el-input  type="password" v-model="modpassForm.comfirmpass" autocomplete="off" ></el-input>
  </el-form-item>
  
  <el-form-item>
  <el-button type="success" @click="submitpassForm()" class="submitbutton">保存</el-button>
  </el-form-item>

</el-form>
</div>


</div>
</div>
</template>

<style scoped>

.personalpage{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
}

.myinf{
        width:800px;
        height:750px;
        border-radius: 10px;
        background: #fff;
        padding:40px;
        display:flex;
        flex-direction:column;
        align-items:center;
    }

.personalbutton{
    margin-bottom:10px;
}

.submitbutton{
  width:300px;
}

</style>


<script>

export default{
    data(){
      var checkmobile=(rule,value,callback)=>{
	        if(/^1[34578]\d{9}$/.test(value) == false){
	          callback(new Error("请输入正确的手机号"));
	          }else{
	          callback();
	        }
	        };
      var checkoldpass=(rule,value,callback)=>{
        var logname=localStorage.getItem('userName');
        this.$http.get('/dbapi/getuserpass',{params:{username:logname}}).then((res)=>{
          let logpass=res.data;  
          if(value!=logpass){
          callback(new Error("旧密码错误"));
          }else{
          callback();
        }
        })
      };
      var checkpass=(rule,value,callback)=>{
          let pattern=/^(?!^\d+$|^[a-zA-Z]+$)(?:[a-zA-Z\d]{8,20})$/;
          if(value.length<8||value.length>20){
            callback(new Error("长度必须在8-20位之间"));
          }
          else if(!pattern.test(value)){
            callback(new Error("密码至少包含一位数字或字母"));
          }else if(value==this.modpassForm.oldpassword){
            callback(new Error("新密码不能与旧密码相同"));
          }else{
            callback();
          }
          };
      var checkpasssame=(rule,value,callback)=>{
	        if(value!==this.modpassForm.newpassword){
	          callback(new Error("两次输入密码不一致"));
	          }else{
	          callback();
	        }
          };
      return{
        selectpoint:'myinfor',
        showmess:true,
        shownote:false,
        showmodp:false,
        firstload:false,
        hassave:true,
        mymesForm:{
          username:'',
          mobilephone:'',
          age:'',
          education:'',
          usertruename:'',
          personalidea:'',
          ideaplace:'',
          experience:'',
          personaldetail:'',
        },  
        mysendjobstype:[],
        mysendjobs:[],
        modpassForm:{
          oldpassword:'',
          newpassword:'',
          comfirmpass:''
        },
  
        mymesFormrules:{
          mobilephone:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {validator:checkmobile , trigger: 'blur'},
          ],
          age:[
            {required:true,message:'请输入年龄',trigger:'blur'}
          ],
          education:[
            {required:true,message:'请输入学历',trigger:'blur'}
          ],
          usertruename:[
            {required:true,message:'请输入真实姓名',trigger:'blur'}
          ],
          experience:[
            {required:true,message:'请输入工作/实习经历',trigger:'blur'}
          ]
        },
        modpassrules:{
          oldpassword:[
            {required:true,message:'请输入原密码',trigger:'blur'},
            {validator:checkoldpass , trigger: 'blur'}
          ],
          newpassword:[
            {required:true,message:'请输入新密码',trigger:'blur'},
            {validator:checkpass , trigger: 'blur'}
          ],
          comfirmpass:[
            {required:true,message:'请重新输入密码',trigger:'blur'},
            {validator:checkpasssame , trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
      showdate(){//显示表格
        this.selectpoint=='myinfor'?(this.showmess=true,this.shownote=false,this.showmodp=false)
        :this.selectpoint=='mynote'?(this.showmess=false,this.shownote=true,this.showmodp=false)
        :(this.showmess=false,this.shownote=false,this.showmodp=true);
      },
      getuserinfor(){//获取用户信息
        var logname=localStorage.getItem('userName');
        this.$http.get('/dbapi/getuserinfor',{params:{username:logname}}).then((res)=>{
          this.mymesForm.username=res.data[0].username;
          this.mymesForm.mobilephone=res.data[0].mobilephone;
          this.mymesForm.age=res.data[0].age;
          this.mymesForm.education=res.data[0].education;
          this.mymesForm.usertruename=res.data[0].usertruename;
          this.mymesForm.personalidea=res.data[0].personalidea;
          this.mymesForm.ideaplace=res.data[0].ideaplace;
          this.mymesForm.personaldetail=res.data[0].personaldetail;
          this.mymesForm.experience=res.data[0].experience;
        })
      },
      submitForm(formName) {//更新用户信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {'username':this.mymesForm.username,'mobilephone':this.mymesForm.mobilephone,'age':this.mymesForm.age,
            'education':this.mymesForm.education,'usertruename':this.mymesForm.usertruename,'personalidea':this.mymesForm.personalidea,
            'ideaplace':this.mymesForm.ideaplace,'personaldetail':this.mymesForm.personaldetail,'experience':this.mymesForm.experience}
                this.$http.post('/dbapi/updateinfor',data).then((res)=>{
                 //   console.log(res);
                    if(res.status == 200){
                        alert("更新成功");
                    }
                    this.hassave=true;
                })
          }
           else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      getmysendjobstype(){//获取用户投递简历的属性
        let logname=localStorage.getItem('userName');
        let data={'username':logname};
        this.$http.get('/dbapi/getmysendjobstype',{params:data}).then((res)=>{
          this.mysendjobstype=res.data;
        })
      },
      getmysendjobs(){//获取用户投递的简历
        let logname=localStorage.getItem('userName');
        let data={'username':logname}
        this.$http.get('/dbapi/getmysendjobs',{params:data}).then((res)=>{
          this.mysendjobs=res.data;
        })
      },
      submitpassForm(){//提交密码
        var logname=localStorage.getItem('userName');
        let data={'username':logname,'newpassword':this.modpassForm.newpassword}
        this.$http.post('/dbapi/updatepass',data).then((res)=>{
             if(res.status==200){
               alert("修改成功，请重新登录!");
               localStorage.setItem("isLogin",false);
               localStorage.setItem("userName",null);
               this.$router.push({path:'/home'});
             }
        })
      },
      resumechat(data){//企业交流
          this.$emit('chatresume',data);
      }

    },
    mounted(){
      this.getuserinfor();
      this.getmysendjobs();
      this.getmysendjobstype();
      window.onbeforeunload = (e) =>{
        var that=this;
        e = e || window.event;
        if (e&&that.hassave==false) {
      e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      if(that.hassave==false){
      return "您是否确认离开此页面-您输入的数据可能不会被保存";
     }
   };
    },
    watch:{
      $route(){
        this.getuserinfor();
      },
      mymesForm:{
        deep:true,
        handler:function(){
          if(this.firstload==false){
            this.firstload=true;
          }else{
            this.hassave=false;
          }
        }
      }
    },
     beforeRouteLeave(to,from,next){
      if(this.hassave==false){
        this.global_confirm('您的修改尚未保存，是否确认离开?').then(()=>{
          next()
        }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消跳转'
        })
      })
    }else{
      next();
     }
    }

}

</script>