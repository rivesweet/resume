//映射文件

var sqlmap={
    user:{
        add:'insert into personal_user(username,password,registerdate) value (?,?,?)',
        addinf:'insert into personal_infor(username,mobilephone) value (?,?)',
        select_name:'select * from personal_user',
        select_infor:'select * from personal_infor',
        select_idea:'select personalidea,ideaplace from personal_infor',
        log:'select * from personal_user',
        update_user: 'update personal_user set',
        update_infor:'update personal_infor set',
        select_jobstype:'select * from ',
        select_alljobs:'select * from ',
        search_job:'select * from joblist ',
        has_send_job:'select * from user_send ',
        send_job:'insert into user_send(username,send_company,send_job,send_date,companyid) value (?,?,?,?,?) ',
        send_job_type:'select * from user_send_type ',
        add_company:'insert into company_infor(companymobile,companypassword) value(?,?)',
        add_companymes:'insert into company_mes(companymobile) value (?)',
        select_company:'select * from company_infor',
        select_companyname:'select companyname from company_infor',
        select_companymes:'select * from company_mes',
        select_companymesname:'select companyname from company_mes',
        select_companymes_type:'select * from company_mes_type',
        get_companyid:'select companyid from company_mes',
        update_company:'update company_infor set',
        update_companymes:'update company_mes set',
        update_joblist:'update joblist set',
        update_usersend:'update user_send set',        
        add_jobs:'insert into joblist values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        delete_job:'delete from joblist',
        select_chat:'select * from chat ',
        add_chat:'insert into chat values (?,?,?,?,?,?)',
        update_chat:'update chat set hasread = "y" '
    }
}

module.exports=sqlmap;