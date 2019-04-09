const schedule = require('node-schedule');
// const array  = require('./config');
const request = require('request');
const config = require('./config');
const nodemailer = require("nodemailer");

// 定义邮件服务器服
let transporter = nodemailer.createTransport({
    host: config.err.host,
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: config.normal.user,
        pass: config.normal.pass,
    }
});

var mailOptions = {
    // 发送邮件的地址
    from: config.err.user, // login user must equal to this user
    // 接收邮件的地址
    to: config.err.to,  // xrj0830@gmail.com
    // 邮件主题
    subject: config.err.subject,
    text : '',
    // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
    html: config.err.html
};

var normalOptions = {
    // 发送邮件的地址
    from: config.normal.user, // login user must equal to this user
    // 接收邮件的地址
    to: config.normal.to,  // xrj0830@gmail.com
    // 邮件主题
    subject: config.normal.subject,
    text : '',
    // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
    html: config.normal.html
};

module.exports = function check(){
    var rule = new schedule.RecurrenceRule();
    rule.minute = [0,15,30,45];
    let array = config.array;
    //rule.second = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58];
    //rule.second = [0,10,20,30,40,50];
    schedule.scheduleJob(rule, function(){
        console.log('scheduleCronstyle:' + new Date());
        let status = false;
        let num = 0;
        for(let i in array){
            //console.log('i',i)
            request(array[i],function(error,response,data){
                //请求超时
                setTimeout(()=>{
                    if(error||response.statusCode!=200||!data){
                    //if(!error||response.statusCode==200||data){
                        console.log("超时");
                        // console.log('num:',num);
                        // console.log('status',status);
                        num++;
                        if(num ==2&&status == false){
                            num = 0;
                            let date = new Date();
                            date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                            mailOptions.text = date+array[i];
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message sent: ' + info.response);
                            });
                        }else if(num ==2){
                            status = false;
                            return;
                        }
                    }
                }, 3000);
                num++;
                //出现问题，并且需要发送邮件
                if(!!error || response.statusCode != 200){
                    if(num!=2){
                        return;
                    }
                    //发送邮件
                    console.log('错误');
                    status = true;
                    num=0;
                    // 发送邮件，并有回调函数
                    let date = new Date();
                    date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    mailOptions.text = date+array[i];
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });
                }else{
                    console.log('data',!!data?'存在':'不存在');
                    console.log('response',response.statusCode==200?200:response.statusCode);
                }
                if(i == 2 &&response.statusCode == 200){
                    console.log('正常');
                    let date = new Date();
                    date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                    normalOptions.text = date+array[i];
                    transporter.sendMail(normalOptions, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' + info.response);
                    });
                }
            })
        }
    }); 
}