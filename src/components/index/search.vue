<template>
  <div class="search">
  <el-input placeholder="搜索职位、公司" v-model="indexser.search" class="input-with-select">
    <el-select v-model="indexser.selectjob" slot="prepend" placeholder="职位类型">
      <el-option label="全职" value="全职"></el-option>
      <el-option label="实习" value="实习"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click.native="searchjob(indexser.search,indexser.selectjob)"></el-button>
  </el-input>
</div>
</template>

<style scoped>
  .search{
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
          indexser:{
          selectjob:'',
          search:'',
          }
        } 
    },      
      methods:{
      searchjob(ser,sel){
       //this.$emit('indexsearch',this.indexser)
        this.$router.push({
        path:'/details',
        query:{
          jobid:ser,
          jobtype:sel
        }
        });
      },
    },

  }
</script>