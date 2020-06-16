<template>

<div class="personalpage">
<div class="myinf">

   <div class="personalbutton" >
    <el-radio-group v-model="selectpoint" @change="showdate()">
      <el-radio-button label="companyinfor">企业信息</el-radio-button>
      <el-radio-button label="companysendnote" >上传简历</el-radio-button>
      <el-radio-button label="companynotes" >上传过的简历</el-radio-button>
      <el-radio-button label="modpass">修改密码</el-radio-button>
      <el-radio-button label="senduser">查看投递用户</el-radio-button>
    </el-radio-group>
   </div>

  <div class='companymesform' v-show="showmess">
<el-form :model="companymesForm" status-icon :rules="companymesFormrules" ref="companymesForm" label-position="left" label-width="80px">
 
  <el-form-item label="手机号" prop="mobilephone">
    <el-input  v-model="companymesForm.mobilephone":disabled="true"></el-input>
  </el-form-item>

  <el-form-item label="公司名" prop="companyname">
    <el-input v-model="companymesForm.companyname" autocomplete="off" :disabled="comdisable" ></el-input>
  </el-form-item>

  <el-form-item label="HR姓名" prop="hrname">
    <el-input  v-model="companymesForm.hrname" autocomplete="off" ></el-input>
  </el-form-item>

  <el-form-item label="公司类型" prop="companytype">
    <el-input  v-model="companymesForm.companytype"></el-input>
  </el-form-item>

  <el-form-item label="简介" prop="introduce">
    <el-input type="textarea" v-model="companymesForm.introduce"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="success" @click="submitinforForm('companymesForm')" class="submitbutton">保存</el-button>
  </el-form-item>
</el-form>
</div>


<div v-show="showsendnote">
<el-form :model="sendjobsForm" status-icon :rules="sendjobsFormrules" ref="sendjobsForm" label-position="left" label-width="80px" >
 
  <el-form-item label="职位" prop="jobname">
    <el-input  v-model="sendjobsForm.jobname"></el-input>
  </el-form-item>
  

   <el-form-item label="薪酬" prop="money">
    <el-input size="medium" v-model="sendjobsForm.moneypartf" autocomplete="off" class="moneypart"></el-input>
    k -
    <el-input size="medium" v-model="sendjobsForm.moneyparts" autocomplete="off" class="moneypart"></el-input>
    k
  </el-form-item>


  <el-form-item label="职位类型" prop="itemtype">
    <el-select v-model="sendjobsForm.itemtype" placeholder="请选择类型"  style="width: 300px;">
      <el-option label="全职" value="全职"></el-option>
      <el-option label="实习" value="实习"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="工作地点" prop="place">
    <el-input  v-model="sendjobsForm.place"></el-input>
  </el-form-item>

  <el-form-item label="学历" prop="education">
    <el-select v-model="sendjobsForm.education" placeholder="请选择学历要求"  style="width: 300px;">
      <el-option label="不限" value="不限"></el-option>
      <el-option label="初中" value="初中"></el-option>
      <el-option label="高中" value="高中"></el-option>
      <el-option label="大专" value="大专"></el-option>
      <el-option label="本科" value="本科"></el-option>
      <el-option label="硕士/博士" value="硕士/博士"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="招聘人数" prop="needamount">
    <el-input  v-model="sendjobsForm.needamount"></el-input>
  </el-form-item>
  
  <el-form-item label="技能要求" prop="skills">
    <el-input  v-model="sendjobsForm.skills"></el-input>
  </el-form-item>

  <el-form-item label="岗位描述" prop="details">
    <el-input type="textarea" v-model="sendjobsForm.details"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="success" @click="submitsendForm('sendjobsForm')" class="submitbutton">上传</el-button>
  </el-form-item>
</el-form>
</div>

<div v-show="shownotes">
 <el-table :data="tablelist" height='500'>
     <el-table-column type="expand">
      <template slot-scope="secondscope">
        <el-form label-position="left" inline class="demo-table-expand">
         <el-form-item v-for="detail in tablelistsecondtype" :label="detail.propsname" :property="detail.props" :key="detail.props">
          <span v-html="secondscope.row[detail.props]"></span>
          </el-form-item>
      </el-form>
      </template>
    </el-table-column>

    <el-table-column v-for="item in tablelistmaintype" :label="item.propsname"
     :property="item.props" :key="item.props">
    <template slot-scope="scope">
    <span style="center">{{ scope.row[scope.column.property] }}</span>
    </template>
    </el-table-column>

    <el-table-column label="操作">
    <template slot-scope="scopesubmit">
     <el-button type="primary" @click="modsendjob(scopesubmit.row)" >修改</el-button>
     <el-button type="primary" @click="delect(scopesubmit.row)">删除</el-button>
