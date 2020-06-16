<template>
<div>
  <div class="search">
  <el-autocomplete placeholder="搜索公司" v-model="mysearch" class="inline-input"
  :fetch-suggestions="querySearch" :trigger-on-focus="false" autocomplete="off">
  <el-button slot="append" icon="el-icon-search" @click.native="searchcompany(mysearch)"></el-button>
  </el-autocomplete>
    
  
</div>

<div class="companydetail">
  <el-card class="box-card">
  <div slot="header" class="clearfix" v-if="companydetails.length>0">
    <span>{{companydetails[0].companyname}}</span>
    <el-button class="chatclass" @click.native="beginchat()" v-show="hascompany">聊天</el-button>
  </div>
  <div v-for="names in companytype" :key="names.props" class="text items">
  <span class="text item1">
    {{names.propname}}:
  </span> 
  <span v-for="(value,key) in companydetails[0]" :key="key" class="text item2">
  <span v-if="key==names.props">
  {{value}}
  </span>
  </span>
  </div>

</el-card>

</div>

</div>
</template>

<style scoped>
  .search{
    display:flex;
    justify-content:center;
  }
  .el-autocomplete{
    width:300px;
    margin-bottom:30px;
  }
  .chatclass{
    float:right;
    margin-bottom:5px;
  }

</style>

<script>
  export default{
      data(){
        return{
          mysearch:'',
          companytype:[],
          companydetails:[],
          hascompany:false
        } 
    },
      methods:{
        getcompanytype(){//显示公司简介类型
          this.$http.get('/dbapi/getcompanytype').then((res)=>{
              if(res.data!=-1){
                this.companytype=res.data;
              }
          })
        },
      searchcompany(ser){//显示公司简介
        this.$http.get('/dbapi/getcompanydetails',{params:{companyname:ser}}).then((res)=>{
          this.companydetails=res.data;
          if(res.data!=-1){
            this.hascompany=true;
          }else{
            this.hascompany=false;
          }
       })
      },
      querySearch(queryString, cb) {//显示搜索结果
          this.$http.get('/dbapi/getcompanynames',{params:{companyname:this.mysearch}}).then((res)=>{
          let list=[];
          for(let i in res.data){
            list.push({value:res.data[i].companyname});
            cb(list);
          }
          })
      },
      beginchat(){
        let data={companyid:this.companydetails[0].companyid,companyname:this.companydetails[0].companyname};
        this.$emit('userchat',data);
      }
    },
    created(){
      this.getcompanytype();
    }

  }
</script>