<template>
<div class="jobslist">

<div>
  <el-backtop></el-backtop>
</div>

<div class="jobdrops">
<el-dropdown @command="showeducation">
  <span class="el-dropdown-link">
    {{educationcommand}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item command="学历要求">不限</el-dropdown-item>
    <el-dropdown-item command="高中">高中</el-dropdown-item>
    <el-dropdown-item command="大专">大专</el-dropdown-item>
    <el-dropdown-item command="本科">本科</el-dropdown-item>
    <el-dropdown-item command="硕士">硕士</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

<el-dropdown @command="showmoney">
  <span class="el-dropdown-link">
    {{moneycommand}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item command="薪资要求">不限</el-dropdown-item>
    <el-dropdown-item command="2-4k">2-4K</el-dropdown-item>
    <el-dropdown-item command="4-8k">4-8K</el-dropdown-item>
    <el-dropdown-item command="8-10k">8-10K</el-dropdown-item>
    <el-dropdown-item command="10-100k">10K以上</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

<div>
<el-button icon="el-icon-s-promotion" type="primary" @click="clearselect">清空选择</el-button>
<el-button icon="el-icon-info" type="success" @click="match">为你匹配</el-button>
</div>

</div>

<div class="selectcity">
   <div>
    <el-radio-group v-model="citycommand">
      <el-radio-button label="热门城市" disabled></el-radio-button>
      <el-radio-button label="不限"></el-radio-button>
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="湖北"></el-radio-button>
      <el-radio-button label="湖南"></el-radio-button>
      <el-radio-button label="西安"></el-radio-button>
      <el-radio-button label="苏州"></el-radio-button>
      <el-radio-button label="厦门"></el-radio-button>
    </el-radio-group>
  </div>
</div>

 <el-table :data="tablelist">
     <el-table-column type="expand">
      <template slot-scope="secondscope">
        <el-form label-position="left" inline class="demo-table-expand">
         <el-form-item v-for="detail in tablelistsecondtype" :label="detail.propsname" :property="detail.props" :key="detail.props">
          <span v-html="secondscope.row[detail.props]"></span>
          </el-form-item>
      </el-form>
      </template>
    </el-table-column>

    <el-table-column v-for="item in tablelistmaintype" :label="item.propsname" :property="item.props" :key="item.props">
    <template slot-scope="scope">
    <span style="center">{{ scope.row[scope.column.property] }}</span>
    </template>
    </el-table-column>

    <el-table-column label="投递简历">
          <template slot-scope="scopesubmit">
　　　　　　<el-button type="primary" @click="submitinfor(scopesubmit.row)">投递</el-button>
　　　　</template>
    </el-table-column>
</el-table>

</div>
</template>

<style scoped>
.jobslist{
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    flex-direction:column;
  }
.jobdrops{
  display:flex;
  justify-content:space-around;
  margin-bottom:20px;
}
.selectcity{
   display:flex;
  justify-content:center;
  margin-bottom:30px;
}

.demo-table-expand{
  display:flex;
  flex-direction:column;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
    export default {
      data() {
        return {
          tablelistmaintype:[],
          tablelistsecondtype:[],
          tablelist:[],//页面显示的岗位列表
          oldlist:[],//保存最初岗位状态,
          educationcommand:'学历要求',
          moneycommand:'薪资要求',
          citycommand:'不限',
        }
      },
      props:['getvalues'],
      methods:{
        showjobsmaintype(){//获取主要类型
          let data='joblistmainname';
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
        showjobslist(){//获取职位数据
          let data='joblist';
          this.$http.get('/dbapi/getalljobs',{params:{tablename:data}}).then((res)=>{
            this.tablelist=res.data;
            this.oldlist=res.data;
          })
        },
        submitinfor(val){//投递简历
          let logname=localStorage.getItem('userName');
          let lognames=/^\d+$/.test(logname);
          if(logname=='null'){
            this.global_route('请先登录!').then(()=>{
              this.$router.push({
                path:'/login'
              })
            }).catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
            })
          }else if(lognames==true){
            this.global_route('企业不能申请职位!').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
            })
          }
          else if(logname=='admin'){
            this.global_route('管理员不能申请职位!').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
            })
          }
          else{
           this.$http.get('/dbapi/getuserinfor',{params:{username:logname}}).then((res)=>{
            if(res.data[0].age==null||res.data[0].education==null||res.data[0].usertruename==null||res.data[0].experience==null){
              this.global_route('您的简历尚未完善，请先填写!').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
            })
             }else{
            let data={username:logname,sendcompany:val.companyname,sendjob:val.jobname,companyid:val.companyid}
            this.$http.post('/dbapi/searchsendjob',data).then((res)=>{
              if(res.data==1){
                 this.global_route('您已投递过该职位，请勿再次申请!').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消投递'
              })
            })
              }else{
                this.global_confirm('是否投递该职位?').then(()=>{
                  this.$http.post('/dbapi/sendjob',data).then((res)=>{
                  if(res.data==1){
                    this.$message({
                     type: 'success',
                     message: '投递成功!'
                     });
                  let clicknum=val.click+1;//更新投递次数
                  let updata={click:clicknum,companyname:val.companyname,jobname:val.jobname}
                  this.$http.post('/dbapi/sendjobclick',updata).then((res)=>{
                    this.$router.go(0);
                  });
                  }
                })
                }).catch(()=>{
                   this.$message({
                   type: 'info',
                   message: '已取消投递'
                })
                })
              }
            })
             }
           })
            
          }
        },
        showeducation(command){//显示学历
          this.educationcommand=command;
        },
        showmoney(command){//显示薪酬
          this.moneycommand=command;
        },
        selecteducated(){//匹配学历要求
           var newarray=[];          
           if(this.educationcommand!='学历要求'){
             newarray=this.oldlist.filter((value)=>{
               return value.education==this.educationcommand;
             })
             return newarray;
           }else{
             return this.oldlist;
           }
        },
        selectmoney(){//匹配薪资要求
          var newarray=[];
          var needmoney=this.moneycommand.replace(/k/g,"");//转换薪资要求
          needmoney=needmoney.split("-");
          for(var i=0;i<this.oldlist.length;i++){//薪酬转换成数字
          var n=this.oldlist[i].money.replace(/k/g,"");
           n=n.split("-");
           this.oldlist[i].moneystate=n;
          }
          if(this.moneycommand!='薪资要求'){
          newarray=this.oldlist.filter((value)=>{
            return value.moneystate[0]-needmoney[1]<=0&&value.moneystate[1]-needmoney[0]>=0
          })
           return newarray;
          }else{
            return this.oldlist;
          }
        },
        selectthecity(){//匹配城市要求
           var newarray=[];          
           if(this.citycommand!='不限'){
             return this.citycommand;
           }else{
             return true;
           }
        },
        showselectlist(){//展示匹配数据
          var educateddata=this.selecteducated();
          var moneydata=this.selectmoney();
          var citycommand=this.selectthecity();
          var newarr=[];

          for(var edu=0;edu<educateddata.length;edu++){
            for(var mon=0;mon<moneydata.length;mon++){
              if(educateddata[edu].companyid==moneydata[mon].companyid&&educateddata[edu].jobname==moneydata[mon].jobname){
                newarr.push(educateddata[edu]);
               }
            }
          }
          if(citycommand!=true){
          for(var newkey=0;newkey<newarr.length;newkey++){
            var newsarr=newarr.filter((value)=>{
              return value.place.indexOf(citycommand)!=-1;
            })
            this.tablelist=newsarr;
          }
          }else{
          this.tablelist=newarr;
          }
        },
        clearselect(){//清空选择
          this.educationcommand="学历要求";
          this.moneycommand="薪资要求";
          this.citycommand="不限";
          this.tablelist=this.oldlist;
        },
        match(){//匹配个人意向
          let logstate=localStorage.getItem('isLogin');
          let loguser=localStorage.getItem('userName');
          let lognames=/^\d+$/.test(loguser);
          if(logstate=='false'){
            alert('请先登录!')
            this.$router.push({
                path:'/login'
              })
          }else if(lognames==true){
            this.$message('企业不能匹配职位');
          }else{
            this.$http.get('/dbapi/getuseridea',{params:{username:loguser}}).then((res)=>{
              let newarray=[];
              if(res.data[0].personalidea==''&&res.data[0].ideaplace==''||res.data[0].personalidea==null&&res.data[0].ideaplace==null){
                this.$message("您尚未输入任何期望")
                newarray=this.oldlist;
              }else{
              let ideas=res.data[0].personalidea.split("，");
              let places=res.data[0].ideaplace.split("，");
              for(let ideaskey=0;ideaskey<ideas.length;ideaskey++){
                for(let placeskey=0;placeskey<places.length;placeskey++){
                  newarray.push(...this.oldlist.filter((value)=>{
                    return (value.jobname.indexOf(ideas[ideaskey])!=-1||value.skills.indexOf(ideas[ideaskey])!=-1)&&(value.place.indexOf(places[placeskey])!=-1)
                  }))
                }
              }
              }
              for(let i=0;i<newarray.length;i++){//去重
                 if(newarray.indexOf(newarray[i])!=i){
                   newarray.splice(i,1);
                 }
              }
              this.tablelist=newarray;
            })
          }
        }
      },
      watch:{
          getvalues:function(val){
            this.tablelist=val;//赋值给数组
            this.oldlist=val;
          },
          educationcommand:function(){
            this.selecteducated();
            this.showselectlist();
          },
          moneycommand:function(){
            this.selectmoney();
            this.showselectlist();
          },
          citycommand:function(){
            this.showselectlist();
          }
      },
      created(){
        this.showjobsmaintype();
        this.showjobssecondtype();
        this.showjobslist();
      },
    }
  </script>