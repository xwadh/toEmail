const express = require('express');
const app=express();
const check = require('./during');

check();

app.listen(3000);
console.log('服务启动，3000端口')

