var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

var userconnect=mysql.createConnection(models.mysql)

userconnect.connect();

var jsonWrite = function(res,req){
    if(typeof req ==='undefined') {
        res.send('err')
      } else {
          console.log(req);
          res.send(req);
      }
}
//注册时间
var dateStr = function() {
    let now= new Date();
    let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1;
    let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate();
    let _hour = (10 > now.getHours()) ? "0" + now.getHours():now.getHours();
    let _minu = (10 > now.getMinutes()) ? "0" + now.getMinutes():now.getMinutes();
    let _sec = (10 > now.getSeconds()) ? "0" + now.getSeconds():now.getSeconds();
    return now.getFullYear() + '-' + _month + '-' + _day;
}
//详细时间
var nowtime=dateStr();


// 增加用户接口
router.post('/register', (req, res) => {
    var sql = $sql.user.add;
    var sql_inf=$sql.user.addinf;
    var params = req.body;
   // console.log(params);
            userconnect.query(sql, [params.username, params.password ,nowtime], function(err, result) {
            if (err) {
            console.log(err);
            }
    })
           userconnect.query(sql_inf, [params.username, params.mobilephone], function(err, result) {
           if (err) {
           console.log(err);
           }
           if (result) {
           jsonWrite(res, result);
        }
})
        
});

//注册时查找用户是否存在
router.post('/searchname',(req,res)=>{
    var sql_name=$sql.user.select_name;
    var params=req.body;
  //  console.log(params);
    if(params.username){
        sql_name+=" where binary username = '" +params.username+"'";
    }
    userconnect.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            res.send('0')//有则返回0
            var resultArray = result[0];
            console.log(resultArray.password);//返回用户名的密码
           // console.log(keywords);
        }
    })
})


//登录接口
router.post('/login', (req, res) => {
    var sql_log = $sql.user.log;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
   // console.log(params);
    if (params.username) {
        sql_log += " where  binary username  = '"+ params.username +"' AND binary password = '"+ params.password + "'";
    }
    userconnect.query(sql_log, [params.username,params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出该用户，data 返回-1
        } else {
            res.send('0')//存在该用户返回0
            var resultArray = result[0];
            console.log(resultArray.password);//返回用户名的密码
           // console.log(keywords);
        }
    })
});

//获取用户密码
router.get('/getuserpass',(req,res)=>{
    var sql_pass=$sql.user.select_name;
    var params=req.query;
    //console.log(params);
    if (params.username) {
        sql_pass += " where binary username = '"+ params.username +"'";
    }
    userconnect.query(sql_pass, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            res.send(result[0].password);
        }
    })
})