　　　</template>
    </el-table-column>
</el-table>

<el-dialog title="修改岗位" :visible.sync="showdialog" width='500px' :close-on-click-modal="false" :modal-append-to-body="false">
<el-form :model="newjobsForm" status-icon :rules="sendjobsFormrules" ref="sendjobsForm" label-position="left" label-width="80px" >
 
  <el-form-item label="职位" prop="jobname">
    <el-input  v-model="newjobsForm.jobname" disabled></el-input>
  </el-form-item>

   <el-form-item label="薪酬" prop="money">
     <el-input  v-model="newjobsForm.money" placeholder="请输入薪酬"  style="width: 300px;"></el-input>
  </el-form-item>

  <el-form-item label="职位类型" prop="itemtype">
    <el-select v-model="newjobsForm.itemtype" placeholder="请选择类型"  style="width: 300px;">
      <el-option label="全职" value="全职"></el-option>
      <el-option label="实习" value="实习"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="工作地点" prop="place">
    <el-input  v-model="newjobsForm.place"></el-input>
  </el-form-item>

  <el-form-item label="学历" prop="education">
    <el-select v-model="newjobsForm.education" placeholder="请选择学历要求"  style="width: 300px;">
      <el-option label="不限" value="不限"></el-option>
      <el-option label="初中" value="初中"></el-option>
      <el-option label="高中" value="高中"></el-option>
      <el-option label="大专" value="大专"></el-option>
      <el-option label="本科" value="本科"></el-option>
      <el-option label="硕士/博士" value="硕士/博士"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="招聘人数" prop="needamount">
    <el-input  v-model="newjobsForm.needamount"></el-input>
  </el-form-item>
  
  <el-form-item label="技能要求" prop="skills">
    <el-input  v-model="newjobsForm.skills"></el-input>
  </el-form-item>

  <el-form-item label="岗位描述" prop="details">
    <el-input type="textarea" v-model="newjobsForm.details"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitnewjob('sendjobsForm')" size="medium">修改</el-button>
    <el-button type="info" @click="cancelmod()" size="medium">取消</el-button>
  </div>
</el-dialog>

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

<div v-show="showsenduser">
<el-table :data="sendtablelist" height='500'>
     
  <el-table-column v-for="item in userlistmaintype" :label="item.propsname"
     :property="item.props" :key="item.props">
    <template slot-scope="scope">
    <span style="center">{{ scope.row[scope.column.property] }}</span>
    </template>
  </el-table-column>

  <el-table-column label="操作" >
    <template slot-scope="scopesubmit">
    <el-button @click="seeuser(scopesubmit.row)" type="text" size="small">查看用户信息</el-button>
    <el-button @click="chatwithuser(scopesubmit.row)" type="text" size="small">对话</el-button>
　   </template>
</el-table-column>


</el-table>
</div>


</div>
</div>
</template>

<style scoped>
.el-table{
    width:850px;
}
.el-button--primary {
  display:inline-block;
  width:100px;
  margin-left:0px;
  margin-bottom:5px;
}
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
        height:570px;
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
.demo-table-expand{
  display:flex;
  flex-direction:column;
}

.dialog-footer{
  display:flex;
  justify-content:space-around;
}

.moneypart{
  width:100px;
}
</style>


<script>

