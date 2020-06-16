<template>
  <div id="app">
    <el-row>
    <el-menu  type="flex" class="el-menu-demo" mode="horizontal"  background-color="#545c64" text-color="#fff" active-text-color="#409EFF" :default-active="defaultActive" :router='true'>

        <el-menu-item index="home">首页</el-menu-item>

        <el-menu-item index="details">求职</el-menu-item>
        <el-menu-item index="information">资讯</el-menu-item>
        <el-menu-item index="register" v-show="personalshow">注册</el-menu-item>
        <el-menu-item index="login" v-show="personalshow">登录</el-menu-item>
        

        <el-submenu index="personalindex" v-show="personalcentershow">
        <template slot="title" >个人中心</template>
        <el-menu-item index="personal" class="el-icon-star-off" >个人信息</el-menu-item>
        <el-menu-item  class="el-icon-switch-button" @click="logout">退出登录</el-menu-item>
        </el-submenu>

        <el-menu-item index="companystate" v-show="companyshow">企业登录</el-menu-item>
    
        <el-submenu index="companycenter" v-show="companycentershow">
        <template slot="title" >企业中心</template>
        <el-menu-item index="companycenter" class="el-icon-star-off">企业信息</el-menu-item>
        <el-menu-item  class="el-icon-switch-button" @click="logout">退出登录</el-menu-item>
        </el-submenu>

        <el-submenu index="admin" v-show="adminshow">
        <template slot="title" >管理中心</template>
        <el-menu-item index="admin" class="el-icon-user" >职位审核</el-menu-item>
        <el-menu-item  class="el-icon-switch-button" @click="logout">退出登录</el-menu-item>
        </el-submenu>
        
        <el-menu-item @click="showbox()">
        <el-badge :value="newmessage" class="item" >我的消息</el-badge>
        </el-menu-item>

    </el-menu>
    </el-row>


  <router-view name="search"></router-view>
  <router-view name="posters"></router-view>
  <router-view name="companys"></router-view>


  <router-view name="society" @postjob="showMsg"></router-view>
  <router-view name="jobs" :getvalues="getjobs"></router-view>

  <router-view name="information" @userchat="userchats"></router-view> 

  <router-view name="login"></router-view>

  <router-view name="register"></router-view>

  <router-view name="companystate"></router-view>
  
  <router-view name="companycenter" @chattheuser="chattheuser"></router-view>
  <router-view name="personal" v-if="showpersonal" @chatresume="chatresume"></router-view>

  <router-view name="admin"></router-view>

  <el-dialog title="对话" :visible.sync="showmesdialog" width='800px' :close-on-click-modal="false" :modal-append-to-body="false">
  <el-tabs tab-position="left" style="height: 470px; width:760px" v-model="chatuser">

    <el-tab-pane v-for="item in chatusers" :label="item" :key="item">
     <span slot="label"><i class="el-icon-user-solid"></i>{{item}}</span>
     <div class="chatbox">
     <ul class="infinite-list">
     <li v-for="i in chatuserlist" :class="[i.getter==loginuser?'leftchat':'rightchat']">
     <i :class="[i.getter==loginuser?'el-icon-user-solid':'']"></i>
     {{i.talk}}
     <i :class="[i.setter==loginuser?'el-icon-user':'']"></i>
     </li>
     </ul>
     </div>
     
     <div class="sendbox">
     <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="mysendmes" class="inputarea"></el-input>
     <el-button type="primary" icon="el-icon-s-comment" @click.native="sendmes(item)">发送</el-button>
     </div>
     </el-tab-pane>

  </el-tabs>
  </el-dialog>
  

   </div>
</template>

