const userApi = require('./api/userApi')
// const bookApi = require('./api/bookApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 后端api路由
app.use('/dbapi', userApi)
// app.use('/api/book', bookApi)

// 监听端口
app.listen(3000);
console.log('success listen at port:3000')
//入口文件