export default{
    data(){
      var checkmoney=(rule,value,callback)=>{
        let partnumf=/^\d+$/.test(this.sendjobsForm.moneypartf);
        let partnums=/^\d+$/.test(this.sendjobsForm.moneyparts);
        if(this.sendjobsForm.moneypartf==''||this.sendjobsForm.moneyparts==''){
          callback(new Error('请输入完整薪酬'))
        }else if((this.sendjobsForm.moneypartf-this.sendjobsForm.moneyparts)>0||this.sendjobsForm.moneypartf<=0||this.sendjobsForm.moneyparts<=0
        ||partnumf==false||partnums==false){
          callback(new Error('请输入正确的薪酬'))
        }else{
          callback();
        }
      }
      var checkoldpass=(rule,value,callback)=>{
        let logdata=localStorage.getItem('userName');
        let logcompany=parseInt(logdata);
        this.$http.get('/dbapi/getcompanypass',{params:{companyid:logcompany}}).then((res)=>{
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
        selectpoint:'companyinfor',
        showmess:true,
        comdisable:false,//企业只能进行第一次改名
        showsendnote:false,
        shownotes:false,
        showmodp:false,
        showsenduser:false,
        companydetails:'',
        checktime:'',
        showdialog:false,//显示修改框
        firstload:false,//首次监听
        hassave:true,//是否已保存
        companymesForm:{//企业信息表单
          mobilephone:'',
          companyname:'',
          hrname:'',
          companytype:'',
          introduce:''
        },  
        sendjobsForm:{//上传岗位表单
          jobname:'',
          money:'',
          moneypartf:'',
          moneyparts:'',
          place:'',
          itemtype:'',
          education:'',
          needamount:'',
          skills:'',
          details:''
        },
        newjobsForm:{//修改岗位
          jobname:'',
          money:'',
          place:'',
          itemtype:'',
          education:'',
          needamount:'',
          skills:'',
          details:''
        },
        mysendjobstype:[],
        mysendjobs:[],
        modpassForm:{//修改密码
          oldpassword:'',
          newpassword:'',
          comfirmpass:''
        },
        tablelistmaintype:[],//获取该公司发送的简历
        tablelistsecondtype:[],
        tablelist:[],
        userlistmaintype:[],//获取投递的用户
        userlistsecondtype:[],
        sendtablelist:[],
  
        companymesFormrules:{//信息表单规则
          mobilephone:[
            {required:true,message:'请输入手机号',trigger:'blur'}
          ],
          companyname:[
            {required:true,message:'请输入公司名',trigger:'blur'}
          ]
        },
        sendjobsFormrules:{//上传表单规则
          jobname:[
            {required:true,message:'请输入职位',trigger:'blur'},
          ],
          money:[
            {required:true,message:'请输入薪酬',trigger:'blur'},
            {validator:checkmoney , trigger: 'blur'}
          ],
          itemtype:[
            {required:true,message:'请输入职位类型',trigger:'blur'},
          ],
          place:[
            {required:true,message:'请输入工作地点',trigger:'blur'},
          ],
          education:[
            {required:true,message:'请输入学历',trigger:'blur'},
          ],
          needamount:[
            {required:true,message:'请输入招聘人数',trigger:'blur'},
          ],
          skills:[
            {required:true,message:'请输入技能要求',trigger:'blur'},
          ],
          details:[
            {required:true,message:'请输入岗位描述',trigger:'blur'},
          ],
        },
        modpassrules:{//修改密码规则
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
        getenter(){//简介添加换行符
            this.companydetails=this.sendjobsForm.senddetails+'<br>';
           // console.log(this.companydetails);
        },
      showdate(){//显示表格
        this.selectpoint=='companyinfor'?(this.showmess=true,this.showsendnote=false,this.shownotes=false,this.showmodp=false,this.showsenduser=false)
        :this.selectpoint=='companysendnote'?(this.showmess=false,this.showsendnote=true,this.shownotes=false,this.showmodp=false,this.showsenduser=false)
        :this.selectpoint=='companynotes'?(this.showmess=false,this.showsendnote=false,this.shownotes=true,this.showmodp=false,this.showsenduser=false)
        :this.selectpoint=='modpass'?(this.showmess=false,this.showsendnote=false,this.shownotes=false,this.showmodp=true,this.showsenduser=false)
        :(this.showmess=false,this.showsendnote=false,this.shownotes=false,this.showmodp=false,this.showsenduser=true)
      },
      getcompanyinfor(){//获取企业信息
        var logdata=localStorage.getItem('userName');
        var logcompany=parseInt(logdata);
        this.$http.get('/dbapi/getcompanyinfor',{params:{companyid:logcompany}}).then((res)=>{
          this.companymesForm.mobilephone=res.data[0].companymobile;
          this.companymesForm.companyname=res.data[0].companyname;
          if(this.companymesForm.companyname!=null){
            this.comdisable=true;
          }
          this.companymesForm.hrname=res.data[0].hrname;
          this.companymesForm.companytype=res.data[0].companytype;
          this.companymesForm.introduce=res.data[0].introduce;
        })
      },
      submitinforForm(formName) {//更新企业信息
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let logdata=localStorage.getItem('userName');
            var logcompany=parseInt(logdata);
            let data = {'mobilephone':this.companymesForm.mobilephone,'companyname':this.companymesForm.companyname,
            'hrname':this.companymesForm.hrname,'companytype':this.companymesForm.companytype,
            'introduce':this.companymesForm.introduce,companyid:logcompany}
            let confirmdetail='是否保存?'
            if(this.comdisable==false){
                confirmdetail='企业只能输入一次公司姓名，是否保存?'
            }
            this.global_confirm(confirmdetail).then(()=>{
                this.$http.post('/dbapi/updatecompanymes',data).then((res)=>{
                    if(res.status == 200){
                        this.$message({
                         type: 'success',
                         message: '保存成功!'
                         });
                         this.hassave=true;
                         this.$router.go(0);
                    }
                })
            }).catch(()=>{
                  this.$message({
                         type: 'info',
                         message: '已取消保存'
                         });
                })
          }
           else{
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitsendForm(formName) {//上传岗位
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let loguser=localStorage.getItem('userName');
              let logcompany=parseInt(loguser);
              if(this.companymesForm.companyname==null){
              this.global_route('您的公司信息尚未填写!').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
              })
              }
            else{
            let data = {'companyname':this.companymesForm.companyname,'sendmoney':this.sendjobsForm.money,'sendjobtype':this.sendjobsForm.itemtype,
            'sendworkplace':this.sendjobsForm.place,'sendeducated':this.sendjobsForm.education,'sendnumber':this.sendjobsForm.needamount,
            'sendneed':this.sendjobsForm.skills,'senddetails':this.sendjobsForm.details,'sendjob':this.sendjobsForm.jobname,
            'companyid':logcompany,'click':0,'state':'审核中'}
            this.global_confirm('是否提交?').then(()=>{
                this.$http.post('/dbapi/companysendform',data).then((res)=>{
                    console.log(res);
                    if(res.status == 200){
                        this.$message({
                        type: 'success',
                        message: '上传岗位成功!'
                        });
                        this.hassave=true;
                        this.$router.go(0);
                    }
                })
            }).catch(()=>{
                   this.$message({
                   type: 'info',
                   message: '已取消'
                })
            })
            }
          }
           else{
            return false;
          }
        });
      },
        showjobsmaintype(){//获取主要类型
          let data='admin_job';
          this.$http.get('/dbapi/getjobstype',{params:{tablename:data}}).then((res)=>{
            this.tablelistmaintype=res.data;
          })
        },
        showjobssecondtype(){//获取次要类型
          let data='joblistsecondname';
          this.$http.get('/dbapi/getjobstype',{params:{tablename:data}}).then((res)=>{
            this.tablelistsecondtype=res.data;
          })
        },
        showjobslist(){//获取岗位数据
          let data='joblist';
          let loguser=localStorage.getItem('userName');
          var logcompanyid=parseInt(loguser);
          this.$http.get('/dbapi/getcompanyjobs',{params:{tablename:data,companyid:logcompanyid}}).then((res)=>{
            this.tablelist=res.data;
          })
        },
      submitpassForm(){//提交密码
        let logdata=localStorage.getItem('userName');
        var logcompany=parseInt(logdata);
        let data={'companyid':logcompany,'newpassword':this.modpassForm.newpassword}
        this.$http.post('/dbapi/updatecompanypass',data).then((res)=>{
             if(res.status==200){
               alert("修改成功，请重新登录!");
               localStorage.setItem("isLogin",false);
               localStorage.setItem("userName",null);
               this.$router.push({path:'/home'});
             }
        })
      },
      modsendjob(data){//显示需修改发布的岗位
        this.showdialog=true;
        for(var key in data){
          for(var newkey in this.newjobsForm)
         {
            if(key==newkey){
              this.newjobsForm[newkey]=data[key];
            }
         }
        }
          var needmoney=data.money.replace(/k/g,"");//转换薪资要求
          needmoney=needmoney.split("-");
          this.sendjobsForm.moneypartf=needmoney[0];
          this.sendjobsForm.moneyparts=needmoney[1];
      },
      submitnewjob(formName) {//上传修改后的岗位
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let loguser=localStorage.getItem('userName');
              let logcompany=parseInt(loguser);
            let data = {'companyname':this.companymesForm.companyname,'sendmoney':this.newjobsForm.money,'sendjobtype':this.newjobsForm.itemtype,
            'sendworkplace':this.newjobsForm.place,'sendeducated':this.newjobsForm.education,'sendnumber':this.newjobsForm.needamount,
            'sendneed':this.newjobsForm.skills,'senddetails':this.newjobsForm.details,'sendjob':this.newjobsForm.jobname,
            'companyid':logcompany,'state':'审核中'}
            this.global_confirm('是否更新提交?').then(()=>{
                this.$http.post('/dbapi/updatesendform',data).then((res)=>{
                    if(res.status == 200){
                        this.$message({
                        type: 'success',
                        message: '更新岗位成功!'
                        });
                        this.$router.go(0);
                    }
                })
            }).catch(()=>{
                   this.$message({
                   type: 'info',
                   message: '已取消'
                })
            })
          }
           else{
            return false;
          }
        });
      },
      cancelmod(){//取消修改岗位
       this.global_confirm('是否取消修改?').then(()=>{
         this.showdialog=false;
       }).catch(()=>{
           this.$message({
                   type: 'info',
                   message: '已取消'
                })
       })
      },
      delect(data){//删除岗位
          let delectdata={companyid:data.companyid,jobname:data.jobname,itemtype:data.itemtype,
          place:data.place};
          this.global_confirm('是否确认删除?').then(()=>{
                  this.$http.post('/dbapi/deletejob',delectdata).then((res)=>{
                  if(res.data==1){
                    this.$message({
                     type: 'success',
                     message: '删除成功!'
                     });
                     this.$router.go(0);
                  }
                })
                }).catch(()=>{
                   this.$message({
                   type: 'info',
                   message: '已取消删除'
                })
                })
      },
      showusermaintype(){//获取用户主要类型
          let data='user_send_type';
          this.$http.get('/dbapi/getjobstype',{params:{tablename:data}}).then((res)=>{
            this.userlistmaintype=res.data;
          })
        },
        showusersecondtype(){//获取用户次要类型
          let data='personal_infor_type';
          this.$http.get('/dbapi/getjobstype',{params:{tablename:data}}).then((res)=>{
            this.userlistsecondtype=res.data;
          })
        },
        showuserlist(){//获取用户职位数据
          let loguser=localStorage.getItem('userName');
          var logcompanyid=parseInt(loguser);
          this.$http.get('/dbapi/getcompanyname',{params:{companyid:logcompanyid}}).then((res)=>{
            if(res.data!=0){
                var logcompanyname=res.data;
                this.$http.get('/dbapi/getuserjob',{params:{companyname:logcompanyname}}).then((res)=>{
                  if(res.data!=-1){
                       this.sendtablelist=res.data;
                  }
                })
            }

          })
        },
      seeuser(data){//查看投递用户
        let thisuser=data.username;
        let logcompany=localStorage.getItem('userName');
        let logcompanyid=parseInt(logcompany);
          this.$http.get('/dbapi/getuserinfor',{params:{username:thisuser}}).then((res)=>{
                let userarray=[];//定义新数组
                const h=this.$createElement;
                for(let useritem in this.userlistsecondtype){//遍历返回的用户信息和需要显示的属性
                  for(let userinfor in res.data[0]){
                    if(this.userlistsecondtype[useritem].props==userinfor){
                      let kk=this.userlistsecondtype[useritem].propsname+":"+res.data[0][userinfor];
                      userarray.push(h('p',null,kk));
                    }
                  }
                }
                this.$msgbox({
                  title:'用户信息',
                  message:h('div',null,userarray),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                   cancelButtonText: '取消',
                }).then(() => {
                    this.$message({
                     type: 'info',
                     message:'已查看'
                 });
                 let senddate={state:'已查看',companyid:logcompanyid,username:thisuser};
                 this.$http.post('/dbapi/setstate',senddate).then((res)=>{
                 })
                 }).catch(()=>{
                   this.$message({
                     type: 'info',
                     message:'尚未确认'
                   })
                 })

          })
      },
      chatwithuser(data){//企业与用户沟通
        this.$emit('chattheuser',data);
      }
    },
    watch:{
      $route(){
        this.getcompanyinfor();
      },
      companymesForm:{
         deep:true,
         handler:function(){
           if(this.firstload==false){
             this.firstload=true;
           }else{
             this.hassave=false;
           }
         }
      },
      sendjobsForm:{
         deep:true,
         handler:function(){
           this.hassave=false;
         }
      },
      'sendjobsForm.moneypartf'(){
       let partf=this.sendjobsForm.moneypartf+'k-'
       let parts=this.sendjobsForm.moneyparts+'k';
       this.sendjobsForm.money=partf+parts;
      },
      'sendjobsForm.moneyparts'(){
       let partf=this.sendjobsForm.moneypartf+'k-'
       let parts=this.sendjobsForm.moneyparts+'k';
       this.sendjobsForm.money=partf+parts;
      }

    },
    created(){
        this.getcompanyinfor();
        this.showjobsmaintype();
        this.showjobssecondtype();
        this.showjobslist();
        this.showusermaintype();
        this.showusersecondtype();
        this.showuserlist();
      },
      mounted(){
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