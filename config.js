module.exports = {
    array:[
        "https://itunes.apple.com/",
        "https://itunes.apple.com/",
        "https://itunes.apple.com/"
        // "https://itunes.apple1.com",测试错误用例，该网站为无法打开等待相应的网站
        // "https://itunes.apple2.com",
        // "https://itunes.apple3.com",
    ],
    err:{                       //发生错误的邮件格式
        host:'smtp.163.com',    //推荐使用163，qq配置异常，自己也可以爬坑
        user:'***@163.com',     //使用的寄件人
        pass:'***',             //163配置的smtp密码
        to:'***@qq.com',        //收件人
        html:'',                //给收件人展示的邮件内容，可用网页形式展现
        subject:'***',          //邮件主题
    },
    normal:{                    //正常的邮件格式
        host:'smtp.163.com',
        user:'***@163.com',
        pass:'***',
        to:'***@qq.com',
        html:'',
        subject:'[APP store页面访问正常]',
    }
}