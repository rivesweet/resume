<template>

<div class="personalpage">

<div class="myinf">
   
   <div class="personalbutton">
    <el-radio-group v-model="selectpoint" @change="showdate()">
      <el-radio-button label="adminnewjob">岗位审核</el-radio-button>
      <el-radio-button label="adminjobs">岗位管理</el-radio-button>
    </el-radio-group>
   </div>


<div v-show="adminnewjob">
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
　　 <el-button type="primary" @click="modsendjob(scopesubmit.row)">审核</el-button>
    <el-button type="primary" @click="deletes(scopesubmit.row)">删除</el-button>
　　　</template>
    </el-table-column>
</el-table>
</div>



</div>
</div>
</template>

<style scoped>
.el-table{
    width:800px;
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

</style>


<script>

export default{
    data(){
      
      return{
        selectpoint:'adminnewjob',
        adminnewjob:true,
        companydetails:'',
        tablelistmaintype:[],//获取该公司发送的简历
        tablelistsecondtype:[],
        tablelist:[],
  
      }
    },
    methods:{
        getenter(){//简介添加换行符
            this.companydetails=this.sendjobsForm.senddetails+'<br>';
           // console.log(this.companydetails);
        },
      showdate(){//显示表格
       this.adminnewjob=true;
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
        showjobslist(){//获取即将审核的数据
          let data='joblist';
          this.$http.get('/dbapi/getnewjobs',{params:{tablename:data}}).then((res)=>{
            this.tablelist=res.data;
          })
        },
      deletes(data){//删除职位
          let deletedata={companyid:data.companyid,jobname:data.jobname,itemtype:data.itemtype,
          place:data.place};
          this.global_confirm('是否确认删除?').then(()=>{
                  this.$http.post('/dbapi/deletejob',deletedata).then((res)=>{
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
      modsendjob(data){//审核职位
          let addjob={companyid:data.companyid,jobname:data.jobname,itemtype:data.itemtype,
          place:data.place,state:'审核完成'};
          let failjob={companyid:data.companyid,jobname:data.jobname,itemtype:data.itemtype,
          place:data.place,state:'审核不通过'};
          this.global_confirm('是否通过?').then(()=>{
                  this.$http.post('/dbapi/addjob',addjob).then((res)=>{
                  if(res.data==1){
                    this.$message({
                     type: 'success',
                     message: '审核成功!'
                     });
                     this.$router.go(0);
                  }
                })
                }).catch(()=>{
                    this.$http.post('/dbapi/addjob',failjob).then((res)=>{
                  if(res.data==1){
                   this.$message({
                   type: 'info',
                   message: '审核不通过'
                })
                  this.$router.go(0);
                  }
                })
                })
      },

    },
    created(){
        this.showjobsmaintype();
        this.showjobssecondtype();
        this.showjobslist();
      }

}

</script>