//获取用户信息
router.get('/getuserinfor', (req, res) => {
    var sql_infor = $sql.user.select_infor;
    var params = req.query;
   // console.log(params);
    if (params.username) {
        sql_infor += " where binary username = '"+ params.username +"'";
    }
    userconnect.query(sql_infor, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//获取用户期望数据
router.get('/getuseridea', (req, res) => {
    var sql_idea = $sql.user.select_idea;
    var params = req.query;
   // console.log(params);
    if (params.username) {
        sql_idea += " where binary username = '"+ params.username +"'";
    }
    userconnect.query(sql_idea, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//获取用户期望职业
router.get('/getideajobs', (req, res) => {
    var sql_ideajobs = $sql.user.search_job;
    var params = req.query;
    console.log(params);
      sql_ideajobs += " where ( jobname like '%"+ params.ideasidea +"%' or skills like '%"+ params.ideasidea +"%' ) and place like '%"+params.placesidea+"%'";
    userconnect.query(sql_ideajobs,[params.ideasidea,params.placesidea] , function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//更新用户信息
router.post('/updateinfor', (req, res) => {
    var sql_updateinf = $sql.user.update_infor;
    var params = req.body;
    //console.log(params);
    if (params.username) {
        sql_updateinf +=" mobilephone = '" + params.mobilephone +
                        "', age = '" + params.age +
                        "', education = '" + params.education +
                        "', usertruename = '" + params.usertruename +
                        "', personalidea = '" + params.personalidea +
                        "', ideaplace = '" + params.ideaplace +
                        "', personaldetail = '" + params.personaldetail +
                        "', experience = '" + params.experience +
                        "' where username = '"+ params.username + "'";
    }

    userconnect.query(sql_updateinf,[params.mobilephone,params.age,params.education,params.usertruename,
        params.personalidea,params.experience], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');
        // if (result.affectedRows === undefined) {
        //     res.send('更新失败，请联系管理员')   //查询不出username，data 返回-1
        // } else {
        //     res.send('ok'); 
        // }
    })
});

//更改密码
router.post('/updatepass', (req, res) => {
    var sql_modify = $sql.user.update_user;
    var params = req.body;
    //console.log(params);
    if (params.username) {
        sql_modify +=  " password = '" + params.newpassword +
                        "' where  binary username ='"+ params.username + "'";
    }
    userconnect.query(sql_modify, params.newpassword, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');
    })
});

//获取职位列表中的属性
router.get('/getjobstype', (req, res) => {
    var sql_jobtype = $sql.user.select_jobstype;
    var params = req.query;
   //console.log(params);
    if (params.tablename) {
        sql_jobtype += " "+ params.tablename +" ";
    }
    userconnect.query(sql_jobtype, params.tablename, function(err, result) {
        if (err) {
            console.log(err);
        }
        else{
            jsonWrite(res, result);
        }
    })
});

//获取职位列表中所有信息
router.get('/getalljobs', (req, res) => {
    var sql_alljobs = $sql.user.select_alljobs;
    var params = req.query;
    if (params.tablename) {
        sql_alljobs += " "+ params.tablename +" where state = '审核完成' order by setdate desc";
    }
    userconnect.query(sql_alljobs, params.tablename, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            jsonWrite(res, result);
        }
    })
});
//获取职位列表中未审核或失败数据
router.get('/getnewjobs', (req, res) => {
    var sql_alljobs = $sql.user.select_alljobs;
    var params = req.query;
    if (params.tablename) {
        sql_alljobs += " "+ params.tablename +" where state = '审核中' or state = '审核不通过' order by setdate desc";
    }
    userconnect.query(sql_alljobs, params.tablename, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            jsonWrite(res, result);
        }
    })
});
//搜索职位列表中信息
router.get('/getselectjobs', (req, res) => {
    var sql_search = $sql.user.search_job;
    var params = req.query;
    console.log(params);
    if(params.searchname==null&&params.searchtype!=null){
        sql_search += " where itemtype = '"+params.searchtype+"' and state = '审核完成' order by setdate desc";
    }
    else if(params.searchtype==null&&params.searchname!=null){
        sql_search += " where ( companyname like '%"+ params.searchname+"%' or jobname like '%"+params.searchname+"%' ) and state = '审核完成' order by setdate desc";
    }
    else if(params.searchname!=null&&params.searchtype!=null){
        sql_search += " where ( ( companyname like '%"+ params.searchname+"%' or jobname like '%"+params.searchname+"%' ) and itemtype = '"+params.searchtype+"' ) and state = '审核完成' order by setdate desc";
    } else{
        sql_search +=" where state = '审核完成' order by setdate desc"
    }
    userconnect.query(sql_search, [params.searchname,params.searchtype], function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            jsonWrite(res, result);
            
        }
    })
});
//查找用户是否已投递该简历
router.post('/searchsendjob',(req,res) => {
    var sql_hassendjob = $sql.user.has_send_job;
    var params = req.body;
    console.log(params);
    if(params.username){
    sql_hassendjob+=" where ( binary username = '"+params.username+"' and send_company = '"+params.sendcompany+"' ) and send_job = '"+params.sendjob+"'";
    }
    userconnect.query(sql_hassendjob, [params.username,params.sendcompany,params.sendjob], function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result[0]===undefined){
            res.send('0');//未投递，返回0
        }else{
            res.send('1');//已投递，返回1
        }
    })
});
//投递简历
router.post('/sendjob',(req,res) => {
    var sql_sendjob = $sql.user.send_job;
    var params = req.body;
    console.log(params);
    userconnect.query(sql_sendjob, [params.username,params.sendcompany,params.sendjob,nowtime,params.companyid], function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result){
            res.send('1');//投递成功，返回1
        }
    })
});
//获取企业id
router.get('/getcompanyid', (req, res) => {
    var sql_getid = $sql.user.get_companyid;
    var params = req.query;
    console.log(params);
    sql_getid+=" where companyname = '"+params.companyname+"'";
    userconnect.query(sql_getid, params.companyname, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});

//更新投递次数
router.post('/sendjobclick',(req,res) => {
    var sql_sendjobclick = $sql.user.update_joblist;
    var params = req.body;
    console.log(params);
    sql_sendjobclick+=" click = "+params.click+" where companyname = '"+params.companyname+"' and jobname = '"+params.jobname+"'";
    userconnect.query(sql_sendjobclick, params.click, function(err, result) {
        if (err) {
            console.log(err);
        }
        if(result){
            res.send('1');//投递成功，返回1
        }
    })
});
//获取个人投递简历的属性
router.get('/getmysendjobstype', (req, res) => {
    var sql_getmyjobstype = $sql.user.send_job_type;
    var params = req.query;
    console.log(params);
    userconnect.query(sql_getmyjobstype, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});
//获取个人投递的简历
router.get('/getmysendjobs', (req, res) => {
    var sql_getmyjobs = $sql.user.has_send_job;
    var params = req.query;
    console.log(params);
    if(params.username){
        sql_getmyjobs += " where binary username = '"+ params.username+"' order by send_date desc";
    }
    userconnect.query(sql_getmyjobs, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
});


// 企业注册
router.post('/companyregister', (req, res) => {
    var sql_addcom = $sql.user.add_company;
    var sql_addcommes=$sql.user.add_companymes;
    var params = req.body;
    userconnect.query(sql_addcom, [params.mobilephone, params.password], function(err, result) {
        if (err) {
        console.log(err);
        }
    })
    userconnect.query(sql_addcommes, [params.mobilephone], function(err, result) {
           if (err) {
           console.log(err);
           }
           if (result) {
           jsonWrite(res, result);
        }
})
        
});
//验证企业手机
router.post('/searchmobilephone',(req,res)=>{
    var sql_company=$sql.user.select_company;
    var params=req.body;
  //  console.log(params);
    if(params.mobilephone){
        sql_company+=" where companymobile = '" +params.mobilephone+"'";
    }
    userconnect.query(sql_company, params.mobilephone, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出mobilephone，data 返回-1
        } else {
            res.send('0')//有则返回0
            var resultArray = result[0];
            console.log(resultArray.password);//返回用户名的密码
           // console.log(keywords);
        }
    })
})
//企业登录
router.post('/companylogin', (req, res) => {
    var sql_log = $sql.user.select_company;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
   // console.log(params);
    if (params.mobilephone) {
        sql_log += " where companymobile  = '"+ params.mobilephone +"' AND binary companypassword = '"+ params.password + "'";
    }
    userconnect.query(sql_log, [params.mobilephone,params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出该用户，data 返回-1
        } else {
            
            var resultArray = result[0];
            console.log(resultArray.companypassword);//返回用户名的密码
            res.send("["+resultArray.companyid+"]");//存在该用户返回该用户的id
           // console.log(keywords);
        }
    })
});
//通过id获取企业信息
router.get('/getcompanyinfor', (req, res) => {
    var sql_companyinfor = $sql.user.select_companymes;
    var params = req.query;
    if (params.companyid) {
        sql_companyinfor += " where companyid = "+ params.companyid;
    }
    userconnect.query(sql_companyinfor, params.companyid, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//获取所有企业名字
router.get('/getcompanynames', (req, res) => {
    var sql_companyinfor = $sql.user.select_companymesname;
    var params = req.query;
    if (params.companyname) {
        sql_companyinfor += " where companyname like '%"+ params.companyname+"%'";
    }
    userconnect.query(sql_companyinfor, params.companyname, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//通过名字获取企业信息
router.get('/getcompanydetails', (req, res) => {
    var sql_companyinfor = $sql.user.select_companymes;
    var params = req.query;
    if (params.companyname) {
        sql_companyinfor += " where companyname like '%"+ params.companyname+"%'";
    }
    userconnect.query(sql_companyinfor, params.companyname, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//获取企业信息类型
router.get('/getcompanytype', (req, res) => {
    var sql_companytype = $sql.user.select_companymes_type;
    userconnect.query(sql_companytype,function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});
//企业更新信息
router.post('/updatecompanymes', (req, res) => {
    var sql_updatecom = $sql.user.update_company;
    var sql_updatecommes = $sql.user.update_companymes;
    var sql_updatejob = $sql.user.update_joblist;
    var sql_updateusersend=$sql.user.update_usersend;
    var params = req.body;
   // console.log(params);
    if (params.mobilephone) {
        sql_updatecom +=" companyname = '"+params.companyname+"' where companyid = "+params.companyid+"";
        sql_updatecommes+=" companyname = '"+params.companyname+"' , hrname = '"+params.hrname+"' , companytype = '"+params.companytype+"' ,introduce ='"+
        params.introduce+"' where companyid ="+params.companyid;
        sql_updatejob +=" companyname = '"+params.companyname+"' where companyid = "+params.companyid+"";
        sql_updateusersend +=" send_company = '"+params.companyname+"' where companyid = "+params.companyid+"";
    }
    userconnect.query(sql_updatecom, [params.companyname,params.companyid], function(err, result) {
        if (err) {
            console.log(err);
        }
    })
    userconnect.query(sql_updatejob, [params.companyname,params.companyid], function(err, result) {
        if (err) {
            console.log(err);
        }
    })
    userconnect.query(sql_updateusersend, [params.companyname,params.companyid], function(err, result) {
        if (err) {
            console.log(err);
        }
    })
    userconnect.query(sql_updatecommes,[params.companyname,params.hrname,params.companytype,params.introduce],function(err,result){
        if(err){
            console.log(err);
        } 
        if (result) {
            jsonWrite(res, result);
         }
    })
})

//企业上传表单
router.post('/companysendform', (req, res) => {
    var sql_addjobs = $sql.user.add_jobs;
    var params = req.body;

    userconnect.query(sql_addjobs,[params.companyid,params.companyname,params.sendjob,params.sendmoney,params.sendworkplace,
        params.sendjobtype,params.sendeducated,params.sendnumber,params.click,nowtime,params.sendneed,params.senddetails,params.state],
        function(err,result){
        if(err){
            console.log(err);
        } 
        if (result) {
            jsonWrite(res, result);
         }
    })
})
//企业获取投递的职位
router.get('/getcompanyjobs', (req, res) => {
    var sql_alljobs = $sql.user.select_alljobs;
    var params = req.query;
    if (params.tablename) {
        sql_alljobs += " "+ params.tablename +" where companyid= "+params.companyid+" order by setdate desc";
    }
    userconnect.query(sql_alljobs, params.tablename, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            jsonWrite(res, result);
        }
    })
});
//获取企业密码
router.get('/getcompanypass',(req,res)=>{
    var sql_compass=$sql.user.select_company;
    var params=req.query;
    //console.log(params);
    if (params.companyid) {
        sql_compass += " where companyid = "+ params.companyid;
    }
    userconnect.query(sql_compass, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            res.send(result[0].companypassword);
        }
    })
})

//更改密码
router.post('/updatecompanypass', (req, res) => {
    var sql_commodify = $sql.user.update_company;
    var params = req.body;
    //console.log(params);
    if (params.companyid) {
        sql_commodify +=  " companypassword = '" + params.newpassword +
                        "' where  companyid = "+ params.companyid;
    }
    userconnect.query(sql_commodify, params.newpassword, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
//企业更新投递的岗位
router.post('/updatesendform',(req, res) => {
    var sql_updatenew = $sql.user.update_joblist;
    var params = req.body;
    console.log(params);
    if (params.companyid) {
        sql_updatenew +=" money = '"+params.sendmoney+"' , place = '"+params.sendworkplace+"' , itemtype = '"+params.sendjobtype
        +"' , education = '"+params.sendeducated+"' , needamount = "+params.sendnumber+" , skills = '"+params.sendneed+"' , details ='"
        +params.senddetails+"' , state = '"+params.state+"' where companyid = " + params.companyid +" and jobname = '"+
         params.sendjob +"'";
    }
    userconnect.query(sql_updatenew, [params.sendmoney,params.sendworkplace,params.sendjobtype,params.sendeducated,
        params.sendnumber,params.sendneed,params.senddetails,params.state], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
//删除职位
router.post('/deletejob', (req, res) => {
    var sql_delete = $sql.user.delete_job;
    var params = req.body;
    console.log(params);
    if (params.companyid) {
        sql_delete +=  " where ( ( companyid = " + params.companyid +
        " and jobname = '"+ params.jobname+"') and itemtype = '"+params.itemtype+"' ) and place = '"
        +params.place+"'";
    }
    userconnect.query(sql_delete, [params.companyid,params.jobname,params.itemtype,params.place], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
//从企业id获取企业名称
router.get('/getcompanyname',(req,res)=>{
    var sql_getname=$sql.user.select_companyname;
    var params=req.query;
    //console.log(params);
    if (params.companyid) {
        sql_getname += " where companyid = "+ params.companyid;
    }
    userconnect.query(sql_getname, params.companyid, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('0')   //查询不出name，data 返回0
        } else {
            res.send(result[0].companyname);
        }
    })
})

//企业获取投递的职位
router.get('/getuserjob',(req,res)=>{
    var sql_getuserjob=$sql.user.has_send_job;
    var params=req.query;
    //console.log(params);
    if (params.companyname) {
        sql_getuserjob += " where send_company = '"+ params.companyname+"'";
    }
    userconnect.query(sql_getuserjob, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出name，data 返回-1
        } else {
            res.send(result);
        }
    })
})
//企业发送已查看消息
router.post('/setstate',(req,res)=>{
    var sql_updatestate=$sql.user.update_usersend;
    var params=req.body;
    //console.log(params);
    if (params.username) {
        sql_updatestate +=" state = '"+params.state+ "' where companyid = "+ params.companyid+
        " and username = '"+params.username+"'";
    }
    userconnect.query(sql_updatestate,params.state, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出name，data 返回-1
        } else {
            res.send(result);
        }
    })
})

//管理审核岗位
router.post('/addjob', (req, res) => {
    var sql_addjob = $sql.user.update_joblist;
    var params = req.body;
    //console.log(params);
    if (params.companyid) {
        sql_addjob +=  " state = '" + params.state +
                        "' where ( ( companyid = "+ params.companyid+" and jobname = '"+params.jobname+"' ) and itemtype = '"+params.itemtype+
                        "' ) and place = '"+params.place+"'";
    }
    userconnect.query(sql_addjob, params.newpassword, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
//用户获取消息
router.get('/getuserchat',(req,res)=>{
    var sql_getuserchat=$sql.user.select_chat;
    var params=req.query;
    //console.log(params);
    if (params.username) {
        sql_getuserchat += " where binary setter = '"+ params.username+"' or  binary getter = '"+params.username+"' order by sendtime asc";
    }
    userconnect.query(sql_getuserchat, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出消息，data 返回-1
        } else {
            res.send(result);
        }
    })
})
//企业获取消息
router.get('/getcompanychat',(req,res)=>{
    var sql_getchat=$sql.user.select_chat;
    var params=req.query;
    //console.log(params);
    if (params.companyid) {
        sql_getchat += " where companyid = "+ params.companyid+"  order by sendtime asc";
    }
    userconnect.query(sql_getchat, params.companyid, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出消息，data 返回-1
        } else {
            res.send(result);
        }
    })
})
//发送消息
router.post('/sendmes', (req, res) => {
    var sql_addchat = $sql.user.add_chat;
    var params = req.body;
    //console.log(params);
    userconnect.query(sql_addchat, [params.setter,params.getter,params.talk,params.sendtime,params.companyid,params.hasread], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
//更新已读状态
router.post('/sendnewmes', (req, res) => {
    var sql_updatechat = $sql.user.update_chat;
    var params = req.body;
    sql_updatechat+=" where setter = '"+params.setter+"' and getter = '"+params.getter+"'";
    //console.log(params);
    userconnect.query(sql_updatechat, [params.setter,params.getter], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send('1');

    })
});
module.exports = router;