<style>
  a{
      text-decoration:none;
  }
  
  .el-menu--horizontal>.el-submenu{
      float:right;
  } 
  .el-icon-user{
    text-align:center;
    display:inline-block;
    overflow:auto;
  }
  .el-icon-switch-button{
    width:116px;
    text-align:center;
    display:inline-block;
  }
  .el-icon-star-off{
    width:116px;
    text-align:center;
    display:inline-block;
  }

  .el-menu--horizontal>.el-menu-item:nth-child(4){
      float:right;
  }
  .el-menu--horizontal>.el-menu-item:nth-child(5){
      float:right;
  }
  .el-menu--horizontal>.el-menu-item:nth-child(6){
      float:right;
  }
  .el-menu--horizontal>.el-menu-item:nth-child(7){
      float:right;
  }
  .el-row{
    margin-bottom:40px;
  }
  .chatbox{
    height:300px;
  }
  .infinite-list{
    display:flex;
    flex-direction:column;
    overflow:auto;
    height:300px;
    padding:0px;
  }
  .leftchat{
    list-style:none;
    margin-bottom:20px;
    font-size:20px;
    text-align:left;
  }
  .rightchat{
    list-style:none;
    margin-bottom:20px;
    font-size:20px;
    text-align:right;
  }
  .inputarea{
    margin-right:10px;
  }
  .sendbox{
    display:flex;
    align-items:column;
    flex-direction:rows-resever;
  }

</style>


<script>


export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
     return{
       isRouterAlive:true,
       defaultActive:'home',
       routerstate:true,
       personalshow:true,//个人登录、注册显示
       personalcentershow:false,//个人中心显示
       companyshow:true,//企业登录显示
       adminshow:false,//管理中心显示
       companycentershow:false,//企业中心显示
       showpersonal:false,
       loginuser:'',//登录用户
       newmesuser:'',//发送给该用户新信息的用户
       sendcompanyid:'',//要发送的企业id
       getjobs:[],//传给表单的值
       newmessage:'',//新消息
       showmesdialog:false,//显示对话框
       chatalllist:[],//所有聊天记录
       chatusers:[],//所有对话用户数组
       chatuser:'',//正在对话的用户下标
       chatuserlist:[],//正在对话用户的聊天记录
       mysendmes:'',//要发送的消息
       iscom:false,//判断是否企业交流
     }
  },
