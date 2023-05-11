// // 导入express
// const express = require('express');
// // 创建web服务器
// const app = express();

// // 引入路由器模块
// const userRouter = require('./user.js');

// // 托管服务器
// app.use('/v1/user', userRouter);

// // 通过app.listen进行服务器的配置，并启动服务器，接收两个配置参数，一个是对应的端口号，一个是启动成功的回调参数
// app.listen(9001, ()=>{
//     console.log('服务器启动成功');
// })


const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
    // console.log('*** req ***', req);
    // console.log('*** res ***', res);
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, access-control-allow-origin, Content-Length, Authorization, Accept, X-Requested-With, x-xsrf-token');
    // next()
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

var apiUrl = "https://api.instagram.com";

app.use('/oauth/*', createProxyMiddleware({ target: apiUrl, changeOrigin: true }))

app.get('/', function(req, res) {
    console.log(res);
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(3000, () => {
    console.log('localhost:3000');
})