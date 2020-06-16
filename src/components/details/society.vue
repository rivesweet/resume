<template>
  <div class="detailsearch">
  <el-input placeholder="输入职位,公司" v-model="detail.search" class="input-with-select">
    <el-select v-model="detail.select" slot="prepend" placeholder="职位类型">
      <el-option label="全职" value="全职"></el-option>
      <el-option label="实习" value="实习"></el-option>
    </el-select>
  </el-input>
</div>


</template>

<style scoped>
  .detailsearch{
    display:flex;
    justify-content:center;
  }
  .el-input{
    width:600px;
    margin-bottom:30px;
  }
  .el-select{
    width:120px;
    height:40px;
  }
</style>

<script>

export default{
    data(){
        return{
          detail:{
            search:'',
            select:''
          },
          sendtable:[]
        }
    },
    methods:{
      getjob(){
        this.detail.search=this.$route.query.jobid;
        this.detail.select=this.$route.query.jobtype;
        },
        //@click.native="searchjob(detail.search,detail.select)"
      searchjob(ser,sel){
        this.$router.push({
        path:'/details',
        query:{
          jobid:ser,
          jobtype:sel
        }
        });
      },
      showjobs(){
        let data={searchname:this.detail.search,searchtype:this.detail.select}
        this.$http.get('/dbapi/getselectjobs',{params:data}).then((res)=>{
          if(res.data!=0){
            this.sendtable=res.data;
            this.$emit('postjob',this.sendtable);//传给父组件
          }
          else{
            this.$emit('postjob',null);
          }
        })
      }
      },
    watch:{
      $route(){
        this.getjob();
        this.showjobs();
      },
      detail:{
        deep:true,
        handler:function(){
          this.showjobs();
          this.$router.push({
        path:'/details',
        query:{
          jobid:this.detail.search,
          jobtype:this.detail.select
        }
        });
        }
      }
    },
    mounted(){
      this.getjob();
    }
    //updated(){//实时触发
      //this.showjobs();
   //}
}

</script>