watch: {
    $route () {
      this.setCurrentRoute()//路由每次变化进行监听
      this.showlog()//监听登录状态，显示个人页面
      this.chatarr();
    },
    chatuser:function(){
      this.chatuserbox(this.chatusers[this.chatuser]);
    },
    loginuser:function(){
      this.chatarr();
    },
    chatalllist:function(){
      if(this.chatuser!=''){
        this.chatuserbox(this.chatusers[this.chatuser]);
      }
    },
    showmesdialog:function(){
      this.chatarr();
      this.scrollBottom();
      if(this.showmesdialog==true&&this.newmessage=='new'){
       this.changenewmes();
      }
    },
    newmessage:function(){
      if(this.showmesdialog==true&&this.newmessage=='new'){
       this.changenewmes()
      }
    }
  },
  methods: {
    reload(){//路由跳转本页面刷新页面
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
      this.showmesdialog=false;
    },
    setCurrentRoute () {//跳转正确路由
      this.defaultActive = this.$route.name;//获取当前路由的名字，并设置成当前激活下标
    },

    logout(){//登出
      this.$store.dispatch('setUser',null);
      if(this.$route.path=='/home'){
        this.$router.go(0);
        this.newmessage='';
      }else{
      alert("您已成功退出登录，即将返回首页");
      this.$router.push({path:'/'});
      this.newmessage='';
      }
    },
    showlog(){//显示相应路由
      var data = JSON.parse(localStorage.getItem('isLogin'));
      var username=localStorage.getItem('userName');
      var companyid=parseInt(username);
      var r = /^\+?[1-9][0-9]*$/;//判断是否企业登录
      var flag=r.test(username);
      if(data==false){//如果未登录
        this.personalshow=true;
        this.personalcentershow=false;
        this.companyshow=true;
        this.companycentershow=false;
        this.adminshow=false;
      }else if(data==true&&flag==true){//如果是企业登录
        this.$http.get('/dbapi/getcompanyname',{params:{companyid:companyid}}).then((res)=>{
        this.loginuser=res.data;
        })
        this.companycentershow=true;
        this.companyshow=false;
        this.personalshow=false;
        this.personalcentershow=false;
        this.adminshow=false;
      }else if(data==true&&flag==false&&username!='admin'){//个人登录
        this.loginuser=username;
        this.personalcentershow=true;
        this.personalshow=false;
        this.companyshow=false;
        this.companycentershow=false;
        this.adminshow=false;
      }else{
        this.personalcentershow=false;
        this.personalshow=false;
        this.companyshow=false;
        this.companycentershow=false;
        this.adminshow=true;
      }
      var nowroute=this.$route.path;
      if(nowroute.includes('personal')){
        this.showpersonal=true;
      }else{
        this.showpersonal=false;
      }
    },
    showMsg(data){
      this.getjobs=data;
    },
    showbox(){//显示对话框
      let islog=localStorage.getItem('isLogin');
      let loguser=localStorage.getItem('userName')
      let lognames=/^\d+$/.test(loguser);
      if(islog=='false'){
         this.$alert('请先登录!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `用户未登录`
            });
          }
        });
      }
      else{
         this.scrollBottom();
         this.showmesdialog=true;
         }
    },
    chatarr(){//显示聊天用户框和所有聊天记录
      let islog=localStorage.getItem('isLogin');
      let loguser=localStorage.getItem('userName');
      let logcompany=parseInt(loguser);
      let lognames=/^\d+$/.test(loguser);
      var lastchatlist=0;
      if(this.chatalllist.length>0){
      lastchatlist=this.chatalllist.length;//记录上一次消息
      }
        if(lognames==false){//用户登录
        this.$http.get('/dbapi/getuserchat',{params:{username:loguser}}).then((res)=>{
          if(res.data!=-1){
            let newarray=[];
            let showarray=[];
            this.chatalllist=res.data;
            if(lastchatlist==0){
              lastchatlist=this.chatalllist.length;
            }
            res.data.forEach((item)=>{
                if(item.setter!=loguser){
                  newarray.push(item.setter);
                }
                 if(item.getter!=loguser){
                  newarray.push(item.getter);
                }
                if(item.getter==loguser&&item.hasread=='n'){//如果用户未读
                  this.newmesuser=item.setter;
                  this.newmessage='new';
                }
            })
            for(var i=0;i<newarray.length;i++){
              if(i==newarray.indexOf(newarray[i]))//如果为首次出现
              {
                showarray.push(newarray[i]);
              }
            }
            this.chatusers=showarray;
            if(this.chatalllist.length>lastchatlist&&this.showmesdialog==false){//新增了消息
              this.chatuser=(this.chatusers.length-1).toString();//定位到最新消息
              this.showmesdialog=true;
            }else if(this.showmesdialog==true){
              this.scrollBottom();
            }
          }
        })
      }else{//企业登录
        let logcompanyname;
        this.$http.get('/dbapi/getcompanyname',{params:{companyid:logcompany}}).then((res)=>{
          if(res.data!=0){
            logcompanyname=res.data;//获取企业名字
          }
        })
        this.$http.get('/dbapi/getcompanychat',{params:{companyid:logcompany}}).then((res)=>{
          if(res.data!=-1){
            let showarray=[];
            let newarray=[];
             this.chatalllist=res.data;
            res.data.forEach((item)=>{
                if(item.setter!=logcompanyname){
                  newarray.push(item.setter);
                }
                 if(item.getter!=logcompanyname){
                  newarray.push(item.getter);
                }
                if(item.getter==logcompanyname&&item.hasread=='n'){//如果企业未读
                  this.newmesuser=item.setter;
                 this.newmessage='new';
                }
            })
            for(var i=0;i<newarray.length;i++){
              if(i==newarray.indexOf(newarray[i]))//如果为首次出现
              {
                showarray.push(newarray[i]);
              }
            }
            this.chatusers=showarray;
              if(this.chatalllist.length>lastchatlist&&this.showmesdialog==false&&this.iscom==false){//新增了消息
              this.chatuser=(this.chatusers.length-1).toString();//定位到最新消息
            }else if(this.chatalllist.length>lastchatlist&&this.showmesdialog==false&&this.iscom==true){
              console.log('11')
              this.chatuser=(this.chatusers.length-1).toString();//定位到最新消息
              this.showmesdialog=true;
              this.iscom=false;
              }else if(this.showmesdialog==true){
              this.scrollBottom();
            }
          }
        })
      }
    },
    chatuserbox(user){//显示对应用户聊天记录
     let newarray=[];
     this.chatalllist.forEach((item)=>{
       if(item.getter==user||item.setter==user){
         newarray.push(item);
       }
     })
     this.chatuserlist=newarray;
    },
  sendmes(data){//发送消息
      var username=localStorage.getItem('userName');
      var r = /^\+?[1-9][0-9]*$/;//判断是否企业登录
      var flag=r.test(username);
      if(this.mysendmes==''){
       this.$alert('不能发送空消息哦', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请重新输入`
            });
          }
    })
    }
      else if(flag==false){//用户登录
      this.$http.get('/dbapi/getcompanyid',{params:{companyname:data}}).then((res)=>{
      let sendcompanyid=res.data[0].companyid;
      let senddata={setter:this.loginuser,getter:data,talk:this.mysendmes,companyid:sendcompanyid,sendtime:this.dateStr(),hasread:'n'};
      this.$http.post('/dbapi/sendmes',senddata).then((res)=>{
      this.mysendmes='';
       this.chatarr();
     })
     })
     }else{//企业登录
      this.$http.get('/dbapi/getcompanyid',{params:{companyname:this.loginuser}}).then((res)=>{
     let sendcompanyid=res.data[0].companyid;
     let senddata={setter:this.loginuser,getter:data,talk:this.mysendmes,companyid:sendcompanyid,sendtime:this.dateStr(),hasread:'n'};
     this.$http.post('/dbapi/sendmes',senddata).then((res)=>{
     this.mysendmes='';
      this.chatarr();
     })
    })
    }
    },
  dateStr(){//获取当前时间
    let now= new Date();
    let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1;
    let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate();
    let _hour = (10 > now.getHours()) ? "0" + now.getHours():now.getHours();
    let _minu = (10 > now.getMinutes()) ? "0" + now.getMinutes():now.getMinutes();
    let _sec = (10 > now.getSeconds()) ? "0" + now.getSeconds():now.getSeconds();
    return now.getFullYear() + "-" + _month + "-" + _day+ " " + _hour + ":" + _minu + ":" + _sec;
    }, 
  scrollBottom(){//滚动到底部
    this.$nextTick(()=>{
        let contarin = this.$el.querySelector(".infinite-list");
        contarin.scrollTop = contarin.scrollHeight;
      })
  },
    userchats(data){//信息页面与企业聊天
      var username=localStorage.getItem('userName');
      var companyid=parseInt(username);
      var r = /^\+?[1-9][0-9]*$/;//判断是否企业登录
      var flag=r.test(username);
      if(flag==true){
        this.global_route('企业暂时不能交流哦').catch(()=>{
              this.$message({
                type:'info',
                message:'已取消'
              })
        })
      }else{
        let haschat=this.chatusers.indexOf(data.companyname);
        if(haschat!=-1){//已存在聊天
          this.chatuser=haschat.toString();
          this.showmesdialog=true;
        }else{//新聊天
          let senddata={setter:username,getter:data.companyname,talk:'',sendtime:this.dateStr(),companyid:data.companyid,hasread:'n'}
        this.$http.post('/dbapi/sendmes',senddata).then((res)=>{
           this.chatarr();
           //this.showmesdialog=true;
          })

        }
        }
    },
      chatresume(data){//个人中心与企业交流
        let haschat=this.chatusers.indexOf(data.send_company);
        if(haschat!=-1){//已存在聊天
          this.chatuser=haschat.toString();
          this.showmesdialog=true;
        }else{//新聊天
          let senddata={setter:data.username,getter:data.send_company,
          talk:'',sendtime:this.dateStr(),companyid:data.companyid,hasread:'n'}
        this.$http.post('/dbapi/sendmes',senddata).then((res)=>{
          this.chatarr();
          // this.showmesdialog=true;
          })
        }
      },
    chattheuser(data){//企业与用户交流
        this.iscom=true;
        let haschat=this.chatusers.indexOf(data.username);
        if(haschat!=-1){//已存在聊天
          this.chatuser=haschat.toString();
          this.showmesdialog=true;
        }else{//新聊天
          let senddata={setter:data.send_company,getter:data.username,
          talk:'',sendtime:this.dateStr(),companyid:data.companyid,hasread:'n'}
           this.$http.post('/dbapi/sendmes',senddata).then((res)=>{
           this.chatarr();
           //this.showmesdialog=true;
          })
        }
    },
    changenewmes(){//更新已读信息
      let data={setter:this.newmesuser,getter:this.loginuser};
      this.$http.post('/dbapi/sendnewmes',data).then((res)=>{
        this.newmessage='';
      })
    }
    
  },

  created() {
    this.setCurrentRoute();
  },
  mounted(){
    this.showlog();
  },
}

</script>


